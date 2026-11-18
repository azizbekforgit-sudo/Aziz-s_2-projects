"use client";
import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle, PartyPopper } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/fmt";
import { registerAction, type RegisterState } from "./actions";
import { TextField, SelectField, SubmitButton } from "@/components/form-fields";
import { GRADES, LANGUAGES } from "@/lib/validators";

// NOTE: no form.reset() / e.currentTarget here on purpose — the success screen replaces the form.
// (Calling e.currentTarget.reset() after an await was the old "Cannot read properties of null" bug.)
export function RegisterForm({ defaultLang }: { defaultLang: string }) {
  const { t } = useI18n();
  const r = t.register;
  const [state, action] = useActionState<RegisterState, FormData>(registerAction, {});
  const e = state.errors ?? {};
  const v = state.values ?? {};

  if (state.ok) {
    return (
      <div className="stack-lg" role="status">
        <span className="icon-tile icon-tile-solid accent-amber"><PartyPopper size={20} aria-hidden="true" /></span>
        <div className="auth-card-head">
          <span className="eyebrow">{r.successEyebrow}</span>
          <h1 className="h2">{r.successTitle}</h1>
          <p className="muted">{r.successText}</p>
        </div>
        <Link className="btn btn-primary btn-lg btn-block" href="/login">{r.successButton}</Link>
      </div>
    );
  }

  return (
    <>
      <div className="auth-card-head">
        <span className="eyebrow">{r.eyebrow}</span>
        <h1 className="h2">{r.title}</h1>
        <p className="muted">{r.lead}</p>
      </div>
      {/* key forces React to re-apply defaultValues after a failed submit */}
      <form action={action} className="form" noValidate key={JSON.stringify(v)}>
        {e.form && <div className="alert alert-danger" role="alert"><AlertCircle size={18} aria-hidden="true" /><span>{t.errors[e.form]}</span></div>}
        <TextField name="name" label={r.name} autoComplete="name" required defaultValue={v.name} error={e.name} placeholder={r.namePh} />
        <TextField name="email" label={r.email} type="email" autoComplete="email" required defaultValue={v.email} error={e.email} placeholder={r.emailPh} />
        <TextField name="password" label={r.password} type="password" autoComplete="new-password" required error={e.password} hint={r.passwordHint} />
        <div className="grid-2">
          <SelectField name="grade" label={r.grade} required defaultValue={v.grade ?? ""} error={e.grade}>
            <option value="" disabled>{r.gradeSelect}</option>
            {GRADES.map((g) => <option key={g} value={g}>{fmt(r.gradeN, { n: g })}</option>)}
          </SelectField>
          <SelectField name="preferredLang" label={r.language} defaultValue={v.preferredLang ?? defaultLang} error={e.preferredLang}>
            {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
          </SelectField>
        </div>
        <SubmitButton pendingText={r.pending}>{r.submit}</SubmitButton>
        <p className="auth-switch">{r.already} <Link className="text-link" href="/login">{r.signInLink}</Link></p>
      </form>
    </>
  );
}
