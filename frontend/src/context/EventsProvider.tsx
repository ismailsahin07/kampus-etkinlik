import { useEffect, useState, type ReactNode } from "react";
import type { CampusEvent, CampusEventInput } from "../types/campus-event";
import { events as sampleEvents } from "../data/events";
import { slugify } from "../utils/slugify";
import { loadJson, saveJson } from "../utils/storage";
import { EventsContext } from "./events-context";

const STORAGE_KEY = "kampus-etkinlikler";

// Liste localStorage'da saklanır: sayfa yenilense de eklenen/silinen kalır.
function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(() =>
    loadJson(STORAGE_KEY, sampleEvents),
  );

  useEffect(() => saveJson(STORAGE_KEY, events), [events]);

  function addEvent(input: CampusEventInput) {
    const created = { ...input, id: `event-${Date.now()}` };
    setEvents((list) => [...list, created]);
    return created;
  }

  function updateEvent(id: string, input: CampusEventInput) {
    const updated = { ...input, id };
    setEvents((list) => list.map((e) => (e.id === id ? updated : e)));
    return updated;
  }

  function deleteEvent(id: string) {
    setEvents((list) => list.filter((e) => e.id !== id));
  }

  const findBySlug = (slug: string) => events.find((e) => slugify(e.title) === slug);

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent, findBySlug }}>
      {children}
    </EventsContext.Provider>
  );
}

export default EventsProvider;
