import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";

/**
 * Sitewide social-proof strip. Sits above the Closing CTA / Footer.
 * Quiet-luxury treatment: muted cream background, gold dividers, restrained type.
 * All copy comes from `site_content` with sensible fallbacks.
 */
const SocialProofStrip = () => {
  const { lang } = useLanguage();
  const { t } = useSiteContent();
  const isHe = lang === "he";

  // t() returns the key itself when a translation is missing — treat that as "no value".
  const tf = (key: string, fallback: string) => {
    const v = t(key);
    return !v || v === key ? fallback : v;
  };

  const stats = [
    {
      value: tf("social_proof.stat_1_value", "288+"),
      label: tf("social_proof.stat_1_label", isHe ? "משפחות שליווינו" : "Families guided"),
    },
    {
      value: tf("social_proof.stat_2_value", "12+"),
      label: tf("social_proof.stat_2_label", isHe ? "שנים בזכרון יעקב" : "Years in Zichron"),
    },
    {
      value: tf("social_proof.stat_3_value", "₪450M+"),
      label: tf("social_proof.stat_3_label", isHe ? "עסקאות נסגרו" : "In closed deals"),
    },
    {
      value: tf("social_proof.stat_4_value", "100%"),
      label: tf("social_proof.stat_4_label", isHe ? "מתווכים מורשים" : "Licensed agents"),
    },
  ];

  return (
    <section
      aria-label={isHe ? "נתוני אמון" : "Trust indicators"}
      className="bg-background border-y border-gold/15"
    >
      <div className="container px-6 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:divide-x md:rtl:divide-x-reverse md:divide-gold/15">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex flex-col items-center text-center md:px-4"
            >
              <div className="font-display text-foreground text-2xl md:text-3xl font-semibold tracking-tight">
                {s.value}
              </div>
              <div className="mt-1.5 text-muted-foreground font-body text-xs md:text-sm uppercase tracking-[0.14em]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofStrip;