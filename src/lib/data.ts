import { type LucideIcon, Coffee, Target, Gamepad2, Activity, MapPin, Zap } from "lucide-react";
export type { Lang } from "@/lib/i18n";

// Minimal project shape consumed by ProjectCard
export type Project = {
  title: string;
  desc: string;
  tags: string[];
  details?: string[];
  // Optional repository or project link for the card shortcut
  link?: string;
};

export type FunFact = {
  icon: LucideIcon;
  title: string;
  value?: string | number;
  description?: string;
};

export const funFacts: Record<"tr" | "en", FunFact[]> = {
  tr: [
    { icon: Activity, title: "Taekwondo", value: "8 yıl", description: "Siyah kuşağa giden yolculuk." },
    { icon: MapPin, title: "Favori şehir", value: "Kopenhag", description: "Yaşanabilirlik ve tasarım başkenti." },
    { icon: Target, title: "Sıradaki hedef", value: "Japonya", description: "Kültür, teknoloji, trenler!" },
    { icon: Zap, title: "Rekor", value: "49 saat", description: "Dışarıda kesintisiz maraton." },
    { icon: Gamepad2, title: "Favori oyun", value: "Stardew Valley", description: "Relax + üretkenlik kombosu." },
    { icon: Coffee, title: "Yakıt", value: "Kahve", description: "Kahvesiz kod yazamam." },
  ],
  en: [
    { icon: Activity, title: "Taekwondo", value: "8 years", description: "On the road to black belt." },
    { icon: MapPin, title: "Favorite city", value: "Copenhagen", description: "Livability and design capital." },
    { icon: Target, title: "Next destination", value: "Japan", description: "Culture, tech, and trains!" },
    { icon: Zap, title: "Record", value: "49 hours", description: "Nonstop time spent outdoors." },
    { icon: Gamepad2, title: "Favorite game", value: "Stardew Valley", description: "Relaxing yet productive vibes." },
    { icon: Coffee, title: "Fuel", value: "Coffee", description: "Can’t code without it." },
  ],
};

// Experience timeline data
export type Experience = {
  id: string;
  role: string;
  company: string;
  location?: string;
  start: string;
  end?: string;
  type: "internship" | "full-time" | "part-time" | "freelance" | "volunteering";
  highlights: string[];
  tech?: string[];
  link?: string;
};

export const labels = {
  tr: {
    sectionTitle: "Deneyim",
    present: "Güncel",
    emptyTitle: "Timeline burada olacak.",
    emptyDesc: "Yakında gelecek...",
    viewMore: "Detay",
  },
  en: {
    sectionTitle: "Experience",
    present: "Present",
    emptyTitle: "Timeline will be here.",
    emptyDesc: "Coming soon...",
    viewMore: "Details",
  },
};

export const experiences: Record<"tr" | "en", Experience[]> = {
  tr: [
    {
      id: "tse-intern",
      role: "Stajyer – TSE (Türk Standartları Enstitüsü)",
      company: "TSE",
      location: "Ankara, Türkiye",
      start: "Jun 2024",
      end: "Sep 2024",
      type: "internship",
      highlights: [
        "Lab otomasyonu için web uygulaması (React + TypeScript + Vite)",
        "Raporlama modülleri ve veri akışı",
        "Offline EXE için SQLite geçişi ve senkronizasyon",
        "Fiyatlandırma mantığı ve dashboardlar",
      ],
      tech: ["React", "TypeScript", "Vite", "Node.js", "Express", "SQLite", "PostgreSQL"],
      link: "https://www.tse.org.tr/",
    },
    {
      id: "atiker-intern",
      role: "Stajyer – Atiker Yazılım",
      company: "Atiker Yazılım",
      location: "Konya, Türkiye",
      start: "Jul 2023",
      end: "Sep 2023",
      type: "internship",
      highlights: [
        "Müşteri davranışı analitik dashboardu",
        "SQL Server → SQLite denemeleri",
        "Grafikler ve filtreleme",
      ],
      tech: ["C#/.NET", "SQL Server", "React", "Charts"],
    },
    {
      id: "volunteering",
      role: "Topluluk ve Gönüllülük",
      company: "Teknofest ve öğrenci toplulukları",
      location: "Türkiye",
      start: "2022-01-01",
      type: "volunteering",
      highlights: [
        "Etkinlik organizasyonunda gönüllülük",
        "Takım koordinasyonu ve mentorluk",
        "Etkinlik günlerinde teknik destek",
      ],
      tech: ["Teamwork", "Community", "Mentoring"],
    },
  ],
  en: [
    {
      id: "tse-intern",
      role: "Intern – TSE (Turkish Standards Institution)",
      company: "TSE",
      location: "Ankara, Türkiye",
      start: "Jun 2024",
      end: "Sep 2024",
      type: "internship",
      highlights: [
        "Lab automation web app (React + TypeScript + Vite)",
        "Reporting modules and data flow",
        "SQLite migration for offline EXE with sync",
        "Pricing logic and dashboards",
      ],
      tech: ["React", "TypeScript", "Vite", "Node.js", "Express", "SQLite", "PostgreSQL"],
      link: "https://www.tse.org.tr/",
    },
    {
      id: "atiker-intern",
      role: "Intern – Atiker Yazılım",
      company: "Atiker Yazılım",
      location: "Konya, Türkiye",
      start: "Jul 2023",
      end: "Sep 2023",
      type: "internship",
      highlights: [
        "Customer behavior analytics dashboard",
        "Trials migrating SQL Server → SQLite",
        "Charts and flexible filters",
      ],
      tech: ["C#/.NET", "SQL Server", "React", "Charts"],
    },
    {
      id: "volunteering",
      role: "Community & Volunteering",
      company: "Teknofest and student communities",
      location: "Türkiye",
      start: "2022-01-01",
      type: "volunteering",
      highlights: [
        "Volunteered at events and competitions",
        "Coordinated teams and mentored peers",
        "Offered technical support during events",
      ],
      tech: ["Teamwork", "Community", "Mentoring"],
    },
  ],
};

// Project list used on the home page
export type ProjectItem = Project & { id: string };

export const projects: Record<"tr" | "en", ProjectItem[]> = {
  tr: [
    {
      id: "excelet",
      title: "ExcelET",
      desc: "Electron + React ile geliştirilen, Excel automations ve ETL akışları için masaüstü aracı.",
      tags: ["Electron", "React", "TypeScript", "ExcelJS"],
      link: "https://iclalinal.com.tr",
      details: [
        "Büyük dosyalar için streaming ve bellek dostu işleme",
        "Özel formüller ve şablon desteği",
        "CSV/JSON içe/dışa aktarma",
      ],
    },
    {
      id: "iot-dashboard",
      title: "IoT Dashboard",
      desc: "ESP8266 cihazlarından toplanan telemetrileri görselleştiren gerçek‑zamanlı web arayüzü.",
      tags: ["Next.js", "WebSocket", "ESP8266", "Tailwind"],
      link: "https://iclalinal.com.tr",
      details: [
        "Canlı grafikler ve uyarılar",
        "Cihaz yapılandırma sihirbazı",
        "Karanlık/aydınlık tema",
      ],
    },
    {
      id: "portfolio",
      title: "Kişisel Portföy",
      desc: "Modern app router mimarisi, animasyonlar ve i18n ile kişisel site.",
      tags: ["Next.js", "TypeScript", "Framer Motion", "i18n"],
      link: "https://iclalinal.com.tr",
      details: [
        "TR/EN dil desteği",
        "Shadcn UI bileşenleri",
        "Responsif tasarım ve performans iyileştirmeleri",
      ],
    },
  ],
  en: [
    {
      id: "excelet",
      title: "ExcelET",
      desc: "Desktop tool for Excel automations and ETL workflows, built with Electron + React.",
      tags: ["Electron", "React", "TypeScript", "ExcelJS"],
      link: "https://iclalinal.com.tr",
      details: [
        "Streaming and memory-friendly processing for large files",
        "Custom formulas and template support",
        "CSV/JSON import/export capabilities",
      ],
    },
    {
      id: "iot-dashboard",
      title: "IoT Dashboard",
      desc: "Real-time web interface for visualizing telemetry data collected from ESP8266 devices.",
      tags: ["Next.js", "WebSocket", "ESP8266", "Tailwind"],
      link: "https://iclalinal.com.tr",
      details: [
        "Live charts and alerts",
        "Device configuration wizard",
        "Dark/light theme support",
      ],
    },
    {
      id: "portfolio",
      title: "Personal Portfolio",
      desc: "Personal website with modern app router architecture, animations and i18n support.",
      tags: ["Next.js", "TypeScript", "Framer Motion", "i18n"],
      link: "https://iclalinal.com.tr",
      details: [
        "TR/EN language support",
        "Shadcn UI components",
        "Responsive design and performance optimizations",
      ],
    },
  ],
};
