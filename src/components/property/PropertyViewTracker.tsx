"use client";

import { useEffect } from "react";
import { trackPropertyView } from "@/components/GoogleAnalyticsConsent";

type Props = { slug: string; title: string; lang: string };

export default function PropertyViewTracker({ slug, title, lang }: Props) {
  useEffect(() => {
    trackPropertyView({
      property_slug: slug,
      property_title: title,
      lang,
      page_path: window.location.pathname,
    });
  }, [slug, title, lang]);

  return null;
}
