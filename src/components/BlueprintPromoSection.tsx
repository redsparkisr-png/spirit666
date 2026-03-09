import { motion } from "framer-motion";
import { MessageCircle, CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import guideImg from "@/assets/guide-img-1.jpg";

const BLUEPRINT_MSG = encodeURIComponent(
  "Hi, I'd like to receive the Zichron Yaakov Buyer Blueprint."
);
const BLUEPRINT_URL = `https://wa.me/972522820632?text=${BLUEPRINT_MSG}`;

const highlights = [
  { en: "Real neighborhood price data", he: "נתוני מחירים אמיתיים לפי שכונות" },
  { en: "Verified market transactions", he: "עסקאות שוק מאומתות" },
  { en: "Investment insights", he: "תובנות השקעה" },
  { en: "Olim tax advantages", he: "הטבות מס לעולים" },
  { en: "Step-by-step buying roadmap", he: "מפת דרכים לתהליך הרכישה" },
];

const BlueprintPromoSection = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  return (
    <section className="py-16 md:py-24 bg-background" aria-labelledby="blueprint-promo-heading">
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
            className={isHe ? "md:order-1 text-right" : ""}
          >
            <p className="text-xs tracking-[0.2em] uppercase font-body text-gold mb-3">
              {isHe ? "מדריך בלעדי" : "Exclusive Guide"}
            </p>
            <h2
              id="blueprint-promo-heading"
              className="font-display font-semibold text-foreground mb-2 text-2xl md:text-[30px] leading-tight"
            >
              {isHe ? "מדריך הקונה לזכרון יעקב 2026" : "Zichron Yaakov Buyer Blueprint 2026"}
            </h2>
            <p className="font-display italic text-base md:text-lg text-muted-foreground mb-6">
              {isHe
                ? "המדריך המקיף לרוכשים דוברי אנגלית החוקרים נדל\"ן במושבה המבוקשת בישראל."
                : "The definitive guide for English-speaking buyers exploring property in Israel's most desirable moshava."}
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item, idx) => (
                <li key={idx} className={`flex items-center gap-3 font-body text-sm text-foreground ${isHe ? "flex-row-reverse" : ""}`}>
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>{isHe ? item.he : item.en}</span>
                </li>
              ))}
            </ul>

            {/* Private positioning line */}
            <p className="font-body text-xs text-muted-foreground/70 italic mb-4">
              {isHe
                ? "מדריך זה משותף באופן פרטי עם רוכשים רציניים החוקרים נדל\"ן בזכרון יעקב."
                : "This guide is shared privately with serious buyers exploring property in Zichron Yaakov."}
            </p>

            <a
              href={BLUEPRINT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/20 hover:-translate-y-0.5 active:scale-[0.98]"
              style={{ fontSize: "16px" }}
            >
              <MessageCircle className="w-5 h-5" />
              {isHe ? "קבלו את מדריך הקונה לזכרון" : "Get the Zichron�" : "Get the Zichron Buyer Blueprint"}
            </a>

            <p className="mt-3 text-xs text-muted-foreground/70 font-body">
   �שלח מיידית בוואטסאפ." : "Sent instantly�." : "Instant access via WhatsApp."}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlueprintPromoSection;
