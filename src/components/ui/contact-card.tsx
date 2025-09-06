"use client";

import { CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Card3DWrapper } from "@/components/ui/Card3DWrapper";
import { ExternalLink } from "lucide-react";

interface ContactCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href?: string | null;
  external?: boolean;
}

export function ContactCard({ icon: Icon, title, value, href, external }: ContactCardProps) {
  const cardContent = (
    <Card3DWrapper>
      <CardContent className="flex items-center space-x-4 p-6" style={{ transform: "translateZ(20px)" }}>
        <motion.div 
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Icon className="h-6 w-6 text-cyan-300" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent flex items-center gap-2">
            {title}
            {href ? (
              <ExternalLink
                className="w-4 h-4 text-cyan-300/80 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden
              />
            ) : null}
          </h3>
          <p className="text-sm text-slate-300 truncate">{value}</p>
        </div>
      </CardContent>
    </Card3DWrapper>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={`${title}: ${value}`}
        title={`${title}: ${value}`}
        className="block group cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {cardContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      className="group"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {cardContent}
    </motion.div>
  );
}

export default ContactCard;
