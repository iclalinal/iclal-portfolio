export default function Section({
  id, title, children,
}: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-[1200px] px-5 py-24 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">{title}</h2>
      {children}
    </section>
  );
}
