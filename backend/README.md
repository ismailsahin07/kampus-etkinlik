# Kampüs Etkinlik API – Backend

Express.js ile yazılmış REST API. Kampüs etkinliklerini listeler, detayını gösterir ve yeni etkinlik eklemeye olanak tanır.

## Kurulum

```bash
cd backend
npm install
cp .env.example .env   # PORT değerini düzenle
npm run dev            # geliştirme sunucusu (nodemon)
# veya
npm start              # üretim sunucusu
```

## REST Sözleşmesi

| Method | Endpoint        | Açıklama                                   | Başarı | Hata |
|--------|-----------------|-------------------------------------------|--------|------|
| GET    | /health         | Sunucu sağlık kontrolü; öğrenci no döner   | 200    | -    |
| GET    | /events         | Tüm etkinlikleri listeler                  | 200    | -    |
| GET    | /events/:id     | Belirli bir etkinliği döndürür             | 200    | 404  |
| POST   | /events         | Yeni etkinlik oluşturur                    | 201    | 400  |

### GET /health

**Response 200**
```json
{
  "status": "ok",
  "student": "2211012053"
}
```

---

### GET /events

**Response 200** – Etkinlik dizisi döner.

```json
[
  {
    "id": "event-1",
    "title": "Kariyer Günleri 2026",
    "category": "Seminer",
    "date": "2026-10-12",
    "time": "14:00",
    "location": "A Blok Konferans",
    "description": "...",
    "capacity": 300
  }
]
```

---

### GET /events/:id

**Response 200** – Tek etkinlik nesnesi döner.

**Response 404** – Belirtilen id ile etkinlik bulunamazsa:
```json
{ "error": "Etkinlik bulunamadı" }
```

---

### POST /events

**Request Body** (JSON, `Content-Type: application/json`):
```json
{
  "title": "Yeni Etkinlik",
  "category": "Seminer",
  "date": "2026-12-01",
  "time": "10:00",
  "location": "A Blok",
  "description": "Açıklama metni",
  "capacity": 100
}
```

**Response 201** – Oluşturulan etkinlik döner:
```json
{
  "id": "event-1733046400000",
  "title": "Yeni Etkinlik",
  ...
}
```

**Response 400** – Zorunlu alan eksikse:
```json
{ "error": "Eksik alan: title, category, date, time, location, description ve capacity zorunludur" }
```

## Zorunlu Alanlar

`title`, `category`, `date`, `time`, `location`, `description`, `capacity`

İsteğe bağlı: `image`

## Proje Yapısı

```
backend/
├── controllers/
│   ├── eventsController.js   # /events iş mantığı
│   └── healthController.js   # /health iş mantığı
├── data/
│   └── events.js             # In-memory etkinlik verisi (6 kayıt)
├── routes/
│   ├── events.js             # /events rotaları
│   └── health.js             # /health rotası
├── requests/
│   └── kampus-api.json       # REST Client koleksiyonu
├── .env.example              # Örnek ortam değişkeni dosyası
├── .gitignore
├── package.json
├── README.md
└── server.js                 # Uygulama giriş noktası
```
