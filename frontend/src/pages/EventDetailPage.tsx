import { Link, useParams } from "react-router";
import { useEvents } from "../context/events-context";
import PageLayout from "../components/layout/PageLayout";
import EventDetail from "../components/events/EventDetail";

function EventDetailPage() {
  const { slug = "" } = useParams();
  const { findBySlug } = useEvents();
  const event = findBySlug(slug);

  if (!event) {
    return (
      <PageLayout title="Etkinlik Bulunamadı">
        <div className="hata-kutusu">
          <h2>Etkinlik Bulunamadı</h2>
          <p>Aradığınız etkinlik bulunamadı veya silinmiş olabilir.</p>
          <Link className="btn-geri" to="/events">← Listeye dön</Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={event.title}>
      <EventDetail event={event} />
    </PageLayout>
  );
}

export default EventDetailPage;
