import { motion } from "framer-motion";
import img1 from "@/assets/lifestyle-zichron-1.jpg";
import img2 from "@/assets/lifestyle-zichron-2.jpg";
import img3 from "@/assets/lifestyle-zichron-3.jpg";
import img4 from "@/assets/lifestyle-zichron-4.jpg";
import img5 from "@/assets/lifestyle-zichron-5.jpg";
import img6 from "@/assets/lifestyle-zichron-6.jpg";

const galleryItems = [
  { src: img1, alt: "Elevated sea view with red-tiled roofs in Zichron Yaakov", label: "Mediterranean Living" },
  { src: img2, alt: "Midrachov pedestrian street with cafes in Zichron Yaakov", label: "Walkable Town Center" },
  { src: img3, alt: "Boutique winery with vineyard in Zichron Yaakov", label: "Vineyard Culture" },
  { src: img4, alt: "Quiet residential street in Zichron Yaakov", label: "Family-Friendly Streets" },
  { src: img5, alt: "Green hillside trail with sea view near Zichron Yaakov", label: "Nature & Privacy" },
  { src: img6, alt: "Mediterranean sunset over the sea from Zichron Yaakov", label: "Coastal Elevation" },
];

const LifestyleGallery = () => {
  const scrollToHomes = () => {
    document.getElementById("available-homes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-sand-light">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Life in Zichron Yaakov
          </h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto text-base md:text-lg">
            A rare balance of coastal calm, community living, and long-term value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative overflow-hidden rounded-xl aspect-[4/3] group"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 inset-x-0 p-4">
                <p className="text-primary-foreground font-body text-sm font-medium drop-shadow-sm">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12 space-y-6"
        >
          <p className="text-muted-foreground font-body text-sm italic max-w-lg mx-auto">
            Most of our international buyers fall in love with Zichron before choosing the right home.
          </p>
          <button
            onClick={scrollToHomes}
            className="bg-gold hover:bg-gold-hover text-primary-foreground px-8 py-3.5 rounded-lg font-body font-medium text-sm transition-all duration-300 hover:shadow-md"
          >
            Explore Available Homes
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LifestyleGallery;
