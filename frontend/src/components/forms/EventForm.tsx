import { events } from "../../data/events";

// Tek props onSubmit olduğu için kategori listesi burada hesaplanır.
const categories = [...new Set(events.map((e) => e.category))];

interface EventFormProps {
  onSubmit: () => void;
}

// Form ne yapılacağını bilmez; gönderimi onSubmit ile App'e bildirir.
// Ekle ve Güncelle sayfaları aynı formu kullanır.
function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      <form
        className="etkinlik-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <label htmlFor="ad">
          Etkinlik Adı
          <input
            type="text"
            id="ad"
            name="ad"
            placeholder="Örn. Kariyer Günleri 2026"
            maxLength={80}
            required
          />
        </label>

        <label htmlFor="kategori">
          Kategori
          <select id="kategori" name="kategori" defaultValue="">
            <option value="">Seçiniz</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="tarih">
          Tarih
          <input type="date" id="tarih" name="tarih" required />
        </label>

        <label htmlFor="saat">
          Saat
          <input type="time" id="saat" name="saat" required />
        </label>

        <label htmlFor="yer">
          Yer
          <input
            type="text"
            id="yer"
            name="yer"
            placeholder="Örn. A Blok Konferans"
            required
          />
        </label>

        <label htmlFor="kapasite">
          Kontenjan
          <input type="number" id="kapasite" name="kapasite" min={1} />
        </label>

        <label htmlFor="aciklama">
          Açıklama
          <textarea id="aciklama" name="aciklama" rows={4} />
        </label>

        <button type="submit">Kaydet</button>
      </form>
    </>
  );
}

export default EventForm;
