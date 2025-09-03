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
      icon: <Mail className="w-6 h-6 text-white" />,
      label: c.contact.email.label,
      value: c.contact.email.value,
      href: `mailto:${c.contact.email.value}`,
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      icon: <Linkedin className="w-6 h-6 text-white" />,
      label: c.contact.linkedin.label,
      value: c.contact.linkedin.value,
      href: "https://www.linkedin.com/in/iclal-inal-926771220/",
      gradient: "from-blue-600 to-blue-400",
    },
    {
      icon: <Github className="w-6 h-6 text-white" />,
      label: c.contact.github.label,
      value: c.contact.github.value,
      href: "https://github.com/iclalinal",
      gradient: "from-slate-600 to-slate-400",
    },
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
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

  // Sabit partikül pozisyonları (hydration mismatch'i önlemek için)
  const particlePositions = [
    { left: "10%", top: "20%" },
    { left: "90%", top: "15%" },
    { left: "25%", top: "80%" },
    { left: "75%", top: "25%" },
    { left: "50%", top: "60%" },
    { left: "15%", top: "50%" },
    { left: "85%", top: "70%" },
    { left: "35%", top: "10%" },
    { left: "65%", top: "90%" },
    { left: "5%", top: "75%" },
    { left: "95%", top: "35%" },
    { left: "45%", top: "5%" },
    { left: "55%", top: "85%" },
    { left: "30%", top: "45%" },
    { left: "70%", top: "55%" },
  ];

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
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: position.left,
              top: position.top,
            }}
            animate={{
              x: [0, (i % 2 === 0 ? 100 : -100)],
              y: [0, (i % 3 === 0 ? 100 : -100)],
              scale: [1, 1 + (i % 3) * 0.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

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
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16"
        >
          {contactItems.map((item, index) => (
            <ContactCard
              icon={item.icon}
              label={item.label}
              value={item.value}
              href={item.href}
              gradient={item.gradient}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Call to action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.enter, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <AnimatedButton
            variant="primary"
            onClick={handleEmailClick}
            icon={<Mail className="w-5 h-5" />}
          >
            {c.contact.emailButton}
          </AnimatedButton>

          <AnimatedButton
            variant="secondary"
            href="/cv.pdf"
            external
          >
            {c.nav.contact === "Contact" ? "Download CV" : "CV İndir"}
          </AnimatedButton>
        </motion.div>
      </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
