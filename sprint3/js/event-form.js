/**
 * event-form.js — Etkinlik Ekle / Güncelle form yönetimi
 * Student: 2211012053
 *
 * Supports add and update modes via form data-mode attribute.
 * If data-mode="guncelle", populates fields from data.js based on ?id in URL.
 * Preserves ID and displays "güncellendi" upon successful update.
 */

import { events } from "./data.js";

/* ── Date helper (DD-MM-YYYY -> YYYY-MM-DD for date input) ── */
function toInputDate(ddmmyyyy) {
  if (!ddmmyyyy) return "";
  const parts = ddmmyyyy.split("-");
  if (parts.length === 3 && parts[0].length === 2) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return ddmmyyyy;
}

const form = document.querySelector("#etkinlik-formu");

if (form) {
  const id = new URLSearchParams(window.location.search).get("id");
  const etkinlik = events.find((e) => e.id === id);

  // 2, 3, 4, 5. Güncelleme modu kontrolü ve alanları doldurma
  if (form.dataset.mode === "guncelle") {
    if (etkinlik) {
      form.elements.ad.value = etkinlik.title;
      form.elements.kategori.value = etkinlik.category;
      form.elements.tarih.value = toInputDate(etkinlik.date);
      form.elements.saat.value = etkinlik.time;
      form.elements.yer.value = etkinlik.location;
      if (form.elements.kapasite) form.elements.kapasite.value = etkinlik.capacity;
      form.elements.aciklama.value = etkinlik.description;
    } else {
      // 5. Etkinlik bulunamadıysa formu gösterme; uyarı + "Etkinliklere git" linki göster
      form.outerHTML = `
        <div class="hata-kutusu">
          <h2>Etkinlik Bulunamadı</h2>
          <p>Güncellenecek etkinlik bulunamadı veya geçersiz bir ID belirtildi.</p>
          <a class="btn-geri" href="etkinlikler.html">Etkinliklere git</a>
        </div>
      `;
    }
  }

  // Submit olayını yakala
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const data = {
      title: (fd.get("ad") || "").trim(),
      category: fd.get("kategori") || "",
      date: fd.get("tarih") || "",
      time: fd.get("saat") || "",
      location: (fd.get("yer") || "").trim(),
      capacity: fd.get("kapasite") ? Number(fd.get("kapasite")) : 0,
      description: (fd.get("aciklama") || "").trim()
    };

    // 6. Güncelleme modunda ID korunur
    if (form.dataset.mode === "guncelle" && id) {
      data.id = id;
    }

    console.log(data);

    // 1. Kurallara göre hataları topla
    const errors = {};

    if (!data.title || data.title.length < 3) {
      errors.ad = "En az 3 karakter olmalı.";
    }

    if (!data.category) {
      errors.kategori = "Kategori seçiniz.";
    }

    if (!data.date) {
      errors.tarih = "Tarih seçiniz.";
    }

    if (!data.time) {
      errors.saat = "Saat seçiniz.";
    }

    if (!data.location || data.location.length < 2) {
      errors.yer = "Yer bilgisi giriniz.";
    }

    if (data.capacity && data.capacity <= 0) {
      errors.kapasite = "Kapasite 0'dan büyük olmalı.";
    }

    // Alan eşleştirmeleri
    const fields = {
      ad: {
        input: form.querySelector('[name="ad"]'),
        error: document.querySelector("#name-error") || document.querySelector("#ad-error")
      },
      kategori: {
        input: form.querySelector('[name="kategori"]'),
        error: document.querySelector("#category-error") || document.querySelector("#kategori-error")
      },
      tarih: {
        input: form.querySelector('[name="tarih"]'),
        error: document.querySelector("#date-error") || document.querySelector("#tarih-error")
      },
      saat: {
        input: form.querySelector('[name="saat"]'),
        error: document.querySelector("#time-error") || document.querySelector("#saat-error")
      },
      yer: {
        input: form.querySelector('[name="yer"]'),
        error: document.querySelector("#location-error") || document.querySelector("#yer-error")
      },
      kapasite: {
        input: form.querySelector('[name="kapasite"]'),
        error: document.querySelector("#capacity-error") || document.querySelector("#kapasite-error")
      },
      aciklama: {
        input: form.querySelector('[name="aciklama"]'),
        error: document.querySelector("#description-error") || document.querySelector("#aciklama-error")
      }
    };

    // 4. Düzeltilen alanlar için önceki hataları temizle ("")
    for (const key in fields) {
      const item = fields[key];
      if (item.error) item.error.textContent = "";
      if (item.input) item.input.removeAttribute("aria-invalid");
    }

    // 2 & 3. Hatalı alanların altına mesaj yaz ve kırmızıyla işaretle (aria-invalid="true")
    for (const key in errors) {
      const item = fields[key];
      if (item) {
        if (item.error) item.error.textContent = errors[key];
        if (item.input) item.input.setAttribute("aria-invalid", "true");
      }
    }

    const mesaj = document.querySelector("#form-message");

    // 5. Hata varsa mesaj göster ve durdur (return)
    if (Object.keys(errors).length > 0) {
      if (mesaj) {
        mesaj.className = "hatali";
        mesaj.textContent = "The form contains invalid fields / Formda geçersiz alanlar var.";
      }
      return;
    }

    // 6. Hata yoksa: "güncellendi" / "kaydedildi" belirten mesaj + nesne (JSON.stringify)
    if (mesaj) {
      mesaj.className = "basarili";
      const basariMetni = form.dataset.mode === "guncelle"
        ? "Etkinlik başarıyla güncellendi!"
        : "Etkinlik başarıyla kaydedildi!";
      mesaj.innerHTML = `
        <p>${basariMetni}</p>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `;
    }
  });
}
