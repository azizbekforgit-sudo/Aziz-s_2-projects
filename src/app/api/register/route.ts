import { NextResponse } from "next/server";
import { registerSchema, fieldErrors } from "@/lib/validators";
import { registerStudent } from "@/lib/users";

// JSON API for sign-up. The website itself uses the server action in src/app/register/actions.ts;
// both go through registerSchema + registerStudent so the rules can't drift apart.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    const errors = fieldErrors(parsed.error);
    return NextResponse.json({ error: Object.values(errors)[0], errors }, { status: 400 });
  }
  const result = await registerStudent(parsed.data);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.field === "email" ? 409 : 400 });
  return NextResponse.json({ message: "Account created. An administrator will activate it soon." }, { status: 201 });
}
