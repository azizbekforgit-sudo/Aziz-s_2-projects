"use client";
import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { createOpportunity, type OpportunityState } from "./actions";
import { TextField, TextArea, SelectField, SubmitButton } from "@/components/form-fields";
import { OPPORTUNITY_CATEGORIES } from "@/lib/validators";

export function OpportunityForm() {
  const { t } = useI18n();
  const f = t.admin.opp;
  const [state, action] = useActionState<OpportunityState, FormData>(createOpportunity, {});
  const e = state.errors ?? {};
  const v = state.values ?? {};
  // After a successful publish the key changes, so the form clears for the next one.
  return (
    <form action={action} className="form" noValidate key={state.ok ? `ok-${Date.now()}` : JSON.stringify(v)}>
      {state.ok && <p className="notice notice-success" role="status"><CheckCircle2 size={18} strokeWidth={1.8} aria-hidden="true" />{f.done}</p>}
      <fieldset className="form-group">
        <legend className="eyebrow">{t.admin.oppMain}</legend>
        <div className="grid-2">
          <TextField name="title" label={f.title} required defaultValue={v.title} error={e.title} />
          <TextField name="organizer" label={f.organizer} required defaultValue={v.organizer} error={e.organizer} />
        </div>
        <SelectField name="category" label={f.category} required defaultValue={v.category ?? ""} error={e.category}>
          <option value="" disabled>{t.newProject.categoryPh}</option>
          {OPPORTUNITY_CATEGORIES.map((c) => <option key={c} value={c}>{t.oppCategories[c]}</option>)}
        </SelectField>
        <TextArea name="description" label={f.description} required rows={4} maxLength={2000} defaultValue={v.description} error={e.description} />
      </fieldset>
      <fieldset className="form-group">
        <legend className="eyebrow">{t.admin.oppDates}</legend>
        <div className="grid-2">
          <TextField name="deadline" label={f.deadline} type="date" defaultValue={v.deadline} error={e.deadline} />
          <TextField name="officialUrl" label={f.url} type="url" inputMode="url" placeholder="https://" defaultValue={v.officialUrl} error={e.officialUrl} />
        </div>
      </fieldset>
      <div className="row"><SubmitButton pendingText={f.submitting} className="btn btn-primary">{f.submit}</SubmitButton></div>
    </form>
  );
}
