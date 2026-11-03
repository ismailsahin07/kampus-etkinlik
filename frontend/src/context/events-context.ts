// Etkinlik verisinin tek kaynağı. Ekle/güncelle/sil burada yapılır;
// değişiklik bu Context'i kullanan bütün sayfalara aynı anda yansır.
import { createContext, useContext } from "react";
import type { CampusEvent, CampusEventInput } from "../types/campus-event";

export interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (input: CampusEventInput) => CampusEvent;
  updateEvent: (id: string, input: CampusEventInput) => CampusEvent;
  deleteEvent: (id: string) => void;
  findBySlug: (slug: string) => CampusEvent | undefined;
}

export const EventsContext = createContext<EventsContextValue | null>(null);

export function useEvents() {
  const value = useContext(EventsContext);
  if (!value) throw new Error("useEvents, EventsProvider içinde kullanılmalı.");
  return value;
}
