import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const tabs = [
  { file: "about.jsx", label: "About", href: "#about" },
  { file: "skills.jsx", label: "Skills", href: "#skills" },
  { file: "projects.jsx", label: "Projects", href: "#projects" },
  { file: "contact.jsx", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg/90 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-between h-16">
          <a href="/" aria-label="Go to homepage" className="flex items-center">
            <img
              src="/images/logo.png"
              alt="Jose Rosario logo"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </a>

          {/* Desktop nav styled like editor tabs */}
          <nav className="hidden md:flex items-center rounded-lg border border-border bg-surface p-1">
            {tabs.map((tab) => (
              <a
                key={tab.file}
                href={tab.href}
                className="group flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted
                  hover:text-ink hover:bg-ink/[0.04] transition-colors duration-150"
              >
                <span className="group-hover:text-ink">
                  {tab.label}
                </span>
              </a>
            ))}
          </nav>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm
              font-medium text-white hover:bg-accent-dark transition-colors duration-150"
          >
            Resume
          </a>

          <button
            className="md:hidden text-ink"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-border bg-bg px-6 py-4 flex flex-col gap-1">
          {tabs.map((tab) => (
            <a
              key={tab.file}
              href={tab.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-2 rounded-md px-3 py-3 text-ink hover:bg-ink/[0.04]"
            >
              <span className="text-sm text-ink">{tab.label}</span>
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent px-4 py-3
              text-sm font-medium text-white"
          >
            Resume
          </a>
        </nav>
      )}
    </header>
  );
}