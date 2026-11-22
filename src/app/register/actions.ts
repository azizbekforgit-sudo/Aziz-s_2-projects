"use server";
import { registerSchema, fieldErrors, type ErrorKey } from "@/lib/validators";
import { registerStudent } from "@/lib/users";
import { signIn } from "@/auth";
import { getLocale } from "@/i18n/server";

export type RegisterState = { errors?: Record<string, ErrorKey>; values?: Record<string, string> };

/** Creates the account and signs the student straight in — there is no approval step. */
export async function registerAction(_prev: RegisterState, formData: FormData): Promise<RegisterState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const { password: _pw, ...values } = raw; // never send the password back to the browser
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) return { errors: fieldErrors(parsed.error), values };
  const result = await registerStudent(parsed.data, await getLocale());
  if (!result.ok) return { errors: { [result.field]: result.error }, values };
  // Throws a redirect on success (must not be caught).
  await signIn("credentials", { email: parsed.data.email, password: parsed.data.password, redirectTo: "/dashboard?welcome=1" });
  return {};
}
