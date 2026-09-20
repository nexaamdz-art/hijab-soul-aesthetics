import { Link } from "@tanstack/react-router";
import sidebarArt from "@/assets/vintage-sidebar-art.png";

const sidebarCategories = [
  { label: "روب حجاب", to: "/hijab-robe" },
  { label: "فساتين", to: "/dresses" },
  { label: "اسدالات", to: "/isdalat" },
  { label: "خمار", to: "/khimar" },
  { label: "عبايات", to: "/abayas" },
  { label: "حجابات", to: "/hijab-supplies" },
  { label: "إكسسوارات", to: "/accessories" },
  { label: "أحذية شرعية", to: "/shoes" },
  { label: "مقالات و نصائح", to: "/articles" },
] as const;

export function VintageSidebar({
  onNavigate,
  fillHeight = false,
}: {
  onNavigate?: () => void;
  fillHeight?: boolean;
}) {
  return (
    <div
      className={
        fillHeight
          ? "h-[100dvh] w-fit max-w-[92vw] overflow-x-hidden overflow-y-auto bg-paper"
          : "h-full w-full overflow-y-auto bg-paper"
      }
    >
      {/* the artwork itself — never cropped, never stretched */}
      <div className="relative h-full w-full">
        <img
          src={sidebarArt}
          alt="لوحة أقسام حجاب سول"
          className={
            fillHeight
              ? "block h-[100dvh] w-auto max-w-none select-none"
              : "block h-auto w-full select-none"
          }
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
