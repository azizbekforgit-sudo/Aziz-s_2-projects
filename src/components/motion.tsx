"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll reveal for `.reveal` / `.reveal-stagger`. Elements are hidden only under `html.js`,
 * so without JavaScript (or with reduced motion, see CSS) everything stays visible.
 */
export function RevealObserver() {
  const path = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-in), .reveal-stagger:not(.is-in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}

/** Header gets compact (76 → 64px) after the page scrolls. */
export function CompactOnScroll({ targetId }: { targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const on = () => el.classList.toggle("is-compact", window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [targetId]);
  return null;
}

/** Closes the <details> mobile menu after navigating. */
export function CloseOnNavigate({ targetId }: { targetId: string }) {
  const path = usePathname();
  useEffect(() => {
    document.getElementById(targetId)?.removeAttribute("open");
  }, [path, targetId]);
  return null;
}
