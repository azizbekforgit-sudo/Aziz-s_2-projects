import Link from "next/link";
import { Check, ArrowRight, Info } from "lucide-react";
import { requireUser } from "@/lib/session";
import { getDict } from "@/i18n/server";
import { AppShell, PageHeader } from "./app-shell";

type Module = "talentMap" | "community" | "mentorship";

/**
 * Honest placeholder for modules that are specified but not built yet.
 * Shows what the module will do and links to something the student CAN do today — never a dead end.
 */
export async function ComingSoon({ module, accent, icon }: { module: Module; accent: "violet" | "pink" | "teal" | "amber"; icon: React.ReactNode }) {
  const [user, t] = await Promise.all([requireUser(), getDict()]);
  const m = t.soon[module];
  return (
    <AppShell user={user}>
      <div className={`accent-${accent}`}>
        <PageHeader eyebrow={m.eyebrow} title={m.title} description={m.description} action={<span className="badge badge-info">{t.common.comingSoon}</span>} />
        <div className="soon">
          <section className="card card-pad-lg stack" aria-labelledby="soon-what">
            <div className="icon-tile icon-tile-solid">{icon}</div>
            <h2 id="soon-what" className="h3">{t.soon.whatTitle}</h2>
            <ul className="soon-list">
              {m.features.map((f) => <li key={f}><Check size={16} aria-hidden="true" />{f}</li>)}
            </ul>
          </section>
          <aside className="stack">
            <div className="alert alert-info"><Info size={18} aria-hidden="true" /><span><strong>{t.soon.whyTitle}</strong> {m.blocker}</span></div>
            <div className="card stack">
              <h2 className="card-title">{t.soon.meanwhile}</h2>
              <Link href="/projects/new" className="btn btn-primary btn-block">{t.soon.submit} <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link href="/opportunities" className="btn btn-secondary btn-block">{t.soon.browse}</Link>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
