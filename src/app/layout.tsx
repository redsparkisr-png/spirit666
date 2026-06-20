import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import GoogleAnalyticsConsent from "@/components/GoogleAnalyticsConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const SC_VERIFY = process.env.NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION;

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
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://vtcpmbjzzbggxhsjpnhu.supabase.co" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&family=Heebo:wght@400;500;600;700&family=Frank+Ruhl+Libre:wght@500;600;700&display=swap"
        />
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
