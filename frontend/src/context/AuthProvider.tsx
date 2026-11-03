import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/user";
import { loadJson, saveJson } from "../utils/storage";
import { AuthContext } from "./auth-context";

const USERS_KEY = "kampus-kullanicilar";
const SESSION_KEY = "kampus-oturum";

// Sunucu yok: kullanıcılar tarayıcıda tutulur (sadece ders projesi için).
function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => loadJson(USERS_KEY, []));
  const [user, setUser] = useState<User | null>(() => loadJson(SESSION_KEY, null));

  useEffect(() => saveJson(USERS_KEY, users), [users]);
  useEffect(() => saveJson(SESSION_KEY, user), [user]);

  const sameEmail = (a: string, b: string) =>
    a.trim().toLocaleLowerCase("tr-TR") === b.trim().toLocaleLowerCase("tr-TR");

  const isRegistered = (email: string) => users.some((u) => sameEmail(u.email, email));

  function register(next: User) {
    if (isRegistered(next.email)) return false;
    const clean = { ...next, name: next.name.trim(), email: next.email.trim() };
    setUsers((list) => [...list, clean]);
    setUser(clean);
    return true;
  }

  function login(email: string, password: string) {
    const found = users.find((u) => sameEmail(u.email, email) && u.password === password);
    if (found) setUser(found);
    return Boolean(found);
  }

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isRegistered }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
