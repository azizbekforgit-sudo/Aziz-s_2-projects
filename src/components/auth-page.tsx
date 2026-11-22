import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getDict } from "@/i18n/server";
import { Wordmark } from "./wordmark";
import { LanguageSwitcher } from "./language-switcher";

/** Sign-in / sign-up frame. A signed-in visitor has nothing to do here, so send them on. */
export async function AuthPage({ children }: { children: React.ReactNode }) {
  const [session, t] = await Promise.all([auth(), getDict()]);
  if (session?.user) redirect("/dashboard");
  return (
    <div className="page">
      <main id="main" className="auth">
        <div className="auth-card">
          <div className="auth-top">
            <Link href="/" aria-label={t.common.home}><Wordmark /></Link>
            <LanguageSwitcher />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
