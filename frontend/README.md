Canlı site: https://ismailharunsahin-frontend.vercel.app/

# Kampüs Etkinlikleri — Sprint 6 (Router, Context, CRUD, Form Doğrulama)

Sprint 5'teki bileşenler ve görünüm korundu; üstüne teknik katman eklendi:

- **React Router** ile 10 route: her adres kendi sayfa bileşenini açar, sayfa yenilense de aynı sayfa gelir.
- **Context API** ile ortak veri: etkinlik listesi (`EventsContext`) ve oturum (`AuthContext`). Bütün sayfalar veriyi Context'ten okur.
- **Ekle / Güncelle / Sil** (silmeden önce onay). Değişiklik Context'te yapıldığı için Ana Sayfa, Etkinlikler, Detay ve Yönetim sayfalarına anında yansır; `localStorage`'a kaydedildiği için sayfa yenilense de kalır.
- **Form doğrulama**: etkinlik formu, giriş, kayıt ve şifremi unuttum. Hatalar alanın altında yazar, alan kırmızı çerçevelenir (`aria-invalid`).
- **Arama ve kategori filtresi** adres çubuğunda tutulur (`/events?q=robot&kategori=Atölye`).

## Route'lar (10 adet)

| # | Adres | Sayfa | Bileşen |
| --- | --- | --- | --- |
| 1 | `/` | Ana Sayfa (yaklaşan 2 etkinlik) | `HomePage` |
| 2 | `/events` | Tüm Etkinlikler (arama + filtre) | `EventsPage` |
| 3 | `/events/:slug` | Etkinlik Detayı | `EventDetailPage` |
| 4 | `/admin` | Etkinlik Yönetimi (tablo, Düzenle/Sil) | `AdminPage` |
| 5 | `/admin/new` | Etkinlik Ekle | `AddEventPage` |
| 6 | `/admin/edit/:slug` | Etkinlik Güncelle | `EditEventPage` |
| 7 | `/login` | Giriş Yap | `LoginPage` |
| 8 | `/register` | Kayıt Ol | `RegisterPage` |
| 9 | `/forgot-password` | Şifremi Unuttum | `ForgotPasswordPage` |
| 10 | `*` | 404 Sayfa Bulunamadı | `NotFoundPage` |

`:slug` etkinlik başlığından üretilir (`slugify`: "Kariyer Günleri 2026" → `kariyer-gunleri-2026`). Bu yüzden iki etkinlik aynı adı taşıyamaz; form bunu kontrol eder. Adresteki etkinlik yoksa "Etkinlik Bulunamadı" kutusu görünür.

Menüdeki aktif link `NavLink` ile işaretlenir (`aria-current="page"`). Giriş yapılınca "Giriş" yerine "Çıkış (Ad)" butonu çıkar.

## Context

| Context | Değerler | Kullanan sayfalar |
| --- | --- | --- |
| `EventsContext` | `events`, `addEvent`, `updateEvent`, `deleteEvent`, `findBySlug` | Ana Sayfa, Etkinlikler, Detay, Yönetim, Ekle, Güncelle, 404 (ve `EventForm`) |
| `AuthContext` | `user`, `register`, `login`, `logout`, `isRegistered` | Giriş, Kayıt, Şifremi Unuttum (ve menü) |

Her Context iki dosyadan oluşur: `xxx-context.ts` (`createContext` + `useXxx()` hook'u) ve `XxxProvider.tsx` (state + fonksiyonlar). Provider'lar `main.tsx`'te `BrowserRouter`'ın içinde bütün uygulamayı sarar.

Sunucu olmadığı için etkinlikler, kullanıcılar ve oturum tarayıcının `localStorage`'ında tutulur (`kampus-etkinlikler`, `kampus-kullanicilar`, `kampus-oturum`). Örnek verilere dönmek için tarayıcıda bu anahtarları silmek yeterli. Şifreler düz metin saklanır; bu sadece ders projesi içindir.

## Ekle / Güncelle / Sil

- **Ekle:** Yönetim → "+ Yeni etkinlik" → form → Kaydet. Yönetim sayfasına dönülür, "… eklendi" mesajı görünür.
- **Güncelle:** Yönetim'de "Düzenle" veya Detay'da "Bu etkinliği güncelle". Form mevcut değerlerle dolu gelir.
- **Sil:** Yönetim'de "Sil" → `window.confirm` onayı. "İptal" denirse hiçbir şey silinmez.

## Form doğrulama

Doğrulama `src/utils/validation.ts`'deki saf fonksiyonlarla yapılır. Hatalar ilk gönderimden sonra görünür ve yazdıkça güncellenir.

| Form | Kurallar |
| --- | --- |
| Etkinlik | Ad 3–80 karakter ve benzersiz; kategori seçili; tarih ve saat dolu (yeni etkinlik geçmiş tarihli olamaz); yer dolu; kontenjan 1–5000 tam sayı; açıklama en az 10 karakter. |
| Giriş | E-posta zorunlu ve geçerli biçimde; şifre zorunlu; yanlışsa "E-posta veya şifre hatalı." |
| Kayıt | Ad Soyad en az 3 karakter; e-posta geçerli ve daha önce kayıtlı değil; şifre en az 6 karakter, harf + rakam; şifre tekrarı eşleşmeli. |
| Şifremi Unuttum | E-posta zorunlu, geçerli ve kayıtlı. Gerçek e-posta gitmez, onay mesajı gösterilir. |

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hatasız bitmeli
npm run lint     # hatasız bitmeli
npm run preview  # build edilmiş hâli açar
```

## Yayınlama (Vercel)

Vercel'de proje adı `ismailharunsahin-frontend`, kök klasör (Root Directory) `frontend`. `vercel.json` bütün adresleri `index.html`'e yönlendirir; böylece `/admin` gibi bir adres doğrudan açılınca veya yenilenince 404 vermez, sayfayı React Router çizer.

## Klasör yapısı

```
frontend/
  vercel.json           SPA yönlendirmesi
  public/               afis.svg  favicon.svg
  src/
    main.tsx            BrowserRouter + AuthProvider + EventsProvider
    App.tsx             10 route
    App.css  index.css
    pages/              HomePage  EventsPage  EventDetailPage
                        AdminPage  AddEventPage  EditEventPage
                        LoginPage  RegisterPage  ForgotPasswordPage  NotFoundPage
    components/
      layout/           PageLayout  Header  Navigation  Footer
      events/           EventCard  EventList  EventFilter  EventDetail
      forms/            EventForm  Field
    context/            events-context.ts  EventsProvider.tsx
                        auth-context.ts  AuthProvider.tsx
    data/               events.ts (6 örnek etkinlik)  categories.ts
    types/              campus-event.ts  user.ts
    utils/              filter-events.ts  format-date.ts  slugify.ts
                        storage.ts  validation.ts
```

## Bileşenler

| Bileşen | Props | Görevi |
| --- | --- | --- |
| `PageLayout` | `title`, `text?`, `children` | Her sayfanın iskeleti: Header → Navigation → main → Footer; sekme adını da ayarlar. |
| `Header` | `title`, `text?` | Sayfa başlığı; alt yazı sadece varsa görünür. |
| `Navigation` | — | `NavLink` menüsü; oturumu `AuthContext`'ten okur. |
| `Footer` | — | Alt bilgi. |
| `EventList` | `events`, `emptyText?` | Dizi boşsa mesaj, değilse her etkinlik için bir `EventCard`. |
| `EventCard` | `event` | Tek etkinlik kartı; "Detayları Gör" → `/events/:slug`. |
| `EventFilter` | `searchText`, `category`, `categories`, `onSearchChange`, `onCategoryChange` | Arama kutusu ve kategori seçimi. |
| `EventDetail` | `event` | Afiş, künye, açıklama; "Listeye dön" ve "Güncelle" linkleri. |
| `EventForm` | `initial?`, `submitLabel`, `onSubmit` | Ekle ve Güncelle'nin ortak, doğrulamalı formu. |
| `Field` | `id`, `label`, `error?`, `children` | Etiket + alan + hata mesajı; bütün formlar kullanır. |
