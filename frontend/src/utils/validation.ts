// Saf doğrulama fonksiyonları: değerleri alır, hata mesajlarını döndürür.
// Boş nesne = form geçerli.
import type { CampusEvent } from "../types/campus-event";
import { slugify } from "./slugify";

export type Errors<K extends string> = Partial<Record<K, string>>;

export interface EventFormValues {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
}

/** Yerel saate göre bugünün "YYYY-MM-DD" hâli. */
export function today() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Hatalı alanı ekran okuyucuya ve CSS'e bildirir (aria-invalid → kırmızı çerçeve). */
export function invalidProps(id: string, error?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-hata` : undefined,
  };
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function emailError(email: string): string | undefined {
  if (!email.trim()) return "E-posta zorunludur.";
  if (!emailPattern.test(email.trim())) return "Geçerli bir e-posta girin (örn. ad@ornek.com).";
  return undefined;
}

export function validateEvent(
  v: EventFormValues,
  events: CampusEvent[],
  currentId?: string,
): Errors<keyof EventFormValues> {
  const errors: Errors<keyof EventFormValues> = {};
  const title = v.title.trim();

  if (title.length < 3) errors.title = "Etkinlik adı en az 3 karakter olmalı.";
  else if (title.length > 80) errors.title = "Etkinlik adı en fazla 80 karakter olabilir.";
  // Adres başlıktan üretildiği için iki etkinlik aynı adı taşıyamaz.
  else if (events.some((e) => e.id !== currentId && slugify(e.title) === slugify(title)))
    errors.title = "Bu adla bir etkinlik zaten var.";

  if (!v.category) errors.category = "Kategori seçin.";
  if (!v.date) errors.date = "Tarih zorunludur.";
  // Yeni etkinlik geçmişe eklenemez; eski etkinlikler yine düzenlenebilir.
  else if (!currentId && v.date < today()) errors.date = "Tarih bugünden önce olamaz.";
  if (!v.time) errors.time = "Saat zorunludur.";
  if (v.location.trim().length < 2) errors.location = "Yer zorunludur.";

  const capacity = Number(v.capacity);
  if (!v.capacity) errors.capacity = "Kontenjan zorunludur.";
  else if (!Number.isInteger(capacity) || capacity < 1 || capacity > 5000)
    errors.capacity = "Kontenjan 1 ile 5000 arasında tam sayı olmalı.";

  if (v.description.trim().length < 10)
    errors.description = "Açıklama en az 10 karakter olmalı.";

  return errors;
}

export function validateLogin(email: string, password: string) {
  const errors: Errors<"email" | "password"> = {};
  const e = emailError(email);
  if (e) errors.email = e;
  if (!password) errors.password = "Şifre zorunludur.";
  return errors;
}

export function validateRegister(v: {
  name: string;
  email: string;
  password: string;
  password2: string;
}) {
  const errors: Errors<"name" | "email" | "password" | "password2"> = {};
  if (v.name.trim().length < 3) errors.name = "Ad Soyad en az 3 karakter olmalı.";
  const e = emailError(v.email);
  if (e) errors.email = e;
  if (v.password.length < 6) errors.password = "Şifre en az 6 karakter olmalı.";
  else if (!/[0-9]/.test(v.password) || !/[a-zA-ZçğıöşüÇĞİÖŞÜ]/.test(v.password))
    errors.password = "Şifre en az bir harf ve bir rakam içermeli.";
  if (!v.password2) errors.password2 = "Şifreyi tekrar yazın.";
  else if (v.password2 !== v.password) errors.password2 = "Şifreler eşleşmiyor.";
  return errors;
}

export const hasErrors = (errors: object) => Object.keys(errors).length > 0;

export function validateForgot(email: string) {
  const errors: Errors<"email"> = {};
  const e = emailError(email);
  if (e) errors.email = e;
  return errors;
}
