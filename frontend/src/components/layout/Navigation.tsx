import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../context/auth-context";

const menu = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/events", label: "Etkinlikler" },
  { to: "/admin", label: "Yönetim" },
];

// NavLink açık sayfanın linkine aria-current="page" ekler (CSS bunu boyar).
// "/" için end: yoksa her adreste Ana Sayfa da aktif görünürdü.
function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav>
      {menu.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === "/"}>
          {item.label}
        </NavLink>
      ))}
      {user ? (
        <button
          type="button"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Çıkış ({user.name.split(" ")[0]})
        </button>
      ) : (
        <NavLink to="/login">Giriş</NavLink>
      )}
    </nav>
  );
}

export default Navigation;
