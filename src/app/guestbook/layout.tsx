import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ziyaretçi Defteri - İclal İnal",
  description: "İclal İnal'ın ziyaretçi defteri. Düşüncelerinizi ve geri bildirimlerinizi paylaşın.",
  alternates: {
    canonical: "https://iclalinal.com.tr/guestbook",
  },
  openGraph: {
    title: "Ziyaretçi Defteri - İclal İnal",
    description: "İclal İnal'ın ziyaretçi defteri. Düşüncelerinizi ve geri bildirimlerinizi paylaşın.",
    url: "https://iclalinal.com.tr/guestbook",
    siteName: "İclal İnal Portfolio",
  },
};

export default function GuestbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
