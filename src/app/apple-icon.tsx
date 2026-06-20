import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1C1C1C",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "40px",
        }}
      >
        <span
          style={{
            color: "#B79962",
            fontSize: "120px",
            fontWeight: "700",
            fontFamily: "Georgia, serif",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginTop: "6px",
          }}
        >
          S
        </span>
      </div>
    ),
    { ...size }
  );
}
