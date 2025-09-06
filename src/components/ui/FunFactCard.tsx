"use client";
import * as React from "react";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { FunFact } from "@/lib/data";
import { m } from "framer-motion";
import { Card3DWrapper } from "@/components/ui/Card3DWrapper";

type Props = {
  fact: FunFact;
  className?: string;
};

export function FunFactCard({ fact, className }: Props) {
  const Icon = fact.icon;

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("group relative", className)}
    >
      <Card3DWrapper>
        <CardContent className="flex items-start gap-4 p-6" style={{ transform: "translateZ(20px)" }}>
          {/* Icon with enhanced styling */}
          <m.div 
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Icon className="h-6 w-6 text-cyan-300" strokeWidth={2} />
          </m.div>
          
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="text-base font-semibold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                {fact.title}
              </h3>
              {fact.value ? (
                <m.span 
                  className="text-sm text-cyan-400 font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {fact.value}
                </m.span>
              ) : null}
            </div>
            {fact.description ? (
              <m.p 
                className="mt-2 text-sm text-slate-300 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {fact.description}
              </m.p>
            ) : null}
          </div>
        </CardContent>
      </Card3DWrapper>
    </m.div>
  );
}

export default FunFactCard;
