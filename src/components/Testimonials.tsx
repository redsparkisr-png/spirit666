import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Buying from the US felt overwhelming at first.\nSpirit Real Estate made the entire process clear, calm, and well managed from start to finish.",
    author: "David & Sarah M., New York",
  },
  {
    quote: "We felt someone was truly representing us locally.\nCommunication was transparent, and we always knew what was happening.",
    author: "Michael R., Toronto",
  },
  {
    quote: "The local presence made all the difference.\nEven from abroad, we felt confident making the right decision.",
    author: "Jonathan & Lisa B., London",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.blockquote
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.12 }}
              className="bg-card rounded-xl p-6 shadow-sm border border-border"
            >
              <p className="text-foreground font-body text-sm leading-relaxed whitespace-pre-line mb-4">
                "{t.quote}"
              </p>
              <footer className="text-xs text-muted-foreground font-body">
                — {t.author}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
