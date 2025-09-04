"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import type { Project } from "@/lib/data";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";

export default function ProjectCard({ p }: { p: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const ry = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (e.clientY - centerY) / rect.height * -15;
    const rotateY = (e.clientX - centerX) / rect.width * 15;
    
    mx.set(e.clientX - centerX);
    my.set(e.clientY - centerY);
    rx.set(rotateX);
    ry.set(rotateY);
  }

  function onLeave() {
    setIsHovered(false);
    mx.set(0);
    my.set(0);
    rx.set(0);
    ry.set(0);
  }

  function onEnter() {
    setIsHovered(true);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          className="group relative overflow-visible [perspective:1200px] cursor-pointer"
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
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
          >
            {/* Main card */}
            <Card className="relative rounded-2xl border-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md overflow-hidden">
              
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
                <CardHeader style={{ transform: "translateZ(40px)" }} className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    <span>{p.title}</span>
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
                      animate={{ 
                        scale: isHovered ? [1, 1.2, 1] : 1,
                        boxShadow: isHovered 
                          ? "0 0 20px rgba(34,211,238,0.8)" 
                          : "0 0 10px rgba(34,211,238,0.4)"
                      }}
                      transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                    />
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4" style={{ transform: "translateZ(20px)" }}>
                  <p className="text-slate-300 text-sm leading-relaxed">{p.desc}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t, idx) => (
                      <motion.div
                        key={t}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Badge 
                          variant="outline" 
                          className="border-cyan-400/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/60 transition-all duration-200 text-xs px-2 py-1"
                        >
                          {t}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </div>

              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
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
            </Card>
          </motion.div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-cyan-400/30 text-slate-100 backdrop-blur-xl rounded-2xl max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {p.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-slate-300 leading-relaxed">{p.desc}</p>
          {(p.details ?? []).length > 0 && (
            <div className="space-y-2">
              <h4 className="text-cyan-400 font-semibold">Özellikler:</h4>
              <ul className="list-none space-y-2">
                {(p.details ?? []).map((d, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-3 text-slate-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    {d}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            {p.tags.map((t) => (
              <Badge 
                key={t} 
                variant="outline" 
                className="border-cyan-400/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
