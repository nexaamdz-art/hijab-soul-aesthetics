import { useState } from "react";
import { Search, Heart, User, ShoppingBag, Menu } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logoMark from "@/assets/hijab-soul-mark.png";

const navItems = [
  { label: "الرئيسيـة", to: "/" },
  { label: "الفساتين", to: "/dresses" },
  { label: "الإسدالات", to: "/isdalat" },
  { label: "الخمار", to: "/khimar" },
  { label: "العبايات", to: "/abayas" },
  { label: "الإكسسوارات", to: "/accessories" },
  { label: "مستلزمات الحجاب", to: "/hijab-supplies" },
  { label: "تخفيضات", to: "/sales" },
] as const;

export function SiteHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const [query, setQuery] = useState("");

  return (
    <header className="paper-dark w-full bg-header text-header-foreground">
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-4 px-4 pt-2 sm:px-6 lg:gap-8">
        {/* Actions (right in RTL) */}
        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <button
            aria-label="القائمة"
            onClick={onMenuClick}
            className="transition-opacity hover:opacity-70 lg:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.25} />
          </button>
          <button aria-label="المفضلة" className="transition-opacity hover:opacity-70">
            <Heart className="h-5 w-5" strokeWidth={1.25} />
          </button>
          <button aria-label="حسابي" className="hidden transition-opacity hover:opacity-70 sm:block">
            <User className="h-5 w-5" strokeWidth={1.25} />
          </button>
          <button aria-label="سلة التسوق" className="relative transition-opacity hover:opacity-70">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.25} />
            <span className="absolute -top-2 left-3 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-medium text-header">
              0
            </span>
          </button>
        </div>

        {/* Search (center) */}
        <form
          onSubmit={(e) => e.preventDefault()}
          role="search"
          className="hidden min-w-0 flex-1 justify-center md:flex"
        >
          <div className="torn-paper relative w-full max-w-[420px] bg-paper px-5 py-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="إبحث عن ما تحبين .."
              aria-label="ابحث"
              className="w-full bg-transparent pl-8 text-sm text-ink placeholder:text-ink/50 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="بحث"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/70 transition-opacity hover:opacity-70"
            >
              <Search className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </form>

        {/* Brand (left in RTL) */}
        <Link to="/" className="mr-auto flex min-w-0 shrink-0 items-center gap-2 md:mr-0">
          <span className="min-w-0 text-left">
            <span dir="ltr" className="flex items-center gap-1">
              <span className="font-display text-2xl leading-none tracking-wide sm:text-3xl">
                Hijab Soul
              </span>
              <Heart className="h-3.5 w-3.5 shrink-0 fill-accent text-accent" strokeWidth={1.25} />
            </span>

            <span className="mt-1 hidden text-right text-[11px] leading-5 text-header-muted sm:block">
              أكثر من مجرد ملابس ..
              <br />
              إنه أسلوب حياة <span className="text-burgundy">♡</span>
            </span>
          </span>
          <img
            src={logoMark}
            alt="حجاب سول"
            className="h-14 w-auto shrink-0 select-none sm:h-16"
          />
        </Link>
      </div>

      {/* Mobile search */}
      <form
        onSubmit={(e) => e.preventDefault()}
        role="search"
        className="mx-auto w-full max-w-[1400px] px-4 pt-2 md:hidden"
      >
        <div className="torn-paper relative w-full bg-paper px-5 py-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="إبحث عن ما تحبين .."
            aria-label="ابحث"
            className="w-full bg-transparent pl-8 text-sm text-ink placeholder:text-ink/50 focus:outline-none"
          />
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/70" strokeWidth={1.5} />
        </div>
      </form>

      {/* Desktop nav (RTL, starts from the right) */}
      <nav aria-label="التصنيفات" className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <ul className="hidden items-center justify-start gap-7 pb-2 pt-1 lg:flex xl:gap-10">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className="block border-b border-transparent pb-1 text-[13px] text-header-foreground transition-colors hover:text-accent"
                activeProps={{ className: "border-accent text-accent" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
