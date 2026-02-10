import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";

const properties = [
  {
    image: property1,
    title: "Elegant Villa with Garden",
    benefit: "Quiet neighborhood, walking distance to the town center",
    alt: "Mediterranean stone villa with arched windows and landscaped garden",
  },
  {
    image: property2,
    title: "Charming Cottage with Sea Views",
    benefit: "Panoramic Mediterranean views from a private balcony",
    alt: "Stone cottage with sea view and bougainvillea",
  },
  {
    image: property3,
    title: "Modern Penthouse Retreat",
    benefit: "Open-plan living with endless coastal horizons",
    alt: "Luxury penthouse terrace overlooking the sea",
  },
  {
    image: property4,
    title: "Historic Stone Residence",
    benefit: "Original character preserved, fully renovated interior",
    alt: "Restored stone house with olive tree courtyard",
  },
  {
    image: property5,
    title: "Contemporary Hilltop Home",
    benefit: "Private pool and unobstructed views of the valley",
    alt: "Modern white villa with infinity pool",
  },
];

const AvailableHomes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const next = () => setCurrentIndex((i) => (i + 1) % properties.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + properties.length) % properties.length);

  // Show 1 on mobile, 2 on md, 3 on lg
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      cards.push(properties[(currentIndex + i) % properties.length]);
    }
    return cards;
  };

  return (
    <section id="available-homes" className="py-20 md:py-28 bg-sand-light">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Available Homes in Zichron Yaakov
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            The homes shown here are a small, curated selection from a broader portfolio we actively market.
          </p>
        </motion.div>

        {/* Desktop carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleCards().map((property, index) => (
              <motion.div
                key={`${property.title}-${currentIndex}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    {property.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-body mb-1">
                    {property.benefit}
                  </p>
                  <p className="text-xs text-muted-foreground/70 font-body mb-5">
                    Price upon request
                  </p>
                  <button
                    onClick={scrollToForm}
                    className="w-full bg-primary hover:bg-accent text-primary-foreground py-3 rounded-lg font-body font-medium text-sm transition-colors duration-300"
                  >
                    Request Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border hover:bg-card flex items-center justify-center transition-colors"
              aria-label="Previous properties"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex gap-2">
              {properties.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentIndex ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border hover:bg-card flex items-center justify-center transition-colors"
              aria-label="Next properties"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Subtle hook */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-sm text-muted-foreground/80 italic font-body mt-10 max-w-lg mx-auto"
        >
          Some of our best opportunities are sold quietly and never reach public listing sites.
        </motion.p>
      </div>
    </section>
  );
};

export default AvailableHomes;
