import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { requireUser } from "@/lib/session";
import { AppShell, PageHeader } from "./app-shell";
import { SoonBadge } from "./status-badge";

/**
 * Honest placeholder for modules that are specified but not built yet.
 * Shows what the module will do and links to something the student CAN do today — never a dead end.
 */
export async function ComingSoon(props: {
  eyebrow: string;
  title: string;
  description: string;
  accent: "purple" | "pink" | "cyan" | "gold";
  icon: React.ReactNode;
  features: string[];
  blocker: string;
}) {
  const user = await requireUser();
  return (
    <AppShell user={user}>
      <PageHeader eyebrow={props.eyebrow} title={props.title} description={props.description} action={<SoonBadge />} />
      <div className={`soon accent-${props.accent}`}>
        <section className="card card-pad-lg stack" aria-labelledby="soon-what">
          <div className="icon-tile">{props.icon}</div>
          <h2 id="soon-what" className="h3">What this module will do</h2>
          <ul className="soon-list">
            {props.features.map((f) => <li key={f}><Check size={16} aria-hidden="true" />{f}</li>)}
          </ul>
        </section>
        <aside className="stack">
          <div className="alert alert-info"><span><strong>Why it’s not open yet.</strong> {props.blocker}</span></div>
          <div className="card stack">
            <h2 className="card-title">Meanwhile, you can</h2>
            <Link href="/projects/new" className="btn btn-primary btn-block">Submit a project <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href="/opportunities" className="btn btn-secondary btn-block">Browse opportunities</Link>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
