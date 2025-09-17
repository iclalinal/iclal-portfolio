"use client";
import { m, AnimatePresence } from "framer-motion";
import { DUR } from "@/lib/anim";
import { useI18n } from "@/lib/i18n";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import ContactCard from "@/components/ui/contact-card";
// no local state needed

export default function ContactSection() {
  const { c, lang } = useI18n();

  const contactItems = [
    {
      icon: Mail,
      label: c.contact.email.label,
      value: c.contact.email.value,
      href: `mailto:${c.contact.email.value}`,
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      icon: Linkedin,
      label: c.contact.linkedin.label,
      value: c.contact.linkedin.value,
      href: "https://www.linkedin.com/in/iclal-inal-926771220/",
      gradient: "from-blue-600 to-blue-400",
    },
    {
      icon: Github,
      label: c.contact.github.label,
      value: c.contact.github.value,
      href: "https://github.com/iclalinal",
      gradient: "from-slate-600 to-slate-400",
    },
    {
      icon: MapPin,
      label: c.contact.location.label,
      value: c.contact.location.value,
      href: null,
      gradient: "from-green-400 to-emerald-400",
    },
  ];

  // Email opens directly via the email contact card (mailto link)

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={lang}
        className="w-full relative overflow-hidden bg-slate-950 rounded-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: DUR.enter }}
      >
        {/* Background particles removed for a calmer look */}

        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/50" />

        {/* Content */}
        <m.div
          className="relative z-10 container mx-auto px-6 py-12 md:py-14"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.enter, delay: 0.2 }}
        >
          <m.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.enter }}
            className="text-center mb-10"
          >
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {c.contact.description}
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.enter, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto mb-4"
          >
            {contactItems.map((item) => (
              <ContactCard
                key={item.href || item.label}
                icon={item.icon}
                title={item.label}
                value={item.value}
                href={item.href}
                external={true}
              />
            ))}
          </m.div>

          {/* Removed extra email CTA button; email card already uses mailto */}
        </m.div>
      </m.div>
    </AnimatePresence>
  );
}
