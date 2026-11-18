import "server-only";
import { hash } from "bcryptjs";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { RegisterInput, ErrorKey } from "@/lib/validators";

export type RegisterResult = { ok: true } | { ok: false; field?: string; error: ErrorKey };

/** Creates a PENDING student account. Public sign-up can never create any other role. */
export async function registerStudent(input: RegisterInput): Promise<RegisterResult> {
  try {
    await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash: await hash(input.password, 12),
        preferredLang: input.preferredLang,
        grade: input.grade,
        regionId: input.regionId,
        schoolId: input.schoolId,
        role: "STUDENT",
        status: "PENDING",
        verification: "UNVERIFIED"
      }
    });
    return { ok: true };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // P2002 = unique constraint (email already used). Checking inside the insert avoids a race.
      if (e.code === "P2002") return { ok: false, field: "email", error: "emailTaken" };
      // P2003 = foreign key (unknown region / school id).
      if (e.code === "P2003") return { ok: false, error: "unknownRegion" };
    }
    throw e;
  }
}
