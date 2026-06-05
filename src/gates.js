export const REQUIRED_COMMERCIAL_FIELDS = [
  "primaryCta",
  "canonicalPricing",
  "intakePath",
  "fulfillmentRunbook",
  "paymentApprovalGate",
  "proofArtifact"
];

export function evaluateCommercialReadiness(product) {
  const missing = REQUIRED_COMMERCIAL_FIELDS.filter((field) => !product[field]);
  const blockers = [];

  if (missing.length) {
    blockers.push(`Missing commercial fields: ${missing.join(", ")}`);
  }

  if (product.freeOutputRemovesPaidReason) {
    blockers.push("Free output removes the paid reason to buy.");
  }

  if (product.pricingMismatch) {
    blockers.push("Pricing mismatch across page/docs/outreach.");
  }

  if (!product.paymentApprovalGate) {
    blockers.push("Payment request path is not approval-gated.");
  }

  return {
    pass: blockers.length === 0,
    verdict: blockers.length === 0 ? "COMMERCIAL_READY" : "FIX_BEFORE_OUTBOUND",
    blockers
  };
}

export function assertExternalActionAllowed(action) {
  const approvalRequired = [
    "post",
    "reply",
    "dm",
    "email",
    "payment_request",
    "payment_rail",
    "purchase",
    "account_change",
    "dns_change",
    "wallet_action",
    "devpost_submit"
  ];

  if (approvalRequired.includes(action.type) && !action.humanApprovalId) {
    return {
      allowed: false,
      reason: `Human approval required for ${action.type}`
    };
  }

  return { allowed: true };
}
