import { z } from "zod";
import type { Dict } from "@/i18n/dictionaries";

// All form rules live here, shared by server actions and tests.
// Messages are KEYS into the `errors` section of the dictionaries (src/i18n/*.ts),
// so the same rule is shown in Uzbek or Russian depending on the visitor's language.

export type ErrorKey = keyof Dict["errors"];
const e = (key: ErrorKey) => ({ error: key });

/** Empty form fields arrive as "" — treat them as "not provided". */
const blankToUndefined = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);
const optionalText = (max: number) => z.preprocess(blankToUndefined, z.string().trim().max(max, e("textMax")).optional());

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

export const GRADES = [7, 8, 9, 10, 11] as const;

export const registerSchema = z.object({
  name: z.string(e("nameRequired")).trim().min(1, e("nameRequired")).min(2, e("nameMin")).max(80, e("nameMax")),
  email,
  password: z.string(e("passwordRequired")).min(1, e("passwordRequired")).min(10, e("passwordMin")).max(100, e("passwordMax")),
  // The coordinator needs the school to decide whether to approve the account.
  schoolName: z.string(e("schoolRequired")).trim().min(1, e("schoolRequired")).max(120, e("schoolMax")),
  grade: z.coerce.number(e("gradeRequired")).int(e("gradeRequired")).min(7, e("gradeRequired")).max(11, e("gradeRequired"))
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const PROJECT_CATEGORIES = ["Technology", "Business", "Education", "Ecology", "Social Innovation", "Engineering"] as const;

export const projectSchema = z.object({
  title: z.string(e("titleRequired")).trim().min(1, e("titleRequired")).min(4, e("titleMin")).max(100, e("titleMax")),
  summary: z.string(e("summaryRequired")).trim().min(1, e("summaryRequired")).min(20, e("summaryMin")).max(500, e("summaryMax")),
  category: z.enum(PROJECT_CATEGORIES, e("categoryRequired")),
  problemStatement: optionalText(3000),
  proposedSolution: optionalText(3000)
});

/** A rejection must say what to fix — otherwise the student can't act on it. */
export const reviewSchema = z.discriminatedUnion("decision", [
  z.object({ decision: z.literal("approve"), note: optionalText(1000) }),
  z.object({ decision: z.literal("reject"), note: z.string(e("noteRequired")).trim().min(1, e("noteRequired")).max(1000, e("textMax")) })
]);

export const OPPORTUNITY_CATEGORIES = ["Competition", "Olympiad", "Scholarship", "Grant", "Program"] as const;

export const opportunitySchema = z.object({
  title: z.string(e("titleRequired")).trim().min(1, e("titleRequired")).min(4, e("titleMin")).max(120, e("titleMax")),
  organizer: z.string(e("orgRequired")).trim().min(1, e("orgRequired")).max(120, e("textMax")),
  category: z.enum(OPPORTUNITY_CATEGORIES, e("categoryRequired")),
  description: z.string(e("descRequired")).trim().min(1, e("descRequired")).max(2000, e("textMax")),
  // <input type="date"> sends YYYY-MM-DD; end of that day in Tashkent (UTC+5) is when it closes.
  deadline: z.preprocess(blankToUndefined, z.iso.date(e("dateInvalid")).transform((d) => new Date(`${d}T23:59:59+05:00`)).optional()),
  officialUrl: z.preprocess(blankToUndefined, z.url({ protocol: /^https?$/, error: "urlInvalid" }).optional())
});

/** Turns a ZodError into `{ field: errorKey }` (first error per field). */
export function fieldErrors(error: z.ZodError): Record<string, ErrorKey> {
  const out: Record<string, ErrorKey> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    // Unknown messages (zod's own English text) fall back to a generic, translated error.
    out[key] ??= (ERROR_KEYS.has(issue.message) ? issue.message : "generic") as ErrorKey;
  }
  return out;
}

const ERROR_KEYS = new Set<string>([
  "generic", "nameRequired", "nameMin", "nameMax", "emailRequired", "emailInvalid", "emailTaken", "passwordRequired", "passwordMin",
  "passwordMax", "gradeRequired", "schoolRequired", "schoolMax", "titleRequired", "titleMin", "titleMax", "summaryRequired", "summaryMin",
  "summaryMax", "categoryRequired", "textMax", "noteRequired", "orgRequired", "descRequired", "dateInvalid", "urlInvalid"
] satisfies ErrorKey[]);
