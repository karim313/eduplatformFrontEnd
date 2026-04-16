"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";

const REVEAL_SELECTOR =
  "main section, main .card, main .feature-card";

export default function SiteEffects() {
  const pathname = usePathname();
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 360);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Simple page transition without heavy DOM queries
    document.body.classList.add("page-enter");
    
    // Only run reveal animations in production or when not in development
    if (process.env.NODE_ENV === 'production') {
      const targets = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
      );

      targets.forEach((el) => observer.observe(el));

      return () => {
        observer.disconnect();
        document.body.classList.remove("page-enter");
      };
    }
    
    return () => {
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
