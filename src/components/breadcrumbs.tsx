import Link from "next/link";

export function Breadcrumbs({ label, items }: { label: string; items: { href?: string; label: string }[] }) {
  return (
    <nav className="crumbs" aria-label={label}>
      <ol>
        {items.map((i, n) =>
          <li key={n}>{i.href ? <Link href={i.href}>{i.label}</Link> : <span aria-current="page">{i.label}</span>}</li>
        )}
      </ol>
    </nav>
  );
}
