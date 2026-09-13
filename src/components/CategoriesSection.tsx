import { Link } from "@tanstack/react-router";

const categories = [
  { label: "فساتين", to: "/dresses", img: "" },
  { label: "إسدالات", to: "/isdalat", img: "" },
  { label: "خمار", to: "/khimar", img: "" },
  { label: "عبايات", to: "/abayas", img: "" },
  { label: "مستلزمات الحجاب", to: "/hijab-supplies", img: "" },
  { label: "إكسسوارات", to: "/accessories", img: "" },
];

export function CategoriesSection() {
  return (
    <section className="paper-cream px-4 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
            تسوّقي حسب الفئة
          </h2>
          <p className="mt-3 text-sm text-ink/60">
            اختاري من تشكيلتنا الأنيقة
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.to}
              to={cat.to}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-ink/10 bg-paper px-3 py-6 text-center transition-shadow hover:shadow-md"
            >
              <div className="grid h-20 w-20 place-items-center rounded-full bg-header/5 text-header">
                <span className="font-serif text-2xl text-ink/70 group-hover:text-ink">
                  {cat.label.charAt(0)}
                </span>
              </div>
              <span className="font-serif text-sm text-ink">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
