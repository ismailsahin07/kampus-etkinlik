// /events iş mantığı: veriler MongoDB'den okunur ve oraya yazılır.
// Express 4 async hataları kendisi yakalamaz; her fonksiyon hatayı next(err) ile
// server.js'teki hata yakalayıcıya verir, sunucu çökmez.
const mongoose = require("mongoose");
const Event = require("../models/Event");

const notFound = (res) => res.status(404).json({ error: "Etkinlik bulunamadı" });

// GET /events - tüm etkinlikler, tarihe göre sıralı
const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1, time: 1 });
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};

// GET /events/:id - tek etkinlik; olmayan veya geçersiz id → 404
const getEventById = async (req, res, next) => {
  try {
    // "olmayan-id" gibi ObjectId biçiminde olmayan bir değer veritabanına hiç sorulmaz.
    if (!mongoose.isObjectIdOrHexString(req.params.id)) return notFound(res);

    const event = await Event.findById(req.params.id);
    if (!event) return notFound(res);
    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

// POST /events - yeni etkinlik; eksik/geçersiz alan → 400
const createEvent = async (req, res, next) => {
  try {
    // Sadece bilinen alanlar alınır: _id, createdAt gibi alanlar dışarıdan yazılamaz.
    const { title, category, date, time, location, description, capacity, image } =
      req.body ?? {};
    const event = await Event.create({
      title,
      category,
      date,
      time,
      location,
      description,
      capacity,
      image,
    });
    res.status(201).json(event);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      // Her hatalı alan için Türkçe mesaj: { title: "title zorunludur", ... }
      const details = Object.fromEntries(
        Object.entries(err.errors).map(([field, e]) => [
          field,
          e.name === "CastError" ? `${field} geçersiz bir değer` : e.message,
        ]),
      );
      return res.status(400).json({ error: "Eksik veya geçersiz veri", details });
    }
    next(err);
  }
};

module.exports = { getAllEvents, getEventById, createEvent };
