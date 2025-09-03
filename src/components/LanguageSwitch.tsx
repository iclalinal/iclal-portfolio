"use client";
import { useI18n } from "@/lib/i18n";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function LanguageSwitch() {
  const { lang, setLang } = useI18n();
  const reduce = useReducedMotion();

  const Tab = ({ code, label }: { code: "tr" | "en"; label: string }) => {
    const selected = lang === code;
    return (
      <button
        role="tab"
        aria-selected={selected}
        onClick={() => setLang(code)}
        className={[
          "relative px-3 py-1.5 text-xs font-medium rounded-md",
          "focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:outline-none",
          selected ? "text-white" : "text-slate-300 hover:text-white"
        ].join(" ")}
      >
        {label}
        <AnimatePresence>
          {selected && (
            <motion.div
              layoutId="lang-pill"
              className="absolute inset-0 rounded-md bg-white/10 border border-white/20"
              transition={reduce ? { duration: 0 } : { type: "tween", duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </AnimatePresence>
      </button>
    );
  };

  return (
    <div
      role="tablist"
      aria-label="Language switch"
      className="relative inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 p-1"
    >
      <Tab code="tr" label="TR" />
      <Tab code="en" label="EN" />
    </div>
  );
}
