import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Helmet } from "react-helmet-async";

export type FAQItem = { q: string; a: string };

type Props = {
  title: string;
  subtitle?: string;
  items: FAQItem[];
  /** Emit FAQPage JSON-LD into <head>. Default true. */
  emitSchema?: boolean;
};

const FAQSection = ({ title, subtitle, items, emitSchema = true }: Props) => {
  const [open, setOpen] = useState<number | null>(0);
  if (!items?.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className="py-14 md:py-20 bg-background">
      {emitSchema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
      )}
      <div className="container px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display font-semibold text-foreground text-2xl md:text-3xl mb-2">{title}</h2>
            {subtitle && <p className="text-muted-foreground font-body text-sm md:text-base">{subtitle}</p>}
          </div>
          <div className="divide-y divide-border border-y border-border">
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-4 py-5 text-start group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-semibold text-foreground text-base md:text-lg group-hover:text-gold transition-colors">
                      {it.q}
                    </span>
                    <span className="shrink-0 mt-1 w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-gold group-hover:text-gold transition-colors">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-muted-foreground font-body leading-relaxed pb-5 pe-10">{it.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;