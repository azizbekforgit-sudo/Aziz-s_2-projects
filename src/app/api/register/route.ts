import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const body = registerSchema.parse(await req.json());
    const email = body.email.toLowerCase().trim();
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return NextResponse.json({ error: "Этот email уже зарегистрирован." }, { status: 409 });
    const user = await prisma.user.create({
      data: {
        name: body.name.trim(), email, passwordHash: await hash(body.password, 12),
        preferredLang: body.preferredLang, regionId: body.regionId || undefined,
        schoolId: body.schoolId || undefined, grade: body.grade,
        role: "STUDENT", status: "PENDING", verification: "UNVERIFIED"
      },
      select: { id: true, name: true, email: true, status: true }
    });
    return NextResponse.json({ user, message: "Заявка создана. Дождитесь активации аккаунта администратором." }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.issues?.[0]?.message || "Не удалось создать аккаунт." }, { status: 400 });
  }
}
