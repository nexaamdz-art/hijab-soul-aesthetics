import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useAuth } from "./auth-context-prnidh_s.mjs";
import { r as hijab_soul_mark_default } from "./store-data-BX58v80_.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Menu, G as ChevronDown, L as Heart, U as CircleCheckBig, _ as RefreshCw, a as Truck, d as ShoppingBag, f as ShieldCheck, h as Search, k as LogOut, n as X, r as User } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteLayout-BpYukZnr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$4 = "/app/applet/src/components/SiteHeader.tsx";
var navItems = [
	{
		label: "الرئيسيـة",
		to: "/"
	},
	{
		label: "الفساتين",
		to: "/dresses"
	},
	{
		label: "الإسدالات",
		to: "/isdalat"
	},
	{
		label: "الخمار",
		to: "/khimar"
	},
	{
		label: "العبايات",
		to: "/abayas"
	},
	{
		label: "الإكسسوارات",
		to: "/accessories"
	},
	{
		label: "حجابات",
		to: "/hijab-supplies"
	},
	{
		label: "تخفيضات",
		to: "/sales"
	}
];
function SiteHeader({ onMenuClick }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [userDropdownOpen, setUserDropdownOpen] = (0, import_react.useState)(false);
	const dropdownRef = (0, import_react.useRef)(null);
	const { user, profile, openAuthModal, signOut } = useAuth();
	(0, import_react.useEffect)(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setUserDropdownOpen(false);
		}
		if (userDropdownOpen) document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [userDropdownOpen]);
	const handleAccountClick = () => {
		if (user) setUserDropdownOpen((prev) => !prev);
		else openAuthModal("signin");
	};
	const handleLogout = async () => {
		setUserDropdownOpen(false);
		await signOut();
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: "paper-dark w-full bg-header text-header-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto flex w-full max-w-[1400px] items-center gap-4 px-4 pt-2 sm:px-6 lg:gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex shrink-0 items-center gap-3.5 sm:gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								"aria-label": "القائمة",
								onClick: onMenuClick,
								className: "transition-opacity hover:opacity-70 lg:hidden",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, {
									className: "h-5 w-5",
									strokeWidth: 1.25
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 73,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 68,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								"aria-label": "المفضلة",
								className: "transition-opacity hover:opacity-70",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, {
									className: "h-5 w-5",
									strokeWidth: 1.25
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 77,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 76,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative",
								ref: dropdownRef,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									"aria-label": user ? `حساب ${profile?.fullName || "المستخدم"}` : "تسجيل الدخول / حسابي",
									"aria-expanded": userDropdownOpen,
									onClick: handleAccountClick,
									className: "flex items-center gap-1.5 py-1 px-1.5 rounded-lg transition-colors hover:bg-white/5 active:scale-95 text-header-foreground",
									children: [user && profile?.avatarUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: profile.avatarUrl,
										alt: profile.fullName,
										className: "h-6 w-6 rounded-full object-cover border border-accent/40"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 89,
										columnNumber: 17
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, {
										className: "h-5 w-5",
										strokeWidth: 1.25
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 95,
										columnNumber: 17
									}, this), user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-accent max-w-[110px] truncate",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: profile?.firstName || "حسابي" }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 100,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-3 w-3 opacity-70" }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 101,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 99,
										columnNumber: 17
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "hidden sm:inline text-xs font-normal text-header-muted hover:text-white",
										children: "دخول"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 104,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 82,
									columnNumber: 13
								}, this), user && userDropdownOpen && /* @__PURE__ */ (void 0)("div", {
									dir: "rtl",
									className: "absolute right-0 top-full mt-2 w-64 rounded-2xl bg-[#FAF6F0] p-4 shadow-2xl border border-[#D5C2AA] text-[#2B2119] z-50 animate-in fade-in zoom-in-95 duration-150",
									style: { backgroundImage: "linear-gradient(180deg, #FCF9F4 0%, #F5EDE0 100%)" },
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-3 pb-3 border-b border-[#E3D4C0]",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2B2119] text-white font-bold text-sm",
											children: profile?.firstName?.[0] || /* @__PURE__ */ (void 0)(User, { className: "h-5 w-5" }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 121,
												columnNumber: 49
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 120,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (void 0)("p", {
												className: "text-sm font-black text-[#2B2119] truncate",
												children: profile?.fullName || "مرحباً بكِ"
											}, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 124,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("p", {
												className: "text-xs text-[#735A45] truncate",
												dir: "ltr",
												children: profile?.email
											}, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 127,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$4,
											lineNumber: 123,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 119,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "mt-2.5 space-y-1 text-xs font-semibold",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-2 px-2 py-1.5 text-[#5A412F]",
											children: [/* @__PURE__ */ (void 0)(CircleCheckBig, { className: "h-3.5 w-3.5 text-emerald-600" }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 135,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", { children: "حساب نشط" }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 136,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$4,
											lineNumber: 134,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: handleLogout,
											className: "w-full flex items-center justify-start gap-2 px-2.5 py-2 rounded-xl text-red-700 hover:bg-red-50 active:bg-red-100 transition-colors",
											children: [/* @__PURE__ */ (void 0)(LogOut, { className: "h-4 w-4" }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 144,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", { children: "تسجيل الخروج" }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 145,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$4,
											lineNumber: 139,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 133,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 112,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 81,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								"aria-label": "سلة التسوق",
								className: "relative transition-opacity hover:opacity-70",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, {
									className: "h-5 w-5",
									strokeWidth: 1.25
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 153,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "absolute -top-2 left-3 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-medium text-header",
									children: "0"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 154,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 152,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 67,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: (e) => e.preventDefault(),
						role: "search",
						className: "hidden min-w-0 flex-1 justify-center md:flex",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "torn-paper relative w-full max-w-[420px] bg-paper px-5 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "إبحث عن ما تحبين ..",
								"aria-label": "ابحث",
								className: "w-full bg-transparent pl-8 text-sm text-ink placeholder:text-ink/50 focus:outline-none"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 167,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "submit",
								"aria-label": "بحث",
								className: "absolute left-4 top-1/2 -translate-y-1/2 text-ink/70 transition-opacity hover:opacity-70",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, {
									className: "h-4 w-4",
									strokeWidth: 1.5
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 179,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 174,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 166,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 161,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "mr-auto flex min-w-0 shrink-0 items-center gap-2 md:mr-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "min-w-0 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								dir: "ltr",
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-display text-2xl leading-none tracking-wide sm:text-3xl",
									children: "Hijab Soul"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 188,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, {
									className: "h-3.5 w-3.5 shrink-0 fill-accent text-accent",
									strokeWidth: 1.25
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 191,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 187,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "mt-1 hidden text-right text-[11px] leading-5 text-header-muted sm:block",
								children: [
									"أكثر من مجرد ملابس ..",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 196,
										columnNumber: 15
									}, this),
									"إنه أسلوب حياة ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-burgundy",
										children: "♡"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 197,
										columnNumber: 30
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 194,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 186,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: hijab_soul_mark_default,
							alt: "حجاب سول",
							className: "h-14 w-auto shrink-0 select-none sm:h-16"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 200,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 185,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 65,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				onSubmit: (e) => e.preventDefault(),
				role: "search",
				className: "mx-auto w-full max-w-[1400px] px-4 pt-2 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "torn-paper relative w-full bg-paper px-5 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "إبحث عن ما تحبين ..",
						"aria-label": "ابحث",
						className: "w-full bg-transparent pl-8 text-sm text-ink placeholder:text-ink/50 focus:outline-none"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 211,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, {
						className: "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/70",
						strokeWidth: 1.5
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 218,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 210,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 205,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
				"aria-label": "التصنيفات",
				className: "mx-auto w-full max-w-[1400px] px-4 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "hidden items-center justify-start gap-7 pb-2 pt-1 lg:flex xl:gap-10",
					children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: item.to,
						className: "block border-b border-transparent pb-1 text-[13px] text-header-foreground transition-colors hover:text-accent",
						activeProps: { className: "border-accent text-accent" },
						activeOptions: { exact: item.to === "/" },
						children: item.label
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 230,
						columnNumber: 15
					}, this) }, item.label, false, {
						fileName: _jsxFileName$4,
						lineNumber: 229,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 227,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 226,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 64,
		columnNumber: 5
	}, this);
}
var vintage_sidebar_art_default = "/assets/vintage-sidebar-art-CCOyKTk7.png";
var _jsxFileName$3 = "/app/applet/src/components/VintageSidebar.tsx";
var sidebarCategories = [
	{
		label: "فساتين",
		to: "/dresses"
	},
	{
		label: "اسدالات",
		to: "/isdalat"
	},
	{
		label: "خمار",
		to: "/khimar"
	},
	{
		label: "عبايات",
		to: "/abayas"
	},
	{
		label: "حجابات",
		to: "/hijab-supplies"
	},
	{
		label: "إكسسوارات",
		to: "/accessories"
	},
	{
		label: "أحذية شرعية",
		to: "/shoes"
	},
	{
		label: "مقالات و نصائح",
		to: "/articles"
	}
];
function VintageSidebar({ onNavigate, fillHeight = false }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: fillHeight ? "h-[100dvh] w-fit max-w-[92vw] overflow-x-hidden overflow-y-auto bg-paper" : "h-full w-full overflow-y-auto bg-paper",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative h-full w-full",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
				src: vintage_sidebar_art_default,
				alt: "لوحة أقسام حجاب سول",
				className: fillHeight ? "block h-[100dvh] w-auto max-w-none select-none" : "block h-auto w-full select-none"
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 32,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
				"aria-label": "أقسام المتجر",
				className: "absolute inset-x-0 top-[11%] flex flex-col items-end gap-[1.6%] pl-[26%] pr-[10%]",
				children: sidebarCategories.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: c.to,
					onClick: onNavigate,
					className: "font-hand text-[clamp(1rem,2.2cqw,1.6rem)] leading-tight text-ink/90 transition-colors hover:text-burgundy",
					activeProps: { className: "text-burgundy" },
					children: c.label
				}, c.to, false, {
					fileName: _jsxFileName$3,
					lineNumber: 48,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 43,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 31,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 23,
		columnNumber: 5
	}, this);
}
var mosque_footer_decoration_default = "/assets/mosque-footer-decoration-DNG1wHk-.png";
var _jsxFileName$2 = "/app/applet/src/components/MosqueFooterDecoration.tsx";
function MosqueFooterDecoration({ className = "", imgClassName = "" }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		id: "mosque-footer-decoration-wrapper",
		className: `pointer-events-none select-none ${className}`,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
			id: "mosque-footer-decoration-img",
			src: mosque_footer_decoration_default,
			alt: "كل ما تحتاجينه من ملابس المحجبات في مكان واحد",
			className: `h-auto w-full object-contain drop-shadow-[0_4px_16px_rgba(44,34,30,0.06)] ${imgClassName}`,
			referrerPolicy: "no-referrer",
			loading: "eager",
			decoding: "sync",
			suppressHydrationWarning: true
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 19,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 13,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/SiteFooter.tsx";
var features = [
	{
		id: "service-feature-service",
		icon: Heart,
		text: "نحن هنا دائمًا لخدمتك"
	},
	{
		id: "service-feature-return",
		icon: RefreshCw,
		text: "إمكانية الاستبدال والإرجاع"
	},
	{
		id: "service-feature-payment",
		icon: ShieldCheck,
		text: "دفع آمن ومتعدد الوسائل"
	},
	{
		id: "service-feature-shipping",
		icon: Truck,
		text: "شحن سريع"
	}
];
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
		className: "mt-auto flex flex-col w-full overflow-x-clip",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "h-14 sm:h-20 md:h-28 lg:h-32 w-full pointer-events-none",
			"aria-hidden": "true"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 42,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			id: "service-bar-banner",
			"aria-label": "مزايا وخدمات المتجر",
			className: "relative w-full bg-[#E3D5C9] py-2.5 sm:py-3.5 md:py-4.5 lg:py-5 border-t border-[#B8A495]/60",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply",
				style: { backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` },
				"aria-hidden": "true"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 50,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative mx-auto w-full max-w-[1440px] px-1.5 sm:px-3 md:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-row items-center justify-between w-full",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						id: "mosque-decoration-container",
						className: "relative shrink-0 flex items-center justify-end w-[110px] sm:w-[150px] md:w-[195px] lg:w-[240px] xl:w-[270px]",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MosqueFooterDecoration, { className: "absolute bottom-[-2px] sm:bottom-[-4px] md:bottom-[-6px] right-0 w-[115px] sm:w-[155px] md:w-[200px] lg:w-[245px] xl:w-[275px] z-20" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 68,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 64,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						id: "service-features-grid",
						className: "flex-1 grid grid-cols-4 items-center w-full min-w-0 mr-1 sm:mr-3 md:mr-5 lg:mr-7",
						children: features.map((feature, idx) => {
							const IconComponent = feature.icon;
							const isLeftmost = idx === features.length - 1;
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								id: feature.id,
								className: `flex flex-col items-center justify-center text-center px-0.5 sm:px-1.5 md:px-3 lg:px-4 min-w-0 ${!isLeftmost ? "border-l border-[#B8A495]/70" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[#2C221E] transition-transform duration-200 hover:scale-110",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconComponent, {
										className: "h-3.5 w-3.5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7",
										strokeWidth: 1.35
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 92,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 91,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "mt-1 sm:mt-1.5 md:mt-2 text-[9.5px] sm:text-xs md:text-[13px] lg:text-sm font-semibold text-[#2C221E] leading-[1.2] sm:leading-snug max-w-full text-balance tracking-tight",
									children: feature.text
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 99,
									columnNumber: 21
								}, this)]
							}, feature.id, true, {
								fileName: _jsxFileName$1,
								lineNumber: 83,
								columnNumber: 19
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 74,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 60,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 58,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 44,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 40,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/components/SiteLayout.tsx";
function SiteLayout({ children }) {
	const [drawerOpen, setDrawerOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteHeader, { onMenuClick: () => setDrawerOpen(true) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 12,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex min-h-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
					className: "paper-cream flex min-w-0 flex-1 flex-col",
					children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteFooter, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 18,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 16,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
					className: "hidden w-[280px] shrink-0 border-r border-ink/10 lg:block xl:w-[320px]",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "sticky top-0 h-screen",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VintageSidebar, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 24,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 23,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 22,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 14,
				columnNumber: 7
			}, this),
			drawerOpen && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 lg:hidden",
				children: [/* @__PURE__ */ (void 0)("button", {
					"aria-label": "إغلاق القائمة",
					onClick: () => setDrawerOpen(false),
					className: "absolute inset-0 bg-black/50 animate-in fade-in"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 32,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "absolute inset-y-0 right-0 h-[100dvh] max-h-[100dvh] w-fit max-w-[92vw] overflow-y-auto bg-paper shadow-2xl animate-in slide-in-from-right duration-300",
					children: [/* @__PURE__ */ (void 0)("button", {
						"aria-label": "إغلاق",
						onClick: () => setDrawerOpen(false),
						className: "absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-header/80 text-header-foreground",
						children: /* @__PURE__ */ (void 0)(X, {
							className: "h-4 w-4",
							strokeWidth: 1.5
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 43,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(VintageSidebar, {
						fillHeight: true,
						onNavigate: () => setDrawerOpen(false)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 45,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 31,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 11,
		columnNumber: 5
	}, this);
}
//#endregion
export { SiteLayout as t };
