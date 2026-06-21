import type { BilingualSeoPageContent } from "@/types/seo-content";

// Content preserved from existing HomesForSale view (hardcoded copy).
// Sections are intentionally empty — will be populated with externally supplied content.
export const homesForSaleContent: BilingualSeoPageContent = {
  slug: "homes-for-sale-zichron-yaakov",
  en: {
    seoTitle: "Homes for Sale in Zichron Yaakov — Spirit Real Estate",
    metaDescription:
      "Browse homes for sale in Zichron Yaakov. Explore neighborhoods, property types, and available listings in one of Israel's most beautiful towns.",
    h1: "Homes for Sale in Zichron Yaakov",
    heroIntro:
      "Discover available properties in Zichron Yaakov — homes, apartments, and townhouses in the finest neighborhoods.",
    sections: [],
    inlineProperties: true,
    schemaType: "Article",
    datePublished: "2026-01-01",
    dateModified: "2026-06-21",
    cta: {
      variant: "link",
      href: "/contact",
      headline: "Want Personal Guidance?",
      subline: "Schedule a consultation and let us help you find the right property.",
      label: "Schedule a Consultation",
    },
    internalLinks: [
      { label: "Buying Guide", href: "/buying-property-zichron-yaakov" },
      { label: "Living in Zichron Yaakov", href: "/living-in-zichron-yaakov" },
      { label: "All Properties", href: "/properties" },
    ],
  },
  he: {
    seoTitle: 'בתים למכירה בזכרון יעקב — ספיריט נדל"ן',
    metaDescription:
      "גלו בתים למכירה בזכרון יעקב. שכונות, סוגי נכסים ומגוון הצעות באחת הערים היפות בישראל.",
    h1: "בתים למכירה בזכרון יעקב",
    heroIntro: "גלו את הנכסים הזמינים בזכרון יעקב — בתים, דירות וקוטג'ים בשכונות המובילות.",
    sections: [],
    inlineProperties: true,
    schemaType: "Article",
    datePublished: "2026-01-01",
    dateModified: "2026-06-21",
    cta: {
      variant: "link",
      href: "/contact",
      headline: "רוצים ליווי אישי?",
      subline: "קבעו שיחת ייעוץ ונעזור לכם למצוא את הנכס המתאים.",
      label: "קבעו ייעוץ",
    },
    internalLinks: [
      { label: "מדריך רכישה", href: "/buying-property-zichron-yaakov" },
      { label: "חיים בזכרון יעקב", href: "/living-in-zichron-yaakov" },
      { label: "כל הנכסים", href: "/properties" },
    ],
  },
};
