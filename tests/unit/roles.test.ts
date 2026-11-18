import { describe, expect, it } from "vitest";
import { ADMIN_ROLES, MODERATOR_ROLES, hasRole } from "@/lib/roles";

describe("roles", () => {
  it("students are never admins or moderators", () => {
    expect(hasRole("STUDENT", ADMIN_ROLES)).toBe(false);
    expect(hasRole("STUDENT", MODERATOR_ROLES)).toBe(false);
  });
  it("regional coordinators can view admin but not moderate", () => {
    expect(hasRole("REGIONAL_COORDINATOR", ADMIN_ROLES)).toBe(true);
    expect(hasRole("REGIONAL_COORDINATOR", MODERATOR_ROLES)).toBe(false);
  });
  it("handles missing role", () => {
    expect(hasRole(undefined, ADMIN_ROLES)).toBe(false);
    expect(hasRole(null, ADMIN_ROLES)).toBe(false);
  });
});
