"use client";
import React from "react";
import { content, type Content } from "@/lib/content";

export type Lang = "tr" | "en";

type I18nContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const I18nContext = React.createContext<I18nContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState<Lang>("tr");

  // Initialize from localStorage or browser language
  React.useEffect(() => {
    try {
      const saved = (localStorage.getItem("lang") as Lang) || null;
      if (saved === "tr" || saved === "en") {
        setLang(saved);
        return;
      }
    } catch {}
    const nav = typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "tr";
    setLang(nav.startsWith("tr") ? "tr" : "en");
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {}
    // Reflect current language on the <html> element for a11y/SEO
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return <I18nContext.Provider value={{ lang, setLang }}>{children}</I18nContext.Provider>;
}

export function useI18n(): { lang: Lang; setLang: (l: Lang) => void; c: Content } {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return { ...ctx, c: content[ctx.lang] };
}
