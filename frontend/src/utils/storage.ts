// localStorage gizli pencerede veya engellenmişse hata atabilir;
// o zaman varsayılan değerle devam edilir.
export function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJson(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Kaydedilemedi: veri sadece bu oturumda yaşar.
  }
}
