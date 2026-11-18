"use server";
import { registerSchema, fieldErrors } from "@/lib/validators";
import { registerStudent } from "@/lib/users";

export type RegisterState = { ok?: boolean; errors?: Record<string, string>; values?: Record<string, string> };

export async function registerAction(_prev: RegisterState, formData: FormData): Promise<RegisterState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  // Never send the password back to the browser.
  const { password: _pw, ...values } = raw;
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) return { errors: fieldErrors(parsed.error), values };
  const result = await registerStudent(parsed.data);
  if (!result.ok) return { errors: { [result.field ?? "form"]: result.error }, values };
  return { ok: true };
}
