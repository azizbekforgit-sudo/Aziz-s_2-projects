"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FolderOpen, FilePlus2, Compass, BookOpen, Route, FileSearch, CalendarPlus, History } from "lucide-react";
import { useI18n } from "@/i18n/client";

type Item = { href: string; label: string; icon: typeof FolderOpen; soon?: boolean };

/** Student: own projects + upcoming modules. Moderator: the four moderation sections. */
export function AppNav({ isAdmin, variant }: { isAdmin: boolean; variant: "side" | "tabs" }) {
  const path = usePathname();
  const { t } = useI18n();
  // Moderation sections are anchors on one page: highlight the one in the URL hash (first one by default).
  const [hash, setHash] = useState("");
  useEffect(() => {
    const on = () => setHash(window.location.hash);
    on();
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const main: Item[] = isAdmin
    ? [
        { href: "/admin#review", label: t.admin.projectsTitle, icon: FileSearch },
        { href: "/admin#add", label: t.admin.oppTitle, icon: CalendarPlus },
        { href: "/admin#log", label: t.admin.logTitle, icon: History }
      ]
    : [
        { href: "/dashboard", label: t.appNav.myProjects, icon: FolderOpen },
        { href: "/projects/new", label: t.appNav.submit, icon: FilePlus2 }
      ];
  const soon: Item[] = isAdmin ? [] : [
    { href: "/talent-map", label: "Talent Map", icon: Compass, soon: true },
    { href: "/community", label: "Knowledge Bridge", icon: BookOpen, soon: true },
    { href: "/mentorship", label: t.meta.mentorship, icon: Route, soon: true }
  ];
  const current = (href: string) => {
    const [base, anchor] = href.split("#");
    if (base !== path) return undefined;
    if (!anchor) return "page" as const;
    const active = hash ? hash === `#${anchor}` : href === main[0].href;
    return active ? ("location" as const) : undefined;
  };
  const link = (i: Item, withIcon: boolean) => (
    <Link key={i.href} href={i.href} aria-current={current(i.href)}>
      {withIcon && <i.icon strokeWidth={1.8} aria-hidden="true" />}
      {i.label}
      {i.soon && <span className="soon-tag">· {t.common.soon}</span>}
    </Link>
  );
  if (variant === "tabs") return <nav className="tabs" aria-label={t.common.accountNav}>{[...main, ...soon].map((i) => link(i, false))}</nav>;
  return (
    <nav className="side-nav" aria-label={t.common.accountNav}>
      {main.map((i) => link(i, true))}
      {soon.length > 0 && <span className="side-group">{t.appNav.soonGroup}</span>}
      {soon.map((i) => link(i, true))}
    </nav>
  );
}
