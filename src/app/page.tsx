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

export default function Page() {
  const { c } = useI18n();
  return (
    <>
      <NavBar />
      <main>
        <Hero />

        <Section id="projects" title={c.sections.projects}>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ClipCard key={p.id} index={i}>
                <ProjectCard p={p} />
              </ClipCard>
            ))}
          </div>
        </Section>

        <Section id="skills" title={c.sections.skills}>
          <FadeIn>
            <SkillsStrip skills={c.skills} />
          </FadeIn>
        </Section>

        <Section id="experience" title={c.sections.experience}>
          <div className="text-slate-400">Timeline burada olacak.</div>
        </Section>

        <Section id="contact" title={c.sections.contact}>
          <div className="text-slate-400">E-posta ve sosyal linkler burada olacak.</div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
