"use client";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import LanguageSwitch from "@/components/LanguageSwitch";
import SwapFade from "@/components/anim/SwapFade";
import { m, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between">
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

        {/* Mobile hamburger */}
        <button
          className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Navigation */}
        <nav className="hidden sm:flex items-center gap-3 sm:gap-6 text-xs sm:text-sm overflow-x-auto sm:overflow-visible whitespace-nowrap no-scrollbar">
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

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <m.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="sm:hidden fixed inset-0 z-40 bg-slate-900/90 backdrop-blur-md"
          onClick={() => setMenuOpen(false)}
        >
          <m.nav
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-20 w-11/12 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-4 text-base text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={`m-${item.key}`}>
                  <a
                    href={item.href}
                    className="block rounded-lg px-4 py-3 hover:bg-white/10"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t border-white/10 pt-3 flex items-center justify-between">
              <span className="text-sm text-slate-300">Language</span>
              <LanguageSwitch />
            </div>
          </m.nav>
        </m.div>
      )}
    </m.header>
  );
}
