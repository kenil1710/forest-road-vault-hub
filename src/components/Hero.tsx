import Image from "next/image";
import { BOOK, CREDIT, LINKS, SNAPSHOT } from "@/lib/data";
import { pct } from "@/lib/format";
import { Chip, CommunityBadge, ExternalLink, Stat, StatGrid } from "./ui";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(196,165,90,0.10),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-16 sm:px-6 sm:pt-20 sm:pb-20">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="Forest Road Vault"
            width={112}
            height={97}
            priority
            className="logo-white h-auto w-20 sm:w-28"
          />
          <p className="mt-6 text-[11px] font-semibold tracking-[0.28em] text-gold uppercase sm:text-[12px]">
            Real-world credit. On-chain.
          </p>
          <span className="gold-rule mt-5" aria-hidden />

          <h1 className="mt-7 max-w-3xl text-4xl leading-[1.05] font-extrabold tracking-[-0.03em] text-bright sm:text-6xl">
            The dollar built on <span className="text-gold">working credit.</span>
          </h1>
          <p className="slash-frame mt-6 text-[17px] font-light tracking-[0.02em] text-sub italic sm:text-xl">
            Real-world credit. Brought on-chain.
          </p>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
            Forest Road Vault turns USDC into <span className="text-fg">USDfr</span>, a fully backed
            dollar, and lets you stake it as <span className="text-fg">sUSDfr</span> to earn
            variable yield from a book of receivable-backed and collateralized loans — film & TV,
            renewable energy and digital assets — with the backing, book and loss layers readable
            on-chain.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#calculator"
              className="rounded-lg bg-gold px-5 py-2.5 text-[13px] font-semibold tracking-[0.06em] text-navy uppercase transition-opacity hover:opacity-90"
            >
              Open the yield calculator
            </a>
            <a
              href="#risks"
              className="rounded-lg border border-line-2 bg-card px-5 py-2.5 text-[13px] font-semibold tracking-[0.06em] text-fg uppercase transition-colors hover:border-gold-line hover:text-gold"
            >
              Read the risks first
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <CommunityBadge />
            <Chip tone="blue">Ethereum Mainnet</Chip>
            <Chip>Block {SNAPSHOT.block.toLocaleString("en-US")}</Chip>
          </div>
        </div>

        <StatGrid className="mt-12 grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Book yield (contractual)"
            value={pct(BOOK.performingYield)}
            sub="Performing weighted — not an APY"
            tone="green"
          />
          <Stat label="Deployed" value="$3.0M" sub="In performing facilities" />
          <Stat
            label="Net default rate"
            value={pct(CREDIT.netDefaultRate)}
            sub="$0 written off to date"
          />
          <Stat label="Facilities" value={BOOK.facilities} sub="Originated on the book" />
        </StatGrid>
        <p className="mt-3 text-[12px] text-muted">
          Snapshot from the{" "}
          <ExternalLink href={LINKS.transparency} className="text-sub underline decoration-line-2 underline-offset-2 hover:text-gold">
            official transparency page
          </ExternalLink>{" "}
          · {SNAPSHOT.date} · block {SNAPSHOT.block.toLocaleString("en-US")}. Book yield is what
          borrowers owe, not what depositors earn. Yield is variable and not guaranteed.
        </p>
      </div>
    </section>
  );
}
