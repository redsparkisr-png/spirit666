"use client";

import { motion } from "framer-motion";
import { MessageCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { trackGuideRequest } from "@/components/GoogleAnalyticsConsent";
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

  const phone_number = t("whatsapp.phone_number") || "972522820632";
  const waMsg = encodeURIComponent(
    isHe
      ? "היי, אשמח לקבל את מדריך הקונה לזכרון יעקב 2026."
      : "Hi, I'd like to receive the Zichron Yaakov Buyer Blueprint 2026.",
  );
  const waUrl = `https://wa.me/${phone_number}?text=${waMsg}`;

  const handleWhatsApp = () => {
    trackGuideRequest();
    window.open(waUrl, "_blank");
  };

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
                src={(guideImg as any).src ?? (guideImg as unknown as string)}
                alt={isHe ? "מדריך הקונה לזכרון יעקב 2026" : "Zichron Yaakov Buyer Blueprint 2026"}
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Text + CTA */}
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
                : "The definitive guide for English-speaking buyers exploring property in Israel's most desirable moshava."}
            </p>

            {/* Bullets */}
            <ul className="space-y-3 mb-8">
              {BULLET_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-3 font-body text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>

            {/* SEO internal links */}
            <div className="flex flex-wrap gap-3 mb-8 text-xs font-body">
              <Link href={`/${lang}/properties`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "נכסים בזכרון יעקב" : "Homes for sale in Zichron Yaakov"}
              </Link>
              <Link href={`/${lang}/buying-property-zichron-yaakov`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "מדריך רכישה" : "Buying guide"}
              </Link>
              <Link href={`/${lang}/living-in-zichron-yaakov`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "חיים בזכרון יעקב" : "Living in Zichron Yaakov"}
              </Link>
            </div>

            {/* Single WhatsApp CTA */}
            <button
              onClick={handleWhatsApp}
              className={`w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-4 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] ${isHe ? "flex-row-reverse" : ""}`}
              style={{ fontSize: "17px" }}
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" />
              {isHe ? "שלחו לי את המדריך בוואטסאפ" : "Send Me the Guide via WhatsApp"}
            </button>

            <p className="text-xs text-muted-foreground/60 font-body text-center mt-3">
              {isHe ? "נשלח מיידית · ללא ספאם · ניתן לבטל בכל עת" : "Sent instantly · No spam · Cancel anytime"}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BlueprintPromoSection;
