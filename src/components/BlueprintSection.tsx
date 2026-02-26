import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import { FileText } from "lucide-react";

const BlueprintSection = () => {
  const { t } = useSiteContent();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error(t("home.contact.validation_error"));
      return;
    }
    setIsSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      full_name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      source: "blueprint_guide",
    });
    if (error) {
      toast.error(t("home.blueprint.error"));
    } else {
      toast.success(t("home.blueprint.success"));
      setFormData({ name: "", email: "", phone: "" });
    }
    setIsSubmitting(false);
  };

  return (
    <section id="blueprint" className="py-12 md:py-20 lg:py-24 bg-card">
      <div className="container px-6">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display font-semibold text-foreground mb-4">
              {t("home.blueprint.title")}
            </h2>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              {t("home.blueprint.subtitle")}
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder={t("home.blueprint.placeholder_name")}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              maxLength={100}
              className="w-full px-5 py-4 rounded-lg border border-border bg-background text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <input
              type="email"
              placeholder={t("home.blueprint.placeholder_email")}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              maxLength={255}
              className="w-full px-5 py-4 rounded-lg border border-border bg-background text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <input
              type="tel"
              placeholder={t("home.blueprint.placeholder_phone")}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              maxLength={20}
              className="w-full px-5 py-4 rounded-lg border border-border bg-background text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-4 rounded-lg font-body font-semibold transition-colors duration-300 disabled:opacity-60"
              style={{ fontSize: "17px" }}
            >
              {isSubmitting ? t("home.blueprint.sending") : t("home.blueprint.button")}
            </button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center mt-5 text-xs text-muted-foreground/70 font-body italic"
          >
            {t("home.blueprint.trust_text")}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default BlueprintSection;
