export default function SectionHeading({
  index,
  tag,
  title,
  description,
  showMeta = true,
}) {
  return (
    <div className="mb-10 md:mb-14">
      {showMeta && (
        <p className="font-mono text-xs text-accent mb-3">
          {"// "}
          {index} {tag}
        </p>
      )}

      <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-xl text-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}