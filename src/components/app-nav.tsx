"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderOpen, FilePlus2, LayoutList, Trophy, ShieldCheck } from "lucide-react";
import { useI18n } from "@/i18n/client";

/** Only pages that work today. Students get their projects; moderators get the moderation queue. */
export function AppNav({ isAdmin, variant }: { isAdmin: boolean; variant: "side" | "tabs" }) {
  const path = usePathname();
  const { t } = useI18n();
  const items = [
    ...(isAdmin
      ? [{ href: "/admin", label: t.appNav.admin, icon: ShieldCheck }]
      : [
          { href: "/dashboard", label: t.appNav.myProjects, icon: FolderOpen },
          { href: "/projects/new", label: t.appNav.submit, icon: FilePlus2 }
        ]),
    { href: "/projects", label: t.appNav.projects, icon: LayoutList },
    { href: "/opportunities", label: t.appNav.opportunities, icon: Trophy }
  ];
  return (
    <nav className={variant === "tabs" ? "tabs" : "side-nav"} aria-label={t.meta.dashboard}>
      {items.map((i) => (
        <Link key={i.href} href={i.href} aria-current={path === i.href ? "page" : undefined}>
          {variant === "side" && <i.icon size={16} strokeWidth={1.5} aria-hidden="true" />}
          {i.label}
        </Link>
      ))}
    </nav>
  );
}
