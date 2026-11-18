"use client";
import { useActionState } from "react";
import { useI18n } from "@/i18n/client";
import { createProjectAction, type ProjectState } from "./actions";
import { TextField, TextArea, SelectField, SubmitButton } from "@/components/form-fields";
import { PROJECT_CATEGORIES } from "@/lib/validators";

export function ProjectForm() {
  const { t } = useI18n();
  const n = t.newProject;
  const [state, action] = useActionState<ProjectState, FormData>(createProjectAction, {});
  const e = state.errors ?? {};
  const v = state.values ?? {};
  return (
    <form action={action} className="form" noValidate key={JSON.stringify(v)}>
      <div className="grid-2">
        <TextField name="title" label={n.titleLabel} required maxLength={100} defaultValue={v.title} error={e.title} placeholder={n.titlePh} />
        <SelectField name="category" label={n.category} required defaultValue={v.category ?? ""} error={e.category}>
          <option value="" disabled>{n.categoryPh}</option>
          {PROJECT_CATEGORIES.map((c) => <option key={c} value={c}>{t.categories[c]}</option>)}
        </SelectField>
      </div>
      <TextArea name="summary" label={n.summary} required maxLength={500} rows={3} defaultValue={v.summary} error={e.summary} hint={n.summaryHint} />
      <TextArea name="problemStatement" label={n.problem} maxLength={3000} rows={5} defaultValue={v.problemStatement} error={e.problemStatement} />
      <TextArea name="proposedSolution" label={n.solution} maxLength={3000} rows={5} defaultValue={v.proposedSolution} error={e.proposedSolution} />
      <div className="row">
        <SubmitButton pendingText={n.pending} className="btn btn-primary btn-lg">{n.submit}</SubmitButton>
      </div>
    </form>
  );
}
