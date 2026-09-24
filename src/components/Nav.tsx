"use client";

import { useEffect, useState } from "react";
import { LINKS } from "@/lib/data";
import { CommunityBadge } from "./ui";

const NAV = [
  { id: "calculator", label: "Calculator" },
  { id: "how-it-works", label: "How it works" },
  { id: "sectors", label: "Sectors" },
  { id: "live-book", label: "Live Book" },
  { id: "safety", label: "Safety" },
  { id: "risks", label: "Risks" },
  { id: "faq", label: "FAQ" },
];

export function Nav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-navy/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-2">
          <span className="text-lg" aria-hidden>
            🌲
          </span>
          <span className="text-[14px] font-bold tracking-tight text-bright">
            Forest Road Vault
          </span>
          <span className="hidden sm:inline-flex">
            <CommunityBadge />
          </span>
        </a>
        <nav
          aria-label="Sections"
          className="no-scrollbar ml-auto hidden items-center gap-1 overflow-x-auto md:flex"
        >
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`rounded-md px-2.5 py-1.5 text-[13px] whitespace-nowrap transition-colors ${
                active === n.id ? "bg-card-2 text-bright" : "text-muted hover:text-fg"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={LINKS.app}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto shrink-0 rounded-md border border-green-line bg-green-bg px-3 py-1.5 text-[12px] font-semibold text-green transition-colors hover:bg-green/15 md:ml-2"
        >
          Official app ↗
        </a>
      </div>
      {/* Mobile: horizontally scrolling section links */}
      <nav
        aria-label="Sections"
        className="no-scrollbar flex gap-1 overflow-x-auto border-t border-line px-3 py-1.5 md:hidden"
      >
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={`shrink-0 rounded-md px-2.5 py-1 text-[12px] whitespace-nowrap ${
              active === n.id ? "bg-card-2 text-bright" : "text-muted"
            }`}
          >
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
