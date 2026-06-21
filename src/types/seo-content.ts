export interface SeoSection {
  h2: string;
  body?: string;
  bullets?: string[];
  subsections?: Array<{ h3: string; body: string }>;
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
  href?: string;        // for "link" variant — relative path e.g. "/contact"
  formSource?: string;  // for "form" variant — leads.source value
  waText?: string;      // for "whatsapp" variant — pre-filled message text
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
  heroIntro: string;
  sections: SeoSection[];
  faq?: SeoFaqItem[];
  faqTitle?: string;
  inlineProperties?: boolean;
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
