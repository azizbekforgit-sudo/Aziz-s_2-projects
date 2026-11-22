import { describe, expect, it } from "vitest";
import { registerSchema, projectSchema, loginSchema, reviewSchema, opportunitySchema, fieldErrors } from "@/lib/validators";
import ru from "@/i18n/ru";
import uz from "@/i18n/uz";

const student = { name: "Aziza Karimova", email: "  Aziza@Example.COM ", password: "longenough1", schoolName: "Школа №7, Кармана", grade: "9" };

describe("registerSchema", () => {
  it("accepts a form submission and normalises email + grade", () => {
    const r = registerSchema.parse(student);
    expect(r.email).toBe("aziza@example.com");
    expect(r.grade).toBe(9);
  });

  it.each([
    ["password", { password: "short" }, "passwordMin"],
    ["password", { password: "" }, "passwordRequired"],
    ["grade", { grade: "" }, "gradeRequired"],
    ["grade", { grade: "12" }, "gradeRequired"],
    ["email", { email: "nope" }, "emailInvalid"],
    ["email", { email: "" }, "emailRequired"],
    ["name", { name: "" }, "nameRequired"],
    ["schoolName", { schoolName: "  " }, "schoolRequired"]
  ])("rejects bad %s with a translatable error key", (field, patch, key) => {
    const r = registerSchema.safeParse({ ...student, ...patch });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error)[field]).toBe(key);
  });

  it("cannot be used to set a role or status", () => {
    const r = registerSchema.parse({ ...student, role: "SUPER_ADMIN", status: "ACTIVE" });
    expect(r).not.toHaveProperty("role");
    expect(r).not.toHaveProperty("status");
  });
});

describe("projectSchema", () => {
  const ok = { title: "Water sensors", summary: "Cheap sensors that warn villages about dirty water.", category: "Technology" };
  it("accepts a minimal project", () => expect(projectSchema.safeParse(ok).success).toBe(true));
  it("rejects unknown categories", () => expect(projectSchema.safeParse({ ...ok, category: "Magic" }).success).toBe(false));
  it("drops empty optional text", () => expect(projectSchema.parse({ ...ok, problemStatement: "" }).problemStatement).toBeUndefined());
});

describe("reviewSchema", () => {
  it("approve needs no note", () => expect(reviewSchema.safeParse({ decision: "approve", note: "" }).success).toBe(true));
  it("reject without a note is refused", () => {
    const r = reviewSchema.safeParse({ decision: "reject", note: "  " });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).note).toBe("noteRequired");
  });
  it("unknown decision is refused", () => expect(reviewSchema.safeParse({ decision: "delete" }).success).toBe(false));
});

describe("opportunitySchema", () => {
  const ok = { title: "Robotics cup", organizer: "Navoi IT Park", category: "Competition", description: "Teams of 3." };
  it("deadline is the end of that day in Tashkent", () => {
    expect(opportunitySchema.parse({ ...ok, deadline: "2026-12-01" }).deadline?.toISOString()).toBe("2026-12-01T18:59:59.000Z");
  });
  it("blank deadline and url are optional", () => {
    const r = opportunitySchema.parse({ ...ok, deadline: "", officialUrl: "" });
    expect(r.deadline).toBeUndefined();
    expect(r.officialUrl).toBeUndefined();
  });
  it("only http(s) links are allowed", () => {
    const r = opportunitySchema.safeParse({ ...ok, officialUrl: "javascript:alert(1)" });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).officialUrl).toBe("urlInvalid");
  });
});

describe("loginSchema", () => {
  it("lower-cases email so login is case-insensitive", () => {
    expect(loginSchema.parse({ email: "Admin@Site.UZ", password: "x" }).email).toBe("admin@site.uz");
  });
});

describe("error keys", () => {
  it("every key a schema can produce exists in both dictionaries", () => {
    const keys = new Set<string>();
    const collect = (r: { success: boolean; error?: Parameters<typeof fieldErrors>[0] }) => r.error && Object.values(fieldErrors(r.error)).forEach((k) => keys.add(k));
    collect(registerSchema.safeParse({}));
    collect(registerSchema.safeParse({ name: "A", email: "x", password: "1", grade: "99", schoolName: "x".repeat(200) }));
    collect(projectSchema.safeParse({ title: "a", summary: "b", category: "x", problemStatement: "z".repeat(4000) }));
    collect(opportunitySchema.safeParse({ deadline: "nope", officialUrl: "ftp://x" }));
    collect(reviewSchema.safeParse({ decision: "reject" }));
    for (const k of keys) {
      expect(ru.errors).toHaveProperty(k);
      expect(uz.errors).toHaveProperty(k);
    }
  });
});
