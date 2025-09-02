"use client";
import { useReducedMotion, motion } from "framer-motion";

export default function HeroOrbit() {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative size-64 md:size-80"
      aria-label="Animated orbit with IoT icons"
      role="img"
    >
      <div className="absolute inset-0 rounded-full border border-cyan-400/20" />
      {/* central node */}
      <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_16px_#35C6F4]" />
      {/* orbiting dots */}
      {["top","right","bottom","left"].map((pos, i) => (
        <motion.div
          key={pos}
          className="absolute size-4 rounded-full bg-cyan-200"
          style={{ filter: "drop-shadow(0 0 6px rgba(53,198,244,.8))" }}
          animate={ reduce ? undefined : { rotate: 360 } }
          transition={ reduce ? undefined : { repeat: Infinity, duration: 18 + i*3, ease: "linear" } }
        >
          <div className="absolute -left-2 -top-2 size-8 rounded-full border border-cyan-400/30" />
        </motion.div>
      ))}
    </div>
  );
}
