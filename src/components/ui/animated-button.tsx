"use client";
import { m } from "framer-motion";
import { DUR } from "@/lib/anim";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
  external?: boolean;
  icon?: ReactNode;
  className?: string;
  delay?: number;
  ariaLabel?: string;
}

export default function AnimatedButton({
  children,
  variant = "primary",
  onClick,
  href,
  external = false,
  icon,
  className = "",
  delay = 0,
  ariaLabel,
}: AnimatedButtonProps) {
  const variants = {
    primary: {
      background: "from-cyan-500/20 to-blue-500/20",
      border: "border-cyan-400/40 group-hover:border-cyan-400/80",
      text: "text-cyan-300 group-hover:text-white"
    },
    secondary: {
      background: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-400/40 group-hover:border-purple-400/80",
      text: "text-purple-300 group-hover:text-white"
    }
  };

  const currentVariant = variants[variant];

  const buttonContent = (
    <>
      {/* Animated background */}
      <m.div
        className={`absolute inset-0 bg-gradient-to-r ${currentVariant.background}`}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: DUR.hover }}
      />
      
      {/* Border */}
      <div className={`absolute inset-0 rounded-2xl border ${currentVariant.border} transition-colors duration-200`} />
      
      <span className={`relative z-10 font-semibold flex items-center justify-center gap-3 ${currentVariant.text}`}>
        {icon && icon}
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <m.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`group w-full relative px-8 py-4 rounded-2xl overflow-hidden transition-all duration-200 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: DUR.enter }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        aria-label={ariaLabel}
      >
        {buttonContent}
      </m.a>
    );
  }

  return (
    <m.button
      onClick={onClick}
      className={`group w-full relative px-8 py-4 rounded-2xl overflow-hidden transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: DUR.enter }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      aria-label={ariaLabel}
    >
      {buttonContent}
    </m.button>
  );
}
