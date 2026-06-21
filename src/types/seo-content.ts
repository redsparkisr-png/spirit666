export interface SeoSection {
  h2: string;
  body?: string;                 // supports \n\n for multiple paragraphs
  bullets?: string[];
  bodyAfterBullets?: string;     // text rendered after the bullet list
  subsections?: Array<{ h3: string; body: string }>;
  sectionLink?: { label: string; href: string }; // inline CTA link at end of section
}

export interface SeoFaqItem {
  q: string;
  a: string;
}

export type SeoCtaVariant = "link" | "form" | "whatsapp";

export interface SeoCta {
  variant: SeoCtaVariant;
  headline?: string;
  subline?: string;
  label: string;
  href?: string;            // "link" variant — relative path e.g. "/contact"
  formSource?: string;      // "form" variant — leads.source value
  waText?: string;          // "whatsapp" variant — pre-filled message text
  waHref?: string;          // "whatsapp" variant — full URL override (overrides waText + hardcoded number)
  secondaryCta?: { label: string; href: string }; // optional secondary link below primary CTA
}

export interface SeoInternalLink {
  label: string;
  href: string; // relative path e.g. "/buying-property-zichron-yaakov"
}

// Resolved single-language content — what SeoLandingPage receives after getSeoPageContent()
export interface ResolvedSeoPageContent {
  slug: string;
  lang: "en" | "he";
  seoTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow?: string;
  heroIntro: string;             // supports \n\n for multiple paragraphs
  sections: SeoSection[];
  faq?: SeoFaqItem[];
  faqTitle?: string;
  inlineProperties?: boolean;
  inlinePropertiesAfterSection?: number; // 0-based index; properties render after this section
  disclaimer?: string;
  showBlueprintBlock?: boolean;
  showRelatedGuides?: boolean;
  schemaType: "Article" | "Service";
  datePublished?: string;
  dateModified?: string;
  cta: SeoCta;
  internalLinks: SeoInternalLink[];
}

type MonolingualContent = Omit<ResolvedSeoPageContent, "slug" | "lang">;

// Bilingual content object — what src/content/seo/*.ts exports
export interface BilingualSeoPageContent {
  slug: string;
  en: MonolingualContent;
  he: MonolingualContent;
}
