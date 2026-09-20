import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react_tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { i as useStoreData, n as compressImageFile, r as hijab_soul_mark_default, t as CURATED_IMAGE_PRESETS } from "./store-data-BX58v80_.mjs";
import { h as Link } from "../_libs/@tanstack/react-router_chunks.mjs";
import { B as Clock, D as MapPin, F as Layers, G as ChevronDown, H as CircleCheck, I as Image, J as ArrowUpRight, K as Check, M as Link$1, N as LayoutGrid, P as LayoutDashboard, R as FileText, S as Package, T as MessageCircle, V as CircleX, W as CircleAlert, Y as ArrowRight, a as Truck, b as Phone, c as Trash2, d as ShoppingBag, f as ShieldCheck, g as RotateCcw, h as Search, i as Upload, l as Store, m as Send, n as X, o as TriangleAlert, p as Settings, q as CheckCheck, r as User, s as TrendingUp, t as Zap, u as Sparkles, v as Printer, w as MessageSquare, x as Pen, y as Plus, z as Crown } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-OttEz3QC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$6 = "/app/applet/src/components/admin/AdminOverview.tsx";
function AdminOverview({ products, orders, conversations, onTabChange, onSelectOrder }) {
	const totalRevenue = orders.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + o.grandTotal, 0);
	const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "processing").length;
	const unreadMessagesCount = conversations.reduce((sum, c) => sum + c.unreadCount, 0);
	const lowStockProducts = products.filter((p) => p.stock <= 8);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl bg-[#2B2119] text-[#FAF6F0] p-6 sm:p-8 relative overflow-hidden shadow-lg border border-[#433225]",
				style: { backgroundImage: "radial-gradient(circle at 90% 20%, rgba(200, 160, 120, 0.15) 0%, transparent 60%), linear-gradient(135deg, #2B2119 0%, #1E1610 100%)" },
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E5D2B8] mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Crown, { className: "h-3.5 w-3.5 text-[#E5D2B8]" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 54,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "لوحة الإدارة الرسمية • حجاب سول" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 55,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 53,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-2xl sm:text-3xl font-black text-white",
							children: "مرحباً بكِ في إدارة متجر حجاب سول 🕊️"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 57,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-[#D5C2AA] mt-1 max-w-xl leading-relaxed",
							children: "تحكّمي بكل تفاصيل المتجر: تعديل المنتجات والأسعار، متابعة وشحن طلبات الزبائن، والرد المباشر على المحادثات."
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 60,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 52,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center gap-2 sm:gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => onTabChange("products"),
							className: "px-4 py-2.5 rounded-xl bg-[#E5D2B8] text-[#2B2119] font-bold text-xs sm:text-sm hover:bg-white active:scale-95 transition-all shadow-sm",
							children: "+ إضافة أو تعديل منتج"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 67,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => onTabChange("orders"),
							className: "px-4 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs sm:text-sm hover:bg-white/20 active:scale-95 transition-all border border-white/15",
							children: [
								"عرض الطلبات (",
								orders.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 73,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 66,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 51,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 44,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl bg-[#FAF6F0] p-5 border border-[#E3D4C0] shadow-sm relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-bold text-[#735A45]",
								children: "إجمالي المبيعات النشطة"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 88,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-9 w-9 rounded-xl bg-[#EDE0CD] text-[#2B2119] flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 90,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 89,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 87,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-2xl font-black text-[#2B2119]",
								dir: "ltr",
								children: [
									totalRevenue.toLocaleString("en-US"),
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-sm font-bold text-[#8C2A3E]",
										children: "دج"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 96,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 94,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUpRight, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 99,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									"من ",
									orders.filter((o) => o.status !== "cancelled").length,
									" طلب مؤكد"
								] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 100,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 98,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 93,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 86,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						onClick: () => onTabChange("orders"),
						className: "rounded-2xl bg-[#FAF6F0] p-5 border border-[#E3D4C0] shadow-sm relative overflow-hidden cursor-pointer hover:border-[#2B2119] transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-bold text-[#735A45]",
								children: "طلبات بانتظار التجهيز"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 111,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-9 w-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 113,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 112,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 110,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-2xl font-black text-[#2B2119]",
								children: [
									pendingOrders,
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs text-[#735A45] font-normal",
										children: "طلب"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 118,
										columnNumber: 31
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 117,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-amber-800 font-semibold mt-1",
								children: pendingOrders > 0 ? "يتطلب تأكيداً أو شحناً" : "كل الطلبات مجهزة"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 120,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 116,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 106,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						onClick: () => onTabChange("products"),
						className: "rounded-2xl bg-[#FAF6F0] p-5 border border-[#E3D4C0] shadow-sm relative overflow-hidden cursor-pointer hover:border-[#2B2119] transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-bold text-[#735A45]",
								children: "المنتجات في المتجر"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 132,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-9 w-9 rounded-xl bg-[#EDE0CD] text-[#2B2119] flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 134,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 133,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 131,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-2xl font-black text-[#2B2119]",
								children: [
									products.length,
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs text-[#735A45] font-normal",
										children: "منتج نشط"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 139,
										columnNumber: 33
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 138,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-[#735A45] font-semibold mt-1",
								children: lowStockProducts.length > 0 ? `${lowStockProducts.length} منتجات قاربت على النفاد` : "المخزون ممتاز"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 141,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 137,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 127,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						onClick: () => onTabChange("chat"),
						className: "rounded-2xl bg-[#FAF6F0] p-5 border border-[#E3D4C0] shadow-sm relative overflow-hidden cursor-pointer hover:border-[#2B2119] transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-bold text-[#735A45]",
								children: "محادثات الزبائن"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 155,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-9 w-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 157,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 156,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 154,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-2xl font-black text-[#2B2119]",
								children: [
									conversations.length,
									" ",
									unreadMessagesCount > 0 && /* @__PURE__ */ (void 0)("span", {
										className: "text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold",
										children: [unreadMessagesCount, " جديدة"]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 164,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 161,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-blue-700 font-semibold mt-1",
								children: "الدردشة الحية والمباشرة مع الزبائن"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 169,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 160,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 150,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 84,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "lg:col-span-2 rounded-2xl bg-[#FAF6F0] p-5 sm:p-6 border border-[#E3D4C0] shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between mb-4 pb-3 border-b border-[#E3D4C0]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-base sm:text-lg font-black text-[#2B2119]",
							children: "آخر الطلبات الواردة"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 182,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-[#735A45]",
							children: "متابعة وتحديث طلبات التوصيل للولايات"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 185,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 181,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => onTabChange("orders"),
							className: "text-xs font-bold text-[#8C2A3E] hover:underline",
							children: [
								"عرض كافة الطلبات (",
								orders.length,
								") ←"
							]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 187,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 180,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3",
						children: orders.slice(0, 4).map((order) => {
							const statusBadge = order.status === "pending" ? {
								label: "جديد",
								bg: "bg-amber-100 text-amber-900 border-amber-300"
							} : order.status === "processing" ? {
								label: "قيد التجهيز",
								bg: "bg-blue-100 text-blue-900 border-blue-300"
							} : order.status === "shipped" ? {
								label: "تم الشحن",
								bg: "bg-purple-100 text-purple-900 border-purple-300"
							} : order.status === "delivered" ? {
								label: "مكتمل",
								bg: "bg-emerald-100 text-emerald-900 border-emerald-300"
							} : {
								label: "ملغى",
								bg: "bg-red-100 text-red-900 border-red-300"
							};
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								onClick: () => {
									onSelectOrder(order);
									onTabChange("orders");
								},
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-[#E8DC CE] hover:border-[#2B2119] transition-all cursor-pointer shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "h-10 w-10 shrink-0 rounded-xl bg-[#EDE0CD] text-[#2B2119] font-bold text-xs flex items-center justify-center border border-[#D5C2AA]",
										children: ["#", order.orderNumber.replace("HS-", "")]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 221,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-bold text-sm text-[#2B2119]",
											children: order.customerName
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 226,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: `text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadge.bg}`,
											children: statusBadge.label
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 229,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 225,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-[#735A45] mt-0.5",
										children: [
											order.wilaya,
											" • ",
											order.items.length,
											" قطع • ",
											order.createdAt
										]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 235,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 224,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 220,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-[#F0E6D8]",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-black text-sm text-[#2B2119]",
										dir: "ltr",
										children: [order.grandTotal.toLocaleString("en-US"), " دج"]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 242,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										className: "px-2.5 py-1 rounded-lg bg-[#FAF6F0] border border-[#D5C2AA] text-xs font-semibold text-[#2B2119] hover:bg-[#EDE0CD]",
										children: "تفاصيل"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 245,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 241,
									columnNumber: 19
								}, this)]
							}, order.id, true, {
								fileName: _jsxFileName$6,
								lineNumber: 212,
								columnNumber: 17
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 195,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 179,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl bg-[#FAF6F0] p-5 border border-[#E3D4C0] shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 text-[#8C2A3E] font-bold text-sm mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 260,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "تنبيهات المخزون" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 261,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 259,
							columnNumber: 13
						}, this), lowStockProducts.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2.5",
							children: lowStockProducts.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-[#E8DCCE]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2.5 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: p.image,
										alt: p.name,
										className: "h-9 w-9 rounded-lg object-cover border border-[#D5C2AA]"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 272,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs font-bold text-[#2B2119] truncate",
											children: p.name
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 278,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-[11px] text-red-700 font-semibold",
											children: [
												"باقي ",
												p.stock,
												" قطع فقط"
											]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 279,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 277,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 271,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => onTabChange("products"),
									className: "px-2 py-1 rounded-lg bg-[#EDE0CD] text-[11px] font-bold text-[#2B2119] hover:bg-[#D5C2AA] shrink-0",
									children: "تعديل"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 284,
									columnNumber: 21
								}, this)]
							}, p.id, true, {
								fileName: _jsxFileName$6,
								lineNumber: 267,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 265,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-[#735A45]",
							children: "جميع المنتجات متوفرة بكميات كافية."
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 294,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 258,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl bg-[#EDE0CD] p-5 border border-[#D5C2AA]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
							className: "font-bold text-sm text-[#2B2119] mb-2",
							children: "إجراءات سريعة للمدير"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 300,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2 text-xs font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => onTabChange("categories"),
									className: "w-full flex items-center justify-between p-2.5 rounded-xl bg-white/90 hover:bg-white text-[#2B2119] transition-all border border-[#D5C2AA] font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { className: "h-4 w-4 text-[#8C2A3E]" }, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 307,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "تغيير صور وبنرات أقسام المتجر" }, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 308,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 306,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "←" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 310,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 302,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => onTabChange("products"),
									className: "w-full flex items-center justify-between p-2.5 rounded-xl bg-white/80 hover:bg-white text-[#2B2119] transition-all",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "تغيير أسعار أو صور المنتجات" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 316,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "←" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 317,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 312,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => onTabChange("chat"),
									className: "w-full flex items-center justify-between p-2.5 rounded-xl bg-white/80 hover:bg-white text-[#2B2119] transition-all",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "الرد على استفسارات الزبائن" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 323,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "←" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 324,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 319,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 301,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 299,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 256,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 177,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 42,
		columnNumber: 5
	}, this);
}
var _jsxFileName$5 = "/app/applet/src/components/admin/AdminProducts.tsx";
var CATEGORY_MAP = {
	abayas: "العبايات",
	dresses: "الفساتين",
	khimar: "الخمار",
	isdalat: "الإسدالات",
	accessories: "الإكسسوارات",
	"hijab-supplies": "مستلزمات الحجاب",
	sales: "تخفيضات"
};
var DEFAULT_IMAGE_OPTIONS = [
	"/images/products/product-1.jpg",
	"/images/products/product-2.jpg",
	"/images/products/product-3.jpg",
	"/images/products/product-4.jpg",
	"/images/products/product-5.jpg",
	"/images/products/product-6.jpg",
	"/images/products/product-7.jpg",
	"/images/products/product-8.jpg",
	"/images/accessories/akiki-cream-bag.jpg",
	"/images/accessories/lady-white-bag.jpg",
	"/images/accessories/embroidered-evening-bag.jpg",
	"/images/accessories/sage-green-crossbody.jpg",
	"/images/accessories/pearl-branch-headband.jpg",
	"/images/accessories/butterfly-hair-claw.jpg",
	"/images/accessories/pastel-flower-headband.jpg",
	"/images/accessories/amethyst-flower-necklace.jpg",
	"/images/accessories/pastel-stacking-rings.jpg",
	"/images/accessories/blue-beaded-bracelet.jpg",
	"/images/accessories/pandora-vine-bracelet.jpg",
	"/images/accessories/pink-gem-bracelet.jpg",
	"/images/accessories/luxury-bangle-stack.jpg",
	"/images/accessories/modest-wrist-cuffs.jpg",
	"/images/abayas/black-floral-embroidered.jpg",
	"/images/abayas/burgundy-silver-embroidery.jpg",
	"/images/abayas/black-beaded-branch.jpg",
	"/images/abayas/crystal-sparkle-black.jpg",
	"/images/abayas/sage-green-crystal.jpg",
	"/images/abayas/burgundy-pearl-lace.jpg",
	"/images/abayas/ivory-watercolor-floral.jpg",
	"/images/abayas/chocolate-brown-cape.jpg",
	"/images/hijabs/black-silk-chiffon.jpg",
	"/images/hijabs/pearl-beaded-shawls.jpg",
	"/images/hijabs/metallic-bead-grey.jpg",
	"/images/hijabs/instant-beige-crepe.jpg",
	"/images/hijabs/rainbow-ladder-palette.jpg",
	"/images/hijabs/burgundy-jersey-instant.jpg",
	"/images/isdalat/pastel-blue-white.jpg",
	"/images/isdalat/layered-grey-black.jpg",
	"/images/isdalat/royal-blue-white.jpg",
	"/images/isdalat/chocolate-black-isdal.jpg",
	"/images/isdalat/tiered-chocolate-isdal.jpg",
	"/images/dresses/grey_linen.jpg",
	"/images/dresses/floral_chiffon.jpg",
	"/images/dresses/vintage_green.jpg",
	"/images/dresses/mauve_crepe.jpg",
	"/images/dresses/chocolate_cape.jpg",
	"/images/dresses/blush_couture.jpg",
	"/images/dresses/burgundy_tiered.jpg",
	"/images/dresses/lavender_vintage.jpg",
	"/images/dresses/white_cape_bridal.jpg",
	"/images/dresses/lilac_evening_set.jpg",
	"/images/dresses/chocolate_bell_sleeve.jpg",
	"/images/dresses/sage_tiered_set.jpg"
];
function AdminProducts({ products, onUpdateProduct, onAddProduct, onDeleteProduct }) {
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("all");
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [editingProduct, setEditingProduct] = (0, import_react.useState)(null);
	const [deleteConfirmId, setDeleteConfirmId] = (0, import_react.useState)(null);
	const [saveToast, setSaveToast] = (0, import_react.useState)(null);
	const [formName, setFormName] = (0, import_react.useState)("");
	const [formPrice, setFormPrice] = (0, import_react.useState)(3500);
	const [formOriginalPrice, setFormOriginalPrice] = (0, import_react.useState)(void 0);
	const [formImage, setFormImage] = (0, import_react.useState)("/images/products/product-1.jpg");
	const [formCategory, setFormCategory] = (0, import_react.useState)("dresses");
	const [formStock, setFormStock] = (0, import_react.useState)(10);
	const [formDescription, setFormDescription] = (0, import_react.useState)("");
	const fileInputRef = (0, import_react.useRef)(null);
	const openCreateModal = () => {
		setEditingProduct(null);
		setFormName("");
		setFormPrice(3500);
		setFormOriginalPrice(void 0);
		setFormImage("/images/products/product-1.jpg");
		setFormCategory("dresses");
		setFormStock(15);
		setFormDescription("");
		setIsModalOpen(true);
	};
	const openEditModal = (product) => {
		setEditingProduct(product);
		setFormName(product.name);
		setFormPrice(product.price);
		setFormOriginalPrice(product.originalPrice);
		setFormImage(product.image);
		setFormCategory(product.category);
		setFormStock(product.stock);
		setFormDescription(product.description || "");
		setIsModalOpen(true);
	};
	const handleFileUpload = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				if (typeof reader.result === "string") setFormImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formName.trim()) return;
		if (editingProduct) {
			onUpdateProduct({
				...editingProduct,
				name: formName.trim(),
				price: Number(formPrice),
				originalPrice: formOriginalPrice ? Number(formOriginalPrice) : void 0,
				image: formImage,
				category: formCategory,
				stock: Number(formStock),
				description: formDescription.trim()
			});
			showToast("تم تحديث المنتج بنجاح!");
		} else {
			onAddProduct({
				name: formName.trim(),
				price: Number(formPrice),
				originalPrice: formOriginalPrice ? Number(formOriginalPrice) : void 0,
				image: formImage,
				category: formCategory,
				stock: Number(formStock),
				href: `/${formCategory}`,
				description: formDescription.trim()
			});
			showToast("تمت إضافة المنتج الجديد بنجاح إلى المتجر!");
		}
		setIsModalOpen(false);
	};
	const showToast = (msg) => {
		setSaveToast(msg);
		setTimeout(() => setSaveToast(null), 3e3);
	};
	const filteredProducts = products.filter((p) => {
		const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.price.toString().includes(searchQuery);
		const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			saveToast && /* @__PURE__ */ (void 0)("div", {
				className: "fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-2xl bg-[#2B2119] text-white px-5 py-3 shadow-2xl border border-[#D5C2AA] text-sm animate-in slide-in-from-bottom-5",
				children: [/* @__PURE__ */ (void 0)(Check, { className: "h-4 w-4 text-emerald-400 shrink-0" }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 200,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("span", { children: saveToast }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 201,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 199,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl sm:text-2xl font-black text-[#2B2119]",
					children: "إدارة المنتجات والأسعار"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 208,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs sm:text-sm text-[#735A45]",
					children: "تعديل صور المنتجات، تغيير الأسعار (دج)، وتحديث المخزون"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 209,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 207,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: openCreateModal,
					className: "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2B2119] text-white font-bold text-xs sm:text-sm hover:bg-[#433225] active:scale-95 transition-all shadow-md cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 218,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "إضافة منتج جديد" }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 219,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 214,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 206,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-[#FAF6F0] p-4 rounded-2xl border border-[#E3D4C0]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#735A45]" }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 226,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "text",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						placeholder: "البحث بالاسم أو السعر ..",
						className: "w-full pr-10 pl-4 py-2 text-xs sm:text-sm rounded-xl border border-[#D5C2AA] bg-white text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none focus:border-[#2B2119]"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 227,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 225,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 overflow-x-auto pb-1 md:pb-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setSelectedCategory("all"),
						className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === "all" ? "bg-[#2B2119] text-white shadow-xs" : "bg-white text-[#735A45] border border-[#D5C2AA] hover:bg-[#EDE0CD]"}`,
						children: [
							"الكل (",
							products.length,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 237,
						columnNumber: 11
					}, this), Object.entries(CATEGORY_MAP).map(([key, label]) => {
						const count = products.filter((p) => p.category === key).length;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setSelectedCategory(key),
							className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === key ? "bg-[#2B2119] text-white shadow-xs" : "bg-white text-[#735A45] border border-[#D5C2AA] hover:bg-[#EDE0CD]"}`,
							children: [
								label,
								" (",
								count,
								")"
							]
						}, key, true, {
							fileName: _jsxFileName$5,
							lineNumber: 250,
							columnNumber: 15
						}, this);
					})]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 236,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 224,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6",
				children: filteredProducts.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "group relative rounded-2xl bg-[#FAF6F0] p-3.5 sm:p-4 border border-[#E3D4C0] shadow-sm hover:shadow-md hover:border-[#2B2119] transition-all flex flex-col justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative aspect-4/5 w-full overflow-hidden rounded-xl bg-[#EDE0CD] mb-3 border border-[#D5C2AA]",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: product.image,
									alt: product.name,
									className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 275,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-[#2B2119]/80 backdrop-blur-xs text-[11px] font-bold text-white",
									children: CATEGORY_MAP[product.category] || product.category
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 280,
									columnNumber: 15
								}, this),
								product.stock <= 8 && /* @__PURE__ */ (void 0)("span", {
									className: "absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-red-600 text-[10px] font-bold text-white shadow-sm",
									children: [
										"مخزون قليل (",
										product.stock,
										")"
									]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 285,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 274,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "font-bold text-sm sm:text-base text-[#2B2119] line-clamp-1",
									children: product.name
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 293,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-baseline gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-black text-base text-[#8C2A3E]",
										dir: "ltr",
										children: [product.price.toLocaleString("en-US"), " دج"]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 298,
										columnNumber: 17
									}, this), product.originalPrice && product.originalPrice > product.price && /* @__PURE__ */ (void 0)("span", {
										className: "text-xs text-[#9F8A77] line-through",
										dir: "ltr",
										children: [product.originalPrice.toLocaleString("en-US"), " دج"]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 302,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 297,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11px] text-[#735A45] flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
										"المتوفر: ",
										product.stock,
										" قطعة"
									] }, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 309,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[10px] text-[#9F8A77]",
										children: ["كود: ", product.id]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 310,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 308,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 292,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 pt-3 border-t border-[#E3D4C0] flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => openEditModal(product),
								className: "flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] active:scale-95 transition-all shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pen, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 321,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "تعديل السعر والصورة" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 322,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 316,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								"aria-label": "حذف المنتج",
								onClick: () => setDeleteConfirmId(product.id),
								className: "p-2 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 active:scale-95 transition-all",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 331,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 325,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 315,
							columnNumber: 13
						}, this)
					]
				}, product.id, true, {
					fileName: _jsxFileName$5,
					lineNumber: 269,
					columnNumber: 11
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 267,
				columnNumber: 7
			}, this),
			filteredProducts.length === 0 && /* @__PURE__ */ (void 0)("div", {
				className: "text-center py-16 bg-[#FAF6F0] rounded-2xl border border-dashed border-[#D5C2AA]",
				children: [/* @__PURE__ */ (void 0)("p", {
					className: "text-sm font-bold text-[#735A45]",
					children: "لا توجد منتجات مطابقة للبحث"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 340,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("button", {
					onClick: () => {
						setSearchQuery("");
						setSelectedCategory("all");
					},
					className: "mt-3 px-4 py-2 rounded-xl bg-[#EDE0CD] text-xs font-bold text-[#2B2119]",
					children: "إعادة تعيين الفلاتر"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 341,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 339,
				columnNumber: 9
			}, this),
			deleteConfirmId && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "w-full max-w-sm rounded-2xl bg-[#FAF6F0] p-6 border border-[#E3D4C0] shadow-2xl text-center space-y-4",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "h-12 w-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto",
							children: /* @__PURE__ */ (void 0)(TriangleAlert, { className: "h-6 w-6" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 358,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 357,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("h3", {
							className: "font-black text-lg text-[#2B2119]",
							children: "هل أنتِ متأكدة من حذف المنتج؟"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 360,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-[#735A45]",
							children: "سيتم إزالة المنتج نهائياً من المتجر ولن يتمكن الزبائن من طلبه."
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 361,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2 pt-2",
							children: [/* @__PURE__ */ (void 0)("button", {
								onClick: () => {
									onDeleteProduct(deleteConfirmId);
									setDeleteConfirmId(null);
									showToast("تم حذف المنتج بنجاح");
								},
								className: "flex-1 py-2.5 rounded-xl bg-red-700 text-white text-xs font-bold hover:bg-red-800 transition-all",
								children: "نعم، احذف المنتج"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 365,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: () => setDeleteConfirmId(null),
								className: "flex-1 py-2.5 rounded-xl border border-[#D5C2AA] bg-white text-xs font-bold text-[#2B2119] hover:bg-[#EDE0CD] transition-all",
								children: "إلغاء"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 375,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 364,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 356,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 355,
				columnNumber: 9
			}, this),
			isModalOpen && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in",
				children: /* @__PURE__ */ (void 0)("div", {
					dir: "rtl",
					className: "relative w-full max-w-lg rounded-2xl bg-[#FAF6F0] p-6 sm:p-7 border border-[#E3D4C0] shadow-2xl my-8 text-[#2B2119]",
					style: { backgroundImage: "linear-gradient(180deg, #FCF9F4 0%, #F5EDE0 100%)" },
					children: [
						/* @__PURE__ */ (void 0)("button", {
							onClick: () => setIsModalOpen(false),
							className: "absolute top-4 left-4 h-8 w-8 rounded-full bg-[#EDE0CD] flex items-center justify-center text-[#2B2119] hover:bg-[#D5C2AA]",
							children: /* @__PURE__ */ (void 0)(X, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 400,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 396,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2 mb-4",
							children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "h-5 w-5 text-[#8C2A3E]" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 404,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("h3", {
								className: "text-lg sm:text-xl font-black text-[#2B2119]",
								children: editingProduct ? `تعديل: ${editingProduct.name}` : "إضافة منتج جديد للمتجر"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 405,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 403,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("form", {
							onSubmit: handleSubmit,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "p-3.5 rounded-xl bg-white border border-[#D5C2AA] space-y-3",
									children: [
										/* @__PURE__ */ (void 0)("label", {
											className: "block text-xs font-bold text-[#423124]",
											children: ["صورة المنتج ", /* @__PURE__ */ (void 0)("span", {
												className: "text-[#8C2A3E]",
												children: "*"
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 414,
												columnNumber: 31
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 413,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-4",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "relative h-24 w-20 shrink-0 rounded-xl overflow-hidden border border-[#D5C2AA] bg-[#EDE0CD]",
												children: /* @__PURE__ */ (void 0)("img", {
													src: formImage,
													alt: "معاينة",
													className: "h-full w-full object-cover"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 419,
													columnNumber: 21
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 418,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "space-y-2 flex-1 min-w-0",
												children: [
													/* @__PURE__ */ (void 0)("input", {
														type: "file",
														ref: fileInputRef,
														onChange: handleFileUpload,
														accept: "image/*",
														className: "hidden"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 423,
														columnNumber: 21
													}, this),
													/* @__PURE__ */ (void 0)("button", {
														type: "button",
														onClick: () => fileInputRef.current?.click(),
														className: "w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#EDE0CD] text-xs font-bold text-[#2B2119] hover:bg-[#D5C2AA] transition-all",
														children: [/* @__PURE__ */ (void 0)(Upload, { className: "h-3.5 w-3.5" }, void 0, false, {
															fileName: _jsxFileName$5,
															lineNumber: 435,
															columnNumber: 23
														}, this), /* @__PURE__ */ (void 0)("span", { children: "رفع صورة من الجهاز" }, void 0, false, {
															fileName: _jsxFileName$5,
															lineNumber: 436,
															columnNumber: 23
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$5,
														lineNumber: 430,
														columnNumber: 21
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "text-[11px] text-[#735A45]",
														children: "أو اختاري صورة من مكتبة حجاب سول:"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 439,
														columnNumber: 21
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "flex items-center gap-1.5 overflow-x-auto pb-1",
														children: DEFAULT_IMAGE_OPTIONS.map((imgUrl, idx) => /* @__PURE__ */ (void 0)("button", {
															type: "button",
															onClick: () => setFormImage(imgUrl),
															className: `h-7 w-7 rounded-md overflow-hidden shrink-0 border-2 transition-all ${formImage === imgUrl ? "border-[#8C2A3E] scale-110" : "border-transparent opacity-60"}`,
															children: /* @__PURE__ */ (void 0)("img", {
																src: imgUrl,
																alt: "",
																className: "h-full w-full object-cover"
															}, void 0, false, {
																fileName: _jsxFileName$5,
																lineNumber: 455,
																columnNumber: 27
															}, this)
														}, idx, false, {
															fileName: _jsxFileName$5,
															lineNumber: 445,
															columnNumber: 25
														}, this))
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 443,
														columnNumber: 21
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName$5,
												lineNumber: 422,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 417,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: /* @__PURE__ */ (void 0)("input", {
											type: "text",
											value: formImage.startsWith("data:") ? "صورة مخصصة مرفوعة" : formImage,
											onChange: (e) => setFormImage(e.target.value),
											placeholder: "أو الصقي رابط URL للصورة هنا ..",
											className: "w-full rounded-lg border border-[#D5C2AA] px-3 py-1.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none",
											dir: "ltr"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 463,
											columnNumber: 19
										}, this) }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 462,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 412,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: ["اسم المنتج ", /* @__PURE__ */ (void 0)("span", {
										className: "text-[#8C2A3E]",
										children: "*"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 477,
										columnNumber: 30
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 476,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "text",
									required: true,
									value: formName,
									onChange: (e) => setFormName(e.target.value),
									placeholder: "مثال: فستان كريب شتوي فاخر",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 479,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 475,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "block text-xs font-bold text-[#423124] mb-1",
										children: ["السعر الحالي (دج) ", /* @__PURE__ */ (void 0)("span", {
											className: "text-[#8C2A3E]",
											children: "*"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 493,
											columnNumber: 39
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 492,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "number",
										required: true,
										min: 100,
										step: 100,
										value: formPrice,
										onChange: (e) => setFormPrice(Number(e.target.value)),
										className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] font-bold focus:outline-none focus:border-[#2B2119]",
										dir: "ltr"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 495,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 491,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "block text-xs font-bold text-[#423124] mb-1",
										children: "السعر قبل التخفيض (اختياري)"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 508,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "number",
										min: 0,
										step: 100,
										value: formOriginalPrice || "",
										onChange: (e) => setFormOriginalPrice(e.target.value ? Number(e.target.value) : void 0),
										placeholder: "مثال: 4500",
										className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]",
										dir: "ltr"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 511,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 507,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 490,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "block text-xs font-bold text-[#423124] mb-1",
										children: ["القسم / التصنيف ", /* @__PURE__ */ (void 0)("span", {
											className: "text-[#8C2A3E]",
											children: "*"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 530,
											columnNumber: 37
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 529,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("select", {
										value: formCategory,
										onChange: (e) => setFormCategory(e.target.value),
										className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] font-bold focus:outline-none focus:border-[#2B2119]",
										children: Object.entries(CATEGORY_MAP).map(([key, label]) => /* @__PURE__ */ (void 0)("option", {
											value: key,
											children: label
										}, key, false, {
											fileName: _jsxFileName$5,
											lineNumber: 538,
											columnNumber: 23
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 532,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 528,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "block text-xs font-bold text-[#423124] mb-1",
										children: ["كمية المخزون (قطعة) ", /* @__PURE__ */ (void 0)("span", {
											className: "text-[#8C2A3E]",
											children: "*"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 547,
											columnNumber: 41
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 546,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "number",
										min: 0,
										value: formStock,
										onChange: (e) => setFormStock(Number(e.target.value)),
										className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] font-bold focus:outline-none focus:border-[#2B2119]",
										dir: "ltr"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 549,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 545,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 527,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "وصف المنتج ومميزاته"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 562,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("textarea", {
									rows: 2,
									value: formDescription,
									onChange: (e) => setFormDescription(e.target.value),
									placeholder: "نوع القماش، المقاسات المتوفرة، تفاصيل الخياطة ..",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 565,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 561,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-3 pt-2",
									children: [/* @__PURE__ */ (void 0)("button", {
										type: "submit",
										className: "flex-1 py-2.5 rounded-xl bg-[#2B2119] text-white text-xs sm:text-sm font-bold hover:bg-[#433225] active:scale-98 transition-all shadow-md cursor-pointer",
										children: editingProduct ? "حفظ التغييرات" : "إضافة المنتج للمتجر"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 576,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setIsModalOpen(false),
										className: "px-4 py-2.5 rounded-xl border border-[#D5C2AA] bg-white text-xs sm:text-sm font-bold text-[#2B2119] hover:bg-[#EDE0CD]",
										children: "إلغاء"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 582,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 575,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 410,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 389,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 388,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 196,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/admin/AdminCategories.tsx";
function AdminCategories({ categories, heroBanner, onUpdateCategory, onAddCategory, onDeleteCategory, onResetCategories, onUpdateHeroBanner }) {
	const [activeImagePickerCat, setActiveImagePickerCat] = (0, import_react.useState)(null);
	const [isHeroModalOpen, setIsHeroModalOpen] = (0, import_react.useState)(false);
	const [heroInputUrl, setHeroInputUrl] = (0, import_react.useState)(heroBanner || "");
	const [editingCategory, setEditingCategory] = (0, import_react.useState)(null);
	const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = (0, import_react.useState)(false);
	const [formName, setFormName] = (0, import_react.useState)("");
	const [formHref, setFormHref] = (0, import_react.useState)("");
	const [formImage, setFormImage] = (0, import_react.useState)("");
	const [formBannerImage, setFormBannerImage] = (0, import_react.useState)("");
	const [formDescription, setFormDescription] = (0, import_react.useState)("");
	const [formOrder, setFormOrder] = (0, import_react.useState)(1);
	const [formIsActive, setFormIsActive] = (0, import_react.useState)(true);
	const [modalTab, setModalTab] = (0, import_react.useState)("upload");
	const [urlInput, setUrlInput] = (0, import_react.useState)("");
	const [presetFilter, setPresetFilter] = (0, import_react.useState)("all");
	const [isUploading, setIsUploading] = (0, import_react.useState)(false);
	const [uploadError, setUploadError] = (0, import_react.useState)(null);
	const [toastMessage, setToastMessage] = (0, import_react.useState)(null);
	const fileInputRef = (0, import_react.useRef)(null);
	const heroFileInputRef = (0, import_react.useRef)(null);
	const showToast = (msg) => {
		setToastMessage(msg);
		setTimeout(() => setToastMessage(null), 2500);
	};
	const openImagePicker = (category, targetField) => {
		setActiveImagePickerCat({
			category,
			targetField
		});
		const currentVal = targetField === "image" ? category.image : category.bannerImage || "";
		setUrlInput(currentVal);
		setModalTab("upload");
		setUploadError(null);
	};
	const handleFileChange = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			setUploadError("يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).");
			return;
		}
		try {
			setIsUploading(true);
			setUploadError(null);
			const compressedDataUrl = await compressImageFile(file, 1e3, .85);
			if (activeImagePickerCat) {
				onUpdateCategory(activeImagePickerCat.category.id, { [activeImagePickerCat.targetField]: compressedDataUrl });
				showToast(activeImagePickerCat.targetField === "image" ? `تم تحديث صورة قسم "${activeImagePickerCat.category.name}" بنجاح!` : `تم تحديث بنر قسم "${activeImagePickerCat.category.name}" بنجاح!`);
				setActiveImagePickerCat(null);
			}
		} catch {
			setUploadError("حدث خطأ أثناء معالجة الصورة، يرجى المحاولة مرة أخرى.");
		} finally {
			setIsUploading(false);
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	};
	const handleApplyUrl = (e) => {
		e.preventDefault();
		if (!urlInput.trim() || !activeImagePickerCat) return;
		onUpdateCategory(activeImagePickerCat.category.id, { [activeImagePickerCat.targetField]: urlInput.trim() });
		showToast(`تم تحديث الصورة للقسم بنجاح!`);
		setActiveImagePickerCat(null);
	};
	const handleSelectPreset = (presetUrl) => {
		if (!activeImagePickerCat) return;
		onUpdateCategory(activeImagePickerCat.category.id, { [activeImagePickerCat.targetField]: presetUrl });
		showToast(`تم اختيار الصورة للقسم بنجاح!`);
		setActiveImagePickerCat(null);
	};
	const handleHeroFileUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		try {
			setIsUploading(true);
			onUpdateHeroBanner(await compressImageFile(file, 1400, .88));
			showToast("تم تحديث بنر الواجهة الرئيسية بنجاح!");
			setIsHeroModalOpen(false);
		} catch {
			alert("تعذر رفع الصورة");
		} finally {
			setIsUploading(false);
			if (heroFileInputRef.current) heroFileInputRef.current.value = "";
		}
	};
	const openEditModal = (cat) => {
		setEditingCategory(cat);
		setFormName(cat.name);
		setFormHref(cat.href);
		setFormImage(cat.image);
		setFormBannerImage(cat.bannerImage || "");
		setFormDescription(cat.description || "");
		setFormOrder(cat.order);
		setFormIsActive(cat.isActive);
		setIsNewCategoryModalOpen(true);
	};
	const openCreateModal = () => {
		setEditingCategory(null);
		setFormName("");
		setFormHref("");
		setFormImage("/images/categories/dresses.jpg");
		setFormBannerImage("");
		setFormDescription("");
		setFormOrder(categories.length + 1);
		setFormIsActive(true);
		setIsNewCategoryModalOpen(true);
	};
	const handleSaveCategoryForm = (e) => {
		e.preventDefault();
		if (!formName.trim()) {
			alert("يرجى إدخال اسم القسم");
			return;
		}
		const path = formHref.trim().startsWith("/") ? formHref.trim() : `/${formHref.trim().replace(/\s+/g, "-").toLowerCase()}`;
		if (editingCategory) {
			onUpdateCategory(editingCategory.id, {
				name: formName.trim(),
				href: path,
				image: formImage.trim() || "/images/categories/dresses.jpg",
				bannerImage: formBannerImage.trim() || void 0,
				description: formDescription.trim(),
				order: Number(formOrder),
				isActive: formIsActive
			});
			showToast(`تم تعديل قسم "${formName}" بنجاح!`);
		} else {
			onAddCategory({
				id: formName.trim().replace(/\s+/g, "-").toLowerCase() || `cat-${Date.now()}`,
				name: formName.trim(),
				href: path,
				image: formImage.trim() || "/images/categories/dresses.jpg",
				bannerImage: formBannerImage.trim() || void 0,
				alt: `${formName} محتشمة وراقية - حجاب سول`,
				description: formDescription.trim(),
				order: Number(formOrder),
				isActive: formIsActive
			});
			showToast(`تمت إضافة القسم الجديد "${formName}" بنجاح!`);
		}
		setIsNewCategoryModalOpen(false);
	};
	const filteredPresets = presetFilter === "all" ? CURATED_IMAGE_PRESETS : CURATED_IMAGE_PRESETS.filter((p) => p.category === presetFilter);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6 max-w-6xl",
		children: [
			toastMessage && /* @__PURE__ */ (void 0)("div", {
				className: "fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-2xl bg-[#2B2119] text-white px-5 py-3 shadow-2xl border border-[#D5C2AA] text-sm animate-in slide-in-from-bottom-5",
				children: [/* @__PURE__ */ (void 0)(Check, { className: "h-4 w-4 text-emerald-400 shrink-0" }, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 242,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("span", { children: toastMessage }, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 243,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 241,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { className: "h-6 w-6 text-[#8C2A3E]" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 251,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl sm:text-2xl font-black text-[#2B2119]",
						children: "إدارة الأقسام والصور (Sections & Categories)"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 252,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 250,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs sm:text-sm text-[#735A45] mt-1",
					children: "تخصيص صور بطاقات الأقسام في شريط الواجهة الرئيسية، بنرات الصفحات، وإضافة أقسام جديدة"
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 256,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 249,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center gap-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setIsHeroModalOpen(true),
							className: "flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#2B2119] border border-[#D5C2AA] text-xs font-bold hover:bg-[#EDE0CD] transition-all shadow-xs cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-3.5 w-3.5 text-[#8C2A3E]" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 266,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "تغيير بنر الواجهة الرئيسية" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 267,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 262,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: openCreateModal,
							className: "flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] transition-all shadow-sm cursor-pointer active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 274,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "إضافة قسم جديد" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 275,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 270,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => {
								if (confirm("هل تريدين استعادة الصور والتصنيفات الافتراضية الأصلية للمتجر؟")) {
									onResetCategories();
									showToast("تمت استعادة التصنيفات الافتراضية بنجاح!");
								}
							},
							title: "استعادة الصور الافتراضية",
							className: "p-2 rounded-xl bg-[#FAF6F0] text-[#735A45] border border-[#D5C2AA] hover:text-[#2B2119] hover:bg-[#EDE0CD] transition-all cursor-pointer",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 288,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 278,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 261,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 248,
				columnNumber: 7
			}, this),
			heroBanner && /* @__PURE__ */ (void 0)("div", {
				className: "rounded-2xl bg-[#FAF6F0] p-4 border border-[#D5C2AA] flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-3 min-w-0",
					children: [/* @__PURE__ */ (void 0)("img", {
						src: heroBanner,
						alt: "بنر الواجهة الرئيسية المخصص",
						className: "h-12 w-24 object-cover rounded-lg border border-[#D5C2AA] shrink-0"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 297,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (void 0)("span", {
							className: "text-xs font-bold text-[#2B2119] block",
							children: "بنر الواجهة الرئيسية مخصص حالياً"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 303,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "text-[11px] text-[#735A45] truncate block",
							children: "يظهر هذا البنر في أعلى الصفحة الرئيسية للمتجر"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 306,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 302,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 296,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ (void 0)("button", {
						onClick: () => setIsHeroModalOpen(true),
						className: "px-3 py-1.5 rounded-lg bg-[#EDE0CD] text-xs font-bold text-[#2B2119] hover:bg-[#D5C2AA]",
						children: "تعديل"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 312,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("button", {
						onClick: () => {
							onUpdateHeroBanner(null);
							showToast("تمت استعادة البنر الافتراضي للواجهة");
						},
						className: "px-2.5 py-1.5 rounded-lg text-xs font-bold text-red-700 hover:bg-red-50",
						children: "إلغاء المخصص"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 318,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 311,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 295,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
				children: categories.map((cat, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: `rounded-2xl bg-[#FAF6F0] p-4 sm:p-5 border transition-all duration-200 shadow-sm flex flex-col justify-between ${cat.isActive ? "border-[#E3D4C0]" : "border-dashed border-[#D5C2AA] opacity-75"}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between gap-2 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex h-6 w-6 items-center justify-center rounded-full bg-[#EDE0CD] text-[11px] font-bold text-[#2B2119] border border-[#D5C2AA]",
								children: idx + 1
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 344,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-base font-black text-[#2B2119]",
								children: cat.name
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 347,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 343,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => onUpdateCategory(cat.id, { isActive: !cat.isActive }),
									className: `px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${cat.isActive ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-gray-200 text-gray-700 border border-gray-300"}`,
									children: cat.isActive ? "ظاهر بالمتجر ✓" : "مخفي"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 351,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => openEditModal(cat),
									className: "p-1.5 rounded-lg text-[#735A45] hover:bg-[#EDE0CD] hover:text-[#2B2119] transition-colors",
									title: "تعديل بيانات القسم",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pen, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 367,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 362,
									columnNumber: 19
								}, this),
								categories.length > 1 && /* @__PURE__ */ (void 0)("button", {
									onClick: () => {
										if (confirm(`هل أنتِ متأكدة من حذف قسم "${cat.name}"؟`)) {
											onDeleteCategory(cat.id);
											showToast(`تم حذف قسم "${cat.name}"`);
										}
									},
									className: "p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors",
									title: "حذف القسم",
									children: /* @__PURE__ */ (void 0)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 381,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 371,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 350,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 342,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative group rounded-xl overflow-hidden bg-[#EDE0CD] aspect-[4/3] border border-[#D5C2AA]",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: cat.image,
									alt: cat.name,
									className: "h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105",
									onError: (e) => {
										e.target.src = "/images/categories/dresses.jpg";
									}
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 390,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-3 text-white",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => openImagePicker(cat, "image"),
										className: "px-3.5 py-1.5 rounded-xl bg-white text-[#2B2119] text-xs font-bold shadow-md hover:bg-[#FAF6F0] flex items-center gap-1.5 transition-transform active:scale-95",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "h-3.5 w-3.5 text-[#8C2A3E]" }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 406,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "تغيير صورة القسم" }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 407,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 402,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 401,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-[#E2D0AC]/95 backdrop-blur-xs text-center border border-[#D5C2AA]/80 shadow-xs",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-hand font-extrabold text-xs text-[#3B2A1A] truncate block",
										children: cat.name
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 413,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 412,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 389,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs text-[#5A412F] space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "line-clamp-1 font-medium",
								children: cat.description || "بدون وصف إضافي"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 421,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] font-mono text-[#8C7665] dir-ltr text-right",
								children: ["الرابط: ", cat.href]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 422,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 420,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 388,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 341,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-4 pt-3 border-t border-[#E3D4C0] flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => openImagePicker(cat, "image"),
							className: "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] transition-all active:scale-98 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Image, { className: "h-3.5 w-3.5 text-[#E2D0AC]" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 435,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "تغيير الصورة" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 436,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 431,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => openImagePicker(cat, "bannerImage"),
							className: "flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl bg-white border border-[#D5C2AA] text-xs font-semibold text-[#2B2119] hover:bg-[#EDE0CD] transition-all cursor-pointer",
							title: "تخصيص بنر رأس الصفحة لهذا القسم",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "بنر الصفحة" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 444,
								columnNumber: 17
							}, this), cat.bannerImage && /* @__PURE__ */ (void 0)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-600" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 445,
								columnNumber: 37
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 439,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 430,
						columnNumber: 13
					}, this)]
				}, cat.id, true, {
					fileName: _jsxFileName$4,
					lineNumber: 334,
					columnNumber: 11
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 332,
				columnNumber: 7
			}, this),
			activeImagePickerCat && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto",
				children: /* @__PURE__ */ (void 0)("div", {
					dir: "rtl",
					className: "relative w-full max-w-2xl rounded-3xl bg-[#FAF6F0] p-5 sm:p-7 shadow-2xl border border-[#D5C2AA] text-[#2B2119] my-6 max-h-[90vh] flex flex-col",
					children: [
						/* @__PURE__ */ (void 0)("button", {
							onClick: () => setActiveImagePickerCat(null),
							className: "absolute top-4 left-4 p-1.5 rounded-full bg-[#EDE0CD] text-[#2B2119] hover:bg-[#E3D4C0] transition-colors",
							"aria-label": "إغلاق",
							children: /* @__PURE__ */ (void 0)(X, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 467,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 462,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mb-4 pr-1",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-[11px] font-bold text-[#8C2A3E]",
								children: activeImagePickerCat.targetField === "image" ? "تغيير صورة بطاقة القسم" : "تغيير بنر رأس صفحة القسم"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 472,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("h3", {
								className: "text-lg sm:text-xl font-black text-[#2B2119]",
								children: ["قسم: ", activeImagePickerCat.category.name]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 477,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 471,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mb-4 flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#E3D4C0]",
							children: [/* @__PURE__ */ (void 0)("img", {
								src: activeImagePickerCat.targetField === "image" ? activeImagePickerCat.category.image : activeImagePickerCat.category.bannerImage || activeImagePickerCat.category.image,
								alt: activeImagePickerCat.category.name,
								className: "h-16 w-16 rounded-xl object-cover border border-[#D5C2AA] shrink-0"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 484,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-xs font-bold text-[#2B2119] block",
									children: "الصورة الحالية"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 495,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-[11px] text-[#735A45] block truncate",
									children: "اختاري طريقة لإضافة صورة جديدة للقسم: الرفع من الهاتف/الكمبيوتر، رابط مباشر، أو مكتبة الصور"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 496,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 494,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 483,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2 border-b border-[#E3D4C0] pb-2 mb-4",
							children: [
								/* @__PURE__ */ (void 0)("button", {
									onClick: () => setModalTab("upload"),
									className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${modalTab === "upload" ? "bg-[#2B2119] text-white shadow-xs" : "text-[#735A45] hover:bg-[#EDE0CD]"}`,
									children: [/* @__PURE__ */ (void 0)(Upload, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 513,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("span", { children: "رفع من الجهاز" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 514,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 505,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									onClick: () => setModalTab("presets"),
									className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${modalTab === "presets" ? "bg-[#2B2119] text-white shadow-xs" : "text-[#735A45] hover:bg-[#EDE0CD]"}`,
									children: [/* @__PURE__ */ (void 0)(LayoutGrid, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 525,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("span", { children: [
										"مكتبة الصور المقترحة (",
										CURATED_IMAGE_PRESETS.length,
										")"
									] }, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 526,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 517,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									onClick: () => setModalTab("url"),
									className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${modalTab === "url" ? "bg-[#2B2119] text-white shadow-xs" : "text-[#735A45] hover:bg-[#EDE0CD]"}`,
									children: [/* @__PURE__ */ (void 0)(Link$1, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 537,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("span", { children: "رابط مباشر (URL)" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 538,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 529,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 504,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex-1 overflow-y-auto pr-1 space-y-4",
							children: [
								modalTab === "upload" && /* @__PURE__ */ (void 0)("div", {
									className: "space-y-4 text-center",
									children: [
										/* @__PURE__ */ (void 0)("input", {
											ref: fileInputRef,
											type: "file",
											accept: "image/*",
											onChange: handleFileChange,
											className: "hidden",
											id: "section-image-file-input"
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 547,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("label", {
											htmlFor: "section-image-file-input",
											className: "flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-[#CBB39C] hover:border-[#2B2119] bg-white/70 hover:bg-[#EDE0CD]/30 transition-all cursor-pointer group",
											children: [
												/* @__PURE__ */ (void 0)("div", {
													className: "h-14 w-14 rounded-2xl bg-[#EDE0CD] text-[#2B2119] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform",
													children: /* @__PURE__ */ (void 0)(Upload, { className: "h-6 w-6" }, void 0, false, {
														fileName: _jsxFileName$4,
														lineNumber: 561,
														columnNumber: 23
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName$4,
													lineNumber: 560,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("span", {
													className: "text-sm font-bold text-[#2B2119]",
													children: isUploading ? "جارٍ معالجة وضغط الصورة..." : "انقري لاختيار صورة من هاتفك أو جهازك"
												}, void 0, false, {
													fileName: _jsxFileName$4,
													lineNumber: 564,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("span", {
													className: "text-xs text-[#735A45] mt-1",
													children: "يدعم JPG, PNG, WEBP — يتم حفظ وتحديث الصورة فورياً"
												}, void 0, false, {
													fileName: _jsxFileName$4,
													lineNumber: 569,
													columnNumber: 21
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$4,
											lineNumber: 556,
											columnNumber: 19
										}, this),
										uploadError && /* @__PURE__ */ (void 0)("p", {
											className: "text-xs font-semibold text-rose-600",
											children: uploadError
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 575,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 546,
									columnNumber: 17
								}, this),
								modalTab === "presets" && /* @__PURE__ */ (void 0)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex flex-wrap items-center gap-1.5 pb-1",
										children: [
											{
												id: "all",
												label: "الكل"
											},
											{
												id: "dresses",
												label: "فساتين"
											},
											{
												id: "abayas",
												label: "عبايات"
											},
											{
												id: "hijabs",
												label: "حجابات وخمارات"
											},
											{
												id: "isdalat",
												label: "إسدالات"
											},
											{
												id: "accessories",
												label: "إكسسوارات"
											},
											{
												id: "sales",
												label: "تخفيضات"
											}
										].map((f) => /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => setPresetFilter(f.id),
											className: `px-3 py-1 rounded-full text-[11px] font-bold transition-all ${presetFilter === f.id ? "bg-[#2B2119] text-white" : "bg-white text-[#5A412F] border border-[#D5C2AA]"}`,
											children: f.label
										}, f.id, false, {
											fileName: _jsxFileName$4,
											lineNumber: 594,
											columnNumber: 23
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 584,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-[340px] overflow-y-auto p-1",
										children: filteredPresets.map((preset) => /* @__PURE__ */ (void 0)("div", {
											onClick: () => handleSelectPreset(preset.url),
											className: "group relative rounded-xl overflow-hidden aspect-square bg-[#E4D4BE] border border-[#D5C2AA] hover:border-[#2B2119] cursor-pointer shadow-xs transition-all hover:scale-102",
											children: [/* @__PURE__ */ (void 0)("img", {
												src: preset.url,
												alt: preset.name,
												loading: "lazy",
												className: "h-full w-full object-cover"
											}, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 617,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1 text-center",
												children: /* @__PURE__ */ (void 0)("span", {
													className: "text-[10px] font-bold text-white leading-tight",
													children: "اختيار هذه الصورة ✓"
												}, void 0, false, {
													fileName: _jsxFileName$4,
													lineNumber: 624,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 623,
												columnNumber: 25
											}, this)]
										}, preset.id, true, {
											fileName: _jsxFileName$4,
											lineNumber: 612,
											columnNumber: 23
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 610,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 582,
									columnNumber: 17
								}, this),
								modalTab === "url" && /* @__PURE__ */ (void 0)("form", {
									onSubmit: handleApplyUrl,
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: "block text-xs font-bold text-[#423124] mb-1",
											children: "رابط الصورة المباشر (URL)"
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 638,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "url",
											required: true,
											value: urlInput,
											onChange: (e) => setUrlInput(e.target.value),
											placeholder: "https://images.unsplash.com/...",
											className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs text-[#2B2119] focus:outline-none focus:border-[#2B2119]",
											dir: "ltr"
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 641,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$4,
											lineNumber: 637,
											columnNumber: 19
										}, this),
										urlInput && /* @__PURE__ */ (void 0)("div", {
											className: "rounded-xl overflow-hidden border border-[#D5C2AA] p-2 bg-white flex items-center gap-3",
											children: [/* @__PURE__ */ (void 0)("img", {
												src: urlInput,
												alt: "معاينة",
												className: "h-16 w-16 rounded-lg object-cover",
												onError: (e) => {
													e.target.src = "/images/categories/dresses.jpg";
												}
											}, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 655,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-xs text-[#735A45]",
												children: "معاينة الرابط المدخل"
											}, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 663,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$4,
											lineNumber: 654,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											type: "submit",
											className: "w-full py-2.5 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] transition-all cursor-pointer",
											children: "تطبيق الصورة"
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 667,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 636,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 543,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 457,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 456,
				columnNumber: 9
			}, this),
			isHeroModalOpen && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto",
				children: /* @__PURE__ */ (void 0)("div", {
					dir: "rtl",
					className: "relative w-full max-w-xl rounded-3xl bg-[#FAF6F0] p-5 sm:p-7 shadow-2xl border border-[#D5C2AA] text-[#2B2119]",
					children: [
						/* @__PURE__ */ (void 0)("button", {
							onClick: () => setIsHeroModalOpen(false),
							className: "absolute top-4 left-4 p-1.5 rounded-full bg-[#EDE0CD] text-[#2B2119] hover:bg-[#E3D4C0]",
							children: /* @__PURE__ */ (void 0)(X, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 693,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 689,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("h3", {
							className: "text-lg font-black text-[#2B2119] mb-1",
							children: "تخصيص بنر الواجهة الرئيسية (Hero Banner)"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 696,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-[#735A45] mb-4",
							children: "يمكنكِ رفع صورة بانر عريضة من جهازك أو وضع رابط صورة ليتم عرضها في أعلى الموقع"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 699,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("input", {
							ref: heroFileInputRef,
							type: "file",
							accept: "image/*",
							onChange: handleHeroFileUpload,
							className: "hidden",
							id: "hero-file-input"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 703,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (void 0)("label", {
									htmlFor: "hero-file-input",
									className: "flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-[#CBB39C] hover:border-[#2B2119] bg-white cursor-pointer group",
									children: [/* @__PURE__ */ (void 0)(Upload, { className: "h-6 w-6 text-[#8C2A3E] mb-2 group-hover:scale-110 transition-transform" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 717,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "text-xs font-bold text-[#2B2119]",
										children: "انقري لرفع بنر عريض من جهازك (1400x600 موصى به)"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 718,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 713,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)("input", {
										type: "url",
										value: heroInputUrl,
										onChange: (e) => setHeroInputUrl(e.target.value),
										placeholder: "أو ضعي رابط صورة مباشر...",
										className: "flex-1 rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] focus:outline-none focus:border-[#2B2119]",
										dir: "ltr"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 724,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => {
											if (heroInputUrl.trim()) {
												onUpdateHeroBanner(heroInputUrl.trim());
												showToast("تم تحديث بنر الواجهة بنجاح!");
												setIsHeroModalOpen(false);
											}
										},
										className: "px-4 py-2 rounded-xl bg-[#2B2119] text-white text-xs font-bold",
										children: "حفظ"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 732,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 723,
									columnNumber: 15
								}, this),
								heroBanner && /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => {
										onUpdateHeroBanner(null);
										setHeroInputUrl("");
										showToast("تمت استعادة العمل الفني الأصلي للواجهة");
										setIsHeroModalOpen(false);
									},
									className: "w-full py-2 rounded-xl bg-[#EDE0CD] text-xs font-bold text-[#2B2119] hover:bg-[#D5C2AA]",
									children: "استعادة رسمة حجاب سول الأصلية"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 748,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 712,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 685,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 684,
				columnNumber: 9
			}, this),
			isNewCategoryModalOpen && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto",
				children: /* @__PURE__ */ (void 0)("div", {
					dir: "rtl",
					className: "relative w-full max-w-lg rounded-3xl bg-[#FAF6F0] p-5 sm:p-7 shadow-2xl border border-[#D5C2AA] text-[#2B2119] my-6",
					children: [
						/* @__PURE__ */ (void 0)("button", {
							onClick: () => setIsNewCategoryModalOpen(false),
							className: "absolute top-4 left-4 p-1.5 rounded-full bg-[#EDE0CD] text-[#2B2119] hover:bg-[#E3D4C0]",
							children: /* @__PURE__ */ (void 0)(X, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 779,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 775,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("h3", {
							className: "text-lg font-black text-[#2B2119] mb-4",
							children: editingCategory ? `تعديل بيانات قسم "${editingCategory.name}"` : "إضافة قسم جديد للمتجر"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 782,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("form", {
							onSubmit: handleSaveCategoryForm,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: ["اسم القسم ", /* @__PURE__ */ (void 0)("span", {
										className: "text-rose-600",
										children: "*"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 791,
										columnNumber: 29
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 790,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "text",
									required: true,
									value: formName,
									onChange: (e) => setFormName(e.target.value),
									placeholder: "مثال: أوشحة حريرية، أطقم صلاة، حقائب...",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 793,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 789,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "مسار الرابط (URL Path)"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 804,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "text",
									value: formHref,
									onChange: (e) => setFormHref(e.target.value),
									placeholder: "/dresses أو /my-category",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]",
									dir: "ltr"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 807,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 803,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "رابط صورة البطاقة"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 818,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "text",
									value: formImage,
									onChange: (e) => setFormImage(e.target.value),
									placeholder: "/images/categories/... أو رابط ويب",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]",
									dir: "ltr"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 821,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 817,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "وصف مختصر للقسم"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 832,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("textarea", {
									rows: 2,
									value: formDescription,
									onChange: (e) => setFormDescription(e.target.value),
									placeholder: "أزياء محتشمة وراقية تناسب جميع الأذواق...",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 835,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 831,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "block text-xs font-bold text-[#423124] mb-1",
										children: "ترتيب الظهور"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 846,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "number",
										value: formOrder,
										onChange: (e) => setFormOrder(Number(e.target.value)),
										className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs font-bold text-[#2B2119]",
										dir: "ltr"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 849,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 845,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-col justify-end",
										children: /* @__PURE__ */ (void 0)("label", {
											className: "flex items-center gap-2 p-2 rounded-xl bg-white border border-[#D5C2AA] cursor-pointer",
											children: [/* @__PURE__ */ (void 0)("input", {
												type: "checkbox",
												checked: formIsActive,
												onChange: (e) => setFormIsActive(e.target.checked),
												className: "rounded accent-[#2B2119]"
											}, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 860,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-xs font-bold text-[#2B2119]",
												children: "تفعيل القسم"
											}, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 866,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$4,
											lineNumber: 859,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 858,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 844,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									type: "submit",
									className: "w-full py-2.5 rounded-xl bg-[#2B2119] text-white text-xs sm:text-sm font-bold hover:bg-[#433225] transition-all cursor-pointer",
									children: editingCategory ? "حفظ التعديلات" : "إضافة القسم"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 871,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 788,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 771,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 770,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 238,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/admin/AdminOrders.tsx";
var STATUS_CONFIG = {
	pending: {
		label: "جديد (بانتظار التأكيد)",
		bg: "bg-amber-50",
		border: "border-amber-300",
		text: "text-amber-800",
		icon: Clock
	},
	processing: {
		label: "قيد التجهيز والتغليف",
		bg: "bg-blue-50",
		border: "border-blue-300",
		text: "text-blue-800",
		icon: ShoppingBag
	},
	shipped: {
		label: "تم الشحن مع شركة التوصيل",
		bg: "bg-purple-50",
		border: "border-purple-300",
		text: "text-purple-800",
		icon: Truck
	},
	delivered: {
		label: "تم التسليم بنجاح",
		bg: "bg-emerald-50",
		border: "border-emerald-300",
		text: "text-emerald-800",
		icon: CircleCheck
	},
	cancelled: {
		label: "ملغى",
		bg: "bg-red-50",
		border: "border-red-300",
		text: "text-red-800",
		icon: CircleX
	}
};
function AdminOrders({ orders, selectedOrder: propSelectedOrder, onUpdateOrderStatus, onOpenCustomerChat }) {
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [activeOrder, setActiveOrder] = (0, import_react.useState)(propSelectedOrder || (orders.length > 0 ? orders[0] : null));
	const [statusDropdownOpen, setStatusDropdownOpen] = (0, import_react.useState)(false);
	const [actionSuccessToast, setActionSuccessToast] = (0, import_react.useState)(null);
	const filteredOrders = orders.filter((o) => {
		const matchesSearch = o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || o.phone.includes(searchQuery) || o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || o.wilaya.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesStatus = statusFilter === "all" || o.status === statusFilter;
		return matchesSearch && matchesStatus;
	});
	const handleStatusChange = (status) => {
		if (!activeOrder) return;
		onUpdateOrderStatus(activeOrder.id, status);
		setActiveOrder({
			...activeOrder,
			status
		});
		setStatusDropdownOpen(false);
		setActionSuccessToast(`تم تحديث حالة الطلب إلى "${STATUS_CONFIG[status].label}"`);
		setTimeout(() => setActionSuccessToast(null), 2500);
	};
	const handlePrintInvoice = () => {
		window.print();
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			actionSuccessToast && /* @__PURE__ */ (void 0)("div", {
				className: "fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-2xl bg-[#2B2119] text-white px-5 py-3 shadow-2xl border border-[#D5C2AA] text-sm animate-in slide-in-from-bottom-5",
				children: [/* @__PURE__ */ (void 0)(Check, { className: "h-4 w-4 text-emerald-400 shrink-0" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 110,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("span", { children: actionSuccessToast }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 111,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 109,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl sm:text-2xl font-black text-[#2B2119]",
					children: "استقبال وإدارة الطلبات"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 118,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs sm:text-sm text-[#735A45]",
					children: "متابعة طلبات الزبائن وتحديث حالات الشحن والتوصيل لجميع الولايات"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 119,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 117,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs font-bold text-[#735A45]",
						children: ["إجمالي الطلبات: ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
							className: "text-[#2B2119]",
							children: orders.length
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 126,
							columnNumber: 29
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 125,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 124,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 116,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-[#FAF6F0] p-4 rounded-2xl border border-[#E3D4C0]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#735A45]" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 134,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "text",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						placeholder: "البحث برقم الطلب، اسم العميل، الهاتف، أو الولاية ..",
						className: "w-full pr-10 pl-4 py-2 text-xs sm:text-sm rounded-xl border border-[#D5C2AA] bg-white text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none focus:border-[#2B2119]"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 135,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 133,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 overflow-x-auto pb-1 md:pb-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setStatusFilter("all"),
							className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${statusFilter === "all" ? "bg-[#2B2119] text-white shadow-xs" : "bg-white text-[#735A45] border border-[#D5C2AA] hover:bg-[#EDE0CD]"}`,
							children: [
								"الكل (",
								orders.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 145,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setStatusFilter("pending"),
							className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${statusFilter === "pending" ? "bg-amber-700 text-white shadow-xs" : "bg-white text-amber-900 border border-amber-300 hover:bg-amber-50"}`,
							children: [
								"جديد (",
								orders.filter((o) => o.status === "pending").length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 155,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setStatusFilter("processing"),
							className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${statusFilter === "processing" ? "bg-blue-700 text-white shadow-xs" : "bg-white text-blue-900 border border-blue-300 hover:bg-blue-50"}`,
							children: [
								"قيد التجهيز (",
								orders.filter((o) => o.status === "processing").length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 165,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setStatusFilter("shipped"),
							className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${statusFilter === "shipped" ? "bg-purple-700 text-white shadow-xs" : "bg-white text-purple-900 border border-purple-300 hover:bg-purple-50"}`,
							children: [
								"تم الشحن (",
								orders.filter((o) => o.status === "shipped").length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 175,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setStatusFilter("delivered"),
							className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${statusFilter === "delivered" ? "bg-emerald-700 text-white shadow-xs" : "bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-50"}`,
							children: [
								"مكتمل (",
								orders.filter((o) => o.status === "delivered").length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 185,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 144,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 132,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "lg:col-span-5 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-xs font-bold text-[#735A45] px-1",
						children: [
							"قائمة الطلبات (",
							filteredOrders.length,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 202,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2.5 max-h-[720px] overflow-y-auto pr-1",
						children: [filteredOrders.map((order) => {
							const cfg = STATUS_CONFIG[order.status];
							const isSelected = activeOrder?.id === order.id;
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								onClick: () => setActiveOrder(order),
								className: `p-4 rounded-2xl border transition-all cursor-pointer text-right ${isSelected ? "bg-[#FAF6F0] border-[#2B2119] shadow-md ring-2 ring-[#2B2119]/10" : "bg-white border-[#E3D4C0] hover:border-[#2B2119] shadow-xs"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between gap-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono font-bold text-xs text-[#2B2119] bg-[#EDE0CD] px-2 py-0.5 rounded-md",
										children: order.orderNumber
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 222,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: `text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text}`,
										children: cfg.label.split(" ")[0]
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 225,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 221,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
										className: "font-bold text-sm text-[#2B2119]",
										children: order.customerName
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 234,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-[#735A45] mt-0.5 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "h-3 w-3" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 236,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: order.wilaya }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 237,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 235,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 233,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-left",
										dir: "ltr",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-black text-sm text-[#8C2A3E]",
											children: [order.grandTotal.toLocaleString("en-US"), " دج"]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 242,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-[10px] text-[#9F8A77] font-semibold",
											children: order.createdAt
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 245,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 241,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 232,
									columnNumber: 19
								}, this)]
							}, order.id, true, {
								fileName: _jsxFileName$3,
								lineNumber: 212,
								columnNumber: 17
							}, this);
						}), filteredOrders.length === 0 && /* @__PURE__ */ (void 0)("div", {
							className: "text-center py-12 bg-[#FAF6F0] rounded-2xl border border-dashed border-[#D5C2AA] text-xs text-[#735A45]",
							children: "لا توجد طلبات مطابقة للبحث أو الفلتر"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 253,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 206,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 201,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "lg:col-span-7",
					children: activeOrder ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl bg-[#FAF6F0] p-6 sm:p-7 border border-[#E3D4C0] shadow-md space-y-6",
						style: { backgroundImage: "linear-gradient(180deg, #FCF9F4 0%, #F8F1E5 100%)" },
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E3D4C0]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono text-base sm:text-lg font-black text-[#2B2119]",
										children: ["طلب رقم: #", activeOrder.orderNumber]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 273,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 272,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-[#735A45] mt-1",
									children: ["تاريخ ووقت الطلب: ", activeOrder.createdAt]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 277,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 271,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setStatusDropdownOpen((prev) => !prev),
										className: `inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all shadow-xs ${STATUS_CONFIG[activeOrder.status].bg} ${STATUS_CONFIG[activeOrder.status].border} ${STATUS_CONFIG[activeOrder.status].text}`,
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["الحالة: ", STATUS_CONFIG[activeOrder.status].label] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 293,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 294,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 284,
										columnNumber: 19
									}, this), statusDropdownOpen && /* @__PURE__ */ (void 0)("div", {
										className: "absolute left-0 sm:right-0 sm:left-auto top-full mt-1.5 w-56 rounded-xl bg-white border border-[#D5C2AA] shadow-xl p-1.5 z-20 space-y-1",
										children: Object.keys(STATUS_CONFIG).map((st) => /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => handleStatusChange(st),
											className: `w-full text-right px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-between ${activeOrder.status === st ? "bg-[#2B2119] text-white" : "text-[#2B2119] hover:bg-[#FAF6F0]"}`,
											children: [/* @__PURE__ */ (void 0)("span", { children: STATUS_CONFIG[st].label }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 310,
												columnNumber: 27
											}, this), activeOrder.status === st && /* @__PURE__ */ (void 0)(Check, { className: "h-3.5 w-3.5" }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 311,
												columnNumber: 57
											}, this)]
										}, st, true, {
											fileName: _jsxFileName$3,
											lineNumber: 300,
											columnNumber: 25
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 298,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 283,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 270,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-xl bg-white p-4 sm:p-5 border border-[#E3D4C0] space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "h-11 w-11 rounded-full bg-[#2B2119] text-white flex items-center justify-center font-black text-base",
												children: activeOrder.customerName[0] || /* @__PURE__ */ (void 0)(User, { className: "h-5 w-5" }, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 324,
													columnNumber: 55
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 323,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
												className: "font-bold text-sm sm:text-base text-[#2B2119]",
												children: activeOrder.customerName
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 327,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "text-xs text-[#735A45] font-mono",
												dir: "ltr",
												children: activeOrder.phone
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 330,
												columnNumber: 23
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 326,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 322,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
												href: `tel:${activeOrder.phone}`,
												className: "p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-colors",
												title: "اتصال هاتفي بالزبون",
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { className: "h-4 w-4" }, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 343,
													columnNumber: 23
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 338,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: () => onOpenCustomerChat(activeOrder.customerName, activeOrder.phone, activeOrder.wilaya),
												className: "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] transition-all shadow-xs cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "h-3.5 w-3.5" }, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 356,
													columnNumber: 23
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "محادثة فورية" }, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 357,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 345,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 337,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 321,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "pt-3 border-t border-[#F0E6D8] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[#9F8A77] block mb-0.5",
											children: "الولاية والبلدية:"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 365,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
											className: "text-[#2B2119]",
											children: [
												activeOrder.wilaya,
												" — ",
												activeOrder.commune
											]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 366,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 364,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[#9F8A77] block mb-0.5",
											children: "عنوان التوصيل:"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 371,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
											className: "text-[#2B2119]",
											children: activeOrder.address
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 372,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 370,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 363,
										columnNumber: 17
									}, this),
									activeOrder.notes && /* @__PURE__ */ (void 0)("div", {
										className: "p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900",
										children: [
											/* @__PURE__ */ (void 0)("strong", { children: "ملاحظات العميل:" }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 378,
												columnNumber: 21
											}, this),
											" ",
											activeOrder.notes
										]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 377,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 320,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "font-bold text-xs sm:text-sm text-[#2B2119] flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { className: "h-4 w-4 text-[#8C2A3E]" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 386,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
										"المنتجات المطلوبة (",
										activeOrder.items.length,
										")"
									] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 387,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 385,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: activeOrder.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between gap-3 p-3 rounded-xl bg-white border border-[#E3D4C0]",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
												src: item.image,
												alt: item.name,
												className: "h-12 w-12 rounded-lg object-cover border border-[#D5C2AA]"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 397,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "font-bold text-xs sm:text-sm text-[#2B2119]",
												children: item.name
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 403,
												columnNumber: 27
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "text-[11px] text-[#735A45]",
												children: [
													"الكمية: ",
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: item.quantity }, void 0, false, {
														fileName: _jsxFileName$3,
														lineNumber: 405,
														columnNumber: 37
													}, this),
													" ×",
													" ",
													item.price.toLocaleString("en-US"),
													" دج"
												]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 404,
												columnNumber: 27
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 402,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 396,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "font-black text-sm text-[#2B2119]",
											dir: "ltr",
											children: [(item.price * item.quantity).toLocaleString("en-US"), " دج"]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 411,
											columnNumber: 23
										}, this)]
									}, idx, true, {
										fileName: _jsxFileName$3,
										lineNumber: 392,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 390,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 384,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-xl bg-white p-4 border border-[#E3D4C0] space-y-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between text-[#735A45]",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "مجموع المنتجات:" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 422,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-bold",
											dir: "ltr",
											children: [activeOrder.totalAmount.toLocaleString("en-US"), " دج"]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 423,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 421,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between text-[#735A45]",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
											"تكلفة التوصيل (",
											activeOrder.wilaya,
											"):"
										] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 428,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-bold",
											dir: "ltr",
											children: [activeOrder.shippingCost.toLocaleString("en-US"), " دج"]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 429,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 427,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between text-sm sm:text-base font-black text-[#8C2A3E] pt-2 border-t border-[#F0E6D8]",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "المبلغ الإجمالي المستحق (عند الاستلام):" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 434,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											dir: "ltr",
											children: [activeOrder.grandTotal.toLocaleString("en-US"), " دج"]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 435,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 433,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 420,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: handlePrintInvoice,
									className: "inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D5C2AA] bg-white text-xs font-bold text-[#2B2119] hover:bg-[#EDE0CD] transition-all cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Printer, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 446,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "طباعة وصل التسليم" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 447,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 441,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2",
									children: [
										activeOrder.status === "pending" && /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => handleStatusChange("processing"),
											className: "px-4 py-2 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] transition-all shadow-xs",
											children: "تأكيد والبدء بالتجهيز ✓"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 452,
											columnNumber: 21
										}, this),
										activeOrder.status === "processing" && /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => handleStatusChange("shipped"),
											className: "px-4 py-2 rounded-xl bg-purple-700 text-white text-xs font-bold hover:bg-purple-800 transition-all shadow-xs",
											children: "تم التسليم لشركة الشحن 🚚"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 461,
											columnNumber: 21
										}, this),
										activeOrder.status === "shipped" && /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => handleStatusChange("delivered"),
											className: "px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-all shadow-xs",
											children: "تأكيد الاستلام من الزبون ✅"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 470,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 450,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 440,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 263,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col items-center justify-center p-12 bg-[#FAF6F0] rounded-2xl border border-dashed border-[#D5C2AA] text-center min-h-[400px]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "h-12 w-12 text-[#D5C2AA] mb-3" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 483,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "font-bold text-sm text-[#735A45]",
							children: "اختاري طلباً من القائمة لعرض كامل تفاصيله"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 484,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 482,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 261,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 199,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 106,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/admin/AdminChat.tsx";
var QUICK_REPLIES = [
	"أهلاً بكِ في حجاب سول 🕊️ يسعدنا تقديم المساعدة!",
	"تم تأكيد طلبكِ بنجاح وجاري تجهيزه للشحن اليوم إن شاء الله.",
	"المقاس متوفر حالياً ويمكنكِ إتمام الطلب مباشرة من المتجر.",
	"مدة التوصيل لولايتكِ من 24 إلى 48 ساعة والدفع عند الاستلام.",
	"يسعدنا جداً رضاكِ عن جودة القماش والخياطة! دمتم بخير ♡"
];
function AdminChat({ conversations, activeConversationId: initialActiveId, onSendMessage, onMarkAsRead }) {
	const [selectedConvId, setSelectedConvId] = (0, import_react.useState)(initialActiveId || (conversations.length > 0 ? conversations[0].id : ""));
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [inputText, setInputText] = (0, import_react.useState)("");
	const [isTyping, setIsTyping] = (0, import_react.useState)(false);
	const messagesEndRef = (0, import_react.useRef)(null);
	const activeConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];
	(0, import_react.useEffect)(() => {
		if (initialActiveId) setSelectedConvId(initialActiveId);
	}, [initialActiveId]);
	const activeConvId = activeConv?.id;
	(0, import_react.useEffect)(() => {
		if (activeConvId) onMarkAsRead(activeConvId);
	}, [activeConvId, onMarkAsRead]);
	(0, import_react.useEffect)(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [activeConv?.messages.length]);
	const handleSend = (textToSend) => {
		const text = (textToSend || inputText).trim();
		if (!text || !activeConv) return;
		onSendMessage(activeConv.id, text);
		if (!textToSend) setInputText("");
		setIsTyping(true);
		setTimeout(() => {
			setIsTyping(false);
		}, 1500);
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};
	const filteredConversations = conversations.filter((c) => c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || c.customerPhone.includes(searchQuery) || c.wilaya.toLowerCase().includes(searchQuery.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "text-xl sm:text-2xl font-black text-[#2B2119]",
			children: "الدردشة الحية مع العملاء"
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 87,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-xs sm:text-sm text-[#735A45]",
			children: "التواصل المباشر، الرد على الاستفسارات، وتأكيد طلبات الزبائن فورياً"
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 88,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 86,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid grid-cols-1 lg:grid-cols-12 rounded-2xl bg-[#FAF6F0] border border-[#E3D4C0] shadow-md overflow-hidden min-h-[640px]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "lg:col-span-4 border-l border-[#E3D4C0] flex flex-col bg-[#FAF6F0]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-3.5 border-b border-[#E3D4C0] bg-white",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#735A45]" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 100,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							placeholder: "بحث في المحادثات ..",
							className: "w-full pr-8 pl-3 py-1.5 text-xs rounded-xl border border-[#D5C2AA] bg-[#FAF6F0] text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none focus:border-[#2B2119]"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 101,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 99,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 98,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1 overflow-y-auto divide-y divide-[#EADCCB]",
					children: [filteredConversations.map((conv) => {
						const isSelected = activeConv?.id === conv.id;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							onClick: () => setSelectedConvId(conv.id),
							className: `p-3.5 flex items-start gap-3 cursor-pointer transition-colors text-right ${isSelected ? "bg-[#EDE0CD]" : "hover:bg-[#F5EDE0] bg-transparent"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-10 w-10 rounded-full bg-[#2B2119] text-white font-bold text-sm flex items-center justify-center shrink-0",
									children: conv.customerName[0] || /* @__PURE__ */ (void 0)(User, { className: "h-5 w-5" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 126,
										columnNumber: 48
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 125,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "absolute bottom-0 left-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 128,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 124,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between gap-1 mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-bold text-xs sm:text-sm text-[#2B2119] truncate",
											children: conv.customerName
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 133,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[10px] text-[#735A45] shrink-0 font-mono",
											children: conv.lastMessageTime
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 136,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 132,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-[#5A412F] truncate line-clamp-1",
										children: conv.lastMessage
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 141,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between mt-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[10px] text-[#9F8A77]",
											children: conv.wilaya
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 146,
											columnNumber: 23
										}, this), conv.unreadCount > 0 && /* @__PURE__ */ (void 0)("span", {
											className: "h-4 min-w-[16px] px-1 rounded-full bg-[#8C2A3E] text-[10px] font-bold text-white flex items-center justify-center",
											children: conv.unreadCount
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 148,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 145,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 131,
								columnNumber: 19
							}, this)]
						}, conv.id, true, {
							fileName: _jsxFileName$2,
							lineNumber: 117,
							columnNumber: 17
						}, this);
					}), filteredConversations.length === 0 && /* @__PURE__ */ (void 0)("div", {
						className: "text-center py-8 text-xs text-[#735A45]",
						children: "لا توجد محادثات مطابقة"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 159,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 112,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 96,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "lg:col-span-8 flex flex-col bg-white",
				children: activeConv ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 border-b border-[#E3D4C0] bg-[#FAF6F0] flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-10 w-10 rounded-full bg-[#2B2119] text-white font-bold flex items-center justify-center text-sm",
								children: activeConv.customerName[0]
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 171,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "font-bold text-sm sm:text-base text-[#2B2119]",
									children: activeConv.customerName
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 176,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold",
									children: "متصل الآن"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 179,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 175,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-[#735A45] mt-0.5",
								children: [
									activeConv.wilaya,
									" • هاتف: ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										dir: "ltr",
										children: activeConv.customerPhone
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 184,
										columnNumber: 51
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 183,
								columnNumber: 21
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 174,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 170,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: `tel:${activeConv.customerPhone}`,
								className: "p-2 rounded-xl bg-white border border-[#D5C2AA] text-[#2B2119] hover:bg-[#EDE0CD] transition-colors",
								title: "اتصال",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 195,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 190,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 189,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 169,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FAF6F0]/40 max-h-[460px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex justify-center",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE0CD]/80 text-[11px] text-[#735A45]",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-3 w-3 text-[#8C2A3E]" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 205,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "محادثة مباشرة ومشفرة مع عميل حجاب سول" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 206,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 204,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 203,
								columnNumber: 17
							}, this),
							activeConv.messages.map((msg) => {
								const isAdmin = msg.sender === "admin";
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: `flex flex-col ${isAdmin ? "items-start" : "items-end"}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-end gap-2 max-w-[85%] sm:max-w-[75%]",
										children: [!isAdmin && /* @__PURE__ */ (void 0)("div", {
											className: "h-6 w-6 rounded-full bg-[#2B2119] text-white text-[10px] font-bold flex items-center justify-center shrink-0",
											children: activeConv.customerName[0]
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 220,
											columnNumber: 27
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: `rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${isAdmin ? "bg-[#2B2119] text-white rounded-br-xs" : "bg-white text-[#2B2119] border border-[#E3D4C0] rounded-bl-xs"}`,
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: msg.text }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 232,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 225,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 218,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: `flex items-center gap-1 text-[10px] text-[#9F8A77] mt-1 px-1 ${isAdmin ? "mr-2" : "ml-8"}`,
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: msg.timestamp }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 241,
											columnNumber: 25
										}, this), isAdmin && /* @__PURE__ */ (void 0)(CheckCheck, { className: "h-3 w-3 text-emerald-600" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 242,
											columnNumber: 37
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 236,
										columnNumber: 23
									}, this)]
								}, msg.id, true, {
									fileName: _jsxFileName$2,
									lineNumber: 214,
									columnNumber: 21
								}, this);
							}),
							isTyping && /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2 text-xs text-[#735A45] italic",
								children: [/* @__PURE__ */ (void 0)("span", { className: "h-2 w-2 rounded-full bg-[#8C2A3E] animate-ping" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 250,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", { children: "الزبون يكتب الآن .." }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 251,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 249,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { ref: messagesEndRef }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 255,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 201,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-2.5 bg-[#FAF6F0] border-t border-[#E3D4C0] flex items-center gap-1.5 overflow-x-auto",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1 text-[11px] font-bold text-[#735A45] shrink-0 pl-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "h-3 w-3 text-[#8C2A3E]" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 261,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "ردود جاهزة:" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 262,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 260,
							columnNumber: 17
						}, this), QUICK_REPLIES.map((rep, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => handleSend(rep),
							className: "px-2.5 py-1 rounded-lg bg-white border border-[#D5C2AA] text-[11px] text-[#2B2119] hover:bg-[#EDE0CD] whitespace-nowrap transition-colors cursor-pointer",
							children: rep
						}, idx, false, {
							fileName: _jsxFileName$2,
							lineNumber: 265,
							columnNumber: 19
						}, this))]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 259,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-3 sm:p-4 bg-white border-t border-[#E3D4C0]",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "text",
								value: inputText,
								onChange: (e) => setInputText(e.target.value),
								onKeyDown: handleKeyDown,
								placeholder: "اكتبي رسالتكِ للعميل واضغطي Enter ..",
								className: "flex-1 rounded-xl border border-[#D5C2AA] bg-[#FAF6F0] px-4 py-2.5 text-xs sm:text-sm text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none focus:border-[#2B2119]"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 279,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => handleSend(),
								disabled: !inputText.trim(),
								className: "flex items-center justify-center h-10 w-10 rounded-xl bg-[#2B2119] text-white hover:bg-[#433225] active:scale-95 disabled:opacity-40 transition-all cursor-pointer shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "h-4 w-4 rotate-180" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 294,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 288,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 278,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 277,
						columnNumber: 15
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 167,
					columnNumber: 13
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1 flex flex-col items-center justify-center p-12 text-center text-xs text-[#735A45]",
					children: "اختاري محادثة للبدء في الدردشة"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 300,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 165,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 94,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 84,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/admin/AdminSettings.tsx";
function AdminSettings() {
	const [storeName, setStoreName] = (0, import_react.useState)("حجاب سول — Hijab Soul");
	const [supportPhone, setSupportPhone] = (0, import_react.useState)("0661234589");
	const [shippingAlgiers, setShippingAlgiers] = (0, import_react.useState)(500);
	const [shippingMajorCities, setShippingMajorCities] = (0, import_react.useState)(700);
	const [shippingSouth, setShippingSouth] = (0, import_react.useState)(900);
	const [announcement, setAnnouncement] = (0, import_react.useState)("توصيل سريع لكافة الـ 58 ولاية والدفع عند الاستلام ♡");
	const [savedToast, setSavedToast] = (0, import_react.useState)(false);
	const handleSave = (e) => {
		e.preventDefault();
		setSavedToast(true);
		setTimeout(() => setSavedToast(false), 2500);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6 max-w-4xl",
		children: [
			savedToast && /* @__PURE__ */ (void 0)("div", {
				className: "fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-2xl bg-[#2B2119] text-white px-5 py-3 shadow-2xl border border-[#D5C2AA] text-sm animate-in slide-in-from-bottom-5",
				children: [/* @__PURE__ */ (void 0)(Check, { className: "h-4 w-4 text-emerald-400 shrink-0" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 25,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("span", { children: "تم حفظ إعدادات المتجر بنجاح!" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 26,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 24,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-xl sm:text-2xl font-black text-[#2B2119]",
				children: "إعدادات المتجر والشحن"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 31,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-xs sm:text-sm text-[#735A45]",
				children: "تخصيص بيانات المتجر، أرقام التواصل، وتسعير التوصيل للولايات الجزائرية"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 32,
				columnNumber: 9
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 30,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				onSubmit: handleSave,
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl bg-[#FAF6F0] p-5 sm:p-6 border border-[#E3D4C0] space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-sm sm:text-base font-bold text-[#2B2119] flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Store, { className: "h-4 w-4 text-[#8C2A3E]" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 41,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "بيانات المتجر العامة" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 42,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 40,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "اسم المتجر"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 47,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									value: storeName,
									onChange: (e) => setStoreName(e.target.value),
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 48,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 46,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "رقم خدمة العملاء (واتساب / هاتف)"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 57,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "text",
										value: supportPhone,
										onChange: (e) => setSupportPhone(e.target.value),
										className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]",
										dir: "ltr"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 61,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9F8A77]" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 68,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 60,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 56,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 45,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-bold text-[#423124] mb-1",
								children: "شريط الإعلان أعلى الموقع"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 74,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "text",
								value: announcement,
								onChange: (e) => setAnnouncement(e.target.value),
								className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 77,
								columnNumber: 13
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 73,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 39,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl bg-[#FAF6F0] p-5 sm:p-6 border border-[#E3D4C0] space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm sm:text-base font-bold text-[#2B2119] flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4 text-[#8C2A3E]" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 89,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "تسعير الشحن للولايات (دج)" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 90,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 88,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "الجزائر العاصمة والوسط"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 95,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "number",
									value: shippingAlgiers,
									onChange: (e) => setShippingAlgiers(Number(e.target.value)),
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm font-bold text-[#2B2119]",
									dir: "ltr"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 98,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 94,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "الولايات الشمالية والشرق/الغرب"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 108,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "number",
									value: shippingMajorCities,
									onChange: (e) => setShippingMajorCities(Number(e.target.value)),
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm font-bold text-[#2B2119]",
									dir: "ltr"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 111,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 107,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "ولايات الجنوب والهضاب"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 121,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "number",
									value: shippingSouth,
									onChange: (e) => setShippingSouth(Number(e.target.value)),
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm font-bold text-[#2B2119]",
									dir: "ltr"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 124,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 120,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 93,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 87,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "submit",
						className: "px-6 py-2.5 rounded-xl bg-[#2B2119] text-white font-bold text-xs sm:text-sm hover:bg-[#433225] active:scale-95 transition-all shadow-md cursor-pointer",
						children: "حفظ التغييرات"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 135,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 37,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 22,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/admin.tsx?tsr-split=component";
function AdminDashboardPage() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	const [selectedOrderForDetails, setSelectedOrderForDetails] = (0, import_react.useState)(null);
	const [activeChatConvId, setActiveChatConvId] = (0, import_react.useState)(void 0);
	const { products, orders, conversations, categories, heroBanner, updateProduct, addProduct, deleteProduct, updateOrderStatus, sendMessage, markConversationAsRead, updateCategory, addCategory, deleteCategory, resetCategoriesToDefault, updateHeroBanner } = useStoreData();
	const unreadMessagesTotal = conversations.reduce((sum, c) => sum + c.unreadCount, 0);
	const pendingOrdersCount = orders.filter((o) => o.status === "pending" || o.status === "processing").length;
	const handleOpenCustomerChat = (customerName) => {
		const existing = conversations.find((c) => c.customerName.toLowerCase() === customerName.toLowerCase());
		if (existing) setActiveChatConvId(existing.id);
		setActiveTab("chat");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		dir: "rtl",
		className: "min-h-screen bg-[#FAF6F0] text-[#2B2119] flex flex-col font-sans selection:bg-[#8C2A3E] selection:text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "sticky top-0 z-40 w-full bg-[#2B2119] text-[#FAF6F0] shadow-md border-b border-[#433225]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-2.5 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/",
							className: "flex items-center gap-2 group",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: hijab_soul_mark_default,
								alt: "حجاب سول",
								className: "h-9 w-auto select-none"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 50,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-display text-lg tracking-wide text-white flex items-center gap-1",
								children: "Hijab Soul"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 52,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] text-[#D5C2AA] block -mt-1 font-semibold",
								children: "لوحة تحكم المدير"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 55,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 51,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 49,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] text-[#E5D2B8] font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-3 w-3 text-[#E5D2B8]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 62,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "وضع الإدارة نشط" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 63,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 61,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 48,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/",
							className: "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF6F0] text-xs font-bold transition-all border border-white/10 active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "معاينة المتجر" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 70,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "h-3.5 w-3.5 rotate-180" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 71,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 69,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 68,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 46,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "border-t border-[#3D2E22] bg-[#241B14]",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto flex w-full max-w-[1400px] items-center gap-1 sm:gap-2 px-4 sm:px-6 overflow-x-auto py-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setActiveTab("overview"),
								className: `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${activeTab === "overview" ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm" : "text-[#D5C2AA] hover:text-white hover:bg-white/5"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LayoutDashboard, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 80,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "الرئيسية والإحصائيات" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 81,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 79,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setActiveTab("categories"),
								className: `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${activeTab === "categories" ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm" : "text-[#D5C2AA] hover:text-white hover:bg-white/5"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 85,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									"الأقسام والصور (",
									categories.length,
									")"
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 86,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 84,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setActiveTab("products"),
								className: `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${activeTab === "products" ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm" : "text-[#D5C2AA] hover:text-white hover:bg-white/5"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 90,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									"المنتجات والأسعار (",
									products.length,
									")"
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 91,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 89,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setActiveTab("orders"),
								className: `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all relative ${activeTab === "orders" ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm" : "text-[#D5C2AA] hover:text-white hover:bg-white/5"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 95,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "الطلبات الواردة" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 96,
										columnNumber: 15
									}, this),
									pendingOrdersCount > 0 && /* @__PURE__ */ (void 0)("span", {
										className: "h-4 min-w-[16px] px-1 rounded-full bg-amber-500 text-[10px] font-bold text-white flex items-center justify-center",
										children: pendingOrdersCount
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 97,
										columnNumber: 42
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 94,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setActiveTab("chat"),
								className: `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all relative ${activeTab === "chat" ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm" : "text-[#D5C2AA] hover:text-white hover:bg-white/5"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 103,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "دردشة العملاء" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 104,
										columnNumber: 15
									}, this),
									unreadMessagesTotal > 0 && /* @__PURE__ */ (void 0)("span", {
										className: "h-4 min-w-[16px] px-1 rounded-full bg-[#8C2A3E] text-[10px] font-bold text-white flex items-center justify-center",
										children: unreadMessagesTotal
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 105,
										columnNumber: 43
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 102,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setActiveTab("settings"),
								className: `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${activeTab === "settings" ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm" : "text-[#D5C2AA] hover:text-white hover:bg-white/5"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Settings, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 111,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "الإعدادات" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 112,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 110,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 77,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 45,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "flex-1 mx-auto w-full max-w-[1400px] p-4 sm:p-6 lg:p-8",
				children: [
					activeTab === "overview" && /* @__PURE__ */ (void 0)(AdminOverview, {
						products,
						orders,
						conversations,
						categories,
						onTabChange: setActiveTab,
						onSelectOrder: (ord) => {
							setSelectedOrderForDetails(ord);
							setActiveTab("orders");
						}
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 120,
						columnNumber: 38
					}, this),
					activeTab === "categories" && /* @__PURE__ */ (void 0)(AdminCategories, {
						categories,
						heroBanner,
						onUpdateCategory: updateCategory,
						onAddCategory: addCategory,
						onDeleteCategory: deleteCategory,
						onResetCategories: resetCategoriesToDefault,
						onUpdateHeroBanner: updateHeroBanner
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 125,
						columnNumber: 40
					}, this),
					activeTab === "products" && /* @__PURE__ */ (void 0)(AdminProducts, {
						products,
						onUpdateProduct: updateProduct,
						onAddProduct: addProduct,
						onDeleteProduct: deleteProduct
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 127,
						columnNumber: 38
					}, this),
					activeTab === "orders" && /* @__PURE__ */ (void 0)(AdminOrders, {
						orders,
						selectedOrder: selectedOrderForDetails,
						onUpdateOrderStatus: updateOrderStatus,
						onOpenCustomerChat: handleOpenCustomerChat
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 129,
						columnNumber: 36
					}, this),
					activeTab === "chat" && /* @__PURE__ */ (void 0)(AdminChat, {
						conversations,
						activeConversationId: activeChatConvId,
						onSendMessage: sendMessage,
						onMarkAsRead: markConversationAsRead
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 131,
						columnNumber: 34
					}, this),
					activeTab === "settings" && /* @__PURE__ */ (void 0)(AdminSettings, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 38
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 119,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
				className: "mt-auto border-t border-[#E3D4C0] bg-[#FAF6F0] py-4 text-center text-xs text-[#735A45]",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-[1400px] px-4 flex flex-col sm:flex-row items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["نظام إدارة متجر حجاب سول — جميع الحقوق محفوظة © ", (/* @__PURE__ */ new Date()).getFullYear()] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 139,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-semibold text-[#8C2A3E]",
						children: "إنه أكثر من مجرد ملابس .. إنه أسلوب حياة ♡"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 140,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 138,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 137,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 43,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminDashboardPage as component };
