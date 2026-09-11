import { Link } from "@tanstack/react-router";
import sidebarArt from "@/assets/vintage-sidebar-art.png";

export const sidebarCategories = [
  { label: "فساتين", to: "/dresses" },
  { label: "اسدالات", to: "/isdalat" },
  { label: "خمار", to: "/khimar" },
  { label: "عبايات", to: "/abayas" },
  { label: "مستلزمات الحجاب", to: "/hijab-supplies" },
  { label: "إكسسوارات", to: "/accessories" },
  { label: "أحذية شرعية", to: "/shoes" },
  { label: "مقالات و نصائح", to: "/articles" },
] as const;

export function VintageSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="h-full w-full overflow-y-auto bg-paper">
      {/* the artwork itself — never cropped, never stretched */}
      <div className="relative w-full">
        <img
          src={sidebarArt}
          alt="لوحة أقسام حجاب سول"
          className="block h-auto w-full select-none"
        />

        {/* invisible clickable zones sitting over the paper area of the artwork */}
        <nav
          aria-label="أقسام المتجر"
          className="absolute inset-x-0 top-[11%] flex flex-col items-end gap-[1.6%] pl-[26%] pr-[10%]"
        >
          {sidebarCategories.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              onClick={onNavigate}
              className="font-hand text-[clamp(1rem,2.2cqw,1.6rem)] leading-tight text-ink/90 transition-colors hover:text-burgundy"
              activeProps={{ className: "text-burgundy" }}
            >
              {c.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
