"use client";
import { m } from "framer-motion";

export default function SkillsStrip({ skills }: { skills: string[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {skills.map((s, index) => (
        <m.span
          key={s}
          className="group relative whitespace-nowrap rounded-2xl px-4 py-2 text-sm cursor-default bg-white/5 hover:bg-white/10 transition-colors duration-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          whileHover={{ y: -1 }}
        >
          {/* Content */}
          <span className="relative z-10 font-medium bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            {s}
          </span>

          {/* Basit glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </m.span>
      ))}
    </div>
  );
}
