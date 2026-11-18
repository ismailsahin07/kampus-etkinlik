// models/Event.js - etkinlik şeması: alanlar, kurallar ve JSON çıktısı
const mongoose = require("mongoose");

const CATEGORIES = ["Seminer", "Atölye", "Söyleşi", "Fuar"];

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title zorunludur"],
      trim: true,
      minlength: [3, "title en az 3 karakter olmalı"],
      maxlength: [80, "title en fazla 80 karakter olabilir"],
    },
    category: {
      type: String,
      required: [true, "category zorunludur"],
      trim: true,
      enum: {
        values: CATEGORIES,
        message: `category şunlardan biri olmalı: ${CATEGORIES.join(", ")}`,
      },
    },
    date: {
      type: String, // "YYYY-AA-GG" (frontend ile aynı biçim)
      required: [true, "date zorunludur"],
      trim: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, "date YYYY-AA-GG biçiminde olmalı"],
    },
    time: {
      type: String, // "SS:DD"
      required: [true, "time zorunludur"],
      trim: true,
      match: [/^([01]\d|2[0-3]):[0-5]\d$/, "time SS:DD biçiminde olmalı"],
    },
    location: {
      type: String,
      required: [true, "location zorunludur"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description zorunludur"],
      trim: true,
      minlength: [10, "description en az 10 karakter olmalı"],
    },
    capacity: {
      type: Number,
      required: [true, "capacity zorunludur"],
      min: [1, "capacity en az 1 olmalı"],
      max: [5000, "capacity en fazla 5000 olabilir"],
      validate: {
        validator: Number.isInteger,
        message: "capacity tam sayı olmalı",
      },
    },
    image: {
      type: String, // afiş isteğe bağlı
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt otomatik
    toJSON: {
      versionKey: false,
      // API önceki sürümdeki gibi "id" döndürsün: _id → id (en başta)
      transform(doc, ret) {
        const { _id, ...rest } = ret;
        return { id: _id.toString(), ...rest };
      },
    },
  },
);

module.exports = mongoose.model("Event", eventSchema);
module.exports.CATEGORIES = CATEGORIES;
