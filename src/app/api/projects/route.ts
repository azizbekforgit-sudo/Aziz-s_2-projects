import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validators";

export async function GET() {
  const projects = await prisma.project.findMany({
    where: { status: { in: ["APPROVED", "ACTIVE", "COMPLETED"] } },
    orderBy: { createdAt: "desc" }, take: 30,
    select: { id: true, title: true, summary: true, category: true, status: true, createdAt: true, owner: { select: { name: true } } }
  });
  return NextResponse.json({ projects });
}
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Требуется авторизация." }, { status: 401 });
  const parsed = projectSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  const project = await prisma.project.create({ data: { ...parsed.data, ownerId: session.user.id, status: "PENDING_REVIEW" } });
  return NextResponse.json({ project }, { status: 201 });
}
