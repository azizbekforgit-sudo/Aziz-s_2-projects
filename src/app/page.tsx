import Link from "next/link";
import { ArrowUpRight, Compass, Rocket, Network, Send, Sparkles, ShieldCheck, Eye, HeartHandshake } from "lucide-react";
import { PublicPage } from "@/components/public-page";

const MECHANISMS = [
  { icon: Compass, accent: "purple", tag: "Discover", name: "Talent Map", desc: "Explore your interests, understand your strengths and build a personal development roadmap.", status: "soon" },
  { icon: Rocket, accent: "pink", tag: "Create", name: "School Hack 72", desc: "Turn a real problem into a working project with a team, mentors and a 72-hour sprint.", status: "open" },
  { icon: Network, accent: "cyan", tag: "Connect", name: "Knowledge Bridge", desc: "Learn from peers, share what you know and meet students from every region.", status: "soon" },
  { icon: Send, accent: "gold", tag: "Pass it on", name: "Opportunity Relay", desc: "Find competitions, scholarships and mentors — then pass the experience on.", status: "open" }
] as const;

const STEPS = [
  { n: "01", accent: "purple", t: "Discover", d: "Find out what you are good at and what you care about." },
  { n: "02", accent: "pink", t: "Develop", d: "Build skills by learning from peers, mentors and practice." },
  { n: "03", accent: "cyan", t: "Create", d: "Join a team and turn a real problem into a real project." },
  { n: "04", accent: "gold", t: "Share", d: "Pass on knowledge, experience and opportunities to others." }
] as const;

const PRINCIPLES = [
  { icon: ShieldCheck, t: "Safe by design", d: "Student profiles are private by default. Every account and project is reviewed by a person." },
  { icon: Eye, t: "Honest numbers", d: "No invented scores or fake statistics. If a feature isn’t ready, we say so." },
  { icon: HeartHandshake, t: "Free for students", d: "Built for schools in Uzbekistan, starting with the Navoi region pilot." }
];

export default function Home() {
  return (
    <PublicPage>
      <div className="container">
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <span className="hero-pill">
              <span className="hero-pill-dot" aria-hidden="true"><Sparkles size={12} /></span>
              National youth innovation ecosystem
            </span>
            <h1 id="hero-title" className="h1">
              Every talent deserves <span className="gradient-text">an opportunity.</span>
            </h1>
            <p className="lead">
              Discover what you are good at, build projects that solve real problems, and open doors for the next generation of students.
            </p>
            <div className="hero-cta">
              <Link href="/register" className="btn btn-primary btn-lg">Create a free account <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <Link href="/projects" className="btn btn-secondary btn-lg">See student projects</Link>
            </div>
            <dl className="hero-facts">
              <div className="hero-fact"><dt className="sr-only">Grades</dt><dd><strong>Grades 7–11</strong><span>Who it’s for</span></dd></div>
              <div className="hero-fact"><dt className="sr-only">Mechanisms</dt><dd><strong>4 mechanisms</strong><span>One connected journey</span></dd></div>
              <div className="hero-fact"><dt className="sr-only">Pilot</dt><dd><strong>Navoi region</strong><span>Pilot launch</span></dd></div>
            </dl>
          </div>

          <div className="journey" aria-hidden="true">
            <div className="journey-head">
              <span className="eyebrow">Your journey</span>
              <span className="badge badge-success">You are here</span>
            </div>
            <ol className="journey-steps">
              {MECHANISMS.map((m, i) => (
                <li key={m.name} className={`journey-step accent-${m.accent}`}>
                  <span className="icon-tile"><m.icon size={20} /></span>
                  <span><strong>{m.name}</strong><span>Step {i + 1} · {STEPS[i].t}</span></span>
                  {m.status === "open" ? <span className="badge badge-success badge-plain">Open</span> : <span className="badge badge-neutral badge-plain">Soon</span>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="mechanisms" aria-labelledby="mech-title">
          <div className="section-head">
            <div className="stack">
              <span className="eyebrow">The ecosystem</span>
              <h2 id="mech-title" className="h2">Four mechanisms. One journey.</h2>
              <p className="muted">Each mechanism covers one stage of growing from potential to real impact. Together they form a path you can follow at your own pace.</p>
            </div>
          </div>
          <div className="grid-4">
            {MECHANISMS.map((m) => (
              <article key={m.name} className={`mechanism accent-${m.accent}`}>
                <span className="icon-tile"><m.icon size={20} aria-hidden="true" /></span>
                <span className="mechanism-tag">{m.tag}</span>
                <h3>{m.name}</h3>
                <p>{m.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="how" aria-labelledby="how-title">
          <div className="section-head">
            <div className="stack">
              <span className="eyebrow">How it works</span>
              <h2 id="how-title" className="h2">Make your next step count.</h2>
            </div>
          </div>
          <ol className="steps">
            {STEPS.map((s) => (
              <li key={s.n} className={`accent-${s.accent}`}>
                <span className="step-num">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section" aria-labelledby="principles-title">
          <div className="section-head">
            <div className="stack">
              <span className="eyebrow">Our principles</span>
              <h2 id="principles-title" className="h2">Built for students, with care.</h2>
            </div>
          </div>
          <div className="grid-3">
            {PRINCIPLES.map((p) => (
              <div key={p.t} className="card principle accent-cyan">
                <span className="icon-tile"><p.icon size={20} aria-hidden="true" /></span>
                <div><h3>{p.t}</h3><p>{p.d}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="cta-title">
          <div className="cta-band">
            <div className="stack">
              <span className="eyebrow">Your journey starts here</span>
              <h2 id="cta-title" className="h2">Make your talent matter.</h2>
              <p className="muted">Create an account in a minute. A coordinator will activate it and you can submit your first project.</p>
            </div>
            <Link className="btn btn-primary btn-lg" href="/register">Create your account <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </section>
      </div>
    </PublicPage>
  );
}
