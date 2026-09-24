import type { ReactNode } from "react";
import { Section } from "./ui";

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "What is USDfr?",
    a: "USDfr is a dollar token minted 1:1 from canonical USDC. Minting is KYC-gated, and every mint checks the backing invariant so total supply can never exceed backing value. On its own, USDfr earns nothing — it can be redeemed directly for USDC against idle reserves.",
  },
  {
    q: "How does sUSDfr generate yield?",
    a: "Staking USDfr gives you sUSDfr, an ERC-4626 vault share. The vault's USDfr funds loans across film & TV, renewable energy and digital assets. Interest (cash and PIK) accrues continuously into the exchange rate, net of protocol fees. The book's 16.74% is the contractual rate borrowers owe — your actual return is variable and will differ.",
  },
  {
    q: "Can I withdraw instantly?",
    a: "No. sUSDfr redemptions go through an epoch-based FIFO queue with a 21-day cooldown, and settlement is paced by loan repayments. withdraw() and redeem() are not directly callable by holders. Separately, USDfr (unstaked) can be redeemed for USDC against idle reserves.",
  },
  {
    q: "What happens if a loan defaults?",
    a: "Losses follow a fixed three-layer cascade written into the contract: curator first-loss capital ($500,001) absorbs first, then the sGROVE backstop (currently $0), and only then sUSDfr depositor principal. The order can't be skipped or inverted, the cascade can never be paused, and it's covered by a 9-path Halmos proof.",
  },
  {
    q: "Who controls the protocol?",
    a: "Admin and upgrade roles sit with a governance timelock — no EOA holds them on mainnet. An Operations Safe holds the Guardian role and can pause user paths, but never the loss cascade. Credit actions are restricted to internal modules, and off-chain facts require m-of-n attester signatures.",
  },
  {
    q: "How are fees charged?",
    a: "A 2% origination fee is paid by borrowers. A 10% interest fee is taken from gross interest via the waterfall. A 10% performance fee (capped at 20%) applies only to gains above a global high-water mark and is taken by minting fee shares (dilution), not by deducting from your balance. The management fee is currently 0% (capped at 2%).",
  },
  {
    q: "Is it audited?",
    a: "It has been reviewed by Corrovera (several passes in Sept 2026) and by internal teams, with no Critical, High or Medium defect confirmed in the deployed Ethereum review. Corrovera is not a top-tier firm, and there's no Trail of Bits, OpenZeppelin or CertiK audit yet. Test coverage is extensive: 3,108 release checks, 208 heavy invariant tests, 8 Halmos properties, and 99.40% line / 94.95% branch coverage.",
  },
  {
    q: "Why is sUSDfr.decimals() = 24?",
    a: "The vault uses a six-decimal virtual-share offset on top of USDfr's 18 decimals — a standard defense against ERC-4626 inflation/donation attacks. Integrators should read decimals() rather than assume 18, and note that convertToShares()/convertToAssets() can revert in a degraded state.",
  },
];

export function FAQ() {
  return (
    <Section id="faq" label="07 · FAQ" title="Common questions.">
      <div className="reveal divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
        {FAQS.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold text-fg transition-colors hover:text-bright [&::-webkit-details-marker]:hidden">
              {f.q}
              <span
                className="shrink-0 font-mono text-lg text-muted transition-transform group-open:rotate-45 group-open:text-green"
                aria-hidden
              >
                +
              </span>
            </summary>
            <div className="px-5 pb-5 text-[14px] leading-relaxed text-muted">{f.a}</div>
          </details>
        ))}
      </div>
    </Section>
  );
}
