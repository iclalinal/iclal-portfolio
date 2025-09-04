"use client";
import SignatureUnderline from "./SignatureUnderline";
import HeroRadialMenu from "./HeroRadialMenu";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import SwapFade from "@/components/anim/SwapFade";
import { useState, useMemo, useCallback } from "react";

function useParallax() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useSpring(useTransform(mx, [-40, 40], [-8, 8]), { stiffness: 150, damping: 15 });
  const ty = useSpring(useTransform(my, [-40, 40], [-8, 8]), { stiffness: 150, damping: 15 });
  
  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(e.clientX - (r.left + r.width / 2));
    my.set(e.clientY - (r.top + r.height / 2));
  }, [mx, my]);
  
  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);
  
  return { tx, ty, onMove, onLeave };
}

export default function Hero() {
  const proj = useParallax();
  const cvParallax = useParallax();
  const [isHovered, setIsHovered] = useState(false);
  const { c } = useI18n();

  // Sabit partikül pozisyonları (hydration mismatch'i önlemek için) - Memoized
  const particlePositions = useMemo(() => [
    { left: "15%", top: "20%" },
    { left: "85%", top: "10%" },
    { left: "25%", top: "70%" },
    { left: "75%", top: "80%" },
    { left: "45%", top: "15%" },
    { left: "65%", top: "60%" },
  ], []);

  return (
    <section className="relative mx-auto max-w-[1200px] px-5 pt-28 md:pt-36 grid md:grid-cols-2 gap-10 items-center">
      {/* Subtle background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-cyan-400/20 rounded-full"
            style={{
              left: position.left,
              top: position.top,
            }}
            animate={{
              y: [-10, -25, -10],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 6 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SwapFade id="hero-title">{c.hero.title}</SwapFade>
        </motion.h1>
        
        <motion.div 
          className="mt-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <SignatureUnderline />
        </motion.div>
        
        <motion.p 
          className="mt-8 text-slate-300 text-lg leading-relaxed max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <SwapFade id="hero-sub">{c.hero.sub}</SwapFade>
        </motion.p>

        <motion.div 
          className="mt-10 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {/* Primary CTA Button */}
          <motion.button
            onMouseMove={proj.onMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); proj.onLeave(); }}
            className="group relative px-8 py-4 rounded-2xl overflow-hidden"
            style={{ translateX: proj.tx, translateY: proj.ty }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm"
              animate={{
                scale: isHovered ? 1.05 : 1,
                backgroundPosition: isHovered ? "200% 0%" : "0% 0%",
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl p-[1px]"
              style={{
                background: "linear-gradient(135deg, rgba(34,211,238,0.6), rgba(168,85,247,0.4), rgba(34,211,238,0.6))",
              }}
              animate={{ 
                backgroundPosition: isHovered ? "200% 0%" : "0% 0%" 
              }}
              transition={{ 
                duration: 2, 
                repeat: isHovered ? Infinity : 0,
                ease: "linear" 
              }}
            >
              <div className="h-full w-full rounded-2xl bg-slate-900/80" />
            </motion.div>

            {/* Button content */}
            <div className="relative z-10 text-cyan-200 font-semibold group-hover:text-white transition-colors">
              <a href="#projects">
                <SwapFade id="hero-cta-projects">{c.hero.ctaProjects}</SwapFade>
              </a>
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* Secondary CTA Button */}
          <motion.div className="inline-flex" onMouseMove={cvParallax.onMove} onMouseLeave={cvParallax.onLeave} style={{ translateX: cvParallax.tx, translateY: cvParallax.ty }}>
            <Link
              href={c.hero.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={c.hero.ctaCV}
              className="group relative px-8 py-4 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 overflow-hidden"
            >
              {/* Shine effect (visible only on hover) */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12"
                initial={{ x: "-120%" }}
                animate={{ x: ["-120%", "220%"] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              />
              
              <span className="relative z-10 text-slate-300 group-hover:text-white transition-colors">
                <SwapFade id="hero-cta-cv">{c.hero.ctaCV}</SwapFade>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="flex justify-center relative z-10"
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.9, duration: 1, type: "spring", stiffness: 100 }}
      >
        <HeroRadialMenu />
      </motion.div>
    </section>
  );
}
