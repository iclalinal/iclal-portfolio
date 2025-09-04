"use client";
import { motion, useMotionValue } from "framer-motion";
import { DUR, SPRING_SOFT } from "@/lib/anim";
import { ReactNode } from "react";

interface ContactCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  href: string | null;
  gradient: string;
  delay?: number;
}

export default function ContactCard({
  icon,
  label,
  value,
  href,
  gradient,
  delay = 0,
}: ContactCardProps) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const mx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const my = (e.clientY - (r.top + r.height / 2)) / r.height;
    ry.set(mx * 12);
    rx.set(my * -12);
  }
  function onLeave() { rx.set(0); ry.set(0); }

  return (
    <motion.div
      className="group relative overflow-visible [perspective:1000px]"
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: DUR.enter }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="relative transform-gpu"
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        whileHover={{ y: -2 }}
        transition={SPRING_SOFT}
      >
        <div className="relative rounded-2xl border-cyan-400/25 bg-white/[0.02] p-7">
          {/* base neon ring */}
          <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-cyan-400/30" aria-hidden />
          {/* glow */}
          <span className="pointer-events-none absolute -inset-px rounded-[1rem] shadow-[0_0_0_1px_rgba(34,211,238,.12),0_0_24px_rgba(34,211,238,.18),inset_0_0_24px_rgba(34,211,238,.08)] opacity-50 transition-opacity duration-200 group-hover:opacity-90" aria-hidden />
          {/* shine sweep removed for contact cards */}

          {/* content with depth */}
          <div className="relative flex items-center gap-4 [transform-style:preserve-3d]">
            <div
              className={`p-3 rounded-xl bg-gradient-to-r ${gradient} bg-opacity-20`}
              style={{ transform: "translateZ(18px)" }}
            >
              {icon}
            </div>
            <div className="flex-1" style={{ transform: "translateZ(10px)" }}>
              <p className="text-[15px] text-slate-300/90 mb-1 font-medium">{label}</p>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label}: ${value} (opens in new tab)`}
                  className="text-[14px] text-slate-300 hover:text-cyan-400 transition-colors duration-200 inline-flex items-center gap-1"
                >
                  <span>{value}</span>
                  <span aria-hidden>↗</span>
                </a>
              ) : (
                <span className="text-[14px] text-slate-300">{value}</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
