import SectionWrapper from "../components/layout/SectionWrapper";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/shared/ScrollReveal";

// Small local helper so the collage images share the same
// rounded/border/hover treatment without repeating classes each time.
// - `label` renders a small mono "workflow" tag (e.g. "// input") that
//   fades in on hover, so the collage reads as stages of a dev workflow
//   rather than a generic photo gallery.
// - `lift` adds a subtle hover translate for the smaller supporting
//   shots; the large hero shot stays anchored (glow + scale only).
// motion-reduce: variants disable the transform/shadow transition for
// users with prefers-reduced-motion enabled, on top of whatever
// ScrollReveal already does for the entrance animation.
function CollageImage({ src, alt, aspect, label, lift = false, className = "" }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 ease-out hover:shadow-[0_0_30px_-8px_var(--color-accent)] ${
        lift ? "hover:-translate-y-1" : ""
      } motion-reduce:transition-none motion-reduce:hover:shadow-none motion-reduce:hover:translate-y-0 ${aspect} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none" />
      {label && (
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-border/60 bg-bg/70 px-2.5 py-1 font-mono text-[10px] text-ink/90 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none">
          {label}
        </span>
      )}
    </div>
  );
}

export default function About() {
  return (
    <SectionWrapper id="about">
      <ScrollReveal>
        <SectionHeading title="About Me" showMeta={false} />
      </ScrollReveal>

      <div className="grid gap-10 md:grid-cols-5 md:items-center lg:gap-14">
        <div className="space-y-5 border-l-2 border-accent/25 pl-5 md:col-span-2 md:pl-6">
          <ScrollReveal delay={0.15}>
            <p className="text-lg leading-relaxed tracking-[-0.01em] text-ink">
              I am a passionate aspiring Full-Stack Developer interested in
              building modern and user-friendly web applications. I enjoy
              working on both front-end and back-end development while
              continuously improving my skills in web technologies.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-base leading-relaxed text-muted">
              My interest in coding started through self-learning, practice,
              and building personal projects that helped me understand how
              applications work. I am motivated to keep learning new
              technologies, solve problems through code, and grow as a
              developer while exploring my interests in technology and
              software development.
            </p>
          </ScrollReveal>
        </div>

        {/* Editorial bento: one large "hero" workspace shot on top, three
            smaller supporting shots in a row underneath. Same order on
            every screen size — the hero always leads, so mobile naturally
            sees the full workspace first, then the compact detail row.
            Hover reveals a small mono label on each shot ("// input",
            "// output", etc.) so the set reads as stages of a workflow. */}
        <div className="space-y-4 md:col-span-3">
          <ScrollReveal delay={0.1}>
            <CollageImage
              src="/images/about/coffee-laptop.jpg"
              alt="Full developer workspace with monitor, laptop, and keyboard"
              aspect="aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]"
              label="// workspace"
              className="w-full"
            />
          </ScrollReveal>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <ScrollReveal delay={0.2}>
              <CollageImage
                src="/images/about/keyboard.jpg"
                alt="Mechanical keyboard close-up"
                aspect="aspect-square"
                label="// input"
                lift
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <CollageImage
                src="/images/about/monitor-code.jpg"
                alt="Monitor displaying lines of code"
                aspect="aspect-square"
                label="// output"
                lift
              />
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <CollageImage
                src="/images/about/desk-setup.jpg"
                alt="Coffee beside a laptop"
                aspect="aspect-square"
                label="// setup"
                lift
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}