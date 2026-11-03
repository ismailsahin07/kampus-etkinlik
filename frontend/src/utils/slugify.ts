// Etkinlik adresi başlıktan üretilir: /events/kariyer-gunleri-2026
const turkishLetters: Record<string, string> = {
  ç: "c",
  ğ: "g",
  ı: "i",
  ö: "o",
  ş: "s",
  ü: "u",
};

/** "Kariyer Günleri 2026" → "kariyer-gunleri-2026" */
export function slugify(text: string): string {
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşü]/g, (ch) => turkishLetters[ch])
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
