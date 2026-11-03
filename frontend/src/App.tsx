import "./App.css";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import AdminPage from "./pages/AdminPage";
import AddEventPage from "./pages/AddEventPage";
import EditEventPage from "./pages/EditEventPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";

// 10 route: her adres bir sayfa bileşeni açar. Veri sayfalara Context'ten gelir.
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:slug" element={<EventDetailPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/new" element={<AddEventPage />} />
      <Route path="/admin/edit/:slug" element={<EditEventPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
