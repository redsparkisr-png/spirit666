import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Buying from the US felt overwhelming at first. Spirit Real Estate made the entire process clear, calm, and well managed from start to finish.",
    author: "David & Sarah M.",
    initials: "DS",
    location: "New York",
    context: "Buyer · 2024 · Zichron Yaakov",
  },
  {
    quote: "We felt someone was truly representing us locally. Communication was transparent, and we always knew what was happening.",
    author: "Michael R.",
    initials: "MR",
    location: "Toronto",
    context: "Buyer · Recently · Zichron Yaakov",
  },
  {
    quote: "The local presence made all the difference. Even from abroad, we felt confident making the right decision.",
    author: "Jonathan & Lisa B.",
    initials: "JL",
    location: "London",
    context: "Investor · 2024 · Zichron Yaakov",
  },
];

/* ── Compact featured testimonial for under-hero placement ── */
export const FeaturedTestimonial = () => {
  const featured = testimonials[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-10 md:py-14 bg-primary/[0.04]"
    >
      <div className="container px-6 max-w-2xl mx-auto text-center">
        <Quote className="w-6 h-6 mx-auto mb-3 text-gold/60" />
        <p className="font-body text-foreground text-sm md:text-base leading-relaxed italic mb-4">
          "{featured.quote}"
        </p>
        <div className="flex items-center justify-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-display font-semibold text-primary">{featured.initials}</span>
          </div>
          <div className="text-left">
            <p className="text-xs font-body font-semibold text-foreground leading-tight">{featured.author}</p>
            <p className="text-[11px] text-muted-foreground font-body">{featured.location} · {featured.context}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-background">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-3">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground font-body text-sm max-w-md mx-auto">
            Recent buyers from New York, Toronto and London trusted us with their move.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.blockquote
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.12 }}
              className="bg-card rounded-xl p-8 shadow-sm border border-border/40 hover:shadow-xl hover:border-gold/20 transition-all duration-500 relative group"
            >
              <Quote className="w-8 h-8 text-gold/10 absolute top-4 right-4 group-hover:text-gold/20 transition-colors" />
              <div className="flex items-center gap-4 mb-6">
                {/* Portrait avatar placeholder */}
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border/50 overflow-hidden">
                  <span className="text-base font-display font-semibold text-muted-foreground/70">{t.initials}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-body font-bold text-foreground leading-tight">{t.author}</p>
                  <p className="text-xs text-muted-foreground font-body font-medium">{t.location}</p>
                  <p className="text-[11px] text-muted-foreground/60 font-body italic mt-0.5">{t.context}</p>
                </div>
              </div>
              <p className="text-foreground font-body text-[15px] leading-relaxed italic">
                "{t.quote}"
              </p>
            </motion.blockquote>
          ))}
        </div>

        {/* Soft CTA below testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12 space-y-3"
        >
          <p className="text-sm text-muted-foreground/70 font-body italic">
            Private opportunities are rarely advertised publicly.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-gold hover:bg-gold-hover text-primary-foreground px-6 py-3 rounded-lg font-body font-medium text-sm transition-all duration-300 hover:shadow-md"
          >
            Request Private Access
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
