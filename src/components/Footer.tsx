import { nav, company } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-muted)] bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-[var(--muted-700)] flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}


