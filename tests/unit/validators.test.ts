import { describe, expect, it } from "vitest";
import { registerSchema, projectSchema, loginSchema, fieldErrors } from "@/lib/validators";

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
    ["password", { password: "short" }, "Password must be at least 10 characters."],
    ["grade", { grade: "" }, "Choose your grade (7–11)."],
    ["grade", { grade: "12" }, "Choose your grade (7–11)."],
    ["email", { email: "nope" }, "Enter a valid email address."],
    ["name", { name: "A" }, "Name must be at least 2 characters."]
  ])("rejects bad %s with a human message", (field, patch, message) => {
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
