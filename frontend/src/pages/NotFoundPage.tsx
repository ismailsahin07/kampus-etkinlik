import { Link } from "react-router";
import { useEvents } from "../context/events-context";
import PageLayout from "../components/layout/PageLayout";

// Tanımsız her adres (path="*") buraya düşer.
function NotFoundPage() {
  const { events } = useEvents();

  return (
    <PageLayout title="Sayfa Bulunamadı">
      <div className="hata-kutusu">
        <h2>404 — Sayfa Bulunamadı</h2>
        <p>Aradığınız sayfa yok. Etkinlikler sayfasında {events.length} etkinlik sizi bekliyor.</p>
        <div className="detay-aksiyonlar">
          <Link className="btn-geri" to="/">Ana sayfaya dön</Link>
          <Link className="btn-guncelle" to="/events">Etkinlikleri gör</Link>
        </div>
      </div>
    </PageLayout>
  );
}

export default NotFoundPage;
