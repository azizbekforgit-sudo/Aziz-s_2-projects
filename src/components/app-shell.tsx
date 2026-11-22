import Link from "next/link";
import type { User } from "@prisma/client";
import { signOut } from "@/auth";
import { ADMIN_ROLES, hasRole } from "@/lib/roles";
import { getDict } from "@/i18n/server";
import { Logo } from "./logo";
import { AppNav } from "./app-nav";
import { LanguageSwitcher } from "./language-switcher";

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/" });
}

/** Layout for the signed-in area. Pass the user from requireUser(). */
export async function AppShell({ user, children }: { user: User; children: React.ReactNode }) {
  const t = await getDict();
  const isAdmin = hasRole(user.role, ADMIN_ROLES);
  const signOutButton = (cls: string) => (
    <form action={signOutAction}><button type="submit" className={cls}>{t.common.signOut}</button></form>
  );
  return (
    <div className="app">
      <aside className="sidebar">
        <Link href="/" aria-label={t.common.homeLabel}><Logo /></Link>
        <AppNav isAdmin={isAdmin} variant="side" />
        <div className="sidebar-foot">
          <div className="who"><strong>{user.name}</strong><span className="caption">{t.roles[user.role]}</span></div>
          <LanguageSwitcher />
          {signOutButton("btn btn-secondary btn-sm btn-block")}
        </div>
      </aside>
      <div>
        <header className="topbar">
          <Link href="/" aria-label={t.common.homeLabel}><Logo /></Link>
          <div className="topbar-actions">
            <LanguageSwitcher />
            {signOutButton("btn btn-text btn-sm")}
          </div>
        </header>
        <AppNav isAdmin={isAdmin} variant="tabs" />
        <main id="main" className="app-main">
          <div className="app-content">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function PageHead({ title, lead, action, eyebrow }: { title: string; lead?: string; action?: React.ReactNode; eyebrow?: string }) {
  return (
    <div className="page-head">
      <div className="stack-sm">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="h1">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
      {action}
    </div>
  );
}
