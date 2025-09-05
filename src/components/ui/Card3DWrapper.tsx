"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { use3DCard } from "@/hooks/use3DCard";

interface Card3DWrapperProps {
  children: ReactNode;
  className?: string;
  withParticles?: boolean;
  particleCount?: number;
}

export function Card3DWrapper({ 
  children, 
  className = "", 
  withParticles = true,
  particleCount = 6 
}: Card3DWrapperProps) {
  const { isHovered, mx, my, rx, ry, onMove, onLeave, onEnter } = use3DCard();

  return (
    <motion.div
      className={`group relative overflow-visible [perspective:1200px] cursor-pointer ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={onEnter}
    >
      {/* Outer glow effect */}
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(34,211,238,0.15), transparent 40%)",
        }}
        animate={{
          "--mouse-x": `${mx.get()}px`,
          "--mouse-y": `${my.get()}px`,
        } as Record<string, string>}
      />
      
      <motion.div
        className="relative transform-gpu"
        style={{ 
          rotateX: rx, 
          rotateY: ry, 
          transformStyle: "preserve-3d",
        }}
        whileHover={{ z: 50 }}
        transition={{ type: "spring", stiffness: 280, damping: 25 }}
      >
        {/* Main card with Projects styling */}
        <div className="relative rounded-2xl border-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md overflow-hidden">
          
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-2xl p-[1px]"
            style={{
              background: isHovered 
                ? "linear-gradient(135deg, rgba(34,211,238,0.6), rgba(168,85,247,0.4), rgba(34,211,238,0.6))"
                : "linear-gradient(135deg, rgba(34,211,238,0.3), rgba(168,85,247,0.2), rgba(34,211,238,0.3))",
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
            <div className="h-full w-full rounded-2xl bg-slate-900/80 backdrop-blur-md" />
          </motion.div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            animate={{
              background: `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)`,
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Content with 3D depth */}
          <div className="relative z-10 [transform-style:preserve-3d]">
            {children}
          </div>

          {/* Floating particles effect */}
          {withParticles && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(particleCount)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={isHovered ? {
                    y: [-10, -20, -10],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  } : {}}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
