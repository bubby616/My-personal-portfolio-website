import { useState } from "react";
import SectionWrapper from "../components/layout/SectionWrapper";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/shared/ScrollReveal";
import Button from "../components/ui/Button";
import {
  Mail,
  ArrowUpRight,
  MapPin,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
} from "lucide-react";
import GithubIcon from "../components/ui/GithubIcon";

// ── Web3Forms config ────────────────────────────────────────────────
// 1. Create a free account at https://web3forms.com
// 2. Get your Access Key (it's meant to be public/client-side — safe
//    to commit, this is how Web3Forms is designed to be used).
// 3. Paste it below.
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

const links = [
  {
    label: "Email",
    value: "rosario.jose0811@gmail.com",
    href: "mailto:rosario.jose0811@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/bubby616",
    href: "https://github.com/bubby616",
    icon: GithubIcon,
  },

];

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  // "idle" | "submitting" | "success" | "error"
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm(EMPTY_FORM);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const isSubmitting = status === "submitting";

  const inputClass =
    "w-full rounded-lg border border-border bg-bg/40 px-4 py-2.5 text-sm text-ink placeholder:text-muted/50 outline-none transition-colors duration-200 focus:border-accent/60 focus:ring-2 focus:ring-accent/20";
  const labelClass = "mb-1.5 block font-mono text-xs text-muted";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Juan Dela Cruz"
            value={form.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className={labelClass}>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="Job opportunity, project inquiry, etc."
          value={form.subject}
          onChange={handleChange}
          disabled={isSubmitting}
          className={inputClass}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell me a bit about the role or project..."
          value={form.message}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Status messages — role changes so screen readers announce
          errors immediately (assertive) but success politely. */}
      {status === "success" && (
        <div
          role="status"
          className="mt-5 flex items-start gap-2.5 rounded-lg border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-ink"
        >
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
          <p>Message sent successfully. I'll get back to you soon.</p>
        </div>
      )}
      {status === "error" && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2.5 rounded-lg border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-ink"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-accent" />
          <p>
            Something went wrong sending your message. Please try again, or
            email me directly instead.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-ink transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-[0_14px_34px_-12px_var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin motion-reduce:animate-none" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send size={16} />
          </>
        )}
      </button>
    </form>
  );
}

export default function Contact() {
  return (
    <SectionWrapper id="contact" className="bg-surface/50">
      <ScrollReveal>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Available for opportunities
        </div>
        <SectionHeading
          title="Let's work together"
          description="Open to Full-Stack Developer roles and freelance opportunities. Feel free to reach out."
          showMeta={false}
        />
      </ScrollReveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-5 items-start">
        {/* Form — the primary way to reach out now */}
        <ScrollReveal delay={0.1} className="lg:col-span-3">
          <ContactForm />
        </ScrollReveal>

        {/* Sidebar — terminal motif, contact cards, secondary email CTA */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <ScrollReveal delay={0.15}>
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted/30" />
                <span className="ml-2 font-mono text-[10px] text-muted">
                  contact.sh
                </span>
              </div>
              <div className="px-4 py-3 font-mono text-xs text-muted">
                <span className="text-accent">$</span> echo "let's build
                something great together"
              </div>
            </div>
          </ScrollReveal>

          {links.map((link, i) => (
            <ScrollReveal key={link.label} delay={0.2 + i * 0.05}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_12px_30px_-14px_var(--color-accent)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 rounded-lg bg-accent-soft p-2.5 text-accent transition-colors duration-300 group-hover:bg-accent/20">
                    <link.icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-muted">
                      {link.label}
                    </p>
                    <p className="truncate text-sm font-medium text-ink">
                      {link.value}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={15}
                  className="shrink-0 text-muted transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent motion-reduce:transition-none"
                />
              </a>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={0.4}>
            <span
              className="group/cta inline-block w-fit
                [&>a]:transition-all [&>a]:duration-300 [&>a]:ease-out
                hover:[&>a]:-translate-y-1
                hover:[&>a]:shadow-[0_14px_34px_-12px_var(--color-accent)]
                motion-reduce:[&>a]:transition-none
                motion-reduce:hover:[&>a]:translate-y-0"
            >
              <Button
                as="a"
                href="mailto:rosario.jose0811@gmail.com"
                variant="secondary"
              >
                <span className="inline-flex items-center gap-2">
                  Or email me directly
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 ease-out group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 motion-reduce:transition-none"
                  />
                </span>
              </Button>
            </span>
          </ScrollReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}