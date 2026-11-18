"use client";
import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle, MailCheck } from "lucide-react";
import { registerAction, type RegisterState } from "./actions";
import { TextField, SelectField, SubmitButton } from "@/components/form-fields";
import { GRADES, LANGUAGES } from "@/lib/validators";

export function RegisterForm() {
  const [state, action] = useActionState<RegisterState, FormData>(registerAction, {});
  const e = state.errors ?? {};
  const v = state.values ?? {};

  if (state.ok) {
    return (
      <div className="stack-lg" role="status">
        <span className="icon-tile accent-gold"><MailCheck size={20} aria-hidden="true" /></span>
        <div className="auth-card-head">
          <span className="eyebrow">Request sent</span>
          <h1 className="h2">You’re on the list!</h1>
          <p className="muted">Your account was created and is waiting for approval. A coordinator checks every new student account — this keeps the platform safe. Once it’s approved you can sign in.</p>
        </div>
        <Link className="btn btn-secondary btn-lg btn-block" href="/login">Go to sign in</Link>
      </div>
    );
  }

  return (
    <>
      <div className="auth-card-head">
        <span className="eyebrow">Start your journey</span>
        <h1 className="h2">Create your account</h1>
        <p className="muted">For students in grades 7–11. New accounts are activated after a quick review.</p>
      </div>
      {/* key forces React to re-apply defaultValues after a failed submit */}
      <form action={action} className="form" noValidate key={JSON.stringify(v)}>
        {e.form && <div className="alert alert-danger" role="alert"><AlertCircle size={18} aria-hidden="true" /><span>{e.form}</span></div>}
        <TextField name="name" label="Full name" autoComplete="name" required defaultValue={v.name} error={e.name} placeholder="e.g. Aziza Karimova" />
        <TextField name="email" label="Email" type="email" autoComplete="email" required defaultValue={v.email} error={e.email} placeholder="you@example.com" />
        <TextField name="password" label="Password" type="password" autoComplete="new-password" required error={e.password} hint="At least 10 characters." />
        <div className="grid-2">
          <SelectField name="grade" label="Grade" required defaultValue={v.grade ?? ""} error={e.grade}>
            <option value="" disabled>Select</option>
            {GRADES.map((g) => <option key={g} value={g}>Grade {g}</option>)}
          </SelectField>
          <SelectField name="preferredLang" label="Language" defaultValue={v.preferredLang ?? "uz"} error={e.preferredLang}>
            {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
          </SelectField>
        </div>
        <SubmitButton pendingText="Creating account…">Create student account</SubmitButton>
        <p className="auth-switch">Already registered? <Link className="text-link" href="/login">Sign in</Link></p>
      </form>
    </>
  );
}
