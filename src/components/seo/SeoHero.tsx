import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Props {
  h1: string;
  eyebrow?: string;
  intro: string;
  breadcrumbLabel: string;
  lang: string;
}

// Server component — no hooks, no framer-motion. Content renders in initial HTML.
// intro supports \n\n paragraph breaks.
export default function SeoHero({ h1, eyebrow, intro, breadcrumbLabel, lang }: Props) {
  const isHe = lang === "he";
  const paragraphs = intro.split(/\n\n+/).filter(Boolean);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-6">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-1.5 text-sm font-body text-muted-foreground flex-wrap">
            <li>
              <Link href={`/${lang}/`} className="hover:text-foreground transition-colors">
                {isHe ? "דף הבית" : "Home"}
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight
                className="w-3.5 h-3.5 text-muted-foreground/50 rtl:rotate-180"
                aria-hidden="true"
              />
              <span className="text-foreground font-medium">{breadcrumbLabel}</span>
            </li>
          </ol>
        </nav>

        <div className="max-w-2xl mx-auto text-center mt-6">
          {eyebrow && (
            <span className="inline-block text-xs font-body uppercase tracking-[0.2em] text-gold mb-4">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display font-semibold text-foreground mb-4">{h1}</h1>
          {paragraphs.map((para, i) => (
            <p key={i} className="text-muted-foreground font-body text-lg max-w-xl mx-auto mb-3 last:mb-0">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
