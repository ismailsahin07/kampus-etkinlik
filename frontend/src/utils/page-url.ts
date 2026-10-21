// Router yok; açık sayfa adres çubuğunda ?sayfa= ve ?etkinlik= ile tutulur.
//   Ana Sayfa   → /
//   Etkinlikler → ?sayfa=etkinlikler
//   Detay       → ?etkinlik=kariyer-gunleri-2026
//   Ekle        → ?sayfa=ekle
//   Güncelle    → ?sayfa=guncelle&etkinlik=kariyer-gunleri-2026
import type { CampusEvent } from "../types/campus-event";
import type { PageName } from "../types/page";

const pageParams: Partial<Record<PageName, string>> = {
  events: "etkinlikler",
  add: "ekle",
  update: "guncelle",
};

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

/** Sayfa ve (varsa) etkinlikten adresin "?..." kısmını üretir; ana sayfa için "". */
export function pageToSearch(page: PageName, event?: CampusEvent): string {
  const params = new URLSearchParams();
  const sayfa = pageParams[page];
  if (sayfa) params.set("sayfa", sayfa);
  if (event && (page === "detail" || page === "update")) {
    params.set("etkinlik", slugify(event.title));
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}

/** Adresin "?..." kısmından açık sayfayı ve seçili etkinliğin id'sini bulur. */
export function pageFromSearch(
  search: string,
  list: CampusEvent[],
): { page: PageName; selectedId: string | null } {
  const params = new URLSearchParams(search);
  const slug = params.get("etkinlik");
  const event = slug ? list.find((e) => slugify(e.title) === slug) : undefined;
  const selectedId = event ? event.id : null;

  const sayfa = params.get("sayfa");
  const page = (Object.keys(pageParams) as PageName[]).find(
    (p) => pageParams[p] === sayfa,
  );
  if (page) return { page, selectedId: page === "update" ? selectedId : null };
  if (slug !== null) return { page: "detail", selectedId };
  return { page: "home", selectedId: null };
}
