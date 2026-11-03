import { Link, useNavigate, useParams } from "react-router";
import { useEvents } from "../context/events-context";
import PageLayout from "../components/layout/PageLayout";
import EventForm from "../components/forms/EventForm";

function EditEventPage() {
  const { slug = "" } = useParams();
  const { findBySlug, updateEvent } = useEvents();
  const navigate = useNavigate();
  const event = findBySlug(slug);

  if (!event) {
    return (
      <PageLayout title="Etkinlik Bulunamadı">
        <div className="hata-kutusu">
          <h2>Etkinlik Bulunamadı</h2>
          <p>Güncellemek istediğiniz etkinlik bulunamadı veya silinmiş olabilir.</p>
          <Link className="btn-geri" to="/admin">← Yönetime dön</Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Etkinlik Güncelle">
      {/* key: başka etkinliğe geçilirse form yeni değerlerle sıfırdan kurulur. */}
      <EventForm
        key={event.id}
        initial={event}
        submitLabel="Güncelle"
        onSubmit={(input) => {
          const updated = updateEvent(event.id, input);
          navigate("/admin", { state: { message: `"${updated.title}" güncellendi.` } });
        }}
      />
    </PageLayout>
  );
}

export default EditEventPage;
