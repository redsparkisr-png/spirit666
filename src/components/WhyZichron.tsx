import { motion } from "framer-motion";
import { Shield, MapPin, Users, TrendingUp } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Stability & Demand",
    points: [
      "Established community with deep roots",
      "Limited land supply drives value",
      "Strong resale liquidity",
    ],
  },
  {
    icon: MapPin,
    title: "Location Advantage",
    points: [
      "45 minutes to Tel Aviv",
      "30 minutes to Haifa",
      "Coastal elevation views",
      "Train access nearby",
    ],
  },
  {
    icon: Users,
    title: "Community & Lifestyle",
    points: [
      "Anglo-friendly environment",
      "Strong schools and services",
      "Vineyards and sea views",
      "Safe and walkable",
    ],
  },
  {
    icon: TrendingUp,
    title: "Long-Term Value",
    points: [
      "Consistent appreciation history",
      "Not speculative development",
      "Generational asset positioning",
    ],
  },
];

const WhyZichron = () => {
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
            Why International Buyers Choose Zichron
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            An Established Coastal Community — Not a Trend
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto text-base md:text-lg">
            Zichron Yaakov offers a rare combination of Mediterranean lifestyle, strategic location, and lasting value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border/40 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <pillar.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-base mb-3">
                {pillar.title}
              </h3>
              <ul className="space-y-2">
                {pillar.points.map((point) => (
                  <li key={point} className="text-muted-foreground font-body text-sm flex items-start gap-2">
                    <span className="text-gold mt-1 shrink-0">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyZichron;
