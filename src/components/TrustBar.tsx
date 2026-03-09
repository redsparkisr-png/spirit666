import { motion } from "framer-motion";
import { Shield, Users, Globe, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const TrustBar = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  const items = [
    { icon: Shield, en: "Licensed Professionals", he: "אנשי מקצוע מורשים" },
    { icon: Users, en: "288+ Families Assisted", he: "288+ משפחות שליוינו" },
    { icon: Globe, en: "English-Speaking Guidance", he: "ליווי בשפה האנגלית" },
    { icon: MapPin, en: "Local Market Specialists", he: "מומחי שוק מקומיים" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="py-5 md:py-6 bg-primary"
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
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <item.icon className="w-4 h-4 text-gold/70 flex-shrink-0" />
              <span className="text-[12px] sm:text-[13px] md:text-[14px] text-primary-foreground/70 font-body tracking-wide">
                {isHe ? item.he : item.en}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TrustBar;
