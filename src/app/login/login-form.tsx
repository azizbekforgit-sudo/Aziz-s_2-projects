"use client";
import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle, Info } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { loginAction, type LoginState } from "./actions";
import { TextField, PasswordField, SubmitButton } from "@/components/form-fields";

export function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  const { t } = useI18n();
  const [state, action] = useActionState<LoginState, FormData>(loginAction, {});
  // "Waiting for approval" is a normal step, not an error — so it is shown calmly.
  const calm = state.error === "pending";
  return (
    <form action={action} className="form" noValidate>
      {state.error && (
        <p className={`notice ${calm ? "notice-info" : "notice-error"}`} role="alert">
          {calm ? <Info size={18} strokeWidth={1.8} aria-hidden="true" /> : <AlertCircle size={18} strokeWidth={1.8} aria-hidden="true" />}
          <span>{t.login[state.error]}</span>
        </p>
      )}
      <input type="hidden" name="callbackUrl" value={callbackUrl ?? "/dashboard"} />
      <TextField name="email" label={t.login.email} type="email" autoComplete="email" required defaultValue={state.email} />
      <PasswordField name="password" label={t.login.password} autoComplete="current-password" required />
      <SubmitButton pendingText={t.login.submitting}>{t.login.submit}</SubmitButton>
      <p className="auth-switch">{t.login.newHere} <Link className="link" href="/register">{t.login.createLink}</Link></p>
    </form>
  );
}
