import { motion } from "framer-motion";
import { ShieldCheck, Users, Compass, Home } from "lucide-react";
import eliranImg from "@/assets/eliran-amsalem.jpg";
import hagitImg from "@/assets/hagit-cohen-morgan.png";
import aviImg from "@/assets/avi-suliman.png";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/lib/i18n";

const team = [
  { imgKey: aviImg, nameKey: "home.why.avi_name", roleKey: "home.why.avi_role", bioKey: "home.team.avi_bio" },
  { imgKey: hagitImg, nameKey: "home.why.hagit_name", roleKey: "home.why.hagit_role", bioKey: "home.team.hagit_bio" },
  { imgKey: eliranImg, nameKey: "home.why.eliran_name", roleKey: "home.why.eliran_role", bioKey: "home.team.eliran_bio" },
];

const WhyDifferent = () => {
  const { t } = useSiteContent();
  const { lang } = useLanguage();
  const isHe = lang === "he";

  const trustPoints = isHe
    ? [
        { icon: Compass, title: "מומחיות שוק מקומית", desc: "ידע מעמיק של כל שכונה, מגמות מחירים ותכנון עתידי בזכרון יעקב." },
        { icon: Users, title: "אמון של רוכשים בינלאומיים", desc: "ליווינו למעלה מ-70 משפחות מחו\"ל ברכישת בית בישראל." },
        { icon: ShieldCheck, title: "ליווי מלא בתהליך הרכישה", desc: "מהסיור הראשון ועד קבלת המפתח — אנחנו אתכם בכל שלב." },
        { icon: Home, title: "גישה לנכסים בלעדיים", desc: "נכסים שלא מפורסמים בשוק הפתוח, זמינים רק דרכנו." },
      ]
    : [
        { icon: Compass, title: "Local Market Expertise", desc: "Deep knowledge of every neighborhood, price trends and future development in Zichron Yaakov." },
        { icon: Users, title: "Trusted by International Buyers", desc: "We've guided 70+ overseas families through the process of buying a home in Israel." },
        { icon: ShieldCheck, title: "Full Buying Guidance", desc: "From the first tour to getting the keys — we're with you every step of the way." },
        { icon: Home, title: "Access to Off-Market Homes", desc: "Properties that never hit the open market, available exclusively through us." },
      ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-8 md:mb-12"
        >
          <p className="text-bronze font-body text-sm tracking-widest uppercase mb-3">
            {t("home.team.pre_title")}
          </p>
          <h2 className="text-2xl md:text-[30px] font-display font-semibold text-foreground mb-3">
            {t("home.team.title")}
          </h2>
          <p className="text-muted-foreground font-body text-sm md:text-base">
            {t("home.team.subtitle")}
          </p>
        </motion.div>

        {/* Trust points grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-10 md:mb-14">
          {trustPoints.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="flex gap-4 p-5 rounded-xl bg-card border border-border hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                <point.icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-sm mb-1">{point.title}</p>
                <p className="text-muted-foreground font-body text-xs leading-relaxed">{point.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team members */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-10">
          {team.map((member, idx) => (
            <motion.div
              key={member.nameKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="text-center"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-border shadow-md mx-auto mb-4">
                <img src={member.imgKey} alt={t(member.nameKey)} className="w-full h-full object-cover"  loading="lazy" decoding="async" />
              </div>
              <p className="font-display font-semibold text-foreground text-base md:text-lg">{t(member.nameKey)}</p>
              <p className="text-sm text-bronze font-body mb-2">{t(member.roleKey)}</p>
              <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-[260px] mx-auto">
                {t(member.bioKey)}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="w-12 h-px bg-gold/40 mx-auto mb-6" />
        <p className="text-center text-muted-foreground font-body text-sm italic">
          {t("home.why.tagline")}
        </p>
      </div>
    </section>
  );
};

export default WhyDifferent;
