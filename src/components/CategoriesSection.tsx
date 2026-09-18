import { Link } from "@tanstack/react-router";

// Constants for smooth flowing hand-torn paper deckled edges
const TEAR_AMPLITUDE = 0.7; // Amplitude about 0.4% - 1.0% of the size
const TEAR_POINTS = 280; // 250+ polygon points along perimeter
const TEAR_WAVELENGTH = 11; // Wavelength about 8% - 15% of edge length

interface CategoryItem {
  name: string;
  href: string;
  image: string;
  alt: string;
}

/**
 * Seeded pseudo-random number generator (mulberry32).
 * Produces deterministic, reproducible results for fixed seeds.
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
 * Generates a smooth, flowing hand-torn paper clip-path polygon (250+ points).
 * Uses low-frequency smooth noise (sum of 3 sine waves, wavelength ~8-15% of edge length,
 * random phases, amplitude ~0.4-1.0% of size). Neighboring points change gradually with
 * no spikes, no zigzags, and no triangles.
 */
function generateSmoothTornPolygon(
  seed: number,
  pointsCount: number = TEAR_POINTS,
  amplitude: number = TEAR_AMPLITUDE,
  wavelength: number = TEAR_WAVELENGTH,
): string {
  const rng = mulberry32(seed);

  // 3 sine wave components with random phases and frequencies around TEAR_WAVELENGTH
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

  // Top edge: x from 0 to 100, y near 0
  for (let i = 0; i < ptsPerSide; i++) {
    const t = i / (ptsPerSide - 1);
    const x = t * 100;
    const y = Math.max(0.05, 0.85 + getNoise(x, 1));
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }

  // Right edge: y from 0 to 100, x near 100
  for (let i = 0; i < ptsPerSide; i++) {
    const t = i / (ptsPerSide - 1);
    const y = t * 100;
    const x = Math.min(99.95, 100 - (0.85 + getNoise(y, 2)));
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }

  // Bottom edge: x from 100 down to 0, y near 100
  for (let i = 0; i < ptsPerSide; i++) {
    const t = i / (ptsPerSide - 1);
    const x = 100 - t * 100;
    const y = Math.min(99.95, 100 - (0.85 + getNoise(x, 3)));
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }

  // Left edge: y from 100 down to 0, x near 0
  for (let i = 0; i < ptsPerSide; i++) {
    const t = i / (ptsPerSide - 1);
    const y = 100 - t * 100;
    const x = Math.max(0.05, 0.85 + getNoise(y, 4));
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }

  return `polygon(${pts.join(", ")})`;
}

/**
 * Single source of truth for categories.
 * Ordered strictly from Right-to-Left (RTL):
 * 1. فساتين (/dresses)
 * 2. اسدالات (/isdalat)
 * 3. حجابات (/hijab-supplies)
 * 4. عبايات (/abayas)
 * 5. اكسسوارات (/accessories)
 * 6. تخفيضات (/sales)
 */
const CATEGORIES_DATA: CategoryItem[] = [
  {
    name: "فساتين",
    href: "/dresses",
    image: "/images/categories/dresses.jpg",
    alt: "فساتين محتشمة وأنيقة - حجاب سول",
  },
  {
    name: "اسدالات",
    href: "/isdalat",
    image: "/images/categories/isdalat.jpg",
    alt: "إسدالات صلاة وخروج راقية - حجاب سول",
  },
  {
    name: "حجابات",
    href: "/hijab-supplies",
    image: "/images/categories/hijabs.jpg",
    alt: "حجابات وخمارات بأقمشة ناعمة فاخرة - حجاب سول",
  },
  {
    name: "عبايات",
    href: "/abayas",
    image: "/images/categories/abayas.jpg",
    alt: "عبايات عصرية بتطريز راقٍ - حجاب سول",
  },
  {
    name: "اكسسوارات",
    href: "/accessories",
    image: "/images/categories/accessories.jpg",
    alt: "إكسسوارات وبروشات الحجاب الأنيقة - حجاب سول",
  },
  {
    name: "تخفيضات",
    href: "/sales",
    image: "/images/categories/sale.jpg",
    alt: "عروض وتخفيضات حصرية على الأزياء المحتشمة - حجاب سول",
  },
];

// Seeded fixed numbers per card and label for unique, reproducible smooth torn edges
const CARD_SEEDS = [1021, 2039, 3067, 4111, 5171, 6217];
const LABEL_SEEDS = [7243, 8317, 9391, 10459, 11549, 12641];

const CARD_POLYGONS = CARD_SEEDS.map((seed) => generateSmoothTornPolygon(seed));
const LABEL_POLYGONS = LABEL_SEEDS.map((seed) => generateSmoothTornPolygon(seed));

export function CategoriesSection() {
  return (
    <section
      id="store-categories-section"
      aria-label="أقسام وتصنيفات المتجر"
      className="relative w-full max-w-full overflow-x-hidden py-4 sm:py-5 lg:py-6"
      style={
        {
          "--label-h": "35px",
          "--label-inset": "11%",
          "--label-bottom": "7%",
          "--label-font": "15.5px",
          "--label-bg": "#E2D0AC",
          "--label-color": "#3B2A1A",
        } as React.CSSProperties
      }
    >
      <nav aria-label="تصفح أقسام المتجر" className="w-full">
        {/*
          Responsive Container:
          - Mobile (< 640px): Card width ~30-34vw (min 106px, max 140px) via var(--card-w).
            About 2.5 cards visible with next one cut off. Gap 11px via var(--gap).
          - Tablet (640-1024px): Card width 132-158px via var(--card-w).
          - Desktop (1024px+): 6 cards in one row, max-width 968px centered, total card height <= ~228px.
          - Tuning sizes: Tunable via CSS variables (--card-w, --gap, --img-ratio, --strip-h, --label-h, --label-font).
        */}
        <div
          dir="rtl"
          className="no-scrollbar snap-carousel flex w-full items-stretch overflow-x-auto scroll-smooth snap-x snap-mandatory overscroll-x-contain touch-pan-x px-4 sm:px-6 md:px-8 lg:grid lg:grid-cols-6 lg:overflow-visible lg:snap-none lg:max-w-[968px] lg:mx-auto lg:px-4"
          style={{
            gap: "var(--gap)",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {CATEGORIES_DATA.map((category, index) => {
            const cardPoly = CARD_POLYGONS[index % CARD_POLYGONS.length];
            const labelPoly = LABEL_POLYGONS[index % LABEL_POLYGONS.length];

            return (
              <Link
                key={category.name}
                to={category.href}
                aria-label={`تصفح قسم ${category.name}`}
                className="group snap-item relative block flex-none snap-start lg:w-full lg:max-w-none lg:min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6D58] focus-visible:ring-offset-4 focus-visible:ring-offset-paper transition-transform duration-300 motion-reduce:transition-none"
                style={{
                  width: "var(--card-w)",
                }}
              >
                {/*
                  Unclipped Wrapper:
                  Holds drop-shadow for the outer torn paper card.
                  The photo fills the whole card (object-fit: cover), so total width and height stay proportional.
                  Aspect ratio is set to 4/5 via var(--img-ratio), capped at ~228px total.
                */}
                <div
                  className="relative w-full transition-[transform,filter] duration-300 ease-out group-hover:-translate-y-1.5 motion-reduce:transform-none"
                  style={{
                    aspectRatio: "var(--img-ratio)",
                    maxHeight: "228px",
                    filter:
                      "drop-shadow(0 8px 16px rgba(44, 34, 30, 0.14)) drop-shadow(0 2px 4px rgba(44, 34, 30, 0.08))",
                    WebkitFilter:
                      "drop-shadow(0 8px 16px rgba(44, 34, 30, 0.14)) drop-shadow(0 2px 4px rgba(44, 34, 30, 0.08))",
                  }}
                >
                  {/*
                    Layer 1: Outer Card Container (Clipped with smooth hand-torn polygon).
                    The photo fills the entire card with object-cover.
                  */}
                  <div
                    className="relative w-full h-full overflow-hidden bg-[#ECE4DB]"
                    style={{
                      clipPath: cardPoly,
                      WebkitClipPath: cardPoly,
                      backgroundImage:
                        "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(44,34,30,0.04) 100%), radial-gradient(circle at 40% 30%, rgba(60, 45, 30, 0.035) 0 1px, transparent 1px)",
                      backgroundSize: "100% 100%, 7px 7px",
                    }}
                  >
                    <img
                      src={category.image}
                      alt={category.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
                    />

                    {/* Subtle warm paper depth gradient under the bottom part where the label sits */}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#2C221E]/30 via-transparent to-transparent opacity-80"
                      aria-hidden="true"
                    />
                  </div>

                  {/*
                    Layer 2: Bottom Sandy Paper Label (Inside the photo at its bottom part).
                    - Size: Height 35px (scaled ~12% from 40px via var(--label-h)), side insets 11%,
                      bottom margin 7% (via var(--label-bottom)).
                    - Non-plain box: keeps smooth flowing hand-torn edges (labelPoly) and slightly rounded corners.
                    - Color: Sandy background #E2D0AC with subtle paper gradient to #D9C39A.
                    - Floats above the photo with soft paper drop shadow.
                  */}
                  <div
                    className="absolute z-10 pointer-events-none transition-transform duration-300 group-hover:translate-y-[-1px] motion-reduce:transform-none rounded-[6px]"
                    style={{
                      height: "var(--label-h, 35px)",
                      left: "var(--label-inset, 11%)",
                      right: "var(--label-inset, 11%)",
                      bottom: "var(--label-bottom, 7%)",
                      filter:
                        "drop-shadow(0 4px 8px rgba(35, 25, 18, 0.24)) drop-shadow(0 1px 3px rgba(35, 25, 18, 0.14))",
                      WebkitFilter:
                        "drop-shadow(0 4px 8px rgba(35, 25, 18, 0.24)) drop-shadow(0 1px 3px rgba(35, 25, 18, 0.14))",
                    }}
                  >
                    <div
                      className="w-full h-full flex items-center justify-center px-1.5 text-center rounded-[6px] overflow-hidden select-none"
                      style={{
                        clipPath: labelPoly,
                        WebkitClipPath: labelPoly,
                        backgroundColor: "var(--label-bg, #E2D0AC)",
                        backgroundImage:
                          "linear-gradient(180deg, #E8D8B6 0%, var(--label-bg, #E2D0AC) 50%, #D9C39A 100%), radial-gradient(circle at 30% 35%, rgba(59, 42, 26, 0.045) 0 1px, transparent 1px)",
                        backgroundSize: "100% 100%, 7px 7px",
                        boxShadow:
                          "inset 0 1px 2px rgba(255, 255, 255, 0.35), inset 0 -1px 2px rgba(59, 42, 26, 0.1)",
                      }}
                    >
                      <span
                        className="font-hand font-extrabold select-none whitespace-nowrap transition-colors duration-200"
                        style={{
                          fontSize: "var(--label-font, 15.5px)",
                          fontWeight: 800,
                          color: "var(--label-color, #3B2A1A)",
                          lineHeight: 1,
                        }}
                      >
                        {category.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </section>
  );
}
