import { motion } from "framer-motion";

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

const Testimonials = () => {
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
              className="bg-card rounded-xl p-6 shadow-md border border-gold/10 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                {/* Initials avatar */}
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-display font-semibold text-primary">{t.initials}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-body font-semibold text-foreground leading-tight">{t.author}</p>
                  <p className="text-xs text-muted-foreground font-body">{t.location}</p>
                  <p className="text-[11px] text-muted-foreground/60 font-body">{t.context}</p>
                </div>
              </div>
              <p className="text-foreground font-body text-sm leading-relaxed">
                "{t.quote}"
              </p>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
