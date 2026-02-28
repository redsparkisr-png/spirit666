import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Shield, Users, Handshake, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const MicroTrustLine = () => {
  const { t } = useSiteContent();
  const { lang } = useLanguage();

  const items = [
    { icon: Shield, labelEn: "Licensed Professionals", labelHe: "מתווכים מורשים" },
    { icon: Users, labelEn: "70+ Families", labelHe: "70+ משפחות" },
    { icon: Handshake, labelEn: "Strategic Negotiation", labelHe: "משא ומתן אסטרטגי" },
    { icon: MapPin, labelEn: "Local Specialists", labelHe: "מומחים מקומיים" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="py-6 md:py-8 bg-primary"
    >
      <div className="container px-6">
        <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
              className="flex items-center gap-2"
            >
              <item.icon className="w-4 h-4 text-gold/70 flex-shrink-0" />
              <span className="text-[13px] md:text-[14px] text-primary-foreground/70 font-body tracking-wide whitespace-nowrap">
                {lang === "he" ? item.labelHe : item.labelEn}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MicroTrustLine;
