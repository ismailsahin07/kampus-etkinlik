require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");
const healthRouter = require("./routes/health");
const eventsRouter = require("./routes/events");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/health", healthRouter);
app.use("/events", eventsRouter);

// Tanımsız adres → JSON 404
app.use((req, res) => {
  res.status(404).json({ error: "Adres bulunamadı" });
});

// Hata yakalayıcı: bozuk JSON 400, beklenmeyen hata 500; sunucu çalışmaya devam eder.
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Gövde geçerli bir JSON değil" });
  }
  console.error(err);
  res.status(500).json({ error: "Sunucu hatası" });
});

// Önce veritabanı, sonra sunucu: bağlantı yoksa istek kabul edilmez.
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server ${PORT} portunda çalışıyor`);
    });
  })
  .catch((err) => {
    console.error("MongoDB bağlantısı kurulamadı:", err.message);
    process.exit(1);
  });
