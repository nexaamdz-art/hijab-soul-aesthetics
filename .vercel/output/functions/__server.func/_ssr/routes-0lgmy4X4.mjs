import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { i as useStoreData } from "./store-data-BX58v80_.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as Heart, z as Crown } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./SiteLayout-BpYukZnr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-0lgmy4X4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var hijab_soul_hero_default = "/assets/hijab-soul-hero-CogDqRyW.png";
var _jsxFileName$3 = "/app/applet/src/components/HeroArtwork.tsx";
function HeroArtwork() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		"aria-label": "أناقة الحجاب بأسلوبك الخاص",
		className: "w-full",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative aspect-[1034/485] w-full overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
				src: hijab_soul_hero_default,
				alt: "أناقة الحجاب بأسلوبك الخاص",
				className: "block h-full w-full object-contain",
				fetchPriority: "high"
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 8,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/shop",
				"aria-label": "تسوقي الآن",
				title: "تسوقي الآن",
				className: "absolute left-[50.5%] top-[63.5%] h-[16%] w-[17%] bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "sr-only",
					children: "تسوقي الآن"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 20,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 14,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 7,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 6,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/CategoriesSection.tsx";
var TEAR_AMPLITUDE = .7;
var TEAR_POINTS = 280;
var TEAR_WAVELENGTH = 11;
/**
* Seeded pseudo-random number generator (mulberry32).
* Produces deterministic, reproducible results for fixed seeds.
*/
function mulberry32$1(seed) {
	return function() {
		seed |= 0;
		seed = seed + 1831565813 | 0;
		let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
/**
* Generates a smooth, flowing hand-torn paper clip-path polygon (250+ points).
* Uses low-frequency smooth noise (sum of 3 sine waves, wavelength ~8-15% of edge length,
* random phases, amplitude ~0.4-1.0% of size). Neighboring points change gradually with
* no spikes, no zigzags, and no triangles.
*/
function generateSmoothTornPolygon$1(seed, pointsCount = TEAR_POINTS, amplitude = TEAR_AMPLITUDE, wavelength = TEAR_WAVELENGTH) {
	const rng = mulberry32$1(seed);
	const w1 = {
		freq: 100 / (wavelength * (.85 + rng() * .3)),
		phase: rng() * Math.PI * 2,
		weight: .55
	};
	const w2 = {
		freq: 100 / (wavelength * (.55 + rng() * .3)),
		phase: rng() * Math.PI * 2,
		weight: .3
	};
	const w3 = {
		freq: 100 / (wavelength * (1.3 + rng() * .4)),
		phase: rng() * Math.PI * 2,
		weight: .15
	};
	function getNoise(pos, edgeSeed) {
		const angle = pos / 100 * 2 * Math.PI;
		return (w1.weight * Math.sin(angle * w1.freq + w1.phase + edgeSeed * 1.5) + w2.weight * Math.sin(angle * w2.freq + w2.phase + edgeSeed * 2.3) + w3.weight * Math.sin(angle * w3.freq + w3.phase + edgeSeed * 3.1)) * amplitude;
	}
	const pts = [];
	const ptsPerSide = Math.floor(pointsCount / 4);
	for (let i = 0; i < ptsPerSide; i++) {
		const x = i / (ptsPerSide - 1) * 100;
		const y = Math.max(.05, .85 + getNoise(x, 1));
		pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
	}
	for (let i = 0; i < ptsPerSide; i++) {
		const y = i / (ptsPerSide - 1) * 100;
		const x = Math.min(99.95, 100 - (.85 + getNoise(y, 2)));
		pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
	}
	for (let i = 0; i < ptsPerSide; i++) {
		const x = 100 - i / (ptsPerSide - 1) * 100;
		const y = Math.min(99.95, 100 - (.85 + getNoise(x, 3)));
		pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
	}
	for (let i = 0; i < ptsPerSide; i++) {
		const y = 100 - i / (ptsPerSide - 1) * 100;
		const x = Math.max(.05, .85 + getNoise(y, 4));
		pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
	}
	return `polygon(${pts.join(", ")})`;
}
var CARD_SEEDS = [
	1021,
	2039,
	3067,
	4111,
	5171,
	6217,
	7253,
	8311
];
var LABEL_SEEDS = [
	7243,
	8317,
	9391,
	10459,
	11549,
	12641,
	13723,
	14819
];
var CARD_POLYGONS$1 = CARD_SEEDS.map((seed) => generateSmoothTornPolygon$1(seed));
var LABEL_POLYGONS = LABEL_SEEDS.map((seed) => generateSmoothTornPolygon$1(seed));
function CategoriesSection() {
	const { categories } = useStoreData();
	const activeCategories = categories.filter((c) => c.isActive);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "store-categories-section",
		"aria-label": "أقسام وتصنيفات المتجر",
		className: "relative w-full max-w-full overflow-x-hidden py-4 sm:py-5 lg:py-6",
		style: {
			"--label-h": "35px",
			"--label-inset": "11%",
			"--label-bottom": "7%",
			"--label-font": "15.5px",
			"--label-bg": "#E2D0AC",
			"--label-color": "#3B2A1A"
		},
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
			"aria-label": "تصفح أقسام المتجر",
			className: "w-full",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				dir: "rtl",
				className: `no-scrollbar snap-carousel flex w-full items-stretch overflow-x-auto scroll-smooth snap-x snap-mandatory overscroll-x-contain touch-pan-x px-4 sm:px-6 md:px-8 ${activeCategories.length <= 6 ? "lg:grid lg:grid-cols-6 lg:overflow-visible lg:snap-none lg:max-w-[968px] lg:mx-auto lg:px-4" : "lg:grid lg:grid-cols-8 lg:overflow-visible lg:snap-none lg:max-w-[1180px] lg:mx-auto lg:px-4"}`,
				style: {
					gap: "var(--gap)",
					WebkitOverflowScrolling: "touch"
				},
				children: activeCategories.map((category, index) => {
					const cardPoly = CARD_POLYGONS$1[index % CARD_POLYGONS$1.length];
					const labelPoly = LABEL_POLYGONS[index % LABEL_POLYGONS.length];
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: category.href,
						"aria-label": `تصفح قسم ${category.name}`,
						className: "group snap-item relative block flex-none snap-start lg:w-full lg:max-w-none lg:min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6D58] focus-visible:ring-offset-4 focus-visible:ring-offset-paper transition-transform duration-300 motion-reduce:transition-none",
						style: { width: "var(--card-w)" },
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative w-full transition-[transform,filter] duration-300 ease-out group-hover:-translate-y-1.5 motion-reduce:transform-none",
							style: {
								aspectRatio: "var(--img-ratio)",
								maxHeight: "228px",
								filter: "drop-shadow(0 8px 16px rgba(44, 34, 30, 0.14)) drop-shadow(0 2px 4px rgba(44, 34, 30, 0.08))",
								WebkitFilter: "drop-shadow(0 8px 16px rgba(44, 34, 30, 0.14)) drop-shadow(0 2px 4px rgba(44, 34, 30, 0.08))"
							},
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative w-full h-full overflow-hidden bg-[#ECE4DB]",
								style: {
									clipPath: cardPoly,
									WebkitClipPath: cardPoly,
									backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(44,34,30,0.04) 100%), radial-gradient(circle at 40% 30%, rgba(60, 45, 30, 0.035) 0 1px, transparent 1px)",
									backgroundSize: "100% 100%, 7px 7px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: category.image,
									alt: category.alt || category.name,
									loading: "lazy",
									decoding: "async",
									className: "h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none",
									onError: (e) => {
										e.target.src = "/images/categories/dresses.jpg";
									}
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 177,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#2C221E]/30 via-transparent to-transparent opacity-80",
									"aria-hidden": "true"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 189,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 167,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "absolute z-10 pointer-events-none transition-transform duration-300 group-hover:translate-y-[-1px] motion-reduce:transform-none rounded-[6px]",
								style: {
									height: "var(--label-h, 35px)",
									left: "var(--label-inset, 11%)",
									right: "var(--label-inset, 11%)",
									bottom: "var(--label-bottom, 7%)",
									filter: "drop-shadow(0 4px 8px rgba(35, 25, 18, 0.24)) drop-shadow(0 1px 3px rgba(35, 25, 18, 0.14))",
									WebkitFilter: "drop-shadow(0 4px 8px rgba(35, 25, 18, 0.24)) drop-shadow(0 1px 3px rgba(35, 25, 18, 0.14))"
								},
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-full h-full flex items-center justify-center px-1.5 text-center rounded-[6px] overflow-hidden select-none",
									style: {
										clipPath: labelPoly,
										WebkitClipPath: labelPoly,
										backgroundColor: "var(--label-bg, #E2D0AC)",
										backgroundImage: "linear-gradient(180deg, #E8D8B6 0%, var(--label-bg, #E2D0AC) 50%, #D9C39A 100%), radial-gradient(circle at 30% 35%, rgba(59, 42, 26, 0.045) 0 1px, transparent 1px)",
										backgroundSize: "100% 100%, 7px 7px",
										boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.35), inset 0 -1px 2px rgba(59, 42, 26, 0.1)"
									},
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-hand font-extrabold select-none whitespace-nowrap transition-colors duration-200",
										style: {
											fontSize: "var(--label-font, 15.5px)",
											fontWeight: 800,
											color: "var(--label-color, #3B2A1A)",
											lineHeight: 1
										},
										children: category.name
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 222,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 209,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 196,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 155,
							columnNumber: 17
						}, this)
					}, category.id || category.name, false, {
						fileName: _jsxFileName$2,
						lineNumber: 146,
						columnNumber: 15
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 129,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 128,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 113,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/LatestProductsSection.tsx";
var LATEST_PRODUCTS_DATA = [
	{
		id: "product-1",
		name: "عباءة سوداء مطرزة",
		price: 4500,
		image: "/images/products/product-1.jpg",
		href: "/abayas"
	},
	{
		id: "product-2",
		name: "فستان بتفاصيل أنيقة",
		price: 3800,
		image: "/images/products/product-2.jpg",
		href: "/dresses"
	},
	{
		id: "product-3",
		name: "خمار صيفي خفيف",
		price: 2200,
		image: "/images/products/product-3.jpg",
		href: "/khimar"
	},
	{
		id: "product-4",
		name: "فستان سادة بأكمام واسعة",
		price: 3400,
		image: "/images/products/product-4.jpg",
		href: "/dresses"
	},
	{
		id: "product-5",
		name: "إسدال يومي عملي",
		price: 3e3,
		image: "/images/products/product-5.jpg",
		href: "/isdalat"
	},
	{
		id: "product-6",
		name: "حجاب شيفون فاخر",
		price: 1200,
		image: "/images/products/product-6.jpg",
		href: "/hijab-supplies"
	},
	{
		id: "product-7",
		name: "طقم إكسسوارات",
		price: 1500,
		image: "/images/products/product-7.jpg",
		href: "/accessories"
	},
	{
		id: "product-8",
		name: "عباءة بتطريز ذهبي",
		price: 5200,
		image: "/images/products/product-8.jpg",
		href: "/abayas"
	}
];
/**
* Formats price in Algerian Dinar with thousands separator followed by "دج".
* e.g. 4500 -> "4,500 دج"
*/
function formatDZD(amount) {
	return `${amount.toLocaleString("en-US")} دج`;
}
/**
* Seeded pseudo-random number generator (mulberry32).
*/
function mulberry32(seed) {
	return function() {
		seed |= 0;
		seed = seed + 1831565813 | 0;
		let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
/**
* Generates a smooth, flowing hand-torn paper clip-path polygon.
* Low amplitude smooth noise ensures clean deckled edges with no extreme spikes.
*/
function generateSmoothTornPolygon(seed, pointsCount = 240, amplitude = .55, wavelength = 11) {
	const rng = mulberry32(seed);
	const w1 = {
		freq: 100 / (wavelength * (.85 + rng() * .3)),
		phase: rng() * Math.PI * 2,
		weight: .55
	};
	const w2 = {
		freq: 100 / (wavelength * (.55 + rng() * .3)),
		phase: rng() * Math.PI * 2,
		weight: .3
	};
	const w3 = {
		freq: 100 / (wavelength * (1.3 + rng() * .4)),
		phase: rng() * Math.PI * 2,
		weight: .15
	};
	function getNoise(pos, edgeSeed) {
		const angle = pos / 100 * 2 * Math.PI;
		return (w1.weight * Math.sin(angle * w1.freq + w1.phase + edgeSeed * 1.5) + w2.weight * Math.sin(angle * w2.freq + w2.phase + edgeSeed * 2.3) + w3.weight * Math.sin(angle * w3.freq + w3.phase + edgeSeed * 3.1)) * amplitude;
	}
	const pts = [];
	const ptsPerSide = Math.floor(pointsCount / 4);
	for (let i = 0; i < ptsPerSide; i++) {
		const x = i / (ptsPerSide - 1) * 100;
		const y = Math.max(.05, .75 + getNoise(x, 1));
		pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
	}
	for (let i = 0; i < ptsPerSide; i++) {
		const y = i / (ptsPerSide - 1) * 100;
		const x = Math.min(99.95, 100 - (.75 + getNoise(y, 2)));
		pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
	}
	for (let i = 0; i < ptsPerSide; i++) {
		const x = 100 - i / (ptsPerSide - 1) * 100;
		const y = Math.min(99.95, 100 - (.75 + getNoise(x, 3)));
		pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
	}
	for (let i = 0; i < ptsPerSide; i++) {
		const y = 100 - i / (ptsPerSide - 1) * 100;
		const x = Math.max(.05, .75 + getNoise(y, 4));
		pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
	}
	return `polygon(${pts.join(", ")})`;
}
var CARD_POLYGONS = [
	1409,
	2521,
	3637,
	4751,
	5867,
	6983,
	8101,
	9221
].map((s) => generateSmoothTornPolygon(s, 220, .5, 12));
var BTN_POLYGONS = [
	11443,
	12557,
	13669,
	14783,
	15897,
	17011,
	18123,
	19237
].map((s) => generateSmoothTornPolygon(s, 100, .65, 9));
function LatestProductsSection() {
	const { products: storeProducts } = useStoreData();
	const [favorites, setFavorites] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [addedProductId, setAddedProductId] = (0, import_react.useState)(null);
	const displayProducts = storeProducts && storeProducts.length > 0 ? storeProducts : LATEST_PRODUCTS_DATA;
	const toggleFavorite = (id, e) => {
		e.preventDefault();
		e.stopPropagation();
		setFavorites((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};
	const handleAddToCart = (product, e) => {
		e.preventDefault();
		e.stopPropagation();
		const badge = document.querySelector("button[aria-label=\"سلة التسوق\"] span");
		let currentCount = 0;
		if (badge && badge.textContent) {
			const parsed = parseInt(badge.textContent.trim(), 10);
			if (!isNaN(parsed)) currentCount = parsed;
		}
		const nextCount = currentCount + 1;
		if (badge) {
			badge.textContent = String(nextCount);
			badge.classList.add("scale-125");
			setTimeout(() => badge.classList.remove("scale-125"), 200);
		}
		setAddedProductId(product.id);
		setTimeout(() => {
			setAddedProductId((prev) => prev === product.id ? null : prev);
		}, 1200);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "latest-products-section",
		"aria-label": "أحدث المنتجات",
		className: "relative w-full max-w-full overflow-x-hidden mt-[28px] mb-[32px]",
		style: {
			"--product-card-w": "clamp(150px, 46vw, 190px)",
			"--product-gap": "14px"
		},
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 mb-4 sm:mb-5",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-start",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					dir: "rtl",
					className: "relative inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 select-none transition-transform duration-200 hover:scale-[1.01]",
					style: {
						filter: "drop-shadow(0 4px 12px rgba(22, 16, 13, 0.32)) drop-shadow(0 1px 3px rgba(22, 16, 13, 0.2))",
						WebkitFilter: "drop-shadow(0 4px 12px rgba(22, 16, 13, 0.32)) drop-shadow(0 1px 3px rgba(22, 16, 13, 0.2))"
					},
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
						viewBox: "0 0 360 64",
						fill: "none",
						preserveAspectRatio: "none",
						className: "absolute inset-0 w-full h-full pointer-events-none -z-0",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("defs", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("filter", {
							id: "brushInkTexture",
							x: "-10%",
							y: "-20%",
							width: "120%",
							height: "140%",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("feTurbulence", {
								type: "fractalNoise",
								baseFrequency: "0.045 0.08",
								numOctaves: "3",
								result: "noise"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 264,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("feDisplacementMap", {
								in: "SourceGraphic",
								in2: "noise",
								scale: "3",
								xChannelSelector: "R",
								yChannelSelector: "G"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 270,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 263,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
							id: "brushGrad",
							x1: "0%",
							y1: "0%",
							x2: "100%",
							y2: "0%",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
									offset: "0%",
									stopColor: "#140F0C",
									stopOpacity: "0.88"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 279,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
									offset: "8%",
									stopColor: "#1C1512"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 280,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
									offset: "20%",
									stopColor: "#110C0A"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 281,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
									offset: "50%",
									stopColor: "#18120F"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 282,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
									offset: "80%",
									stopColor: "#110C0A"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 283,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
									offset: "92%",
									stopColor: "#1C1512"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 284,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
									offset: "100%",
									stopColor: "#140F0C",
									stopOpacity: "0.88"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 285,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 278,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 262,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", {
							filter: "url(#brushInkTexture)",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 22,26 C 16,18 28,14 48,11 C 72,8 102,10 138,8 C 176,6 216,8 254,7 C 286,6 314,9 332,15 C 342,18 350,23 354,28 C 352,32 346,34 340,33 C 348,37 350,42 344,45 C 334,50 316,52 294,54 C 260,56 220,53 178,55 C 136,56 94,53 58,52 C 34,51 18,47 10,42 C 6,38 8,34 12,31 C 8,30 10,27 16,28 C 12,27 16,25 22,26 Z",
									fill: "#231B17",
									opacity: "0.75"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 291,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 26,29 C 22,21 34,16 54,13 C 78,10 108,12 144,9 C 182,7 222,9 260,8 C 290,7 316,11 334,16 C 344,19 350,24 348,30 C 346,34 338,36 332,35 C 340,39 342,43 336,46 C 326,50 310,52 288,54 C 254,56 216,53 174,55 C 134,56 94,53 60,52 C 38,51 22,48 16,43 C 12,39 14,35 18,33 C 14,32 16,29 22,30 C 18,29 20,28 26,29 Z",
									fill: "url(#brushGrad)"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 298,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 38,28 C 36,22 48,18 68,16 C 94,14 124,15 158,13 C 196,12 234,13 268,13 C 294,13 316,16 328,21 C 334,24 336,28 332,32 C 328,34 322,35 316,35 C 322,38 322,42 318,44 C 310,47 296,49 276,50 C 246,52 210,50 172,51 C 136,52 100,50 72,49 C 52,48 40,45 34,41 C 30,37 32,34 36,32 C 32,31 34,29 38,28 Z",
									fill: "#100B09"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 304,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 4,33 C 12,31 22,32 32,34 C 20,35 10,35 4,33 Z",
									fill: "#1A1310"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 310,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 8,26 C 16,24 28,25 38,27 C 26,28 14,28 8,26 Z",
									fill: "#191310"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 311,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 10,40 C 18,39 30,40 42,42 C 28,43 16,43 10,40 Z",
									fill: "#1C1512"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 312,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 16,19 C 26,17 40,18 52,20 C 38,21 24,21 16,19 Z",
									fill: "#201713",
									opacity: "0.85"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 313,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 14,46 C 26,46 42,47 56,48 C 42,49 26,49 14,46 Z",
									fill: "#1F1713",
									opacity: "0.85"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 318,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 2,36 C 8,36 16,36 24,37 C 16,38 8,38 2,36 Z",
									fill: "#140F0C"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 323,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 326,20 C 336,22 346,25 356,28 C 346,27 336,24 326,20 Z",
									fill: "#1A1310"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 326,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 330,30 C 340,31 348,33 358,36 C 348,35 338,33 330,30 Z",
									fill: "#191310"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 327,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 324,40 C 334,42 344,45 352,48 C 342,46 332,43 324,40 Z",
									fill: "#1C1512"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 328,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 312,14 C 324,16 336,19 346,23 C 334,20 322,17 312,14 Z",
									fill: "#201713",
									opacity: "0.85"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 329,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 316,50 C 328,51 338,52 346,53 C 336,53 326,52 316,50 Z",
									fill: "#1F1713",
									opacity: "0.85"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 334,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 334,34 C 342,35 350,36 358,37 C 350,37 342,36 334,34 Z",
									fill: "#140F0C"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 339,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 65,22 C 110,20 170,21 230,20 C 270,19 295,21 310,23 C 295,22 270,21 230,22 C 170,22 110,22 65,22 Z",
									fill: "#2E241F",
									opacity: "0.35"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 342,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: "M 50,43 C 95,44 155,43 215,44 C 260,44 290,43 305,42 C 290,42 260,43 215,42 C 155,42 95,42 50,43 Z",
									fill: "#2E241F",
									opacity: "0.35"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 347,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
									cx: "8",
									cy: "21",
									r: "1.2",
									fill: "#1A1310"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 354,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
									cx: "12",
									cy: "49",
									r: "1.4",
									fill: "#17110E"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 355,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
									cx: "352",
									cy: "18",
									r: "1.2",
									fill: "#1A1310"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 356,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
									cx: "354",
									cy: "46",
									r: "1.3",
									fill: "#17110E"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 357,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
									cx: "357",
									cy: "32",
									r: "0.9",
									fill: "#150F0D"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 358,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
									cx: "3",
									cy: "31",
									r: "0.8",
									fill: "#150F0D"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 359,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 289,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 255,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative z-10 flex items-center gap-2 sm:gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Crown, {
							className: "h-4 w-4 sm:h-[18px] sm:w-[18px] text-white shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]",
							strokeWidth: 2,
							"aria-hidden": "true"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 365,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-[15px] sm:text-[17px] md:text-lg font-extrabold text-white tracking-wide leading-none pt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]",
							children: "أحدث المنتجات"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 370,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 364,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 244,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 243,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 242,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				dir: "rtl",
				className: "no-scrollbar snap-carousel flex w-full items-stretch overflow-x-auto scroll-smooth snap-x snap-mandatory overscroll-x-contain touch-pan-x px-4 sm:px-6 md:px-8 lg:grid lg:grid-cols-4 lg:overflow-visible lg:snap-none lg:max-w-[1100px] lg:mx-auto lg:px-4",
				style: {
					gap: "var(--product-gap, 14px)",
					WebkitOverflowScrolling: "touch"
				},
				children: displayProducts.map((product, index) => {
					const cardPolygon = CARD_POLYGONS[index % CARD_POLYGONS.length];
					const btnPolygon = BTN_POLYGONS[index % BTN_POLYGONS.length];
					const isFavorite = favorites.has(product.id);
					const isAdded = addedProductId === product.id;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "group snap-item relative flex-none snap-start lg:w-full lg:max-w-none lg:min-w-0 transition-transform duration-300 motion-reduce:transition-none",
						style: { width: "var(--product-card-w)" },
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative w-full h-full transition-[transform,filter] duration-300 ease-out group-hover:-translate-y-1.5 motion-reduce:transform-none",
							style: {
								filter: "drop-shadow(0 7px 14px rgba(44, 34, 30, 0.12)) drop-shadow(0 2px 4px rgba(44, 34, 30, 0.08))",
								WebkitFilter: "drop-shadow(0 7px 14px rgba(44, 34, 30, 0.12)) drop-shadow(0 2px 4px rgba(44, 34, 30, 0.08))"
							},
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative w-full h-full flex flex-col p-2 sm:p-2.5 md:p-3 select-none",
								style: {
									clipPath: cardPolygon,
									WebkitClipPath: cardPolygon,
									backgroundColor: "#F1E6D0",
									backgroundImage: "linear-gradient(180deg, #F5ECE0 0%, #F1E6D0 60%, #E9DAC1 100%), radial-gradient(circle at 35% 25%, rgba(60, 45, 30, 0.035) 0 1px, transparent 1px)",
									backgroundSize: "100% 100%, 7px 7px"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "relative w-full aspect-[3/4] overflow-hidden rounded-[8px] bg-[#E7D9C6]",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: product.href,
											"aria-label": product.name,
											className: "block w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B2119] rounded-[8px]",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
												src: product.image,
												alt: product.name,
												loading: "lazy",
												decoding: "async",
												className: "h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none rounded-[8px]"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 436,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 431,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											type: "button",
											"aria-label": isFavorite ? `إزالة ${product.name} من المفضلة` : `إضافة ${product.name} للمفضلة`,
											"aria-pressed": isFavorite,
											onClick: (e) => toggleFavorite(product.id, e),
											className: "absolute top-2 left-2 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#FAF5EE]/85 backdrop-blur-xs text-[#2B2119] shadow-sm transition-all duration-200 hover:bg-[#FAF5EE] hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B2119]",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, {
												className: `h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors duration-200 ${isFavorite ? "fill-[#8C2A3E] text-[#8C2A3E]" : "text-[#2B2119]/75 hover:text-[#8C2A3E]"}`,
												strokeWidth: 1.8
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 457,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 446,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 430,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: product.href,
										className: "mt-2.5 sm:mt-3 block text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2B2119] rounded-sm",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
											className: "text-[13px] sm:text-[14px] md:text-[15px] font-bold text-[#2B2119] leading-snug line-clamp-1 transition-colors duration-200 group-hover:text-[#634835]",
											children: product.name
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 473,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 469,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-1 mb-2.5 sm:mb-3 text-center",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[13px] sm:text-[14px] md:text-[15px] font-extrabold text-[#2B2119] tracking-tight",
											children: formatDZD(product.price)
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 480,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 479,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-auto w-full pt-1",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											type: "button",
											"aria-label": `أضف ${product.name} إلى السلة`,
											onClick: (e) => handleAddToCart(product, e),
											className: "relative w-full min-h-[40px] flex items-center justify-center px-3 py-2 text-center text-white font-bold text-xs sm:text-[13px] select-none transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B2119] focus-visible:ring-offset-2",
											style: {
												clipPath: btnPolygon,
												WebkitClipPath: btnPolygon,
												backgroundColor: "#2B2119",
												backgroundImage: "linear-gradient(180deg, #382B21 0%, #2B2119 55%, #201712 100%), radial-gradient(circle at 20% 30%, rgba(255,255,255,0.035) 0 1px, transparent 1px)",
												backgroundSize: "100% 100%, 7px 7px",
												boxShadow: "0 2px 4px rgba(35, 25, 18, 0.2)"
											},
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "whitespace-nowrap transition-transform duration-150",
												children: isAdded ? "تمت الإضافة ✓" : "أضف إلى السلة"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 502,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 487,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 486,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 418,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 408,
							columnNumber: 17
						}, this)
					}, product.id, false, {
						fileName: _jsxFileName$1,
						lineNumber: 400,
						columnNumber: 15
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 385,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 384,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 230,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
function Index() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeroArtwork, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 7,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CategoriesSection, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 8,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LatestProductsSection, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 9,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 6,
		columnNumber: 10
	}, this);
}
//#endregion
export { Index as component };
