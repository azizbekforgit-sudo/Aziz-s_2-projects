"use client";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { reviewProject, type ReviewState } from "@/app/admin/actions";
import { TextArea } from "@/components/form-fields";

/** Moderator's decision. Returning a project requires a note, so the author knows what to fix. */
export function ReviewForm({ projectId, bare }: { projectId: string; bare?: boolean }) {
  const { t } = useI18n();
  const pt = t.project;
  const [state, action, pending] = useActionState<ReviewState, FormData>(reviewProject, {});
  return (
    <form action={action} className={bare ? "decision" : "panel form"} aria-labelledby={`decide-${projectId}`}>
      <div className="stack-sm">
        <h2 id={`decide-${projectId}`} className="h3">{pt.decisionTitle}</h2>
        <p className="caption">{pt.decisionHint}</p>
      </div>
      <input type="hidden" name="projectId" value={projectId} />
      <TextArea name="note" label={pt.noteLabel} hint={pt.noteHint} rows={4} maxLength={1000} error={state.error} />
      <div className="row">
        <button className="btn btn-primary" name="decision" value="approve" disabled={pending}>{pending && <Loader2 size={16} className="spin" aria-hidden="true" />}{pt.approve}</button>
        <button className="btn btn-caution" name="decision" value="reject" disabled={pending}>{pt.reject}</button>
      </div>
    </form>
  );
}
