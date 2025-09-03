export type Project = {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  cover?: string;
  details?: string[];
};

export const projects: Project[] = [
  {
    id: "tse-automation",
    title: "TSE Automation",
    desc: "Laboratuvar yönetimi ve raporlama.",
    tags: ["React+TS", "Node", "SQLite", "ExcelJS", "Cron"],
    details: [
      "1",
      "2",
    ],
  },
  {
    id: "atiker-analytics",
    title: "Atiker Analytics",
    desc: "Satın alma trendleri ve segment bazlı analiz dashboard'ları.",
    tags: ["SQL", "Dashboard", "Raporlama", "Clomosy"],
  },
  {
    id: "esp8266-logger",
    title: "ESP8266 Sensor Logger",
    desc: "ESP8266 ile veri toplayıcı.",
    tags: ["ESP8266", "IoT"],
  },
];

