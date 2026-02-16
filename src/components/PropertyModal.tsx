import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BedDouble, Ruler, LandPlot, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Property = Tables<"properties_available">;

interface Props {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PropertyModal = ({ property, open, onOpenChange }: Props) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (!property) return null;

  const images = property.images || [];
  const featuredImage = images[activeImage] || images[0];

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
      setActiveImage(0);
    }
    onOpenChange(v);
  };

  const whatsappUrl = `https://wa.me/972522820632?text=${encodeURIComponent(`Hi, I'm interested in "${property.title}" in Zichron Yaakov.`)}`;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogTitle className="sr-only">{property.title}</DialogTitle>
        <DialogDescription className="sr-only">Property details and inquiry form</DialogDescription>

        {/* Featured Image — mobile: capped height with gradient overlay */}
        {featuredImage && (
          <div
            className="relative w-full overflow-hidden bg-muted"
            style={{ maxHeight: "clamp(220px, 32vh, 340px)" }}
          >
            <div className="aspect-[4/3] w-full">
              <img
                src={featuredImage}
                alt={property.title}
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </div>
            {/* Strong gradient overlay for text readability */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.10) 50%, rgba(0,0,0,0.20))",
              }}
            />
            {/* Title overlaid on image for mobile impact */}
            <div className="absolute bottom-0 inset-x-0 p-4 md:hidden">
              <h3
                className="font-display font-semibold text-white text-lg leading-snug"
                style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
              >
                {property.title}
              </h3>
              {property.neighborhood_note && (
                <p
                  className="text-white/80 font-body text-xs mt-0.5"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                >
                  {property.neighborhood_note}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-1.5 px-4 pt-3 overflow-x-auto scrollbar-hide">
            {images.map((url, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                  activeImage === idx
                    ? "border-primary opacity-100"
                    : "border-transparent opacity-60 hover:opacity-90"
                }`}
              >
                <img src={url} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        <div className="p-5 md:p-6 space-y-4 md:space-y-5">
          {/* Title & Price — desktop only (mobile title is overlaid on image) */}
          <div className="hidden md:block">
            <h3 className="font-display font-semibold text-foreground text-xl">
              {property.title}
            </h3>
            {property.neighborhood_note && (
              <p className="text-muted-foreground font-body text-sm mt-0.5">
                {property.neighborhood_note}
              </p>
            )}
          </div>

          {/* Price */}
          <p className="text-primary font-body font-semibold text-sm">
            {property.price_label || "Price Upon Request"}
          </p>

          {/* Stats Row */}
          <div className="flex items-center gap-4 md:gap-5 text-sm text-muted-foreground font-body flex-wrap">
            <span className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-primary" />
              {property.bedrooms ? `${property.bedrooms} Bed` : "–"}
            </span>
            <span className="flex items-center gap-1.5">
              <Ruler className="w-4 h-4 text-primary" />
              {property.built_sqm ? `${property.built_sqm} sqm built` : "–"}
            </span>
            <span className="flex items-center gap-1.5">
              <LandPlot className="w-4 h-4 text-primary" />
              {property.lot_sqm ? `${property.lot_sqm} sqm lot` : "–"}
            </span>
            {property.neighborhood_note && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                {property.neighborhood_note}
              </span>
            )}
          </div>

          {/* Description */}
          {property.short_description && (
            <p className="text-muted-foreground font-body text-sm leading-relaxed line-clamp-6">
              {property.short_description}
            </p>
          )}

          <p className="text-xs text-muted-foreground/70 font-body italic">
            Private viewing available via secure video call.
          </p>

          {/* Divider */}
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
            <div className="space-y-4">
              <div className="text-center">
                <p className="font-display font-semibold text-foreground text-base leading-snug">
                  Some properties in Zichron Yaakov are never publicly advertised.
                </p>
                <p className="text-muted-foreground font-body text-sm mt-1.5">
                  Leave your details to receive full pricing, availability, and access to off-market opportunities.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={100}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={255}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  maxLength={20}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-3.5 rounded-lg font-body font-semibold text-sm transition-colors duration-300 disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Unlock Full Property Details"}
                </button>
              </form>

              <p className="text-center text-xs text-muted-foreground/70 font-body">
                We respond within 1–2 business hours.
              </p>
            </div>
          )}

          {/* WhatsApp quick link */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm font-body font-medium text-foreground hover:text-primary transition-colors py-2"
          >
            <MessageCircle className="w-4 h-4 text-[hsl(142,70%,40%)]" />
            Quick contact via WhatsApp
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyModal;
