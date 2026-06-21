"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/attribution";

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

// ── Existing events ───────────────────────────────────────────────────────

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  safeGtag("event", eventName, params ?? {});
}

export function trackWhatsAppClick(source: string, params?: Record<string, unknown>) {
  safeGtag("event", "whatsapp_click", {
    event_category: "lead",
    event_label: source,
    value: 1,
    ...params,
  });
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

// ── New structured events ─────────────────────────────────────────────────

export function trackPropertyView(params: {
  property_slug: string;
  property_title: string;
  lang: string;
  page_path: string;
}) {
  safeGtag("event", "property_view", params);
}

export function trackLeadFormStart(
  form_name: string,
  params?: { property_slug?: string; lang?: string; cta_location?: string }
) {
  safeGtag("event", "lead_form_start", { form_name, ...params });
}

export function trackLeadFormSubmit(
  form_name: string,
  params?: { property_slug?: string; lang?: string; source?: string }
) {
  safeGtag("event", "lead_form_submit", { form_name, ...params });
}

export function trackLeadFormSuccess(
  form_name: string,
  params?: { property_slug?: string; lang?: string; source?: string }
) {
  safeGtag("event", "lead_form_success", { form_name, ...params, value: 1 });
}

export function trackLeadFormError(
  form_name: string,
  error_message: string,
  params?: { property_slug?: string; lang?: string }
) {
  safeGtag("event", "lead_form_error", { form_name, error_message, ...params });
}

export function trackStickyCtaClick(cta_location: string, cta_type: string) {
  safeGtag("event", "sticky_cta_click", { cta_location, cta_type });
}

export function trackGalleryOpen(params: { property_slug: string; property_title: string }) {
  safeGtag("event", "gallery_open", params);
}

export function trackContactClick(source: string) {
  safeGtag("event", "contact_click", { source });
}

export function trackGuideCta(source: string) {
  safeGtag("event", "guide_cta_click", { source });
}

// ── Component ─────────────────────────────────────────────────────────────

export default function GoogleAnalyticsConsent() {
  const pathname = usePathname();

  // Capture UTM / referrer on every navigation; preserves first-touch in localStorage
  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  // SPA pageview: fire on every route change (consent-gated)
  useEffect(() => {
    if (!GA_ID || typeof window === "undefined" || !window.gtag) return;
    try {
      const stored = localStorage.getItem("cookieConsentV1");
      if (!stored) return;
      const prefs = JSON.parse(stored) as { analytics?: boolean };
      if (prefs.analytics) {
        window.gtag("event", "page_view", {
          page_path: pathname,
          page_title: document.title,
        });
      }
    } catch {}
  }, [pathname]);

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") return;

    // Returning visitor — restore consent and fire initial pageview
    try {
      const stored = localStorage.getItem("cookieConsentV1");
      if (stored) {
        const prefs = JSON.parse(stored) as { analytics?: boolean };
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

    // Global WhatsApp click tracker — catches all <a href="wa.me/..."> links sitewide
    const clickHandler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href") || "";
      if (href.includes("wa.me")) {
        const source =
          target.closest("[data-track-source]")?.getAttribute("data-track-source") ||
          document.title ||
          window.location.pathname;
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
