import "./App.css";
import { useEffect, useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

// Router yok: hangi sayfanın açık olduğunu bu tipteki bir state tutar.
type PageName = "home" | "events" | "detail" | "add" | "update";

const SITE_NAME = "Kampüs Etkinlikleri";

const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Etkinlik Ekle" },
];

const pageTitles: Record<PageName, string> = {
  home: SITE_NAME,
  events: "Tüm Etkinlikler",
  detail: "Etkinlik Detayı",
  add: "Etkinlik Ekle",
  update: "Etkinlik Güncelle",
};

// Veri sabit olduğu için bunlar bir kez hesaplanır.
const categories = [...new Set(events.map((e) => e.category))];
const upcoming = [...events]
  .sort((a, b) => a.date.localeCompare(b.date))
  .slice(0, 2);

// "2026-10-12" → "12 Ekim 2026"
const formatDate = (date: string) =>
  new Date(`${date}T00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Sayfa değiştiren tek fonksiyon.
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  // Filtreli liste state değil: her çizimde state'ten hesaplanır.
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  let title = pageTitles[page];
  if (page === "detail") title = selected ? selected.title : "Etkinlik Bulunamadı";

  // Başlık değişince sekme adı da değişir.
  useEffect(() => {
    document.title = title === SITE_NAME ? SITE_NAME : `${SITE_NAME} — ${title}`;
  }, [title]);

  // Kart JSX'i: hem ana sayfada hem Etkinlikler sayfasında kullanılır.
  function renderCard(event: CampusEvent) {
    return (
      <article className="etkinlik-kart" key={event.id}>
        <h3>{event.title}</h3>
        <p className="etkinlik-meta">
          {formatDate(event.date)}, {event.time} — {event.location}
        </p>
        <p className="etkinlik-meta">
          {event.category} &middot; Kontenjan: {event.capacity} kişi
        </p>
        <p>{event.description}</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları Gör →
        </a>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>{title}</h1>
        {page === "home" && <p>Kampüsteki etkinlikleri keşfet, takip et ve katıl.</p>}
        {page === "events" && <p>Ekim ve Kasım aylarında kampüste düzenlenen etkinlikler.</p>}
      </header>

      <nav>
        {menu.map((item) => (
          <a
            key={item.page}
            href="#"
            aria-current={page === item.page ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              go(item.page);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <main>
        {/* ---------- Ana Sayfa ---------- */}
        {page === "home" && (
          <section className="yaklasan-etkinlikler">
            <h2>Yaklaşan Etkinlikler</h2>
            <div className="etkinlik-listesi">{upcoming.map(renderCard)}</div>
            <a
              className="btn-geri"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              Tüm etkinlikleri gör
            </a>
          </section>
        )}

        {/* ---------- Etkinlikler ---------- */}
        {page === "events" && (
          <>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="arama">Etkinlik ara</label>
              <input
                type="search"
                id="arama"
                placeholder="Örn. atölye, kariyer"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <label htmlFor="kategori-filtre">Kategori</label>
              <select
                id="kategori-filtre"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | "")}
              >
                <option value="">Tümü</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </form>

            <p id="sonuc">
              {filtered.length === 0
                ? "Etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlik-listesi">
              {filtered.length === 0 ? (
                <p className="bulunamadi">Aramanıza uygun etkinlik bulunamadı.</p>
              ) : (
                filtered.map(renderCard)
              )}
            </section>
          </>
        )}

        {/* ---------- Detay ---------- */}
        {page === "detail" && !selected && (
          <div className="hata-kutusu">
            <h2>Etkinlik Bulunamadı</h2>
            <p>Aradığınız etkinlik bulunamadı veya silinmiş olabilir.</p>
            <a
              className="btn-geri"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              ← Listeye dön
            </a>
          </div>
        )}

        {page === "detail" && selected && (
          <article className="etkinlik-detay">
            <div className="detay-layout">
              {selected.image && (
                <figure className="detay-poster">
                  <img src={selected.image} alt={`${selected.title} afişi`} />
                  <figcaption>{selected.title} afişi</figcaption>
                </figure>
              )}
              <section className="detay-kunye">
                <h2>Etkinlik Künyesi</h2>
                <dl className="detay-bilgi">
                  <dt>Tarih</dt>
                  <dd>
                    <time dateTime={`${selected.date}T${selected.time}`}>
                      {formatDate(selected.date)}, {selected.time}
                    </time>
                  </dd>
                  <dt>Yer</dt>
                  <dd>{selected.location}</dd>
                  <dt>Kategori</dt>
                  <dd>{selected.category}</dd>
                  <dt>Kontenjan</dt>
                  <dd>{selected.capacity} kişi</dd>
                </dl>
              </section>
            </div>

            <h2>Açıklama</h2>
            <p>{selected.description}</p>

            <div className="detay-aksiyonlar">
              <a
                className="btn-geri"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                ← Listeye dön
              </a>
              <a
                className="btn-guncelle"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("update", selected.id);
                }}
              >
                Bu etkinliği güncelle
              </a>
            </div>
          </article>
        )}

        {/* ---------- Ekle / Güncelle (aynı form) ---------- */}
        {(page === "add" || page === "update") && (
          <>
            <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <form
              className="etkinlik-form"
              noValidate
              onSubmit={(e) => e.preventDefault()}
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
        )}
      </main>

      <footer>
        <p>İsmail Harun Şahin &middot; 2211012053 &middot; 2026</p>
      </footer>
    </>
  );
}

export default App;
