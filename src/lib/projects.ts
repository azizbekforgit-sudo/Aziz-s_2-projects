import type { ProjectStatus } from "@prisma/client";

/** Only these statuses are visible to the public. Anything else is private to the owner and moderators. */
export const PUBLIC_PROJECT_STATUSES = ["APPROVED", "ACTIVE", "COMPLETED"] as const satisfies readonly ProjectStatus[];
