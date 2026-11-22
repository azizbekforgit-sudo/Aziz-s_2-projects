// Failed sign-in counter, so a password can't be guessed by trying thousands of times.
// shortcut: in-process memory — correct for the single Render instance; move to the DB/Redis if we ever run more than one.
const WINDOW_MS = 15 * 60_000;
const MAX_FAILURES = 5;
const failures = new Map<string, { count: number; until: number }>();

export function isLocked(key: string, now = Date.now()): boolean {
  const f = failures.get(key);
  return !!f && f.count >= MAX_FAILURES && now < f.until;
}

export function recordFailure(key: string, now = Date.now()): void {
  const f = failures.get(key);
  if (!f || now >= f.until) failures.set(key, { count: 1, until: now + WINDOW_MS });
  else f.count++;
  if (failures.size > 10_000) for (const [k, v] of failures) if (now >= v.until) failures.delete(k);
}

export function clearFailures(key: string): void {
  failures.delete(key);
}
