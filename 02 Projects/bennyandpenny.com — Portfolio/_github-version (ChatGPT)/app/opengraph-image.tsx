import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Benny & Penny's — A Tech Company | Hamilton Pinto Jr.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(125deg, #fffaf2 0%, #e8f7ef 55%, #f8dfe2 100%)",
          color: "#183437",
          padding: "74px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: "760px", zIndex: 1 }}>
          <div style={{ display: "flex", color: "#175b59", fontSize: 24, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
            Software Architect · Creative Technologist · Publisher
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 72, lineHeight: 1.02, fontWeight: 700, letterSpacing: -3 }}>
            Hamilton Pinto Jr.
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 31, lineHeight: 1.25, color: "#496363" }}>
            Benny &amp; Penny&apos;s — a technology &amp; creative studio. Vision, translated into real-world solutions.
          </div>
        </div>
        <div style={{ position: "absolute", right: 108, bottom: 105, display: "flex", alignItems: "flex-end", gap: 25 }}>
          <div style={{ display: "flex", height: 245, width: 180, alignItems: "center", justifyContent: "center", border: "8px solid rgba(255,255,255,.88)", borderRadius: "94px 94px 38px 38px", background: "#df8ca0", color: "white", fontSize: 75, fontWeight: 700, transform: "rotate(-6deg)" }}>P</div>
          <div style={{ display: "flex", height: 190, width: 190, alignItems: "center", justifyContent: "center", border: "8px solid rgba(255,255,255,.88)", borderRadius: 95, background: "#9b6244", color: "white", fontSize: 75, fontWeight: 700, transform: "rotate(6deg)" }}>B</div>
        </div>
      </div>
    ),
    size,
  );
}
