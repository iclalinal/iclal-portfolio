// HeroRadialMenu.tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Cloud, Database, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

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
  const [focusIdx, setFocusIdx] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const [radius, setRadius] = useState(110);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Escape → kapat
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (!open) return;
      if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        setFocusIdx((i) => {
          const n = NODES.length;
          return e.key === "ArrowRight" ? (i + 1) % n : (i - 1 + n) % n;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // magnetic button + measure radius responsively
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    // initial measure
    const measure = () => {
      const rect = el.getBoundingClientRect();
      // keep a small padding so items don't touch the border
      setRadius(Math.max(80, Math.min(rect.width, rect.height) * 0.42));
    };
    measure();
    let ro: ResizeObserver | undefined;
    if (typeof window !== "undefined" && (window as any).ResizeObserver) {
      ro = new (window as any).ResizeObserver(measure);
      if (ro) {
        ro.observe(el);
      }
    }
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMx((e.clientX - (rect.left + rect.width / 2)) / rect.width);
      setMy((e.clientY - (rect.top + rect.height / 2)) / rect.height);
    };
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousemove", onMove);
      ro?.disconnect?.();
    };
  }, []);

  const R = radius; // responsive yarıçap
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 520, damping: 30, mass: .35 };
  const tilt = useMemo(() => ({ rotateX: my * -6, rotateY: mx * 6 }), [mx, my]);

  // Focus selected item when navigating with arrows
  useEffect(() => {
    if (!open) return;
    itemRefs.current[focusIdx]?.focus?.();
  }, [focusIdx, open]);

  return (
    <div
      ref={rootRef}
      className="relative md:size-80 size-64 select-none [perspective:800px]"
      onMouseLeave={() => setOpen(false)}
    >
      {/* arka parıltı/pulse halka */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 180deg, transparent 0turn, rgba(34,211,238,.25) .2turn, transparent .5turn, rgba(34,211,238,.25) .7turn, transparent 1turn)",
          boxShadow: "0 0 80px 20px rgba(34,211,238,.08) inset",
        }}
        animate={open ? { opacity: 1, scale: 1 } : { opacity: .6, scale: .98 }}
        transition={{ duration: .4 }}
        aria-hidden
      />
      <motion.div
        className="absolute inset-[-2px] rounded-full border border-cyan-400/30"
        animate={open ? { boxShadow: "0 0 24px rgba(34,211,238,.35)" } : { boxShadow: "0 0 10px rgba(34,211,238,.15)" }}
        aria-hidden
      />

      {/* parallax tilt container */}
      <motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }} animate={tilt}>

        {/* merkez buton — magnetic */}
        <motion.button
          ref={btnRef}
          aria-expanded={open}
          onMouseEnter={() => setOpen(true)}
          onClick={() => setOpen((v) => !v)}
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2
                     rounded-full border border-cyan-300/40 bg-cyan-500/10 px-5 py-3
                     text-cyan-100 shadow-[0_0_18px_rgba(53,198,244,.28)] hover:bg-cyan-500/15
                     backdrop-blur-sm"
          aria-label="Open quick links"
        >
          Explore
        </motion.button>

        {/* arka glow (açılınca) */}
        <motion.div
          className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-2xl"
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={open ? { width: 240, height: 240, opacity: 1 } : { width: 0, height: 0, opacity: 0 }}
          transition={spring}
          aria-hidden
        />

        {/* ikonlar: stagger + küçük idle orbit */}
        {NODES.map(({ id, angle, href, label, Icon }, idx) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * R;
          const y = Math.sin(rad) * R;
          const delay = reduce ? 0 : 0.06 * idx;

          return (
            <motion.div
              key={id}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={false}
              animate={
                open
                  ? { x, y, opacity: 1, scale: 1, transition: { ...spring, delay } }
                  : {
                      x: Math.cos(rad) * 6, // idle micro orbit
                      y: Math.sin(rad) * 6,
                      opacity: 0,
                      scale: 0.6,
                      transition: { duration: 0.25 },
                    }
              }
              style={{ transformOrigin: "50% 50%" }}
            >
              <Link
                href={href}
                aria-label={label}
                className={`group relative flex size-11 items-center justify-center rounded-full
                            border border-cyan-400/30 bg-cyan-500/10 hover:border-cyan-300/60
                            focus:outline-none focus:ring-2 focus:ring-cyan-400/60`}
                tabIndex={open ? 0 : -1}
                onFocus={() => setOpen(true)}
                ref={(el) => { itemRefs.current[idx] = el; }}
              >
                <Icon className="size-5 text-cyan-100 transition-transform group-hover:scale-110" />
                <span
                  className="pointer-events-none absolute -bottom-8 whitespace-nowrap rounded-md border border-white/10
                             bg-black/60 px-2 py-1 text-xs text-slate-200 opacity-0 backdrop-blur
                             group-hover:opacity-100 transition"
                >
                  {label}
                </span>

                {/* sparkle ping */}
                <span className="pointer-events-none absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100">
                  <span className="absolute inset-0 rounded-full shadow-[0_0_24px_rgba(34,211,238,.35)]" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
