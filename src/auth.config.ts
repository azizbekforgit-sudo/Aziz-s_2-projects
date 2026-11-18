import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe part of the Auth.js config.
 * Used by middleware (runs on the Edge runtime) — must NOT import Prisma, bcrypt or Node APIs.
 * The full config with the Credentials provider lives in `src/auth.ts`.
 */
export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    // Called by middleware for every matched route. Returning false redirects to `pages.signIn`.
    authorized({ auth }) {
      return !!auth?.user;
    },
    jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid ?? "";
        session.user.role = token.role ?? "STUDENT";
      }
      return session;
    }
  }
} satisfies NextAuthConfig;
