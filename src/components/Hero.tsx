"use client";
import SignatureUnderline from "./SignatureUnderline";
import HeroRadialMenu from "./HeroRadialMenu";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import SwapFade from "@/components/anim/SwapFade";

export default function Hero() {
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const tx = useTransform(mx, [ -40, 40 ], [ -6, 6 ]);
  const ty = useTransform(my, [ -40, 40 ], [ -6, 6 ]);
  const { c } = useI18n();

  function onMove(e: React.MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - (r.left + r.width/2));
    my.set(e.clientY - (r.top + r.height/2));
  }

  return (
    <section className="relative mx-auto max-w-[1200px] px-5 pt-28 md:pt-36 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          <SwapFade id="hero-title">{c.hero.title}</SwapFade>
        </h1>
        <div className="mt-2">
          <SignatureUnderline />
        </div>
        <p className="mt-6 text-slate-300"><SwapFade id="hero-sub">{c.hero.sub}</SwapFade></p>

        <div className="mt-8 flex gap-3">
          <motion.button
            onMouseMove={onMove}
            className="relative px-5 py-3 rounded-xl bg-cyan-500/10 border border-cyan-400/30 hover:border-cyan-400 text-cyan-200"
            style={{ translateX: tx, translateY: ty }}
          >
            <a href="#projects"><SwapFade id="hero-cta-projects">{c.hero.ctaProjects}</SwapFade></a>
          </motion.button>
          <Link
            href="/cv.pdf"
            className="px-5 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15"
          >
            <SwapFade id="hero-cta-cv">{c.hero.ctaCV}</SwapFade>
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        <HeroRadialMenu />
      </div>
    </section>
  );
}
