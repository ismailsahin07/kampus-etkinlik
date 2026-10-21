import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";
import { pageFromSearch, pageToSearch } from "./utils/page-url";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

const SITE_NAME = "Kampüs Etkinlikleri";

const pageTitles: Record<PageName, string> = {
  home: SITE_NAME,
  events: "Tüm Etkinlikler",
  detail: "Etkinlik Detayı",
  add: "Etkinlik Ekle",
  update: "Etkinlik Güncelle",
};

// Başlığın altındaki yazı sadece bu iki sayfada var.
const pageTexts: Partial<Record<PageName, string>> = {
  home: "Kampüsteki etkinlikleri keşfet, takip et ve katıl.",
  events: "Ekim ve Kasım aylarında kampüste düzenlenen etkinlikler.",
};

// Veri sabit olduğu için bunlar bir kez hesaplanır.
const categories = [...new Set(events.map((e) => e.category))];
const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

// Açık sayfayı adres çubuğundan okur (ilk açılış, yenileme, geri/ileri tuşu).
const readUrl = () => pageFromSearch(window.location.search, events);

function App() {
  const [page, setPage] = useState<PageName>(() => readUrl().page);
  const [selectedId, setSelectedId] = useState<string | null>(() => readUrl().selectedId);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Sayfa değiştiren tek fonksiyon; bileşenler bunu callback olarak çağırır.
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    // Adres çubuğu da değişir; geri tuşu bir önceki sayfaya döner.
    const event = id ? findEventById(events, id) : undefined;
    const url = window.location.pathname + pageToSearch(next, event);
    if (url !== window.location.pathname + window.location.search) {
      window.history.pushState(null, "", url);
    }
    window.scrollTo(0, 0);
  }
  const showDetail = (id: string) => go("detail", id);

  // Geri/ileri tuşunda yeni adres okunur, sayfa ona göre değişir.
  useEffect(() => {
    function onPopState() {
      const view = readUrl();
      setPage(view.page);
      setSelectedId(view.selectedId);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Filtreli liste state değil: her çizimde state'ten hesaplanır.
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  let title = pageTitles[page];
  if (page === "detail") title = selected ? selected.title : "Etkinlik Bulunamadı";

  // Başlık değişince sekme adı da değişir; dar sekmede görünsün diye sayfa adı önde.
  useEffect(() => {
    document.title = title === SITE_NAME ? SITE_NAME : `${title} — ${SITE_NAME}`;
  }, [title]);

  return (
    <>
      <Header title={title} text={pageTexts[page]} />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <section className="yaklasan-etkinlikler">
            <h2>Yaklaşan Etkinlikler</h2>
            <EventList events={upcoming} onShowDetail={showDetail} />
            <a className="btn-geri" href="#" onClick={(e) => { e.preventDefault(); go("events"); }}>
              Tüm etkinlikleri gör
            </a>
          </section>
        )}

        {page === "events" && (
          <>
            <EventFilter searchText={searchText} category={category} categories={categories}
              onSearchChange={setSearchText} onCategoryChange={setCategory} />
            <p id="sonuc">
              {filtered.length === 0
                ? "Etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <EventList events={filtered} onShowDetail={showDetail}
              emptyText="Aramanıza uygun etkinlik bulunamadı." />
          </>
        )}

        {page === "detail" && !selected && (
          <div className="hata-kutusu">
            <h2>Etkinlik Bulunamadı</h2>
            <p>Aradığınız etkinlik bulunamadı veya silinmiş olabilir.</p>
            <a className="btn-geri" href="#" onClick={(e) => { e.preventDefault(); go("events"); }}>
              ← Listeye dön
            </a>
          </div>
        )}

        {page === "detail" && selected && (
          <EventDetail event={selected} onBack={() => go("events")}
            onEdit={(id) => go("update", id)} />
        )}

        {/* Kaydetme Sprint 6'da; şimdilik geçici handler sayfanın başına kayar. */}
        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
