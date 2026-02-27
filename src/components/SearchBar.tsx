import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface Option {
  id: string;
  name_en: string;
  name_he: string;
}

const BEDROOM_OPTIONS = ["2+", "3+", "4+", "5+", "6+"];

const formatPrice = (val: number) => {
  if (val >= 1_000_000) return `₪${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000) return `₪${(val / 1_000).toFixed(0)}K`;
  return `₪${val}`;
};

interface SearchBarProps {
  initialLocation?: string;
  initialType?: string;
  initialBeds?: string;
  initialPriceMin?: string;
  initialPriceMax?: string;
  inline?: boolean;
}

const SearchBar = ({
  initialLocation = "",
  initialType = "",
  initialBeds = "",
  initialPriceMin,
  initialPriceMax,
  inline = false,
}: SearchBarProps) => {
  const { lang } = useLanguage();
  const { t } = useSiteContent();
  const navigate = useNavigate();

  const [locations, setLocations] = useState<Option[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<Option[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20_000_000]);
  const [dataRange, setDataRange] = useState<[number, number]>([0, 20_000_000]);

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedBeds, setSelectedBeds] = useState(initialBeds);

  useEffect(() => {
    Promise.all([
      supabase.from("search_locations").select("*").order("display_order"),
      supabase.from("search_property_types").select("*").order("display_order"),
      supabase.from("properties_available").select("price_number").not("price_number", "is", null),
    ]).then(([locRes, typeRes, priceRes]) => {
      if (locRes.data) setLocations(locRes.data);
      if (typeRes.data) setPropertyTypes(typeRes.data);
      if (priceRes.data && priceRes.data.length > 0) {
        const prices = priceRes.data.map((p) => Number(p.price_number)).filter((n) => n > 0);
        if (prices.length > 0) {
          const min = Math.min(...prices);
          const max = Math.max(...prices);
          setDataRange([min, max]);
          setPriceRange([
            initialPriceMin ? Number(initialPriceMin) : min,
            initialPriceMax ? Number(initialPriceMax) : max,
          ]);
        }
      }
    });
  }, []);

  const getName = useCallback(
    (opt: Option) => (lang === "he" ? opt.name_he : opt.name_en),
    [lang]
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedLocation) params.set("location", selectedLocation);
    if (selectedType) params.set("type", selectedType);
    if (selectedBeds) params.set("beds", selectedBeds);
    if (priceRange[0] > dataRange[0]) params.set("priceMin", String(priceRange[0]));
    if (priceRange[1] < dataRange[1]) params.set("priceMax", String(priceRange[1]));
    navigate(`/${lang}/properties?${params.toString()}`);
  };

  const selectClass =
    "bg-transparent border border-white/20 text-white rounded-lg px-3 py-2.5 text-sm font-body focus:outline-none focus:ring-1 focus:ring-white/30 appearance-none cursor-pointer min-w-0";
  const inlineSelectClass =
    "bg-card border border-border text-foreground rounded-lg px-3 py-2.5 text-sm font-body focus:outline-none focus:ring-1 focus:ring-charcoal/30 appearance-none cursor-pointer min-w-0";

  const sc = inline ? inlineSelectClass : selectClass;

  return (
    <div
      className={
        inline
          ? "bg-card rounded-xl p-4 md:p-6 border border-border"
          : "max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/15"
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-end">
        {/* Location */}
        <div className="flex flex-col gap-1.5">
          <label className={`text-xs font-body ${inline ? "text-muted-foreground" : "text-white/60"}`}>
            {t("search.location")}
          </label>
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className={sc}>
            <option value="">{t("search.all_locations")}</option>
            {locations.map((loc) => (
              <option key={loc.id} value={getName(loc)}>
                {getName(loc)}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div className="flex flex-col gap-1.5">
          <label className={`text-xs font-body ${inline ? "text-muted-foreground" : "text-white/60"}`}>
            {t("search.property_type")}
          </label>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className={sc}>
            <option value="">{t("search.all_types")}</option>
            {propertyTypes.map((pt) => (
              <option key={pt.id} value={getName(pt)}>
                {getName(pt)}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div className="flex flex-col gap-1.5">
          <label className={`text-xs font-body ${inline ? "text-muted-foreground" : "text-white/60"}`}>
            {t("search.bedrooms")}
          </label>
          <select value={selectedBeds} onChange={(e) => setSelectedBeds(e.target.value)} className={sc}>
            <option value="">{t("search.any")}</option>
            {BEDROOM_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
          <label className={`text-xs font-body ${inline ? "text-muted-foreground" : "text-white/60"}`}>
            {t("search.price_range")}
          </label>
          <div className="space-y-2">
            <SliderPrimitive.Root
              value={priceRange}
              onValueChange={(val) => setPriceRange(val as [number, number])}
              min={dataRange[0]}
              max={dataRange[1]}
              step={50000}
              className="relative flex w-full touch-none select-none items-center h-5"
            >
              <SliderPrimitive.Track
                className={`relative h-1.5 w-full grow overflow-hidden rounded-full ${
                  inline ? "bg-muted" : "bg-white/20"
                }`}
              >
                <SliderPrimitive.Range className={`absolute h-full ${inline ? "bg-charcoal" : "bg-gold"}`} />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb
                className={`block h-4 w-4 rounded-full border-2 shadow-sm focus-visible:outline-none ${
                  inline
                    ? "bg-card border-charcoal"
                    : "bg-white border-white/80"
                }`}
              />
              <SliderPrimitive.Thumb
                className={`block h-4 w-4 rounded-full border-2 shadow-sm focus-visible:outline-none ${
                  inline
                    ? "bg-card border-charcoal"
                    : "bg-white border-white/80"
                }`}
              />
            </SliderPrimitive.Root>
            <div className={`flex justify-between text-[11px] font-body ${inline ? "text-muted-foreground" : "text-white/50"}`}>
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="col-span-2 md:col-span-1 flex items-end">
          <button
            onClick={handleSearch}
            className="w-full bg-charcoal hover:bg-charcoal-hover text-white py-2.5 rounded-lg font-body font-medium text-sm transition-colors flex items-center justify-center gap-2 border border-gold/30"
            aria-label={t("search.button")}
          >
            <Search className="w-4 h-4" />
            {t("search.button")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
