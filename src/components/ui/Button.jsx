const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-dark shadow-sm shadow-accent/20",
  secondary:
    "bg-transparent text-ink border border-border hover:border-ink/40 hover:bg-ink/[0.03]",
};

export default function Button({
  as: Tag = "a",
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium text-sm
        transition-all duration-200 ease-out active:scale-[0.98]
        ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
