import "server-only";
import { prisma } from "@/lib/prisma";

export async function getOverviewCounts() {
  const [students, mentors, teachers, projects, pendingUsers, pendingProjects, regions, schools] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT", status: "ACTIVE" } }),
    prisma.user.count({ where: { role: "MENTOR", verification: "VERIFIED" } }),
    prisma.user.count({ where: { role: "TEACHER" } }),
    prisma.project.count(),
    prisma.user.count({ where: { status: "PENDING" } }),
    prisma.project.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.region.count({ where: { isActive: true } }),
    prisma.school.count()
  ]);
  return { students, mentors, teachers, projects, pendingUsers, pendingProjects, regions, schools };
}
