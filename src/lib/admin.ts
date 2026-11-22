import "server-only";
import { prisma } from "@/lib/prisma";
import { PUBLIC_PROJECT_STATUSES } from "@/lib/projects";

/** Only numbers someone can act on or that change — no counters for features that don't exist yet. */
export async function getOverviewCounts() {
  const [pendingProjects, students, published] = await Promise.all([
    prisma.project.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.user.count({ where: { role: "STUDENT", status: "ACTIVE" } }),
    prisma.project.count({ where: { status: { in: [...PUBLIC_PROJECT_STATUSES] } } })
  ]);
  return { pendingProjects, students, published };
}
