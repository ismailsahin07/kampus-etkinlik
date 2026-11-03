import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
}

// Ana sayfa ve Etkinlikler sayfası aynı listeyi kullanır; kart kodu tek yerde.
function EventList({ events, emptyText = "Etkinlik bulunamadı." }: EventListProps) {
  if (events.length === 0) {
    return <p className="bulunamadi">{emptyText}</p>;
  }

  return (
    <div className="etkinlik-listesi">
      {events.map((event) => (
        // key index değil id: filtre değişince sıra değişse de kart aynı kalır.
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventList;
