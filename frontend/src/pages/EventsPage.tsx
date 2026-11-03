import { useSearchParams } from "react-router";
import type { Category } from "../types/campus-event";
import { categories } from "../data/categories";
import { useEvents } from "../context/events-context";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import PageLayout from "../components/layout/PageLayout";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

function EventsPage() {
  const { events } = useEvents();
  // Arama ve kategori adreste durur (?q=robot&kategori=Atölye):
  // detaydan geri gelince ya da sayfa yenilenince filtre kaybolmaz.
  const [params, setParams] = useSearchParams();
  const searchText = params.get("q") ?? "";
  const raw = params.get("kategori") ?? "";
  const category = (categories as string[]).includes(raw) ? (raw as Category) : "";

  function update(name: "q" | "kategori", value: string) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(name, value);
        else next.delete(name);
        return next;
      },
      { replace: true },
    );
  }

  // Filtreli liste state değil: her çizimde Context'teki listeden hesaplanır.
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <PageLayout title="Tüm Etkinlikler" text="Ekim ve Kasım aylarında kampüste düzenlenen etkinlikler.">
      <EventFilter searchText={searchText} category={category} categories={categories}
        onSearchChange={(t) => update("q", t)} onCategoryChange={(c) => update("kategori", c)} />
      <p id="sonuc">
        {filtered.length === 0
          ? "Etkinlik bulunamadı."
          : `${filtered.length} etkinlik listeleniyor.`}
      </p>
      <EventList events={filtered} emptyText="Aramanıza uygun etkinlik bulunamadı." />
    </PageLayout>
  );
}

export default EventsPage;
