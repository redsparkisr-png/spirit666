"use client";

import { trackWhatsAppClick } from "@/components/GoogleAnalyticsConsent";

interface Props {
  label: string;
  waText?: string;
  href?: string;      // full URL override — if provided, ignores waText and default number
  className?: string;
}

// Client island — handles WhatsApp link + GA4 click tracking.
// Rendered inside SeoCTA (server component) only when cta.variant === "whatsapp".
export default function WaButton({ label, waText, href, className }: Props) {
  const finalHref =
    href ??
    `https://wa.me/972522820632${waText ? `?text=${encodeURIComponent(waText)}` : ""}`;

  return (
    <a
      href={finalHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("seo_landing_cta")}
      className={className}
    >
      {label}
    </a>
  );
}
