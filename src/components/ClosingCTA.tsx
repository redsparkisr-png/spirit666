import { motion } from "framer-motion";
import { MessageCircle, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";

const ClosingCTA = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const { t } = useSiteContent();

  const phone = t("whatsapp.phone_number") || "972522820632";
  const closingMsg = encodeURIComponent(t("whatsapp.closing_message") || "Hi Hagit, I'm looking at homes in Zichron Yaakov and would love to learn more.");
  const guideMsg = encodeURIComponent(t("whatsapp.closing_guide_message") || "Hi Hagit, I would love to receive the guide about buying property in Zichron Yaakov.");
  const closingUrl = `https://wa.me/${phone}?text=${closingMsg}`;
  const guideUrl = `https://wa.me/${phone}?text=${guideMsg}`;

  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(var(--gold) / 0.08) 0%, transparent 70%)",
        }}
      />
      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="font-display font-semibold text-primary-foreground text-2xl md:text-[30px] leading-tight mb-3">
            {isHe
              ? "מחפשים בית בזכרון יעקב?"
              : "Looking for a Home in Zichron Yaakov?"}
          </h2>
          <p className="font-body text-primary-foreground/70 mb-8 text-sm md:text-base">
            {isHe
              ? "נשמח להראות לכם נכסים שמתאימים בדיוק למה שאתם מחפשים — כולל כאלה שלא תמיד מגיעים ללוחות הפרסום."
              : "Browse our available properties or chat directly with Hagit."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={`/${lang}/properties`}
              className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] text-primary-foreground"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-hover)) 100%)",
              }}
            >
              {isHe ? "צפו בנכסים זמינים" : "See Available Homes"}
            </Link>
            <a
              href={closingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 ${isHe ? "flex-row-reverse" : ""}`}
            >
              <MessageCircle className="w-4 h-4" />
              {isHe ? "דברו איתנו בוואטסאפ" : "Chat with Hagit"}
            </a>
          </div>

          {/* Guide CTA + internal links */}
          <div className="mt-8 pt-6 border-t border-primary-foreground/10 space-y-3">
            <a
              href={guideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground font-body text-sm transition-colors duration-300 ${isHe ? "flex-row-reverse" : ""}`}
            >
              <Download className="w-4 h-4" />
              {isHe
                ? "הורידו את המדריך החינמי לרכישה בזכרון יעקב"
                : "Get the Free Zichron Yaakov Home Buying Guide"}
            </a>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-body">
              <Link to={`/${lang}/guides`} className="text-primary-foreground/50 hover:text-primary-foreground/80 underline underline-offset-4 transition-colors">
                {isHe ? "מדריכים ותובנות" : "Guides & Insights"}
              </Link>
              <Link to={`/${lang}/sell`} className="text-primary-foreground/50 hover:text-primary-foreground/80 underline underline-offset-4 transition-colors">
                {isHe ? "מכירת נכס" : "Sell Your Property"}
              </Link>
              <Link to={`/${lang}/contact`} className="text-primary-foreground/50 hover:text-primary-foreground/80 underline underline-offset-4 transition-colors">
                {isHe ? "צרו קשר" : "Contact Us"}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingCTA;
