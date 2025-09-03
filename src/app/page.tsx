"use client";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import SkillsStrip from "@/components/SkillsStrip";

import { useI18n } from "@/lib/i18n";
import { projects } from "@/lib/data";
import { FadeIn, ClipCard } from "@/components/anim/Reveal";
import { motion } from "framer-motion";
import ContactSection from "@/components/ContactSection";

export default function Page() {
  const { c } = useI18n();
  
  return (
    <div className="relative min-h-screen bg-slate-900 overflow-x-hidden">
      {/* Subtle background effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Main gradient backdrop - much more subtle */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800/50" />
        
        {/* Very subtle animated gradient orbs */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute top-2/3 right-1/3 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10,
          }}
        />

        {/* Very subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.008]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <NavBar />
      
      <main className="relative z-10">
        <Hero />

        <Section id="projects" title={c.sections.projects}>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            {projects.map((p, i) => (
              <ClipCard key={p.id} index={i}>
                <ProjectCard p={p} />
              </ClipCard>
            ))}
          </motion.div>
        </Section>

        <Section id="skills" title={c.sections.skills}>
          <FadeIn>
            <div className="relative">
              <SkillsStrip skills={c.skills} />
              
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-3xl blur-xl -z-10" />
            </div>
          </FadeIn>
        </Section>

        <Section id="experience" title={c.sections.experience}>
          <motion.div 
            className="relative p-8 rounded-3xl glass-effect border border-cyan-400/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-slate-300 text-center">
              <motion.div
                className="inline-block p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                🚧
              </motion.div>
              <p className="text-lg">{c.experience.placeholder}</p>
              <p className="text-sm text-slate-400 mt-2">{c.experience.comingSoon}</p>
            </div>
          </motion.div>
        </Section>

        <Section id="contact" title={c.sections.contact}>
          <ContactSection />
        </Section>
      </main>
      
      <Footer />
    </div>
  );
}
