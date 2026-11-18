"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Compass, Rocket, Users, Award, GraduationCap, ShieldCheck, FolderPlus } from "lucide-react";
import { useI18n } from "@/i18n/client";

export function AppNav({ isAdmin, variant }: { isAdmin: boolean; variant: "sidebar" | "tabs" }) {
  const path = usePathname();
  const { t } = useI18n();
  const items = [
    { href: "/dashboard", label: t.appNav.overview, icon: LayoutDashboard },
    { href: "/projects/new", label: t.appNav.submit, icon: FolderPlus },
    { href: "/projects", label: t.appNav.projects, icon: Rocket },
    { href: "/opportunities", label: t.appNav.opportunities, icon: Award },
    { href: "/talent-map", label: t.appNav.talentMap, icon: Compass },
    { href: "/community", label: t.appNav.community, icon: Users },
    { href: "/mentorship", label: t.appNav.mentorship, icon: GraduationCap },
    ...(isAdmin ? [{ href: "/admin", label: t.appNav.admin, icon: ShieldCheck }] : [])
  ];
  const links = items.map((i) => (
    <Link key={i.href} href={i.href} aria-current={path === i.href ? "page" : undefined}>
      <i.icon size={18} aria-hidden="true" />
      {i.label}
    </Link>
  ));
  return <nav className={variant === "tabs" ? "app-tabs" : "sidebar-nav"} aria-label={t.meta.dashboard}>{links}</nav>;
}
