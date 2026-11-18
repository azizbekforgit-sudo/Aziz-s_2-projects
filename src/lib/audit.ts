import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

/** Every moderation decision must be written here (spec: audit log for all management operations). */
export function audit(entry: {
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValue?: Prisma.InputJsonValue;
  newValue?: Prisma.InputJsonValue;
}) {
  return prisma.auditLog.create({ data: entry });
}
