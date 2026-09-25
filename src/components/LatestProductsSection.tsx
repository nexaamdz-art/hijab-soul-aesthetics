import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Crown, Heart } from "lucide-react";
import { useStoreData, getProductFallbackImage } from "@/lib/store-data";

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

const LATEST_PRODUCTS_DATA: ProductItem[] = [
  {
    id: "product-1",
    name: "عباءة سوداء مطرزة",
    price: 4500,
    image: "/images/uploads/black_floral_embroidered_abaya_1789830101193.jpg",
    href: "/abayas",
  },
  {
    id: "product-2",
    name: "عباية استقبال عاجية راقية",
    price: 3800,
    image: "/images/uploads/ivory_watercolor_floral_abaya_1789830182632.jpg",
    href: "/abayas",
  },
  {
    id: "product-3",
    name: "خمار شيفون ولؤلؤ فاخر",
    price: 2200,
    image: "/images/uploads/hijab_pearl_beaded_shawls_1789831343828.jpg",
    href: "/khimar",
  },
  {
    id: "product-4",
    name: "كاب شوكولاتة فخم",
    price: 3400,
    image: "/images/uploads/chocolate_brown_cape_abaya_1789830195176.jpg",
    href: "/dresses",
  },
  {
    id: "product-5",
    name: "إسدال صلاة سماوي وأبيض",
    price: 3000,
    image: "/images/uploads/isdal_pastel_blue_white_1789832048044.jpg",
    href: "/isdalat",
  },
  {
    id: "product-6",
    name: "حجاب شيفون أسود حريري",
    price: 1200,
    image: "/images/uploads/hijab_black_silk_chiffon_1789831330976.jpg",
    href: "/hijab-supplies",
  },
  {
    id: "product-7",
    name: "حقيبة يد عاجية AKIKI",
    price: 4800,
    image: "/images/uploads/akiki_cream_handbag_1789829330238.jpg",
    href: "/accessories",
  },
  {
    id: "product-8",
    name: "عباءة عنابي بتطريز فضي",
    price: 5200,
    image: "/images/uploads/burgundy_silver_embroidery_abaya_1789830112029.jpg",
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

// Deterministic unique seeds for cards and buttons
const CARD_SEEDS = [1409, 2521, 3637, 4751, 5867, 6983, 8101, 9221];
const CARD_POLYGONS = CARD_SEEDS.map((s) => generateSmoothTornPolygon(s, 220, 0.5, 12));

const BTN_SEEDS = [11443, 12557, 13669, 14783, 15897, 17011, 18123, 19237];
const BTN_POLYGONS = BTN_SEEDS.map((s) => generateSmoothTornPolygon(s, 100, 0.65, 9));

export function LatestProductsSection() {
  const { products: storeProducts } = useStoreData();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const displayProducts =
    storeProducts && storeProducts.length > 0 ? storeProducts : LATEST_PRODUCTS_DATA;

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
      className="relative w-full max-w-full overflow-x-hidden mt-[20px] sm:mt-[28px] mb-[24px] sm:mb-[32px]"
    >
      {/* SECTION TITLE: Aligned to RTL start (right side) with black brush-stroke background, small white crown on the right, and bold white text */}
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 mb-4 sm:mb-5">
        <div className="flex items-center justify-start">
          <div
            dir="rtl"
            className="relative inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 select-none transition-transform duration-200 hover:scale-[1.01]"
            style={{
              filter:
                "drop-shadow(0 4px 12px rgba(22, 16, 13, 0.32)) drop-shadow(0 1px 3px rgba(22, 16, 13, 0.2))",
              WebkitFilter:
                "drop-shadow(0 4px 12px rgba(22, 16, 13, 0.32)) drop-shadow(0 1px 3px rgba(22, 16, 13, 0.2))",
            }}
          >
            {/* Dark Brush Stroke SVG Background */}
            <svg
              viewBox="0 0 360 64"
              fill="none"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none -z-0"
              aria-hidden="true"
            >
              <defs>
                <filter id="brushInkTexture" x="-10%" y="-20%" width="120%" height="140%">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.045 0.08"
                    numOctaves="3"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="3"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
                <linearGradient id="brushGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#140F0C" stopOpacity="0.88" />
                  <stop offset="8%" stopColor="#1C1512" />
                  <stop offset="20%" stopColor="#110C0A" />
                  <stop offset="50%" stopColor="#18120F" />
                  <stop offset="80%" stopColor="#110C0A" />
                  <stop offset="92%" stopColor="#1C1512" />
                  <stop offset="100%" stopColor="#140F0C" stopOpacity="0.88" />
                </linearGradient>
              </defs>

              <g filter="url(#brushInkTexture)">
                {/* Outer rough bleed boundary */}
                <path
                  d="M 22,26 C 16,18 28,14 48,11 C 72,8 102,10 138,8 C 176,6 216,8 254,7 C 286,6 314,9 332,15 C 342,18 350,23 354,28 C 352,32 346,34 340,33 C 348,37 350,42 344,45 C 334,50 316,52 294,54 C 260,56 220,53 178,55 C 136,56 94,53 58,52 C 34,51 18,47 10,42 C 6,38 8,34 12,31 C 8,30 10,27 16,28 C 12,27 16,25 22,26 Z"
                  fill="#231B17"
                  opacity="0.75"
                />

                {/* Main thick core brush stroke body */}
                <path
                  d="M 26,29 C 22,21 34,16 54,13 C 78,10 108,12 144,9 C 182,7 222,9 260,8 C 290,7 316,11 334,16 C 344,19 350,24 348,30 C 346,34 338,36 332,35 C 340,39 342,43 336,46 C 326,50 310,52 288,54 C 254,56 216,53 174,55 C 134,56 94,53 60,52 C 38,51 22,48 16,43 C 12,39 14,35 18,33 C 14,32 16,29 22,30 C 18,29 20,28 26,29 Z"
                  fill="url(#brushGrad)"
                />

                {/* Heavy core black ink pigment deposit */}
                <path
                  d="M 38,28 C 36,22 48,18 68,16 C 94,14 124,15 158,13 C 196,12 234,13 268,13 C 294,13 316,16 328,21 C 334,24 336,28 332,32 C 328,34 322,35 316,35 C 322,38 322,42 318,44 C 310,47 296,49 276,50 C 246,52 210,50 172,51 C 136,52 100,50 72,49 C 52,48 40,45 34,41 C 30,37 32,34 36,32 C 32,31 34,29 38,28 Z"
                  fill="#100B09"
                />

                {/* Left dry-brush bristles */}
                <path d="M 4,33 C 12,31 22,32 32,34 C 20,35 10,35 4,33 Z" fill="#1A1310" />
                <path d="M 8,26 C 16,24 28,25 38,27 C 26,28 14,28 8,26 Z" fill="#191310" />
                <path d="M 10,40 C 18,39 30,40 42,42 C 28,43 16,43 10,40 Z" fill="#1C1512" />
                <path
                  d="M 16,19 C 26,17 40,18 52,20 C 38,21 24,21 16,19 Z"
                  fill="#201713"
                  opacity="0.85"
                />
                <path
                  d="M 14,46 C 26,46 42,47 56,48 C 42,49 26,49 14,46 Z"
                  fill="#1F1713"
                  opacity="0.85"
                />
                <path d="M 2,36 C 8,36 16,36 24,37 C 16,38 8,38 2,36 Z" fill="#140F0C" />

                {/* Right dry-brush bristles */}
                <path d="M 326,20 C 336,22 346,25 356,28 C 346,27 336,24 326,20 Z" fill="#1A1310" />
                <path d="M 330,30 C 340,31 348,33 358,36 C 348,35 338,33 330,30 Z" fill="#191310" />
                <path d="M 324,40 C 334,42 344,45 352,48 C 342,46 332,43 324,40 Z" fill="#1C1512" />
                <path
                  d="M 312,14 C 324,16 336,19 346,23 C 334,20 322,17 312,14 Z"
                  fill="#201713"
                  opacity="0.85"
                />
                <path
                  d="M 316,50 C 328,51 338,52 346,53 C 336,53 326,52 316,50 Z"
                  fill="#1F1713"
                  opacity="0.85"
                />
                <path d="M 334,34 C 342,35 350,36 358,37 C 350,37 342,36 334,34 Z" fill="#140F0C" />

                {/* Dry brush voids / paper grain hints */}
                <path
                  d="M 65,22 C 110,20 170,21 230,20 C 270,19 295,21 310,23 C 295,22 270,21 230,22 C 170,22 110,22 65,22 Z"
                  fill="#2E241F"
                  opacity="0.35"
                />
                <path
                  d="M 50,43 C 95,44 155,43 215,44 C 260,44 290,43 305,42 C 290,42 260,43 215,42 C 155,42 95,42 50,43 Z"
                  fill="#2E241F"
                  opacity="0.35"
                />

                {/* Ink splatter droplets */}
                <circle cx="8" cy="21" r="1.2" fill="#1A1310" />
                <circle cx="12" cy="49" r="1.4" fill="#17110E" />
                <circle cx="352" cy="18" r="1.2" fill="#1A1310" />
                <circle cx="354" cy="46" r="1.3" fill="#17110E" />
                <circle cx="357" cy="32" r="0.9" fill="#150F0D" />
                <circle cx="3" cy="31" r="0.8" fill="#150F0D" />
              </g>
            </svg>

            {/* Content: Small White Crown on the Right (RTL start), Pure White Title Text */}
            <div className="relative z-10 flex items-center gap-2 sm:gap-2.5">
              <Crown
                className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-white shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                strokeWidth={2}
                aria-hidden="true"
              />
              <h2 className="text-[15px] sm:text-[17px] md:text-lg font-extrabold text-white tracking-wide leading-none pt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                أحدث المنتجات
              </h2>
            </div>
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
          {displayProducts.map((product, index) => {
            const cardPolygon = CARD_POLYGONS[index % CARD_POLYGONS.length];
            const btnPolygon = BTN_POLYGONS[index % BTN_POLYGONS.length];
            const isFavorite = favorites.has(product.id);
            const isAdded = addedProductId === product.id;

            return (
              <div
                key={`${product.id}-${index}`}
                className="group snap-item relative flex-none snap-start lg:w-full lg:max-w-none lg:min-w-0 transition-transform duration-300 motion-reduce:transition-none"
                style={{
                  width: "var(--product-card-w)",
                }}
              >
                {/* Unclipped outer wrapper holding natural paper drop shadow & hover zoom animation */}
                <div className="relative w-full h-full product-card-deckle group-hover:-translate-y-1.5 group-hover:scale-[1.025] motion-reduce:transform-none">
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
                          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108 motion-reduce:transform-none rounded-[8px]"
                          onError={(e) => {
                            const cat = (product.href || "").replace(/^\//, "");
                            (e.target as HTMLImageElement).src = getProductFallbackImage(cat);
                          }}
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
