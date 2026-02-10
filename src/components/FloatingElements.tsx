import { MessageCircle, Home } from "lucide-react";
import { motion } from "framer-motion";

const FloatingElements = () => {
  const openWhatsApp = () => {
    window.open("https://wa.me/972000000000?text=Hi, I'm interested in homes for sale in Zichron Yaakov", "_blank");
  };

  const scrollToHomes = () => {
    document.getElementById("available-homes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* WhatsApp floating button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.4 }}
        onClick={openWhatsApp}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-[hsl(0,0%,100%)]" />
      </motion.button>

      {/* Sticky bottom bar - mobile-optimized */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        className="fixed bottom-6 left-6 z-50 md:bottom-6 md:left-6"
      >
        <button
          onClick={scrollToHomes}
          className="bg-card/95 backdrop-blur-sm border border-border hover:bg-card text-foreground px-5 py-3 rounded-full font-body text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <Home className="w-4 h-4 text-primary" />
          <span className="hidden sm:inline">Homes for Sale in Zichron Yaakov</span>
          <span className="sm:hidden">View Homes</span>
        </button>
      </motion.div>
    </>
  );
};

export default FloatingElements;
