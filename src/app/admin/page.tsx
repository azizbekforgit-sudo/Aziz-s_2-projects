import type { Metadata } from "next";
import Link from "next/link";
import { Info } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";
import { ADMIN_ROLES, MODERATOR_ROLES, hasRole } from "@/lib/roles";
import { getOverviewCounts } from "@/lib/admin";
import { formatDate } from "@/lib/format";
import { getDict, getLocale } from "@/i18n/server";
import { fmt } from "@/i18n/fmt";
import { AppShell, PageHead } from "@/components/app-shell";
import { Stamp } from "@/components/stamp";
import { ProjectBody } from "@/components/project-body";
import { ReviewForm } from "@/app/projects/[id]/review-form";
import { OpportunityForm } from "./opportunity-form";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.admin };
}

const dateTime = (d: Date, locale: string) =>
  new Intl.DateTimeFormat(locale === "uz" ? "uz-Latn-UZ" : "ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tashkent" }).format(d);

export default async function Admin({ searchParams }: { searchParams: Promise<{ review?: string }> }) {
  const user = await requireRole(ADMIN_ROLES);
  const canModerate = hasRole(user.role, MODERATOR_ROLES);
  const [{ review }, t, locale, c, pendingProjects, log] = await Promise.all([
    searchParams,
    getDict(),
    getLocale(),
    getOverviewCounts(),
    prisma.project.findMany({ where: { status: "PENDING_REVIEW" }, orderBy: { createdAt: "asc" }, take: 100, include: { owner: { select: { name: true, grade: true, schoolName: true } } } }),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 30, include: { actor: { select: { name: true } } } })
  ]);
  const a = t.admin;
  // Master/detail: the selected project (or the oldest in the queue) is shown in full next to the list.
  const selected = pendingProjects.find((p) => p.id === review) ?? pendingProjects[0];

  const ids = (type: string) => log.filter((l) => l.entityType === type).map((l) => l.entityId);
  const [logUsers, logProjects, logOpps] = await Promise.all([
    prisma.user.findMany({ where: { id: { in: ids("User") } }, select: { id: true, name: true } }),
    prisma.project.findMany({ where: { id: { in: ids("Project") } }, select: { id: true, title: true } }),
    prisma.opportunity.findMany({ where: { id: { in: ids("Opportunity") } }, select: { id: true, title: true } })
  ]);
  const names = new Map<string, string>([...logUsers.map((u) => [u.id, u.name] as const), ...logProjects.map((p) => [p.id, p.title] as const), ...logOpps.map((o) => [o.id, o.title] as const)]);

  const stats = [
    { label: a.stats.pendingProjects, value: c.pendingProjects, due: c.pendingProjects > 0 },
    { label: a.stats.students, value: c.students },
    { label: a.stats.published, value: c.published }
  ];

  return (
    <AppShell user={user}>
      <PageHead title={a.title} lead={a.lead} />
      <div className="stack-lg">
        <div className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <div className="stat-label">{s.label}</div>
              <div className={`stat-value${s.due ? " is-due" : ""}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {!canModerate && <p className="notice notice-info" role="status"><Info size={18} strokeWidth={1.8} aria-hidden="true" />{a.viewOnly}</p>}


        <section id="review" className="admin-sec" aria-labelledby="h-review">
          <div className="panel-head"><h2 id="h-review" className="h3">{a.projectsTitle}</h2><span className="caption num">{pendingProjects.length}</span></div>
          {pendingProjects.length === 0 ? (
            <p className="panel muted">{a.projectsEmpty}</p>
          ) : (
            <div className="review">
              <nav className="panel review-list" aria-label={a.projectsTitle}>
                {pendingProjects.map((p) => (
                  <Link key={p.id} href={`/admin?review=${p.id}#review`} aria-current={p.id === selected?.id ? "true" : undefined}>
                    <span className="list-title">{p.title}</span>
                    <span className="caption">{t.categories[p.category as keyof typeof t.categories] ?? p.category} · {formatDate(p.createdAt, locale)}</span>
                  </Link>
                ))}
              </nav>
              {selected && (
                <article className="panel review-detail" aria-labelledby="sel-title">
                  <div className="row"><span className="tag">{t.categories[selected.category as keyof typeof t.categories] ?? selected.category}</span><Stamp status={selected.status} t={t} /></div>
                  <h3 id="sel-title" className="h2 mt-8">{selected.title}</h3>
                  <p className="caption mt-8">{fmt(t.project.author, { name: selected.owner.name, grade: selected.owner.grade ?? "—" })}{selected.owner.schoolName ? ` · ${selected.owner.schoolName}` : ""}</p>
                  <ProjectBody t={t} summary={selected.summary} problem={selected.problemStatement} solution={selected.proposedSolution} />
                  {canModerate ? <ReviewForm key={selected.id} projectId={selected.id} bare /> : <p className="caption mt-24">{a.viewOnly}</p>}
                </article>
              )}
            </div>
          )}
        </section>

        {canModerate && (
          <section id="add" className="panel admin-sec" aria-labelledby="h-add">
            <div className="panel-head"><div className="stack-sm"><h2 id="h-add" className="h3">{a.oppTitle}</h2><p className="caption">{a.oppLead}</p></div></div>
            <OpportunityForm />
          </section>
        )}

        <section id="log" className="admin-sec" aria-labelledby="h-log">
          <div className="panel-head"><h2 id="h-log" className="h3">{a.logTitle}</h2></div>
          {log.length === 0 ? (
            <p className="panel muted">{a.logEmpty}</p>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th scope="col">{a.logCols.date}</th><th scope="col">{a.logCols.who}</th><th scope="col">{a.logCols.action}</th><th scope="col">{a.logCols.object}</th></tr></thead>
                <tbody>
                  {log.map((l) => (
                    <tr key={l.id}>
                      <td className="num caption">{dateTime(l.createdAt, locale)}</td>
                      <td>{l.actor?.name ?? a.system}</td>
                      <td>{a.actions[l.action as keyof typeof a.actions] ?? l.action}</td>
                      <td>{names.get(l.entityId) ?? a.deleted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
