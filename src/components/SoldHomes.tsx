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
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Recently Sold Homes in Zichron Yaakov
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Some of these homes were sold before appearing on public listing sites.
          </p>
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
                <div className="absolute inset-0 bg-foreground/20" />
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
          className="text-center mt-10"
        >
          <p className="text-foreground font-body mb-4">Looking for something similar?</p>
          <button
            onClick={scrollToForm}
            className="bg-primary hover:bg-accent text-primary-foreground px-8 py-3.5 rounded-lg font-body font-medium text-sm transition-colors duration-300"
          >
            Get Matching Homes
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SoldHomes;
