"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function safeGtag(...args: Parameters<Window["gtag"]>) {
  if (typeof window !== "undefined" && window.gtag) window.gtag(...args);
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  safeGtag("event", eventName, params ?? {});
}

export function trackWhatsAppClick(source: string) {
  safeGtag("event", "whatsapp_click", {
    event_category: "lead",
    event_label: source,
    value: 1,
  });
  safeGtag("event", "conversion", { send_to: GA_ID, event_category: "lead" });
}

export function trackLeadForm(source: string) {
  safeGtag("event", "generate_lead", {
    event_category: "lead",
    event_label: source,
    value: 1,
  });
}

export function trackGuideRequest() {
  safeGtag("event", "guide_request", {
    event_category: "lead",
    event_label: "buyer_blueprint",
    value: 1,
  });
}

export default function GoogleAnalyticsConsent() {
  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") return;

    // Returning visitor — restore consent
    try {
      const stored = localStorage.getItem("cookieConsentV1");
      if (stored) {
        const prefs = JSON.parse(stored);
        if (prefs.analytics && window.gtag) {
          window.gtag("consent", "update", { analytics_storage: "granted" });
          window.gtag("config", GA_ID, { send_page_view: true });
        }
      }
    } catch {}

    // Live consent decisions from CookieNotice
    const consentHandler = (e: Event) => {
      const prefs = (e as CustomEvent<{ analytics: boolean }>).detail;
      if (!window.gtag) return;
      if (prefs.analytics) {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
          ad_user_data: "denied",
          ad_personalization: "denied",
        });
        window.gtag("config", GA_ID, { send_page_view: true });
      } else {
        window.gtag("consent", "update", { analytics_storage: "denied" });
      }
    };

    // Global WhatsApp click tracker — catches ALL wa.me links sitewide
    const clickHandler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href") || "";
      if (href.includes("wa.me")) {
        const source = target.closest("[data-track-source]")?.getAttribute("data-track-source")
          || document.title
          || window.location.pathname;
        trackWhatsAppClick(source);
      }
    };

    window.addEventListener("cookie-consent", consentHandler);
    document.addEventListener("click", clickHandler, true);

    return () => {
      window.removeEventListener("cookie-consent", consentHandler);
      document.removeEventListener("click", clickHandler, true);
    };
  }, []);

  return null;
}
