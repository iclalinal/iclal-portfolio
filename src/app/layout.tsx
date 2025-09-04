import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "İclal İnal | Portfolio",
  description: "Embedded-first Software Developer • IoT & Web",
  metadataBase: new URL("https://example.com"),
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "İclal İnal | Portfolio",
    description: "Embedded-first Software Developer • IoT & Web",
    url: "https://example.com",
    siteName: "İclal İnal",
    images: [{ url: "/favicon.ico", width: 64, height: 64 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "İclal İnal | Portfolio",
    description: "Embedded-first Software Developer • IoT & Web",
    images: ["/favicon.ico"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0F14",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Preload critical fonts */}
        <link rel="preload" href="/fonts/geist-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        {/* Optimize resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js')
                  .then(() => console.log('SW registered'))
                  .catch(() => console.log('SW registration failed'));
              }
            `,
          }}
        />
      </head>
      <body className="bg-[#0B0F14] text-slate-100 antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
