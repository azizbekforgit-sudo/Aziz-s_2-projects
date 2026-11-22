import "server-only";
import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hasRole } from "@/lib/roles";

/**
 * Returns the signed-in user, freshly loaded from the database.
 * The JWT may be stale (role changed, account suspended), so never trust token.role for access decisions.
 */
export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  // Stale session (account deleted or disabled): end it instead of bouncing between pages.
  if (!user) redirect("/session-ended");
  if (user.status !== "ACTIVE") redirect("/session-ended?reason=inactive");
  return user;
}

/** The signed-in user if the session belongs to an existing, active account — otherwise null. Never redirects. */
export async function getActiveUser() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  return user?.status === "ACTIVE" ? user : null;
}

export async function requireRole(allowed: readonly Role[]) {
  const user = await requireUser();
  if (!hasRole(user.role, allowed)) redirect("/dashboard");
  return user;
}
