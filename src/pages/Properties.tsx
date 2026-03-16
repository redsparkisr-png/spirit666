import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LandPlot, Ruler, BedDouble, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { useRef } from "react";

type Property = Tables<"properties_available">;

const useCarousel = (count: number) => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const next = (e: React.MouseEvent) => { e.stopPropagation(); e.preventDefault(); setCurrent((c) => (c + 1) % count); };
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); e.preventDefault(); setCurrent((c) => (c - 1 + count) % count); };
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setCurrent((c) => (c + 1) % count);
      else setCurrent((c) => (c - 1 + count) % count);
    }
    touchStartX.current = null;
  };
  return { current, next, prev, onTouchStart, onTouchEnd };
};

const PropertyCard = ({ property }: { property: Property }) => {
  const { lang } = useLanguage();
  const { t } = useSiteContent();
  const images = property.images || [];
  const carousel = useCarousel(Math.max(images.length, 1));

  return (
    <Link
      to={`/${lang}/property/${property.slug || property.id}`}
      className="block bg-card rounded-2xl overflow-hidden shadow-md md:hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted" onTouchStart={carousel.onTouchStart} onTouchEnd={carousel.onTouchEnd}>
        {images.length === 0 && (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-body">No image</div>
        )}
        {images.map((url, idx) => (
          <img key={idx} src={url} alt={`${property.title} – photo ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: carousel.current === idx ? 1 : 0 }} loading="lazy" />
        ))}
        {images.length > 1 && (
          <>
            <button onClick={carousel.prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Previous">
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button onClick={carousel.next} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Next">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </>
        )}
        {property.property_status && property.property_status !== "Active" && (
          <span className="absolute top-3 left-3 bg-charcoal text-white text-xs font-body font-medium px-2.5 py-1 rounded-full">{property.property_status}</span>
        )}
      </div>
      <div className="p-5 text-start">
        {/* Price — premium badge */}
        {(property.price_label || property.price_number) && (
          <div className="mb-3">
            <span className="inline-block bg-gold/10 border border-gold/20 rounded-lg px-3 py-1.5 text-sm font-body font-semibold text-gold">
              {property.price_label
                ? property.price_label
                : lang === "he"
                  ? `₪${Number(property.price_number).toLocaleString()}`
                  : `ILS ${Number(property.price_number).toLocaleString()}`}
            </span>
          </div>
        )}
        <h3 className="text-lg font-display font-semibold text-foreground mb-1 leading-snug">{property.title}</h3>
        {property.short_description && (
          <p className="text-muted-foreground text-sm font-body mb-3 line-clamp-2">{property.short_description}</p>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-body mb-4 flex-wrap">
          {property.bedrooms && (<span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-primary" /> {property.bedrooms} {t("search.beds_label")}</span>)}
          {property.built_sqm && (<span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5 text-primary" /> {property.built_sqm} {lang === "he" ? 'מ"ר' : "sqm"}</span>)}
          {property.lot_sqm && (<span className="flex items-center gap-1"><LandPlot className="w-3.5 h-3.5 text-primary" /> {property.lot_sqm} {lang === "he" ? 'מ"ר' : "sqm"}</span>)}
        </div>
        <span className="block w-full bg-charcoal text-white py-3 rounded-full font-body font-medium text-sm btn-text text-center transition-all duration-300 group-hover:bg-charcoal-hover group-hover:shadow-md">
          {lang === "he" ? "לפרטי הנכס" : "View Property Details"}
        </span>
      </div>
    </Link>
  );
};

const Properties = () => {
  const [searchParams] = useSearchParams();
  const { t } = useSiteContent();
  const { lang } = useLanguage();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");

  const locFilter = searchParams.get("location") || "";
  const typeFilter = searchParams.get("type") || "";
  const bedsFilter = searchParams.get("beds") || "";
  const priceMinFilter = searchParams.get("priceMin") || "";
  const priceMaxFilter = searchParams.get("priceMax") || "";

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      let query = supabase.from("properties_available").select("*");
      if (locFilter) {
        const locs = locFilter.split(",").filter(Boolean);
        if (locs.length === 1) query = query.eq("location", locs[0]);
        else if (locs.length > 1) query = query.in("location", locs);
      }
      if (typeFilter) query = query.eq("property_type", typeFilter);
      if (bedsFilter) {
        const minBeds = parseInt(bedsFilter);
        if (!isNaN(minBeds)) query = query.gte("bedrooms", minBeds);
      }
      if (priceMinFilter) query = query.gte("price_number", Number(priceMinFilter));
      if (priceMaxFilter) query = query.lte("price_number", Number(priceMaxFilter));

      if (sort === "price_asc") query = query.order("price_number", { ascending: true, nullsFirst: false });
      else if (sort === "price_desc") query = query.order("price_number", { ascending: false, nullsFirst: false });
      else query = query.order("created_at", { ascending: false });

      const { data } = await query;
      setProperties(data || []);
      setLoading(false);
    };
    fetchProperties();
  }, [locFilter, typeFilter, bedsFilter, priceMinFilter, priceMaxFilter, sort]);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container px-6 py-8 md:py-12">
        <BreadcrumbNav items={[{ label: t("header.nav.properties") }]} />
        <SearchBar inline initialLocation={locFilter} initialType={typeFilter} initialBeds={bedsFilter} initialPriceMin={priceMinFilter} initialPriceMax={priceMaxFilter} />
        <div className="flex items-center justify-between mt-8 mb-6">
          <p className="text-sm text-muted-foreground font-body">{loading ? "..." : `${properties.length} ${t("properties.results_count")}`}</p>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-sm font-body border border-border rounded-lg px-3 py-1.5 bg-card text-foreground focus:outline-none">
            <option value="newest">{t("properties.sort_newest")}</option>
            <option value="price_asc">{t("properties.sort_price_low")}</option>
            <option value="price_desc">{t("properties.sort_price_high")}</option>
          </select>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-md">
                <div className="aspect-[4/3] bg-muted animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-muted rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-body">{t("properties.no_results")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (<PropertyCard key={p.id} property={p} />))}
          </div>
        )}

        {/* SEO internal links */}
        <div className="mt-12 pt-8 border-t border-border text-center space-y-3">
          <p className="text-sm text-muted-foreground font-body">
            {lang === "he"
              ? "מחפשים מידע נוסף על רכישת נכס בזכרון יעקב?"
              : "Looking for more information about buying property in Zichron Yaakov?"}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-body">
            <Link to={`/${lang}/buying-property-zichron-yaakov`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {lang === "he" ? "מדריך רכישת נכס" : "Buying Property Guide"}
            </Link>
            <Link to={`/${lang}/living-in-zichron-yaakov`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {lang === "he" ? "חיים בזכרון יעקב" : "Living in Zichron Yaakov"}
            </Link>
            <Link to={`/${lang}/guides`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {lang === "he" ? "מדריכים ותובנות" : "Guides & Insights"}
            </Link>
            <Link to={`/${lang}/contact`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {lang === "he" ? "צרו קשר" : "Contact Us"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Properties;
