import type { SeoFaqItem } from "@/types/seo-content";

interface Props {
  title?: string;
  items: SeoFaqItem[];
}

// Server component — uses native <details>/<summary> for zero-JS accordion.
// FAQ content renders in initial HTML for crawlers and schema validation.
export default function SeoFAQ({ title, items }: Props) {
  if (items.length === 0) return null;

  return (
    <section className="py-14 md:py-20 bg-card">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto">
          {title && (
            <h2 className="font-display font-semibold text-foreground text-center mb-10">
              {title}
            </h2>
          )}
          <div className="space-y-4">
            {items.map((item, i) => (
              <details
                key={i}
                className="bg-background rounded-2xl border border-border px-6 py-5 group"
              >
                <summary className="font-display font-semibold text-foreground text-sm md:text-base cursor-pointer list-none flex items-center justify-between gap-4">
                  {item.q}
                  <span
                    className="text-gold shrink-0 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </summary>
                <p className="mt-3 text-muted-foreground font-body text-sm leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
