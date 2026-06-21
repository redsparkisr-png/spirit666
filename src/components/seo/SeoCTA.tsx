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

// Server component — static variants (link) render fully server-side.
// Interactive variants (form, whatsapp) delegate to client islands.
export default function SeoCTA({ cta, lang }: Props) {
  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="container px-6 text-center">
        {cta.headline && (
          <h2 className="font-display font-semibold text-foreground mb-4">{cta.headline}</h2>
        )}
        {cta.subline && (
          <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">{cta.subline}</p>
        )}

        {cta.variant === "link" && cta.href && (
          <Link href={`/${lang}${cta.href}`} className={PILL}>
            {cta.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}

        {cta.variant === "form" && cta.formSource && (
          <div className="max-w-lg mx-auto text-start">
            <LeadForm source={cta.formSource} />
          </div>
        )}

        {cta.variant === "whatsapp" && (
          <WaButton label={cta.label} waText={cta.waText} className={PILL} />
        )}
      </div>
    </section>
  );
}
