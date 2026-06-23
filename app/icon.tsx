import { ImageResponse } from "next/og";

// Simple letter-based favicon ("TF") — used ONLY as the favicon, not as the
// site logo. The site itself uses the typographic Traffic Floor wordmark.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f97316",
          color: "#ffffff",
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: -1,
          fontFamily: "sans-serif",
        }}
      >
        TF
      </div>
    ),
    { ...size }
  );
}
