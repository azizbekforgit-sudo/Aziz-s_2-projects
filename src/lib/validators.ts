import { z } from "zod";
export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.email(),
  password: z.string().min(10).max(100),
  preferredLang: z.enum(["uz", "ru", "en"]).default("uz"),
  regionId: z.string().optional(),
  schoolId: z.string().optional(),
  grade: z.coerce.number().int().min(7).max(11).optional()
});
export const projectSchema = z.object({
  title: z.string().min(4).max(100),
  summary: z.string().min(20).max(500),
  category: z.enum(["Technology","Business","Education","Ecology","Social Innovation","Engineering"]),
  problemStatement: z.string().max(3000).optional(),
  proposedSolution: z.string().max(3000).optional()
});
