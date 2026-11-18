import Link from "next/link";
import { ArrowLeft, Compass, Rocket, Send } from "lucide-react";
import { getDict } from "@/i18n/server";
import { Brand } from "./brand";
import { LanguageSwitcher } from "./language-switcher";

const ICONS = [Compass, Rocket, Send];

/** Two-column layout for sign-in / sign-up. The colourful left panel hides on small screens. */
export async function AuthLayout({ children }: { children: React.ReactNode }) {
  const t = await getDict();
  return (
    <div className="page">
      <div className="auth">
        <aside className="auth-aside">
          <Link href="/" aria-label={t.common.home}><Brand /></Link>
          <div className="stack-lg">
            <h2 className="h2">{t.auth.asideA} <span className="highlight">{t.auth.asideB}</span></h2>
            <ul className="auth-aside-points">
              {t.auth.points.map((p, i) => {
                const Icon = ICONS[i];
                return (
                  <li key={p.t}>
                    <span className="icon-tile"><Icon size={18} aria-hidden="true" /></span>
                    <span><strong>{p.t}</strong>{p.d}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="auth-aside-foot">{t.common.region}</p>
        </aside>
        <main id="main" className="auth-main">
          <div className="auth-card">
            <div className="auth-topline">
              <Link href="/" className="back-link"><ArrowLeft size={16} aria-hidden="true" /> {t.common.backHome}</Link>
              <LanguageSwitcher />
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
