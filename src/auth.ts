import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [Credentials({
    credentials: { email: {}, password: {} },
    async authorize(credentials) {
      const parsed = z.object({ email: z.email(), password: z.string().min(1) }).safeParse(credentials);
      if (!parsed.success) return null;
      const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
      if (!user || user.status !== "ACTIVE") return null;
      if (!(await compare(parsed.data.password, user.passwordHash))) return null;
      return { id: user.id, name: user.name, email: user.email, role: user.role };
    }
  })],
  callbacks: {
    async jwt({ token, user }) { if (user) { token.uid = user.id; token.role = (user as any).role; } return token; },
    async session({ session, token }) {
      if (session.user) { (session.user as any).id = token.uid; (session.user as any).role = token.role; }
      return session;
    }
  }
});
