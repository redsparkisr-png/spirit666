import { motion } from "framer-motion";
import sold1 from "@/assets/sold-1.jpg";
import sold2 from "@/assets/sold-2.jpg";
import sold3 from "@/assets/sold-3.jpg";
import sold4 from "@/assets/sold-4.jpg";

const soldProperties = [
  { image: sold1, caption: "Family villa in the historic quarter", alt: "Sold stone villa with garden" },
  { image: sold2, caption: "Charming apartment near the main street", alt: "Sold apartment building with balconies" },
  { image: sold3, caption: "Spacious home with countryside views", alt: "Sold family home with garden" },
  { image: sold4, caption: "Renovated residence with panoramic terrace", alt: "Sold stone house with pool and sea view" },
];

const SoldHomes = () => {
  const openWhatsApp = () => {
    window.open(
      "https://wa.me/972522820632?text=" + encodeURIComponent("Hi, I'd like to schedule a private consultation about homes in Zichron Yaakov"),
      "_blank"
    );
  };

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-secondary">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-body text-sm tracking-wide uppercase mb-3">
            Proven track record. Real results.
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Recently Sold Homes
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {soldProperties.map((property, index) => (
            <motion.div
              key={property.caption}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative rounded-xl overflow-hidden group"
            >
              <div className="relative h-52">
                <img
                  src={property.image}
                  alt={property.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/15" />
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-body font-semibold tracking-wider uppercase px-3 py-1.5 rounded">
                  Sold
                </div>
              </div>
              <div className="p-4 bg-card">
                <p className="text-sm font-body text-foreground">{property.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-10 space-y-4"
        >
          <p className="text-muted-foreground font-body text-sm italic">
            More successful transactions available upon request.
          </p>
          <button
            onClick={openWhatsApp}
            className="bg-gold hover:bg-gold-hover text-primary-foreground px-8 py-3.5 rounded-lg font-body font-medium text-sm transition-colors duration-300"
          >
            Schedule a Private Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SoldHomes;
