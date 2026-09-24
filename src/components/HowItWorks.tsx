import { QUEUE, RESERVES, VAULT } from "@/lib/data";
import { usd } from "@/lib/format";
import { Card, CardLabel, Chip, Section } from "./ui";

const STEPS = [
  {
    n: "01",
    title: "Connect",
    tag: "KYC-gated mint",
    body: "Connect a wallet and complete KYC. Only minting is KYC-gated on-chain — holding, viewing, transferring and staking are open to anyone.",
  },
  {
    n: "02",
    title: "Mint",
    tag: "USDC → USDfr 1:1",
    body: "Deposit canonical USDC and mint USDfr one-for-one. Every mint checks the backing invariant: supply can never exceed backing. USDfr alone earns nothing.",
  },
  {
    n: "03",
    title: "Stake",
    tag: "USDfr → sUSDfr",
    body: `Stake USDfr into the ERC-4626 vault and receive sUSDfr at the current exchange rate (${VAULT.exchangeRate} USDfr/share). Entry is synchronous.`,
  },
  {
    n: "04",
    title: "Earn",
    tag: "Continuous accrual",
    body: "Yield accrues continuously from cash and PIK interest, net of fees. NAV moves with time even before cash arrives; PIK capitalizes into principal only at scheduled boundaries.",
  },
  {
    n: "05",
    title: "Redeem",
    tag: `${QUEUE.cooldownDays}-day FIFO queue`,
    body: `Exit sUSDfr through an epoch-based FIFO queue with a ${QUEUE.cooldownDays}-day cooldown; settlement is paced by loan repayments. Exit is not instant.`,
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      label="02 · How it works"
      title="Two tokens, five steps."
      intro="USDfr is the backed dollar. sUSDfr is the yield-bearing vault share. Everything else is plumbing that keeps the two honest."
    >
      <div className="reveal grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xl font-bold text-bright">USDfr</p>
            <Chip tone="blue">Backed dollar</Chip>
          </div>
          <ul className="mt-4 space-y-2 text-[13px] leading-relaxed text-muted">
            <li>Minted 1:1 from canonical USDC; minting is KYC-gated.</li>
            <li>Every mint checks the backing invariant (supply ≤ backing).</li>
            <li>Earns nothing on its own.</li>
            <li>
              Direct USDfr → USDC redemption is available against idle reserves (currently{" "}
              <span className="font-mono text-sub">{usd(RESERVES.idleReserve)}</span>).
            </li>
          </ul>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xl font-bold text-bright">sUSDfr</p>
            <Chip tone="green">Yield-bearing</Chip>
          </div>
          <ul className="mt-4 space-y-2 text-[13px] leading-relaxed text-muted">
            <li>ERC-4626 vault share — deposit USDfr, receive sUSDfr at the exchange rate.</li>
            <li>Continuous accrual of cash + PIK interest, net of fees.</li>
            <li>Exit is asynchronous through a queue, not a standard synchronous withdrawal.</li>
            <li>
              <span className="font-mono text-sub">decimals() = 24</span> (six-decimal virtual-share
              offset).
            </li>
          </ul>
        </Card>
      </div>

      <ol className="reveal mt-4 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((s, i) => (
          <li key={s.n} className="relative bg-card p-5">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full border border-green-line bg-green-bg font-mono text-[11px] font-bold text-green">
                {s.n}
              </span>
              <span className="text-[15px] font-bold text-bright">{s.title}</span>
              {i < STEPS.length - 1 && (
                <span className="ml-auto hidden text-line-2 lg:block" aria-hidden>
                  →
                </span>
              )}
            </div>
            <p className="mt-3 font-mono text-[11px] text-green">{s.tag}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="reveal mt-4 grid gap-4 md:grid-cols-3">
        {[
          {
            k: "Continuous accrual",
            v: "NAV includes interest earned but not yet received. The exchange rate can rise before cash arrives — and a borrower who doesn't pay means that accrual may not be realized.",
          },
          {
            k: "PIK interest",
            v: "Payment-in-kind interest accrues continuously but only capitalizes into loan principal at the scheduled boundary.",
          },
          {
            k: "Epoch queue",
            v: "Redemptions settle FIFO per epoch, paced by repayments. The queue never distributes more than is available and can't be double-claimed.",
          },
        ].map((x) => (
          <Card key={x.k} className="p-5">
            <CardLabel>{x.k}</CardLabel>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">{x.v}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
