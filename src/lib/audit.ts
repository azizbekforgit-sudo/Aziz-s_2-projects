import "server-only";
import type { Prisma } from "@prisma/client";

/** Every moderation decision must be written here, inside the same transaction as the change itself. */
export function audit(
  tx: Prisma.TransactionClient,
  entry: { actorId: string; action: string; entityType: string; entityId: string; newValue?: Prisma.InputJsonValue }
) {
  return tx.auditLog.create({ data: entry });
}
