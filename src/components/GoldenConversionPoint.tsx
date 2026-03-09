import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const BLUEPRINT_MSG = encodeURIComponent(
  "Hi, I'd like to receive the Zichron Yaakov Buyer Blueprint."
);
const BLUEPRINT_URL = `https://wa.me/972522820632?text=${BLUEPRINT_MSG}`;

const GoldenConversionPoint = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--gold) / 0.1) 0%, transparent 70%)",
        }}
      />
      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-display font-semibold text-primary-foreground text-2xl md:text-[34px] leading-tight mb-4">
            {isHe ? "שוקלים לקנות בית בזכרון יעקב?" : "Planning to Buy in Zichron Yaakov?"}
          </h2>
          <p className="font-body text-primary-foreground/85 text-sm md:text-base leading-relaxed mb-4 max-w-xl mx-auto">
            {isHe
              ? "רוב האנשים שמגיעים לחפש בית בזכרון יעקב לא מכירים את ההבדלים האמיתיים בין השכונות — וזה יכול לעלות מאות אלפי שקלים."
              : "Start with the Zichron Yaakov Buyer Blueprint \u2014 a practical guide created for English-speaking buyers researching property in the Moshava."}
          </p>
          <p className="font-body text-primary-foreground/70 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            {isHe
              ? "לכן יצרנו את המדריך לרוכשי בתים בזכרון יעקב."
              : "A practical guide to help you navigate the local market with confidence."}
          </p>
          <a
            href={BLUEPRINT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-gold hover:bg-gold-hover text-white py-4 px-10 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
            style={{ fontSize: "16px" }}
          >
            <MessageCircle className="w-5 h-5" />
            {isHe ? "שלחו לי את המדריך" : "Get the Zichron Buyer Blueprint"}
          </a>
          <p className="mt-3 text-xs text-primary-foreground/50 font-body">
            {isHe ? "נשלח מיידית בוואטסאפ." : "Sent instantly via WhatsApp."}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GoldenConversionPoint;
