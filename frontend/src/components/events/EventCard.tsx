import { Link } from "react-router";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";
import { slugify } from "../../utils/slugify";

interface EventCardProps {
  event: CampusEvent;
}

// key burada değil: key'i listeyi çizen EventList verir.
function EventCard({ event }: EventCardProps) {
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
      <Link to={`/events/${slugify(event.title)}`}>Detayları Gör →</Link>
    </article>
  );
}

export default EventCard;
