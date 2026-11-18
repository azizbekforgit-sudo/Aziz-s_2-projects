"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";
import { MODERATOR_ROLES } from "@/lib/roles";
import { audit } from "@/lib/audit";

// Every action re-checks the role against the database: server actions are public HTTP endpoints,
// hiding a button in the UI is NOT access control.

export async function setUserStatus(formData: FormData) {
  const admin = await requireRole(MODERATOR_ROLES);
  const userId = String(formData.get("userId"));
  const decision = formData.get("decision") === "approve" ? "ACTIVE" : "DEACTIVATED";
  const before = await prisma.user.findUnique({ where: { id: userId }, select: { status: true } });
  if (!before || before.status !== "PENDING") return; // already handled by someone else
  await prisma.user.update({ where: { id: userId }, data: { status: decision } });
  await audit({ actorId: admin.id, action: `user.${decision.toLowerCase()}`, entityType: "User", entityId: userId, oldValue: before, newValue: { status: decision } });
  revalidatePath("/admin");
}

export async function setProjectStatus(formData: FormData) {
  const admin = await requireRole(MODERATOR_ROLES);
  const projectId = String(formData.get("projectId"));
  const decision = formData.get("decision") === "approve" ? "APPROVED" : "REJECTED";
  const before = await prisma.project.findUnique({ where: { id: projectId }, select: { status: true } });
  if (!before || before.status !== "PENDING_REVIEW") return;
  await prisma.project.update({ where: { id: projectId }, data: { status: decision } });
  await audit({ actorId: admin.id, action: `project.${decision.toLowerCase()}`, entityType: "Project", entityId: projectId, oldValue: before, newValue: { status: decision } });
  revalidatePath("/admin");
  revalidatePath("/projects");
}
