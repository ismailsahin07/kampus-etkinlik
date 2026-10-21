import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

// key burada değil: key'i listeyi çizen EventList verir.
function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="etkinlik-kart">
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
          onShowDetail(event.id);
        }}
      >
        Detayları Gör →
      </a>
    </article>
  );
}

export default EventCard;
