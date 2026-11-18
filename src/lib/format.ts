// Dates are rendered on the server — always pin locale and time zone,
// otherwise the output depends on the machine the server runs on.
const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Tashkent" });

export function formatDate(d: Date): string {
  return dateFmt.format(d);
}

export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name;
}
