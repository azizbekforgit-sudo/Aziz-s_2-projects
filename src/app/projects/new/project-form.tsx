"use client";
import { useActionState, useState } from "react";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/fmt";
import { createProjectAction, type ProjectState } from "./actions";
import { TextField, TextArea, SelectField, SubmitButton } from "@/components/form-fields";
import { ProjectSheet } from "@/components/project-sheet";
import { PROJECT_CATEGORIES } from "@/lib/validators";

type Draft = Record<"title" | "category" | "summary" | "problemStatement" | "proposedSolution", string>;

/** Form + live preview of the sheet. The preview only mirrors what is typed; nothing is saved until submit. */
export function ProjectForm({ author, grade }: { author: string; grade: number | null }) {
  const { t } = useI18n();
  const n = t.newProject;
  const [state, action] = useActionState<ProjectState, FormData>(createProjectAction, {});
  const e = state.errors ?? {};
  const v = state.values ?? {};
  const [d, setD] = useState<Draft>({ title: v.title ?? "", category: v.category ?? "", summary: v.summary ?? "", problemStatement: v.problemStatement ?? "", proposedSolution: v.proposedSolution ?? "" });
  const onInput = (ev: React.FormEvent<HTMLFormElement>) => {
    const el = ev.target as HTMLInputElement;
    if (el.name in d) setD((x) => ({ ...x, [el.name]: el.value }));
  };
  const optional = (label: string) => <>{label} <span className="caption">· {n.optional}</span></>;
  const sections = [
    { label: n.summary, text: d.summary || "…", placeholder: !d.summary },
    ...(d.problemStatement ? [{ label: n.problem, text: d.problemStatement }] : []),
    ...(d.proposedSolution ? [{ label: n.solution, text: d.proposedSolution }] : [])
  ];

  return (
    <div className="compose">
      <form action={action} onInput={onInput} className="form panel" noValidate key={JSON.stringify(v)}>
        <TextField name="title" label={n.titleLabel} required maxLength={100} defaultValue={v.title} error={e.title} placeholder={n.titlePh} />
        <SelectField name="category" label={n.category} required defaultValue={v.category ?? ""} error={e.category} onChange={(ev) => setD((x) => ({ ...x, category: ev.target.value }))}>
          <option value="" disabled>{n.categoryPh}</option>
          {PROJECT_CATEGORIES.map((c) => <option key={c} value={c}>{t.categories[c]}</option>)}
        </SelectField>
        <TextArea name="summary" label={n.summary} required maxLength={500} rows={3} defaultValue={v.summary} error={e.summary} hint={n.summaryHint} />
        <TextArea name="problemStatement" label={optional(n.problem)} maxLength={3000} rows={5} defaultValue={v.problemStatement} error={e.problemStatement} hint={n.problemHint} />
        <TextArea name="proposedSolution" label={optional(n.solution)} maxLength={3000} rows={5} defaultValue={v.proposedSolution} error={e.proposedSolution} hint={n.solutionHint} />
        <div className="stack-sm">
          <div className="row"><SubmitButton pendingText={n.submitting} className="btn btn-primary btn-lg">{n.submit}</SubmitButton></div>
          <p className="caption submit-note">{n.after}</p>
        </div>
      </form>
      <aside className="compose-preview" aria-label={n.previewLabel}>
        <span className="eyebrow">{n.previewLabel}</span>
        <ProjectSheet t={t} category={d.category ? t.categories[d.category as keyof typeof t.categories] : undefined}
          title={d.title || n.previewTitle} titlePlaceholder={!d.title}
          author={fmt(t.project.author, { name: author, grade: grade ?? "—" })} sections={sections} />
        <p className="caption">{n.previewNote}</p>
      </aside>
    </div>
  );
}
