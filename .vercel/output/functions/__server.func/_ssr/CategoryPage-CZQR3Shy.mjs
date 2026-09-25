import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react_tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router_chunks.mjs";
import { $ as Check, B as Heart, K as Crown, b as Plus, d as Sparkles, f as ShoppingBag, g as Search, n as X, o as Truck, w as Minus } from "../_libs/lucide-react.mjs";
import { i as useStoreData, r as getProductFallbackImage } from "./store-data-DmVY4QsC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CategoryPage-CZQR3Shy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ALGERIAN_WILAYAS = [
	{
		code: "01",
		name: "01 - أدرار",
		region: "south"
	},
	{
		code: "02",
		name: "02 - الشلف",
		region: "north"
	},
	{
		code: "03",
		name: "03 - الأغواط",
		region: "south"
	},
	{
		code: "04",
		name: "04 - أم البواقي",
		region: "north"
	},
	{
		code: "05",
		name: "05 - باتنة",
		region: "north"
	},
	{
		code: "06",
		name: "06 - بجاية",
		region: "north"
	},
	{
		code: "07",
		name: "07 - بسكرة",
		region: "south"
	},
	{
		code: "08",
		name: "08 - بشار",
		region: "south"
	},
	{
		code: "09",
		name: "09 - البليدة",
		region: "center"
	},
	{
		code: "10",
		name: "10 - البويرة",
		region: "center"
	},
	{
		code: "11",
		name: "11 - تمنراست",
		region: "south"
	},
	{
		code: "12",
		name: "12 - تبسة",
		region: "north"
	},
	{
		code: "13",
		name: "13 - تلمسان",
		region: "north"
	},
	{
		code: "14",
		name: "14 - تيارت",
		region: "north"
	},
	{
		code: "15",
		name: "15 - تيزي وزو",
		region: "center"
	},
	{
		code: "16",
		name: "16 - الجزائر العاصمة",
		region: "center"
	},
	{
		code: "17",
		name: "17 - الجلفة",
		region: "south"
	},
	{
		code: "18",
		name: "18 - جيجل",
		region: "north"
	},
	{
		code: "19",
		name: "19 - سطيف",
		region: "north"
	},
	{
		code: "20",
		name: "20 - سعيدة",
		region: "north"
	},
	{
		code: "21",
		name: "21 - سكيكدة",
		region: "north"
	},
	{
		code: "22",
		name: "22 - سيدي بلعباس",
		region: "north"
	},
	{
		code: "23",
		name: "23 - عنابة",
		region: "north"
	},
	{
		code: "24",
		name: "24 - قالمة",
		region: "north"
	},
	{
		code: "25",
		name: "25 - قسنطينة",
		region: "north"
	},
	{
		code: "26",
		name: "26 - المدية",
		region: "center"
	},
	{
		code: "27",
		name: "27 - مستغانم",
		region: "north"
	},
	{
		code: "28",
		name: "28 - المسيلة",
		region: "north"
	},
	{
		code: "29",
		name: "29 - معسكر",
		region: "north"
	},
	{
		code: "30",
		name: "30 - ورقلة",
		region: "south"
	},
	{
		code: "31",
		name: "31 - وهران",
		region: "north"
	},
	{
		code: "32",
		name: "32 - البيض",
		region: "south"
	},
	{
		code: "33",
		name: "33 - إليزي",
		region: "south"
	},
	{
		code: "34",
		name: "34 - برج بوعريريج",
		region: "north"
	},
	{
		code: "35",
		name: "35 - بومرداس",
		region: "center"
	},
	{
		code: "36",
		name: "36 - الطارف",
		region: "north"
	},
	{
		code: "37",
		name: "37 - تندوف",
		region: "south"
	},
	{
		code: "38",
		name: "38 - تسمسيلت",
		region: "north"
	},
	{
		code: "39",
		name: "39 - الوادي",
		region: "south"
	},
	{
		code: "40",
		name: "40 - خنشلة",
		region: "north"
	},
	{
		code: "41",
		name: "41 - سوق أهراس",
		region: "north"
	},
	{
		code: "42",
		name: "42 - تيبازة",
		region: "center"
	},
	{
		code: "43",
		name: "43 - ميلة",
		region: "north"
	},
	{
		code: "44",
		name: "44 - عين الدفلى",
		region: "center"
	},
	{
		code: "45",
		name: "45 - النعامة",
		region: "south"
	},
	{
		code: "46",
		name: "46 - عين تموشنت",
		region: "north"
	},
	{
		code: "47",
		name: "47 - غرداية",
		region: "south"
	},
	{
		code: "48",
		name: "48 - غليزان",
		region: "north"
	},
	{
		code: "49",
		name: "49 - تيميمون",
		region: "south"
	},
	{
		code: "50",
		name: "50 - برج باجي مختار",
		region: "south"
	},
	{
		code: "51",
		name: "51 - أولاد جلال",
		region: "south"
	},
	{
		code: "52",
		name: "52 - بني عباس",
		region: "south"
	},
	{
		code: "53",
		name: "53 - عين صالح",
		region: "south"
	},
	{
		code: "54",
		name: "54 - عين قزام",
		region: "south"
	},
	{
		code: "55",
		name: "55 - تقرت",
		region: "south"
	},
	{
		code: "56",
		name: "56 - جانت",
		region: "south"
	},
	{
		code: "57",
		name: "57 - المغير",
		region: "south"
	},
	{
		code: "58",
		name: "58 - المنيعة",
		region: "south"
	}
];
function getShippingCost(wilayaName) {
	const w = ALGERIAN_WILAYAS.find((item) => item.name === wilayaName);
	if (!w) return 600;
	if (w.region === "center") return 500;
	if (w.region === "south") return 900;
	return 700;
}
function formatDZD(amount) {
	return `${amount.toLocaleString("en-US")} دج`;
}
function resolveCategory(title, categoryKey) {
	if (categoryKey) return categoryKey;
	const t = title.trim();
	if (t === "روب حجاب" || t === "روب الحجاب") return "abayas";
	if (t === "إكسسوارات" || t === "اكسسوارات") return "accessories";
	if (t === "عبايات" || t === "عباءات") return "abayas";
	if (t === "فساتين") return "dresses";
	if (t === "خمارات") return "khimar";
	if (t === "إسدالات" || t === "اسدالات") return "isdalat";
	if (t === "مستلزمات الحجاب" || t === "حجابات") return "hijab-supplies";
	if (t === "تخفيضات") return "sales";
	if (t === "تسوقي الآن" || t === "المتجر") return null;
	return null;
}
var ACCESSORY_TABS = [
	{
		id: "all",
		label: "الكل"
	},
	{
		id: "bags",
		label: "حقائب فاخرة"
	},
	{
		id: "hair",
		label: "أطواق ومشابك"
	},
	{
		id: "jewelry",
		label: "أساور ومجوهرات"
	},
	{
		id: "sleeves",
		label: "أكمام ومعاصم"
	}
];
function matchesAccessoryTab(product, tabId) {
	if (tabId === "all") return true;
	const combined = `${product.name.toLowerCase()} ${(product.description || "").toLowerCase()}`;
	if (tabId === "bags") return combined.includes("حقيبة") || combined.includes("شنطة");
	if (tabId === "hair") return combined.includes("طوق") || combined.includes("مشبك") || combined.includes("شعر") || combined.includes("كليب");
	if (tabId === "jewelry") return combined.includes("سوار") || combined.includes("قلادة") || combined.includes("خواتم") || combined.includes("عقد") || combined.includes("أساور") || combined.includes("مجوهرات");
	if (tabId === "sleeves") return combined.includes("معصم") || combined.includes("أكمام") || combined.includes("معاصم");
	return true;
}
var ABAYA_TABS = [
	{
		id: "all",
		label: "الكل"
	},
	{
		id: "black",
		label: "سوداء فاخرة"
	},
	{
		id: "evening",
		label: "سهرة ومناسبات"
	},
	{
		id: "colored",
		label: "عبايات ملونة"
	},
	{
		id: "open",
		label: "مفتوحة وكاب"
	}
];
function matchesAbayaTab(product, tabId) {
	if (tabId === "all") return true;
	const combined = `${product.name} ${product.description || ""}`.toLowerCase();
	if (tabId === "black") return combined.includes("سوداء") || combined.includes("أسود") || combined.includes("سواد");
	if (tabId === "evening") return combined.includes("سهرة") || combined.includes("مخمل") || combined.includes("كريستال") || combined.includes("دانتيل") || combined.includes("بروش") || combined.includes("مناسبات");
	if (tabId === "colored") return combined.includes("عنابي") || combined.includes("بوردو") || combined.includes("أخضر") || combined.includes("عاجي") || combined.includes("بني") || combined.includes("شوكولاتة") || combined.includes("زيتي");
	if (tabId === "open") return combined.includes("مفتوحة") || combined.includes("كيمونو") || combined.includes("كاب") || combined.includes("انسيابي");
	return true;
}
var HIJAB_TABS = [
	{
		id: "all",
		label: "الكل"
	},
	{
		id: "chiffon",
		label: "شيفون وشالات"
	},
	{
		id: "instant",
		label: "حجاب جاهز وسريع"
	},
	{
		id: "evening",
		label: "سهرة ومناسبات"
	},
	{
		id: "palettes",
		label: "مجموعات وألوان"
	}
];
function matchesHijabTab(product, tabId) {
	if (tabId === "all") return true;
	const combined = `${product.name} ${product.description || ""}`.toLowerCase();
	if (tabId === "chiffon") return combined.includes("شيفون") || combined.includes("شال") || combined.includes("أوشحة") || combined.includes("خمار");
	if (tabId === "instant") return combined.includes("جاهز") || combined.includes("جيرسي") || combined.includes("بندانة") || combined.includes("سريع") || combined.includes("مطاط");
	if (tabId === "evening") return combined.includes("سهرة") || combined.includes("لؤلؤ") || combined.includes("ميتاليك") || combined.includes("ذهبي") || combined.includes("فضية") || combined.includes("فضي") || combined.includes("مناسبات");
	if (tabId === "palettes") return combined.includes("باليت") || combined.includes("ألوان") || combined.includes("مجموعة") || combined.includes("تشكيلة");
	return true;
}
var ISDAL_TABS = [
	{
		id: "all",
		label: "الكل"
	},
	{
		id: "layered",
		label: "إسدالات طبقات"
	},
	{
		id: "twotone",
		label: "طقم ثنائي اللون"
	},
	{
		id: "prayer",
		label: "صلاة وخروج"
	}
];
function matchesIsdalTab(product, tabId) {
	if (tabId === "all") return true;
	const combined = `${product.name} ${product.description || ""}`.toLowerCase();
	if (tabId === "layered") return combined.includes("طبقات") || combined.includes("متدرج") || combined.includes("ثلاثي") || combined.includes("كشكش");
	if (tabId === "twotone") return combined.includes("سماوي") || combined.includes("أبيض") || combined.includes("رمادي") || combined.includes("شوكولاتة") || combined.includes("طقم") || combined.includes("أزرق");
	if (tabId === "prayer") return combined.includes("صلاة") || combined.includes("يومي") || combined.includes("خروج") || combined.includes("عملي");
	return true;
}
var DRESS_TABS = [
	{
		id: "all",
		label: "الكل"
	},
	{
		id: "casual",
		label: "يومي وكاجوال"
	},
	{
		id: "evening",
		label: "سهرة ومناسبات"
	},
	{
		id: "vintage",
		label: "فينتج وكلاسيك"
	}
];
function matchesDressTab(product, tabId) {
	if (tabId === "all") return true;
	const combined = `${product.name} ${product.description || ""}`.toLowerCase();
	if (tabId === "casual") return combined.includes("كتان") || combined.includes("كريب") || combined.includes("صيفي") || combined.includes("يومي") || combined.includes("كاجوال") || combined.includes("عملي") || combined.includes("مريح") || combined.includes("سادة") || combined.includes("ماكسي") || combined.includes("بوهيمي");
	if (tabId === "evening") return combined.includes("سهرة") || combined.includes("كاب") || combined.includes("كوتور") || combined.includes("عرائس") || combined.includes("مطرز") || combined.includes("طقم") || combined.includes("مناسبات");
	if (tabId === "vintage") return combined.includes("فينتج") || combined.includes("كلاسيك") || combined.includes("دانتيل") || combined.includes("كورسيه") || combined.includes("كسرات") || combined.includes("درامي") || combined.includes("فيونكة");
	return true;
}
function CategoryPage({ title, categoryKey, subtitle }) {
	const { products: storeProducts, categories, addOrder } = useStoreData();
	const resolvedCat = resolveCategory(title, categoryKey);
	const currentCategoryData = (0, import_react.useMemo)(() => {
		return categories.find((c) => c.id === resolvedCat || c.href === `/${resolvedCat}` || c.name === title);
	}, [
		categories,
		resolvedCat,
		title
	]);
	const [activeTab, setActiveTab] = (0, import_react.useState)("all");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [sortBy, setSortBy] = (0, import_react.useState)("featured");
	const [favorites, setFavorites] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [addedProductId, setAddedProductId] = (0, import_react.useState)(null);
	const [orderModalProduct, setOrderModalProduct] = (0, import_react.useState)(null);
	const [orderQuantity, setOrderQuantity] = (0, import_react.useState)(1);
	const [customerName, setCustomerName] = (0, import_react.useState)("");
	const [customerPhone, setCustomerPhone] = (0, import_react.useState)("");
	const [selectedWilaya, setSelectedWilaya] = (0, import_react.useState)("16 - الجزائر العاصمة");
	const [commune, setCommune] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [orderNotes, setOrderNotes] = (0, import_react.useState)("");
	const [orderSubmittedSuccess, setOrderSubmittedSuccess] = (0, import_react.useState)(null);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const categoryProducts = (0, import_react.useMemo)(() => {
		if (!resolvedCat) return storeProducts;
		if (resolvedCat === "sales") return storeProducts.filter((p) => p.category === "sales" || p.originalPrice && p.originalPrice > p.price);
		if (resolvedCat === "hijab-supplies" || resolvedCat === "khimar") return storeProducts.filter((p) => p.category === "hijab-supplies" || p.category === "khimar");
		return storeProducts.filter((p) => p.category === resolvedCat);
	}, [storeProducts, resolvedCat]);
	const displayProducts = (0, import_react.useMemo)(() => {
		let list = [...categoryProducts];
		if (resolvedCat === "accessories" && activeTab !== "all") list = list.filter((p) => matchesAccessoryTab(p, activeTab));
		if (resolvedCat === "abayas" && activeTab !== "all") list = list.filter((p) => matchesAbayaTab(p, activeTab));
		if ((resolvedCat === "hijab-supplies" || resolvedCat === "khimar") && activeTab !== "all") list = list.filter((p) => matchesHijabTab(p, activeTab));
		if (resolvedCat === "isdalat" && activeTab !== "all") list = list.filter((p) => matchesIsdalTab(p, activeTab));
		if (resolvedCat === "dresses" && activeTab !== "all") list = list.filter((p) => matchesDressTab(p, activeTab));
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase().trim();
			list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description && p.description.toLowerCase().includes(q));
		}
		if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
		else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
		return list;
	}, [
		categoryProducts,
		resolvedCat,
		activeTab,
		searchQuery,
		sortBy
	]);
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
		}, 1400);
	};
	const handleOpenQuickOrder = (product, e) => {
		e.preventDefault();
		e.stopPropagation();
		setOrderModalProduct(product);
		setOrderQuantity(1);
		setOrderSubmittedSuccess(null);
	};
	const handleConfirmOrder = (e) => {
		e.preventDefault();
		if (!orderModalProduct) return;
		if (!customerName.trim() || !customerPhone.trim() || !address.trim()) {
			alert("يرجى ملء جميع الحقول المطلوبة (الاسم، رقم الهاتف، والعنوان).");
			return;
		}
		setIsSubmitting(true);
		const shippingCost = getShippingCost(selectedWilaya);
		const totalAmount = orderModalProduct.price * orderQuantity;
		const grandTotal = totalAmount + shippingCost;
		const orderNumber = `HS-${Math.floor(1e3 + Math.random() * 9e3)}`;
		const newOrder = {
			id: `ord-${Date.now()}`,
			orderNumber,
			customerName: customerName.trim(),
			phone: customerPhone.trim(),
			wilaya: selectedWilaya,
			commune: commune.trim() || "المركز",
			address: address.trim(),
			items: [{
				productId: orderModalProduct.id,
				name: orderModalProduct.name,
				price: orderModalProduct.price,
				quantity: orderQuantity,
				image: orderModalProduct.image
			}],
			totalAmount,
			shippingCost,
			grandTotal,
			status: "pending",
			createdAt: "الآن",
			notes: orderNotes.trim() || void 0
		};
		setTimeout(() => {
			addOrder(newOrder);
			setIsSubmitting(false);
			setOrderSubmittedSuccess(orderNumber);
		}, 400);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full bg-[#FAF6F0] text-[#2B2119] min-h-[70vh] py-8 sm:py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "مسار التنقل",
					className: "mb-6 flex items-center gap-2 text-xs sm:text-sm text-[#735A45]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-[#2B2119] transition-colors",
							children: "الرئيسية"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "opacity-50",
							children: "/"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-[#2B2119]",
							children: title
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mb-8 sm:mb-10 text-center",
					children: [
						currentCategoryData?.bannerImage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full h-28 sm:h-48 md:h-56 rounded-2xl sm:rounded-3xl overflow-hidden mb-5 sm:mb-6 shadow-md border border-[#E3D4C0]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: currentCategoryData.bannerImage,
								alt: title,
								className: "w-full h-full object-cover",
								onError: (e) => {
									e.target.src = getProductFallbackImage(resolvedCat || void 0);
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 bg-gradient-to-t from-[#2B2119]/90 via-[#2B2119]/40 to-transparent flex flex-col items-center justify-end p-6 text-white text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-5 w-5 text-[#E5D2B8]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs uppercase font-bold tracking-widest text-[#E5D2B8]",
										children: currentCategoryData.tag || "تشكيلة حصرية"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-md",
									children: title
								})]
							})]
						}),
						!currentCategoryData?.bannerImage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-block relative px-8 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 bg-[#2B2119] rounded-2xl shadow-md -rotate-0.5",
								style: {
									backgroundImage: "linear-gradient(180deg, #3A2D23 0%, #2B2119 100%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0 1px, transparent 1px)",
									backgroundSize: "100% 100%, 8px 8px"
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10 flex items-center justify-center gap-2.5 text-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-5 w-5 sm:h-6 sm:w-6 text-[#E2D0AC]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-wide",
										children: title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 sm:h-5 sm:w-5 text-[#E2D0AC]" })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs sm:text-sm md:text-base text-[#5A412F] max-w-2xl mx-auto font-medium leading-relaxed",
							children: subtitle || currentCategoryData?.description || (resolvedCat === "accessories" ? "تشكيلة مختارة بعناية من أرقى الإكسسوارات، الحقائب الفاخرة، المجوهرات الذهبية، وأطواق الشعر التي تكتمل بها إطلالتك المحتشمة." : `استكشفي أحدث وأرقى تشكيلات ${title} المصممة لتجمع بين الأصالة والحشمة والأناقة.`)
						})
					]
				}),
				resolvedCat === "accessories" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5",
					children: ACCESSORY_TABS.map((tab) => {
						const isActive = activeTab === tab.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveTab(tab.id),
							className: `px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 select-none shadow-xs ${isActive ? "bg-[#2B2119] text-[#FAF6F0] shadow-md scale-105" : "bg-[#EDE0CD] text-[#423124] hover:bg-[#E3D4C0] border border-[#D5C2AA]/70"}`,
							children: tab.label
						}, tab.id);
					})
				}),
				resolvedCat === "abayas" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5",
					children: ABAYA_TABS.map((tab) => {
						const isActive = activeTab === tab.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveTab(tab.id),
							className: `px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 select-none shadow-xs ${isActive ? "bg-[#2B2119] text-[#FAF6F0] shadow-md scale-105" : "bg-[#EDE0CD] text-[#423124] hover:bg-[#E3D4C0] border border-[#D5C2AA]/70"}`,
							children: tab.label
						}, tab.id);
					})
				}),
				(resolvedCat === "hijab-supplies" || resolvedCat === "khimar") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5",
					children: HIJAB_TABS.map((tab) => {
						const isActive = activeTab === tab.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveTab(tab.id),
							className: `px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 select-none shadow-xs ${isActive ? "bg-[#2B2119] text-[#FAF6F0] shadow-md scale-105" : "bg-[#EDE0CD] text-[#423124] hover:bg-[#E3D4C0] border border-[#D5C2AA]/70"}`,
							children: tab.label
						}, tab.id);
					})
				}),
				resolvedCat === "isdalat" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5",
					children: ISDAL_TABS.map((tab) => {
						const isActive = activeTab === tab.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveTab(tab.id),
							className: `px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 select-none shadow-xs ${isActive ? "bg-[#2B2119] text-[#FAF6F0] shadow-md scale-105" : "bg-[#EDE0CD] text-[#423124] hover:bg-[#E3D4C0] border border-[#D5C2AA]/70"}`,
							children: tab.label
						}, tab.id);
					})
				}),
				resolvedCat === "dresses" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5",
					children: DRESS_TABS.map((tab) => {
						const isActive = activeTab === tab.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveTab(tab.id),
							className: `px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 select-none shadow-xs ${isActive ? "bg-[#2B2119] text-[#FAF6F0] shadow-md scale-105" : "bg-[#EDE0CD] text-[#423124] hover:bg-[#E3D4C0] border border-[#D5C2AA]/70"}`,
							children: tab.label
						}, tab.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex flex-col sm:flex-row items-center justify-between gap-3.5 bg-[#EDE0CD]/40 p-3 sm:p-4 rounded-2xl border border-[#E3D4C0]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full sm:w-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							placeholder: `ابحثي في ${title} ...`,
							className: "w-full rounded-xl border border-[#D5C2AA] bg-white pr-9 pl-3 py-2 text-xs sm:text-sm text-[#2B2119] placeholder:text-[#8C7665] focus:border-[#2B2119] focus:outline-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#735A45]" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs sm:text-sm font-bold text-[#735A45]",
							children: [
								"عرض ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-[#2B2119]",
									children: displayProducts.length
								}),
								" منتج"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "sort-select",
								className: "text-xs text-[#735A45] font-semibold whitespace-nowrap",
								children: "الترتيب:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "sort-select",
								value: sortBy,
								onChange: (e) => setSortBy(e.target.value),
								className: "rounded-xl border border-[#D5C2AA] bg-white px-3 py-1.5 text-xs text-[#2B2119] font-bold focus:border-[#2B2119] focus:outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "featured",
										children: "المميز أولاً"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "price-asc",
										children: "الأقل سعراً"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "price-desc",
										children: "الأعلى سعراً"
									})
								]
							})]
						})]
					})]
				}),
				displayProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-16 text-center bg-[#EDE0CD]/30 rounded-3xl border border-[#E3D4C0] p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "mx-auto h-12 w-12 text-[#A48E7C] mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base sm:text-lg font-bold text-[#2B2119]",
							children: "لا توجد منتجات مطابقة للبحث"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs sm:text-sm text-[#735A45]",
							children: "جربي تغيير كلمات البحث أو اختيار تبويب آخر لرؤية المنتجات."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setSearchQuery("");
								setActiveTab("all");
							},
							className: "mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#3D2E24]",
							children: "عرض جميع المنتجات"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 md:gap-6",
					children: displayProducts.map((product) => {
						const isFav = favorites.has(product.id);
						const isAdded = addedProductId === product.id;
						const hasDiscount = product.originalPrice && product.originalPrice > product.price;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative flex flex-col rounded-2xl bg-[#F1E6D0] p-2.5 sm:p-3 shadow-[0_4px_14px_rgba(43,33,25,0.08)] border border-[#E2D2BC] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.025] hover:shadow-[0_16px_32px_rgba(43,33,25,0.20)] motion-reduce:transform-none",
							style: { backgroundImage: "linear-gradient(180deg, #FAF4E8 0%, #F1E6D0 100%)" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-[#E4D4BE]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: product.image,
										alt: product.name,
										loading: "lazy",
										className: "h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108 motion-reduce:transform-none",
										onError: (e) => {
											e.target.src = getProductFallbackImage(product.category);
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": isFav ? `إزالة من المفضلة` : `إضافة للمفضلة`,
										onClick: (e) => toggleFavorite(product.id, e),
										className: "absolute top-2 left-2 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#FAF5EE]/90 backdrop-blur-xs text-[#2B2119] shadow-sm transition-all duration-200 hover:scale-110 active:scale-95",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
											className: `h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors duration-200 ${isFav ? "fill-[#8C2A3E] text-[#8C2A3E]" : "text-[#2B2119]/70 hover:text-[#8C2A3E]"}`,
											strokeWidth: 2
										})
									}),
									hasDiscount && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute top-2 right-2 z-10 px-2 py-0.5 rounded-md bg-[#8C2A3E] text-white text-[10px] sm:text-xs font-black shadow-xs",
										children: "تخفيض"
									}),
									product.stock <= 8 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded-md bg-[#2B2119]/80 backdrop-blur-xs text-white text-[10px] font-bold",
										children: [
											"بقي ",
											product.stock,
											" فقط"
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2.5 sm:mt-3 flex flex-1 flex-col justify-between",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs sm:text-sm md:text-[15px] font-bold text-[#2B2119] leading-snug line-clamp-2 min-h-[34px]",
										children: product.name
									}), product.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] sm:text-xs text-[#735A45] line-clamp-2 leading-relaxed",
										children: product.description
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex items-baseline gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm sm:text-base font-extrabold text-[#2B2119] tracking-tight",
											children: formatDZD(product.price)
										}), hasDiscount && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-[#8C7665] line-through font-semibold",
											children: formatDZD(product.originalPrice)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 grid grid-cols-1 gap-1.5 pt-1 border-t border-[#E3D4C0]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: (e) => handleOpenQuickOrder(product, e),
											className: "w-full flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#2B2119] hover:bg-[#3D2E24] text-white text-xs font-bold transition-all duration-150 active:scale-98 shadow-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3.5 w-3.5 text-[#E2D0AC]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "طلب سريع (الدفع عند الاستلام)" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: (e) => handleAddToCart(product, e),
											className: `w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all duration-150 active:scale-98 ${isAdded ? "bg-emerald-700 text-white border-emerald-700" : "bg-[#FAF6F0] text-[#423124] border-[#D5C2AA] hover:bg-[#EDE0CD]"}`,
											children: isAdded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تمت الإضافة للسلة ✓" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-3.5 w-3.5 text-[#735A45]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "أضيفي للسلة" })] })
										})]
									})
								]
							})]
						}, product.id);
					})
				})
			]
		}), orderModalProduct && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				dir: "rtl",
				className: "relative w-full max-w-lg rounded-3xl bg-[#FAF6F0] p-5 sm:p-7 shadow-2xl border border-[#D5C2AA] text-[#2B2119] my-6",
				style: { backgroundImage: "linear-gradient(180deg, #FCF9F4 0%, #F5EDE0 100%)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setOrderModalProduct(null);
						setOrderSubmittedSuccess(null);
					},
					className: "absolute top-4 left-4 p-1.5 rounded-full bg-[#EDE0CD] text-[#2B2119] hover:bg-[#E3D4C0] transition-colors",
					"aria-label": "إغلاق",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				}), orderSubmittedSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-6 text-center space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-8 w-8 stroke-[2.5]" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-black text-[#2B2119]",
							children: "تم استلام طلبكِ بنجاح!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-[#5A412F] leading-relaxed max-w-sm mx-auto",
							children: [
								"شكراً لثقتكِ في ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "حجاب سول" }),
								". رقم طلبكِ هو:"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-block px-4 py-2 rounded-xl bg-[#EDE0CD] font-mono text-base font-black text-[#2B2119] border border-[#D5C2AA]",
							children: ["#", orderSubmittedSuccess]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-white/70 p-4 text-xs sm:text-sm text-right space-y-1.5 border border-[#E3D4C0]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-[#2B2119]",
									children: "تفاصيل الشحن:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[#5A412F]",
									children: [
										"العميل: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: customerName }),
										" (",
										customerPhone,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[#5A412F]",
									children: [
										"الولاية: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedWilaya }),
										" — ",
										commune || "المركز"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[#5A412F]",
									children: ["العنوان: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: address })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[#5A412F]",
									children: [
										"المجموع الكلي مع التوصيل:",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-[#8C2A3E]",
											children: formatDZD(orderModalProduct.price * orderQuantity + getShippingCost(selectedWilaya))
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-emerald-700 font-semibold pt-1",
									children: "✓ الدفع نقداً عند الاستلام ومعاينة الطلب."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-[#735A45]",
							children: [
								"سنتصل بكِ على الرقم (",
								customerPhone,
								") لتأكيد موعد التوصيل قبل الإرسال."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setOrderModalProduct(null);
								setOrderSubmittedSuccess(null);
							},
							className: "w-full py-3 rounded-2xl bg-[#2B2119] text-white font-bold text-sm hover:bg-[#3D2E24] transition-colors",
							children: "مواصلة التسوق"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleConfirmOrder,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 border-b border-[#E3D4C0] pb-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: orderModalProduct.image,
								alt: orderModalProduct.name,
								className: "h-16 w-16 rounded-xl object-cover border border-[#D5C2AA] shrink-0",
								onError: (e) => {
									e.target.src = getProductFallbackImage(orderModalProduct.category);
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold text-[#8C2A3E]",
										children: "طلب فوري (توصيل للمنزل)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-black text-[#2B2119] truncate",
										children: orderModalProduct.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-extrabold text-[#2B2119] mt-0.5",
										children: formatDZD(orderModalProduct.price)
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between bg-[#EDE0CD]/50 p-2.5 rounded-xl border border-[#E3D4C0]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-[#423124]",
								children: "الكمية المطلوبة:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setOrderQuantity((q) => Math.max(1, q - 1)),
										className: "flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#2B2119] shadow-xs border border-[#D5C2AA]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-sm w-5 text-center",
										children: orderQuantity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setOrderQuantity((q) => Math.min(orderModalProduct.stock || 10, q + 1)),
										className: "flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#2B2119] shadow-xs border border-[#D5C2AA]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 pt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: ["الاسم الكامل ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-rose-600",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: customerName,
									onChange: (e) => setCustomerName(e.target.value),
									placeholder: "مثال: أمينة بن ساسي",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] placeholder:text-[#8C7665] focus:border-[#2B2119] focus:outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: ["رقم الهاتف ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-rose-600",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "tel",
									required: true,
									value: customerPhone,
									onChange: (e) => setCustomerPhone(e.target.value),
									placeholder: "مثال: 0661234589 أو 0555...",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] placeholder:text-[#8C7665] focus:border-[#2B2119] focus:outline-none",
									dir: "ltr"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-bold text-[#423124] mb-1",
										children: ["الولاية (58 ولاية) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-rose-600",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: selectedWilaya,
										onChange: (e) => setSelectedWilaya(e.target.value),
										className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] font-bold focus:border-[#2B2119] focus:outline-none",
										children: ALGERIAN_WILAYAS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: w.name,
											children: w.name
										}, w.code))
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-bold text-[#423124] mb-1",
										children: "البلدية"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: commune,
										onChange: (e) => setCommune(e.target.value),
										placeholder: "مثال: دالي إبراهيم",
										className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#8C7665] focus:border-[#2B2119] focus:outline-none"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: ["العنوان بالتفصيل ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-rose-600",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: address,
									onChange: (e) => setAddress(e.target.value),
									placeholder: "الحي، رقم العمارة، أو معالم قريبة لتسهيل التوصيل",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#8C7665] focus:border-[#2B2119] focus:outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "ملاحظات إضافية (اختياري)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: orderNotes,
									onChange: (e) => setOrderNotes(e.target.value),
									placeholder: "مثال: يرجى الاتصال بعد الظهر، أو لون محدد",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#8C7665] focus:border-[#2B2119] focus:outline-none"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-[#EDE0CD]/60 p-3.5 space-y-1.5 text-xs border border-[#E3D4C0]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-[#5A412F]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"سعر المنتج (",
										orderQuantity,
										" قطعة):"
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDZD(orderModalProduct.price * orderQuantity) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-[#5A412F]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"تكلفة التوصيل (",
										selectedWilaya.split("-")[1] || selectedWilaya,
										"):"
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDZD(getShippingCost(selectedWilaya)) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm font-black text-[#2B2119] pt-2 border-t border-[#D5C2AA]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "المجموع الإجمالي عند الاستلام:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[#8C2A3E]",
										children: formatDZD(orderModalProduct.price * orderQuantity + getShippingCost(selectedWilaya))
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: isSubmitting,
							className: "w-full py-3 rounded-2xl bg-[#2B2119] text-white font-bold text-sm hover:bg-[#3D2E24] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50",
							children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "جاري إرسال الطلب ..." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-[#E2D0AC]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تأكيد الطلب الآن (الدفع عند الباب)" })] })
						})
					]
				})]
			})
		})]
	});
}
//#endregion
export { CategoryPage as t };
