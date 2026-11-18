import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
export async function GET() {
  const session = await auth();
  if (!session?.user || !["ADMIN", "SUPER_ADMIN", "REGIONAL_COORDINATOR"].includes(session.user.role))
    return NextResponse.json({ error: "Недостаточно прав." }, { status: 403 });
  const [students, mentors, teachers, projects, pendingUsers, pendingProjects, regions, schools] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "MENTOR", verification: "VERIFIED" } }),
    prisma.user.count({ where: { role: "TEACHER" } }),
    prisma.project.count(),
    prisma.user.count({ where: { status: "PENDING" } }),
    prisma.project.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.region.count({ where: { isActive: true } }),
    prisma.school.count()
  ]);
  return NextResponse.json({ students, mentors, teachers, projects, pendingUsers, pendingProjects, regions, schools });
}
