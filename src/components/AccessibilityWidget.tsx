import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Plus, Minus, Type, Eye, Sun, Moon, Contrast, Link2, Heading, Underline, BookOpen, Pause, MousePointer, Keyboard } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const STORAGE_KEY = "a11y_prefs";

interface A11yPrefs {
  fontSize: number;
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
  const basePx = 17;
  const step = 2;
  root.style.fontSize = prefs.fontSize !== 0 ? `${basePx + prefs.fontSize * step}px` : "";

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
  const isRTL = document.documentElement.dir === "rtl";
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(loadPrefs);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

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

  // Focus first element in panel
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

  const resetAll = () => setPrefs({ ...defaults });

  const t = (en: string, he: string) => (isHe ? he : en);

  const sections = [
    {
      title: t("Text", "טקסט"),
      items: [
        { type: "action" as const, icon: Plus, label: t("Increase Text", "הגדל טקסט"), onClick: () => update("fontSize", Math.min(prefs.fontSize + 1, 5)) },
        { type: "action" as const, icon: Minus, label: t("Decrease Text", "הקטן טקסט"), onClick: () => update("fontSize", Math.max(prefs.fontSize - 1, -3)) },
        { type: "toggle" as const, icon: Type, label: t("Readable Font", "גופן קריא"), key: "readableFont" as keyof A11yPrefs },
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
        { type: "toggle" as const, icon: Underline, label: t("Underline Links", "קו תחתון"), key: "underlineLinks" as keyof A11yPrefs },
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
      {/* Floating button — BOTTOM LEFT (LTR) / BOTTOM RIGHT (RTL), opposite side from WhatsApp */}
      <button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        className="fixed z-[9999] w-10 h-10 rounded-full bg-foreground/70 hover:bg-foreground/90 text-background shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        style={{
          bottom: 24,
          left: isRTL ? "auto" : 24,
          right: isRTL ? 24 : "auto",
        }}
        aria-label={isHe ? "אפשרויות נגישות" : "Accessibility options"}
        aria-expanded={open}
        aria-controls="a11y-panel"
      >
        {/* Universal accessibility icon (wheelchair) */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm3.5 20l-1.68-4.2A4.98 4.98 0 0 1 7 14a5 5 0 0 1 3.04-4.6L9.12 7.52A7 7 0 0 0 5 14a6.98 6.98 0 0 0 5.26 6.77L11.5 22h4zM13 8h-2l1.5 3.75L10.88 12H10a3 3 0 0 0 0 6 3.02 3.02 0 0 0 2.76-1.82L13.88 14H16l2 5h2l-2.5-6.25L16 10h-3z"/>
        </svg>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open &&
          createPortal(
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-[1px]"
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />
              <motion.div
                ref={panelRef}
                id="a11y-panel"
                role="dialog"
                aria-modal="true"
                aria-label={isHe ? "לוח נגישות" : "Accessibility panel"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="fixed bottom-20 z-[10000] w-[300px] max-w-[calc(100vw-32px)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[70vh]"
                style={{
                  left: isRTL ? "auto" : 16,
                  right: isRTL ? 16 : "auto",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <h2 className="font-display font-semibold text-foreground text-sm">
                    {t("Accessibility", "נגישות")}
                  </h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors rounded-lg p-1 focus-visible:ring-2 focus-visible:ring-gold"
                    aria-label={isHe ? "סגור" : "Close"}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
                  {sections.map((section) => (
                    <div key={section.title}>
                      <p className="text-[10px] font-body font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        {section.title}
                      </p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {section.items.map((item) => {
                          const Icon = item.icon;
                          const isActive = item.type === "toggle" ? !!prefs[item.key] : false;

                          return (
                            <button
                              key={item.label}
                              onClick={
                                item.type === "action"
                                  ? item.onClick
                                  : () => update(item.key, !prefs[item.key])
                              }
                              className={`flex flex-col items-center gap-1 px-1.5 py-2 rounded-lg text-center transition-all duration-200 border focus-visible:ring-2 focus-visible:ring-gold text-[10px] ${
                                isActive
                                  ? "bg-primary/10 border-primary/30 text-foreground"
                                  : "bg-muted/40 border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                              aria-pressed={item.type === "toggle" ? isActive : undefined}
                            >
                              <Icon className="w-4 h-4" aria-hidden="true" />
                              <span className="font-body font-medium leading-tight">
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
                <div className="border-t border-border px-4 py-2.5">
                  <button
                    onClick={resetAll}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-body text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    {t("Reset All", "אפס הכל")}
                  </button>
                </div>
              </motion.div>
            </>,
            document.body
          )}
      </AnimatePresence>

      {prefs.readingGuide && <ReadingGuide />}
    </>
  );
};

export default AccessibilityWidget;
