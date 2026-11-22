import { Check, Clock3, CornerDownLeft } from "lucide-react";
import type { Dict } from "@/i18n/dictionaries";

const KIND: Record<string, "pending" | "approved" | "revision"> = {
  PENDING_REVIEW: "pending", APPROVED: "approved", ACTIVE: "approved", COMPLETED: "approved", REJECTED: "revision"
};
const ICON = { pending: Clock3, approved: Check, revision: CornerDownLeft };

/**
 * Signature detail: an ink stamp. Used ONLY for project status.
 * Colour is never the only signal — every stamp has an icon and a word.
 */
export function Stamp({ status, t, large, animate }: { status: string; t: Dict; large?: boolean; animate?: boolean }) {
  const kind = KIND[status] ?? "pending";
  const Icon = ICON[kind];
  const label = t.status[status as keyof Dict["status"]] ?? status;
  return (
    <span className={`stamp stamp-${kind}${large ? " stamp-lg" : ""}${animate ? " stamp-anim" : ""}`}>
      <Icon strokeWidth={2} aria-hidden="true" />
      {label}
    </span>
  );
}
