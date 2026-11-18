import { describe, expect, it } from "vitest";
import ru from "@/i18n/ru";
import uz from "@/i18n/uz";
import { fmt } from "@/i18n/fmt";

type Tree = { [k: string]: unknown };

/** Walks both dictionaries in parallel and reports structural differences. */
function diff(a: unknown, b: unknown, path = ""): string[] {
  if (typeof a === "string") return typeof b === "string" && b.trim() !== "" ? [] : [`${path}: missing/empty in uz`];
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return [`${path}: array length differs`];
    return a.flatMap((x, i) => diff(x, b[i], `${path}[${i}]`));
  }
  const ao = a as Tree, bo = (b ?? {}) as Tree;
  const keys = new Set([...Object.keys(ao), ...Object.keys(bo)]);
  return [...keys].flatMap((k) => (k in ao ? (k in bo ? diff(ao[k], bo[k], `${path}.${k}`) : [`${path}.${k}: missing in uz`]) : [`${path}.${k}: extra in uz`]));
}

function placeholders(s: string) {
  return [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
}
function strings(o: unknown, path = ""): [string, string][] {
  if (typeof o === "string") return [[path, o]];
  if (Array.isArray(o)) return o.flatMap((x, i) => strings(x, `${path}[${i}]`));
  return Object.entries(o as Tree).flatMap(([k, v]) => strings(v, `${path}.${k}`));
}

describe("dictionaries", () => {
  it("uz has exactly the same structure as ru, with no empty strings", () => {
    expect(diff(ru, uz)).toEqual([]);
  });

  it("ru has no empty strings", () => {
    expect(strings(ru).filter(([, v]) => v.trim() === "").map(([p]) => p)).toEqual([]);
  });

  it("placeholders like {name} match between languages", () => {
    const uzMap = new Map(strings(uz));
    const bad = strings(ru).filter(([p, v]) => placeholders(v) !== placeholders(uzMap.get(p) ?? "")).map(([p]) => p);
    expect(bad).toEqual([]);
  });
});

describe("fmt", () => {
  it("fills placeholders and leaves unknown ones", () => {
    expect(fmt("Hi {name}, {x}", { name: "Aziza" })).toBe("Hi Aziza, {x}");
  });
});
