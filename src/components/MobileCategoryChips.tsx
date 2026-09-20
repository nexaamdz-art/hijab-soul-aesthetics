import { Link, useLocation } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

const CHIPS = [
  { label: "الكل", to: "/shop" },
  { label: "العبايات", to: "/abayas" },
  { label: "الفساتين", to: "/dresses" },
  { label: "الإسدالات", to: "/isdalat" },
  { label: "الخمار", to: "/khimar" },
  { label: "حجابات", to: "/hijab-supplies" },
  { label: "إكسسوارات", to: "/accessories" },
  { label: "أحذية", to: "/shoes" },
  { label: "تخفيضات", to: "/sales", badge: "جديد" },
] as const;

export function MobileCategoryChips() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-full bg-[#241B15] border-b border-[#3A2D23] py-2 px-3 lg:hidden overflow-x-auto scrollbar-none shadow-inner">
      <div className="flex items-center gap-2 min-w-max px-1" dir="rtl">
        {CHIPS.map((chip) => {
          const isActive =
            chip.to === "/shop"
              ? currentPath === "/shop" || currentPath === "/"
              : currentPath.startsWith(chip.to);

          return (
            <Link
              key={chip.to}
              to={chip.to}
              className={`relative flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap select-none active:scale-95 ${
                isActive
                  ? "bg-[#FAF6F0] text-[#2B2119] shadow-md ring-1 ring-[#D5C2AA] font-bold"
                  : "bg-[#2F231B] text-[#D0C0AF] hover:bg-[#3D2F24] hover:text-white"
              }`}
            >
              {chip.badge && (
                <span className="flex items-center gap-0.5 px-1 py-0.2 rounded-full bg-red-700 text-[9px] font-extrabold text-white leading-none">
                  <Sparkles className="h-2.5 w-2.5" />
                  {chip.badge}
                </span>
              )}
              <span>{chip.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
