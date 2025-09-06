"use client";
import SwapFade from "@/components/anim/SwapFade";
import { m, useInView } from "framer-motion";
import { useRef } from "react";

export default function Section({
  id, title, children,
}: { id?: string; title: string; children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Sabit partikül pozisyonları (hydration mismatch'i önlemek için)
  const particlePositions = [
    { left: "20%", top: "25%" },
    { left: "80%", top: "15%" },
    { left: "35%", top: "75%" },
  ];

  return (
    <m.section 
      ref={ref}
      id={id} 
      className="relative mx-auto max-w-[1200px] px-5 py-16 scroll-mt-24"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Subtle background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((position, i) => (
          <m.div
            key={i}
            className="absolute w-px h-px bg-cyan-400/15 rounded-full"
            style={{
              left: position.left,
              top: position.top,
            }}
            animate={{
              y: [-5, -15, -5],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + (i % 2) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Section header */}
      <m.div
        className="relative z-10 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
          <SwapFade id={`section-${id ?? "section"}`}>{title}</SwapFade>
        </h2>
        
        {/* Decorative line */}
        <m.div
          className="relative h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent max-w-xs"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        />
        
        {/* Glow effect */}
        <m.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 blur-3xl -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.3, duration: 1 }}
        />
      </m.div>

      {/* Content */}
      <m.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {children}
      </m.div>
    </m.section>
  );
}
