"use client";
import { motion, AnimatePresence } from "framer-motion";
import { DUR } from "@/lib/anim";
import { useI18n } from "@/lib/i18n";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import ContactCard from "@/components/ui/contact-card";
import AnimatedButton from "@/components/ui/animated-button";
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

  const handleEmailClick = () => {
    const subject = c.nav.contact === "Contact" ? "About Project" : "Proje Hakkında";
    const body = c.nav.contact === "Contact" ? "Hello İclal," : "Merhaba İclal,";
    window.open(`mailto:${c.contact.email.value}?subject=${subject}&body=${body}`, '_blank');
  };

  // Not needed anymore; we key by lang directly to remount consistently on language change

  // particles removed

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={lang}
        className="w-full min-h-screen relative overflow-hidden bg-slate-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: DUR.enter }}
      >
      {/* Background particles removed for a calmer look */}

      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/50" />

      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.enter, delay: 0.2 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.enter }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            {c.contact.title}
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {c.contact.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.enter, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto mb-16"
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
        </motion.div>

        {/* Call to action button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.enter, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <AnimatedButton
            variant="primary"
            onClick={handleEmailClick}
            ariaLabel={c.nav.contact === "Contact" ? "Send email" : "E-posta gönder"}
            icon={<Mail className="w-5 h-5" />}
          >
            {c.contact.emailButton}
          </AnimatedButton>
        </motion.div>
      </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
