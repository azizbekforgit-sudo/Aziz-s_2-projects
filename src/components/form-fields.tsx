"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useI18n } from "@/i18n/client";
import type { ErrorKey } from "@/lib/validators";

type Common = { name: string; label: React.ReactNode; error?: ErrorKey; hint?: string };

function describedBy(name: string, error?: string, hint?: string) {
  return [error && `${name}-error`, hint && `${name}-hint`].filter(Boolean).join(" ") || undefined;
}

// Hint and error live OUTSIDE <label> and are linked via aria-describedby, so they are not part of the field name.
/** Hint under the field, replaced by the translated error when validation fails. */
function Meta({ name, error, hint }: { name: string; error?: ErrorKey; hint?: string }) {
  const { t } = useI18n();
  return (
    <>
      {hint && !error && <span id={`${name}-hint`} className="field-hint">{hint}</span>}
      {error && <span id={`${name}-error`} className="field-error" role="alert"><AlertCircle size={16} strokeWidth={1.8} aria-hidden="true" />{t.errors[error] ?? t.errors.generic}</span>}
    </>
  );
}

export function TextField({ name, label, error, hint, ...rest }: Common & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={name}>{label}</label>
      <input className="input" id={name} name={name} aria-invalid={!!error || undefined} aria-describedby={describedBy(name, error, hint)} {...rest} />
      <Meta name={name} error={error} hint={hint} />
    </div>
  );
}

export function TextArea({ name, label, error, hint, ...rest }: Common & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={name}>{label}</label>
      <textarea className="input" id={name} name={name} aria-invalid={!!error || undefined} aria-describedby={describedBy(name, error, hint)} {...rest} />
      <Meta name={name} error={error} hint={hint} />
    </div>
  );
}

export function SelectField({ name, label, error, hint, children, ...rest }: Common & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={name}>{label}</label>
      <select className="input" id={name} name={name} aria-invalid={!!error || undefined} aria-describedby={describedBy(name, error, hint)} {...rest}>
        {children}
      </select>
      <Meta name={name} error={error} hint={hint} />
    </div>
  );
}

/** Submit button that disables itself while the form's server action runs. */
export function SubmitButton({ children, pendingText, className = "btn btn-primary btn-lg btn-block" }: { children: React.ReactNode; pendingText: string; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending} aria-disabled={pending}>
      {pending ? <><Loader2 size={16} className="spin" aria-hidden="true" /> {pendingText}</> : children}
    </button>
  );
}

/** Password input with a show/hide toggle. */
export function PasswordField({ name, label, error, hint, ...rest }: Common & React.InputHTMLAttributes<HTMLInputElement>) {
  const { t } = useI18n();
  const [shown, setShown] = useState(false);
  return (
    <div className="field">
      <label className="field-label" htmlFor={name}>{label}</label>
      <div className="password">
        <input className="input" id={name} name={name} type={shown ? "text" : "password"} aria-invalid={!!error || undefined} aria-describedby={describedBy(name, error, hint)} {...rest} />
        <button type="button" className="password-toggle" onClick={() => setShown((v) => !v)} aria-pressed={shown} aria-label={shown ? t.login.hidePassword : t.login.showPassword}>
          {shown ? <EyeOff size={18} strokeWidth={1.8} aria-hidden="true" /> : <Eye size={18} strokeWidth={1.8} aria-hidden="true" />}
        </button>
      </div>
      <Meta name={name} error={error} hint={hint} />
    </div>
  );
}
