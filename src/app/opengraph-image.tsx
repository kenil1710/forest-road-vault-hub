import { ImageResponse } from "next/og";

export const alt =
  "Forest Road Vault Community Hub — yield calculator, live book and risk guide. Not affiliated with Forest Road Asset Management.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stats = [
  ["16.74%", "Book yield (contractual)"],
  ["$2.1M", "Deployed"],
  ["0.00%", "Net default rate"],
  ["5", "Facilities"],
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(ellipse at top, #10243a 0%, #0b1220 60%)",
          color: "#f2f5fa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="48" height="48" viewBox="0 0 64 64">
            <path d="M32 9 L46 29 H39 L50 43 H36 V53 H28 V43 H14 L25 29 H18 Z" fill="#34d399" />
          </svg>
          <div style={{ fontSize: 30, fontWeight: 700 }}>Forest Road Vault</div>
          <div
            style={{
              marginLeft: 8,
              padding: "6px 16px",
              borderRadius: 999,
              border: "1px solid rgba(52,211,153,0.35)",
              background: "rgba(52,211,153,0.10)",
              color: "#34d399",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            COMMUNITY TOOL
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05 }}>
            The dollar built on
          </div>
          <div
            style={{ fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, color: "#34d399" }}
          >
            working credit.
          </div>
          <div style={{ marginTop: 20, fontSize: 26, color: "#a8b9cf" }}>
            Yield calculator · Live book · Loss cascade · Risks
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              border: "1px solid #1c2b44",
              borderRadius: 16,
              background: "#111b2e",
            }}
          >
            {stats.map(([v, l], i) => (
              <div
                key={l}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  padding: "22px 26px",
                  borderLeft: i === 0 ? "none" : "1px solid #1c2b44",
                }}
              >
                <div style={{ fontSize: 40, fontWeight: 700, color: i === 0 ? "#34d399" : "#f2f5fa" }}>
                  {v}
                </div>
                <div style={{ fontSize: 18, color: "#6e829c", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 18, color: "#6e829c" }}>
            Not affiliated with Forest Road Asset Management · Yield is variable, not guaranteed ·
            Block 26,040,984
          </div>
        </div>
      </div>
    ),
    size,
  );
}
