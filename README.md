# Kampüs Etkinlik Sistemi

Bu proje, Web Tabanlı Programlama dersi kapsamında geliştirilen çok adımlı bir kampüs etkinlikleri yönetim platformudur. Kampüsteki seminer, atölye, söyleşi ve fuar gibi etkinliklerin listelenmesini, filtrelenmesini, detaylarının incelenmesini, yeni etkinlik eklenmesini ve mevcut etkinliklerin güncellenmesini sağlar.

**Öğrenci Bilgileri:**
- **Öğrenci No:** 2211012053
- **Öğrenci Adı:** İsmail Harun Şahin

**Canlı site (React sürümü):** https://ismailharunsahin-frontend.vercel.app/

> Sprint 4 ve sonrası `frontend/` klasöründe (React + TypeScript + Vite). Güncel ayrıntılar: [frontend/README.md](frontend/README.md) — 10 route, Context API, ekle/güncelle/sil, form doğrulama.

---

## 📁 Proje Yapısı

```
kampus-etkinlik/
├── .gitignore
├── README.md
├── frontend/                 # Sprint 4–6: React + TypeScript + Vite (canlı sürüm)
│   ├── README.md             # React sürümünün ayrıntılı açıklaması
│   ├── vercel.json           # SPA yönlendirmesi (/admin gibi adresler yenilenince 404 vermez)
│   ├── index.html
│   ├── package.json
│   ├── public/
│   │   ├── afis.svg
│   │   └── favicon.svg
│   └── src/
│       ├── main.tsx          # BrowserRouter + AuthProvider + EventsProvider
│       ├── App.tsx           # 10 route tanımı
│       ├── App.css           # Ortak stil dosyası
│       ├── index.css
│       ├── pages/            # Her route için bir sayfa bileşeni
│       │   ├── HomePage.tsx            # /                  Yaklaşan 2 etkinlik
│       │   ├── EventsPage.tsx          # /events            Arama & kategori filtresi
│       │   ├── EventDetailPage.tsx     # /events/:slug      Etkinlik detayı
│       │   ├── AdminPage.tsx           # /admin             Yönetim tablosu (Düzenle / Sil)
│       │   ├── AddEventPage.tsx        # /admin/new         Etkinlik ekleme
│       │   ├── EditEventPage.tsx       # /admin/edit/:slug  Etkinlik güncelleme
│       │   ├── LoginPage.tsx           # /login             Giriş
│       │   ├── RegisterPage.tsx        # /register          Kayıt
│       │   ├── ForgotPasswordPage.tsx  # /forgot-password   Şifremi unuttum
│       │   └── NotFoundPage.tsx        # *                  404
│       ├── components/
│       │   ├── layout/       # PageLayout, Header, Navigation, Footer
│       │   ├── events/       # EventCard, EventList, EventFilter, EventDetail
│       │   └── forms/        # EventForm (doğrulamalı), Field
│       ├── context/
│       │   ├── events-context.ts   # EventsContext + useEvents()
│       │   ├── EventsProvider.tsx  # Ekle / güncelle / sil, localStorage
│       │   ├── auth-context.ts     # AuthContext + useAuth()
│       │   └── AuthProvider.tsx    # Kayıt / giriş / çıkış
│       ├── data/
│       │   ├── events.ts     # 6 örnek etkinlik
│       │   └── categories.ts
│       ├── types/
│       │   ├── campus-event.ts
│       │   └── user.ts
│       └── utils/
│           ├── filter-events.ts  # Arama ve kategori filtresi
│           ├── format-date.ts
│           ├── slugify.ts        # Başlıktan adres üretimi
│           ├── storage.ts        # localStorage okuma/yazma
│           └── validation.ts     # Form doğrulama kuralları
├── sprint1/                  # Temel HTML5 iskeleti ve semantik sayfalar
│   ├── index.html
│   ├── etkinlikler.html
│   ├── etkinlik-detay.html
│   ├── etkinlik-ekle.html
│   └── etkinlik-guncelle.html
├── sprint2/                  # CSS ve Duyarlı Tasarım (Responsive Design)
│   ├── 2211012053.css        # Ortak CSS dosyası (CSS Değişkenleri & Grid)
│   ├── index.html
│   ├── etkinlikler.html
│   ├── etkinlik-detay.html
│   ├── etkinlik-ekle.html
│   └── etkinlik-guncelle.html
└── sprint3/                  # JavaScript, DOM ve ES Modülleri Entegrasyonu
    ├── 2211012053.css
    ├── index.html            # Dinamik en yakın 2 etkinlik kartı
    ├── etkinlikler.html      # Canlı arama & kategori filtreleme
    ├── etkinlik-detay.html   # Dinamik etkinlik detayı
    ├── etkinlik-ekle.html    # Doğrulamalı etkinlik ekleme formu
    ├── etkinlik-guncelle.html# ID ile otomatik doldurulan güncelleme formu
    └── js/
        ├── data.js           # Etkinlik veri modeli
        ├── event-list.js     # Kart oluşturma, filtreleme ve sıralama modülü
        ├── event-detail.js   # URLSearchParams ile detay görüntüleme modülü
        └── event-form.js     # Form yakalama, doğrulama ve güncelleme modülü
```

---

## 🚀 Sprint Detayları

### Sprint 1: Semantik HTML
- Semantik HTML5 etiketleri (`header`, `nav`, `main`, `article`, `figure`, `dl`, `table`, `footer`) kullanılarak 5 temel sayfa oluşturuldu.
- Sayfalar arası erişilebilir gezinti ve form alanları tanımlandı.

### Sprint 2: CSS & Responsive Tasarım
- Tek ve merkezi stil dosyası: `2211012053.css`.
- `:root` seviyesinde öğrenci numarasına göre türetilen CSS değişkenleri (`--renk-ana`, `--renk-zemin`, `--kose`, `--font`).
- Masaüstü ve mobil ekranlar için CSS Grid (`auto-fit`, `minmax`) ve esnek kutu (`flexbox`) yapıları.
- Form etkileşimleri ve hatalı alanlar için özel doğrulama stilleri.

### Sprint 3: JavaScript, DOM & Modüler Yapı
- **`data.js`**: 7 zorunlu alan içeren (`id`, `title`, `category`, `date`, `time`, `location`, `description`, `capacity`) etkinlik veri tabanı.
- **`event-list.js`**:
  - `index.html`: `data-limit="2"` özelliği ile en yakın tarihli 2 etkinliği anasayfada listeleme.
  - `etkinlikler.html`: `new Set` ile tekil kategorilerden oluşan dinamik seçim listesi, `input` ve `change` olayları ile canlı arama ve kategori filtreleme, eşleşen etkinlik sayacını gösterme ve sonuç bulunamadığında uyarı mesajı görüntüleme.
- **`event-detail.js`**:
  - `URLSearchParams` ile adres çubuğundaki `?id=...` parametresini okuma ve ilgili etkinliğin detaylarını DOM'a basma.
  - Geçersiz/bulunamayan ID durumunda hata kutusu ve listeye dönüş bağlantısı sağlama.
  - Etkinlik güncelleme sayfasına yönlendiren tek giriş kapısı: *"Bu etkinliği güncelle"*.
- **`event-form.js`**:
  - `novalidate` ile tarayıcının varsayılan uyarılarını devre dışı bırakma.
  - `FormData` ile form verilerini nesne formatına dönüştürme ve `e.preventDefault()` ile sayfa yenilenmesini engelleme.
  - İstemci taraflı doğrulama, hatalı alanları `aria-invalid="true"` ile kırmızı çerçeveleme ve her alanın altına özel hata metni ekleme.
  - Hata yoksa nesneyi JSON formatında yeşil başarı kutusu içinde gösterme.
  - `data-mode="guncelle"` modunda URL'deki ID ile formu otomatik doldurma, ID'yi koruma ve "güncellendi" durum mesajı verme.

---

## 💻 Nasıl Çalıştırılır?

Projedeki JavaScript dosyaları **ES Modülü (`import` / `export`)** kullandığından dolayı tarayıcıların güvenlik politikaları (CORS) gereği sayfaların bir yerel web sunucusu üzerinden açılması gerekmektedir:

1. VS Code kullanıyorsanız:
   - Proje klasörünü açın.
   - Herhangi bir `.html` dosyasına sağ tıklayıp **"Open with Live Server"** seçeneğini kullanın.
2. Node.js `http-server` veya `serve` ile:
   ```bash
   npx serve .
   ```
3. Python ile:
   ```bash
   python -m http.server 8000
   ```

