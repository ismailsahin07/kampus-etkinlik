/**
 * data.js — Kampüs Etkinlik veri kaynağı
 * Student: 2211012053
 *
 * Blueprint rules:
 *  - All 7 fields (id, title, category, date, time, location, description, capacity) on every event.
 *  - id values are unique.
 *  - date  → DD-MM-YYYY
 *  - time  → HH:mm
 *  - Categories are consistent exact strings (no case mixing).
 *  - At least 2 categories have more than one event (Seminer × 2, Atölye × 2).
 */

export const events = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans",
    description: "Şirketlerle tanışma fırsatı bulacağınız Kariyer Günleri'nde staj ve iş fırsatlarını keşfedebilir, sektör temsilcileriyle birebir görüşme imkanı bulabilirsiniz.",
    capacity: 300
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "20-10-2026",
    time: "10:00",
    location: "Lab 2",
    description: "Robotik atölyesindeki laboratuvara katılın ve geleceğin teknolojilerini keşfedin.",
    capacity: 120
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    date: "27-10-2026",
    time: "13:00",
    location: "B Blok",
    description: "Siber güvenlik alanındaki uzmanlarla gerçekleştirilecek söyleşiye katılın ve dijital güvenliğin geleceğini keşfedin.",
    capacity: 200
  },
  {
    id: "event-4",
    title: "Yapay Zeka ve Gelecek",
    category: "Seminer",
    date: "03-11-2026",
    time: "15:00",
    location: "A Blok Konferans",
    description: "Yapay zekanın iş dünyasına ve günlük yaşama etkileri üzerine uzman konuşmacıların katıldığı kapsamlı bir seminer.",
    capacity: 250
  },
  {
    id: "event-5",
    title: "Web Geliştirme Atölyesi",
    category: "Atölye",
    date: "10-11-2026",
    time: "09:00",
    location: "Bilgisayar Lab 1",
    description: "HTML, CSS ve JavaScript temelleri üzerine uygulamalı workshop. Kendi projeni oluşturmaya hazır ol!",
    capacity: 40
  },
  {
    id: "event-6",
    title: "Kampüs Bahar Fuarı",
    category: "Fuar",
    date: "17-11-2026",
    time: "10:00",
    location: "Merkez Kampüs",
    description: "Kulüpler, stantlar ve etkinliklerle dolu bir gün seni bekliyor. Kampüs hayatını daha yakından tanı.",
    capacity: 500
  }
];

