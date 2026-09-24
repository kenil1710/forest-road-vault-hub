import type { ReactNode } from "react";

export function CommunityBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-green-line bg-green-bg px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-green uppercase ${className}`}
    >
      <span className="size-1.5 rounded-full bg-green" aria-hidden />
      Community Tool
    </span>
  );
}

type ChipTone = "green" | "amber" | "blue" | "red" | "purple" | "slate";

const chipTones: Record<ChipTone, string> = {
  green: "border-green-line bg-green-bg text-green",
  amber: "border-amber/25 bg-amber/[0.07] text-amber",
  blue: "border-blue/25 bg-blue/[0.07] text-blue",
  red: "border-red/25 bg-red/[0.07] text-red",
  purple: "border-purple/25 bg-purple/[0.07] text-purple",
  slate: "border-line-2 bg-card-2 text-sub",
};

export function Chip({ tone = "slate", children }: { tone?: ChipTone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.08em] uppercase ${chipTones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Section({
  id,
  label,
  title,
  intro,
  children,
}: {
  id: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal mb-10 max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-gold uppercase">{label}</p>
          <span className="gold-rule mt-3 mb-5" aria-hidden />
          <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-bright sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-[15px] leading-relaxed text-muted">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Card({
  children,
  className = "",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-line bg-card ${hover ? "transition-colors hover:border-gold-line" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] font-medium tracking-[0.14em] text-muted uppercase">
      {children}
    </p>
  );
}

/** Label/value row used inside data cards. */
export function Row({
  label,
  value,
  tone,
}: {
  label: ReactNode;
  value: ReactNode;
  tone?: "green" | "amber" | "red" | "bright";
}) {
  const color =
    tone === "green"
      ? "text-green"
      : tone === "amber"
        ? "text-amber"
        : tone === "red"
          ? "text-red"
          : "text-fg";
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-line py-2.5 first:border-t-0">
      <dt className="text-[13px] text-muted">{label}</dt>
      <dd className={`text-right font-mono text-[13px] font-semibold tabular-nums ${color}`}>
        {value}
      </dd>
    </div>
  );
}

/** Stat grid where the 1px gap, painted in the border color, forms the dividers. */
export function StatGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`grid gap-px overflow-hidden rounded-xl border border-line bg-line ${className}`}>
      {children}
    </div>
  );
}

export function Stat({
  label,
  value,
  sub,
  tone,
}: {
  label: ReactNode;
  value: ReactNode;
  sub?: ReactNode;
  tone?: "green" | "amber";
}) {
  return (
    <div className="bg-card p-4 sm:p-5">
      <CardLabel>{label}</CardLabel>
      <p
        className={`mt-2 font-mono text-xl font-bold tracking-tight tabular-nums sm:text-2xl ${tone === "green" ? "text-green" : tone === "amber" ? "text-amber" : "text-bright"}`}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-[12px] text-muted">{sub}</p>}
    </div>
  );
}

/** Mandatory disclaimer shown wherever yield or returns appear. */
export function YieldNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`flex gap-2 rounded-lg border border-amber/20 bg-amber/[0.05] px-3 py-2.5 text-[12px] leading-relaxed text-sub ${className}`}
    >
      <span className="text-amber" aria-hidden>
        ⚠
      </span>
      <span>
        <strong className="font-semibold text-amber">16.74% is contractual book yield</strong> — what
        borrowers owe on performing loans, weighted by principal. It is not realized cash yield, not an
        sUSDfr return, and not guaranteed. Returns are variable, net of fees, and depositor principal
        can be lost if defaults exhaust the loss cascade.
      </span>
    </p>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
