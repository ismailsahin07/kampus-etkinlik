/**
 * event-detail.js — Etkinlik Detay sayfası
 * Reads ?id=<event-id> from the URL, finds the matching event in data.js,
 * and renders the full detail view into the DOM.
 * Student: 2211012053
 */

import { events } from "./data.js";

/* ── Helpers ─────────────────────────────────────── */

/** Convert "DD-MM-YYYY" → Turkish locale date string */
function formatDate(ddmmyyyy) {
  const [day, month, year] = ddmmyyyy.split("-");
  return new Date(`${year}-${month}-${day}`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

/** "DD-MM-YYYY" → "YYYY-MM-DD"  (for <time datetime="…">) */
function isoDate(ddmmyyyy) {
  const [day, month, year] = ddmmyyyy.split("-");
  return `${year}-${month}-${day}`;
}

/* ── Lookup ───────────────────────────────────────── */

const params = new URLSearchParams(window.location.search);
const id     = params.get("id");
const event  = events.find(e => e.id === id);
const main   = document.querySelector("main");

/* ── Render ───────────────────────────────────────── */

if (!event) {
  /* No matching event — show friendly error */
  main.innerHTML = `
    <p class="hata-mesaji" style="padding:2rem;">
      Etkinlik bulunamadı. <a href="event-list.html">← Listeye dön</a>
    </p>
  `;
} else {
  /* Update page title */
  document.title = `${event.title} | Kampüs Etkinlik`;

  main.innerHTML = `
    <article class="etkinlik-detay">
      <h1>${event.title}</h1>

      <div class="detay-layout">
        <figure class="detay-poster">
          <img src="" alt="${event.title} afişi" id="detay-img">
        </figure>

        <dl class="detay-bilgi">
          <dt>Tarih</dt>
          <dd><time datetime="${isoDate(event.date)}">${formatDate(event.date)}</time></dd>

          <dt>Saat</dt>
          <dd>${event.time}</dd>

          <dt>Yer</dt>
          <dd>${event.location}</dd>

          <dt>Kategori</dt>
          <dd>${event.category}</dd>

          <dt>Kapasite</dt>
          <dd>${event.capacity} Kişi</dd>

          <dt>Açıklama</dt>
          <dd>${event.description}</dd>
        </dl>
      </div>

      <a class="btn-geri" href="event-list.html">← Etkinliklere Dön</a>
    </article>
  `;

  /* Hide the placeholder img (no poster URLs in data.js) */
  document.getElementById("detay-img").style.display = "none";
}

