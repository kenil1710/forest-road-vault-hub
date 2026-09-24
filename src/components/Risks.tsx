import { LINKS } from "@/lib/data";
import { ExternalLink, Section } from "./ui";

type Level = "High" | "Elevated" | "Moderate";

const RISKS: { title: string; level: Level; body: string }[] = [
  {
    title: "Credit risk",
    level: "High",
    body: "Borrowers can default. If losses exceed curator first-loss capital and the sGROVE backstop, they reach sUSDfr depositor principal. Accrued-but-unpaid interest in NAV may never be collected.",
  },
  {
    title: "Backstop gap",
    level: "High",
    body: "The sGROVE backstop currently holds $0. Today the only layer ahead of depositors is $500,001 of curator first-loss capital (16.65% of loans).",
  },
  {
    title: "Liquidity risk",
    level: "Elevated",
    body: "sUSDfr exits through a 21-day epoch-based FIFO queue, and settlement is paced by loan repayments. You cannot withdraw instantly, and settlement liquidity can be thin.",
  },
  {
    title: "Smart contract risk",
    level: "Elevated",
    body: "Reviews so far are by Corrovera plus internal teams — no top-tier audit yet. Strong test coverage and formal proofs reduce, but don't eliminate, the chance of a bug.",
  },
  {
    title: "Early stage",
    level: "Elevated",
    body: "The protocol is early stage with limited operating history. 7 facilities are live, but the track record is short, and the module-wide Guardian pause has only been drilled on a fork, with no live Safe drill yet.",
  },
  {
    title: "Oracle / attester risk",
    level: "Moderate",
    body: "Off-chain facts (collateral marks, loan conditions) are set by m-of-n attesters — as few as 2 signers for high-value facts. Colluding or compromised attesters could misstate them.",
  },
  {
    title: "Related-party risk",
    level: "Moderate",
    body: "The digital-assets facility lends to Forest Road's own trading subsidiary. That is a conflict of interest, even with attested mark-to-market monitoring.",
  },
  {
    title: "Regulatory risk",
    level: "Moderate",
    body: "Private credit, stablecoins and tokenized lending face evolving rules. KYC gating and jurisdiction screening may change who can mint, hold or transfer.",
  },
  {
    title: "Infrastructure risk",
    level: "Moderate",
    body: "Keeper infrastructure runs on shared hosting. An outage could delay accrual checkpoints, reconciliation or queue processing.",
  },
];

const levelStyles: Record<Level, string> = {
  High: "text-red border-red/25 bg-red/[0.07]",
  Elevated: "text-amber border-amber/25 bg-amber/[0.07]",
  Moderate: "text-blue border-blue/25 bg-blue/[0.07]",
};

export function Risks() {
  return (
    <Section
      id="risks"
      label="06 · Risks"
      title="Read this before you deposit."
      intro="Yield comes from lending, and lending carries risk. These are the ones that matter most right now. The levels are this community tool's own judgment, not an official rating."
    >
      <div className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RISKS.map((r) => (
          <article
            key={r.title}
            className="rounded-xl border border-line bg-card p-5 transition-colors hover:border-line-2"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[15px] font-bold tracking-[0.01em] text-bright">{r.title}</h3>
              <span
                className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.08em] uppercase ${levelStyles[r.level]}`}
              >
                {r.level}
              </span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">{r.body}</p>
          </article>
        ))}
      </div>
      <p className="reveal mt-5 text-[13px] text-muted">
        Read the full, official risk factors at{" "}
        <ExternalLink
          href={LINKS.risk}
          className="text-green underline decoration-green-line underline-offset-2"
        >
          forestroadvault.com/risk ↗
        </ExternalLink>
        .
      </p>
    </Section>
  );
}
