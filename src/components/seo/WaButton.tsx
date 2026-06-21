"use client";

import { trackWhatsAppClick } from "@/components/GoogleAnalyticsConsent";

interface Props {
  label: string;
  waText?: string;
  className?: string;
}

// Client island — handles WhatsApp link + GA4 click tracking.
// Rendered inside SeoCTA (server component) only when cta.variant === "whatsapp".
export default function WaButton({ label, waText, className }: Props) {
  const encoded = waText ? `?text=${encodeURIComponent(waText)}` : "";
  const href = `https://wa.me/972522820632${encoded}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("seo_landing_cta")}
      className={className}
    >
      {label}
    </a>
  );
}
