"use client";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import LanguageSwitch from "@/components/LanguageSwitch";
import SwapFade from "@/components/anim/SwapFade";
import { m, useScroll, useTransform } from "framer-motion";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values for glass effect
  const bgColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(12,18,24,0.20)", "rgba(12,18,24,0.55)"]
  );
  const blurFilter = useTransform(scrollY, [0, 100], ["blur(8px)", "blur(18px)"]);
  
  // Memoize scroll handler
  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 8);
  }, []);
  
  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const { c } = useI18n();
  
  // Memoize navigation items
  const navItems = useMemo(() => [
    { href: "#projects", key: "nav-projects", text: c.nav.projects },
    { href: "#skills", key: "nav-skills", text: c.nav.skills },
    { href: "#experience", key: "nav-experience", text: c.nav.experience },
    { href: "#contact", key: "nav-contact", text: c.nav.contact },
  ], [c.nav]);

  return (
    <m.header
      className="fixed top-0 z-50 w-full transition-all"
      role="navigation"
      aria-label="Primary"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    >
      {/* Base glass layer (visible at top) */}
      <div
        className="absolute inset-0 bg-slate-900/25 supports-[backdrop-filter]:backdrop-blur-md"
        aria-hidden
      />
      {/* Scroll-intensified glass overlay */}
      <m.div
        className="absolute inset-0"
        style={{ backgroundColor: bgColor, backdropFilter: blurFilter }}
        aria-hidden
      />
      
      {/* Gradient border */}
      <m.div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: scrolled 
            ? "linear-gradient(90deg, transparent, rgba(34,211,238,0.5), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
        animate={{
          backgroundPosition: scrolled ? ["0% 0%", "200% 0%"] : "0% 0%",
        }}
        transition={{
          duration: 3,
          repeat: scrolled ? Infinity : 0,
          ease: "linear",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="group relative font-bold text-lg tracking-tight"
        >
          <m.span
            className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            İclal İnal
          </m.span>
          
          {/* Glow effect */}
          <m.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 -z-10"
            transition={{ duration: 0.3 }}
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm">
          {navItems.map((item, index) => (
            <m.a
              key={item.key}
              href={item.href}
              className="group relative px-3 py-2 rounded-lg transition-colors hover:text-cyan-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              whileHover={{ y: -2 }}
            >
              <SwapFade id={item.key}>{item.text}</SwapFade>
              
              {/* Hover background */}
              <m.div
                className="absolute inset-0 bg-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.2 }}
              />
              
              {/* Underline effect */}
              <m.div
                className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                initial={{ width: 0, x: "-50%" }}
                whileHover={{ width: "80%" }}
                transition={{ duration: 0.3 }}
              />
            </m.a>
          ))}
          
          {/* Divider */}
          <m.div
            className="mx-2 h-6 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          />
          
          {/* Language Switch */}
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <LanguageSwitch />
          </m.div>
        </nav>
      </div>
    </m.header>
  );
}
