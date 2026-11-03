import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useEvents } from "../context/events-context";
import { formatDate } from "../utils/format-date";
import { slugify } from "../utils/slugify";
import PageLayout from "../components/layout/PageLayout";

function AdminPage() {
  const { events, deleteEvent } = useEvents();
  // Ekle/Güncelle sayfası buraya dönerken mesajı router state'iyle gönderir.
  const location = useLocation();
  const [message, setMessage] = useState<string | undefined>(location.state?.message);

  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

  function remove(id: string, title: string) {
    // Silmeden önce onay: "İptal" denirse hiçbir şey olmaz.
    if (!window.confirm(`"${title}" etkinliği silinsin mi? Bu işlem geri alınamaz.`)) return;
    deleteEvent(id);
    setMessage(`"${title}" silindi.`);
  }

  return (
    <PageLayout title="Etkinlik Yönetimi">
      <Link className="btn-guncelle yeni-etkinlik" to="/admin/new">+ Yeni etkinlik</Link>

      {message && (
        <p id="form-message" className="basarili" role="status">{message}</p>
      )}

      {sorted.length === 0 ? (
        <p className="bulunamadi">Henüz etkinlik yok. "+ Yeni etkinlik" ile ekleyebilirsiniz.</p>
      ) : (
        <table className="yonetim-tablosu">
          <thead>
            <tr>
              <th scope="col">Etkinlik</th>
              <th scope="col">Tarih</th>
              <th scope="col">Kategori</th>
              <th scope="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((e) => (
              <tr key={e.id}>
                <td data-label="Etkinlik">
                  <Link to={`/events/${slugify(e.title)}`}>{e.title}</Link>
                </td>
                <td data-label="Tarih">{formatDate(e.date)}</td>
                <td data-label="Kategori">{e.category}</td>
                <td data-label="İşlemler">
                  <div className="tablo-aksiyonlar">
                    <Link className="btn-guncelle" to={`/admin/edit/${slugify(e.title)}`}>Düzenle</Link>
                    <button type="button" className="btn-sil" onClick={() => remove(e.id, e.title)}>
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </PageLayout>
  );
}

export default AdminPage;
