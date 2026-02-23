import { motion } from "framer-motion";
import { Building2, MapPinned, Globe, Handshake, HeartHandshake } from "lucide-react";

const trustPoints = [
  { icon: Building2, text: "Local boutique office in Zichron Yaakov" },
  { icon: MapPinned, text: "Deep neighborhood expertise" },
  { icon: Globe, text: "Experience with international buyers" },
  { icon: Handshake, text: "Transparent representation" },
  { icon: HeartHandshake, text: "No aggressive sales — ever" },
];

const TrustBlock = () => {
  return (
    <section className="py-14 md:py-20 bg-primary/[0.04] border-y border-primary/5">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-10">
            Why Buyers Trust Spirit
          </h2>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-5">
            {trustPoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.07 }}
                className="flex items-center gap-2.5"
              >
                <point.icon className="w-4 h-4 text-gold shrink-0" />
                <span className="text-foreground/80 font-body text-sm">{point.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBlock;
