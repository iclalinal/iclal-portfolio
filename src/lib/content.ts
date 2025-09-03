export type Content = {
  nav: { projects: string; skills: string; experience: string; contact: string };
  hero: { title: string; sub: string; ctaProjects: string; ctaCV: string };
  sections: { projects: string; skills: string; experience: string; contact: string };
  experience: {
    title: string;
    placeholder: string;
    comingSoon: string;
  };
  contact: {
    title: string;
    description: string;
    infoTitle: string;
    quickTitle: string;
    quickDescription: string;
    emailButton: string;
    linkedinButton: string;
    responseTime: string;
    email: { label: string; value: string };
    linkedin: { label: string; value: string };
    github: { label: string; value: string };
    location: { label: string; value: string };
  };
  skills: string[];
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
    experience: {
      title: "Deneyim",
      placeholder: "Timeline burada olacak.",
      comingSoon: "Yakında gelecek...",
    },
    contact: {
      title: "İletişim",
      description: "Yeni projeler, iş birlikleri veya sadece merhaba demek için bana ulaşabilirsiniz. Teknoloji ve inovasyon hakkında konuşmayı seviyorum!",
      infoTitle: "İletişim Bilgileri",
      quickTitle: "Hızlı İletişim",
      quickDescription: "Projeleriniz için teknik danışmanlık, web geliştirme hizmetleri veya iş birliği fırsatları hakkında konuşalım.",
      emailButton: "E-posta Gönder",
      linkedinButton: "LinkedIn'de Bağlan",
      responseTime: "Genellikle 24 saat içinde yanıtlıyorum ⚡",
      email: { label: "E-posta", value: "iclal.inal@example.com" },
      linkedin: { label: "LinkedIn", value: "linkedin.com/in/iclal-inal" },
      github: { label: "GitHub", value: "github.com/iclalinal" },
      location: { label: "Konum", value: "Türkiye" },
    },
    skills: [
      "TypeScript",
      "React (Next.js)",
      "PostgreSQL",
      "SQLite",
      "ExcelJS",
      "ESP8266",
    ],
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
    experience: {
      title: "Experience",
      placeholder: "Timeline will be here.",
      comingSoon: "Coming soon...",
    },
    contact: {
      title: "Contact",
      description: "Feel free to reach out for new projects, collaborations, or just to say hello. I love discussing technology and innovation!",
      infoTitle: "Contact Information",
      quickTitle: "Quick Contact",
      quickDescription: "Let's discuss technical consulting, web development services, or collaboration opportunities for your projects.",
      emailButton: "Send Email",
      linkedinButton: "Connect on LinkedIn",
      responseTime: "I usually respond within 24 hours ⚡",
      email: { label: "Email", value: "iclal.inal@example.com" },
      linkedin: { label: "LinkedIn", value: "linkedin.com/in/iclal-inal" },
      github: { label: "GitHub", value: "github.com/iclalinal" },
      location: { label: "Location", value: "Turkey" },
    },
    skills: [
      "TypeScript",
      "React (Next.js)",
      "PostgreSQL",
      "SQLite",
      "ExcelJS",
      "ESP8266",
    ],
  },
};
