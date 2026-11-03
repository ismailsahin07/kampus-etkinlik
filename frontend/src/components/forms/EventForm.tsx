import { useState } from "react";
import { Link } from "react-router";
import type { CampusEvent, CampusEventInput, Category } from "../../types/campus-event";
import { categories } from "../../data/categories";
import { useEvents } from "../../context/events-context";
import {
  hasErrors,
  invalidProps,
  validateEvent,
  type EventFormValues,
} from "../../utils/validation";
import Field from "./Field";

interface EventFormProps {
  initial?: CampusEvent; // Güncelle sayfası doldurulmuş gelir, Ekle boş
  submitLabel: string;
  onSubmit: (input: CampusEventInput) => void;
}

const empty: EventFormValues = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
};

function toValues(e: CampusEvent): EventFormValues {
  return { ...e, capacity: String(e.capacity) };
}

// Form ne yapılacağını bilmez; geçerli veriyi onSubmit ile sayfaya verir.
// Ekle ve Güncelle sayfaları aynı formu kullanır.
function EventForm({ initial, submitLabel, onSubmit }: EventFormProps) {
  const { events } = useEvents();
  const [values, setValues] = useState(initial ? toValues(initial) : empty);
  const [submitted, setSubmitted] = useState(false);

  // Hatalar state değil: ilk "Kaydet"ten sonra her tuşta yeniden hesaplanır.
  const errors = submitted ? validateEvent(values, events, initial?.id) : {};

  function set(name: keyof EventFormValues, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  return (
    <form
      className="etkinlik-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
        if (hasErrors(validateEvent(values, events, initial?.id))) return;
        onSubmit({
          title: values.title.trim(),
          category: values.category as Category,
          date: values.date,
          time: values.time,
          location: values.location.trim(),
          capacity: Number(values.capacity),
          description: values.description.trim(),
          image: initial?.image,
        });
      }}
    >
      <Field id="ad" label="Etkinlik Adı" error={errors.title}>
        <input type="text" id="ad" placeholder="Örn. Kariyer Günleri 2026" maxLength={80}
          value={values.title} onChange={(e) => set("title", e.target.value)}
          {...invalidProps("ad", errors.title)} />
      </Field>

      <Field id="kategori" label="Kategori" error={errors.category}>
        <select id="kategori" value={values.category}
          onChange={(e) => set("category", e.target.value)}
          {...invalidProps("kategori", errors.category)}>
          <option value="">Seçiniz</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </Field>

      <Field id="tarih" label="Tarih" error={errors.date}>
        <input type="date" id="tarih" value={values.date}
          onChange={(e) => set("date", e.target.value)}
          {...invalidProps("tarih", errors.date)} />
      </Field>

      <Field id="saat" label="Saat" error={errors.time}>
        <input type="time" id="saat" value={values.time}
          onChange={(e) => set("time", e.target.value)}
          {...invalidProps("saat", errors.time)} />
      </Field>

      <Field id="yer" label="Yer" error={errors.location}>
        <input type="text" id="yer" placeholder="Örn. A Blok Konferans" value={values.location}
          onChange={(e) => set("location", e.target.value)}
          {...invalidProps("yer", errors.location)} />
      </Field>

      <Field id="kapasite" label="Kontenjan" error={errors.capacity}>
        <input type="number" id="kapasite" min={1} max={5000} value={values.capacity}
          onChange={(e) => set("capacity", e.target.value)}
          {...invalidProps("kapasite", errors.capacity)} />
      </Field>

      <Field id="aciklama" label="Açıklama" error={errors.description}>
        <textarea id="aciklama" rows={4} value={values.description}
          onChange={(e) => set("description", e.target.value)}
          {...invalidProps("aciklama", errors.description)} />
      </Field>

      <div className="form-aksiyonlar">
        <button type="submit">{submitLabel}</button>
        <Link className="btn-geri" to="/admin">Vazgeç</Link>
      </div>
    </form>
  );
}

export default EventForm;
