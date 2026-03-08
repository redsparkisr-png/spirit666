import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Plus, Minus, Type, Eye, Sun, Moon, Contrast, Link2, Heading, Underline, BookOpen, Pause, MousePointer, Keyboard } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const STORAGE_KEY = "a11y_prefs";

interface A11yPrefs {
  fontSize: number; // 0 = default, positive = bigger, negative = smaller
  readableFont: boolean;
  highContrast: boolean;
  darkContrast: boolean;
  lightContrast: boolean;
  invertColors: boolean;
  highlightLinks: boolean;
  highlightHeadings: boolean;
  underlineLinks: boolean;
  readingGuide: boolean;
  reduceMotion: boolean;
  bigCursor: boolean;
  keyboardNav: boolean;
}

const defaults: A11yPrefs = {
  fontSize: 0,
  readableFont: false,
  highContrast: false,
  darkContrast: false,
  lightContrast: false,
  invertColors: false,
  highlightLinks: false,
  highlightHeadings: false,
  underlineLinks: false,
  readingGuide: false,
  reduceMotion: false,
  bigCursor: false,
  keyboardNav: false,
};

const loadPrefs = (): A11yPrefs => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch {}
  return { ...defaults };
};

const savePrefs = (prefs: A11yPrefs) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
};

const applyPrefs = (prefs: A11yPrefs) => {
  const root = document.documentElement;

  // Font size
  const basePx = 17;
  const step = 2;
  root.style.fontSize = prefs.fontSize !== 0 ? `${basePx + prefs.fontSize * step}px` : "";

  // Classes on <html>
  const classes: Record<string, boolean> = {
    "a11y-readable-font": prefs.readableFont,
    "a11y-high-contrast": prefs.highContrast,
    "a11y-dark-contrast": prefs.darkContrast,
    "a11y-light-contrast": prefs.lightContrast,
    "a11y-invert": prefs.invertColors,
    "a11y-highlight-links": prefs.highlightLinks,
    "a11y-highlight-headings": prefs.highlightHeadings,
    "a11y-underline-links": prefs.underlineLinks,
    "a11y-reading-guide": prefs.readingGuide,
    "a11y-reduce-motion": prefs.reduceMotion,
    "a11y-big-cursor": prefs.bigCursor,
    "a11y-keyboard-nav": prefs.keyboardNav,
  };

  Object.entries(classes).forEach(([cls, active]) => {
    root.classList.toggle(cls, active);
  });
};

/* ── Reading guide overlay ── */
const ReadingGuide = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    const handler = (e: MouseEvent) => setY(e.clientY);
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return createPortal(
    <div
      className="fixed left-0 right-0 pointer-events-none z-[9998]"
      style={{ top: y - 2, height: 4, background: "hsl(39 37% 55% / 0.5)" }}
    />,
    document.body
  );
};

const AccessibilityWidget = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(loadPrefs);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Apply on mount & change
  useEffect(() => {
    applyPrefs(prefs);
    savePrefs(prefs);
  }, [prefs]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Trap focus in panel
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const panel = panelRef.current;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();
  }, [open]);

  const update = useCallback((key: keyof A11yPrefs, value: any) => {
    setPrefs((p) => {
      const next = { ...p, [key]: value };
      // Mutual exclusivity for contrast modes
      if (key === "highContrast" && value) {
        next.darkContrast = false;
        next.lightContrast = false;
      }
      if (key === "darkContrast" && value) {
        next.highContrast = false;
        next.lightContrast = false;
      }
      if (key === "lightContrast" && value) {
        next.highContrast = false;
        next.darkContrast = false;
      }
      return next;
    });
  }, []);

  const resetAll = () => {
    setPrefs({ ...defaults });
  };

  const t = (en: string, he: string) => (isHe ? he : en);

  const sections = [
    {
      title: t("Text", "טקסט"),
      items: [
        {
          type: "action" as const,
          icon: Plus,
          label: t("Increase Text", "הגדל טקסט"),
          onClick: () => update("fontSize", Math.min(prefs.fontSize + 1, 5)),
        },
        {
          type: "action" as const,
          icon: Minus,
          label: t("Decrease Text", "הקטן טקסט"),
          onClick: () => update("fontSize", Math.max(prefs.fontSize - 1, -3)),
        },
        {
          type: "toggle" as const,
          icon: Type,
          label: t("Readable Font", "גופן קריא"),
          key: "readableFont" as keyof A11yPrefs,
        },
      ],
    },
    {
      title: t("Visual", "חזותי"),
      items: [
        { type: "toggle" as const, icon: Contrast, label: t("High Contrast", "ניגודיות גבוהה"), key: "highContrast" as keyof A11yPrefs },
        { type: "toggle" as const, icon: Moon, label: t("Dark Contrast", "ניגודיות כהה"), key: "darkContrast" as keyof A11yPrefs },
        { type: "toggle" as const, icon: Sun, label: t("Light Contrast", "ניגודיות בהירה"), key: "lightContrast" as keyof A11yPrefs },
        { type: "toggle" as const, icon: Eye, label: t("Invert Colors", "היפוך צבעים"), key: "invertColors" as keyof A11yPrefs },
      ],
    },
    {
      title: t("Reading", "קריאה"),
      items: [
        { type: "toggle" as const, icon: Link2, label: t("Highlight Links", "הדגש קישורים"), key: "highlightLinks" as keyof A11yPrefs },
        { type: "toggle" as const, icon: Heading, label: t("Highlight Headings", "הדגש כותרות"), key: "highlightHeadings" as keyof A11yPrefs },
        { type: "toggle" as const, icon: Underline, label: t("Underline Links", "קו תחתון לקישורים"), key: "underlineLinks" as keyof A11yPrefs },
        { type: "toggle" as const, icon: BookOpen, label: t("Reading Guide", "סרגל קריאה"), key: "readingGuide" as keyof A11yPrefs },
      ],
    },
    {
      title: t("Interaction", "אינטראקציה"),
      items: [
        { type: "toggle" as const, icon: Pause, label: t("Reduce Motion", "הפחת אנימציות"), key: "reduceMotion" as keyof A11yPrefs },
        { type: "toggle" as const, icon: MousePointer, label: t("Large Cursor", "סמן גדול"), key: "bigCursor" as keyof A11yPrefs },
        { type: "toggle" as const, icon: Keyboard, label: t("Keyboard Nav", "ניווט מקלדת"), key: "keyboardNav" as keyof A11yPrefs },
      ],
    },
  ];

  return (
    <>
      {/* Floating button */}
      <button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-24 z-[9999] w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ltr:right-6 rtl:left-6"
        style={{ right: document.documentElement.dir === "rtl" ? "auto" : 24, left: document.documentElement.dir === "rtl" ? 24 : "auto" }}
        aria-label={isHe ? "אפשרויות נגישות" : "Accessibility options"}
        aria-expanded={open}
        aria-controls="a11y-panel"
      >
        {/* International accessibility symbol */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="4.5" r="1.5" fill="currentColor" stroke="none" />
          <path d="M12 7.5V14" />
          <path d="M8 9.5h8" />
          <path d="M9.5 14l-2 5.5" />
          <path d="M14.5 14l2 5.5" />
        </svg>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open &&
          createPortal(
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-[9999] bg-black/30"
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />
              <motion.div
                ref={panelRef}
                id="a11y-panel"
                role="dialog"
                aria-modal="true"
                aria-label={isHe ? "לוח נגישות" : "Accessibility panel"}
                initial={{ opacity: 0, x: document.documentElement.dir === "rtl" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: document.documentElement.dir === "rtl" ? -20 : 20 }}
                transition={{ duration: 0.25 }}
                className="fixed top-4 bottom-4 z-[10000] w-[320px] max-w-[calc(100vw-32px)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                style={{
                  right: document.documentElement.dir === "rtl" ? "auto" : 16,
                  left: document.documentElement.dir === "rtl" ? 16 : "auto",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <h2 className="font-display font-semibold text-foreground text-base">
                    {t("Accessibility", "נגישות")}
                  </h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors rounded-lg p-1 focus-visible:ring-2 focus-visible:ring-gold"
                    aria-label={isHe ? "סגור" : "Close"}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
                  {sections.map((section) => (
                    <div key={section.title}>
                      <p className="text-[11px] font-body font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        {section.title}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {section.items.map((item) => {
                          const Icon = item.icon;
                          const isActive =
                            item.type === "toggle"
                              ? !!prefs[item.key]
                              : false;

                          return (
                            <button
                              key={item.label}
                              onClick={
                                item.type === "action"
                                  ? item.onClick
                                  : () => update(item.key, !prefs[item.key])
                              }
                              className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl text-center transition-all duration-200 border focus-visible:ring-2 focus-visible:ring-gold ${
                                isActive
                                  ? "bg-primary/10 border-primary/30 text-foreground"
                                  : "bg-muted/40 border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                              aria-pressed={item.type === "toggle" ? isActive : undefined}
                            >
                              <Icon className="w-5 h-5" aria-hidden="true" />
                              <span className="text-[11px] font-body font-medium leading-tight">
                                {item.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-border px-5 py-3">
                  <button
                    onClick={resetAll}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-body text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    {t("Reset All", "אפס הכל")}
                  </button>
                </div>
              </motion.div>
            </>,
            document.body
          )}
      </AnimatePresence>

      {/* Reading guide line */}
      {prefs.readingGuide && <ReadingGuide />}
    </>
  );
};

export default AccessibilityWidget;
