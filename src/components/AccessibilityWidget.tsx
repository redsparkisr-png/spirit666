import { useState, useEffect, useCallback, useRef } from "react";
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

  return (
    <div
      className="fixed left-0 right-0 pointer-events-none z-[9998]"
      style={{ top: y - 2, height: 4, background: "hsl(39 37% 55% / 0.5)" }}
    />
  );
};

const AccessibilityWidget = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
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
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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
      {/* Floating button — bottom-left in LTR, bottom-right in RTL */}
      <button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        className="fixed z-[9999] w-11 h-11 rounded-full bg-foreground/80 hover:bg-foreground text-background shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 bottom-6 ltr:left-6 rtl:right-6"
        aria-label={isHe ? "אפשרויות נגישות" : "Accessibility options"}
        aria-expanded={open}
        aria-controls="a11y-panel"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="4" r="2" />
          <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z" />
        </svg>
      </button>

      {/* Panel — rendered inline, no portal */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[9999] bg-black/20"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            id="a11y-panel"
            role="dialog"
            aria-modal="true"
            aria-label={isHe ? "לוח נגישות" : "Accessibility panel"}
            className="fixed bottom-20 z-[10000] w-[300px] max-w-[calc(100vw-32px)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[70vh] ltr:left-4 rtl:right-4"
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
          </div>
        </>
      )}

      {prefs.readingGuide && <ReadingGuide />}
    </>
  );
};

export default AccessibilityWidget;
