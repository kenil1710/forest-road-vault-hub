"use client";

import { useState } from "react";
import {
  afterInterestFee,
  afterPerformanceFee,
  BOOK,
  estimatedNet,
  QUEUE,
  SUPPLY,
  VAULT,
  YIELD,
} from "@/lib/data";
import { num, pct, usd } from "@/lib/format";
import { CardLabel, Section, YieldNote } from "./ui";

const PRESETS = [500, 1_000, 5_000, 10_000, 25_000, 50_000, 100_000];
const MAX = 100_000_000;

const PERIODS = [
  { label: "Daily", days: 1 },
  { label: "Weekly", days: 7 },
  { label: "Monthly", days: 365 / 12 },
  { label: "Yearly", days: 365 },
];

const TIMELINE = [
  { label: "1 day", days: 1 },
  { label: "1 week", days: 7 },
  { label: "1 month", days: 30 },
  { label: "3 months", days: 90 },
  { label: "6 months", days: 180 },
  { label: "1 year", days: 365 },
  { label: "2 years", days: 730 },
];

function compact(n: number) {
  return n >= 1000 ? `$${n / 1000}K` : `$${n}`;
}

export function Calculator() {
  const [raw, setRaw] = useState("10000");
  const parsed = Number(raw.replace(/,/g, ""));
  const amount = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), MAX) : 0;

  const gross = YIELD.gross / 100;
  const net = estimatedNet / 100;
  // Simple (non-compounding) accrual over `days`.
  const earn = (rate: number, days: number) => (amount * rate * days) / 365;

  const shares = amount / VAULT.exchangeRate;
  const poolShare = amount > 0 ? amount / (VAULT.stakedAssets + amount) : 0;
  const supplyShare = amount > 0 ? amount / (SUPPLY.usdfrSupply + amount) : 0;
  const proRataIncome =
    supplyShare * BOOK.grossIncomeRunRate * (1 - YIELD.interestFee) * (1 - YIELD.performanceFee);

  const fees = [
    { label: "Gross performing weighted yield", value: YIELD.gross, delta: null, strong: true },
    {
      label: "Interest fee (10% of gross interest)",
      value: afterInterestFee,
      delta: afterInterestFee - YIELD.gross,
    },
    {
      label: "Performance fee (10% above HWM)",
      value: afterPerformanceFee,
      delta: afterPerformanceFee - afterInterestFee,
    },
    { label: "Management fee (currently 0%)", value: estimatedNet, delta: 0 },
  ];

  return (
    <Section
      id="calculator"
      label="01 · Yield calculator"
      title="What could a deposit earn?"
      intro="An illustrative estimate built on the live book's contractual yield and the published fee schedule. Adjust the amount to see how a position would look today."
    >
      <div className="reveal grid gap-5 lg:grid-cols-[1.05fr_1fr]">
        {/* Left: headline rate + input */}
        <div className="rounded-xl border border-line bg-card p-5 sm:p-7">
          <CardLabel>Performing weighted yield (contractual)</CardLabel>
          <p className="mt-2 font-mono text-5xl font-bold tracking-tight text-green tabular-nums sm:text-6xl">
            {pct(YIELD.gross)}
          </p>
          <p className="mt-2 text-[13px] text-muted">
            Gross, weighted by live outstanding principal across Active and Amortizing loans.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
            <div className="bg-card-2 p-4">
              <CardLabel>Gross APY</CardLabel>
              <p className="mt-1.5 font-mono text-2xl font-bold text-bright tabular-nums">
                {pct(YIELD.gross)}
              </p>
              <p className="mt-0.5 text-[11px] text-muted">Before protocol fees</p>
            </div>
            <div className="bg-card-2 p-4">
              <CardLabel>Estimated net APY</CardLabel>
              <p className="mt-1.5 font-mono text-2xl font-bold text-green tabular-nums">
                ~{pct(estimatedNet)}
              </p>
              <p className="mt-0.5 text-[11px] text-muted">Illustrative, after fees</p>
            </div>
          </div>

          <label htmlFor="deposit" className="mt-7 block">
            <CardLabel>Deposit amount (USDC)</CardLabel>
          </label>
          <div className="mt-2 flex items-center rounded-lg border border-line-2 bg-navy px-4 focus-within:border-green-line">
            <span className="font-mono text-lg text-muted">$</span>
            <input
              id="deposit"
              inputMode="decimal"
              autoComplete="off"
              value={raw}
              onChange={(e) => setRaw(e.target.value.replace(/[^\d.,]/g, ""))}
              className="w-full bg-transparent px-2 py-3 font-mono text-xl font-bold text-bright tabular-nums outline-none"
              aria-describedby="deposit-help"
            />
            <span className="font-mono text-[12px] text-muted">USDC</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setRaw(String(p))}
                className={`rounded-md border px-2.5 py-1 font-mono text-[12px] transition-colors ${
                  amount === p
                    ? "border-green-line bg-green-bg text-green"
                    : "border-line bg-card-2 text-sub hover:border-line-2 hover:text-fg"
                }`}
              >
                {compact(p)}
              </button>
            ))}
          </div>
          <p id="deposit-help" className="mt-3 text-[12px] text-muted">
            Minted 1:1 into USDfr, then staked into sUSDfr at{" "}
            <span className="font-mono text-sub">{VAULT.exchangeRate}</span> USDfr/share.
            {parsed > MAX && ` Capped at ${usd(MAX, 0)} for this estimate.`}
          </p>

          {/* Position details */}
          <div className="mt-7">
            <CardLabel>Your sUSDfr position</CardLabel>
            <dl className="mt-2">
              <PosRow label="USDfr minted (1:1)" value={`${num(amount)} USDfr`} />
              <PosRow label="sUSDfr shares received" value={num(shares, 4)} />
              <PosRow label="Share of staked pool" value={pct(poolShare * 100, 4)} />
              <PosRow
                label="Pro-rata book income (est. net)"
                value={`${usd(proRataIncome)}/yr`}
                hint={`Share of USDfr supply (incl. your deposit) × ${num(BOOK.grossIncomeRunRate)} USDfr/yr run-rate × 0.9 × 0.9`}
              />
            </dl>
          </div>
        </div>

        {/* Right: earnings */}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {PERIODS.map((p) => (
              <div key={p.label} className="bg-card p-4 sm:p-5">
                <CardLabel>{p.label}</CardLabel>
                <p className="mt-2 font-mono text-xl font-bold text-green tabular-nums sm:text-2xl">
                  {usd(earn(net, p.days))}
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-muted tabular-nums">
                  {usd(earn(gross, p.days))} gross
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-line bg-card p-5">
            <div className="flex items-baseline justify-between">
              <CardLabel>Hold timeline (est. net)</CardLabel>
              <span className="font-mono text-[10px] text-muted">simple accrual</span>
            </div>
            <ul className="mt-3">
              {TIMELINE.map((t) => {
                const gain = earn(net, t.days);
                const inQueue = t.days < QUEUE.cooldownDays;
                return (
                  <li
                    key={t.label}
                    className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-3 border-t border-line py-2 first:border-t-0"
                  >
                    <span className="text-[13px] text-sub">{t.label}</span>
                    <span className="truncate font-mono text-[11px] text-muted">
                      {inQueue ? "below 21d exit queue" : ""}
                    </span>
                    <span className="text-right font-mono text-[13px] tabular-nums">
                      <span className="font-semibold text-fg">{usd(amount + gain)}</span>
                      <span className="ml-2 text-green">+{usd(gain)}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-muted">
              Exits go through a {QUEUE.cooldownDays}-day FIFO redemption queue, so holds shorter
              than that can&apos;t be fully realized on schedule.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-card p-5">
            <CardLabel>Fee breakdown (illustrative)</CardLabel>
            <ol className="mt-3">
              {fees.map((f) => (
                <li
                  key={f.label}
                  className="flex items-baseline justify-between gap-4 border-t border-line py-2 first:border-t-0"
                >
                  <span className="text-[13px] text-sub">{f.label}</span>
                  <span className="shrink-0 text-right font-mono text-[13px] tabular-nums">
                    {f.delta !== null && (
                      <span className="mr-2 text-red/80">
                        {f.delta === 0 ? "−0.000%" : `${num(f.delta, 4).replace("-", "−")}%`}
                      </span>
                    )}
                    <span className={f.strong ? "font-bold text-bright" : "text-fg"}>
                      {num(f.value, 4)}%
                    </span>
                  </span>
                </li>
              ))}
              <li className="flex items-baseline justify-between gap-4 border-t border-line-2 pt-3">
                <span className="text-[13px] font-semibold text-bright">Estimated net APY</span>
                <span className="font-mono text-[15px] font-bold text-green">
                  ~{pct(estimatedNet)}
                </span>
              </li>
            </ol>
            <p className="mt-3 text-[11px] leading-relaxed text-muted">
              Simplified: 16.74% × 0.90 × 0.90. The real performance fee is charged only on gains above
              a global high-water mark ({VAULT.highWaterMark} USDfr/share), by diluting shares — not as a
              flat cut.
            </p>
          </div>
        </div>
      </div>

      <div className="reveal mt-5 space-y-3">
        <YieldNote />
        <p className="text-[12px] leading-relaxed text-muted">
          Actual sUSDfr returns depend on cash actually collected from borrowers, fees, how much USDfr is
          staked, idle reserves that earn nothing, and whether any loan defaults. Figures use simple,
          non-compounding accrual. This is an educational estimate, not financial advice.
        </p>
      </div>
    </Section>
  );
}

function PosRow({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="border-t border-line py-2.5 first:border-t-0">
      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-[13px] text-muted">{label}</dt>
        <dd className="text-right font-mono text-[13px] font-semibold text-fg tabular-nums">
          {value}
        </dd>
      </div>
      {hint && <p className="mt-0.5 text-[11px] text-muted/80">{hint}</p>}
    </div>
  );
}
