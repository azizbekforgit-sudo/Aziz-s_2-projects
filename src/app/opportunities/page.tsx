import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { getDict, getLocale } from "@/i18n/server";
import { fmt } from "@/i18n/fmt";
import { PublicPage } from "@/components/public-page";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Illo } from "@/components/graphics";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.opportunities };
}

export default async function Opportunities() {
  const [t, locale] = await Promise.all([getDict(), getLocale()]);
  const items = await prisma.opportunity.findMany({
    // expired ones are hidden; open-ended (no deadline) stay
    where: { status: "APPROVED", OR: [{ deadline: null }, { deadline: { gte: new Date() } }] },
    orderBy: [{ deadline: { sort: "asc", nulls: "last" } }, { createdAt: "desc" }],
    take: 60
  });
  const o = t.opportunities;
  return (
    <PublicPage>
      <div className="container page-top">
        <Breadcrumbs label={t.common.breadcrumbs} items={[{ href: "/", label: t.common.home }, { label: t.nav.opportunities }]} />
        <div className="page-head">
          <div className="stack-sm">
            <h1 className="h1">{o.title}</h1>
            <p className="lead">{o.lead}</p>
          </div>
        </div>
        {items.length === 0 ? (
          <div className="empty">
            <Illo name="door" />
            <div><h2 className="h3">{o.emptyTitle}</h2><p className="muted">{o.emptyText}</p></div>
          </div>
        ) : (
          <div className="cards reveal-stagger">
            {items.map((x) => (
              <article key={x.id} className="pcard">
                <div className="pcard-top">
                  <span className="tag">{t.oppCategories[x.category as keyof typeof t.oppCategories] ?? x.category}</span>
                  <span className="caption num">{x.deadline ? fmt(o.deadline, { date: formatDate(x.deadline, locale) }) : o.open}</span>
                </div>
                <h2>{x.title}</h2>
                <p>{x.description}</p>
                <div className="pcard-foot">
                  <span>{x.organizer}</span>
                  {x.officialUrl && (
                    <a className="arrow-link" href={x.officialUrl} target="_blank" rel="noopener noreferrer">
                      {o.official}<ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" /><span className="sr-only"> {t.common.newTab}</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </PublicPage>
  );
}
