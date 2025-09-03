// HeroRadialMenu.tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Cloud, Database, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Node = { id: string; angle: number; href: string; label: string; Icon: React.ComponentType<any> };

const NODES: Node[] = [
  { id: "esp",  angle: 315, href: "#projects", label: "ESP32 / IoT",     Icon: Cpu },
  { id: "cloud",angle:  45, href: "#skills",   label: "Cloud / Systems", Icon: Cloud },
  { id: "db",   angle: 135, href: "#skills",   label: "Database",        Icon: Database },
  { id: "dash", angle: 225, href: "#projects", label: "Dashboard / UI",  Icon: BarChart3 },
];

export default function HeroRadialMenu() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  // klavye ile kapatma (Esc)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const R = 110; // yarıçap
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 520, damping: 30, mass: .35 };

  return (
    <div className="relative md:size-80 size-64">
      {/* dış halka */}
      <div className="absolute inset-0 rounded-full border border-cyan-400/20" />

      {/* merkez buton */}
      <button
        aria-expanded={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(v => !v)}
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2
                   rounded-full border border-cyan-400/40 bg-cyan-500/10 px-5 py-3
                   text-cyan-200 shadow-[0_0_18px_rgba(53,198,244,.35)] hover:bg-cyan-500/15"
        aria-label="Open quick links"
      >
        Explore
      </button>

      {/* arka glow (açılınca) */}
      <motion.div
        className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-2xl"
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={open ? { width: 220, height: 220, opacity: 1 } : { width: 0, height: 0, opacity: 0 }}
        transition={spring}
        aria-hidden
      />

      {/* ikonlar */}
      {NODES.map(({ id, angle, href, label, Icon }) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * R;
        const y = Math.sin(rad) * R;
        return (
          <motion.div
            key={id}
            className="absolute left-1/2 top-1/2"
            initial={false}
            animate={open ? { x, y, opacity: 1, scale: 1 } : { x: 0, y: 0, opacity: 0, scale: .5 }}
            transition={spring}
            style={{ transformOrigin: "50% 50%" }}
          >
            <Link
              href={href}
              aria-label={label}
              className="group relative flex size-11 items-center justify-center rounded-full
                         border border-cyan-400/30 bg-cyan-500/10 hover:border-cyan-300/60"
            >
              <Icon className="size-5 text-cyan-200 transition-transform group-hover:scale-110" />
              <span className="pointer-events-none absolute -bottom-8 whitespace-nowrap rounded-md border border-white/10
                               bg-black/60 px-2 py-1 text-xs text-slate-200 opacity-0 backdrop-blur
                               group-hover:opacity-100 transition">
                {label}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
