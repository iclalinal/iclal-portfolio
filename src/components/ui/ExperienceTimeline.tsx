"use client";
import * as React from "react";
import { m, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import ExperienceItem from "@/components/ui/ExperienceItem";
import { experiences, labels, type Lang } from "@/lib/data";
import { Briefcase } from "lucide-react";

export type ExperienceTimelineProps = { lang: Lang };

function EmptyState({ lang }: { lang: Lang }) {
  const l = labels[lang];
  return (
    <Card className="rounded-2xl">
      <CardContent className="py-12 text-center">
        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
          <Briefcase className="size-6 text-muted-foreground" />
        </div>
        <h3 className="text-base font-semibold">{l.emptyTitle}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{l.emptyDesc}</p>
      </CardContent>
    </Card>
  );
}

export function ExperienceTimeline({ lang }: ExperienceTimelineProps) {
  const l = labels[lang];
  const items = experiences[lang] ?? [];
  const reduced = useReducedMotion();

  return (
    <section aria-labelledby="experience-title" className="relative">
      <m.div
        initial={{ opacity: 0, y: reduced ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-5xl px-4"
      >
        <h2 id="experience-title" className="mb-8 text-xl font-semibold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
          {l.sectionTitle}
        </h2>

        <div className="relative">
          {/* Enhanced vertical gradient line */}
          <span
            className="pointer-events-none absolute left-3 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
            aria-hidden
          />

          {items.length === 0 ? (
            <EmptyState lang={lang} />
          ) : (
            <ol className="space-y-5">
              {items.map((item) => (
                <ExperienceItem key={item.id} item={item} lang={lang} />
              ))}
            </ol>
          )}
        </div>
      </m.div>
    </section>
  );
}

export default ExperienceTimeline;
