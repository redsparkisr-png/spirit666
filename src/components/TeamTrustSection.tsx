import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import hagitImg from "@/assets/hagit-cohen-morgan.png";
import aviImg from "@/assets/avi-suliman.png";
import eliranImg from "@/assets/eliran-amsalem.jpg";

const team = [
  { img: hagitImg, en: "Hagit Cohen Morgan", he: "חגית כהן מורגן", roleEn: "Founder", roleHe: "מייסדת" },
  { img: aviImg, en: "Avi Suleiman", he: "אבי סולימן", roleEn: "Founder", roleHe: "מייסד" },
  { img: eliranImg, en: "Eliran Amsalem", he: "אלירן אמסלם", roleEn: "Digital Marketing & Business Development", roleHe: "שיווק דיגיטלי ופיתוח עסקי" },
];

const TeamTrustSection = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const { t } = useSiteContent();

  const phone = t("whatsapp.phone_number") || "972522820632";
  const msg = encodeURIComponent(t("whatsapp.team_message") || "Hi, I'd like to learn more about homes in Zichron Yaakov.");
  const waUrl = `https://wa.me/${phone}?text=${msg}`;

  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display font-semibold text-foreground text-[26px] md:text-[30px] leading-tight mb-4">
            {t("team.title")}
          </h2>
          <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10 whitespace-pre-line">
            {t("team.text")}
          </p>

          {/* Team members */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-10">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gold/30 shadow-md mb-3">
                  <img
                    src={member.img}
                    alt={isHe ? member.he : member.en}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <p className="font-display font-semibold text-foreground text-sm">
                  {isHe ? member.he : member.en}
                </p>
                <p className="font-body text-muted-foreground text-xs mt-0.5">
                  {isHe ? member.roleHe : member.roleEn}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Trust line */}
          <p className="font-body text-muted-foreground text-sm italic mb-8">
            {t("team.trust_line")}
          </p>

          {/* CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2.5 bg-charcoal hover:bg-charcoal-hover text-white py-3.5 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] ${isHe ? "flex-row-reverse" : ""}`}
          >
            <MessageCircle className="w-5 h-5" />
            {t("team.cta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamTrustSection;
