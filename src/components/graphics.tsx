// Brand graphics: contour lines, the route line and small line illustrations.
// All decorative (aria-hidden). Stroke ~1.8px to match the icon set.

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** Topographic contour lines — territory and the movement of an idea. Use rarely. */
export function Contours({ className = "" }: { className?: string }) {
  return (
    <svg className={`contours ${className}`} viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M-20 ${360 - i * 34} C 120 ${330 - i * 40}, 200 ${250 - i * 30}, 320 ${230 - i * 36} S 520 ${120 - i * 26}, 640 ${60 - i * 22}`} fill="none" stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );
}

/** Thin blue route that links steps. `vertical` for mobile timelines is handled in CSS. */
export function RouteLine({ className = "" }: { className?: string }) {
  return (
    <svg className={`route-line ${className}`} viewBox="0 0 1000 2" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 1 H1000" />
    </svg>
  );
}

/** Hero route: from the bottom-left point to the top-right, behind the sheet. */
export function HeroRoute() {
  return (
    <svg className="route-line hero-route contours" viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">
      <path d="M30 370 C 160 340, 180 250, 300 240 S 470 150, 575 40" />
      <circle className="route-dot" cx="30" cy="370" r="5" />
      <circle className="route-dot" cx="575" cy="40" r="5" />
    </svg>
  );
}

type IlloName = "notice" | "propose" | "share" | "door" | "talent" | "bridge" | "mentor" | "sheet";

/** Small line illustrations for steps, empty states and future modules. */
export function Illo({ name, className = "" }: { name: IlloName; className?: string }) {
  const body: Record<IlloName, React.ReactNode> = {
    // eye + a point on the ground
    notice: (<><path {...S} d="M10 40c10-14 22-20 34-20s24 6 34 20c-10 14-22 20-34 20s-24-6-34-20Z" /><circle {...S} cx="44" cy="40" r="8" /><circle cx="44" cy="40" r="3" className="accent" fill="currentColor" /></>),
    // sheet with lines and a pencil stroke
    propose: (<><rect {...S} x="18" y="12" width="44" height="56" rx="4" /><path {...S} d="M28 28h24M28 38h24M28 48h14" /><path {...S} className="accent" d="m58 50 14-14 6 6-14 14-8 2 2-8Z" /></>),
    // two sheets and an arrow between
    share: (<><rect {...S} x="8" y="20" width="30" height="40" rx="3" /><rect {...S} x="52" y="20" width="30" height="40" rx="3" /><path {...S} className="accent" d="M38 40h14m-5-5 5 5-5 5" /></>),
    // open door with a path
    door: (<><path {...S} d="M30 70V14h36v56" /><path {...S} d="M30 14 52 22v56L30 70" /><path {...S} className="accent" d="M8 76c10-4 18-2 26-6" /></>),
    // eight directions converging
    talent: (<><circle {...S} cx="80" cy="45" r="5" className="accent" />{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = (i / 8) * Math.PI * 2; return <path key={i} {...S} d={`M${80 + Math.cos(a) * 14} ${45 + Math.sin(a) * 14} L${80 + Math.cos(a) * 40} ${45 + Math.sin(a) * 40}`} />; })}</>),
    // bridge of two sheets
    bridge: (<><rect {...S} x="14" y="40" width="40" height="36" rx="3" /><rect {...S} x="106" y="40" width="40" height="36" rx="3" /><path {...S} className="accent" d="M54 52c10-22 42-22 52 0" /><path {...S} d="M64 44v8M80 38v14M96 44v8" /></>),
    // a route between two points
    mentor: (<><circle cx="22" cy="68" r="6" fill="currentColor" /><circle cx="138" cy="22" r="6" className="accent" fill="currentColor" /><path {...S} className="accent" strokeDasharray="4 6" d="M28 66c30-6 30-34 56-36s34-6 48-6" /></>),
    // empty grid sheet
    sheet: (<><rect {...S} x="30" y="10" width="100" height="72" rx="4" /><path {...S} d="M44 10v72" stroke="#e6b9a8" /><path {...S} d="M54 30h60M54 44h60M54 58h36" /><path {...S} className="accent" d="M98 66h22" /></>)
  };
  const wide = name === "talent" || name === "bridge" || name === "mentor" || name === "sheet";
  return (
    <svg className={`illo ${className}`} viewBox={wide ? "0 0 160 90" : "0 0 90 80"} width={wide ? 160 : 90} height={wide ? 90 : 80} aria-hidden="true">
      {body[name]}
    </svg>
  );
}
