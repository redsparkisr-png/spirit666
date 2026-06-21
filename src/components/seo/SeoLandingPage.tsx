import { Fragment } from "react";
import Header from "@/components/Header";
import TrustSection from "@/components/TrustSection";
import BuyerBlueprintBlock from "@/components/BuyerBlueprintBlock";
import RelatedGuides from "@/components/RelatedGuides";
import SeoHero from "./SeoHero";
import SeoSection from "./SeoSection";
import SeoFAQ from "./SeoFAQ";
import SeoCTA from "./SeoCTA";
import InternalLinksBlock from "./InternalLinksBlock";
import InlinePropertiesServerBlock from "./InlinePropertiesServerBlock";
import type { ResolvedSeoPageContent } from "@/types/seo-content";

interface Props {
  content: ResolvedSeoPageContent;
}

// Server component shell — assembles all SEO page sections server-side.
// Client components (Header, TrustSection, BuyerBlueprintBlock, RelatedGuides,
// LeadForm, WaButton) are client islands hydrated after initial HTML is delivered.
export default function SeoLandingPage({ content }: Props) {
  const { lang } = content;
  const inlineAfter = content.inlinePropertiesAfterSection;

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <SeoHero
        h1={content.h1}
        eyebrow={content.eyebrow}
        intro={content.heroIntro}
        breadcrumbLabel={content.h1}
        lang={lang}
      />

      {content.sections.map((section, i) => (
        <Fragment key={i}>
          <SeoSection section={section} alt={i % 2 === 1} lang={lang} />
          {content.inlineProperties && inlineAfter === i && (
            <InlinePropertiesServerBlock lang={lang} />
          )}
        </Fragment>
      ))}

      {/* Fallback: render after all sections when no per-section index is set */}
      {content.inlineProperties && inlineAfter == null && (
        <InlinePropertiesServerBlock lang={lang} />
      )}

      {content.faq && content.faq.length > 0 && (
        <SeoFAQ title={content.faqTitle} items={content.faq} />
      )}

      <SeoCTA cta={content.cta} lang={lang} />

      {content.disclaimer && (
        <section className="py-8 bg-background">
          <div className="container px-6">
            <p className="text-xs text-muted-foreground/70 font-body leading-relaxed max-w-3xl mx-auto">
              {content.disclaimer}
            </p>
          </div>
        </section>
      )}

      {content.showBlueprintBlock && <BuyerBlueprintBlock />}
      {content.showRelatedGuides && <RelatedGuides limit={3} />}

      <InternalLinksBlock links={content.internalLinks} lang={lang} />

      <TrustSection />
    </main>
  );
}
