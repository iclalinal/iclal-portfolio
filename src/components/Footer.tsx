"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Sabit partikül pozisyonları (hydration mismatch'i önlemek için)
  const particlePositions = [
    { left: "20%", top: "30%" },
    { left: "80%", top: "20%" },
    { left: "40%", top: "70%" },
    { left: "60%", top: "80%" },
  ];

  return (
    <motion.footer 
      className="relative mt-24 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
      
      {/* Animated border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.5), rgba(168,85,247,0.3), rgba(34,211,238,0.5), transparent)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "200% 0%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Subtle background particles - reduced count */}
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
              y: [-10, -20, -10],
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + (i % 2) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 py-12">
        {/* Main content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              İclal İnal
            </h3>
            <p className="text-slate-400 text-sm max-w-md">
              Creating innovative solutions with passion and precision
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            {[
              { icon: Github, href: "https://github.com/iclalinal", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/iclal-inal-926771220/", label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative p-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 overflow-hidden"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.28 }}
              >
                {/* Background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.2 }}
                />
                
                {/* Icon */}
                <Icon className="relative z-10 w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors duration-200" />
                
                {/* Tooltip */}
                <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {label}
                </span>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-sm text-slate-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <span className="flex items-center gap-2">
            © {currentYear} İclal İnal. Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-4 h-4 text-red-400 fill-current" />
            </motion.span>
            and lots of coffee
          </span>
          
          
        </motion.div>
      </div>
    </motion.footer>
  );
}
