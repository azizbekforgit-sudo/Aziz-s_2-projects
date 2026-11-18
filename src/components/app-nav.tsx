"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Compass, Rocket, Users, Award, GraduationCap, ShieldCheck, FolderPlus } from "lucide-react";

const MAIN = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/projects/new", label: "Submit a project", icon: FolderPlus },
  { href: "/projects", label: "Projects", icon: Rocket },
  { href: "/opportunities", label: "Opportunities", icon: Award },
  { href: "/talent-map", label: "Talent Map", icon: Compass },
  { href: "/community", label: "Knowledge Bridge", icon: Users },
  { href: "/mentorship", label: "Mentorship", icon: GraduationCap }
];

export function AppNav({ isAdmin, variant }: { isAdmin: boolean; variant: "sidebar" | "tabs" }) {
  const path = usePathname();
  const items = isAdmin ? [...MAIN, { href: "/admin", label: "Admin", icon: ShieldCheck }] : MAIN;
  const link = (i: (typeof items)[number]) => (
    <Link key={i.href} href={i.href} aria-current={path === i.href ? "page" : undefined}>
      <i.icon size={18} aria-hidden="true" />
      {i.label}
    </Link>
  );
  if (variant === "tabs") return <nav className="app-tabs" aria-label="Sections">{items.map(link)}</nav>;
  return <nav className="sidebar-nav" aria-label="Sections">{items.map(link)}</nav>;
}
