import Header from "./Header";
import Footer from "./Footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-shell bg-[var(--sage)] text-[var(--ink)]">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
