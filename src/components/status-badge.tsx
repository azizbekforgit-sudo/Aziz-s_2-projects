const TONES: Record<string, { label: string; tone: string }> = {
  // account
  PENDING: { label: "Awaiting approval", tone: "warning" },
  ACTIVE: { label: "Active", tone: "success" },
  SUSPENDED: { label: "Suspended", tone: "danger" },
  DEACTIVATED: { label: "Deactivated", tone: "neutral" },
  // verification
  UNVERIFIED: { label: "Not verified", tone: "neutral" },
  VERIFIED: { label: "Verified", tone: "success" },
  REJECTED: { label: "Rejected", tone: "danger" },
  // project
  DRAFT: { label: "Draft", tone: "neutral" },
  PENDING_REVIEW: { label: "In review", tone: "warning" },
  APPROVED: { label: "Published", tone: "success" },
  COMPLETED: { label: "Completed", tone: "info" },
  ARCHIVED: { label: "Archived", tone: "neutral" }
};

/** Maps database enum values to human labels + colours. Never print raw enum values in the UI. */
export function StatusBadge({ status }: { status: string }) {
  const t = TONES[status] ?? { label: status.toLowerCase().replace(/_/g, " "), tone: "neutral" };
  return <span className={`badge badge-${t.tone}`}>{t.label}</span>;
}

export function SoonBadge() {
  return <span className="badge badge-info">Coming soon</span>;
}
