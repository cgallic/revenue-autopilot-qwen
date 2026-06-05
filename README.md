# Revenue Autopilot

Revenue Autopilot is a Qwen Cloud hackathon demo for a business workflow agent that turns product ideas into paid-ready offers, runs adversarial launch checks, and executes only human-approved distribution.

This repository is prepared for public hackathon submission.

## Track

Qwen Cloud Global AI Hackathon - Track 4: Autopilot Agent.

## What It Demonstrates

- Finds a monetizable wedge from existing product/workspace context.
- Fails weak products before outbound.
- Requires commercial readiness: CTA, intake, pricing, payment handoff, fulfillment, proof.
- Uses human-in-the-loop gates before external actions or payment requests.
- Logs every approved external action with source/action URLs.
- Converts buyer interest into an approval-gated payment workflow.

## Demo

```bash
npm run demo
```

The demo uses `examples/sendproof-run.json`, a sanitized proof run based on the SendProof workflow.

Static judge/demo surface:

```bash
npm run serve
```

Open `http://localhost:4173` or `public/index.html`.

Screenshot artifact:

- `docs/screenshots/revenue-autopilot-demo.png`

Public demo links:

- Demo page: https://snappedai.com/revenue-autopilot-qwen/
- Architecture diagram: https://snappedai.com/revenue-autopilot-qwen/docs/architecture.svg
- Demo video asset: https://snappedai.com/revenue-autopilot-qwen/docs/revenue-autopilot-demo.mp4

## Qwen Cloud Hook

`src/qwen.js` is a provider boundary. It runs in mock mode by default. For Qwen Cloud:

```bash
export QWEN_API_KEY=...
export QWEN_BASE_URL=...
export QWEN_MODEL=...
```

Do not commit credentials.

Current public submission status: the demo is ready in mock mode, but live Qwen Cloud and Alibaba Cloud deployment proof still require approved credentials/deployment access.

## Safety

The agent refuses to do these without explicit human approval:

- external posts/replies/DMs/emails,
- payment requests,
- payment rail selection,
- account changes,
- DNS changes,
- purchases,
- wallet actions,
- public submissions.

## Hackathon Assets

- `docs/architecture.md`
- `docs/architecture.svg`
- `docs/alibaba-deployment-proof.md`
- `docs/devpost-draft.md`
- `docs/revenue-autopilot-demo.mp4`
- `docs/screenshots/revenue-autopilot-demo.png`
- `examples/sendproof-run.json`
