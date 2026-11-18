import Link from "next/link";
import { LogOut } from "lucide-react";
import type { User } from "@prisma/client";
import { signOut } from "@/auth";
import { ADMIN_ROLES, ROLE_LABELS, hasRole } from "@/lib/roles";
import { Brand } from "./brand";
import { AppNav } from "./app-nav";

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/" });
}

function SignOutButton({ compact }: { compact?: boolean }) {
  return (
    <form action={signOutAction}>
      <button type="submit" className={compact ? "btn btn-ghost btn-sm" : "btn btn-secondary btn-block"}>
        <LogOut size={16} aria-hidden="true" /> Sign out
      </button>
    </form>
  );
}

/** Layout for the signed-in area. Pass the user from requireUser(). */
export function AppShell({ user, children }: { user: User; children: React.ReactNode }) {
  const isAdmin = hasRole(user.role, ADMIN_ROLES);
  const initials = user.name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="page">
      <div className="app">
        <aside className="sidebar">
          <Link href="/" aria-label="Talent to Impact — home"><Brand /></Link>
          <AppNav isAdmin={isAdmin} variant="sidebar" />
          <div className="sidebar-footer">
            <div className="user-chip">
              <span className="avatar" aria-hidden="true">{initials}</span>
              <span className="user-chip-text">
                <span className="user-chip-name">{user.name}</span>
                <span className="subtle">{ROLE_LABELS[user.role]}</span>
              </span>
            </div>
            <SignOutButton />
          </div>
        </aside>
        <div>
          <header className="app-topbar">
            <Link href="/" aria-label="Talent to Impact — home"><Brand /></Link>
            <SignOutButton compact />
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
