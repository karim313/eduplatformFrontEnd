"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const REVEAL_SELECTOR =
  "main > *, main section, main article, main [data-reveal], main .card, main .feature-card";

export default function SiteEffects() {
  const pathname = usePathname();
  const [showTopButton, setShowTopButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const top = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(top / total, 1) : 0;
      setScrollProgress(progress);
      setShowTopButton(top > 360);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    document.body.classList.remove("page-enter");
    requestAnimationFrame(() => document.body.classList.add("page-enter"));

    const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)).filter(
      (el) => !el.classList.contains("reveal-ignore")
    );
    targets.forEach((el) => el.classList.add("reveal-item"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.14 }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      document.body.classList.remove("page-enter");
    };
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-[9999] rounded-full bg-slate-900/90 px-4 py-2 text-sm font-semibold text-white shadow-lg ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-slate-900 dark:hover:bg-white ${
          showTopButton ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        Top
      </button>
    </>
  );
}
