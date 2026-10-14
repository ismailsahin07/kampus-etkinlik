// Saf fonksiyonlar: girdi alır, sonuç döndürür, DOM'a dokunmaz.
import type { CampusEvent, Category } from "../types/campus-event";

/** Başlıkta veya açıklamada metni arar (büyük/küçük harf duyarsız). */
export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
  const q = text.trim().toLocaleLowerCase("tr-TR");
  return list.filter(
    (e) =>
      e.title.toLocaleLowerCase("tr-TR").includes(q) ||
      e.description.toLocaleLowerCase("tr-TR").includes(q),
  );
}

/** Kategori "" ise hepsini, değilse sadece o kategoriyi döndürür. */
export function filterByCategory(
  list: CampusEvent[],
  category: Category | "",
): CampusEvent[] {
  if (category === "") return list;
  return list.filter((e) => e.category === category);
}

/** id'ye göre tek etkinlik; yoksa undefined. */
export function findEventById(
  list: CampusEvent[],
  id: string,
): CampusEvent | undefined {
  return list.find((e) => e.id === id);
}
