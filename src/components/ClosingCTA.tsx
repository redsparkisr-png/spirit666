import { motion } from "framer-motion";
import { MessageCircle, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

const WHATSAPP_MSG = encodeURIComponent(
  "Hi Hagit,\nI'm looking at homes in Zichron Yaakov and would love to learn more.\nCould you also send me the buying guide?"
);
const WHATSAPP_URL = `https://wa.me/972522820632?text=${WHATSAPP_MSG}`;

const GUIDE_WHATSAPP_MSG = encodeURIComponent(
  "Hi Hagit,\nI would love to receive the guide about buying property in Zichron Yaakov."
);
const GUIDE_WHATSAPP_URL = `https://wa.me/972522820632?text=${GUIDE_WHATSAPP_MSG}`;

const ClosingCTA = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";

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
              ? "צפו בנכסים הזמינים שלנו או שוחחו ישירות עם חגית."
              : "Browse our available properties or chat directly with Hagit."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={`/${lang}/properties`}
              className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-lg font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] text-primary-foreground"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-hover)) 100%)",
              }}
            >
              {isHe ? "צפו בנכסים זמינים" : "See Available Homes"}
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-lg font-body font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <MessageCircle className="w-4 h-4" />
              {isHe ? "שוחחו עם חגית" : "Chat with Hagit"}
            </a>
          </div>

          {/* Guide CTA */}
          <div className="mt-8 pt-6 border-t border-primary-foreground/10">
            <a
              href={GUIDE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground font-body text-sm transition-colors duration-300"
            >
              <Download className="w-4 h-4" />
              {isHe
                ? "הורידו את המדריך החינמי לרכישה בזכרון יעקב"
                : "Get the Free Zichron Yaakov Home Buying Guide"}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingCTA;
