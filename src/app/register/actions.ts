"use server";
import { registerSchema, fieldErrors, type ErrorKey } from "@/lib/validators";
import { registerStudent } from "@/lib/users";
import { getLocale } from "@/i18n/server";

export type RegisterState = { ok?: boolean; errors?: Record<string, ErrorKey>; values?: Record<string, string> };

export async function registerAction(_prev: RegisterState, formData: FormData): Promise<RegisterState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const { password: _pw, ...values } = raw; // never send the password back to the browser
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) return { errors: fieldErrors(parsed.error), values };
  const result = await registerStudent(parsed.data, await getLocale());
  if (!result.ok) return { errors: { [result.field]: result.error }, values };
  return { ok: true };
}
