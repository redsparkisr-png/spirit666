import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://spiritisraelhomes.com"),
  title: {
    template: "%s | Spirit Real Estate",
    default: "Homes for Sale in Zichron Yaakov | Spirit Real Estate",
  },
  description:
    "Boutique real estate firm in Zichron Yaakov, Israel. Personal guidance for foreign buyers and Israelis returning home.",
  openGraph: {
    siteName: "Spirit Real Estate",
    images: [
      {
        url: "https://storage.googleapis.com/gpt-engineer-file-uploads/qfse0exkggcvgRDkiW4vWCCxpGL2/social-images/social-1771836211324-ChatGPT_Image_Feb_23,_2026,_10_41_20_AM.webp",
        width: 1200,
        height: 630,
        alt: "Spirit Real Estate — Zichron Yaakov",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const lang = (headersList.get("x-lang") as "en" | "he") || "en";
  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&family=Heebo:wght@400;500;600;700&family=Frank+Ruhl+Libre:wght@500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
