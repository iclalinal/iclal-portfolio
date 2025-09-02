import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import SkillsStrip from "@/components/SkillsStrip";

import { tr } from "@/lib/content";
import { projects } from "@/lib/data";

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />

        <Section id="projects" title={tr.sections.projects}>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map(p => <ProjectCard key={p.id} p={p} />)}
          </div>
        </Section>

        <Section id="skills" title={tr.sections.skills}>
          <SkillsStrip skills={[
            "TypeScript","React (Next.js)","PostgreSQL","SQLite","ExcelJS","ESP8266"
          ]}/>
        </Section>

        <Section id="experience" title={tr.sections.experience}>
          <div className="text-slate-400">Timeline burada olacak.</div>
        </Section>

        <Section id="contact" title={tr.sections.contact}>
          <div className="text-slate-400">E-posta ve sosyal linkler burada olacak.</div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
