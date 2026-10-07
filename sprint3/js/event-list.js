/**
 * event-list.js — Etkinlik listesi modülü
 * Student: 2211012053
 *
 * Flow: data.js → createCard → HTML string → container innerHTML
 */

import { events } from "./data.js";

/* ── Date helper ─────────────────────────────────── */

/** "DD-MM-YYYY" → "12 Ekim 2026" */
function formatDate(ddmmyyyy) {
  const [day, month, year] = ddmmyyyy.split("-");
  return new Date(`${year}-${month}-${day}`)
    .toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

/* ── Card factory ────────────────────────────────── */

function createCard(event) {
  return `<article class="etkinlik-kart">
    <h3>${event.title}</h3>
    <p class="etkinlik-meta">${formatDate(event.date)} — ${event.location}</p>
    <p>${event.description}</p>
    <a href="etkinlik-detay.html?id=${event.id}">Detayları Gör →</a>
  </article>`;
}

/* ── Render ───────────────────────────────────────── */

const list = document.querySelector("#etkinlik-listesi");

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

/* Parse "DD-MM-YYYY" → Date object */
function toDate(ddmmyyyy) {
  const [day, month, year] = ddmmyyyy.split("-");
  return new Date(`${year}-${month}-${day}`);
}

const now = new Date();

/* If data-limit is set (index.html): closest upcoming events, show first N
   Otherwise (etkinlikler.html): show all events */
if (list.dataset.limit) {
  const yaklasan = [...events]
    .sort((a, b) => toDate(a.date) - toDate(b.date))
    .slice(0, Number(list.dataset.limit));

  render(yaklasan);
} else {
  render(events);
}
