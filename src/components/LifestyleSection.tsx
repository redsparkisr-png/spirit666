import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";

import fallbackImg1 from "@/assets/guide-img-12.jpg";
import fallbackImg2 from "@/assets/guide-img-8.jpg";
import fallbackImg3 from "@/assets/guide-img-11.jpg";
import fallbackImg4 from "@/assets/guide-img-13.jpg";
import fallbackImg5 from "@/assets/guide-img-5.jpg";
import fallbackImg6 from "@/assets/guide-img-19.jpg";

interface GalleryItem {
  id: string;
  image_url: string;
  display_order: number;
  title_en: string;
  title_he: string;
  description_en: string;
  description_he: string;
  alt_en: string;
  alt_he: string;
}

const FALLBACK_ITEMS: GalleryItem[] = [
  { id: "f1", image_url: fallbackImg1, display_order: 1, title_en: "Mediterranean Sea Views", title_he: "נוף לים התיכון", description_en: "Golden sunsets just minutes from home", description_he: "שקיעות מרהיבות מעל הים", alt_en: "Mediterranean sea view from Zichron Yaakov", alt_he: "נוף ים תיכוני מזכרון יעקב" },
  { id: "f2", image_url: fallbackImg2, display_order: 2, title_en: "Historic Stone Houses", title_he: "בתי אבן היסטוריים", description_en: "Timeless architecture with modern charm", description_he: "אדריכלות נצחית עם קסם מודרני", alt_en: "Historic stone houses in Zichron Yaakov", alt_he: "בתי אבן היסטוריים בזכרון יעקב" },
  { id: "f3", image_url: fallbackImg3, display_order: 3, title_en: "Pedestrian Street Life", title_he: "חיי רחוב מדרחוב", description_en: "Boutiques, cafés and vibrant culture", description_he: "בוטיקים, בתי קפה ותרבות תוססת", alt_en: "Pedestrian street in Zichron Yaakov", alt_he: "מדרחוב זכרון יעקב" },
  { id: "f4", image_url: fallbackImg4, display_order: 4, title_en: "Nature & Gardens", title_he: "טבע וגנים", description_en: "Green spaces and scenic walking trails", description_he: "שטחים ירוקים ושבילי הליכה", alt_en: "Nature and gardens in Zichron Yaakov", alt_he: "טבע וגנים בזכרון יעקב" },
  { id: "f5", image_url: fallbackImg5, display_order: 5, title_en: "Vineyards & Wine", title_he: "כרמים ויין", description_en: "Israel's original wine country heritage", description_he: "מורשת היין המקורית של ישראל", alt_en: "Vineyards in Zichron Yaakov", alt_he: "כרמים בזכרון יעקב" },
  { id: "f6", image_url: fallbackImg6, display_order: 6, title_en: "Family-Friendly Living", title_he: "חיים משפחתיים", description_en: "Safe neighborhoods, warm community", description_he: "שכונות בטוחות, קהילה חמה", alt_en: "Family life in Zichron Yaakov", alt_he: "חיי משפחה בזכרון יעקב" },
];

const LifestyleSection = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const { t } = useSiteContent();

  useEffect(() => {
    supabase
      .from("lifestyle_gallery")
      .select("*")
      .order("display_order")
      .then(({ data }) => {
        if (data && data.length > 0) {
          setItems(data.map((d: any) => ({
            id: d.id,
            image_url: d.image_url,
            display_order: d.display_order,
            title_en: d.title_en || "",
            title_he: d.title_he || "",
            description_en: d.description_en || "",
            description_he: d.description_he || "",
            alt_en: d.alt_en || "",
            alt_he: d.alt_he || "",
          })));
        }
      });
  }, []);

  const display = items.length > 0 ? items : FALLBACK_ITEMS;

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-sand-light">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            {t("home.lifestyle.title")}
          </h2>
          <div className="text-muted-foreground font-body max-w-lg mx-auto text-base md:text-lg space-y-2">
            <p>{t("home.lifestyle.bullet_1")}</p>
            <p>{t("home.lifestyle.bullet_2")}</p>
            <p>{t("home.lifestyle.bullet_3")}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 max-w-5xl mx-auto">
          {display.map((item, idx) => {
            const title = isHe ? item.title_he : item.title_en;
            const desc = isHe ? item.description_he : item.description_en;
            const alt = (isHe ? item.alt_he : item.alt_en) || title || `Zichron Yaakov lifestyle ${idx + 1}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-500 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                tabIndex={0}
                role="figure"
                aria-label={title || alt}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={alt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 group-focus-within:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Desktop: overlay on hover/focus */}
                <div
                  className="absolute inset-0 hidden md:flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
                  aria-hidden="false"
                >
                  <div className="absolute inset-0 bg-foreground/45" />
                  <div className="relative z-10" dir={isHe ? "rtl" : "ltr"}>
                    {title && (
                      <p className="text-primary-foreground font-display text-lg font-semibold drop-shadow-md">
                        {title}
                      </p>
                    )}
                    {desc && (
                      <p className="text-primary-foreground/90 font-body text-sm mt-1 drop-shadow-sm">
                        {desc}
                      </p>
                    )}
                    <div className="h-[2px] w-10 bg-gold mt-3 scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 origin-left transition-transform duration-500 delay-100" />
                  </div>
                </div>

                {/* Mobile: permanent text at bottom */}
                <div className="md:hidden absolute bottom-0 inset-x-0" dir={isHe ? "rtl" : "ltr"}>
                  <div className="bg-gradient-to-t from-foreground/70 via-foreground/40 to-transparent pt-10 pb-4 px-4">
                    {title && (
                      <p className="text-primary-foreground font-display text-base font-semibold drop-shadow-md">
                        {title}
                      </p>
                    )}
                    {desc && (
                      <p className="text-primary-foreground/85 font-body text-xs mt-0.5 drop-shadow-sm">
                        {desc}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-muted-foreground font-body text-sm italic mt-12"
        >
          {t("home.lifestyle.bottom_line")}
        </motion.p>
      </div>
    </section>
  );
};

export default LifestyleSection;
