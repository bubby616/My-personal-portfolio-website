import SectionWrapper from "../components/layout/SectionWrapper";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/shared/ScrollReveal";
import { skillCategories } from "../data/skills";
import { skillIcons } from "../data/skillIcons";

function byLabel(label) {
  return skillCategories.find((c) => c.label === label);
}

function Chip({ item }) {
  const iconSrc = skillIcons?.[item];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-bg/30 px-2.5 py-1 text-xs sm:text-[13px] text-ink/85 transition-colors duration-150 ease-out hover:-translate-y-px hover:border-accent/50 hover:text-ink motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {iconSrc && (
        <img
          src={iconSrc}
          alt=""
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 object-contain"
        />
      )}
      {item}
    </span>
  );
}

function Group({ cat, className = "" }) {
  if (!cat) return null;
  return (
    <div
      className={`rounded-lg border border-border/70 bg-surface px-4 py-3.5 sm:px-5 sm:py-4 ${className}`}
    >
      <h3 className="mb-2.5 border-b border-border/50 pb-2 font-mono text-xs sm:text-[13px] text-ink/90">
        {cat.label}
      </h3>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {cat.items.map((item) => (
          <Chip key={item} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const languages = byLabel("Languages");
  const frameworks = byLabel("Frameworks");
  const databases = byLabel("Databases");
  const mobile = byLabel("Mobile");
  const cms = byLabel("CMS");
  const tools = byLabel("Tools");

  const KNOWN = new Set(["Languages", "Frameworks", "Databases", "Mobile", "CMS", "Tools"]);
  const extras = skillCategories.filter((c) => !KNOWN.has(c.label));

  return (
    <SectionWrapper id="skills" className="bg-surface/50">
      <ScrollReveal>
        <SectionHeading
          title="Skills & Tech Stack"
          description="Technologies I use across the stack, from database to interface."
          showMeta={false}
        />
      </ScrollReveal>

      <div className="space-y-3 sm:space-y-4">
        {/* Row 1 — Languages / Frameworks, equal-weight main row.
            items-start keeps each box sized to its own content instead
            of stretching the shorter one to match the taller. */}
        {(languages || frameworks) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-3 sm:gap-4">
            {languages && (
              <ScrollReveal>
                <Group cat={languages} />
              </ScrollReveal>
            )}
            {frameworks && (
              <ScrollReveal delay={0.05}>
                <Group cat={frameworks} />
              </ScrollReveal>
            )}
          </div>
        )}

        {/* Row 2 — Databases wider, Mobile / CMS compact beside it.
            Tablet reflows to Databases full width + Mobile/CMS paired
            below, instead of squeezing three columns into one row. */}
        {(databases || mobile || cms) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-3 sm:gap-4">
            {databases && (
              <ScrollReveal className="md:col-span-2 lg:col-span-2">
                <Group cat={databases} />
              </ScrollReveal>
            )}
            {mobile && (
              <ScrollReveal delay={0.05}>
                <Group cat={mobile} />
              </ScrollReveal>
            )}
            {cms && (
              <ScrollReveal delay={0.1}>
                <Group cat={cms} />
              </ScrollReveal>
            )}
          </div>
        )}

        {/* Row 3 — Tools, full width */}
        {tools && (
          <ScrollReveal delay={0.1}>
            <Group cat={tools} />
          </ScrollReveal>
        )}

        {extras.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-3 sm:gap-4">
            {extras.map((cat, i) => (
              <ScrollReveal key={cat.label} delay={0.15 + i * 0.05}>
                <Group cat={cat} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}