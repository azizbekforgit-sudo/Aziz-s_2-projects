import "server-only";
import { hash } from "bcryptjs";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { RegisterInput, ErrorKey } from "@/lib/validators";
import type { Locale } from "@/i18n/config";

export type RegisterResult = { ok: true } | { ok: false; field: string; error: ErrorKey };

/** Creates a PENDING student account. Public sign-up can never create any other role. */
export async function registerStudent(input: RegisterInput, locale: Locale): Promise<RegisterResult> {
  try {
    await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash: await hash(input.password, 12),
        schoolName: input.schoolName,
        grade: input.grade,
        preferredLang: locale,
        role: "STUDENT",
        status: "PENDING",
        verification: "UNVERIFIED"
      }
    });
    return { ok: true };
  } catch (e) {
    // P2002 = unique constraint: the email is taken. Catching it here (not checking first) avoids a race.
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") return { ok: false, field: "email", error: "emailTaken" };
    throw e;
  }
}
