import { useState } from "react";
import { Search, Heart, User, ShoppingBag, Menu } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { HijabMark } from "@/components/HijabMark";

const navItems = [
  { label: "الرئيسيـة", to: "/" },
  { label: "الفساتين", to: "/dresses" },
  { label: "الإسدالات", to: "/isdal" },
  { label: "الخمار", to: "/khimar" },
  { label: "العبايات", to: "/abayas" },
  { label: "الإكسسوارات", to: "/accessories" },
  { label: "مستلزمات الحجاب", to: "/hijab-essentials" },
  { label: "أحذية شرعية", to: "/footwear" },
] as const;

export function SiteHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const [query, setQuery] = useState("");

  return (
    <header className="paper-dark w-full bg-header text-header-foreground">
      <div className="mx-auto flex w-full max-w-[1400px] items-start gap-4 px-4 pt-3 sm:px-6 lg:gap-8">
        {/* Brand */}
        <a href="#" className="flex min-w-0 shrink-0 items-start gap-2">
          <HijabMark className="h-14 w-12 shrink-0 text-header-foreground/85 sm:h-16 sm:w-14" />
          <span className="min-w-0 text-right">
            <span className="flex items-center gap-1">
              <span className="font-display text-2xl leading-none tracking-wide sm:text-3xl">
                Hijab Soul
              </span>
              <Heart className="h-3.5 w-3.5 shrink-0 fill-accent text-accent" strokeWidth={1.25} />
            </span>
            <span className="mt-1 hidden text-[11px] leading-5 text-header-muted sm:block">
              أكثر من مجرد ملابس ..
              <br />
              إنه أسلوب حياة <span className="text-burgundy">♡</span>
            </span>
          </span>
        </a>

        {/* Search */}
        <form
          onSubmit={(e) => e.preventDefault()}
          role="search"
          className="mt-2 hidden min-w-0 flex-1 justify-center md:flex"
        >
          <div className="torn-paper relative w-full max-w-[420px] bg-paper px-5 py-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن ما تحبين .."
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

        {/* Actions */}
        <div className="mr-auto mt-2 flex shrink-0 items-center gap-4 sm:gap-6">
          <button aria-label="المفضلة" className="transition-opacity hover:opacity-70">
            <Heart className="h-5 w-5" strokeWidth={1.25} />
          </button>
          <button aria-label="حسابي" className="transition-opacity hover:opacity-70">
            <User className="h-5 w-5" strokeWidth={1.25} />
          </button>
          <button aria-label="سلة التسوق" className="relative transition-opacity hover:opacity-70">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.25} />
            <span className="absolute -top-2 left-3 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-medium text-header">
              0
            </span>
          </button>
          <button
            aria-label="القائمة"
            onClick={() => setOpen((v) => !v)}
            className="transition-opacity hover:opacity-70 lg:hidden"
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.25} /> : <Menu className="h-5 w-5" strokeWidth={1.25} />}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <form
        onSubmit={(e) => e.preventDefault()}
        role="search"
        className="mx-auto w-full max-w-[1400px] px-4 pt-3 md:hidden"
      >
        <div className="torn-paper relative w-full bg-paper px-5 py-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن ما تحبين .."
            aria-label="ابحث"
            className="w-full bg-transparent pl-8 text-sm text-ink placeholder:text-ink/50 focus:outline-none"
          />
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/70" strokeWidth={1.5} />
        </div>
      </form>

      {/* Nav */}
      <nav aria-label="التصنيفات" className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <ul className="hidden items-center justify-center gap-7 pb-2 pt-1 lg:flex xl:gap-10">
          {navItems.map((item, i) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => setActive(i)}
                className={`block border-b pb-1 text-[13px] transition-colors ${
                  active === i
                    ? "border-accent text-accent"
                    : "border-transparent text-header-foreground hover:text-accent"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {open && (
          <ul className="flex flex-col gap-1 pb-4 pt-2 lg:hidden">
            {navItems.map((item, i) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => {
                    setActive(i);
                    setOpen(false);
                  }}
                  className={`block py-2 text-sm transition-colors ${
                    active === i ? "text-accent" : "text-header-foreground hover:text-accent"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
