import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Crown, Heart } from "lucide-react";

/**
 * Single source of truth for Latest Products data.
 * All 8 products as explicitly requested with prices in Algerian Dinar (دج).
 */
export interface ProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
  href: string;
}

export const LATEST_PRODUCTS_DATA: ProductItem[] = [
  {
    id: "product-1",
    name: "عباءة سوداء مطرزة",
    price: 4500,
    image: "/images/products/product-1.jpg",
    href: "/abayas",
  },
  {
    id: "product-2",
    name: "فستان بتفاصيل أنيقة",
    price: 3800,
    image: "/images/products/product-2.jpg",
    href: "/dresses",
  },
  {
    id: "product-3",
    name: "خمار صيفي خفيف",
    price: 2200,
    image: "/images/products/product-3.jpg",
    href: "/khimar",
  },
  {
    id: "product-4",
    name: "فستان سادة بأكمام واسعة",
    price: 3400,
    image: "/images/products/product-4.jpg",
    href: "/dresses",
  },
  {
    id: "product-5",
    name: "إسدال يومي عملي",
    price: 3000,
    image: "/images/products/product-5.jpg",
    href: "/isdalat",
  },
  {
    id: "product-6",
    name: "حجاب شيفون فاخر",
    price: 1200,
    image: "/images/products/product-6.jpg",
    href: "/hijab-supplies",
  },
  {
    id: "product-7",
    name: "طقم إكسسوارات",
    price: 1500,
    image: "/images/products/product-7.jpg",
    href: "/accessories",
  },
  {
    id: "product-8",
    name: "عباءة بتطريز ذهبي",
    price: 5200,
    image: "/images/products/product-8.jpg",
    href: "/abayas",
  },
];

/**
 * Formats price in Algerian Dinar with thousands separator followed by "دج".
 * e.g. 4500 -> "4,500 دج"
 */
function formatDZD(amount: number): string {
  return `${amount.toLocaleString("en-US")} دج`;
}

/**
 * Seeded pseudo-random number generator (mulberry32).
 */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generates a smooth, flowing hand-torn paper clip-path polygon.
 * Low amplitude smooth noise ensures clean deckled edges with no extreme spikes.
 */
function generateSmoothTornPolygon(
  seed: number,
  pointsCount: number = 240,
  amplitude: number = 0.55,
  wavelength: number = 11,
): string {
  const rng = mulberry32(seed);

  const w1 = {
    freq: 100 / (wavelength * (0.85 + rng() * 0.3)),
    phase: rng() * Math.PI * 2,
    weight: 0.55,
  };
  const w2 = {
    freq: 100 / (wavelength * (0.55 + rng() * 0.3)),
    phase: rng() * Math.PI * 2,
    weight: 0.3,
  };
  const w3 = {
    freq: 100 / (wavelength * (1.3 + rng() * 0.4)),
    phase: rng() * Math.PI * 2,
    weight: 0.15,
  };

  function getNoise(pos: number, edgeSeed: number) {
    const angle = (pos / 100) * 2 * Math.PI;
    const val =
      w1.weight * Math.sin(angle * w1.freq + w1.phase + edgeSeed * 1.5) +
      w2.weight * Math.sin(angle * w2.freq + w2.phase + edgeSeed * 2.3) +
      w3.weight * Math.sin(angle * w3.freq + w3.phase + edgeSeed * 3.1);
    return val * amplitude;
  }

  const pts: string[] = [];
  const ptsPerSide = Math.floor(pointsCount / 4);

  // Top edge
  for (let i = 0; i < ptsPerSide; i++) {
    const t = i / (ptsPerSide - 1);
    const x = t * 100;
    const y = Math.max(0.05, 0.75 + getNoise(x, 1));
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }

  // Right edge
  for (let i = 0; i < ptsPerSide; i++) {
    const t = i / (ptsPerSide - 1);
    const y = t * 100;
    const x = Math.min(99.95, 100 - (0.75 + getNoise(y, 2)));
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }

  // Bottom edge
  for (let i = 0; i < ptsPerSide; i++) {
    const t = i / (ptsPerSide - 1);
    const x = 100 - t * 100;
    const y = Math.min(99.95, 100 - (0.75 + getNoise(x, 3)));
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }

  // Left edge
  for (let i = 0; i < ptsPerSide; i++) {
    const t = i / (ptsPerSide - 1);
    const y = 100 - t * 100;
    const x = Math.max(0.05, 0.75 + getNoise(y, 4));
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }

  return `polygon(${pts.join(", ")})`;
}

// Deterministic unique seeds for title, cards, and buttons
const TITLE_SEED = 10333;
const TITLE_POLYGON = generateSmoothTornPolygon(TITLE_SEED, 120, 0.7, 10);

const CARD_SEEDS = [1409, 2521, 3637, 4751, 5867, 6983, 8101, 9221];
const CARD_POLYGONS = CARD_SEEDS.map((s) => generateSmoothTornPolygon(s, 220, 0.5, 12));

const BTN_SEEDS = [11443, 12557, 13669, 14783, 15897, 17011, 18123, 19237];
const BTN_POLYGONS = BTN_SEEDS.map((s) => generateSmoothTornPolygon(s, 100, 0.65, 9));

export function LatestProductsSection() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAddToCart = (product: ProductItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Increment header cart badge count
    const badge = document.querySelector('button[aria-label="سلة التسوق"] span');
    let currentCount = 0;
    if (badge && badge.textContent) {
      const parsed = parseInt(badge.textContent.trim(), 10);
      if (!isNaN(parsed)) {
        currentCount = parsed;
      }
    }
    const nextCount = currentCount + 1;
    if (badge) {
      badge.textContent = String(nextCount);
      badge.classList.add("scale-125");
      setTimeout(() => badge.classList.remove("scale-125"), 200);
    }

    // Temporary tactile feedback on button
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId((prev) => (prev === product.id ? null : prev));
    }, 1200);
  };

  return (
    <section
      id="latest-products-section"
      aria-label="أحدث المنتجات"
      className="relative w-full max-w-full overflow-x-hidden mt-[28px] mb-[32px]"
      style={
        {
          "--product-card-w": "clamp(150px, 46vw, 190px)",
          "--product-gap": "14px",
        } as React.CSSProperties
      }
    >
      {/* SECTION TITLE: Aligned to RTL start (right side) with black brush-stroke paper label and Crown icon */}
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 mb-4 sm:mb-5">
        <div className="flex items-center justify-start">
          <div
            className="inline-flex items-center gap-2.5 px-4.5 sm:px-6 py-2 sm:py-2.5 select-none transition-transform duration-200 hover:scale-[1.01]"
            style={{
              clipPath: TITLE_POLYGON,
              WebkitClipPath: TITLE_POLYGON,
              backgroundColor: "#211915",
              backgroundImage:
                "linear-gradient(180deg, #2C221C 0%, #1F1713 50%, #150F0D 100%), radial-gradient(circle at 30% 30%, rgba(255,255,255,0.04) 0 1px, transparent 1px)",
              backgroundSize: "100% 100%, 8px 8px",
              filter:
                "drop-shadow(0 4px 10px rgba(33, 25, 21, 0.28)) drop-shadow(0 1px 3px rgba(33, 25, 21, 0.18))",
              WebkitFilter:
                "drop-shadow(0 4px 10px rgba(33, 25, 21, 0.28)) drop-shadow(0 1px 3px rgba(33, 25, 21, 0.18))",
            }}
          >
            <Crown
              className="h-4 w-4 sm:h-5 sm:w-5 text-[#FAF6F0] shrink-0"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <h2 className="text-[15px] sm:text-[17px] md:text-lg font-extrabold text-[#FAF6F0] tracking-wide leading-none pt-0.5">
              أحدث المنتجات
            </h2>
          </div>
        </div>
      </div>

      {/*
        PRODUCT CARDS CONTAINER
        - Mobile (< 640px): Horizontal swipeable row, card width ~46vw (min 150px, max 190px), gap 14px, scroll-snap-x mandatory, hidden scrollbar.
        - Tablet (640-1024px): Cards ~200px wide, smooth snap scroll.
        - Desktop (1024px+): 4 cards per row in centered grid (max-width 1100px), 8 cards total.
      */}
      <div className="w-full">
        <div
          dir="rtl"
          className="no-scrollbar snap-carousel flex w-full items-stretch overflow-x-auto scroll-smooth snap-x snap-mandatory overscroll-x-contain touch-pan-x px-4 sm:px-6 md:px-8 lg:grid lg:grid-cols-4 lg:overflow-visible lg:snap-none lg:max-w-[1100px] lg:mx-auto lg:px-4"
          style={{
            gap: "var(--product-gap, 14px)",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {LATEST_PRODUCTS_DATA.map((product, index) => {
            const cardPolygon = CARD_POLYGONS[index % CARD_POLYGONS.length];
            const btnPolygon = BTN_POLYGONS[index % BTN_POLYGONS.length];
            const isFavorite = favorites.has(product.id);
            const isAdded = addedProductId === product.id;

            return (
              <div
                key={product.id}
                className="group snap-item relative flex-none snap-start lg:w-full lg:max-w-none lg:min-w-0 transition-transform duration-300 motion-reduce:transition-none"
                style={{
                  width: "var(--product-card-w)",
                }}
              >
                {/* Unclipped outer wrapper holding natural paper drop shadow */}
                <div
                  className="relative w-full h-full transition-[transform,filter] duration-300 ease-out group-hover:-translate-y-1.5 motion-reduce:transform-none"
                  style={{
                    filter:
                      "drop-shadow(0 7px 14px rgba(44, 34, 30, 0.12)) drop-shadow(0 2px 4px rgba(44, 34, 30, 0.08))",
                    WebkitFilter:
                      "drop-shadow(0 7px 14px rgba(44, 34, 30, 0.12)) drop-shadow(0 2px 4px rgba(44, 34, 30, 0.08))",
                  }}
                >
                  {/* Card Body: Cream Paper (#F1E6D0) with smooth flowing torn deckled edges */}
                  <div
                    className="relative w-full h-full flex flex-col p-2 sm:p-2.5 md:p-3 select-none"
                    style={{
                      clipPath: cardPolygon,
                      WebkitClipPath: cardPolygon,
                      backgroundColor: "#F1E6D0",
                      backgroundImage:
                        "linear-gradient(180deg, #F5ECE0 0%, #F1E6D0 60%, #E9DAC1 100%), radial-gradient(circle at 35% 25%, rgba(60, 45, 30, 0.035) 0 1px, transparent 1px)",
                      backgroundSize: "100% 100%, 7px 7px",
                    }}
                  >
                    {/* 1. Product Photo Container with Gently Rounded Corners & Aspect Ratio 3/4 */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[8px] bg-[#E7D9C6]">
                      <Link
                        to={product.href}
                        aria-label={product.name}
                        className="block w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B2119] rounded-[8px]"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none rounded-[8px]"
                        />
                      </Link>

                      {/* Small Heart Favorite Button in top-left corner */}
                      <button
                        type="button"
                        aria-label={
                          isFavorite
                            ? `إزالة ${product.name} من المفضلة`
                            : `إضافة ${product.name} للمفضلة`
                        }
                        aria-pressed={isFavorite}
                        onClick={(e) => toggleFavorite(product.id, e)}
                        className="absolute top-2 left-2 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#FAF5EE]/85 backdrop-blur-xs text-[#2B2119] shadow-sm transition-all duration-200 hover:bg-[#FAF5EE] hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B2119]"
                      >
                        <Heart
                          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors duration-200 ${
                            isFavorite
                              ? "fill-[#8C2A3E] text-[#8C2A3E]"
                              : "text-[#2B2119]/75 hover:text-[#8C2A3E]"
                          }`}
                          strokeWidth={1.8}
                        />
                      </button>
                    </div>

                    {/* 2. Product Name in Arabic, Centered, Bold, Dark Brown */}
                    <Link
                      to={product.href}
                      className="mt-2.5 sm:mt-3 block text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2B2119] rounded-sm"
                    >
                      <h3 className="text-[13px] sm:text-[14px] md:text-[15px] font-bold text-[#2B2119] leading-snug line-clamp-1 transition-colors duration-200 group-hover:text-[#634835]">
                        {product.name}
                      </h3>
                    </Link>

                    {/* 3. Price, Centered, in Algerian Dinar (e.g. "4,500 دج") */}
                    <div className="mt-1 mb-2.5 sm:mb-3 text-center">
                      <span className="text-[13px] sm:text-[14px] md:text-[15px] font-extrabold text-[#2B2119] tracking-tight">
                        {formatDZD(product.price)}
                      </span>
                    </div>

                    {/* 4. Add To Cart Button: Dark (#2B2119), White Text, Brush-like Edges, Min-h 40px */}
                    <div className="mt-auto w-full pt-1">
                      <button
                        type="button"
                        aria-label={`أضف ${product.name} إلى السلة`}
                        onClick={(e) => handleAddToCart(product, e)}
                        className="relative w-full min-h-[40px] flex items-center justify-center px-3 py-2 text-center text-white font-bold text-xs sm:text-[13px] select-none transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B2119] focus-visible:ring-offset-2"
                        style={{
                          clipPath: btnPolygon,
                          WebkitClipPath: btnPolygon,
                          backgroundColor: "#2B2119",
                          backgroundImage:
                            "linear-gradient(180deg, #382B21 0%, #2B2119 55%, #201712 100%), radial-gradient(circle at 20% 30%, rgba(255,255,255,0.035) 0 1px, transparent 1px)",
                          backgroundSize: "100% 100%, 7px 7px",
                          boxShadow: "0 2px 4px rgba(35, 25, 18, 0.2)",
                        }}
                      >
                        <span className="whitespace-nowrap transition-transform duration-150">
                          {isAdded ? "تمت الإضافة ✓" : "أضف إلى السلة"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
