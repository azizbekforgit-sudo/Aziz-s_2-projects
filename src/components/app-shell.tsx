import Link from "next/link";
import { LogOut } from "lucide-react";
import type { User } from "@prisma/client";
import { signOut } from "@/auth";
import { ADMIN_ROLES, hasRole } from "@/lib/roles";
import { getDict } from "@/i18n/server";
import { Brand } from "./brand";
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
  const initials = user.name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="page">
      <div className="app">
        <aside className="sidebar">
          <Link href="/" aria-label={t.common.home}><Brand /></Link>
          <AppNav isAdmin={isAdmin} variant="sidebar" />
          <div className="sidebar-footer">
            <LanguageSwitcher />
            <div className="user-chip">
              <span className="avatar" aria-hidden="true">{initials}</span>
              <span className="user-chip-text">
                <span className="user-chip-name">{user.name}</span>
                <span className="subtle">{t.roles[user.role]}</span>
              </span>
            </div>
            <form action={signOutAction}>
              <button type="submit" className="btn btn-secondary btn-block"><LogOut size={16} aria-hidden="true" /> {t.common.signOut}</button>
            </form>
          </div>
        </aside>
        <div>
          <header className="app-topbar">
            <Link href="/" aria-label={t.common.home}><Brand /></Link>
            <div className="app-topbar-actions">
              <LanguageSwitcher />
              <form action={signOutAction}>
                <button type="submit" className="btn btn-ghost btn-sm" aria-label={t.common.signOut}><LogOut size={16} aria-hidden="true" /></button>
              </form>
            </div>
          </header>
          <AppNav isAdmin={isAdmin} variant="tabs" />
          <main id="main" className="app-main">
            <div className="app-content">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="page-header">
      <div className="stack">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="h2">{title}</h1>
        {description && <p className="muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
