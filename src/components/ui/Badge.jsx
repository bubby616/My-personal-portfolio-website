export default function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-border bg-surface
        px-2.5 py-1 text-xs font-mono text-muted ${className}`}
    >
      {children}
    </span>
  );
}
