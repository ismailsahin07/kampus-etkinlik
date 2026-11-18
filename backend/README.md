# Kampüs Etkinlik API – Backend

Express.js ile yazılmış REST API. Veriler **MongoDB**'de (Mongoose) tutulur: etkinlikleri listeler, detayını gösterir ve yeni etkinlik ekler. Sunucu yeniden başlasa da eklenen kayıtlar kalır.

## Kurulum

```bash
cd backend
npm install
cp .env.example .env   # MONGODB_URI'yi kendi bağlantı adresinle değiştir
npm run seed           # 6 örnek etkinliği MongoDB'ye yükler
npm run dev            # geliştirme sunucusu (nodemon) → http://localhost:3000
# veya
npm start              # üretim sunucusu
```

### Ortam değişkenleri (`.env`)

| Değişken | Zorunlu | Açıklama |
|----------|---------|----------|
| `PORT` | Hayır | Sunucu portu (varsayılan `3000`) |
| `MONGODB_URI` | Evet | MongoDB bağlantı adresi, ör. `mongodb+srv://<kullanici>:<sifre>@<cluster>.mongodb.net` |
| `MONGODB_DB` | Hayır | Veritabanı adı (varsayılan `kampus-etkinlik`) |

`.env` git'e gönderilmez (`.gitignore`); örneği `.env.example`'da.

### Seed

`npm run seed` önce `events` koleksiyonunu boşaltır, sonra `data/events.js`'teki 6 etkinliği ekler. Kaç kez çalıştırılırsa çalıştırılsın koleksiyonda **6 kayıt** olur (POST ile eklenenler de silinir).

```
MongoDB bağlandı: kampus-etkinlik
6 kayıt silindi, 6 kayıt eklendi. Toplam: 6
```

## Veritabanı

### Bağlantı (`config/db.js`)

Bağlantı ayrı bir modülde; adres `process.env.MONGODB_URI`'den okunur. `server.js` önce veritabanına bağlanır, bağlantı kurulursa dinlemeye başlar; kurulamazsa hata mesajı yazıp kapanır. Seed betiği de aynı modülü kullanır.

> Windows'ta Node bazen DNS sunucusu olarak sadece `127.0.0.1`'i görür ve `mongodb+srv` adresi çözülemez (`querySrv ECONNREFUSED`). Bu durumda `config/db.js` genel DNS (1.1.1.1, 8.8.8.8) kullanır.

### Şema (`models/Event.js`)

| Alan | Tip | Kurallar |
|------|-----|----------|
| `title` | String | required, trim, 3–80 karakter |
| `category` | String | required, trim, enum: `Seminer`, `Atölye`, `Söyleşi`, `Fuar` |
| `date` | String | required, trim, `YYYY-AA-GG` biçimi |
| `time` | String | required, trim, `SS:DD` biçimi (00:00–23:59) |
| `location` | String | required, trim |
| `description` | String | required, trim, en az 10 karakter |
| `capacity` | Number | required, 1–5000 arası tam sayı |
| `image` | String | isteğe bağlı, trim |

`timestamps: true` → her kayıtta `createdAt` ve `updatedAt` otomatik tutulur. JSON çıktısında MongoDB'nin `_id`'si `id` olarak döner, `__v` gösterilmez.

## REST Sözleşmesi

| Method | Endpoint        | Açıklama                                   | Başarı | Hata |
|--------|-----------------|--------------------------------------------|--------|------|
| GET    | /health         | Sunucu sağlık kontrolü; öğrenci no döner   | 200    | -    |
| GET    | /events         | Tüm etkinlikleri tarihe göre listeler      | 200    | -    |
| GET    | /events/:id     | Belirli bir etkinliği döndürür             | 200    | 404  |
| POST   | /events         | Yeni etkinlik oluşturur                    | 201    | 400  |

Tanımsız bir adres `404 { "error": "Adres bulunamadı" }`, beklenmeyen bir hata `500 { "error": "Sunucu hatası" }` döner; sunucu çalışmaya devam eder.

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

**Response 200** – MongoDB'deki etkinlik dizisi (tarih ve saate göre sıralı).

```json
[
  {
    "id": "6afd4363b3479ba7de3745aa",
    "title": "Kariyer Günleri 2026",
    "category": "Seminer",
    "date": "2026-10-12",
    "time": "14:00",
    "location": "A Blok Konferans",
    "description": "...",
    "capacity": 300,
    "image": "/afis.svg",
    "createdAt": "2026-11-18T06:19:15.463Z",
    "updatedAt": "2026-11-18T06:19:15.463Z"
  }
]
```

`id` değerleri seed sırasında MongoDB tarafından üretilir; kendi id'lerinizi `GET /events` ile öğrenin.

---

### GET /events/:id

**Response 200** – Tek etkinlik nesnesi döner.

**Response 404** – Etkinlik yoksa **veya** id geçersizse (`olmayan-id`, `event-1` gibi ObjectId biçiminde olmayan değerler veritabanına hiç sorulmaz):
```json
{ "error": "Etkinlik bulunamadı" }
```

---

### POST /events

**Request Body** (JSON, `Content-Type: application/json`):
```json
{
  "title": "Girişimcilik Zirvesi",
  "category": "Seminer",
  "date": "2026-12-05",
  "time": "11:00",
  "location": "C Blok Amfisi",
  "description": "Genç girişimciler ve yatırımcıları bir araya getiren yıllık zirve.",
  "capacity": 150
}
```

Sadece şemadaki alanlar alınır; gövdede `_id`, `createdAt` gibi alanlar gönderilse de dikkate alınmaz.

**Response 201** – MongoDB'ye kaydedilen etkinlik döner:
```json
{
  "id": "6afd439fcc090e578c67c4b0",
  "title": "Girişimcilik Zirvesi",
  "...": "...",
  "createdAt": "2026-11-18T06:20:15.284Z",
  "updatedAt": "2026-11-18T06:20:15.284Z"
}
```

**Response 400** – Eksik veya kurala uymayan alan varsa; her alan için mesaj:
```json
{
  "error": "Eksik veya geçersiz veri",
  "details": {
    "category": "category zorunludur",
    "date": "date zorunludur",
    "capacity": "capacity zorunludur"
  }
}
```

**Response 400** – Gövde bozuk JSON ise:
```json
{ "error": "Gövde geçerli bir JSON değil" }
```

## İstek koleksiyonu

`requests/kampus-api.json` (Postman / Thunder Client) 7 istek içerir: health, liste, tekil, olmayan id (404), geçersiz id (404), POST 201, eksik veri POST 400. Liste isteği ilk etkinliğin id'sini `{{event_id}}` değişkenine kaydeder; tekil istek bunu kullanır.

## Proje Yapısı

```
backend/
├── config/
│   └── db.js                 # MongoDB bağlantısı (MONGODB_URI .env'den)
├── controllers/
│   ├── eventsController.js   # /events iş mantığı (Mongoose sorguları)
│   └── healthController.js   # /health iş mantığı
├── data/
│   └── events.js             # Seed verisi (6 etkinlik)
├── models/
│   └── Event.js              # Etkinlik şeması (required, trim, enum, min/max, timestamps)
├── routes/
│   ├── events.js             # /events rotaları
│   └── health.js             # /health rotası
├── scripts/
│   └── seed.js               # npm run seed: koleksiyonu boşaltıp 6 kayıt ekler
├── requests/
│   └── kampus-api.json       # REST istek koleksiyonu
├── .env.example              # Örnek ortam değişkenleri (PORT, MONGODB_URI, MONGODB_DB)
├── .gitignore
├── package.json
├── README.md
└── server.js                 # Uygulama giriş noktası: önce DB, sonra dinleme
```
