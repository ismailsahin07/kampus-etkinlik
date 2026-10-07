/**
 * event-form.js — Etkinlik Ekle / Güncelle form yönetimi
 * Student: 2211012053
 *
 * Validates form data, highlights errors in red (aria-invalid="true"),
 * and displays either an error message or a green box with the JSON object.
 */

const form = document.querySelector("#etkinlik-formu");

if (form) {
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

    // 6. Hata yoksa: yeşil kutu + nesne (JSON.stringify)
    if (mesaj) {
      mesaj.className = "basarili";
      mesaj.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }
  });
}
