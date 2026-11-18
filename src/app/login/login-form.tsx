"use client";
import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { loginAction, type LoginState } from "./actions";
import { TextField, SubmitButton } from "@/components/form-fields";

export function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  const { t } = useI18n();
  const [state, action] = useActionState<LoginState, FormData>(loginAction, {});
  return (
    <form action={action} className="form" noValidate>
      {state.error && (
        <div className="alert alert-danger" role="alert"><AlertCircle size={18} aria-hidden="true" /><span>{t.login[state.error]}</span></div>
      )}
      <input type="hidden" name="callbackUrl" value={callbackUrl ?? "/dashboard"} />
      <TextField name="email" label={t.login.email} type="email" autoComplete="email" required defaultValue={state.email} placeholder="you@example.com" />
      <TextField name="password" label={t.login.password} type="password" autoComplete="current-password" required />
      <SubmitButton pendingText={t.login.pending}>{t.login.submit}</SubmitButton>
      <p className="auth-switch">{t.login.newHere} <Link className="text-link" href="/register">{t.login.createLink}</Link></p>
    </form>
  );
}
