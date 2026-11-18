import type { Metadata } from "next";
import { Check, X, UserCheck, FolderCheck, History } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";
import { ADMIN_ROLES, MODERATOR_ROLES, hasRole } from "@/lib/roles";
import { getOverviewCounts } from "@/lib/admin";
import { formatDate } from "@/lib/format";
import { AppShell, PageHeader } from "@/components/app-shell";
import { setUserStatus, setProjectStatus } from "./actions";

export const metadata: Metadata = { title: "Admin" };

const ACTION_LABELS: Record<string, string> = {
  "user.active": "Approved account",
  "user.deactivated": "Rejected account",
  "project.approved": "Published project",
  "project.rejected": "Rejected project"
};

function Decision({ action, idName, id, label }: { action: (fd: FormData) => Promise<void>; idName: string; id: string; label: string }) {
  return (
    <div className="list-actions">
      <form action={action}>
        <input type="hidden" name={idName} value={id} />
        <input type="hidden" name="decision" value="approve" />
        <button className="btn btn-success btn-sm" type="submit"><Check size={14} aria-hidden="true" /> Approve<span className="sr-only"> {label}</span></button>
      </form>
      <form action={action}>
        <input type="hidden" name={idName} value={id} />
        <input type="hidden" name="decision" value="reject" />
        <button className="btn btn-danger btn-sm" type="submit"><X size={14} aria-hidden="true" /> Reject<span className="sr-only"> {label}</span></button>
      </form>
    </div>
  );
}

export default async function Admin() {
  const user = await requireRole(ADMIN_ROLES);
  const canModerate = hasRole(user.role, MODERATOR_ROLES);
  const [c, pendingUsers, pendingProjects, log] = await Promise.all([
    getOverviewCounts(),
    prisma.user.findMany({ where: { status: "PENDING" }, orderBy: { createdAt: "asc" }, take: 50 }),
    prisma.project.findMany({ where: { status: "PENDING_REVIEW" }, orderBy: { createdAt: "asc" }, take: 50, include: { owner: { select: { name: true } } } }),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 10, include: { actor: { select: { name: true } } } })
  ]);

  // Resolve audit-log entity ids to names, so the log is readable.
  const [logUsers, logProjects] = await Promise.all([
    prisma.user.findMany({ where: { id: { in: log.filter((l) => l.entityType === "User").map((l) => l.entityId) } }, select: { id: true, name: true } }),
    prisma.project.findMany({ where: { id: { in: log.filter((l) => l.entityType === "Project").map((l) => l.entityId) } }, select: { id: true, title: true } })
  ]);
  const entityName = new Map<string, string>([...logUsers.map((u) => [u.id, u.name] as const), ...logProjects.map((p) => [p.id, p.title] as const)]);

  const stats = [
    { label: "Accounts to approve", value: c.pendingUsers, hot: c.pendingUsers > 0 },
    { label: "Projects to review", value: c.pendingProjects, hot: c.pendingProjects > 0 },
    { label: "Active students", value: c.students },
    { label: "All projects", value: c.projects },
    { label: "Verified mentors", value: c.mentors },
    { label: "Teachers", value: c.teachers },
    { label: "Active regions", value: c.regions },
    { label: "Schools", value: c.schools }
  ];

  return (
    <AppShell user={user}>
      <PageHeader eyebrow="Control center" title="Administration" description="Live numbers from the database and the moderation queues." />
      <div className="stack-lg">
        <div className="grid-4">
          {stats.map((s) => (
            <div key={s.label} className={`stat${s.hot ? " stat-highlight" : ""}`}>
              <span className="stat-label">{s.label}</span>
              <span className="stat-value">{s.value}</span>
            </div>
          ))}
        </div>

        {!canModerate && (
          <div className="alert alert-info" role="status">You can view the queues. Approving accounts and projects requires an Administrator role.</div>
        )}

        <section className="card card-pad-lg" aria-labelledby="q-users">
          <div className="row"><span className="icon-tile accent-gold"><UserCheck size={20} aria-hidden="true" /></span><h2 id="q-users" className="h3">Accounts waiting for approval</h2></div>
          {pendingUsers.length === 0 ? (
            <p className="muted mt-4">All caught up — no accounts are waiting.</p>
          ) : (
            <ul className="list mt-4">
              {pendingUsers.map((u) => (
                <li key={u.id} className="list-item">
                  <div className="list-item-main">
                    <span className="list-item-title">{u.name}</span>
                    <span className="subtle">{u.email}{u.grade ? ` · Grade ${u.grade}` : ""} · registered {formatDate(u.createdAt)}</span>
                  </div>
                  {canModerate && <Decision action={setUserStatus} idName="userId" id={u.id} label={u.name} />}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card card-pad-lg" aria-labelledby="q-projects">
          <div className="row"><span className="icon-tile accent-pink"><FolderCheck size={20} aria-hidden="true" /></span><h2 id="q-projects" className="h3">Projects waiting for review</h2></div>
          {pendingProjects.length === 0 ? (
            <p className="muted mt-4">No projects are waiting for review.</p>
          ) : (
            <ul className="list mt-4">
              {pendingProjects.map((p) => (
                <li key={p.id} className="list-item">
                  <div className="list-item-main">
                    <span className="list-item-title">{p.title}</span>
                    <span className="subtle">{p.category} · by {p.owner.name} · {formatDate(p.createdAt)}</span>
                    <span className="muted">{p.summary}</span>
                  </div>
                  {canModerate && <Decision action={setProjectStatus} idName="projectId" id={p.id} label={p.title} />}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card card-pad-lg" aria-labelledby="q-log">
          <div className="row"><span className="icon-tile accent-cyan"><History size={20} aria-hidden="true" /></span><h2 id="q-log" className="h3">Recent actions</h2></div>
          {log.length === 0 ? (
            <p className="muted mt-4">Nothing has been moderated yet.</p>
          ) : (
            <ul className="list mt-4">
              {log.map((l) => (
                <li key={l.id} className="list-item">
                  <div className="list-item-main">
                    <span className="list-item-title">{ACTION_LABELS[l.action] ?? l.action} · {entityName.get(l.entityId) ?? "deleted item"}</span>
                    <span className="subtle">by {l.actor?.name ?? "system"}</span>
                  </div>
                  <span className="subtle">{formatDate(l.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppShell>
  );
}
