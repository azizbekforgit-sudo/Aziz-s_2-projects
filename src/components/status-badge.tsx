import type { Dict } from "@/i18n/dictionaries";

type StatusKey = keyof Dict["status"];
const TONE: Record<StatusKey, string> = {
  PENDING: "warning", ACTIVE: "success", SUSPENDED: "danger", DEACTIVATED: "neutral",
  UNVERIFIED: "neutral", VERIFIED: "success", REJECTED: "danger",
  DRAFT: "neutral", PENDING_REVIEW: "warning", APPROVED: "success", ACTIVE_PROJECT: "info", COMPLETED: "info", ARCHIVED: "neutral"
};

/**
 * Maps database enum values to translated labels + colours. Never print raw enum values in the UI.
 * `kind="project"` is needed because ACTIVE means different things for accounts and projects.
 */
export function StatusBadge({ status, t, kind }: { status: string; t: Dict; kind?: "project" }) {
  const key = (kind === "project" && status === "ACTIVE" ? "ACTIVE_PROJECT" : status) as StatusKey;
  const label = t.status[key] ?? status;
  return <span className={`badge badge-${TONE[key] ?? "neutral"}`}>{label}</span>;
}
