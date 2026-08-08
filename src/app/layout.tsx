import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { Playfair_Display, DM_Sans, Heebo, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import GoogleAnalyticsConsent from "@/components/GoogleAnalyticsConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const SC_VERIFY = process.env.NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION;

// Self-hosted via next/font (was a blocking fonts.googleapis.com <link>).
// Only `.variable` is used — this registers each font's @font-face under its
// real family name (e.g. "Playfair Display") without setting a font-family
// on <html>, so tailwind.config.ts's existing literal-name fontFamily stacks
// (display/body, incl. the Hebrew fallback chain) keep working unchanged.
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair-display",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});
const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heebo",
  display: "swap",
});
const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ["latin", "hebrew"],
  weight: ["500", "600", "700"],
  variable: "--font-frank-ruhl-libre",
  display: "swap",
});
const fontVariables = `${playfairDisplay.variable} ${dmSans.variable} ${heebo.variable} ${frankRuhlLibre.variable}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://spiritisraelhomes.com"),
  title: {
    template: "%s | Spirit Real Estate",
    default: "Homes for Sale in Zichron Yaakov | Spirit Real Estate",
  },
  description:
    "Boutique real estate firm in Zichron Yaakov, Israel. Personal guidance for foreign buyers and Israelis returning home.",
  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  },
  openGraph: {
    siteName: "Spirit Real Estate",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Spirit Real Estate — Zichron Yaakov",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  ...(SC_VERIFY ? { verification: { google: SC_VERIFY } } : {}),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const lang = (headersList.get("x-lang") as "en" | "he") || "en";
  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning className={fontVariables}>
      <head>
        <link rel="preconnect" href="https://vtcpmbjzzbggxhsjpnhu.supabase.co" crossOrigin="" />
        {/* Google Analytics — Consent Mode v2 (fires only after cookie accept) */}
        {GA_ID && (
          <Script id="ga-consent-init" strategy="afterInteractive">
            {`
              window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
              gtag('js',new Date());
            `}
          </Script>
        )}
        {GA_ID && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
        )}
      </head>
      <body>
        {children}
        {GA_ID && <GoogleAnalyticsConsent />}
      </body>
    </html>
  );
}
