import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "İclal İnal — Portfolio",
  description: "Embedded-first Software Developer — IoT & Web",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="bg-[#0B0F14] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
