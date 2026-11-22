import { Stamp } from "./stamp";
import type { Dict } from "@/i18n/dictionaries";

type Section = { label: string; text: string; placeholder?: boolean };

/** The notebook sheet — the product's one rich visual moment (hero, auth art, preview). */
export function ProjectSheet(props: {
  t: Dict;
  number?: string;
  category?: string;
  title: string;
  titlePlaceholder?: boolean;
  author?: string;
  sections: Section[];
  status?: string;
  footNote?: string;
  className?: string;
  label?: string;
}) {
  return (
    <figure className={`sheet grid-paper ${props.className ?? ""}`} aria-label={props.label}>
      <div className="sheet-top"><span>{props.number}</span><span>{props.category}</span></div>
      <p className={`sheet-title${props.titlePlaceholder ? " is-placeholder" : ""}`}>{props.title}</p>
      {props.author && <p className="sheet-author">{props.author}</p>}
      <dl>
        {props.sections.map((s, i) => (
          <div key={s.label} className="sheet-sec">
            <dt><span className="idx">{String(i + 1).padStart(2, "0")}</span>{s.label}</dt>
            <dd className={s.placeholder ? "is-placeholder" : undefined}>{s.text}</dd>
          </div>
        ))}
      </dl>
      {(props.status || props.footNote) && (
        <div className="sheet-foot">
          <span className="caption">{props.footNote}</span>
          {props.status && <Stamp status={props.status} t={props.t} large />}
        </div>
      )}
    </figure>
  );
}
