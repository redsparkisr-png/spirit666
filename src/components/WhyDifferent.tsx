import { motion } from "framer-motion";
import { User, Globe, Eye, Phone, Heart } from "lucide-react";

const points = [
  { icon: User, text: "You work with a real local expert, not a call center" },
  { icon: Globe, text: "You know what's happening, even from abroad" },
  { icon: Eye, text: "You get access to opportunities others never see online" },
  { icon: Phone, text: "You have one clear point of contact" },
  { icon: Heart, text: "You feel confident, not pressured" },
];

const WhyDifferent = () => {
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
            Why Buyers Feel Comfortable Working With Us
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-5">
          {points.map((point, index) => (
            <motion.div
              key={point.text}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-sand-light transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <point.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-foreground font-body text-base leading-relaxed pt-2">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDifferent;
