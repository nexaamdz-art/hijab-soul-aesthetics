import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Home, ShoppingBag, Grid, Tag, MessageCircle, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface MobileBottomNavProps {
  onOpenCategories: () => void;
}

export function MobileBottomNav({ onOpenCategories }: MobileBottomNavProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const { user, profile, isAdmin, openAuthModal } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  // Sync cart badge count from DOM header button counter
  useEffect(() => {
    const updateCount = () => {
      const badge = document.querySelector('button[aria-label="سلة التسوق"] span');
      if (badge && badge.textContent) {
        const val = parseInt(badge.textContent.trim(), 10);
        if (!isNaN(val)) {
          setCartCount(val);
        }
      }
    };

    updateCount();
    const interval = setInterval(updateCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 block lg:hidden">
      {/* Subtle backdrop shadow barrier */}
      <div className="pointer-events-none absolute -top-4 inset-x-0 h-4 bg-gradient-to-t from-black/20 to-transparent" />

      <nav
        dir="rtl"
        aria-label="شريط التنقل السفلي للهاتف"
        className="paper-dark flex items-center justify-around border-t border-[#3D2E24] bg-[#1F1712]/95 px-2 py-1.5 shadow-2xl backdrop-blur-md text-header-foreground select-none"
      >
        {/* 1. الرئيسية (Home) */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[56px] text-center transition-all ${
            isActive("/") && pathname === "/"
              ? "text-accent scale-105 font-bold"
              : "text-header-muted hover:text-white"
          }`}
        >
          <Home className="h-5 w-5" strokeWidth={isActive("/") && pathname === "/" ? 2 : 1.5} />
          <span className="text-[10px] leading-tight font-medium">الرئيسية</span>
        </Link>

        {/* 2. الأقسام (Categories Drawer) */}
        <button
          type="button"
          onClick={onOpenCategories}
          className="flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[56px] text-center text-header-muted hover:text-accent transition-all active:scale-95"
        >
          <Grid className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-[10px] leading-tight font-medium">الأقسام</span>
        </button>

        {/* 3. المتجر (Shop) */}
        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[56px] text-center transition-all ${
            isActive("/shop")
              ? "text-accent scale-105 font-bold"
              : "text-header-muted hover:text-white"
          }`}
        >
          <ShoppingBag className="h-5 w-5" strokeWidth={isActive("/shop") ? 2 : 1.5} />
          <span className="text-[10px] leading-tight font-medium">المتجر</span>
        </Link>

        {/* 4. تخفيضات (Sales) */}
        <Link
          to="/sales"
          className={`relative flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[56px] text-center transition-all ${
            isActive("/sales")
              ? "text-accent scale-105 font-bold"
              : "text-header-muted hover:text-white"
          }`}
        >
          <div className="relative">
            <Tag className="h-5 w-5 text-burgundy animate-pulse" strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-red-500" />
          </div>
          <span className="text-[10px] leading-tight font-medium text-amber-200">تخفيضات</span>
        </Link>

        {/* 5. واتساب للتواصـل (WhatsApp Contact) */}
        <a
          href="https://wa.me/213555000000"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل معنا عبر واتساب"
          className="flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[56px] text-center text-emerald-400 hover:text-emerald-300 transition-all active:scale-95"
        >
          <div className="relative flex items-center justify-center h-6 w-6 rounded-full bg-emerald-600/20 text-emerald-400">
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
          </div>
          <span className="text-[10px] leading-tight font-semibold">واتساب</span>
        </a>

        {/* 6. حسابي / دخول (Account) */}
        <button
          type="button"
          onClick={() => {
            if (!user) {
              openAuthModal("signin");
            } else {
              window.location.href = isAdmin ? "/admin" : "/shop";
            }
          }}
          className="flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[56px] text-center text-header-muted hover:text-accent transition-all active:scale-95"
        >
          <User className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-[10px] leading-tight font-medium truncate max-w-[50px]">
            {user ? profile?.firstName || "حسابي" : "دخول"}
          </span>
        </button>
      </nav>
    </div>
  );
}
