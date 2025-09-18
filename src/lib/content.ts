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
  guestbook: {
    title: string;
    intro: string;
    form: {
      firstNamePlaceholder: string;
      lastNamePlaceholder: string;
      displayNamePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      submit: string;
      success: string;
      error: string;
      invalidEmail: string;
      required: string;
      messageTooLong: string;
    };
    list: {
      title: string;
      empty: string;
      fetchError: string;
    };
  };
  skills: string[];
};

export const content: Record<"tr" | "en", Content> = {
  tr: {
    nav: {
      projects: "Projeler",
      skills: "Yetenekler",
      experience: "Deneyim",
      contact: "Iletisim",
      guestbook: "Ziyaretci Defteri",
    },
    hero: {
      title: "Yazilim Gelistirici ve Bilgisayar Muhendisligi Ogrencisi",
      sub: "Web uygulamalari ve IoT projeleri dahil farkli alanlarda deneyim kazaniyorum.",
      ctaProjects: "Projeleri Gor",
      ctaCV: "CV'yi Goruntule",
      cvUrl: "https://drive.google.com/file/d/1qyJrN6jFcaKQkuUvwzmKjyQwQr03dghV/view?usp=sharing",
    },
    sections: {
      projects: "One Cikan Projeler",
      skills: "Yetenekler",
      experience: "Deneyim",
      contact: "Iletisim",
    },
    experience: {
      title: "Deneyim",
      placeholder: "Zaman cizelgesi burada olacak.",
      comingSoon: "Yakinda gelecek...",
    },
    contact: {
      title: "Iletisim",
      description: "Yeni projeler, fikirler veya sadece merhaba demek icin bana ulasabilirsiniz. Ogrenmeye ve kendimi gelistirmeye her zaman acigim.",
      infoTitle: "Iletisim Bilgileri",
      quickTitle: "Hizli Iletisim",
      quickDescription: "Projeler, yazilim dunyasi ya da teknoloji uzerine sohbet etmek icin bana yazabilirsiniz.",
      emailButton: "E-posta Gonder",
      linkedinButton: "LinkedIn'de Baglan",
      responseTime: "Genellikle 24 saat icinde yanitliyorum",
      email: { label: "E-posta", value: "iletisim@iclalinal.com.tr" },
      linkedin: { label: "LinkedIn", value: "linkedin.com/in/iclal-inal" },
      github: { label: "GitHub", value: "github.com/iclalinal" },
      location: { label: "Konum", value: "Turkiye - Uzaktan calismaya acik" },
    },
    guestbook: {
      title: "Ziyaretci Defteri",
      intro: "Selam birakmak, projeler hakkinda dusuncelerinizi paylasmak veya iletisim kurmak isterseniz buraya yazabilirsiniz.",
      form: {
        firstNamePlaceholder: "Ad",
        lastNamePlaceholder: "Soyad",
        displayNamePlaceholder: "Sitede gorunecek ad",
        emailPlaceholder: "E-posta",
        messagePlaceholder: "Mesajiniz",
        submit: "Gonder",
        success: "Mesaj alindi. Onaydan sonra gorunecek.",
        error: "Form gonderilirken bir sorun olustu. Lutfen tekrar deneyin.",
        invalidEmail: "Gecerli bir e-posta adresi girin.",
        required: "Lutfen butun alanlari doldurun.",
        messageTooLong: "Mesajiniz 2000 karakterden kisa olmali.",
      },
      list: {
        title: "Onaylanan Mesajlar",
        empty: "Henuz yayinlanan bir mesaj yok.",
        fetchError: "Kayitlar yuklenirken bir sorun olustu.",
      },
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
      "Sensor Entegrasyonu (DHT22, MPU6050, HC-SR04 vb.)",
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
      title: "Software Developer and Computer Engineering Student",
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
      description: "You can reach out for new projects, ideas, or just to say hello. I am always eager to learn and improve myself.",
      infoTitle: "Contact Information",
      quickTitle: "Quick Contact",
      quickDescription: "Feel free to message me to talk about projects, software, or technology in general.",
      emailButton: "Send Email",
      linkedinButton: "Connect on LinkedIn",
      responseTime: "I usually respond within 24 hours",
      email: { label: "Email", value: "iletisim@iclalinal.com.tr" },
      linkedin: { label: "LinkedIn", value: "linkedin.com/in/iclal-inal" },
      github: { label: "GitHub", value: "github.com/iclalinal" },
      location: { label: "Location", value: "Turkey - Open to remote work" },
    },
    guestbook: {
      title: "Guestbook",
      intro: "Leave a hello, share your thoughts on the projects, or let me know how we can collaborate.",
      form: {
        firstNamePlaceholder: "First name",
        lastNamePlaceholder: "Last name",
        displayNamePlaceholder: "Display name on site",
        emailPlaceholder: "Email",
        messagePlaceholder: "Your message",
        submit: "Submit",
        success: "Message received. It will appear after approval.",
        error: "Something went wrong while sending the form. Please try again.",
        invalidEmail: "Please enter a valid email address.",
        required: "Please fill in all required fields.",
        messageTooLong: "Your message must be under 2000 characters.",
      },
      list: {
        title: "Approved Messages",
        empty: "No messages have been published yet.",
        fetchError: "We could not load the guestbook entries.",
      },
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
