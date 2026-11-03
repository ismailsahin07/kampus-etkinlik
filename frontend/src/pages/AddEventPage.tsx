import { useNavigate } from "react-router";
import { useEvents } from "../context/events-context";
import PageLayout from "../components/layout/PageLayout";
import EventForm from "../components/forms/EventForm";

function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <PageLayout title="Etkinlik Ekle">
      <EventForm
        submitLabel="Kaydet"
        onSubmit={(input) => {
          const created = addEvent(input);
          navigate("/admin", { state: { message: `"${created.title}" eklendi.` } });
        }}
      />
    </PageLayout>
  );
}

export default AddEventPage;
