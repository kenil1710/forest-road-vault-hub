import { Card, Chip, Section } from "./ui";

const SECTORS = [
  {
    icon: "🎬",
    name: "Media & Entertainment",
    type: "Receivable-backed",
    collateral: "Tax credits and contracted receivables for film & TV",
    duration: "Short — months to ~2 years",
    extra: ["Security", "UCC-1 lien perfected"],
    risk: "Repayment depends on contracted payments, not box-office performance.",
    defaultRate: "–",
    defaultNote: "No data yet",
    relatedParty: false,
  },
  {
    icon: "☀️",
    name: "Renewable Energy",
    type: "Receivable-backed",
    collateral: "ITC/PTC transferable tax credits and project cashflows",
    duration: "Medium to long — construction + operation",
    extra: ["Borrowers", "Small/mid-market, underserved by traditional banks"],
    risk: "Longer duration means capital is committed through construction and operation.",
    defaultRate: "0.00%",
    defaultNote: "Net default rate",
    relatedParty: false,
  },
  {
    icon: "◈",
    name: "Digital Assets",
    type: "Marked-to-market",
    collateral: "Liquid digital assets",
    duration: "Short & revolving",
    extra: ["Monitoring", "Continuous collateral health via m-of-n attested marks"],
    risk: "The borrower is Forest Road's own trading subsidiary — a related party, so a conflict of interest exists.",
    defaultRate: "0.00%",
    defaultNote: "Net default rate",
    relatedParty: true,
  },
];

export function Sectors() {
  return (
    <Section
      id="sectors"
      label="03 · Sectors"
      title="Where the money goes."
      intro="The book lends across three marketed sectors. Each has a different collateral type, duration and risk profile."
    >
      <div className="reveal grid gap-4 lg:grid-cols-3">
        {SECTORS.map((s) => (
          <Card
            key={s.name}
            className={`flex flex-col p-6 ${s.relatedParty ? "border-amber/30 hover:border-amber/50" : ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg border border-line-2 bg-card-2 text-lg">
                {s.icon}
              </span>
              <div className="flex flex-wrap justify-end gap-1.5">
                <Chip tone={s.type === "Marked-to-market" ? "purple" : "blue"}>{s.type}</Chip>
                {s.relatedParty && <Chip tone="amber">Related party</Chip>}
              </div>
            </div>
            <h3 className="mt-5 text-lg font-bold tracking-tight text-bright">{s.name}</h3>

            <dl className="mt-4 space-y-3 text-[13px]">
              <div>
                <dt className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                  Collateral
                </dt>
                <dd className="mt-0.5 text-sub">{s.collateral}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                  Duration
                </dt>
                <dd className="mt-0.5 text-sub">{s.duration}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                  {s.extra[0]}
                </dt>
                <dd className="mt-0.5 text-sub">{s.extra[1]}</dd>
              </div>
            </dl>

            <p
              className={`mt-4 rounded-lg border px-3 py-2 text-[12px] leading-relaxed ${
                s.relatedParty
                  ? "border-amber/20 bg-amber/[0.05] text-amber/90"
                  : "border-line bg-card-2 text-muted"
              }`}
            >
              {s.risk}
            </p>

            <div className="mt-auto flex items-baseline justify-between border-t border-line pt-4">
              <span className="text-[12px] text-muted">{s.defaultNote}</span>
              <span
                className={`font-mono text-xl font-bold ${s.defaultRate === "–" ? "text-muted" : "text-green"}`}
              >
                {s.defaultRate}
              </span>
            </div>
          </Card>
        ))}
      </div>
      <p className="reveal mt-4 text-[12px] text-muted">
        The on-chain CollateralRegistry also carries life-sciences and real-estate collateral classes
        that are not currently marketed as sectors.
      </p>
    </Section>
  );
}
