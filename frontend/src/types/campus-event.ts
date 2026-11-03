// Bir etkinliğin "tarifi": her kayıt bu alanlara sahip olmak zorunda.

// Kategori sadece bu 4 değerden biri olabilir (union type).
export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Fuar";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:mm"
  location: string;
  description: string;
  image?: string; // afiş isteğe bağlı
}

// Formdan gelen veri: id'yi Context verir.
export type CampusEventInput = Omit<CampusEvent, "id">;
