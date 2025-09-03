"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SkillsStrip({ skills }: { skills: string[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex gap-3 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {skills.map((s, index) => (
        <motion.span
          key={s}
          className="group relative whitespace-nowrap rounded-2xl px-4 py-2 text-sm cursor-default overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          whileHover={{ y: -2, scale: 1.05 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: hoveredIndex === index
                ? "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(168,85,247,0.15))"
                : "linear-gradient(135deg, rgba(34,211,238,0.1), rgba(168,85,247,0.08))",
            }}
            animate={{
              scale: hoveredIndex === index ? 1.1 : 1,
              backgroundPosition: hoveredIndex === index ? "200% 0%" : "0% 0%",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-2xl p-[1px]"
            style={{
              background: hoveredIndex === index
                ? "linear-gradient(135deg, rgba(34,211,238,0.6), rgba(168,85,247,0.4))"
                : "linear-gradient(135deg, rgba(34,211,238,0.3), rgba(168,85,247,0.2))",
            }}
            animate={{
              backgroundPosition: hoveredIndex === index ? "200% 0%" : "0% 0%",
            }}
            transition={{
              duration: 2,
              repeat: hoveredIndex === index ? Infinity : 0,
              ease: "linear",
            }}
          >
            <div className="h-full w-full rounded-2xl bg-slate-900/60 backdrop-blur-sm" />
          </motion.div>

          {/* Content */}
          <span className="relative z-10 font-medium bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            {s}
          </span>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-lg opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />

          {/* Floating particles */}
          {hoveredIndex === index && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
                  style={{
                    left: `${30 + i * 20}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    y: [-5, -15, -5],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 1.5 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}
        </motion.span>
      ))}
    </div>
  );
}
