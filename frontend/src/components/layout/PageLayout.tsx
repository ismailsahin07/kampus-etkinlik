import { useEffect, type ReactNode } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

export const SITE_NAME = "Kampüs Etkinlikleri";

interface PageLayoutProps {
  title: string;
  text?: string;
  children: ReactNode;
}

// Her sayfa kendi başlığıyla bu iskeleti kullanır: Header → Nav → main → Footer.
function PageLayout({ title, text, children }: PageLayoutProps) {
  // Dar sekmede görünsün diye sayfa adı önde.
  useEffect(() => {
    document.title = title === SITE_NAME ? SITE_NAME : `${title} — ${SITE_NAME}`;
  }, [title]);

  return (
    <>
      <Header title={title} text={text} />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default PageLayout;
