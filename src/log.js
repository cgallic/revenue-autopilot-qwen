export function createRunLog() {
  return {
    createdAt: new Date().toISOString(),
    actions: [],
    approvals: [],
    blockers: []
  };
}

export function logAction(log, action) {
  log.actions.push({
    id: `act_${String(log.actions.length + 1).padStart(3, "0")}`,
    timestamp: new Date().toISOString(),
    ...action
  });
}

export function logApproval(log, approval) {
  log.approvals.push({
    id: `appr_${String(log.approvals.length + 1).padStart(3, "0")}`,
    timestamp: new Date().toISOString(),
    ...approval
  });
}

export function logBlocker(log, blocker) {
  log.blockers.push({
    id: `blk_${String(log.blockers.length + 1).padStart(3, "0")}`,
    timestamp: new Date().toISOString(),
    ...blocker
  });
}
