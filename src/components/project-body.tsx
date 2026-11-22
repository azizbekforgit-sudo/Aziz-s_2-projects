import type { Dict } from "@/i18n/dictionaries";

/** Project text as numbered sections. Only fields that exist are shown — nothing invented. */
export function ProjectBody({ t, summary, problem, solution }: { t: Dict; summary: string; problem: string | null; solution: string | null }) {
  const sections = [
    ...(problem ? [{ id: "problem", label: t.project.problem, text: problem }] : []),
    ...(solution ? [{ id: "solution", label: t.project.solution, text: solution }] : [])
  ];
  return (
    <>
      <p id="summary" className="doc-summary grid-paper">{summary}</p>
      {sections.map((s, i) => (
        <section key={s.id} id={s.id} className="doc-sec" aria-labelledby={`${s.id}-h`}>
          <span className="idx" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <div><h2 id={`${s.id}-h`}>{s.label}</h2><p>{s.text}</p></div>
        </section>
      ))}
    </>
  );
}
