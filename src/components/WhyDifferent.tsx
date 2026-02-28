import { motion } from "framer-motion";
import eliranImg from "@/assets/eliran-amsalem.jpg";
import hagitImg from "@/assets/hagit-cohen-morgan.png";
import aviImg from "@/assets/avi-suliman.png";
import { useSiteContent } from "@/hooks/useSiteContent";

const team = [
  { imgKey: aviImg, nameKey: "home.why.avi_name", roleKey: "home.why.avi_role", bioKey: "home.team.avi_bio" },
  { imgKey: hagitImg, nameKey: "home.why.hagit_name", roleKey: "home.why.hagit_role", bioKey: "home.team.hagit_bio" },
  { imgKey: eliranImg, nameKey: "home.why.eliran_name", roleKey: "home.why.eliran_role", bioKey: "home.team.eliran_bio" },
];

const WhyDifferent = () => {
  const { t } = useSiteContent();

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-background">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-bronze font-body text-sm tracking-widest uppercase mb-3">
            {t("home.team.pre_title")}
          </p>
          <h2 className="text-3xl md:text-[34px] font-display font-semibold text-foreground mb-3">
            {t("home.team.title")}
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg">
            {t("home.team.subtitle")}
          </p>
        </motion.div>

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
                <img src={member.imgKey} alt={t(member.nameKey)} className="w-full h-full object-cover" />
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
