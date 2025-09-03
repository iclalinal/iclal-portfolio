import type { Metadata } from "next";
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
  themeColor: "#0B0F14",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="bg-[#0B0F14] text-slate-100 antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
