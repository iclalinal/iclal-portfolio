import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import MotionProvider from "@/components/MotionProvider";

export const metadata: Metadata = {
  title: "İclal İnal - Software Developer",
  description: "Embedded systems and IoT specialist with expertise in ESP32, MQTT, Next.js, TypeScript, and modern web technologies. Computer Engineering student passionate about innovation.",
  keywords: ["İclal İnal", "Embedded Software", "IoT Developer", "ESP32", "MQTT", "Next.js", "TypeScript", "Computer Engineering", "Software Developer", "Web Development", "Gömülü Sistem", "Yazılım Geliştirici", "IoT Uzmanı", "Bilgisayar Mühendisliği", "Web Geliştirme", "Teknoloji", "Yazılım Mühendisi", "Frontend", "Backend", "Full Stack","İclal","İnal", "iclalinal", "iclalinal.com.tr", "iclalinal.com", "iclalinal.dev", "iclalinal.tech","iclal","inal"],
  metadataBase: new URL("https://iclalinal.com.tr"),
  alternates: {
    canonical: "https://iclalinal.com.tr",
  },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "İclal İnal -  Software Developer",
    description: "Embedded systems and IoT specialist with expertise in ESP32, MQTT, Next.js, TypeScript, and modern web technologies. Passionate about creating innovative solutions.",
    url: "https://iclalinal.com.tr",
    siteName: "İclal İnal Portfolio",
    images: [
      {
        url: "/favicon.ico",
        width: 64,
        height: 64,
        alt: "İclal İnal - Software Developer",
      }
    ],
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "İclal İnal - Software Developer",
    description: "Embedded systems and IoT specialist with expertise in ESP32, MQTT, Next.js, TypeScript, and modern web technologies.",
    images: ["/favicon.ico"],
    creator: "@iclalinal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0F14",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="dark" suppressHydrationWarning>
      <head>
        {/* Resource hints for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/favicon.ico" as="image" type="image/x-icon" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://iclalinal.com.tr/#person",
              "name": "İclal İnal",
              "jobTitle": "Software Developer",
              "description": "Embedded systems and IoT specialist with expertise in ESP32, MQTT, Next.js, TypeScript, and modern web technologies. Computer Engineering student passionate about innovation.",
              "url": "https://iclalinal.com.tr",
              "sameAs": [
                "https://github.com/iclalinal",
                "https://www.linkedin.com/in/iclal-inal-926771220/"
              ],
              "knowsAbout": [
                "Software Development",
                "Embedded Systems", 
                "IoT",
                "ESP32",
                "MQTT",
                "Next.js",
                "TypeScript",
                "React",
                "JavaScript",
                "Web Development",
                "Computer Engineering"
              ],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Computer Engineering"
              },
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance Developer"
              }
            })
          }}
        />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js')
                  .then(() => {
                    if (process.env.NODE_ENV === 'development') {
                      console.log('SW registered');
                    }
                  })
                  .catch(() => {
                    if (process.env.NODE_ENV === 'development') {
                      console.log('SW registration failed');
                    }
                  });
              }
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <MotionProvider>
          <PerformanceMonitor />
          <LanguageProvider>{children}</LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
