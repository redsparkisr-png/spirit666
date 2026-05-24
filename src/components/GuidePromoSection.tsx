import { motion } from "framer-motion";
import { MessageCircle, BookOpen } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import guideImg from "@/assets/guide-img-1.jpg";

const WHATSAPP_MSG = encodeURIComponent(
  "Hi Hagit,\nI would love to receive the guide about buying property in Zichron Yaakov."
);
const WHATSAPP_URL = `https://wa.me/972522820632?text=${WHATSAPP_MSG}`;

const GuidePromoSection = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  return (
    <section className="py-14 md:py-20 bg-background" aria-labelledby="guide-promo-heading">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className={`relative ${isHe ? "md:order-2" : ""}`}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
              <img
                src={guideImg}
                alt={isHe ? "מדריך רכישת נכס בזכרון יעקב" : "Zichron Yaakov buying guide for overseas families"}
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-4 ltr:-right-4 rtl:-left-4 bg-card rounded-xl shadow-lg border border-border px-5 py-3 flex items-center gap-3"
            >
              <BookOpen className="w-5 h-5 text-gold" />
              <div>
                <p className="text-xs font-body font-semibold text-foreground">
                  {isHe ? "מדריך חינמי" : "Free Guide"}
                </p>
                <p className="text-[11px] font-body text-muted-foreground">
                  {isHe ? "13 פרקים מקיפים" : "13 comprehensive chapters"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={isHe ? "md:order-1 text-right" : ""}
          >
            <p className="text-xs tracking-[0.2em] uppercase font-body text-gold mb-3">
              {isHe ? "מדריך חינם" : "Free Resource"}
            </p>
            <h2
              id="guide-promo-heading"
              className="font-display font-semibold text-foreground mb-3 text-2xl md:text-[30px] leading-tight"
            >
              {isHe ? "מדריך חינמי לרוכשים מחו\"ל" : "Free Guide for Overseas Buyers"}
            </h2>
            <p className="font-display italic text-base md:text-lg text-muted-foreground mb-4">
              {isHe
                ? "איך משפחות מחו\"ל רוכשות נדל\"ן בזכרון יעקב"
                : "How Overseas Families Buy Property in Zichron Yaakov"}
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">
              {isHe
                ? "למדו את תהליך הרכישה, מחירים מקובלים, השכונות הטובות ביותר והטעויות הנפוצות שרוכשים מחו\"ל עושים."
                : "Learn the buying process, typical prices, the best neighborhoods and common mistakes overseas buyers make."}
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/20 hover:-translate-y-0.5 active:scale-[0.98]"
              style={{ fontSize: "16px" }}
            >
              <MessageCircle className="w-5 h-5" />
              {isHe ? "קבלו את המדריך בוואטסאפ" : "Get the Guide on WhatsApp"}
            </a>

            <p className="mt-3 text-xs text-muted-foreground/70 font-body">
              {isHe ? "לוקח 10 שניות • ללא ספאם" : "Takes 10 seconds • No spam"}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GuidePromoSection;
