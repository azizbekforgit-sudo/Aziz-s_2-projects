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
  if (!user) redirect("/login");
  if (user.status !== "ACTIVE") redirect("/login?error=inactive");
  return user;
}

export async function requireRole(allowed: readonly Role[]) {
  const user = await requireUser();
  if (!hasRole(user.role, allowed)) redirect("/dashboard");
  return user;
}
