import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "7px",
        }}
      >
        <span
          style={{
            color: "#B79962",
            fontSize: "20px",
            fontWeight: "700",
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.5px",
            lineHeight: 1,
            marginTop: "1px",
          }}
        >
          S
        </span>
      </div>
    ),
    { ...size }
  );
}
