"use client";
import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { loginAction, type LoginState } from "./actions";
import { TextField, SubmitButton } from "@/components/form-fields";

export function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  const [state, action] = useActionState<LoginState, FormData>(loginAction, {});
  return (
    <form action={action} className="form" noValidate>
      {state.error && (
        <div className="alert alert-danger" role="alert"><AlertCircle size={18} aria-hidden="true" /><span>{state.error}</span></div>
      )}
      <input type="hidden" name="callbackUrl" value={callbackUrl ?? "/dashboard"} />
      <TextField name="email" label="Email" type="email" autoComplete="email" required defaultValue={state.email} placeholder="you@example.com" />
      <TextField name="password" label="Password" type="password" autoComplete="current-password" required />
      <SubmitButton pendingText="Signing in…">Sign in</SubmitButton>
      <p className="auth-switch">New to the platform? <Link className="text-link" href="/register">Create an account</Link></p>
    </form>
  );
}
