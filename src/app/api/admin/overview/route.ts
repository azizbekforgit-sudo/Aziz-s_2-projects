import { NextResponse } from "next/server";
import { getActiveUser } from "@/lib/session";
import { ADMIN_ROLES, hasRole } from "@/lib/roles";
import { getOverviewCounts } from "@/lib/admin";

export async function GET() {
  const user = await getActiveUser();
  if (!user || !hasRole(user.role, ADMIN_ROLES)) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  return NextResponse.json(await getOverviewCounts());
}
