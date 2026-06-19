import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#2f7d79",
          borderRadius: 32,
          color: "white",
          display: "flex",
          fontFamily: "sans-serif",
          fontSize: 18,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          letterSpacing: -1,
          width: "100%",
        }}
      >
        B+P
      </div>
    ),
    size,
  );
}
