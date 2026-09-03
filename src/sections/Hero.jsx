import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../components/ui/Button";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: shouldReduceMotion
        ? {}
        : { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = shouldReduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <section
      id="top"
      className="relative flex items-center overflow-hidden py-20 lg:min-h-[90vh] lg:py-0"
    >
      {/* Desktop / laptop / large screens: full-bleed photo background
          behind the text column, person positioned on the right.
          Unchanged from the existing desktop composition. */}
      <div className="absolute inset-0 hidden lg:block">
        <img
          src="/images/person-on-right.jpg"
          alt="Jose Rosario"
          className="h-full w-full object-cover object-[55%_20%] [image-rendering:auto]"
        />
        {/* Left-to-right scrim so the text column stays readable — the
            photo's own dark space on the left means this can stay light */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/4 to-bg/5" />
        {/* Top/bottom grounding so the navbar and next section both sit
            on solid dark, not mid-photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/0 via-transparent to-bg" />
      </div>

      {/* Faint technical grid texture — decorative only, kept extremely
          low-opacity so it never competes with the portrait or text */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      {/* Soft accent glow behind the name, echoing the photo's own
          red/maroon tone */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[480px] w-[480px] rounded-full bg-accent/10 blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-lg"
        >
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-ink leading-[1.08]"
          >
            Jose P. Rosario
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 font-mono text-accent text-lg"
          >
            Full-Stack Developer
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-md text-gray-250 text-base md:text-lg leading-relaxed"
          >
            I’m a driven Full-Stack Developer passionate about solving problems through
            practical digital solutions. I turn challenges into opportunities to learn, build, and grow.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <span
              className="group/cta inline-block w-fit
                [&>a]:transition-all [&>a]:duration-300 [&>a]:ease-out
                hover:[&>a]:-translate-y-1
                hover:[&>a]:shadow-[0_18px_40px_-14px_var(--color-accent)]
                motion-reduce:[&>a]:transition-none
                motion-reduce:hover:[&>a]:translate-y-0"
            >
              <Button as="a" href="#projects" variant="primary">
                <span className="inline-flex items-center gap-2">
                  View Projects
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 ease-out group-hover/cta:translate-x-1 motion-reduce:transition-none"
                  />
                </span>
              </Button>
            </span>

            <span
              className="inline-block w-fit
                [&>a]:transition-all [&>a]:duration-300 [&>a]:ease-out
                hover:[&>a]:-translate-y-0.5
                motion-reduce:[&>a]:transition-none
                motion-reduce:hover:[&>a]:translate-y-0"
            >
              <Button as="a" href="#contact" variant="secondary">
                Contact Me
              </Button>
            </span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-6 flex items-center gap-2 font-mono text-xs text-muted"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Open to Full-Stack Developer opportunities
          </motion.p>

          {/* Mobile + tablet only: dedicated centered portrait, using a
              separate image purpose-cropped so the person is centered and
              the face stays fully visible. Switches to the desktop photo
              at the lg breakpoint (1024px), so tablets/iPad also get this
              centered composition instead of the desktop right-side crop. */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: "easeOut", delay: shouldReduceMotion ? 0 : 0.3 }}
            className="mt-9 mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:hidden"
          >
            <div className="relative aspect-[5/5] w-full overflow-hidden rounded-2xl border border-border bg-bg shadow-[0_24px_50px_-18px_rgba(0,0,0,0.6)]">
              <img
                src="/images/centered-person.jpg"
                alt="Jose Rosario"
                className="h-full w-full object-cover object-center [image-rendering:auto]"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent/10" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}