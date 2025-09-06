import { m, useReducedMotion } from "framer-motion";

export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <m.div
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduce ? 0.1 : 0.4, ease: "easeOut", delay }}
    >
      {children}
    </m.div>
  );
}

export function ClipCard({ children, index = 0 }: { children: React.ReactNode; index?: number }) {
  const reduce = useReducedMotion();
  const baseDelay = Math.min(index * 0.06, 0.6);
  if (reduce) return <FadeIn delay={baseDelay}>{children}</FadeIn>;
  return (
    <m.div
      initial={{ opacity: 0, clipPath: "inset(8% round 12px)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% round 12px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.32, ease: "easeOut", delay: baseDelay }}
      className="[clip-path:inset(0_round_12px)]"
    >
      {children}
    </m.div>
  );
}

