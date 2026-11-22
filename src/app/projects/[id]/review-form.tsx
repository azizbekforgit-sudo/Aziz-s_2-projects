"use client";
import { useActionState } from "react";
import { useI18n } from "@/i18n/client";
import { reviewProject, type ReviewState } from "@/app/admin/actions";
import { TextArea } from "@/components/form-fields";

/** Moderator's decision. Rejecting requires a note, so the student knows what to fix. */
export function ReviewForm({ projectId }: { projectId: string }) {
  const { t } = useI18n();
  const pt = t.project;
  const [state, action, pending] = useActionState<ReviewState, FormData>(reviewProject, {});
  return (
    <form action={action} className="panel form">
      <h2 className="h3">{pt.decisionTitle}</h2>
      <input type="hidden" name="projectId" value={projectId} />
      <TextArea name="note" label={pt.noteLabel} hint={pt.noteHint} rows={4} maxLength={1000} error={state.error} />
      <div className="row">
        <button className="btn btn-primary" name="decision" value="approve" disabled={pending}>{pt.approve}</button>
        <button className="btn btn-danger" name="decision" value="reject" disabled={pending}>{pt.reject}</button>
      </div>
    </form>
  );
}
