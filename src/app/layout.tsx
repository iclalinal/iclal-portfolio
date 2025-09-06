import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "İclal İnal",
  description: "Embedded-first Software Developer · IoT & Web",
  metadataBase: new URL("https://iclalinal.com.tr"),
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "İclal İnal",
    description: "Embedded-first Software Developer · IoT & Web",
    url: "https://iclalinal.com.tr",
    siteName: "İclal İnal",
    images: [{ url: "/favicon.ico", width: 64, height: 64 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "İclal İnal",
    description: "Embedded-first Software Developer · IoT & Web",
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
        {/* Font preload removed: file not present in /public/fonts */}
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
      <body className="antialiased" suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
