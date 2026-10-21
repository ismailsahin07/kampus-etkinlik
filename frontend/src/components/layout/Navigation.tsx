import type { PageName } from "../../types/page";

const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Etkinlik Ekle" },
];

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

// Veri aşağı (current), olay yukarı (onNavigate): sayfayı değiştiren yine App.
function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav>
      {menu.map((item) => (
        <a
          key={item.page}
          href="#"
          aria-current={current === item.page ? "page" : undefined}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.page);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default Navigation;
