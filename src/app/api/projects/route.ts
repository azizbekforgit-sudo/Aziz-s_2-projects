import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getActiveUser } from "@/lib/session";
import { projectSchema, fieldErrors } from "@/lib/validators";
import { PUBLIC_PROJECT_STATUSES } from "@/lib/projects";

export async function GET() {
  const projects = await prisma.project.findMany({
    where: { status: { in: [...PUBLIC_PROJECT_STATUSES] } },
    orderBy: { createdAt: "desc" },
    take: 30,
    select: { id: true, title: true, summary: true, category: true, status: true, createdAt: true, owner: { select: { name: true } } }
  });
  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  const user = await getActiveUser();
  if (!user) return NextResponse.json({ error: "Sign in to submit a project." }, { status: 401 });
  const parsed = projectSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const errors = fieldErrors(parsed.error);
    return NextResponse.json({ error: Object.values(errors)[0], errors }, { status: 400 });
  }
  const project = await prisma.project.create({ data: { ...parsed.data, ownerId: user.id, status: "PENDING_REVIEW" } });
  return NextResponse.json({ project }, { status: 201 });
}
