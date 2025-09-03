"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import LanguageSwitch from "@/components/LanguageSwitch";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { c } = useI18n();

  return (
    <header
      className={[
        "fixed top-0 z-50 w-full transition-all",
        "border-b border-white/10",
        scrolled ? "backdrop-blur-xl bg-black/20" : "bg-transparent",
      ].join(" ")}
      role="navigation"
      aria-label="Primary"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          İclal İnal
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <a href="#projects" className="hover:opacity-80">
            {c.nav.projects}
          </a>
          <a href="#skills" className="hover:opacity-80">
            {c.nav.skills}
          </a>
          <a href="#experience" className="hover:opacity-80">
            {c.nav.experience}
          </a>
          <a href="#contact" className="hover:opacity-80">
            {c.nav.contact}
          </a>
          <div className="mx-1 h-5 w-px bg-white/15" />
          <LanguageSwitch />
        </nav>
      </div>
    </header>
  );
}

