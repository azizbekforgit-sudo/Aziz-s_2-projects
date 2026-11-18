"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { projectSchema, fieldErrors } from "@/lib/validators";

export type ProjectState = { errors?: Record<string, string>; values?: Record<string, string> };

export async function createProjectAction(_prev: ProjectState, formData: FormData): Promise<ProjectState> {
  const user = await requireUser();
  const values = Object.fromEntries(formData) as Record<string, string>;
  const parsed = projectSchema.safeParse(values);
  if (!parsed.success) return { errors: fieldErrors(parsed.error), values };
  await prisma.project.create({ data: { ...parsed.data, ownerId: user.id, status: "PENDING_REVIEW" } });
  redirect("/dashboard?submitted=project");
}
