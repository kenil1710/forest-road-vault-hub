import { ImageResponse } from "next/og";
import { TREE_PATH, TREE_VIEWBOX } from "@/lib/logo";

export const alt =
  "Forest Road Vault — Community Hub. sUSDfr yield calculator and protocol resource. Not affiliated with Forest Road Asset Management.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "#c4a55a";
const NAVY = "#0b1220";

const stats = [
  ["16.74%", "Book yield (contractual)"],
  ["$3.0M", "Deployed"],
  ["0.00%", "Net default rate"],
  ["7", "Facilities"],
];

function Slash({ style }: { style: React.CSSProperties }) {
  return (
    <div style={{ position: "absolute", fontSize: 64, fontWeight: 300, color: GOLD, ...style }}>/</div>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "56px 72px 48px",
          background: `radial-gradient(ellipse at top, #1a2638 0%, ${NAVY} 65%)`,
          color: "#f2f5fa",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "1px solid rgba(196,165,90,0.18)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <svg width="118" height="102" viewBox={TREE_VIEWBOX}>
            <path d={TREE_PATH} fill={GOLD} />
          </svg>
          <div style={{ marginTop: 22, fontSize: 18, letterSpacing: 6, color: GOLD }}>
            REAL-WORLD CREDIT. ON-CHAIN.
          </div>
          <div style={{ marginTop: 16, width: 40, height: 2, background: GOLD, display: "flex" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", padding: "0 44px" }}>
          <Slash style={{ top: -30, left: 0 }} />
          <Slash style={{ bottom: -34, right: 0 }} />
          <div style={{ display: "flex", fontSize: 58, letterSpacing: -1, lineHeight: 1.05 }}>
            <span>Forest Road Vault —&nbsp;</span>
            <span style={{ color: GOLD }}>Community Hub</span>
          </div>
          <div style={{ marginTop: 16, fontSize: 28, color: "#a8b9cf", letterSpacing: 1 }}>
            sUSDfr Yield Calculator & Protocol Resource
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              borderTop: "1px solid rgba(196,165,90,0.18)",
            }}
          >
            {stats.map(([v, l], i) => (
              <div
                key={l}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "18px 12px 0",
                  borderLeft: i === 0 ? "none" : "1px solid rgba(196,165,90,0.18)",
                }}
              >
                <div style={{ fontSize: 34, color: i === 0 ? "#34d399" : "#f2f5fa" }}>
                  {v}
                </div>
                <div style={{ fontSize: 14, color: "#6e829c", marginTop: 4, letterSpacing: 1.5, whiteSpace: "nowrap" }}>
                  {l.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 15, color: "#6e829c", letterSpacing: 1 }}>
            Community tool · Not affiliated with Forest Road Asset Management · Yield is variable,
            not guaranteed
          </div>
        </div>
      </div>
    ),
    size,
  );
}
