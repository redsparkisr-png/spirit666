/**
 * SEO JSON-LD helpers — pure data builders, no React.
 * Also exports getSeoPageContent / buildMetadata / buildSeoPageJsonLd
 * for the server-first SeoLandingPage framework.
 */

import type { Metadata } from "next";
import type { BilingualSeoPageContent, ResolvedSeoPageContent } from "@/types/seo-content";
import { homesForSaleContent } from "@/content/seo/homes-for-sale";

const SITE = "https://spiritisraelhomes.com";

// ─── Landing page registry ───────────────────────────────────────────────────
// Add new BilingualSeoPageContent entries here as pages are built.
const REGISTRY: Record<string, BilingualSeoPageContent> = {
  [homesForSaleContent.slug]: homesForSaleContent,
};

// Resolves bilingual content to a single language. Returns null for unknown slugs.
export function getSeoPageContent(
  slug: string,
  lang: "en" | "he"
): ResolvedSeoPageContent | null {
  const bilingual = REGISTRY[slug];
  if (!bilingual) return null;
  return { slug, lang, ...bilingual[lang] };
}

// Builds the Next.js Metadata object from resolved page content.
export function buildMetadata(content: ResolvedSeoPageContent): Metadata {
  const { slug, lang, seoTitle, metaDescription } = content;
  const url = `${SITE}/${lang}/${slug}`;
  return {
    title: seoTitle,
    description: metaDescription,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE}/en/${slug}`,
        he: `${SITE}/he/${slug}`,
        "x-default": `${SITE}/en/${slug}`,
      },
    },
    openGraph: {
      title: seoTitle,
      description: metaDescription,
      url,
      locale: lang === "he" ? "he_IL" : "en_US",
      images: [{ url: "/og-image.webp", width: 1200, height: 630 }],
    },
  };
}

// Builds the JSON-LD @graph for a resolved page.
// Always includes WebPage + BreadcrumbList.
// Adds Article or Service depending on schemaType.
// Adds FAQPage only when faq items are present on the page.
export function buildSeoPageJsonLd(content: ResolvedSeoPageContent): object {
  const { slug, lang, seoTitle, metaDescription, schemaType, datePublished, dateModified, faq } =
    content;
  const url = `${SITE}/${lang}/${slug}`;

  const graph: object[] = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: seoTitle,
      description: metaDescription,
      inLanguage: lang,
      isPartOf: { "@id": `${SITE}/#website` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: lang === "he" ? "דף הבית" : "Home",
          item: `${SITE}/${lang}/`,
        },
        { "@type": "ListItem", position: 2, name: seoTitle, item: url },
      ],
    },
  ];

  if (schemaType === "Article") {
    graph.push({
      "@type": "Article",
      "@id": `${url}#article`,
      headline: seoTitle,
      description: metaDescription,
      url,
      inLanguage: lang,
      datePublished: datePublished ?? "2026-01-01",
      dateModified: dateModified ?? new Date().toISOString().slice(0, 10),
      author: { "@type": "Organization", name: "Spirit Real Estate", url: SITE },
      publisher: {
        "@type": "Organization",
        name: "Spirit Real Estate",
        url: SITE,
        logo: { "@type": "ImageObject", url: `${SITE}/og-image.webp` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
      about: {
        "@type": "Place",
        name: "Zichron Yaakov",
        containedInPlace: { "@type": "Country", name: "Israel" },
      },
    });
  } else if (schemaType === "Service") {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: seoTitle,
      description: metaDescription,
      url,
      provider: { "@type": "RealEstateAgent", name: "Spirit Real Estate", url: SITE },
      areaServed: { "@type": "City", name: "Zichron Yaakov" },
    });
  }

  if (faq && faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

// ─── Legacy helpers (preserved) ─────────────────────────────────────────────

export interface Crumb {
  name: string;
  path: string; // e.g. "/en/properties"
}

/**
 * Build a BreadcrumbList JSON-LD object ready to pass to <PageMeta jsonLd>.
 */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE}${c.path}`,
    })),
  };
}