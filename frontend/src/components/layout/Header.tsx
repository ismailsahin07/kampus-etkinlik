interface HeaderProps {
  title: string;
  text?: string; // alt yazı isteğe bağlı
}

function Header({ title, text }: HeaderProps) {
  return (
    <header>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}

export default Header;
