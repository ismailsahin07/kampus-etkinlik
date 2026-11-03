// Oturum bilgisi: kim giriş yaptı, kayıt/giriş/çıkış fonksiyonları.
import { createContext, useContext } from "react";
import type { User } from "../types/user";

export interface AuthContextValue {
  user: User | null;
  register: (user: User) => boolean; // e-posta kayıtlıysa false
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isRegistered: (email: string) => boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth, AuthProvider içinde kullanılmalı.");
  return value;
}
