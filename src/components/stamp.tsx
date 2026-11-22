import type { Dict } from "@/i18n/dictionaries";

const TONE: Record<string, string> = { APPROVED: "ok", ACTIVE: "ok", COMPLETED: "ok", PENDING_REVIEW: "wait", REJECTED: "redo" };

/** The signature detail: a teacher's check stamp. Used ONLY for project status, never for decoration. */
export function Stamp({ status, t, large }: { status: string; t: Dict; large?: boolean }) {
  const label = t.status[status as keyof Dict["status"]] ?? status;
  return <span className={`stamp stamp-${TONE[status] ?? "wait"}${large ? " stamp-lg" : ""}`}>{label}</span>;
}
