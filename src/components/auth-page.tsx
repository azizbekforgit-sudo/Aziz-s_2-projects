import Link from "next/link";
import { redirect } from "next/navigation";
import { getActiveUser } from "@/lib/session";
import { getDict } from "@/i18n/server";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { ProjectSheet } from "./project-sheet";
import { Contours } from "./graphics";

/** Sign-in / sign-up: form on the left, a paper composition on the right (desktop only). */
export async function AuthPage({ children, artTitle, artText }: { children: React.ReactNode; artTitle: string; artText: string }) {
  // Only a real, active account is sent on; a stale cookie must not block sign-in or registration.
  const [user, t] = await Promise.all([getActiveUser(), getDict()]);
  if (user) redirect("/dashboard");
  const s = t.home.sample;
  return (
    <div className="page">
      <main id="main" className="auth">
        <div className="auth-form">
          <div className="auth-top">
            <Link href="/" aria-label={t.common.homeLabel}><Logo /></Link>
            <LanguageSwitcher />
          </div>
          <div className="auth-body">{children}</div>
        </div>
        <div className="auth-art" aria-hidden="true">
          <Contours />
          <ProjectSheet t={t} number={s.number} category={s.category} title={s.title} author={s.author}
            sections={[{ label: s.problemLabel, text: s.problem }, { label: s.solutionLabel, text: s.solution }]} status="APPROVED" footNote={s.check} />
          <div className="auth-art-text stack-sm">
            <p className="h2">{artTitle}</p>
            <p className="muted">{artText}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
