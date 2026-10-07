/**
 * event-detail.js — Etkinlik Detay sayfası
 * Student: 2211012053
 *
 * Reads ?id=<event-id> from URLSearchParams, finds the matching event in data.js,
 * and renders the event details or an error box into #detay container.
 */

import { events } from "./data.js";

/* ── Date helpers ─────────────────────────────────── */

function formatDate(ddmmyyyy) {
  const [day, month, year] = ddmmyyyy.split("-");
  return new Date(`${year}-${month}-${day}`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function isoDate(ddmmyyyy) {
  const [day, month, year] = ddmmyyyy.split("-");
  return `${year}-${month}-${day}`;
}

/* ── DOM & Query ─────────────────────────────────── */

const container = document.querySelector("#detay");
const id = new URLSearchParams(window.location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  document.title = "Etkinlik Bulunamadı | Kampüs Etkinlik";
  container.innerHTML = `
    <div class="hata-kutusu">
      <h2>Etkinlik Bulunamadı</h2>
      <p>Aradığınız etkinlik bulunamadı veya silinmiş olabilir.</p>
      <a class="btn-geri" href="etkinlikler.html">← Listeye Dön</a>
    </div>
  `;
} else {
  document.title = `${event.title} | Kampüs Etkinlik`;
  container.innerHTML = `
    <article class="etkinlik-detay">
      <h1>${event.title}</h1>

      <div class="detay-layout">
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

      <a class="btn-geri" href="etkinlikler.html">← Etkinliklere Dön</a>
    </article>
  `;
}
