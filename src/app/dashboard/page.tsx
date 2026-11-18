import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FolderPlus, Award, Compass, Zap, Users, CheckCircle2, UserRound, Rocket } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { firstName, formatDate } from "@/lib/format";
import { getDict, getLocale } from "@/i18n/server";
import { fmt } from "@/i18n/fmt";
import { AppShell, PageHeader } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.dashboard };
}

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ submitted?: string }> }) {
  const user = await requireUser();
  const [{ submitted }, t, locale, projects, xp, teams] = await Promise.all([
    searchParams,
    getDict(),
    getLocale(),
    prisma.project.findMany({ where: { ownerId: user.id }, orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.xpTransaction.aggregate({ where: { userId: user.id, verified: true }, _sum: { points: true } }),
    prisma.teamMember.count({ where: { userId: user.id } })
  ]);
  const d = t.dashboard;
  const cat = (c: string) => t.categories[c as keyof typeof t.categories] ?? c;

  return (
    <AppShell user={user}>
      <PageHeader
        eyebrow={d.eyebrow}
        title={fmt(d.greeting, { name: firstName(user.name) })}
        description={d.lead}
        action={<Link href="/projects/new" className="btn btn-primary"><FolderPlus size={16} aria-hidden="true" /> {t.appNav.submit}</Link>}
      />

      <div className="stack-lg">
        {submitted === "project" && (
          <div className="alert alert-success" role="status">
            <CheckCircle2 size={18} aria-hidden="true" />
            <span><strong>{d.submittedTitle}</strong> {d.submittedText}</span>
          </div>
        )}

        <div className="grid-4">
          <div className="stat accent-pink"><span className="stat-label"><Rocket size={16} aria-hidden="true" /> {d.statProjects}</span><span className="stat-value">{projects.length}</span></div>
          <div className="stat accent-amber"><span className="stat-label"><Zap size={16} aria-hidden="true" /> {d.statXp}</span><span className="stat-value">{xp._sum.points ?? 0}</span></div>
          <div className="stat accent-teal"><span className="stat-label"><Users size={16} aria-hidden="true" /> {d.statTeams}</span><span className="stat-value">{teams}</span></div>
          <div className="stat accent-violet"><span className="stat-label"><UserRound size={16} aria-hidden="true" /> {d.statProfile}</span><StatusBadge status={user.verification} t={t} /></div>
        </div>

        <section className="card card-pad-lg" aria-labelledby="my-projects">
          <div className="stack-sm">
            <h2 id="my-projects" className="h3">{d.myProjects}</h2>
            <p className="subtle">{d.myProjectsHint}</p>
          </div>
          {projects.length === 0 ? (
            <div className="empty mt-5">
              <span className="icon-tile icon-tile-solid accent-pink"><FolderPlus size={20} aria-hidden="true" /></span>
              <h3 className="card-title">{d.emptyTitle}</h3>
              <p className="muted">{d.emptyText}</p>
              <Link href="/projects/new" className="btn btn-primary">{d.emptyCta}</Link>
            </div>
          ) : (
            <ul className="list mt-4">
              {projects.map((p) => (
                <li key={p.id} className="list-item">
                  <div className="list-item-main">
                    <span className="list-item-title">{p.title}</span>
                    <span className="subtle">{fmt(d.submittedOn, { category: cat(p.category), date: formatDate(p.createdAt, locale) })}</span>
                  </div>
                  <StatusBadge status={p.status} t={t} kind="project" />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="explore">
          <h2 id="explore" className="h3 mb-4">{d.explore}</h2>
          <div className="grid-3">
            {[
              { href: "/opportunities", accent: "amber", icon: Award, c: d.exploreOpp },
              { href: "/projects", accent: "pink", icon: Rocket, c: d.exploreProjects },
              { href: "/talent-map", accent: "violet", icon: Compass, c: d.exploreTalent }
            ].map((x) => (
              <Link key={x.href} href={x.href} className={`card card-link stack accent-${x.accent}`}>
                <span className="icon-tile"><x.icon size={20} aria-hidden="true" /></span>
                <h3 className="card-title">{x.c.t}</h3>
                <p className="subtle">{x.c.d}</p>
                <span className="text-link">{x.c.cta} <ArrowRight size={14} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
