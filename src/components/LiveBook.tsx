import {
  BACKSTOP,
  BOOK,
  CREDIT,
  CURATOR,
  FEES,
  LINKS,
  QUEUE,
  RESERVES,
  REVENUE,
  SNAPSHOT,
  etherscan,
  SUPPLY,
  USDFR_ADDRESS,
  VAULT,
} from "@/lib/data";
import { num, pct, usd } from "@/lib/format";
import { Card, CardLabel, Chip, ExternalLink, Row, Section, Stat, StatGrid, YieldNote } from "./ui";

function Addr({ children, full }: { children: string; full?: string }) {
  if (!full) return <span className="font-mono text-[11px] text-muted">{children}</span>;
  return (
    <ExternalLink
      href={etherscan(full)}
      className="font-mono text-[11px] text-muted underline decoration-line-2 underline-offset-2 transition-colors hover:text-gold"
    >
      {children} ↗
    </ExternalLink>
  );
}

function Panel({
  title,
  address,
  fullAddress,
  children,
}: {
  title: string;
  address?: string;
  fullAddress?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h3 className="text-[14px] font-bold tracking-[0.01em] text-bright">{title}</h3>
        {address && <Addr full={fullAddress}>{address}</Addr>}
      </div>
      <dl>{children}</dl>
    </Card>
  );
}

export function LiveBook() {
  const idleShare =
    (RESERVES.idleReserve / (RESERVES.idleReserve + RESERVES.deployedPrincipal)) * 100;
  const revenueParts = [
    { label: "Origination fees", value: REVENUE.origination, color: "bg-green" },
    { label: "Performance fees", value: REVENUE.performance, color: "bg-purple" },
    { label: "Interest fees", value: REVENUE.interest, color: "bg-blue" },
    { label: "Management fees", value: REVENUE.management, color: "bg-amber" },
  ];

  return (
    <Section
      id="live-book"
      label="04 · Live book"
      title="Transparency, snapshotted."
      intro={
        <>
          Every figure below is read from the official transparency page at block{" "}
          <span className="font-mono text-sub">{SNAPSHOT.block.toLocaleString("en-US")}</span> (
          {SNAPSHOT.date}). For the latest values, check{" "}
          <ExternalLink
            href={LINKS.transparency}
            className="text-green underline decoration-green-line underline-offset-2"
          >
            forestroadvault.com/transparency ↗
          </ExternalLink>
          .
        </>
      }
    >
      {/* Backing */}
      <StatGrid className="reveal grid-cols-1 sm:grid-cols-3">
        <Stat
          label="USDfr supply"
          value={`~${num(SUPPLY.usdfrSupply, 0)}`}
          sub={
            <>
              Published as {SUPPLY.published}; ≤ backing ·{" "}
              <Addr full={USDFR_ADDRESS}>{`${USDFR_ADDRESS.slice(0, 6)}…${USDFR_ADDRESS.slice(-4)}`}</Addr>
            </>
          }
        />
        <Stat
          label="Backing value"
          value={usd(SUPPLY.backingValue)}
          sub={`Idle + deployed (derived); published as $${SUPPLY.published}`}
          tone="green"
        />
        <Stat
          label="Backing invariant"
          value="supply ≤ backing"
          sub="Enforced in-contract on every mint"
        />
      </StatGrid>

      <div className="reveal mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Reserves" address={RESERVES.address} fullAddress={RESERVES.fullAddress}>
          <Row label="Idle stablecoin reserve" value={usd(RESERVES.idleReserve)} />
          <Row label="Deployed principal" value={usd(RESERVES.deployedPrincipal)} />
          <div className="pt-3">
            <div className="flex h-2 overflow-hidden rounded-full bg-card-2">
              <div className="bg-blue" style={{ width: `${idleShare}%` }} />
              <div className="flex-1 bg-green/70" />
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[10px] text-muted">
              <span>idle {pct(idleShare)}</span>
              <span>deployed {pct(100 - idleShare)}</span>
            </div>
          </div>
        </Panel>

        <Panel title="The Book" address={BOOK.address} fullAddress={BOOK.fullAddress}>
          <Row label="Facilities originated" value={BOOK.facilities} />
          <Row label="Book exposure" value={usd(BOOK.exposure)} />
          <Row label="Performing weighted yield" value={pct(BOOK.performingYield)} tone="green" />
          <Row label="All-outstanding contractual yield" value={pct(BOOK.allOutstandingYield)} />
          <Row label="Performing principal" value={usd(BOOK.performingPrincipal)} />
          <Row
            label="Gross performing income run-rate"
            value={`${num(BOOK.grossIncomeRunRate)} USDfr/yr`}
          />
          <Row label="Non-performing principal" value={usd(BOOK.nonPerformingPrincipal, 0)} />
        </Panel>

        <Panel title="sUSDfr Vault" address={VAULT.address} fullAddress={VAULT.fullAddress}>
          <Row label="Staked assets" value={`${num(VAULT.stakedAssets)} USDfr`} />
          <Row label="Shares outstanding" value={num(VAULT.sharesOutstanding)} />
          <Row label="Fee-net exchange rate" value={VAULT.exchangeRate} tone="green" />
          <Row label="Performance-fee NAV rate" value={VAULT.perfFeeNavRate} />
          <Row label="Global high-water mark" value={VAULT.highWaterMark} />
          <Row label="Last fee checkpoint" value={VAULT.lastFeeCheckpoint.replace(".000Z", "Z")} />
        </Panel>
      </div>
      <YieldNote className="reveal mt-4" />

      {/* Loss cascade */}
      <div className="reveal mt-12">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-xl font-extrabold tracking-[-0.01em] text-bright">Loss cascade</h3>
          <p className="text-[12px] text-muted">
            Fixed order, written into the contract. Non-invertible. Never pausable.
          </p>
        </div>
        <ol className="grid gap-3">
          <CascadeLayer
            n={1}
            name="Curator first-loss capital"
            amount={usd(CURATOR.firstLoss, 0)}
            note={`${pct(CURATOR.pctOfLoans)} of outstanding loans. Posted per collateral class; absorbs losses first.`}
            fill={CURATOR.pctOfLoans}
            tone="green"
          />
          <CascadeLayer
            n={2}
            name="sGROVE backstop"
            amount={usd(BACKSTOP.liveCallable, 0)}
            note="USDfr coverage reserve (separate from staked GROVE). Each loss may call min(loss, live reserve). Currently unfunded."
            fill={0}
            tone="amber"
            badge="Unfunded"
          />
          <CascadeLayer
            n={3}
            name="sUSDfr depositor principal"
            amount={`${num(VAULT.stakedAssets)} USDfr`}
            note="Touched only after both layers above are exhausted."
            tone="red"
          />
        </ol>
      </div>

      <div className="reveal mt-12 grid gap-4 lg:grid-cols-3">
        <Panel title="Historical credit performance" address={CREDIT.address}>
          <Row label="Overall net default rate" value={pct(CREDIT.netDefaultRate)} tone="green" />
          <Row label="Net principal written off" value={usd(CREDIT.netWrittenOff, 0)} />
          <Row label="Cumulative funded principal" value={usd(CREDIT.cumulativeFunded, 0)} />
          {CREDIT.bySector.map((s) => (
            <Row
              key={s.name}
              label={s.name}
              value={s.rate === null ? "–" : pct(s.rate)}
              tone={s.rate === null ? undefined : "green"}
            />
          ))}
        </Panel>

        <Panel title="Redemption queue" address={QUEUE.address}>
          <Row label="Current epoch" value={QUEUE.epoch} />
          <Row label="Settlement status" value={QUEUE.status} tone="amber" />
          <Row label="Queued shares" value={`${QUEUE.queuedShares} sUSDfr`} />
          <Row label="Settlement liquidity" value={usd(QUEUE.settlementLiquidity)} />
          <Row label="Cooldown" value={`${QUEUE.cooldownDays} days`} />
        </Panel>

        <Panel title="sGROVE backstop" address={BACKSTOP.address}>
          <Row label="Live callable reserve" value={usd(BACKSTOP.liveCallable, 0)} tone="amber" />
          <Row label="Funded coverage reserve" value={usd(BACKSTOP.fundedCoverage, 0)} tone="amber" />
          <p className="mt-3 text-[12px] leading-relaxed text-muted">
            With the backstop at $0, curator first-loss capital is the only layer between a default
            and depositor principal today.
          </p>
        </Panel>
      </div>

      <div className="reveal mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <h3 className="text-[14px] font-bold tracking-[0.01em] text-bright">Protocol revenue</h3>
            <Addr>{REVENUE.address}</Addr>
          </div>
          <CardLabel>Revenue since deployment</CardLabel>
          <p className="mt-1 font-mono text-2xl font-bold text-bright tabular-nums">
            {num(REVENUE.total, 4)}{" "}
            <span className="text-[13px] font-medium text-muted">USDfr-equiv.</span>
          </p>
          <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-card-2">
            {revenueParts.map((p) =>
              p.value > 0 ? (
                <div
                  key={p.label}
                  className={p.color}
                  style={{ width: `${(p.value / REVENUE.total) * 100}%`, minWidth: 3 }}
                />
              ) : null,
            )}
          </div>
          <dl className="mt-3">
            {revenueParts.map((p) => (
              <Row
                key={p.label}
                label={
                  <span className="inline-flex items-center gap-2">
                    <span className={`size-2 rounded-sm ${p.color}`} aria-hidden />
                    {p.label}
                  </span>
                }
                value={`${num(p.value, 4)}`}
              />
            ))}
          </dl>
        </Card>

        <Card className="p-5">
          <h3 className="mb-3 text-[14px] font-bold tracking-[0.01em] text-bright">Fee schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase">
                  <th className="pb-2 font-medium">Fee</th>
                  <th className="pb-2 font-medium">Rate</th>
                  <th className="pb-2 font-medium">Cap</th>
                  <th className="pb-2 font-medium">Basis</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map((f) => (
                  <tr key={f.name} className="border-t border-line align-top">
                    <td className="py-2.5 pr-3 text-fg">{f.name}</td>
                    <td className="py-2.5 pr-3 font-mono font-semibold text-bright">
                      {pct(f.rate)}
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-sub">
                      {f.cap === null ? "—" : pct(f.cap, 0)}
                    </td>
                    <td className="py-2.5 text-[12px] text-muted">{f.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <p className="reveal mt-6 flex flex-wrap items-center gap-2 text-[12px] text-muted">
        <Chip>{SNAPSHOT.network}</Chip>
        As of block {SNAPSHOT.block.toLocaleString("en-US")} · {SNAPSHOT.date}. Contract addresses
        link to Etherscan where the full address is published.
      </p>
    </Section>
  );
}

const toneStyles = {
  green: { bar: "bg-green", text: "text-green", ring: "border-green-line bg-green-bg" },
  amber: { bar: "bg-amber", text: "text-amber", ring: "border-amber/25 bg-amber/[0.07]" },
  red: { bar: "bg-red/70", text: "text-red", ring: "border-red/25 bg-red/[0.07]" },
};

function CascadeLayer({
  n,
  name,
  amount,
  note,
  fill,
  tone,
  badge,
}: {
  n: number;
  name: string;
  amount: string;
  note: string;
  fill?: number;
  tone: keyof typeof toneStyles;
  badge?: string;
}) {
  const t = toneStyles[tone];
  return (
    <li className="grid gap-3 rounded-xl border border-line bg-card p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-5 sm:p-5">
      <span
        className={`flex size-9 items-center justify-center rounded-lg border font-mono text-sm font-bold ${t.ring} ${t.text}`}
      >
        {n}
      </span>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[15px] font-bold text-bright">{name}</p>
          {badge && <Chip tone="amber">{badge}</Chip>}
        </div>
        <p className="mt-1 text-[12px] leading-relaxed text-muted">{note}</p>
        {fill !== undefined && (
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-card-2">
            <div className={`h-full ${t.bar}`} style={{ width: `${Math.min(fill, 100)}%` }} />
          </div>
        )}
      </div>
      <p className={`font-mono text-lg font-bold tabular-nums sm:text-right ${t.text}`}>{amount}</p>
    </li>
  );
}
