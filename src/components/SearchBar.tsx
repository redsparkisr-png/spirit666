import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, X, Check, SlidersHorizontal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useIsMobile } from "@/hooks/use-mobile";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { motion, AnimatePresence } from "framer-motion";

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

/* ─── Custom Dropdown ─── */
interface DropdownProps {
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  value: string | string[];
  onChange: (val: string | string[]) => void;
  multi?: boolean;
  inline?: boolean;
  isMobile?: boolean;
}

const Dropdown = ({ label, placeholder, options, value, onChange, multi, inline, isMobile }: DropdownProps) => {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = multi ? (value as string[]) : value ? [value as string] : [];

  // ESC key handler
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);
  const displayText = selected.length > 0
    ? selected.length === 1
      ? options.find((o) => o.value === selected[0])?.label || selected[0]
      : `${selected.length} selected`
    : placeholder;

  useEffect(() => {
    if (!open || isMobile) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, isMobile]);

  useEffect(() => {
    if (isMobile && open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [isMobile, open]);

  const toggleOption = (val: string) => {
    if (multi) {
      const arr = value as string[];
      if (arr.includes(val)) onChange(arr.filter((v) => v !== val));
      else onChange([...arr, val]);
    } else {
      onChange(val === value ? "" : val);
      setOpen(false);
    }
  };

  const clearAll = () => {
    onChange(multi ? [] : "");
  };

  // Underline-style for hero, boxed for inline
   const triggerClasses = inline
    ? "flex items-center justify-between w-full bg-card border border-border text-foreground rounded-lg px-3 py-2.5 text-sm font-body cursor-pointer hover:border-charcoal/30 transition-colors"
    : "flex items-center justify-between w-full bg-white/[0.10] border border-white/30 text-white rounded-lg px-3 py-2.5 text-sm font-body font-medium cursor-pointer hover:border-white/50 transition-colors";

  const renderOptions = (forLightBg: boolean) => (
    <div className="py-1.5 max-h-[320px] overflow-y-auto">
      {options.map((opt) => {
        const isSelected = selected.includes(opt.value);
        const useLightColors = forLightBg || inline;
        return (
          <button
            key={opt.value}
            onClick={() => toggleOption(opt.value)}
            className={`w-full text-left px-4 py-2.5 text-sm font-body flex items-center justify-between transition-colors ${
              isSelected
                ? useLightColors
                  ? "bg-charcoal/5 text-foreground font-medium"
                  : "bg-white/10 text-white font-medium"
                : useLightColors
                  ? "text-foreground/80 hover:bg-muted"
                  : "text-white/70 hover:bg-white/10"
            }`}
          >
            <span>{opt.label}</span>
            {isSelected && <Check className="w-4 h-4 text-gold flex-shrink-0" />}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col gap-1 relative" ref={ref}>
      <span className={`text-[11px] font-body font-semibold tracking-wide uppercase ${inline ? "text-muted-foreground" : "text-white/80"}`}>{label}</span>
      <button onClick={() => setOpen(!open)} className={triggerClasses}>
        <span className={selected.length === 0 ? "opacity-70" : ""}>{displayText}</span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Desktop: inline dropdown */}
      <AnimatePresence>
        {open && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full left-0 right-0 mt-1.5 z-[200] rounded-xl shadow-xl border ${
              inline
                ? "bg-card border-border"
                : "bg-charcoal border-white/15"
            }`}
            style={{ minWidth: 200, maxHeight: 420, overflowY: "auto" }}
          >
            {renderOptions(inline)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile: true bottom sheet via portal */}
      {isMobile && open && createPortal(
        <>
          <div
            className="fixed inset-0 z-[200] bg-black/50"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ transform: "translateY(100%)" }}
            animate={{ transform: "translateY(0%)" }}
            exit={{ transform: "translateY(100%)" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 right-0 bottom-0 z-[201] bg-card flex flex-col"
            style={{ maxHeight: "70vh", borderRadius: "16px 16px 0 0" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <h3 className="font-display font-semibold text-foreground text-base">{label}</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-2">
              {renderOptions(true)}
            </div>
            <div className="border-t border-border px-5 py-4 flex gap-3">
              {selected.length > 0 && (
                <button onClick={clearAll} className="text-sm text-muted-foreground font-body hover:text-foreground transition-colors">
                  {lang === "he" ? "נקה" : "Clear"}
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="flex-1 bg-charcoal text-white py-3 rounded-lg font-body font-medium text-sm transition-colors"
              >
                {lang === "he" ? "החל" : "Apply"}
              </button>
            </div>
          </motion.div>
        </>,
        document.body
      )}
    </div>
  );
};

/* ─── More Filters Bottom Sheet (Mobile) ─── */
interface MoreFiltersSheetProps {
  beds: string;
  onBedsChange: (val: string) => void;
  maxPrice: number;
  onMaxPriceChange: (val: number) => void;
  dataMax: number;
  onClose: () => void;
}

const MoreFiltersSheet = ({ beds, onBedsChange, maxPrice, onMaxPriceChange, dataMax, onClose }: MoreFiltersSheetProps) => {
  const { t } = useSiteContent();
  const { lang } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="absolute bottom-0 left-0 right-0 bg-card rounded-t-2xl max-h-[70vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <h3 className="font-display font-semibold text-foreground text-base">{t("search.more_filters")}</h3>
          <button onClick={onClose} className="text-muted-foreground" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          {/* Bedrooms */}
          <div>
            <p className="text-sm font-body font-medium text-foreground mb-3">{t("search.bedrooms")}</p>
            <div className="flex gap-2 flex-wrap">
              {BEDROOM_OPTIONS.map((b) => (
                <button
                  key={b}
                  onClick={() => onBedsChange(beds === b ? "" : b)}
                  className={`px-4 py-2.5 rounded-full text-sm font-body font-medium transition-colors ${
                    beds === b
                      ? "bg-charcoal text-white"
                      : "bg-muted text-foreground/70 hover:bg-muted/80"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <p className="text-sm font-body font-medium text-foreground mb-1">
              {lang === "he" ? "עד" : "Up to"} {formatPrice(maxPrice)}
            </p>
            <div className="space-y-3 pt-1">
              <SliderPrimitive.Root
                value={[maxPrice]}
                onValueChange={(val) => onMaxPriceChange(val[0])}
                min={0}
                max={dataMax}
                step={50000}
                className="relative flex w-full touch-none select-none items-center h-5"
              >
                <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted">
                  <SliderPrimitive.Range className="absolute h-full bg-gold" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 bg-card border-charcoal shadow-sm focus-visible:outline-none" />
              </SliderPrimitive.Root>
              <div className="flex justify-between text-xs text-muted-foreground font-body">
                <span>₪0</span>
                <span>{formatPrice(dataMax)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border px-5 py-4 flex gap-3">
          <button
            onClick={() => { onBedsChange(""); onMaxPriceChange(dataMax); }}
            className="text-sm text-muted-foreground font-body hover:text-foreground transition-colors"
          >
            {t("search.clear") || "Clear"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-charcoal text-white py-3 rounded-lg font-body font-medium text-sm btn-text transition-colors"
          >
            {t("search.apply") || (lang === "he" ? "החל" : "Apply")}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Main SearchBar ─── */
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
  const isMobile = useIsMobile();
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);

  const [locations, setLocations] = useState<Option[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<Option[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(20_000_000);
  const [dataMax, setDataMax] = useState<number>(20_000_000);

  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    initialLocation ? initialLocation.split(",") : []
  );
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedBeds, setSelectedBeds] = useState(initialBeds);

  useEffect(() => {
    Promise.all([
      supabase.from("search_locations").select("*").order("display_order"),
      supabase.from("search_property_types").select("*").order("display_order"),
      supabase.from("properties_available").select("price_number").not("price_number", "is", null),
    ]).then(([locRes, typeRes, priceRes]) => {
      if (locRes.data) {
        setLocations(locRes.data);
      }
      if (typeRes.data) {
        setPropertyTypes(typeRes.data);
      }
      if (priceRes.data && priceRes.data.length > 0) {
        const prices = priceRes.data.map((p) => Number(p.price_number)).filter((n) => n > 0);
        if (prices.length > 0) {
          const max = Math.max(...prices);
          setDataMax(max);
          setMaxPrice(initialPriceMax ? Number(initialPriceMax) : max);
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
    if (selectedLocations.length > 0) params.set("location", selectedLocations.join(","));
    if (selectedType) params.set("type", selectedType);
    if (selectedBeds) params.set("beds", selectedBeds);
    if (priceRange[0] > dataRange[0]) params.set("priceMin", String(priceRange[0]));
    if (priceRange[1] < dataRange[1]) params.set("priceMax", String(priceRange[1]));
    navigate(`/${lang}/properties?${params.toString()}`);
  };

  const locationOptions = locations.map((l) => ({ value: getName(l), label: getName(l) }));
  const typeOptions = propertyTypes.map((pt) => ({ value: getName(pt), label: getName(pt) }));

  const activeFilterCount = (selectedBeds ? 1 : 0) + (priceRange[0] > dataRange[0] || priceRange[1] < dataRange[1] ? 1 : 0);

  // ─── INLINE (Properties page) ───
  if (inline) {
    return (
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-end">
          <Dropdown label={t("search.location")} placeholder={t("search.all_locations")} options={locationOptions} value={selectedLocations} onChange={(val) => setSelectedLocations(val as string[])} multi inline isMobile={isMobile} />
          <Dropdown label={t("search.property_type")} placeholder={t("search.all_types")} options={typeOptions} value={selectedType} onChange={(val) => setSelectedType(val as string)} inline isMobile={isMobile} />
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-body text-muted-foreground">{t("search.bedrooms")}</span>
            <div className="flex gap-1 flex-wrap">
              {BEDROOM_OPTIONS.map((b) => (
                <button key={b} onClick={() => setSelectedBeds(selectedBeds === b ? "" : b)} className={`px-2.5 py-2 rounded-lg text-xs font-body font-medium transition-colors ${selectedBeds === b ? "bg-charcoal text-white" : "bg-muted text-foreground/70 hover:bg-muted/80"}`}>
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
            <span className="text-xs font-body text-muted-foreground">{t("search.price_range")}</span>
            <div className="space-y-2 pt-1">
              <SliderPrimitive.Root value={priceRange} onValueChange={(val) => setPriceRange(val as [number, number])} min={dataRange[0]} max={dataRange[1]} step={50000} className="relative flex w-full touch-none select-none items-center h-5">
                <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted">
                  <SliderPrimitive.Range className="absolute h-full bg-gold" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 shadow-sm focus-visible:outline-none bg-card border-charcoal" />
                <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 shadow-sm focus-visible:outline-none bg-card border-charcoal" />
              </SliderPrimitive.Root>
              <div className="flex justify-between text-[11px] font-body text-muted-foreground">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 flex items-end">
            <button onClick={handleSearch} className="w-full bg-charcoal hover:bg-charcoal-hover text-white py-2.5 rounded-lg font-body font-medium text-sm btn-text transition-colors flex items-center justify-center gap-2 border border-gold/30" aria-label={t("search.button")}>
              <Search className="w-4 h-4" />
              {t("search.button")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── HERO (transparent, underline-style) ───
  return (
    <div className="max-w-4xl mx-auto">
      {/* Mobile: ALL fields visible, compact */}
      {isMobile ? (
        <div className="space-y-1">
          {/* Row 1: Location + Property Type */}
          <div className="grid grid-cols-2 gap-2">
            <Dropdown label={t("search.location")} placeholder={t("search.all_locations")} options={locationOptions} value={selectedLocations} onChange={(val) => setSelectedLocations(val as string[])} multi isMobile={isMobile} />
            <Dropdown label={t("search.property_type")} placeholder={t("search.all_types")} options={typeOptions} value={selectedType} onChange={(val) => setSelectedType(val as string)} isMobile={isMobile} />
          </div>

          {/* Row 2: Bedrooms pills + Price Range */}
          <div className="space-y-0.5">
            {/* Bedrooms */}
            <div>
              <span className="text-[10px] font-body text-white/80 font-semibold tracking-wide uppercase mb-0.5 block">{t("search.bedrooms")}</span>
              <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                {BEDROOM_OPTIONS.map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBeds(selectedBeds === b ? "" : b)}
                    className={`flex-shrink-0 px-2.5 py-1 rounded-md text-[11px] font-body font-medium transition-all duration-200 ${
                      selectedBeds === b
                        ? "bg-white text-charcoal scale-105 shadow-sm"
                        : "bg-white/10 text-white/60 hover:bg-white/20 hover:scale-105"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range inline */}
            <div>
              <span className="text-[10px] font-body text-white/80 font-semibold tracking-wide uppercase mb-0.5 block">{t("search.price_range")}</span>
              <div className="space-y-0.5">
                <SliderPrimitive.Root
                  value={priceRange}
                  onValueChange={(val) => setPriceRange(val as [number, number])}
                  min={dataRange[0]}
                  max={dataRange[1]}
                  step={50000}
                  className="relative flex w-full touch-none select-none items-center h-4"
                >
                  <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-white/20">
                    <SliderPrimitive.Range className="absolute h-full bg-gold" />
                  </SliderPrimitive.Track>
                  <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 bg-white border-white/80 shadow-sm focus-visible:outline-none" />
                  <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 bg-white border-white/80 shadow-sm focus-visible:outline-none" />
                </SliderPrimitive.Root>
                <div className="flex justify-between text-[10px] font-body text-white/90 font-semibold">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Search CTA */}
          <button
            onClick={handleSearch}
            className="w-full bg-charcoal hover:bg-charcoal-hover text-white py-2.5 rounded-lg font-body font-medium text-sm btn-text transition-colors flex items-center justify-center gap-2 border border-gold/30"
            aria-label={t("search.button")}
          >
            <Search className="w-4 h-4" />
            {t("search.button")}
          </button>
        </div>
      ) : (
        /* Desktop: 2-row layout for breathing room */
        <div className="space-y-4">
          {/* Row 1: Location, Property Type, Bedrooms */}
          <div className="grid grid-cols-3 gap-5 items-end">
            <Dropdown label={t("search.location")} placeholder={t("search.all_locations")} options={locationOptions} value={selectedLocations} onChange={(val) => setSelectedLocations(val as string[])} multi isMobile={false} />
            <Dropdown label={t("search.property_type")} placeholder={t("search.all_types")} options={typeOptions} value={selectedType} onChange={(val) => setSelectedType(val as string)} isMobile={false} />
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-body text-white/80 font-semibold tracking-wide uppercase">{t("search.bedrooms")}</span>
              <div className="flex gap-1.5">
                {BEDROOM_OPTIONS.map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBeds(selectedBeds === b ? "" : b)}
                    className={`px-3 py-1.5 rounded-md text-xs font-body font-medium transition-all duration-200 ${
                      selectedBeds === b
                        ? "bg-white text-charcoal scale-105 shadow-sm"
                        : "bg-white/10 text-white/60 hover:bg-white/20 hover:scale-105"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Row 2: Price Range + Search CTA */}
          <div className="grid grid-cols-3 gap-5 items-end">
            <div className="col-span-2 flex flex-col gap-1">
              <span className="text-[11px] font-body text-white/80 font-semibold tracking-wide uppercase">{t("search.price_range")}</span>
              <div className="space-y-1.5 pt-0.5">
                <SliderPrimitive.Root
                  value={priceRange}
                  onValueChange={(val) => setPriceRange(val as [number, number])}
                  min={dataRange[0]}
                  max={dataRange[1]}
                  step={50000}
                  className="relative flex w-full touch-none select-none items-center h-5"
                >
                  <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/20">
                    <SliderPrimitive.Range className="absolute h-full bg-gold" />
                  </SliderPrimitive.Track>
                  <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 bg-white border-white/80 shadow-sm focus-visible:outline-none" />
                  <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 bg-white border-white/80 shadow-sm focus-visible:outline-none" />
                </SliderPrimitive.Root>
                <div className="flex justify-between text-[11px] font-body text-white/90 font-semibold">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-charcoal hover:bg-charcoal-hover text-white py-2.5 rounded-lg font-body font-medium text-sm btn-text transition-colors flex items-center justify-center gap-2 border border-gold/30"
                aria-label={t("search.button")}
              >
                <Search className="w-4 h-4" />
                {t("search.button")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
