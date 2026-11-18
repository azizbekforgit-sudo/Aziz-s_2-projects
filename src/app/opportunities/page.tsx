import type { Metadata } from "next";
import { Award, CalendarClock, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { PublicPage } from "@/components/public-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Opportunities" };

export default async function Opportunities() {
  const now = new Date();
  const items = await prisma.opportunity.findMany({
    // hide expired ones; open-ended (no deadline) stay visible
    where: { status: "APPROVED", OR: [{ deadline: null }, { deadline: { gte: now } }] },
    orderBy: [{ deadline: { sort: "asc", nulls: "last" } }, { createdAt: "desc" }],
    take: 40
  });
  return (
    <PublicPage>
      <div className="container section">
        <div className="section-head">
          <div className="stack">
            <span className="eyebrow">Opportunity Relay</span>
            <h1 className="h2">Opportunities</h1>
            <p className="muted">Competitions, scholarships, grants and programmes — each checked by the platform team before it is listed.</p>
          </div>
        </div>
        {items.length === 0 ? (
          <div className="empty">
            <span className="icon-tile accent-gold"><Award size={20} aria-hidden="true" /></span>
            <h2 className="card-title">No open opportunities right now</h2>
            <p className="muted">New opportunities are added after they are verified. Check back soon.</p>
          </div>
        ) : (
          <div className="grid-3">
            {items.map((x) => (
              <article key={x.id} className="card project-card accent-gold">
                <span className="mechanism-tag">{x.category}</span>
                <h2 className="card-title">{x.title}</h2>
                <p>{x.description}</p>
                <div className="project-meta">
                  <span>{x.organizer}</span>
                  {x.deadline && <span className="row"><CalendarClock size={14} aria-hidden="true" /> {formatDate(x.deadline)}</span>}
                </div>
                {x.officialUrl && (
                  <a className="btn btn-secondary btn-sm" href={x.officialUrl} target="_blank" rel="noopener noreferrer">
                    Official website <ExternalLink size={14} aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </PublicPage>
  );
}
