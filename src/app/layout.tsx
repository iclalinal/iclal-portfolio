import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import MotionProvider from "@/components/MotionProvider";

export const metadata: Metadata = {
  title: "İclal İnal",
  description: "Embedded-first Software Developer · IoT & Web",
  metadataBase: new URL("https://iclalinal.com.tr"),
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "İclal İnal",
    description: "Exploring software, IoT, and a bit of everything.",
    url: "https://iclalinal.com.tr",
    siteName: "İclal İnal",
    images: [{ url: "/favicon.ico", width: 64, height: 64 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "İclal İnal",
    description: "Exploring software, IoT, and a bit of everything.",
    images: ["/favicon.ico"],
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
