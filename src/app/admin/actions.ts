"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";
import { MODERATOR_ROLES } from "@/lib/roles";
import { audit } from "@/lib/audit";
import { fieldErrors, opportunitySchema, reviewSchema, type ErrorKey } from "@/lib/validators";

// Every action re-checks the role against the database: server actions are public HTTP endpoints,
// hiding a button in the UI is NOT access control.
// Status changes use `updateMany ... where status = <expected>` so two moderators can't decide twice.

export type ReviewState = { error?: ErrorKey };

export async function reviewProject(_prev: ReviewState, formData: FormData): Promise<ReviewState> {
  const admin = await requireRole(MODERATOR_ROLES);
  const projectId = String(formData.get("projectId"));
  const parsed = reviewSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: fieldErrors(parsed.error).note ?? "generic" };
  const status = parsed.data.decision === "approve" ? "APPROVED" : "REJECTED";
  const reviewNote = parsed.data.note ?? null;
  await prisma.$transaction(async (tx) => {
    const { count } = await tx.project.updateMany({ where: { id: projectId, status: "PENDING_REVIEW" }, data: { status, reviewNote } });
    if (count) await audit(tx, { actorId: admin.id, action: `project.${status.toLowerCase()}`, entityType: "Project", entityId: projectId, newValue: { status, reviewNote } });
  });
  revalidatePath("/admin");
  revalidatePath("/projects");
  redirect("/admin");
}

export type OpportunityState = { ok?: boolean; errors?: Record<string, ErrorKey>; values?: Record<string, string> };

/** Opportunities are added by moderators, so they are published right away. */
export async function createOpportunity(_prev: OpportunityState, formData: FormData): Promise<OpportunityState> {
  const admin = await requireRole(MODERATOR_ROLES);
  const values = Object.fromEntries(formData) as Record<string, string>;
  const parsed = opportunitySchema.safeParse(values);
  if (!parsed.success) return { errors: fieldErrors(parsed.error), values };
  await prisma.$transaction(async (tx) => {
    const o = await tx.opportunity.create({ data: { ...parsed.data, status: "APPROVED" } });
    await audit(tx, { actorId: admin.id, action: "opportunity.created", entityType: "Opportunity", entityId: o.id, newValue: { title: o.title } });
  });
  revalidatePath("/opportunities");
  return { ok: true };
}
