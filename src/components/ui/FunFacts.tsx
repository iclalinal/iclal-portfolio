"use client";
import * as React from "react";
import { useI18n } from "@/lib/i18n";
import { funFacts } from "@/lib/data";
import { FunFactCard } from "@/components/ui/FunFactCard";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  title?: string;
  limit?: number;
};

export function FunFacts({ className, title, limit }: Props) {
  const { lang } = useI18n();
  const items = funFacts[lang].slice(0, limit ?? funFacts[lang].length);
  const fallbackTitle = lang === "tr" ? "Eğlenceli Bilgiler" : "Fun Facts";

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-white/90">
          {title ?? fallbackTitle}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <FunFactCard key={`${f.title}-${i}`} fact={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FunFacts;

