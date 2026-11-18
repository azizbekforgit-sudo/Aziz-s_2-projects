import type { Role } from "@prisma/client";

/** Roles that may open the admin area. Single source of truth — do not inline these lists. */
export const ADMIN_ROLES: readonly Role[] = ["ADMIN", "SUPER_ADMIN", "REGIONAL_COORDINATOR"];

/** Roles that may approve accounts and moderate projects. */
export const MODERATOR_ROLES: readonly Role[] = ["ADMIN", "SUPER_ADMIN"];

export function hasRole(role: string | null | undefined, allowed: readonly Role[]): boolean {
  return !!role && (allowed as readonly string[]).includes(role);
}
