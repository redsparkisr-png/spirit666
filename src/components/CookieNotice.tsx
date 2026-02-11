import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CookieNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies_accepted");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookies_accepted", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[90] bg-card border border-border rounded-xl shadow-lg px-6 py-4 flex items-center gap-4 max-w-md w-[calc(100%-2rem)]"
        >
          <p className="text-foreground font-body text-sm flex-1">
            This website uses cookies to improve user experience and marketing performance.
          </p>
          <button
            onClick={accept}
            className="bg-gold hover:bg-gold-hover text-primary-foreground px-5 py-2 rounded-lg font-body font-medium text-sm transition-colors shrink-0"
          >
            Accept
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieNotice;
