/** Mark: a point that becomes a route with an arrow — from noticing to impact. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="6" cy="21" r="3.2" fill="currentColor" />
      <path d="M8.6 18.6c3.4-3.6 5.6-2 8.4-5.4 1.9-2.3 2.6-4.6 3.4-7.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m16.6 6.6 3.9-1.4 1.3 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="logo">
      <LogoMark />
      Talent to Impact
    </span>
  );
}
