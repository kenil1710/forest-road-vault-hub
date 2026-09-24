import { BOOK, CREDIT, INVARIANTS, RESIDUALS, REVIEWS, ROLES, TESTS } from "@/lib/data";
import { pct } from "@/lib/format";
import { Card, CardLabel, Chip, Section } from "./ui";

export function Safety() {
  return (
    <Section
      id="safety"
      label="05 · Safety & security"
      title="What's proven — and what isn't yet."
      intro="Forest Road publishes its test coverage, invariants, role graph and review history. Here it is in one place, including the parts still outstanding."
    >
      <div className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
        {TESTS.map((t) => (
          <div key={t.label} className="bg-card p-4 sm:p-5">
            <p className="font-mono text-xl font-bold text-bright tabular-nums sm:text-2xl">
              {t.value}
            </p>
            <p className="mt-1 text-[13px] font-medium text-sub">{t.label}</p>
            <p className="mt-0.5 text-[11px] text-muted">{t.detail}</p>
          </div>
        ))}
      </div>

      {/* Invariants */}
      <div className="reveal mt-12">
        <h3 className="mb-4 text-xl font-extrabold tracking-[-0.01em] text-bright">
          Nine core invariants
        </h3>
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-card-2">
              <tr className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase">
                <th className="w-10 px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Invariant</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Rule</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Verified by</th>
              </tr>
            </thead>
            <tbody className="bg-card">
              {INVARIANTS.map((inv, i) => (
                <tr key={inv.name} className="border-t border-line align-top">
                  <td className="px-4 py-3 font-mono text-gold">{i + 1}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-bright">{inv.name}</p>
                    <p className="mt-1 text-[12px] text-muted sm:hidden">{inv.rule}</p>
                    <p className="mt-1 font-mono text-[11px] text-sub md:hidden">{inv.proof}</p>
                  </td>
                  <td className="hidden px-4 py-3 text-muted sm:table-cell">{inv.rule}</td>
                  <td className="hidden px-4 py-3 font-mono text-[12px] text-sub md:table-cell">
                    {inv.proof}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="reveal mt-12 grid gap-4 lg:grid-cols-2">
        {/* Governance */}
        <Card className="p-5 sm:p-6" hover={false}>
          <h3 className="text-[15px] font-bold tracking-[0.01em] text-bright">Governance & roles</h3>
          <p className="mt-1 text-[13px] text-muted">
            Bootstrap administration has been surrendered to a timelock. The role-admin graph is flat —
            no role can grant itself — and it&apos;s validated live by{" "}
            <span className="font-mono text-[12px] text-sub">ValidateMainnetProductionV2.s.sol</span>{" "}
            (positive and negative holdings).
          </p>
          <ul className="mt-4">
            {ROLES.map((r) => (
              <li key={r.role} className="border-t border-line py-3 first:border-t-0">
                <p className="font-mono text-[12px] font-semibold break-words text-green">{r.role}</p>
                <p className="mt-1 text-[13px] text-fg">{r.holder}</p>
                <p className="text-[12px] text-muted">{r.note}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Reviews */}
        <Card className="p-5 sm:p-6" hover={false}>
          <h3 className="text-[15px] font-bold tracking-[0.01em] text-bright">Review history</h3>
          <ol className="relative mt-4 ml-1.5 border-l border-line-2">
            {REVIEWS.map((r, i) => (
              <li key={i} className="relative pb-5 pl-5 last:pb-0">
                <span className="absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2 border-navy bg-gold" />
                <p className="font-mono text-[11px] text-gold">{r.date}, 2026</p>
                <p className="mt-0.5 text-[13px] font-semibold text-fg">{r.title}</p>
                <p className="text-[12px] text-muted">{r.detail}</p>
              </li>
            ))}
          </ol>
          <div className="mt-5 rounded-lg border border-green-line bg-green-bg p-3 text-[12px] text-sub">
            <span className="font-semibold text-green">Result:</span> no Critical, High or Medium
            contract defect confirmed in the deployed Ethereum review.
          </div>
          <div className="mt-2 rounded-lg border border-amber/20 bg-amber/[0.05] p-3 text-[12px] text-sub">
            <span className="font-semibold text-amber">Context:</span> Corrovera is not a top-tier
            firm, and there is no Trail of Bits, OpenZeppelin or CertiK audit yet.
          </div>
        </Card>
      </div>

      {/* Residuals */}
      <Card className="reveal mt-4 p-5 sm:p-6" hover={false}>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[15px] font-bold tracking-[0.01em] text-bright">Accepted residuals</h3>
          <Chip tone="amber">Not yet done</Chip>
        </div>
        <p className="mt-1 text-[13px] text-muted">
          V2 is live and open for controlled, KYC-gated deposits, with {BOOK.facilities} facilities
          originated on mainnet, $3M+ deployed and a {pct(CREDIT.netDefaultRate)} default rate. The
          funded canary covered minting, transfer, sUSDfr deposit, direct redemption and queue entry,
          and supply equalled backing afterwards. These items are still outstanding:
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {RESIDUALS.map((r) => (
            <li
              key={r}
              className="flex gap-2.5 rounded-lg border border-line bg-card-2 px-3 py-2.5 text-[13px] text-sub"
            >
              <span className="mt-0.5 text-amber" aria-hidden>
                ○
              </span>
              {r}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <CardLabel>Note</CardLabel>
          <p className="mt-1 text-[12px] text-muted">
            The configured $100M figure is a concentration floor, not a deposit cap.
          </p>
        </div>
      </Card>
    </Section>
  );
}
