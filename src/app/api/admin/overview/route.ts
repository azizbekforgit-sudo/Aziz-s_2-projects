import { NextResponse } from "next/server";
import { getActiveUser } from "@/lib/session";
import { ADMIN_ROLES, hasRole } from "@/lib/roles";
import { getOverviewCounts } from "@/lib/admin";
import { getDict } from "@/i18n/server";

export async function GET() {
  const user = await getActiveUser();
  if (!user || !hasRole(user.role, ADMIN_ROLES)) return NextResponse.json({ error: (await getDict()).errors.forbidden }, { status: 403 });
  return NextResponse.json(await getOverviewCounts());
}
