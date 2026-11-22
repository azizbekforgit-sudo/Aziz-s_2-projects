import { describe, expect, it } from "vitest";
import { isLocked, recordFailure, clearFailures } from "@/lib/rate-limit";

describe("sign-in rate limit", () => {
  it("locks after 5 failures for 15 minutes, then lets go", () => {
    const key = "brute@example.com", t0 = 1_000_000;
    for (let i = 0; i < 4; i++) recordFailure(key, t0);
    expect(isLocked(key, t0)).toBe(false);
    recordFailure(key, t0);
    expect(isLocked(key, t0)).toBe(true);
    expect(isLocked(key, t0 + 15 * 60_000)).toBe(false);
  });
  it("a successful sign-in clears the counter", () => {
    const key = "ok@example.com";
    for (let i = 0; i < 5; i++) recordFailure(key);
    clearFailures(key);
    expect(isLocked(key)).toBe(false);
  });
});
