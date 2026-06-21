import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SeoCta } from "@/types/seo-content";
import LeadForm from "@/components/LeadForm";
import WaButton from "./WaButton";

interface Props {
  cta: SeoCta;
  lang: string;
}

const PILL =
  "inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-primary-foreground py-4 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-[17px]";

const PILL_SECONDARY =
  "inline-flex items-center gap-2 border border-gold text-gold hover:bg-gold/10 py-3.5 px-7 rounded-full font-body font-semibold transition-all duration-300 text-base";

// Server component — static variants (link) render fully server-side.
// Interactive variants (form, whatsapp) delegate to client islands.
// Supports an optional secondaryCta link rendered below the primary action.
export default function SeoCTA({ cta, lang }: Props) {
  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="container px-6 text-center">
        {cta.headline && (
          <h2 className="font-display font-semibold text-foreground mb-4">{cta.headline}</h2>
        )}
        {cta.subline && (
          <p className="text-muted-foreground font-body mb-8 max-w-xl mx-auto leading-relaxed">
            {cta.subline}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {cta.variant === "link" && cta.href && (
            <Link href={`/${lang}${cta.href}`} className={PILL}>
              {cta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          {cta.variant === "form" && cta.formSource && (
            <div className="max-w-lg w-full text-start">
              <LeadForm source={cta.formSource} />
            </div>
          )}

          {cta.variant === "whatsapp" && (
            <WaButton
              label={cta.label}
              waText={cta.waText}
              href={cta.waHref}
              className={PILL}
            />
          )}

          {cta.secondaryCta && (
            <Link href={`/${lang}${cta.secondaryCta.href}`} className={PILL_SECONDARY}>
              {cta.secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
