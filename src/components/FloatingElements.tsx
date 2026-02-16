import { MessageCircle, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const FloatingElements = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Listen for cookie banner events
    const handleCookie = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setCookieBannerVisible(detail === "visible");
    };
    window.addEventListener("cookie-banner", handleCookie);

    // Listen for property modal open/close via radix data attribute
    const observer = new MutationObserver(() => {
      const dialogOverlay = document.querySelector("[data-state='open'][role='dialog']");
      setModalOpen(!!dialogOverlay);
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-state"] });

    return () => {
      window.removeEventListener("cookie-banner", handleCookie);
      observer.disconnect();
    };
  }, []);

  const openWhatsApp = () => {
    window.open("https://wa.me/972522820632?text=Hi, I'm interested in homes for sale in Zichron Yaakov", "_blank");
  };

  const scrollToHomes = () => {
    document.getElementById("available-homes")?.scrollIntoView({ behavior: "smooth" });
  };

  // Hide both floating elements when modal is open
  if (modalOpen) return null;

  const bottomOffset = cookieBannerVisible ? "bottom-36 md:bottom-6" : "bottom-6";

  return (
    <>
      {/* WhatsApp floating button */}
      <AnimatePresence>
        <div className={`fixed ${bottomOffset} right-6 z-50 transition-all duration-300`}>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-lg shadow-lg px-3 py-2 whitespace-nowrap"
            >
              <p className="text-xs font-body text-foreground">Speak directly with a local expert</p>
            </motion.div>
          )}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.4 }}
            onClick={openWhatsApp}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="w-14 h-14 bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Contact us on WhatsApp"
          >
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </motion.button>
        </div>
      </AnimatePresence>

      {/* Sticky bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        className={`fixed ${bottomOffset} left-6 z-50 transition-all duration-300`}
      >
        <button
          onClick={scrollToHomes}
          className="bg-card/95 backdrop-blur-sm border border-border hover:bg-card text-foreground px-5 py-3 rounded-full font-body text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <Home className="w-4 h-4 text-gold" />
          <span className="hidden sm:inline">Homes for Sale in Zichron Yaakov</span>
          <span className="sm:hidden">View Homes</span>
        </button>
      </motion.div>
    </>
  );
};

export default FloatingElements;
