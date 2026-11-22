"use client";
import Link from "next/link";
import { useActionState } from "react";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/fmt";
import { registerAction, type RegisterState } from "./actions";
import { Clock3 } from "lucide-react";
import { TextField, PasswordField, SelectField, SubmitButton } from "@/components/form-fields";
import { GRADES } from "@/lib/validators";

// No form.reset() / e.currentTarget here: the confirmation replaces the form.
// (e.currentTarget.reset() after an await was the old "Cannot read properties of null" bug.)
export function RegisterForm() {
  const { t } = useI18n();
  const r = t.register;
  const [state, action] = useActionState<RegisterState, FormData>(registerAction, {});
  const e = state.errors ?? {};
  const v = state.values ?? {};

  if (state.ok) {
    return (
      <div className="stack" role="status">
        <h1 className="h1">{r.doneTitle}</h1>
        <p className="notice notice-info"><Clock3 size={18} strokeWidth={1.8} aria-hidden="true" /><span>{r.doneText}</span></p>
        <Link className="btn btn-secondary btn-lg btn-block mt-16" href="/login">{r.doneButton}</Link>
      </div>
    );
  }

  return (
    <>
      <div className="stack-sm">
        <h1 className="h1">{r.title}</h1>
        <p className="muted">{r.lead}</p>
      </div>
      {/* key re-applies defaultValues after a failed submit */}
      <form action={action} className="form" noValidate key={JSON.stringify(v)}>
        <TextField name="name" label={r.name} autoComplete="name" required defaultValue={v.name} error={e.name} placeholder={r.namePh} />
        <TextField name="email" label={r.email} type="email" autoComplete="email" required defaultValue={v.email} error={e.email} />
        <PasswordField name="password" label={r.password} autoComplete="new-password" required error={e.password} hint={r.passwordHint} />
        <div className="grid-2">
          <TextField name="schoolName" label={r.school} required defaultValue={v.schoolName} error={e.schoolName} placeholder={r.schoolPh} hint={r.schoolHint} />
          <SelectField name="grade" label={r.grade} required defaultValue={v.grade ?? ""} error={e.grade}>
            <option value="" disabled>{r.gradeSelect}</option>
            {GRADES.map((g) => <option key={g} value={g}>{fmt(r.gradeN, { n: g })}</option>)}
          </SelectField>
        </div>
        <SubmitButton pendingText={r.submitting}>{r.submit}</SubmitButton>
        <p className="auth-switch">{r.already} <Link className="link" href="/login">{r.signInLink}</Link></p>
      </form>
    </>
  );
}
