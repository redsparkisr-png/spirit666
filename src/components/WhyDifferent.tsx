import { motion } from "framer-motion";
import eliranImg from "@/assets/eliran-amsalem.jpg";
import hagitImg from "@/assets/hagit-cohen-morgan.png";
import aviImg from "@/assets/avi-suliman.png";

const team = [
  { name: "Eliran Amsalem", role: "Marketing & Digital Strategy", img: eliranImg },
  { name: "Hagit Cohen Morgan", role: "Senior Real Estate Advisor & Co-Founder", img: hagitImg },
  { name: "Avi Suliman", role: "Senior Real Estate Advisor & Co-Founder", img: aviImg },
];

const WhyDifferent = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-3">
            Real People. Local Presence.
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg mb-10">
            We live here. We work here. We guide our clients personally.
          </p>

          <div className="flex justify-center items-start gap-6 md:gap-10 mb-10">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col items-center max-w-[140px]">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-border shadow-sm">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <p className="mt-3 text-sm md:text-base font-display font-semibold text-foreground leading-tight text-center">
                  {member.name}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground font-body leading-tight mt-0.5 text-center">
                  {member.role}
                </p>
              </div>
            ))}
          </div>

          <div className="w-12 h-px bg-gold/40 mx-auto mb-6" />

          <p className="text-muted-foreground font-body text-sm italic">
            A boutique team combining experience, strategy, and personal care.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyDifferent;
