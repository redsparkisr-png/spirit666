import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, LandPlot, Ruler, BedDouble } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";

const useCarousel = (count: number) => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % count);
  };
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + count) % count);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setCurrent((c) => (c + 1) % count);
      else setCurrent((c) => (c - 1 + count) % count);
    }
    touchStartX.current = null;
  };
  return { current, next, prev, onTouchStart, onTouchEnd };
};

const CarouselControls = ({ count, current, prev, next }: { count: number; current: number; prev: (e: React.MouseEvent) => void; next: (e: React.MouseEvent) => void }) => (
  <>
    <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-primary/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Previous image">
      <ChevronLeft className="w-4 h-4 text-primary-foreground" />
    </button>
    <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-primary/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Next image">
      <ChevronRight className="w-4 h-4 text-primary-foreground" />
    </button>
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full transition-colors" style={{ backgroundColor: i === current ? "hsl(var(--primary-foreground))" : "hsl(var(--primary-foreground) / 0.4)" }} />
      ))}
    </div>
  </>
);

const AvailableHomes = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const c1 = useCarousel(3);
  const c2 = useCarousel(3);
  const c3 = useCarousel(3);
  const c4 = useCarousel(3);
  const c5 = useCarousel(3);

  return (
    <section id="available-homes" className="py-16 md:py-24 lg:py-28 bg-sand-light">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-body text-sm tracking-wide uppercase mb-3">
            Hand-Selected Homes for International Buyers
          </p>
          <h2 className="font-display font-semibold text-foreground mb-4">
            Available Homes in Zichron Yaakov
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            These represent only a portion of the homes we discreetly market.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Property 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
          >
            <div className="relative h-56 overflow-hidden" onTouchStart={c1.onTouchStart} onTouchEnd={c1.onTouchEnd}>
              <img src={property1} alt="Mediterranean stone villa – photo 1" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: c1.current === 0 ? 1 : 0 }} loading="lazy" />
              <img src={property2} alt="Mediterranean stone villa – photo 2" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: c1.current === 1 ? 1 : 0 }} loading="lazy" />
              <img src={property3} alt="Mediterranean stone villa – photo 3" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: c1.current === 2 ? 1 : 0 }} loading="lazy" />
              <CarouselControls count={3} current={c1.current} prev={c1.prev} next={c1.next} />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">Elegant Villa with Garden</h3>
              <p className="text-muted-foreground text-sm font-body mb-4">Quiet neighborhood, walking distance to the town center</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-body mb-5 flex-wrap">
                <span className="flex items-center gap-1.5"><LandPlot className="w-3.5 h-3.5 text-primary" />350 sqm</span>
                <span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5 text-primary" />180 sqm</span>
                <span className="flex items-center gap-1.5"><BedDouble className="w-3.5 h-3.5 text-primary" />4 Bed</span>
              </div>
              <button onClick={scrollToForm} className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-3 rounded-lg font-body font-medium text-sm transition-colors duration-300">Request Full Details</button>
            </div>
          </motion.div>

          {/* Property 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
          >
            <div className="relative h-56 overflow-hidden" onTouchStart={c2.onTouchStart} onTouchEnd={c2.onTouchEnd}>
              <img src={property2} alt="Stone cottage with sea view – photo 1" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: c2.current === 0 ? 1 : 0 }} loading="lazy" />
              <img src={property3} alt="Stone cottage with sea view – photo 2" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: c2.current === 1 ? 1 : 0 }} loading="lazy" />
              <img src={property4} alt="Stone cottage with sea view – photo 3" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: c2.current === 2 ? 1 : 0 }} loading="lazy" />
              <CarouselControls count={3} current={c2.current} prev={c2.prev} next={c2.next} />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">Charming Cottage with Sea Views</h3>
              <p className="text-muted-foreground text-sm font-body mb-4">Panoramic Mediterranean views from a private balcony</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-body mb-5 flex-wrap">
                <span className="flex items-center gap-1.5"><LandPlot className="w-3.5 h-3.5 text-primary" />200 sqm</span>
                <span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5 text-primary" />120 sqm</span>
                <span className="flex items-center gap-1.5"><BedDouble className="w-3.5 h-3.5 text-primary" />3 Bed</span>
              </div>
              <button onClick={scrollToForm} className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-3 rounded-lg font-body font-medium text-sm transition-colors duration-300">Request Full Details</button>
            </div>
          </motion.div>

          {/* Property 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
          >
            <div className="relative h-56 overflow-hidden" onTouchStart={c3.onTouchStart} onTouchEnd={c3.onTouchEnd}>
              <img src={property3} alt="Luxury penthouse terrace – photo 1" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: c3.current === 0 ? 1 : 0 }} loading="lazy" />
              <img src={property1} alt="Luxury penthouse terrace – photo 2" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: c3.current === 1 ? 1 : 0 }} loading="lazy" />
              <img src={property5} alt="Luxury penthouse terrace – photo 3" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: c3.current === 2 ? 1 : 0 }} loading="lazy" />
              <CarouselControls count={3} current={c3.current} prev={c3.prev} next={c3.next} />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">Modern Penthouse Retreat</h3>
              <p className="text-muted-foreground text-sm font-body mb-4">Open-plan living with endless coastal horizons</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-body mb-5 flex-wrap">
                <span className="flex items-center gap-1.5"><LandPlot className="w-3.5 h-3.5 text-primary" />–</span>
                <span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5 text-primary" />155 sqm</span>
                <span className="flex items-center gap-1.5"><BedDouble className="w-3.5 h-3.5 text-primary" />3 Bed</span>
              </div>
              <button onClick={scrollToForm} className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-3 rounded-lg font-body font-medium text-sm transition-colors duration-300">Request Full Details</button>
            </div>
          </motion.div>

          {/* Property 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
          >
            <div className="relative h-56 overflow-hidden" onTouchStart={c4.onTouchStart} onTouchEnd={c4.onTouchEnd}>
              <img src={property4} alt="Restored stone house – photo 1" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: c4.current === 0 ? 1 : 0 }} loading="lazy" />
              <img src={property5} alt="Restored stone house – photo 2" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: c4.current === 1 ? 1 : 0 }} loading="lazy" />
              <img src={property1} alt="Restored stone house – photo 3" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: c4.current === 2 ? 1 : 0 }} loading="lazy" />
              <CarouselControls count={3} current={c4.current} prev={c4.prev} next={c4.next} />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">Historic Stone Residence</h3>
              <p className="text-muted-foreground text-sm font-body mb-4">Original character preserved, fully renovated interior</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-body mb-5 flex-wrap">
                <span className="flex items-center gap-1.5"><LandPlot className="w-3.5 h-3.5 text-primary" />280 sqm</span>
                <span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5 text-primary" />160 sqm</span>
                <span className="flex items-center gap-1.5"><BedDouble className="w-3.5 h-3.5 text-primary" />5 Bed</span>
              </div>
              <button onClick={scrollToForm} className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-3 rounded-lg font-body font-medium text-sm transition-colors duration-300">Request Full Details</button>
            </div>
          </motion.div>

          {/* Property 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
          >
            <div className="relative h-56 overflow-hidden" onTouchStart={c5.onTouchStart} onTouchEnd={c5.onTouchEnd}>
              <img src={property5} alt="Modern white villa – photo 1" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: c5.current === 0 ? 1 : 0 }} loading="lazy" />
              <img src={property4} alt="Modern white villa – photo 2" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: c5.current === 1 ? 1 : 0 }} loading="lazy" />
              <img src={property2} alt="Modern white villa – photo 3" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: c5.current === 2 ? 1 : 0 }} loading="lazy" />
              <CarouselControls count={3} current={c5.current} prev={c5.prev} next={c5.next} />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">Contemporary Hilltop Home</h3>
              <p className="text-muted-foreground text-sm font-body mb-4">Private pool and unobstructed views of the valley</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-body mb-5 flex-wrap">
                <span className="flex items-center gap-1.5"><LandPlot className="w-3.5 h-3.5 text-primary" />400 sqm</span>
                <span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5 text-primary" />210 sqm</span>
                <span className="flex items-center gap-1.5"><BedDouble className="w-3.5 h-3.5 text-primary" />4 Bed</span>
              </div>
              <button onClick={scrollToForm} className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-3 rounded-lg font-body font-medium text-sm transition-colors duration-300">Request Full Details</button>
            </div>
          </motion.div>
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
