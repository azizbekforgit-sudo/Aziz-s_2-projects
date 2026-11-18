"use client";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

type Common = { name: string; label: string; error?: string; hint?: string };

function describedBy(name: string, error?: string, hint?: string) {
  return [error && `${name}-error`, hint && `${name}-hint`].filter(Boolean).join(" ") || undefined;
}

function Meta({ name, error, hint }: { name: string; error?: string; hint?: string }) {
  return (
    <>
      {hint && !error && <span id={`${name}-hint`} className="field-hint">{hint}</span>}
      {error && <span id={`${name}-error`} className="field-error" role="alert">{error}</span>}
    </>
  );
}

export function TextField({ name, label, error, hint, ...rest }: Common & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <input className="input" name={name} aria-invalid={!!error || undefined} aria-describedby={describedBy(name, error, hint)} {...rest} />
      <Meta name={name} error={error} hint={hint} />
    </label>
  );
}

export function TextArea({ name, label, error, hint, ...rest }: Common & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <textarea className="input" name={name} aria-invalid={!!error || undefined} aria-describedby={describedBy(name, error, hint)} {...rest} />
      <Meta name={name} error={error} hint={hint} />
    </label>
  );
}

export function SelectField({ name, label, error, hint, children, ...rest }: Common & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <select className="input" name={name} aria-invalid={!!error || undefined} aria-describedby={describedBy(name, error, hint)} {...rest}>
        {children}
      </select>
      <Meta name={name} error={error} hint={hint} />
    </label>
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
