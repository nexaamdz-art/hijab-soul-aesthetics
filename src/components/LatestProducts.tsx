const products = [
  { name: "فستان محتشم", price: "٤٥٠٠ دج" },
  { name: "إسدال أنيق", price: "٣٢٠٠ دج" },
  { name: "خمار كلاسيكي", price: "١٨٠٠ دج" },
  { name: "عباية مطرزة", price: "٦٥٠٠ دج" },
];

export function LatestProducts() {
  return (
    <section className="paper-cream px-4 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
            أحدث المنتجات
          </h2>
          <p className="mt-3 text-sm text-ink/60">
            وصل حديثًا .. قطع مختارة بعناية
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {products.map((p) => (
            <article
              key={p.name}
              className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-paper p-4"
            >
              <div className="aspect-[3/4] w-full rounded-xl bg-header/5" />
              <h3 className="font-serif text-sm text-ink">{p.name}</h3>
              <p className="text-xs text-ink/60">{p.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
