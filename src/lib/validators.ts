import { z } from "zod";
import type { Dict } from "@/i18n/dictionaries";

// All form rules live here, shared by API routes, server actions and tests.
// Messages are KEYS into the `errors` section of the dictionaries (src/i18n/*.ts),
// so the same rule is shown in Uzbek or Russian depending on the visitor's language.

export type ErrorKey = keyof Dict["errors"];
const e = (key: ErrorKey) => ({ error: key });

const email = z
  .string(e("emailRequired"))
  .trim()
  .toLowerCase()
  .min(1, e("emailRequired"))
  .pipe(z.email(e("emailInvalid")));

export const loginSchema = z.object({
  email,
  password: z.string(e("passwordRequired")).min(1, e("passwordRequired"))
});

/** Empty form fields arrive as "" — treat them as "not provided". */
const optionalText = (max: number) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    z.string().trim().max(max, e("textMax")).optional()
  );

export const GRADES = [7, 8, 9, 10, 11] as const;
export const LANGUAGES = [
  { value: "uz", label: "Oʻzbekcha" },
  { value: "ru", label: "Русский" },
  { value: "en", label: "English" }
] as const;

export const registerSchema = z.object({
  name: z.string(e("nameRequired")).trim().min(1, e("nameRequired")).min(2, e("nameMin")).max(80, e("nameMax")),
  email,
  password: z.string(e("passwordRequired")).min(1, e("passwordRequired")).min(10, e("passwordMin")).max(100, e("passwordMax")),
  preferredLang: z.enum(["uz", "ru", "en"], e("langRequired")).default("uz"),
  grade: z.coerce.number(e("gradeRequired")).int(e("gradeRequired")).min(7, e("gradeRequired")).max(11, e("gradeRequired")),
  regionId: optionalText(40),
  schoolId: optionalText(40)
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const PROJECT_CATEGORIES = ["Technology", "Business", "Education", "Ecology", "Social Innovation", "Engineering"] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const projectSchema = z.object({
  title: z.string(e("titleRequired")).trim().min(1, e("titleRequired")).min(4, e("titleMin")).max(100, e("titleMax")),
  summary: z.string(e("summaryRequired")).trim().min(1, e("summaryRequired")).min(20, e("summaryMin")).max(500, e("summaryMax")),
  category: z.enum(PROJECT_CATEGORIES, e("categoryRequired")),
  problemStatement: optionalText(3000),
  proposedSolution: optionalText(3000)
});
export type ProjectInput = z.infer<typeof projectSchema>;

/** Turns a ZodError into `{ field: errorKey }` (first error per field). */
export function fieldErrors(error: z.ZodError): Record<string, ErrorKey> {
  const out: Record<string, ErrorKey> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= (issue.message in KNOWN ? issue.message : "generic") as ErrorKey;
  }
  return out;
}

// Guard against zod's built-in English messages leaking through (e.g. unexpected type errors).
const KNOWN: Record<string, true> = Object.fromEntries(
  ["generic", "nameRequired", "nameMin", "nameMax", "emailRequired", "emailInvalid", "emailTaken", "passwordRequired", "passwordMin", "passwordMax", "gradeRequired", "langRequired", "unknownRegion", "titleRequired", "titleMin", "titleMax", "summaryRequired", "summaryMin", "summaryMax", "categoryRequired", "textMax", "signInRequired", "forbidden"].map((k) => [k, true])
);
