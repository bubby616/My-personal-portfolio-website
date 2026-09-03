import { Mail } from "lucide-react";
import ScrollReveal from "../shared/ScrollReveal";
import GithubIcon from "../ui/GithubIcon";
import LinkedinIcon from "../ui/LinkedinIcon";

// TODO: swap in your real LinkedIn URL once you have one.
const LINKEDIN_URL = "https://linkedin.com/in/YOUR-PROFILE";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/bubby616", icon: GithubIcon },
  { label: "Email", href: "mailto:rosario.jose0811@gmail.com", icon: Mail },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-12">
        {/* Branding + social links */}
        <ScrollReveal>
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div>
              <p className="font-display text-base font-semibold text-ink">
                Jose P. Rosario
              </p>
              <p className="mt-0.5 font-mono text-xs text-accent">
                Full-Stack Developer
              </p>
              <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted">
                Building practical, reliable software — one project at a time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={link.label}
                  className="rounded-full border border-border p-2 text-muted transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <link.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-border pt-5 md:mt-10">
          <p className="text-center text-xs text-muted sm:text-left">
            © {year} Jose P. Rosario. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}