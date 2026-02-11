import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, LandPlot, Ruler, BedDouble } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";

const properties = [
  {
    images: [property1, property2, property3],
    title: "Elegant Villa with Garden",
    benefit: "Quiet neighborhood, walking distance to the town center",
    alt: "Mediterranean stone villa with arched windows and landscaped garden",
    lotSize: "350 sqm",
    interiorSize: "180 sqm",
    bedrooms: "4",
  },
  {
    images: [property2, property3, property4],
    title: "Charming Cottage with Sea Views",
    benefit: "Panoramic Mediterranean views from a private balcony",
    alt: "Stone cottage with sea view and bougainvillea",
    lotSize: "200 sqm",
    interiorSize: "120 sqm",
    bedrooms: "3",
  },
  {
    images: [property3, property1, property5],
    title: "Modern Penthouse Retreat",
    benefit: "Open-plan living with endless coastal horizons",
    alt: "Luxury penthouse terrace overlooking the sea",
    lotSize: "–",
    interiorSize: "155 sqm",
    bedrooms: "3",
  },
  {
    images: [property4, property5, property1],
    title: "Historic Stone Residence",
    benefit: "Original character preserved, fully renovated interior",
    alt: "Restored stone house with olive tree courtyard",
    lotSize: "280 sqm",
    interiorSize: "160 sqm",
    bedrooms: "5",
  },
  {
    images: [property5, property4, property2],
    title: "Contemporary Hilltop Home",
    benefit: "Private pool and unobstructed views of the valley",
    alt: "Modern white villa with infinity pool",
    lotSize: "400 sqm",
    interiorSize: "210 sqm",
    bedrooms: "4",
  },
];

const MiniCarousel = ({ images, alt }: { images: string[]; alt: string }) => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % images.length);
  };
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setCurrent((c) => (c + 1) % images.length);
      else setCurrent((c) => (c - 1 + images.length) % images.length);
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative h-56 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${alt} – photo ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
      ))}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-4 h-4 text-primary-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next image"
      >
        <ChevronRight className="w-4 h-4 text-primary-foreground" />
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === current ? "bg-primary-foreground" : "bg-primary-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const AvailableHomes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const next = () => setCurrentIndex((i) => (i + 1) % properties.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + properties.length) % properties.length);

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
            These represent only a portion of the homes we discreetly market.
          </p>
        </motion.div>

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
                <MiniCarousel images={property.images} alt={property.alt} />
                <div className="p-6">
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    {property.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-body mb-4">
                    {property.benefit}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-body mb-5 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <LandPlot className="w-3.5 h-3.5 text-primary" />
                      {property.lotSize}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5 text-primary" />
                      {property.interiorSize}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5 text-primary" />
                      {property.bedrooms} Bed
                    </span>
                  </div>

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
