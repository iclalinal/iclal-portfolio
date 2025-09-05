"use client";

import { CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Card3DWrapper } from "@/components/ui/Card3DWrapper";

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
          <h3 className="text-sm font-medium bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
            {title}
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
        className="block group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {cardContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {cardContent}
    </motion.div>
  );
}

export default ContactCard;
