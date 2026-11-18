"use client";
import { useActionState } from "react";
import { createProjectAction, type ProjectState } from "./actions";
import { TextField, TextArea, SelectField, SubmitButton } from "@/components/form-fields";
import { PROJECT_CATEGORIES } from "@/lib/validators";

export function ProjectForm() {
  const [state, action] = useActionState<ProjectState, FormData>(createProjectAction, {});
  const e = state.errors ?? {};
  const v = state.values ?? {};
  return (
    <form action={action} className="form" noValidate key={JSON.stringify(v)}>
      <div className="grid-2">
        <TextField name="title" label="Project title" required maxLength={100} defaultValue={v.title} error={e.title} placeholder="e.g. Clean water sensors for our village" />
        <SelectField name="category" label="Category" required defaultValue={v.category ?? ""} error={e.category}>
          <option value="" disabled>Choose a category</option>
          {PROJECT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </SelectField>
      </div>
      <TextArea name="summary" label="Short summary" required maxLength={500} rows={3} defaultValue={v.summary} error={e.summary} hint="20–500 characters. This is what people see on the projects page." />
      <TextArea name="problemStatement" label="What problem are you solving? (optional)" maxLength={3000} rows={5} defaultValue={v.problemStatement} error={e.problemStatement} />
      <TextArea name="proposedSolution" label="How will you solve it? (optional)" maxLength={3000} rows={5} defaultValue={v.proposedSolution} error={e.proposedSolution} />
      <div className="row">
        <SubmitButton pendingText="Submitting…" className="btn btn-primary btn-lg">Submit for review</SubmitButton>
      </div>
    </form>
  );
}
