import { MessageCircle, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";

const FloatingElements = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useSiteContent();

  useEffect(() => {
    const handleCookie = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setCookieBannerVisible(detail === "visible");
    };
    window.addEventListener("cookie-banner", handleCookie);

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
    window.open("https://wa.me/972522820632?text=" + encodeURIComponent("Hi Hagit,\nI'm looking at homes in Zichron Yaakov and would love to learn more.\nCould you also send me the buying guide?"), "_blank");
  };

  const scrollToHomes = () => {
    document.getElementById("available-homes")?.scrollIntoView({ behavior: "smooth" });
  };

  if (modalOpen) return null;

  const bottomOffset = cookieBannerVisible ? "bottom-36 md:bottom-6" : "bottom-6";

  return (
    <>
      <AnimatePresence>
        <div className={`fixed ${bottomOffset} right-6 z-40 transition-all duration-300 rtl:right-auto rtl:left-6`}>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute bottom-full right-0 rtl:right-auto rtl:left-0 mb-2 bg-card border border-border rounded-lg shadow-lg px-3 py-2 whitespace-nowrap"
            >
              <p className="text-xs font-body text-foreground">
                {t("home.floating.tooltip") || "Questions? Chat with us on WhatsApp."}
              </p>
            </motion.div>
          )}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.4 }}
            onClick={openWhatsApp}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Contact us on WhatsApp"
          >
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </motion.button>
        </div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        className={`fixed ${bottomOffset} left-6 z-40 transition-all duration-300 rtl:left-auto rtl:right-6`}
        style={{ bottom: cookieBannerVisible ? 144 : 72 }}
      >
        <button
          onClick={scrollToHomes}
          className="bg-card/95 backdrop-blur-sm border border-border hover:bg-card text-foreground px-5 py-3 rounded-full font-body text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <Home className="w-4 h-4 text-gold" />
          <span className="hidden sm:inline">{t("home.floating.homes_button")}</span>
          <span className="sm:hidden">{t("home.floating.homes_button_mobile")}</span>
        </button>
      </motion.div>
    </>
  );
};

export default FloatingElements;
