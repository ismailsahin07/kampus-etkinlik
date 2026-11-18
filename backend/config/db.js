// MongoDB bağlantısı tek yerde: server.js ve seed betiği bunu kullanır.
const dns = require("node:dns");
const mongoose = require("mongoose");

// Windows'ta Node bazen DNS sunucusu olarak sadece 127.0.0.1'i görür ve Atlas'ın
// mongodb+srv adresi çözülemez (querySrv ECONNREFUSED). O durumda genel DNS kullanılır.
const loopback = ["127.0.0.1", "::1"];
if (dns.getServers().every((server) => loopback.includes(server))) {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI tanımlı değil (.env dosyasını kontrol edin)");
  }

  // URI'de veritabanı adı yoksa Atlas "test" veritabanını kullanır;
  // bu yüzden ad burada verilir (.env'de MONGODB_DB ile değiştirilebilir).
  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB || "kampus-etkinlik",
  });
  console.log(`MongoDB bağlandı: ${mongoose.connection.name}`);
}

module.exports = connectDB;
