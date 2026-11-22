import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators";
import { authConfig } from "./auth.config";

/** Password is right but the account was disabled. */
class BlockedAccountError extends CredentialsSignin {
  code = "blocked";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
        if (!user || !(await compare(parsed.data.password, user.passwordHash))) return null;
        if (user.status !== "ACTIVE") throw new BlockedAccountError();
        return { id: user.id, name: user.name, email: user.email, role: user.role };
      }
    })
  ]
});
