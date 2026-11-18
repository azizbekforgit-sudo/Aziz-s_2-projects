import { NextResponse } from "next/server";
import { registerSchema, fieldErrors } from "@/lib/validators";
import { registerStudent } from "@/lib/users";
import { getDict } from "@/i18n/server";

// JSON API for sign-up. The website uses the server action in src/app/register/actions.ts;
// both go through registerSchema + registerStudent so the rules can't drift apart.
export async function POST(req: Request) {
  const t = await getDict();
  const parsed = registerSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const keys = fieldErrors(parsed.error);
    const errors = Object.fromEntries(Object.entries(keys).map(([f, k]) => [f, t.errors[k]]));
    return NextResponse.json({ error: Object.values(errors)[0], errors }, { status: 400 });
  }
  const result = await registerStudent(parsed.data);
  if (!result.ok) return NextResponse.json({ error: t.errors[result.error] }, { status: result.field === "email" ? 409 : 400 });
  return NextResponse.json({ message: t.register.successText }, { status: 201 });
}
