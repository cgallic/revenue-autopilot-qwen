import fs from "node:fs";
import { completeWithQwen } from "./qwen.js";
import { assertExternalActionAllowed, evaluateCommercialReadiness } from "./gates.js";
import { createRunLog, logAction, logApproval, logBlocker } from "./log.js";

async function main() {
  const inputPath = process.argv[2] || "examples/sendproof-run.json";
  const checkOnly = process.argv.includes("--check");
  const run = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const log = createRunLog();

  const commercial = evaluateCommercialReadiness(run.product);
  if (!commercial.pass) {
    logBlocker(log, {
      stage: "commercial_readiness",
      verdict: commercial.verdict,
      blockers: commercial.blockers
    });
  }

  const review = await completeWithQwen({
    system: "You are Revenue Autopilot, a Qwen-powered commercial launch reviewer.",
    prompt: JSON.stringify({ product: run.product, proof: run.proof }, null, 2),
    json: true
  });

  logAction(log, {
    type: "qwen_review",
    status: "completed",
    modelBoundary: process.env.QWEN_API_KEY ? "qwen_cloud" : "mock_qwen",
    output: safeJson(review)
  });

  if (run.humanApproval) {
    logApproval(log, run.humanApproval);
  }

  for (const action of run.proposedActions) {
    const gate = assertExternalActionAllowed(action);
    if (!gate.allowed) {
      logBlocker(log, {
        stage: "external_action_gate",
        action,
        reason: gate.reason
      });
      continue;
    }

    logAction(log, {
      ...action,
      status: checkOnly ? "would_execute" : "executed_in_prior_real_run"
    });
  }

  const summary = {
    project: run.project,
    commercialVerdict: commercial.verdict,
    qwenBoundary: process.env.QWEN_API_KEY ? "qwen_cloud" : "mock_qwen",
    approvedExternalActions: log.actions.filter((a) => a.type !== "qwen_review").length,
    blockers: log.blockers.length,
    log
  };

  console.log(JSON.stringify(summary, null, 2));
}

function safeJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
