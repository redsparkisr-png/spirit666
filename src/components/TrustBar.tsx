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
        {/* Desktop: single row with gold separators */}
        <div className="hidden md:flex items-center justify-center">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
              className="flex items-center"
            >
              {idx > 0 && (
                <span className="mx-5 w-px h-4 bg-gold/20" />
              )}
              <item.icon className="w-4 h-4 text-gold/70 flex-shrink-0" />
              <span className="ml-2 text-[14px] text-primary-foreground/75 font-body tracking-wide">
                {isHe ? item.he : item.en}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Mobile: two rows, centered, with gold dot separators */}
        <div className="flex md:hidden flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-2">
            <items[0].icon className="w-3.5 h-3.5 text-gold/70 flex-shrink-0" />
            <span className="text-[12px] text-primary-foreground/75 font-body tracking-wide">
              {isHe ? items[0].he : items[0].en}
            </span>
            <span className="mx-1.5 text-gold/30 text-[10px]">•</span>
            <items[1].icon className="w-3.5 h-3.5 text-gold/70 flex-shrink-0" />
            <span className="text-[12px] text-primary-foreground/75 font-body tracking-wide">
              {isHe ? items[1].he : items[1].en}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <items[2].icon className="w-3.5 h-3.5 text-gold/70 flex-shrink-0" />
            <span className="text-[12px] text-primary-foreground/75 font-body tracking-wide">
              {isHe ? items[2].he : items[2].en}
            </span>
            <span className="mx-1.5 text-gold/30 text-[10px]">•</span>
            <items[3].icon className="w-3.5 h-3.5 text-gold/70 flex-shrink-0" />
            <span className="text-[12px] text-primary-foreground/75 font-body tracking-wide">
              {isHe ? items[3].he : items[3].en}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrustBar;
