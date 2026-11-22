"use client";
import Link from "next/link";
import { useActionState } from "react";
import { useI18n } from "@/i18n/client";
import { loginAction, type LoginState } from "./actions";
import { TextField, SubmitButton } from "@/components/form-fields";

export function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  const { t } = useI18n();
  const [state, action] = useActionState<LoginState, FormData>(loginAction, {});
  return (
    <form action={action} className="form" noValidate>
      {state.error && <p className={`alert${state.error === "pending" ? "" : " alert-error"}`} role="alert">{t.login[state.error]}</p>}
      <input type="hidden" name="callbackUrl" value={callbackUrl ?? "/dashboard"} />
      <TextField name="email" label={t.login.email} type="email" autoComplete="email" required defaultValue={state.email} />
      <TextField name="password" label={t.login.password} type="password" autoComplete="current-password" required />
      <SubmitButton pendingText={t.login.submitting}>{t.login.submit}</SubmitButton>
      <p className="auth-switch">{t.login.newHere} <Link className="link" href="/register">{t.login.createLink}</Link></p>
    </form>
  );
}
