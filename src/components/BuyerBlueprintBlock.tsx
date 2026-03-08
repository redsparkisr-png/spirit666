import { motion } from "framer-motion";
import { FileText, CheckCircle, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const BuyerBlueprintBlock = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  const title = isHe
    ? "מדריך הקונה לזכרון יעקב"
    : "Zichron Yaakov Buyer Blueprint";

  const description = isHe
    ? "מדריך קצר שמסביר איך רוכשים נכס בזכרון יעקב — מה חשוב לדעת לפני שמתחילים."
    : "A short guide explaining how property buying works in Zichron Yaakov — what you need to know before getting started.";

  const bullets = isHe
    ? [
        "סקירת שוק הנדל\"ן המקומי",
        "טיפים למשא ומתן חכם",
        "הטעויות הנפוצות של קונים",
        "מה לבדוק לפני החתימה",
      ]
    : [
        "Local market overview & pricing trends",
        "Smart negotiation tips for Zichron Yaakov",
        "Common mistakes buyers make",
        "Key checks before signing a contract",
      ];

  const ctaText = isHe ? "קבלו את המדריך" : "Get the Buyer Blueprint";

  const whatsappMessage = encodeURIComponent(
    isHe
      ? "שלום, אשמח לקבל את מדריך הקונה לזכרון יעקב."
      : "Hello, I would like to receive the Zichron Yaakov Buyer Blueprint."
  );
  const whatsappUrl = `https://wa.me/972522820632?text=${whatsappMessage}`;

  return (
    <section className="py-20 md:py-28 bg-card relative overflow-hidden" aria-labelledby="buyer-blueprint-heading">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-bronze/[0.03] blur-3xl pointer-events-none" />

      <div className="container px-6 relative z-10">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-14 h-14 rounded-full bg-charcoal/10 flex items-center justify-center mx-auto mb-5">
              <FileText className="w-6 h-6 text-charcoal" />
            </div>
            <h2 id="buyer-blueprint-heading" className="font-display font-semibold text-foreground mb-4 text-2xl md:text-[34px]">
              {title}
            </h2>
            <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
              {description}
            </p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-3 mb-10 text-start max-w-sm mx-auto"
          >
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 font-body text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal-hover text-white py-4 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-charcoal/20 hover:-translate-y-0.5 active:scale-[0.98]"
              style={{ fontSize: "17px" }}
            >
              <MessageCircle className="w-5 h-5" />
              {ctaText}
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-5 text-xs text-muted-foreground/70 font-body italic"
          >
            {isHe ? "ללא התחייבות • פרטיותך חשובה לנו" : "No obligation • Your privacy matters"}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default BuyerBlueprintBlock;
