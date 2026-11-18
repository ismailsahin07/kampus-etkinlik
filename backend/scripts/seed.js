// npm run seed - data/events.js'teki 6 etkinliği MongoDB'ye yükler.
// Önce koleksiyon boşaltılır, sonra eklenir: kaç kez çalışırsa çalışsın 6 kayıt kalır.
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Event = require("../models/Event");
const events = require("../data/events");

async function seed() {
  await connectDB();

  const { deletedCount } = await Event.deleteMany({});
  // "event-1" gibi eski id'ler atılır; MongoDB her kayda kendi _id'sini verir.
  const docs = await Event.insertMany(events.map(({ id, ...rest }) => rest));

  const total = await Event.countDocuments();
  console.log(`${deletedCount} kayıt silindi, ${docs.length} kayıt eklendi. Toplam: ${total}`);
}

seed()
  .catch((err) => {
    console.error("Seed başarısız:", err.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
