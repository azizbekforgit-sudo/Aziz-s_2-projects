import { z } from "zod";

// All user-facing validation lives here, so the API routes, server actions and tests share it.
// Messages are written for students — keep them short and human.

const email = z
  .string({ error: "Enter your email." })
  .trim()
  .toLowerCase()
  .min(1, { error: "Enter your email." })
  .pipe(z.email({ error: "Enter a valid email address." }));

export const loginSchema = z.object({
  email,
  password: z.string({ error: "Enter your password." }).min(1, { error: "Enter your password." })
});

/** Empty form fields arrive as "" — treat them as "not provided". */
const optionalText = (max: number, label: string) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    z.string().trim().max(max, { error: `${label} must be at most ${max} characters.` }).optional()
  );

export const GRADES = [7, 8, 9, 10, 11] as const;
export const LANGUAGES = [
  { value: "uz", label: "O‘zbekcha" },
  { value: "ru", label: "Русский" },
  { value: "en", label: "English" }
] as const;

export const registerSchema = z.object({
  name: z
    .string({ error: "Enter your full name." })
    .trim()
    .min(1, { error: "Enter your full name." })
    .min(2, { error: "Name must be at least 2 characters." })
    .max(80, { error: "Name must be at most 80 characters." }),
  email,
  password: z
    .string({ error: "Choose a password." })
    .min(1, { error: "Choose a password." })
    .min(10, { error: "Password must be at least 10 characters." })
    .max(100, { error: "Password must be at most 100 characters." }),
  preferredLang: z.enum(["uz", "ru", "en"], { error: "Choose a language." }).default("uz"),
  grade: z.coerce
    .number({ error: "Choose your grade." })
    .int()
    .min(7, { error: "Choose your grade (7–11)." })
    .max(11, { error: "Choose your grade (7–11)." }),
  regionId: optionalText(40, "Region"),
  schoolId: optionalText(40, "School")
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const PROJECT_CATEGORIES = ["Technology", "Business", "Education", "Ecology", "Social Innovation", "Engineering"] as const;

export const projectSchema = z.object({
  title: z
    .string({ error: "Give your project a title." })
    .trim()
    .min(1, { error: "Give your project a title." })
    .min(4, { error: "Title must be at least 4 characters." })
    .max(100, { error: "Title must be at most 100 characters." }),
  summary: z
    .string({ error: "Write a short summary." })
    .trim()
    .min(1, { error: "Write a short summary." })
    .min(20, { error: "Summary must be at least 20 characters." })
    .max(500, { error: "Summary must be at most 500 characters." }),
  category: z.enum(PROJECT_CATEGORIES, { error: "Choose a category." }),
  problemStatement: optionalText(3000, "Problem statement"),
  proposedSolution: optionalText(3000, "Proposed solution")
});
export type ProjectInput = z.infer<typeof projectSchema>;

/** Turns a ZodError into `{ field: firstMessage }` for showing errors next to inputs. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
