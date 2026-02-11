import { motion } from "framer-motion";
import sold1 from "@/assets/sold-1.jpg";
import sold2 from "@/assets/sold-2.jpg";
import sold3 from "@/assets/sold-3.jpg";
import sold4 from "@/assets/sold-4.jpg";

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
          {/* Sold Property 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative rounded-xl overflow-hidden group"
          >
            <div className="relative h-52">
              <img src={sold1} alt="Sold stone villa with garden" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-primary/15" />
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-body font-semibold tracking-wider uppercase px-3 py-1.5 rounded">Sold</div>
            </div>
            <div className="p-4 bg-card">
              <p className="text-sm font-body text-foreground">Family villa in the historic quarter</p>
            </div>
          </motion.div>

          {/* Sold Property 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative rounded-xl overflow-hidden group"
          >
            <div className="relative h-52">
              <img src={sold2} alt="Sold apartment building with balconies" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-primary/15" />
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-body font-semibold tracking-wider uppercase px-3 py-1.5 rounded">Sold</div>
            </div>
            <div className="p-4 bg-card">
              <p className="text-sm font-body text-foreground">Charming apartment near the main street</p>
            </div>
          </motion.div>

          {/* Sold Property 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative rounded-xl overflow-hidden group"
          >
            <div className="relative h-52">
              <img src={sold3} alt="Sold family home with garden" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-primary/15" />
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-body font-semibold tracking-wider uppercase px-3 py-1.5 rounded">Sold</div>
            </div>
            <div className="p-4 bg-card">
              <p className="text-sm font-body text-foreground">Spacious home with countryside views</p>
            </div>
          </motion.div>

          {/* Sold Property 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="relative rounded-xl overflow-hidden group"
          >
            <div className="relative h-52">
              <img src={sold4} alt="Sold stone house with pool and sea view" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-primary/15" />
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-body font-semibold tracking-wider uppercase px-3 py-1.5 rounded">Sold</div>
            </div>
            <div className="p-4 bg-card">
              <p className="text-sm font-body text-foreground">Renovated residence with panoramic terrace</p>
            </div>
          </motion.div>
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
