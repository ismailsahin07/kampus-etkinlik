Canlı site: https://kampus-etkinlik-88dp.vercel.app/

# Kampüs Etkinlikleri — Sprint 5 (React Bileşenleri)

Sprint 4'teki tek büyük `App.tsx` (~330 satır) parçalara bölündü: her parça kendi dosyasında bir bileşen, veriyi **props** ile alıyor, olayları **callback** ile App'e bildiriyor. State App'te kalıyor (**lifting state**). Ekran Sprint 4 ile birebir aynı.

Ek olarak açık sayfa adres çubuğuna yazılıyor: sayfa yenilenince aynı sayfa açılıyor, tarayıcının geri/ileri tuşları çalışıyor. Sekme adında etkinliğin/sayfanın adı önde (`Kariyer Günleri 2026 — Kampüs Etkinlikleri`).

## Adresler

| Sayfa | Adres |
| --- | --- |
| Ana Sayfa | `/` |
| Etkinlikler | `/?sayfa=etkinlikler` |
| Detay | `/?etkinlik=kariyer-gunleri-2026` |
| Ekle | `/?sayfa=ekle` |
| Güncelle | `/?sayfa=guncelle&etkinlik=kariyer-gunleri-2026` |

Etkinlik adresi başlıktan üretilir (`slugify`: Türkçe harfler sadeleşir, boşluklar `-` olur). Adresteki etkinlik bulunamazsa "Etkinlik Bulunamadı" kutusu görünür.

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hatasız bitmeli
npm run preview  # build edilmiş hâli açar
```

## Klasör yapısı

```
src/
  components/
    layout/   Header.tsx  Navigation.tsx  Footer.tsx
    events/   EventCard.tsx  EventList.tsx  EventFilter.tsx  EventDetail.tsx
    forms/    EventForm.tsx
  data/events.ts
  types/campus-event.ts  page.ts
  utils/filter-events.ts  format-date.ts  page-url.ts
  App.css  App.tsx  index.css  main.tsx
```

## Bileşen ağacı: kim kime ne veriyor?

`App` state'i tutar: `page`, `selectedId`, `searchText`, `category`.

| Bileşen | Props | Görevi |
| --- | --- | --- |
| `Header` | `title`, `text?` | Sayfa başlığı; alt yazı sadece varsa görünür. |
| `Navigation` | `current`, `onNavigate` | Menü; aktif linki işaretler, tıklamayı App'e bildirir. |
| `Footer` | — | Alt bilgi (props'suz). |
| `EventList` | `events`, `onShowDetail`, `emptyText?` | Dizi boşsa mesaj, değilse her etkinlik için bir `EventCard` (`key={event.id}`). |
| `EventCard` | `event`, `onShowDetail` | Tek etkinlik kartı; "Detayları Gör" → `onShowDetail(event.id)`. |
| `EventFilter` | `searchText`, `category`, `categories`, `onSearchChange`, `onCategoryChange` | Arama kutusu ve kategori seçimi; değerleri props'tan okur. |
| `EventDetail` | `event`, `onBack`, `onEdit` | Afiş, künye, açıklama; "Listeye dön" ve "Güncelle" butonları. |
| `EventForm` | `onSubmit` | Ekle ve Güncelle sayfalarının ortak formu; kaydetme Sprint 6'da. |

## Dosyalar

| Dosya | Görevi |
| --- | --- |
| `src/App.tsx` | State'ler, hesaplanan değerler, `go()` (adres çubuğunu da günceller), geri/ileri tuşu dinleyicisi ve bileşenlerin yerleşimi. |
| `src/components/` | 8 bileşen (yukarıdaki tablo). |
| `src/types/campus-event.ts` | `Category` ve `CampusEvent` tipleri. |
| `src/types/page.ts` | `PageName` tipi (Navigation da kullanır). |
| `src/data/events.ts` | 6 etkinlik kaydı (`CampusEvent[]`). |
| `src/utils/filter-events.ts` | Saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`. |
| `src/utils/format-date.ts` | `formatDate`: `"2026-10-12"` → `"12 Ekim 2026"` (EventCard ve EventDetail kullanır). |
| `src/utils/page-url.ts` | Adres çubuğu ↔ sayfa: `slugify`, `pageToSearch`, `pageFromSearch`. |
| `src/App.css` | Sprint 4 ile aynı stil dosyası. |
| `public/` | Olduğu gibi kopyalanan dosyalar (`afis.svg`, `favicon.svg`). |
