import { motion } from "framer-motion";
import { Video, FileText, Scale, Stamp, Landmark, ListChecks } from "lucide-react";

const steps = [
  { icon: Video, title: "Remote Video Tours", desc: "Walk through properties from anywhere in the world with our guided live video tours." },
  { icon: FileText, title: "English Document Explanation", desc: "Every contract, agreement, and disclosure explained clearly in plain English." },
  { icon: Scale, title: "Legal Coordination", desc: "We coordinate with trusted Israeli real estate attorneys on your behalf." },
  { icon: Stamp, title: "Power of Attorney Process", desc: "Guidance through the POA process so you can complete transactions remotely." },
  { icon: Landmark, title: "Banking & Tax Guidance", desc: "Coordination with Israeli banks and tax advisors for smooth fund transfers." },
  { icon: ListChecks, title: "Step-by-Step Process", desc: "A transparent timeline from first inquiry to key handover — no surprises." },
];

const BuyingFromAbroad = () => {
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
          <p className="text-primary font-body text-sm tracking-wide uppercase mb-3">
            For International Buyers
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Buying Property in Israel — Made Simple
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto text-base md:text-lg">
            We've helped families from the US, UK, Canada, and beyond navigate every step of purchasing in Israel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-card rounded-xl p-6 border border-border/40 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                <step.icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-base mb-2">{step.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyingFromAbroad;
