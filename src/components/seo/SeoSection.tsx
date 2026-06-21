import Link from "next/link";
import type { SeoSection as SeoSectionData } from "@/types/seo-content";

interface Props {
  section: SeoSectionData;
  alt?: boolean;   // alternates background: false = bg-background, true = bg-card
  lang?: string;   // required only when section has a sectionLink
}

// Server component — renders H2, multi-paragraph body, bullets, bodyAfterBullets,
// subsections, and an optional inline section link. All in initial HTML.
export default function SeoSection({ section, alt = false, lang }: Props) {
  const bg = alt ? "bg-card" : "bg-background";
  const bodyParas = section.body ? section.body.split(/\n\n+/).filter(Boolean) : [];

  return (
    <section className={`py-12 md:py-20 ${bg}`}>
      <div className="container px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-semibold text-foreground text-xl md:text-2xl mb-4">
            {section.h2}
          </h2>

          {bodyParas.map((para, i) => (
            <p key={i} className="text-muted-foreground font-body leading-relaxed mb-4">
              {para}
            </p>
          ))}

          {section.bullets && section.bullets.length > 0 && (
            <ul className="space-y-2 list-none p-0 mb-4">
              {section.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm font-body text-muted-foreground leading-relaxed"
                >
                  <span className="text-gold mt-0.5 shrink-0" aria-hidden="true">
                    ✓
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          )}

          {section.bodyAfterBullets && (
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              {section.bodyAfterBullets}
            </p>
          )}

          {section.subsections &&
            section.subsections.map((sub, i) => (
              <div key={i} className="mt-6">
                <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                  {sub.h3}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">{sub.body}</p>
              </div>
            ))}

          {section.sectionLink && lang && (
            <p className="mt-6">
              <Link
                href={`/${lang}${section.sectionLink.href}`}
                className="text-gold underline underline-offset-4 hover:text-gold-hover transition-colors font-body text-sm"
              >
                {section.sectionLink.label}
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
