import { Link } from "react-router";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";
import { slugify } from "../../utils/slugify";

interface EventDetailProps {
  event: CampusEvent;
}

// Etkinliği bulmak sayfanın işi; bileşen hazır etkinliği alır ve gösterir.
function EventDetail({ event }: EventDetailProps) {
  return (
    <article className="etkinlik-detay">
      <div className="detay-layout">
        {event.image && (
          <figure className="detay-poster">
            <img src={event.image} alt={`${event.title} afişi`} />
            <figcaption>{event.title} afişi</figcaption>
          </figure>
        )}
        <section className="detay-kunye">
          <h2>Etkinlik Künyesi</h2>
          <dl className="detay-bilgi">
            <dt>Tarih</dt>
            <dd>
              <time dateTime={`${event.date}T${event.time}`}>
                {formatDate(event.date)}, {event.time}
              </time>
            </dd>
            <dt>Yer</dt>
            <dd>{event.location}</dd>
            <dt>Kategori</dt>
            <dd>{event.category}</dd>
            <dt>Kontenjan</dt>
            <dd>{event.capacity} kişi</dd>
          </dl>
        </section>
      </div>

      <h2>Açıklama</h2>
      <p>{event.description}</p>

      <div className="detay-aksiyonlar">
        <Link className="btn-geri" to="/events">
          ← Listeye dön
        </Link>
        <Link className="btn-guncelle" to={`/admin/edit/${slugify(event.title)}`}>
          Bu etkinliği güncelle
        </Link>
      </div>
    </article>
  );
}

export default EventDetail;
