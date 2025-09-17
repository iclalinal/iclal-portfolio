export type Content = {
  nav: { projects: string; skills: string; experience: string; contact: string; guestbook: string };
  hero: { title: string; sub: string; ctaProjects: string; ctaCV: string; cvUrl: string };
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
      guestbook: "Ziyaretçi Defteri",
    },
    hero: {
      title: "Yazılım Geliştirici  • Bilgisayar Mühendisliği Öğrencisi ",
      sub: "Web uygulamaları ve IoT projeleri dahil farklı alanlarda deneyim kazanmaya çalışıyorum.",
      ctaProjects: "Projeleri Gör",
      ctaCV: "CV'yi Görüntüle",
      cvUrl: "https://drive.google.com/file/d/1qyJrN6jFcaKQkuUvwzmKjyQwQr03dghV/view?usp=sharing",
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
      description: "Yeni projeler, fikirler veya sadece merhaba demek için bana ulaşabilirsiniz. Öğrenmeye ve kendimi geliştirmeye her zaman açığım.",
      infoTitle: "İletişim Bilgileri",
      quickTitle: "Hızlı İletişim",
      quickDescription: "Projeler, yazılım dünyası ya da teknoloji üzerine sohbet etmek için bana yazabilirsiniz.",
      emailButton: "E-posta Gönder",
      linkedinButton: "LinkedIn'de Bağlan",
      responseTime: "Genellikle 24 saat içinde yanıtlıyorum ⚡",
      email: { label: "E-posta", value: "iletisim@iclalinal.com.tr" },
      linkedin: { label: "LinkedIn", value: "linkedin.com/in/iclal-inal" },
      github: { label: "GitHub", value: "github.com/iclalinal" },
      location: { label: "Konum", value: "Türkiye • Uzaktan çalışmaya açık 🌍" },
    },
    skills: [
      "TypeScript",
      "React (Next.js, Vite)",
      "Node.js & Express",
      "Python",
      "C / C++ / C#",
      "PostgreSQL & SQLite",
      "SQL Server",
      "Docker",
      "Git/GitHub",
      "ESP8266 & Arduino",
      "MQTT & CAN-Bus",
      "Sensör Entegrasyonu (DHT22, MPU6050, HC-SR04 vb.)",
    ],
  },
  en: {
    nav: {
      projects: "Projects",
      skills: "Skills",
      experience: "Experience",
      contact: "Contact",
      guestbook: "Guestbook",
    },
    hero: {
      title: "Software Developer Computer Engineering Student",
      sub: "I am working to gain experience in areas ranging from web applications to IoT projects.",
      ctaProjects: "View Projects",
      ctaCV: "View CV",
      cvUrl: "https://drive.google.com/file/d/1_YOtwhDTwMRnvwTM3dd4ClXr_15It5Qt/view?usp=sharing",
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
      description: "You can reach out for new projects, ideas, or just to say hello. I’m always eager to learn and improve myself.",
      infoTitle: "Contact Information",
      quickTitle: "Quick Contact",
      quickDescription: "Feel free to message me to talk about projects, software, or technology in general.",
      emailButton: "Send Email",
      linkedinButton: "Connect on LinkedIn",
      responseTime: "I usually respond within 24 hours ⚡",
      email: { label: "Email", value: "iletisim@iclalinal.com.tr" },
      linkedin: { label: "LinkedIn", value: "linkedin.com/in/iclal-inal" },
      github: { label: "GitHub", value: "github.com/iclalinal" },
      location: { label: "Location", value: "Türkiye • Open to remote work 🌍" },
    },
    skills: [
      "TypeScript",
      "React (Next.js, Vite)",
      "Node.js & Express",
      "Python",
      "C / C++ / C#",
      "PostgreSQL & SQLite",
      "SQL Server",
      "Docker",
      "Git/GitHub",
      "ESP8266 & Arduino",
      "MQTT & CAN-Bus",
      "Sensor Integration (DHT22, MPU6050, HC-SR04 etc.)"
    ],
  },
};
