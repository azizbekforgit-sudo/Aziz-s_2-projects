import type { Metadata } from "next";
import { Check, X, UserCheck, FolderCheck, History, Info } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";
import { ADMIN_ROLES, MODERATOR_ROLES, hasRole } from "@/lib/roles";
import { getOverviewCounts } from "@/lib/admin";
import { formatDate } from "@/lib/format";
import { getDict, getLocale } from "@/i18n/server";
import { fmt } from "@/i18n/fmt";
import type { Dict } from "@/i18n/dictionaries";
import { AppShell, PageHeader } from "@/components/app-shell";
import { setUserStatus, setProjectStatus } from "./actions";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.admin };
}

function Decision({ action, idName, id, label, t }: { action: (fd: FormData) => Promise<void>; idName: string; id: string; label: string; t: Dict }) {
  return (
    <div className="list-actions">
      <form action={action}>
        <input type="hidden" name={idName} value={id} />
        <input type="hidden" name="decision" value="approve" />
        <button className="btn btn-success btn-sm" type="submit"><Check size={14} aria-hidden="true" /> {t.admin.approve}<span className="sr-only"> {label}</span></button>
      </form>
      <form action={action}>
        <input type="hidden" name={idName} value={id} />
        <input type="hidden" name="decision" value="reject" />
        <button className="btn btn-danger btn-sm" type="submit"><X size={14} aria-hidden="true" /> {t.admin.reject}<span className="sr-only"> {label}</span></button>
      </form>
    </div>
  );
}

export default async function Admin() {
  const user = await requireRole(ADMIN_ROLES);
  const canModerate = hasRole(user.role, MODERATOR_ROLES);
  const [t, locale, c, pendingUsers, pendingProjects, log] = await Promise.all([
    getDict(),
    getLocale(),
    getOverviewCounts(),
    prisma.user.findMany({ where: { status: "PENDING" }, orderBy: { createdAt: "asc" }, take: 50 }),
    prisma.project.findMany({ where: { status: "PENDING_REVIEW" }, orderBy: { createdAt: "asc" }, take: 50, include: { owner: { select: { name: true } } } }),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 10, include: { actor: { select: { name: true } } } })
  ]);
  const a = t.admin;

  // Resolve audit-log entity ids to names, so the log is readable.
  const [logUsers, logProjects] = await Promise.all([
    prisma.user.findMany({ where: { id: { in: log.filter((l) => l.entityType === "User").map((l) => l.entityId) } }, select: { id: true, name: true } }),
    prisma.project.findMany({ where: { id: { in: log.filter((l) => l.entityType === "Project").map((l) => l.entityId) } }, select: { id: true, title: true } })
  ]);
  const entityName = new Map<string, string>([...logUsers.map((u) => [u.id, u.name] as const), ...logProjects.map((p) => [p.id, p.title] as const)]);

  const stats = [
    { label: a.stats.pendingUsers, value: c.pendingUsers, hot: c.pendingUsers > 0 },
    { label: a.stats.pendingProjects, value: c.pendingProjects, hot: c.pendingProjects > 0 },
    { label: a.stats.students, value: c.students },
    { label: a.stats.projects, value: c.projects },
    { label: a.stats.mentors, value: c.mentors },
    { label: a.stats.teachers, value: c.teachers },
    { label: a.stats.regions, value: c.regions },
    { label: a.stats.schools, value: c.schools }
  ];

  return (
    <AppShell user={user}>
      <PageHeader eyebrow={a.eyebrow} title={a.title} description={a.lead} />
      <div className="stack-lg">
        <div className="grid-4">
          {stats.map((s) => (
            <div key={s.label} className={`stat${s.hot ? " stat-highlight" : ""}`}>
              <span className="stat-label">{s.label}</span>
              <span className="stat-value">{s.value}</span>
            </div>
          ))}
        </div>

        {!canModerate && <div className="alert alert-info" role="status"><Info size={18} aria-hidden="true" /><span>{a.viewOnly}</span></div>}

        <section className="card card-pad-lg accent-amber" aria-labelledby="q-users">
          <div className="row"><span className="icon-tile icon-tile-solid"><UserCheck size={20} aria-hidden="true" /></span><h2 id="q-users" className="h3">{a.usersTitle}</h2></div>
          {pendingUsers.length === 0 ? (
            <p className="muted mt-4">{a.usersEmpty}</p>
          ) : (
            <ul className="list mt-4">
              {pendingUsers.map((u) => (
                <li key={u.id} className="list-item">
                  <div className="list-item-main">
                    <span className="list-item-title">{u.name}</span>
                    <span className="subtle">{u.email}{u.grade ? ` · ${fmt(a.gradeN, { n: u.grade })}` : ""} · {fmt(a.registered, { date: formatDate(u.createdAt, locale) })}</span>
                  </div>
                  {canModerate && <Decision action={setUserStatus} idName="userId" id={u.id} label={u.name} t={t} />}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card card-pad-lg accent-pink" aria-labelledby="q-projects">
          <div className="row"><span className="icon-tile icon-tile-solid"><FolderCheck size={20} aria-hidden="true" /></span><h2 id="q-projects" className="h3">{a.projectsTitle}</h2></div>
          {pendingProjects.length === 0 ? (
            <p className="muted mt-4">{a.projectsEmpty}</p>
          ) : (
            <ul className="list mt-4">
              {pendingProjects.map((p) => (
                <li key={p.id} className="list-item">
                  <div className="list-item-main">
                    <span className="list-item-title">{p.title}</span>
                    <span className="subtle">{t.categories[p.category as keyof typeof t.categories] ?? p.category} · {fmt(a.by, { name: p.owner.name })} · {formatDate(p.createdAt, locale)}</span>
                    <span className="muted">{p.summary}</span>
                  </div>
                  {canModerate && <Decision action={setProjectStatus} idName="projectId" id={p.id} label={p.title} t={t} />}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card card-pad-lg accent-teal" aria-labelledby="q-log">
          <div className="row"><span className="icon-tile icon-tile-solid"><History size={20} aria-hidden="true" /></span><h2 id="q-log" className="h3">{a.logTitle}</h2></div>
          {log.length === 0 ? (
            <p className="muted mt-4">{a.logEmpty}</p>
          ) : (
            <ul className="list mt-4">
              {log.map((l) => (
                <li key={l.id} className="list-item">
                  <div className="list-item-main">
                    <span className="list-item-title">{a.actions[l.action as keyof typeof a.actions] ?? l.action} · {entityName.get(l.entityId) ?? a.deleted}</span>
                    <span className="subtle">{fmt(a.logBy, { name: l.actor?.name ?? a.system })}</span>
                  </div>
                  <span className="subtle">{formatDate(l.createdAt, locale)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppShell>
  );
}
