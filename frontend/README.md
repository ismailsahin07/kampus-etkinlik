Canlı site: https://BURAYA-VERCEL-ADRESINI-YAZ.vercel.app

# Kampüs Etkinlikleri — Sprint 4 (Vite + TypeScript + React)

Sprint 3'teki 5 sayfalık site React ve TypeScript ile yeniden yazıldı. Veri tipli, filtre fonksiyonları saf, 5 sayfanın hepsi `App.tsx` içinde; sayfa geçişi ve arama `useState` ile çalışır.

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hatasız bitmeli
npm run preview  # build edilmiş hâli açar
```

## Dosyalar

| Dosya | Görevi |
| --- | --- |
| `package.json` | Proje adını, komutları (dev, build, preview) ve kullanılan paketlerin listesini tutar. |
| `package-lock.json` | Yüklenen paketlerin tam sürümlerini kilitler; herkes aynı sürümü kurar. |
| `node_modules/` | npm'in indirdiği paketler; `.gitignore` sayesinde GitHub'a gitmez. |
| `tsconfig*.json` | TypeScript derleyicisinin ayarları (uygulama ve Vite config için ayrı). |
| `vite.config.ts` | Vite ayarları; React eklentisini yükler. |
| `index.html` | Tek HTML dosyası; React'in çizim yaptığı boş `div#root`'u içerir. |
| `src/main.tsx` | React'i başlatır ve `App` bileşenini `#root`'a çizer. |
| `src/App.tsx` | Uygulamanın ana bileşeni; 5 sayfanın (Ana Sayfa, Etkinlikler, Detay, Ekle, Güncelle) hepsi burada. |
| `src/App.css` | Sprint 3'teki stil dosyası (2211012053.css) ve React sürümü için birkaç ek kural. |
| `src/index.css` | Tüm sayfaya genel stil dosyası; bu sprintte boş. |
| `src/types/campus-event.ts` | `Category` ve `CampusEvent` tipleri: bir etkinliğin neye benzediğinin tarifi. |
| `src/data/events.ts` | Bu tarife uyan 6 etkinlik kaydı (`CampusEvent[]`). |
| `src/utils/filter-events.ts` | Saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`. |
| `public/` | Olduğu gibi kopyalanan dosyalar (`afis.svg`, `favicon.svg`). |
