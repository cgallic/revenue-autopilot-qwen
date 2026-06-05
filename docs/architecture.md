# Architecture

```text
Workspace/Product Context
        |
        v
Revenue Autopilot Orchestrator
        |
        +--> Qwen Cloud Reviewer
        |       - wedge analysis
        |       - commercial readiness critique
        |       - adversarial launch review
        |
        +--> Gate Engine
        |       - CTA/intake/pricing/fulfillment checks
        |       - external-action approval checks
        |       - payment/account/DNS safety checks
        |
        +--> Artifact Builder
        |       - paid offer
        |       - fulfillment template
        |       - Devpost/blog/demo assets
        |
        +--> Outreach Executor
        |       - only after human approval
        |       - logs URL/message IDs
        |
        +--> Append-only Log
                - approvals
                - posted actions
                - blockers
                - buyer/payment status
```

## Qwen Cloud Role

Qwen is used as the reasoning and review layer:

- turn messy product/workspace context into a monetizable wedge,
- evaluate buyer incentive and day-one buyability,
- generate adversarial launch review,
- produce fulfillment and outreach artifacts,
- classify buyer replies into next actions.

The demo runs in mock mode without credentials. In deployed mode, `src/qwen.js` calls the Qwen Cloud chat completions endpoint.

## Human-In-The-Loop Gates

The agent cannot perform these without approval:

- external posts/replies/DMs/emails,
- payment requests,
- payment rail selection,
- account changes,
- DNS changes,
- purchases,
- wallet actions,
- Devpost submission.

## Why This Is Autopilot

It automates the end-to-end business workflow from "make this product sell" to "approved distribution is live and logged" while keeping risky actions gated.
