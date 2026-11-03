import { Link } from "react-router";
import { useEvents } from "../context/events-context";
import PageLayout, { SITE_NAME } from "../components/layout/PageLayout";
import EventList from "../components/events/EventList";

function HomePage() {
  const { events } = useEvents();
  // Liste Context'ten geldiği için eklenen/silinen etkinlik burada da hemen görünür.
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

  return (
    <PageLayout title={SITE_NAME} text="Kampüsteki etkinlikleri keşfet, takip et ve katıl.">
      <section className="yaklasan-etkinlikler">
        <h2>Yaklaşan Etkinlikler</h2>
        <EventList events={upcoming} emptyText="Henüz etkinlik eklenmemiş." />
        <Link className="btn-geri" to="/events">
          Tüm etkinlikleri gör
        </Link>
      </section>
    </PageLayout>
  );
}

export default HomePage;
