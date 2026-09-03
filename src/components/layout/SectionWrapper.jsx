export default function SectionWrapper({ id, className = "", children }) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-5xl px-6">{children}</div>
    </section>
  );
}
