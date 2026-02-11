import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasFired, setHasFired] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (e.clientY <= 5 && !hasFired) {
        setIsVisible(true);
        setHasFired(true);
      }
    },
    [hasFired]
  );

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you! You'll receive exclusive listings soon.");
      setFormData({ name: "", phone: "", email: "" });
      setIsSubmitting(false);
      setIsVisible(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-primary/50 backdrop-blur-sm"
            onClick={() => setIsVisible(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-card rounded-2xl shadow-2xl max-w-md w-full p-8 z-10 border border-gold/20"
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-display font-semibold text-foreground mb-3 text-center">
              Before You Go…
            </h3>
            <p className="text-muted-foreground font-body text-sm text-center mb-2">
              Some of the best homes in Zichron Yaakov are never publicly advertised.
            </p>
            <p className="text-muted-foreground font-body text-sm text-center mb-6">
              Leave your details and receive exclusive off-market opportunities directly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={100}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                maxLength={20}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                maxLength={255}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-3.5 rounded-lg font-body font-semibold text-sm transition-colors duration-300 disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Me Off-Market Homes"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
