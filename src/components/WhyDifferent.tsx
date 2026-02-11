import { motion } from "framer-motion";
import eliranImg from "@/assets/eliran-amsalem.jpg";
import hagitImg from "@/assets/hagit-cohen-morgan.png";
import aviImg from "@/assets/avi-suliman.png";

const team = [
  { name: "Eliran Amsalem", role: "Digital Marketing & Strategy", img: eliranImg },
  { name: "Hagit Cohen Morgan", role: "Senior Real Estate & Client Advisory", img: hagitImg },
  { name: "Avi Suliman", role: "Senior Real Estate & Client Advisory", img: aviImg },
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
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-6">
            Real People. Local Presence.
          </h2>

          <div className="flex justify-center items-start gap-6 md:gap-10 mb-8">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-border">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <p className="mt-3 text-sm md:text-base font-display font-semibold text-foreground leading-tight">{member.name}</p>
                <p className="text-xs md:text-sm text-muted-foreground font-body leading-tight mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>

          <p className="text-foreground font-body leading-relaxed text-base md:text-lg mb-4">
            Spirit Real Estate is a boutique real estate team based in Zichron Yaakov.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed text-base md:text-lg mb-4">
            We work closely with clients on the ground, providing real local presence, clear communication, and personal guidance — especially for buyers purchasing from abroad.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed text-base md:text-lg">
            Our approach is human, calm, and focused on doing things right.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyDifferent;
