"use client";
import { useI18n } from "@/lib/i18n";

export default function LanguageSwitch() {
  const { lang, setLang } = useI18n();
  const toggle = () => setLang(lang === "tr" ? "en" : "tr");
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle language"
      title={lang === "tr" ? "Switch to English" : "Türkçe'ye geç"}
      className="px-2.5 py-1 rounded-md border border-white/15 hover:bg-white/10 text-xs"
    >
      {lang.toUpperCase()}
    </button>
  );
}

