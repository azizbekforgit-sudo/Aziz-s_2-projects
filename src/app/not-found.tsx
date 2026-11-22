import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/i18n/server";
import { PublicPage } from "@/components/public-page";
import { Illo } from "@/components/graphics";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.notFound };
}

export default async function NotFound() {
  const t = await getDict();
  return (
    <PublicPage>
      <div className="container page-top">
        <div className="empty">
          <Illo name="sheet" />
          <div className="stack-sm">
            <h1 className="h2">{t.states.notFoundTitle}</h1>
            <p className="muted">{t.states.notFoundText}</p>
            <div className="row mt-8"><Link className="btn btn-primary" href="/projects">{t.nav.projects}</Link><Link className="btn btn-text" href="/">{t.common.home}</Link></div>
          </div>
        </div>
      </div>
    </PublicPage>
  );
}
