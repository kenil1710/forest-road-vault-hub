import { LINKS, SNAPSHOT } from "@/lib/data";
import { CommunityBadge, ExternalLink } from "./ui";

const FOOTER_LINKS = [
  { label: "Official site", href: LINKS.site },
  { label: "Transparency", href: LINKS.transparency },
  { label: "Docs", href: LINKS.docs },
  { label: "Risk factors", href: LINKS.risk },
  { label: "Discord", href: LINKS.discord },
  { label: "X", href: LINKS.x },
  { label: "GitHub", href: LINKS.github },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#09101c]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden>
                🌲
              </span>
              <span className="text-[15px] font-bold text-bright">Forest Road Vault</span>
              <CommunityBadge />
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-muted">
              <strong className="font-semibold text-sub">
                Community Tool — Not affiliated with Forest Road Asset Management.
              </strong>{" "}
              This is an independent, community-built educational resource. Nothing here is financial,
              investment, legal or tax advice. Yield is variable and never guaranteed; the 16.74% figure
              is contractual book yield, not a depositor return. Depositing can result in loss of
              principal. Always verify figures on the official site and do your own research.
            </p>
          </div>
          <nav aria-label="External links" className="grid grid-cols-2 gap-x-10 gap-y-2 text-[13px] sm:grid-cols-3 lg:grid-cols-2">
            {FOOTER_LINKS.map((l) => (
              <ExternalLink key={l.href} href={l.href} className="text-sub transition-colors hover:text-green">
                {l.label} ↗
              </ExternalLink>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] text-muted sm:flex-row sm:justify-between">
          <span>
            Data as of block {SNAPSHOT.block.toLocaleString("en-US")} · {SNAPSHOT.date} ·{" "}
            {SNAPSHOT.network}
          </span>
          <span>Built by the community, for the community.</span>
        </div>
      </div>
    </footer>
  );
}
