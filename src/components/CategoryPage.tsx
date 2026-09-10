export function CategoryPage({ title }: { title: string }) {
  return (
    <section className="px-6 py-16">
      <h1 className="font-hand text-3xl text-ink sm:text-4xl">{title}</h1>
      <p className="mt-4 text-sm text-ink/60">قريباً .. نُحضّر لكِ تشكيلة مميزة</p>
    </section>
  );
}
