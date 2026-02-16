import { useState, useRef, useEffect } from "react";
import { BedDouble, Ruler, LandPlot, MapPin, MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Tables } from "@/integrations/supabase/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Property = Tables<"properties_available">;

interface Props {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/* ── Swipeable Image Gallery ── */
const ImageGallery = ({
  images,
  title,
  isMobile,
}: {
  images: string[];
  title: string;
  isMobile: boolean;
}) => {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (images.length === 0) {
    return (
      <div
        className="w-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-body shrink-0"
        style={{ height: isMobile ? "min(55vh, 360px)" : "340px" }}
      >
        No image
      </div>
    );
  }

  const prev = () => setActive((c) => (c - 1 + images.length) % images.length);
  const next = () => setActive((c) => (c + 1) % images.length);

  return (
    <div
      className="relative w-full overflow-hidden bg-muted shrink-0"
      style={{ aspectRatio: "4/3", maxHeight: isMobile ? "min(55vh, 360px)" : "340px" }}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
        touchStartX.current = null;
      }}
    >
      {images.map((url, idx) => (
        <img
          key={idx}
          src={url}
          alt={`${title} – photo ${idx + 1}`}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-in-out"
          style={{ opacity: active === idx ? 1 : 0 }}
          loading={idx === 0 ? "eager" : "lazy"}
          width={800}
          height={600}
        />
      ))}
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.20), rgba(0,0,0,0.02) 45%, rgba(0,0,0,0.30))",
        }}
      />
      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-body px-2.5 py-1 rounded-full pointer-events-none">
          {active + 1} / {images.length}
        </div>
      )}
      {/* Nav arrows — vertically centered */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-white/30 hover:text-white transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-white/30 hover:text-white transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.slice(0, 8).map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === active ? "bg-white scale-125 shadow-sm" : "bg-white/50"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
            {images.length > 8 && (
              <span className="text-white/50 text-[10px] leading-none self-center">+{images.length - 8}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

/* ── Mobile Full-screen Modal ── */
const MobileModal = ({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-modal-title"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl flex flex-col overflow-hidden shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
            style={{ height: "100dvh" }}
          >
            {/* Sticky header */}
            <div
              className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 bg-background/95 backdrop-blur-md border-b border-border/40"
              style={{ paddingTop: "max(16px, env(safe-area-inset-top))" }}
            >
              <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20 absolute top-2.5 left-1/2 -translate-x-1/2" />
              <span id="mobile-modal-title" className="text-sm font-display font-semibold text-foreground truncate pr-6 max-w-[70vw]">{title}</span>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground/70 hover:bg-muted-foreground/20 transition-all shrink-0 active:scale-90"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ── Main wrapper ── */
const PropertyModal = ({ property, open, onOpenChange }: Props) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const isMobile = useIsMobile();

  if (!property) return null;

  const images = property.images || [];
  const whatsappUrl = `https://wa.me/972522820632?text=${encodeURIComponent(`Hi, I'm interested in "${property.title}" in Zichron Yaakov.`)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      full_name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      source: `property_modal:${property.title}`,
      message: `Interested in: ${property.title}`,
    });
    if (error) {
      toast.error("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
      toast.success("Thank you! We'll send you the full details shortly.");
    }
    setSubmitting(false);
  };

  const handleClose = (v: boolean) => {
    if (!v) {
      setForm({ name: "", email: "", phone: "" });
      setSubmitted(false);
    }
    onOpenChange(v);
  };

  /* ── Shared content body ── */
  const content = (
    <>
      <ImageGallery images={images} title={property.title} isMobile={isMobile} />

      <div className="px-6 py-6 space-y-5">
        {/* Title + price */}
        <div className="space-y-3">
          <h3
            className="font-display font-semibold text-foreground text-xl md:text-2xl leading-tight text-balance"
          >
            {property.title}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p
              className="font-display font-bold text-gold text-lg md:text-xl"
            >
              {property.price_label || "Price Upon Request"}
            </p>
            {property.neighborhood_note && (
              <p className="text-muted-foreground/80 font-body text-xs md:text-sm flex items-center gap-1.5 bg-muted/30 px-2 py-1 rounded-md w-fit">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                {property.neighborhood_note}
              </p>
            )}
          </div>
        </div>

        {/* Stats row — 20-24px gaps */}
        <div className="flex items-center gap-5 md:gap-6 text-sm text-muted-foreground font-body flex-wrap">
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="w-4 h-4 text-primary" />
            {property.bedrooms ? `${property.bedrooms} Bed` : "–"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ruler className="w-4 h-4 text-primary" />
            {property.built_sqm ? `${property.built_sqm} sqm` : "–"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <LandPlot className="w-4 h-4 text-primary" />
            {property.lot_sqm ? `${property.lot_sqm} sqm lot` : "–"}
          </span>
        </div>

        {/* Description — single block */}
        {property.short_description && (
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            {property.short_description}
          </p>
        )}

        {/* Bullet highlights */}
        <ul className="text-muted-foreground font-body text-sm space-y-1.5 list-disc list-inside">
          <li>Private viewing available via secure video call</li>
          <li>Assistance with legal, tax and relocation</li>
          <li>Licensed Israeli brokerage</li>
        </ul>

        {/* Scarcity line */}
        <p className="text-xs font-body italic text-muted-foreground/60 text-center">
          Limited availability in central Zichron.
        </p>

        <div className="border-t border-border" />

        {/* Conversion Block */}
        {submitted ? (
          <div className="text-center py-4 space-y-2">
            <p className="font-display font-semibold text-foreground">Thank you!</p>
            <p className="text-sm text-muted-foreground font-body">
              We'll send you full pricing and details within 1–2 business hours.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-center">
              <p className="font-display font-semibold text-foreground text-base leading-snug">
                Some properties in Zichron Yaakov are never publicly advertised.
              </p>
              <p className="text-muted-foreground font-body text-sm mt-1">
                Leave your details for full pricing and off-market access.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                className="w-full px-4 py-3.5 rounded-lg border border-border bg-card text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                className="w-full px-4 py-3.5 rounded-lg border border-border bg-card text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                maxLength={20}
                className="w-full px-4 py-3.5 rounded-lg border border-border bg-card text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-4 rounded-lg font-body font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60"
                style={{ marginBottom: isMobile ? "env(safe-area-inset-bottom, 0px)" : undefined }}
              >
                {submitting ? "Sending..." : "Unlock Full Property Details"}
              </button>
            </form>

            <p className="text-center text-xs text-muted-foreground/70 font-body leading-relaxed">
              We respond within 1–2 business hours.
              <br />
              <span className="text-muted-foreground/50">Discreet · Confidential · No spam.</span>
            </p>
          </div>
        )}

        {/* WhatsApp link — subdued */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-xs font-body font-medium text-muted-foreground hover:text-foreground transition-colors py-1.5"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[hsl(142,70%,40%)]" />
          Or message us on WhatsApp
        </a>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <MobileModal open={open} onClose={() => handleClose(false)} title={property.title}>
        {content}
      </MobileModal>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogTitle className="sr-only">{property.title}</DialogTitle>
        <DialogDescription className="sr-only">Property details and inquiry form</DialogDescription>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default PropertyModal;
