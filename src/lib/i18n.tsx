import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Lang = "en" | "he";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  dir: "ltr",
});

function detectLanguage(): Lang {
  const stored = localStorage.getItem("preferred_lang");
  if (stored === "he" || stored === "en") return stored;
  if (navigator.language?.startsWith("he")) return "he";
  return "en";
}

export const LanguageProvider = ({ children, initialLang }: { children: React.ReactNode; initialLang?: Lang }) => {
  const [lang, setLangState] = useState<Lang>(initialLang ?? detectLanguage());

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("preferred_lang", newLang);
  }, []);

  useEffect(() => {
    if (initialLang) {
      setLangState(initialLang);
      localStorage.setItem("preferred_lang", initialLang);
    }
  }, [initialLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  }, [lang]);

  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
