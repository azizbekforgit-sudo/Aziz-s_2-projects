import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getActiveUser } from "@/lib/session";
import { projectSchema, fieldErrors } from "@/lib/validators";
import { PUBLIC_PROJECT_STATUSES } from "@/lib/projects";
import { getDict } from "@/i18n/server";

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
  const t = await getDict();
  const user = await getActiveUser();
  if (!user) return NextResponse.json({ error: t.errors.signInRequired }, { status: 401 });
  const parsed = projectSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const keys = fieldErrors(parsed.error);
    const errors = Object.fromEntries(Object.entries(keys).map(([f, k]) => [f, t.errors[k]]));
    return NextResponse.json({ error: Object.values(errors)[0], errors }, { status: 400 });
  }
  const project = await prisma.project.create({ data: { ...parsed.data, ownerId: user.id, status: "PENDING_REVIEW" } });
  return NextResponse.json({ project }, { status: 201 });
}
