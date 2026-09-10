import { Link } from "@tanstack/react-router";
import sidebarArt from "@/assets/vintage-sidebar.png.asset.json";

export const sidebarCategories = [
  { label: "فساتين", to: "/dresses" },
  { label: "اسدالات", to: "/isdal" },
  { label: "خمار", to: "/khimar" },
  { label: "عبايات", to: "/abayas" },
  { label: "مستلزمات الحجاب", to: "/hijab-essentials" },
  { label: "إكسسوارات", to: "/accessories" },
  { label: "أحذية شرعية", to: "/footwear" },
  { label: "مقالات و نصائح", to: "/articles" },
] as const;

export function VintageSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div
      className="relative h-full w-full overflow-y-auto bg-paper"
      style={{
        backgroundImage: `url(${sidebarArt.url})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* keeps the artwork proportions while allowing scroll */}
      <div className="pointer-events-none aspect-[826/1780] w-full" />

      <nav
        aria-label="أقسام المتجر"
        className="absolute inset-x-0 top-0 flex flex-col items-center gap-3 px-6 pt-16 sm:pt-20"
      >
        {sidebarCategories.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            onClick={onNavigate}
            className="font-hand text-xl leading-none text-ink/90 transition-colors hover:text-burgundy sm:text-2xl"
            activeProps={{ className: "text-burgundy" }}
          >
            {c.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
