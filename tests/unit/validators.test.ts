import { describe, expect, it } from "vitest";
import { registerSchema, projectSchema, loginSchema, fieldErrors } from "@/lib/validators";
import ru from "@/i18n/ru";
import uz from "@/i18n/uz";

const validStudent = { name: "Aziza Karimova", email: "  Aziza@Example.COM ", password: "longenough1", grade: "9", preferredLang: "ru" };

describe("registerSchema", () => {
  it("accepts a valid form submission and normalises email + grade", () => {
    const r = registerSchema.parse(validStudent);
    expect(r.email).toBe("aziza@example.com");
    expect(r.grade).toBe(9);
  });

  it("treats empty optional fields from the form as missing", () => {
    const r = registerSchema.parse({ ...validStudent, regionId: "", schoolId: "  " });
    expect(r.regionId).toBeUndefined();
    expect(r.schoolId).toBeUndefined();
  });

  it.each([
    ["password", { password: "short" }, "passwordMin"],
    ["password", { password: "" }, "passwordRequired"],
    ["grade", { grade: "" }, "gradeRequired"],
    ["grade", { grade: "12" }, "gradeRequired"],
    ["email", { email: "nope" }, "emailInvalid"],
    ["email", { email: "" }, "emailRequired"],
    ["name", { name: "" }, "nameRequired"],
    ["name", { name: "A" }, "nameMin"]
  ])("rejects bad %s with a translatable error key", (field, patch, message) => {
    const r = registerSchema.safeParse({ ...validStudent, ...patch });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error)[field]).toBe(message);
  });

  it("cannot be used to set a role or status", () => {
    const r = registerSchema.parse({ ...validStudent, role: "SUPER_ADMIN", status: "ACTIVE" });
    expect(r).not.toHaveProperty("role");
    expect(r).not.toHaveProperty("status");
  });
});

describe("projectSchema", () => {
  const ok = { title: "Water sensors", summary: "Cheap sensors that warn villages about dirty water.", category: "Technology" };
  it("accepts a minimal project", () => expect(projectSchema.safeParse(ok).success).toBe(true));
  it("rejects unknown categories", () => expect(projectSchema.safeParse({ ...ok, category: "Magic" }).success).toBe(false));
  it("rejects too-short summaries", () => expect(projectSchema.safeParse({ ...ok, summary: "short" }).success).toBe(false));
  it("drops empty optional text", () => expect(projectSchema.parse({ ...ok, problemStatement: "" }).problemStatement).toBeUndefined());
});

describe("loginSchema", () => {
  it("lower-cases email so login is case-insensitive", () => {
    expect(loginSchema.parse({ email: "Admin@Site.UZ", password: "x" }).email).toBe("admin@site.uz");
  });
});

describe("error keys", () => {
  it("every key a schema can produce exists in both dictionaries", () => {
    const keys = new Set<string>();
    for (const bad of [{}, { name: "A", email: "x", password: "1", grade: "99" }]) {
      const r = registerSchema.safeParse(bad);
      if (!r.success) Object.values(fieldErrors(r.error)).forEach((k) => keys.add(k));
    }
    const p = projectSchema.safeParse({ title: "a", summary: "b", category: "x", problemStatement: "z".repeat(4000) });
    if (!p.success) Object.values(fieldErrors(p.error)).forEach((k) => keys.add(k));
    for (const k of keys) {
      expect(ru.errors).toHaveProperty(k);
      expect(uz.errors).toHaveProperty(k);
    }
  });
});
