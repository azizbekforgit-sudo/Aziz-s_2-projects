import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FolderPlus, Award, Compass, Zap, Users, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { firstName, formatDate } from "@/lib/format";
import { AppShell, PageHeader } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";

export const metadata: Metadata = { title: "Dashboard" };

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ submitted?: string }> }) {
  const user = await requireUser();
  const [{ submitted }, projects, xp, teams] = await Promise.all([
    searchParams,
    prisma.project.findMany({ where: { ownerId: user.id }, orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.xpTransaction.aggregate({ where: { userId: user.id, verified: true }, _sum: { points: true } }),
    prisma.teamMember.count({ where: { userId: user.id } })
  ]);

  return (
    <AppShell user={user}>
      <PageHeader
        eyebrow="Your personal space"
        title={`Good to see you, ${firstName(user.name)}.`}
        description="Your journey is yours to shape. Here is where you are and what you can do next."
        action={<Link href="/projects/new" className="btn btn-primary"><FolderPlus size={16} aria-hidden="true" /> Submit a project</Link>}
      />

      <div className="stack-lg">
        {submitted === "project" && (
          <div className="alert alert-success" role="status">
            <CheckCircle2 size={18} aria-hidden="true" />
            <span><strong>Project submitted.</strong> A moderator will review it. Once approved it appears on the public projects page.</span>
          </div>
        )}

        <div className="grid-4">
          <div className="stat"><span className="stat-label"><FolderPlus size={16} aria-hidden="true" /> Projects</span><span className="stat-value">{projects.length}</span></div>
          <div className="stat"><span className="stat-label"><Zap size={16} aria-hidden="true" /> Verified XP</span><span className="stat-value">{xp._sum.points ?? 0}</span></div>
          <div className="stat"><span className="stat-label"><Users size={16} aria-hidden="true" /> Teams</span><span className="stat-value">{teams}</span></div>
          <div className="stat"><span className="stat-label">Profile</span><StatusBadge status={user.verification} /></div>
        </div>

        <section className="card card-pad-lg" aria-labelledby="my-projects">
          <div className="card-title-row">
            <div className="stack-sm">
              <h2 id="my-projects" className="h3">My projects</h2>
              <p className="subtle">Every project is reviewed before it becomes public.</p>
            </div>
          </div>
          {projects.length === 0 ? (
            <div className="empty mt-5">
              <span className="icon-tile accent-pink"><FolderPlus size={20} aria-hidden="true" /></span>
              <h3 className="card-title">You haven’t submitted a project yet</h3>
              <p className="muted">Got an idea to improve your school, city or community? Describe the problem and how you would solve it.</p>
              <Link href="/projects/new" className="btn btn-primary">Submit your first project</Link>
            </div>
          ) : (
            <ul className="list mt-4">
              {projects.map((p) => (
                <li key={p.id} className="list-item">
                  <div className="list-item-main">
                    <span className="list-item-title">{p.title}</span>
                    <span className="subtle">{p.category} · submitted {formatDate(p.createdAt)}</span>
                  </div>
                  <StatusBadge status={p.status} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="explore">
          <h2 id="explore" className="h3 mb-4">Explore</h2>
          <div className="grid-3">
            <Link href="/opportunities" className="card card-link stack accent-gold">
              <span className="icon-tile"><Award size={20} aria-hidden="true" /></span>
              <h3 className="card-title">Opportunities</h3>
              <p className="subtle">Competitions, scholarships and programmes reviewed by the platform.</p>
              <span className="text-link">Browse <ArrowRight size={14} aria-hidden="true" /></span>
            </Link>
            <Link href="/projects" className="card card-link stack accent-pink">
              <span className="icon-tile"><FolderPlus size={20} aria-hidden="true" /></span>
              <h3 className="card-title">Student projects</h3>
              <p className="subtle">See what other students are building and get inspired.</p>
              <span className="text-link">Explore <ArrowRight size={14} aria-hidden="true" /></span>
            </Link>
            <Link href="/talent-map" className="card card-link stack accent-purple">
              <span className="icon-tile"><Compass size={20} aria-hidden="true" /></span>
              <h3 className="card-title">Talent Map</h3>
              <p className="subtle">Discover your strengths across eight competency areas. Coming soon.</p>
              <span className="text-link">Learn more <ArrowRight size={14} aria-hidden="true" /></span>
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
