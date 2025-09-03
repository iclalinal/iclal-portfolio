export type Content = {
  nav: { projects: string; skills: string; experience: string; contact: string };
  hero: { title: string; sub: string; ctaProjects: string; ctaCV: string };
  sections: { projects: string; skills: string; experience: string; contact: string };
};

export const content: Record<"tr" | "en", Content> = {
  tr: {
    nav: {
      projects: "Projeler",
      skills: "Yetenekler",
      experience: "Deneyim",
      contact: "İletişim",
    },
    hero: {
      title: "IoT & Web Odaklı Yazılım Geliştirici",
      sub: "Bağlı ürünler ve web uygulamaları geliştiriyorum.",
      ctaProjects: "Projeleri Gör",
      ctaCV: "CV İndir",
    },
    sections: {
      projects: "Öne Çıkan Projeler",
      skills: "Yetenekler",
      experience: "Deneyim",
      contact: "İletişim",
    },
  },
  en: {
    nav: {
      projects: "Projects",
      skills: "Skills",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      title: "IoT & Web‑focused Software Developer",
      sub: "I build connected products and web applications.",
      ctaProjects: "View Projects",
      ctaCV: "Download CV",
    },
    sections: {
      projects: "Featured Projects",
      skills: "Skills",
      experience: "Experience",
      contact: "Contact",
    },
  },
};

