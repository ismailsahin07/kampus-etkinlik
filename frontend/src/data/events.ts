// Sprint 3'teki data.js'in tipli hâli: CampusEvent tarifine uyan 6 kayıt.
import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans",
    description:
      "Şirketlerle tanışma fırsatı bulacağınız Kariyer Günleri'nde staj ve iş fırsatlarını keşfedebilir, sektör temsilcileriyle birebir görüşme imkanı bulabilirsiniz.",
    capacity: 300,
    image: "/afis.svg",
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "2026-10-20",
    time: "10:00",
    location: "Lab 2",
    description:
      "Robotik atölyesindeki laboratuvara katılın ve geleceğin teknolojilerini keşfedin.",
    capacity: 120,
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    date: "2026-10-27",
    time: "13:00",
    location: "B Blok",
    description:
      "Siber güvenlik alanındaki uzmanlarla gerçekleştirilecek söyleşiye katılın ve dijital güvenliğin geleceğini keşfedin.",
    capacity: 200,
  },
  {
    id: "event-4",
    title: "Yapay Zeka ve Gelecek",
    category: "Seminer",
    date: "2026-11-03",
    time: "15:00",
    location: "A Blok Konferans",
    description:
      "Yapay zekanın iş dünyasına ve günlük yaşama etkileri üzerine uzman konuşmacıların katıldığı kapsamlı bir seminer.",
    capacity: 250,
  },
  {
    id: "event-5",
    title: "Web Geliştirme Atölyesi",
    category: "Atölye",
    date: "2026-11-10",
    time: "09:00",
    location: "Bilgisayar Lab 1",
    description:
      "HTML, CSS ve JavaScript temelleri üzerine uygulamalı workshop. Kendi projeni oluşturmaya hazır ol!",
    capacity: 40,
  },
  {
    id: "event-6",
    title: "Kampüs Bahar Fuarı",
    category: "Fuar",
    date: "2026-11-17",
    time: "10:00",
    location: "Merkez Kampüs",
    description:
      "Kulüpler, stantlar ve etkinliklerle dolu bir gün seni bekliyor. Kampüs hayatını daha yakından tanı.",
    capacity: 500,
  },
];
