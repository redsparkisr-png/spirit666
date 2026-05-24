import { motion } from "framer-motion";
import { MessageCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import guideImg from "@/assets/guide-img-1.jpg";

const BULLET_KEYS = [
  "guide.home.bullet_1",
  "guide.home.bullet_2",
  "guide.home.bullet_3",
  "guide.home.bullet_4",
  "guide.home.bullet_5",
  "guide.home.bullet_6",
  "guide.home.bullet_7",
  "guide.home.bullet_8",
];

const BlueprintPromoSection = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const { t } = useSiteContent();

  const phone = t("whatsapp.phone_number") || "972522820632";
  const msg = encodeURIComponent(t("whatsapp.guide_message") || "Hi, I'd like to receive the Zichron Yaakov Buyer Blueprint.");
  const blueprintUrl = `https://wa.me/${phone}?text=${msg}`;

  return (
    <section className="py-14 md:py-20 bg-background" aria-labelledby="blueprint-promo-heading">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className={isHe ? "md:order-2" : ""}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
              <img
                src={guideImg}
                alt={isHe ? "מדריך הקונה לזכרון יעקב 2026" : "Zichron Yaakov Buyer Blueprint 2026"}
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={isHe ? "md:order-1 text-start" : ""}
          >
            <p className="text-xs tracking-[0.2em] uppercase font-body text-gold mb-3">
              {isHe ? "מדריך בלעדי" : "Exclusive Guide"}
            </p>
            <h2
              id="blueprint-promo-heading"
              className="font-display font-semibold text-foreground mb-2 text-[26px] md:text-[30px] leading-tight"
            >
              {isHe ? "המדריך לרוכשי בתים בזכרון יעקב" : "Zichron Yaakov Buyer Blueprint 2026"}
            </h2>
            <p className="font-display italic text-base md:text-lg text-muted-foreground mb-6">
              {isHe
                ? "כל מה שצריך לדעת לפני שקונים בית בזכרון יעקב."
                : "The definitive guide for English-speaking buyers exploring property in Israel\u2019s most desirable moshava."}
            </p>

            {/* Highlights from CMS */}
            <ul className="space-y-3 mb-8">
              {BULLET_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-3 font-body text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>

            {/* Private positioning line */}
            <p className="font-body text-xs text-muted-foreground/70 italic mb-4">
              {t("guide.home.positioning")}
            </p>

            {/* Internal SEO links */}
            <div className="flex flex-wrap gap-3 mb-6 text-xs font-body">
              <Link to={`/${lang}/properties`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "נכסים בזכרון יעקב" : "Homes for sale in Zichron Yaakov"}
              </Link>
              <Link to={`/${lang}/buying-property-zichron-yaakov`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "מדריך רכישה" : "Buying guide"}
              </Link>
              <Link to={`/${lang}/living-in-zichron-yaakov`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "חיים בזכרון יעקב" : "Living in Zichron Yaakov"}
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={blueprintUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-gold hover:bg-gold-hover text-white py-4 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                style={{ fontSize: "16px" }}
              >
                {t("guide.home.cta_primary")}
              </a>
              <a
                href={blueprintUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2.5 border-2 border-gold/40 text-foreground hover:bg-gold/10 py-4 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${isHe ? "flex-row-reverse" : ""}`}
                style={{ fontSize: "16px" }}
              >
                <MessageCircle className="w-5 h-5" />
                {t("guide.home.cta_secondary")}
              </a>
            </div>

            <p className="mt-3 text-xs text-muted-foreground/70 font-body">
              {t("guide.home.trust_line")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlueprintPromoSection;
