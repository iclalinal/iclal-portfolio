"use client";
import * as React from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Experience, Lang } from "@/lib/data";
import { formatDateRange } from "@/lib/date";
import { Briefcase, GraduationCap, HeartHandshake, MapPin, ExternalLink, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Card3DWrapper } from "@/components/ui/Card3DWrapper";

function TypeIcon({ type }: { type: Experience["type"] }) {
  switch (type) {
    case "internship":
      return <GraduationCap className="size-4" aria-hidden />;
    case "volunteering":
      return <HeartHandshake className="size-4" aria-hidden />;
    default:
      return <Briefcase className="size-4" aria-hidden />;
  }
}

export type ExperienceItemProps = {
  item: Experience;
  lang: Lang;
  className?: string;
};

export function ExperienceItem({ item, lang, className }: ExperienceItemProps) {
  const date = formatDateRange(item.start, item.end, {
    locale: lang,
    presentLabel: lang === "tr" ? "Güncel" : "Present",
  });

  const highlights = item.highlights.slice(0, 3);

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("relative pl-9 group", className)}
      aria-label={`${item.role} at ${item.company}`}
    >
      {/* Enhanced timeline node */}
      <motion.span 
        className="absolute left-0 top-6 inline-flex size-3 -translate-x-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 shadow-lg ring-4 ring-slate-900/50"
        whileHover={{ scale: 1.2 }}
        animate={{
          boxShadow: "0 0 20px rgba(34,211,238,0.6), 0 0 5px rgba(34,211,238,0.3)"
        }}
        transition={{ duration: 0.3 }}
        aria-hidden 
      />

      {/* 3D Card using wrapper */}
      <Card3DWrapper>
        <CardContent className="py-6 px-6" style={{ transform: "translateZ(20px)" }}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="text-base font-semibold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
              {item.role} <span className="text-slate-400">• {item.company}</span>
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Calendar className="size-4" aria-hidden />
              <span>{date}</span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <Badge
              variant="outline"
              className="h-7 rounded-full border-cyan-400/40 bg-cyan-500/10 px-3 py-0 text-xs text-cyan-300 gap-1.5 transition-all duration-200 hover:bg-cyan-500/20 hover:border-cyan-400/60"
            >
              <TypeIcon type={item.type} />
              <span className="capitalize">{item.type.replace("-", " ")}</span>
            </Badge>
            {item.location ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="size-4" aria-hidden />
                {item.location}
              </span>
            ) : null}
            {item.link ? (
              <Button 
                asChild 
                variant="ghost" 
                className="h-7 px-2 text-xs text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
              >
                <a href={item.link} target="_blank" rel="noreferrer" aria-label="External link">
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            ) : null}
          </div>

          {item.tech && item.tech.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tech.map((t, index) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="inline-flex h-6 items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 text-[11px] text-slate-300 transition-colors hover:bg-white/[0.08] hover:border-white/20"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          ) : null}

          {highlights.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-slate-300">
              {highlights.map((h, i) => (
                <motion.li 
                  key={i} 
                  className="relative pl-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <span className="absolute left-0 top-2.5 size-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />
                  {h}
                </motion.li>
              ))}
              {item.highlights.length > highlights.length ? (
                <li className="text-slate-500 text-xs">…</li>
              ) : null}
            </ul>
          ) : null}
        </CardContent>
      </Card3DWrapper>
    </motion.li>
  );
}

export default ExperienceItem;
