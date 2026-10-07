/**
 * event-form.js — Etkinlik Ekle / Güncelle sayfası
 *
 * URL modes:
 *   event-form.html?mode=ekle            → blank add form
 *   event-form.html?mode=guncelle&id=…   → pre-filled update form
 *
 * Student: 2211012053
 */

import { events } from "./data.js";

/* ── Helpers ─────────────────────────────────────── */

/** "DD-MM-YYYY" → "YYYY-MM-DD" for <input type="date"> */
function toInputDate(ddmmyyyy) {
  const [day, month, year] = ddmmyyyy.split("-");
  return `${year}-${month}-${day}`;
}

/** All categories that exist in the dataset (deduped, sorted) */
const CATEGORIES = [...new Set(events.map(e => e.category))].sort();

/** Build a <option> element */
function makeOption(value, selectedValue) {
  const opt = document.createElement("option");
  opt.value = value;
  opt.textContent = value;
  if (value === selectedValue) opt.selected = true;
  return opt;
}

/* ── URL params ───────────────────────────────────── */

const params = new URLSearchParams(window.location.search);
const mode   = params.get("mode") || "ekle";          // "ekle" | "guncelle"
const id     = params.get("id");
const event  = mode === "guncelle" ? events.find(e => e.id === id) : null;

const isUpdate = mode === "guncelle";

/* ── Page title / heading ─────────────────────────── */

document.title = isUpdate
  ? "Etkinlik Güncelle | Kampüs Etkinlik"
  : "Etkinlik Ekle | Kampüs Etkinlik";

/* ── Render form into <main> ──────────────────────── */

const main = document.querySelector("main");

main.innerHTML = `
  <form class="etkinlik-form" novalidate id="etkinlik-form">
    <h2>${isUpdate ? "Etkinlik Güncelle" : "Etkinlik Ekle"}</h2>

    <label>
      Etkinlik Adı
      <input type="text" name="title" required
             value="${event ? event.title : ""}">
    </label>

    <label>
      Kategori
      <select name="category" id="kategori-select"></select>
    </label>

    <label>
      Tarih
      <input type="date" name="date" required
             value="${event ? toInputDate(event.date) : ""}">
    </label>

    <label>
      Saat
      <input type="time" name="time" required
             value="${event ? event.time : ""}">
    </label>

    <label>
      Yer
      <input type="text" name="location" required
             value="${event ? event.location : ""}">
    </label>

    <label>
      Kapasite
      <input type="number" name="capacity" min="1" required
             value="${event ? event.capacity : ""}">
    </label>

    <label>
      Açıklama
      <textarea name="description" rows="4">${event ? event.description : ""}</textarea>
    </label>

    <button type="submit">${isUpdate ? "Güncelle" : "Gönder"}</button>
  </form>
`;

/* ── Populate category <select> ───────────────────── */

const select = document.getElementById("kategori-select");
CATEGORIES.forEach(cat => select.appendChild(makeOption(cat, event?.category)));

/* ── Validation: show "boş bırakıldı" on submit ──── */

document.getElementById("etkinlik-form").addEventListener("submit", function (e) {
  /* Clear previous messages */
  this.querySelectorAll(".hata-mesaji").forEach(el => el.remove());

  this.classList.add("was-submitted");

  if (!this.checkValidity()) {
    e.preventDefault();
    this.querySelectorAll("input:invalid, select:invalid, textarea:invalid")
      .forEach(field => {
        const msg = document.createElement("span");
        msg.className = "hata-mesaji";
        msg.textContent = "boş bırakıldı";
        field.insertAdjacentElement("afterend", msg);
      });
  }
});

