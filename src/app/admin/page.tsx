import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";
import { ADMIN_ROLES, MODERATOR_ROLES, hasRole } from "@/lib/roles";
import { getOverviewCounts } from "@/lib/admin";
import { formatDate, shortName } from "@/lib/format";
import { getDict, getLocale } from "@/i18n/server";
import { fmt } from "@/i18n/fmt";
import { AppShell, PageHeader } from "@/components/app-shell";
import { setUserStatus } from "./actions";
import { OpportunityForm } from "./opportunity-form";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.admin };
}

export default async function Admin() {
  const user = await requireRole(ADMIN_ROLES);
  const canModerate = hasRole(user.role, MODERATOR_ROLES);
  const [t, locale, c, pendingUsers, pendingProjects, log] = await Promise.all([
    getDict(),
    getLocale(),
    getOverviewCounts(),
    prisma.user.findMany({ where: { status: "PENDING" }, orderBy: { createdAt: "asc" }, take: 100 }),
    prisma.project.findMany({ where: { status: "PENDING_REVIEW" }, orderBy: { createdAt: "asc" }, take: 100, include: { owner: { select: { name: true, grade: true } } } }),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 15, include: { actor: { select: { name: true } } } })
  ]);
  const a = t.admin;

  // Turn audit-log ids into names so the log is readable.
  const ids = (type: string) => log.filter((l) => l.entityType === type).map((l) => l.entityId);
  const [logUsers, logProjects, logOpps] = await Promise.all([
    prisma.user.findMany({ where: { id: { in: ids("User") } }, select: { id: true, name: true } }),
    prisma.project.findMany({ where: { id: { in: ids("Project") } }, select: { id: true, title: true } }),
    prisma.opportunity.findMany({ where: { id: { in: ids("Opportunity") } }, select: { id: true, title: true } })
  ]);
  const names = new Map<string, string>([...logUsers.map((u) => [u.id, u.name] as const), ...logProjects.map((p) => [p.id, p.title] as const), ...logOpps.map((o) => [o.id, o.title] as const)]);

  const stats = [
    { label: a.stats.pendingUsers, value: c.pendingUsers, due: c.pendingUsers > 0 },
    { label: a.stats.pendingProjects, value: c.pendingProjects, due: c.pendingProjects > 0 },
    { label: a.stats.students, value: c.students },
    { label: a.stats.published, value: c.published }
  ];

  return (
    <AppShell user={user}>
      <PageHeader title={a.title} lead={a.lead} />
      <div className="stack-lg">
        <div className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <div className="stat-label">{s.label}</div>
              <div className={`stat-value${s.due ? " is-due" : ""}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {!canModerate && <p className="alert" role="status">{a.viewOnly}</p>}

        <section className="panel" aria-labelledby="q-users">
          <div className="panel-head"><h2 id="q-users" className="h3">{a.usersTitle}</h2></div>
          {pendingUsers.length === 0 ? (
            <p className="muted">{a.usersEmpty}</p>
          ) : (
            <ul className="list">
              {pendingUsers.map((u) => (
                <li key={u.id} className="list-item">
                  <div className="list-main">
                    <span className="list-title">{u.name}</span>
                    <span className="meta">{u.email}</span>
                    <span className="meta">{fmt(a.userMeta, { school: u.schoolName ?? a.noSchool, grade: u.grade ?? "—", date: formatDate(u.createdAt, locale) })}</span>
                  </div>
                  {canModerate && (
                    <form action={setUserStatus} className="list-actions">
                      <input type="hidden" name="userId" value={u.id} />
                      <button className="btn btn-primary btn-sm" name="decision" value="approve">{a.approve}<span className="sr-only"> {u.name}</span></button>
                      <button className="btn btn-danger btn-sm" name="decision" value="reject">{a.reject}<span className="sr-only"> {u.name}</span></button>
                    </form>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="panel" aria-labelledby="q-projects">
          <div className="panel-head"><h2 id="q-projects" className="h3">{a.projectsTitle}</h2></div>
          {pendingProjects.length === 0 ? (
            <p className="muted">{a.projectsEmpty}</p>
          ) : (
            <ul className="list">
              {pendingProjects.map((p) => (
                <li key={p.id} className="list-item">
                  <div className="list-main">
                    <Link href={`/projects/${p.id}`} className="list-title">{p.title}</Link>
                    <span className="meta">{t.categories[p.category as keyof typeof t.categories] ?? p.category} · {fmt(t.project.author, { name: shortName(p.owner.name), grade: p.owner.grade ?? "—" })} · {formatDate(p.createdAt, locale)}</span>
                  </div>
                  <Link href={`/projects/${p.id}`} className="btn btn-secondary btn-sm">{a.open}<span className="sr-only"> {p.title}</span></Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {canModerate && (
          <section className="panel" aria-labelledby="q-opp">
            <div className="panel-head"><div className="stack-sm"><h2 id="q-opp" className="h3">{a.oppTitle}</h2><p className="meta">{a.oppLead}</p></div></div>
            <OpportunityForm />
          </section>
        )}

        <section className="panel" aria-labelledby="q-log">
          <div className="panel-head"><h2 id="q-log" className="h3">{a.logTitle}</h2></div>
          {log.length === 0 ? (
            <p className="muted">{a.logEmpty}</p>
          ) : (
            <ul className="list">
              {log.map((l) => (
                <li key={l.id} className="list-item">
                  <div className="list-main">
                    <span>{a.actions[l.action as keyof typeof a.actions] ?? l.action} · {names.get(l.entityId) ?? a.deleted}</span>
                    <span className="meta">{fmt(a.logBy, { name: l.actor?.name ?? a.system })}</span>
                  </div>
                  <span className="meta">{formatDate(l.createdAt, locale)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppShell>
  );
}
