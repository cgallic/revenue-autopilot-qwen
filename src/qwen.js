export async function completeWithQwen({ system, prompt, json = false }) {
  const apiKey = process.env.QWEN_API_KEY;
  const baseUrl = process.env.QWEN_BASE_URL;
  const model = process.env.QWEN_MODEL || "qwen-plus";

  if (!apiKey || !baseUrl) {
    return mockCompletion({ system, prompt, json });
  }

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt }
      ],
      response_format: json ? { type: "json_object" } : undefined
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Qwen Cloud request failed: ${response.status} ${body.slice(0, 400)}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

function mockCompletion({ prompt, json }) {
  if (json) {
    const looksLaunchReady = [
      "Request same-day audit",
      "$99 Express Audit / $250 Batch Audit",
      "Paid audit template plus order log",
      "20 verified Reddit public replies"
    ].every((needle) => prompt.includes(needle));

    return JSON.stringify({
      verdict: looksLaunchReady ? "PASS_LAUNCH_READY_WITH_PAYMENT_GATE" : "FIX_BEFORE_OUTBOUND",
      reasons: looksLaunchReady
        ? [
            "Commercial path is aligned: CTA, pricing, intake, proof, and fulfillment are present.",
            "Distribution can proceed only with logged human approval.",
            "Payment requests remain blocked until buyer-specific approval."
          ]
        : [
            "Commercial readiness must be proven before distribution.",
            "Payment handoff must remain approval-gated."
          ],
      next_actions: looksLaunchReady
        ? [
            "Monitor replies and inbound requests.",
            "Ask for payment rail approval only after buyer intent.",
            "Produce paid audit artifact after payment approval."
          ]
        : [
            "Align pricing and CTA.",
            "Create fulfillment runbook.",
            "Run approved outreach only after human approval."
          ]
    }, null, 2);
  }

  return [
    "MOCK_QWEN_RESPONSE",
    "The agent should package the product into a paid offer, run adversarial launch review, and request approval before external action.",
    "",
    prompt.slice(0, 500)
  ].join("\n");
}
