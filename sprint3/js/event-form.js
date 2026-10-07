/**
 * event-form.js — Etkinlik Ekle / Güncelle form yönetimi
 * Student: 2211012053
 *
 * Captures the form submit event, prevents page refresh,
 * converts FormData into an object, and logs it to console.
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
  });
}
