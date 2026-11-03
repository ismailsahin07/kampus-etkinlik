import type { ReactNode } from "react";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode; // input / select / textarea
}

// Etiket + alan + hata mesajı. Bütün formlar (etkinlik, giriş, kayıt, şifre) bunu kullanır.
function Field({ id, label, error, children }: FieldProps) {
  return (
    <label htmlFor={id}>
      {label}
      {children}
      {error && (
        <span className="hata-mesaji" id={`${id}-hata`} role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

export default Field;
