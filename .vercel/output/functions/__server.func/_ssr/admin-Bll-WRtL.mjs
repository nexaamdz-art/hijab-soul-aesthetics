import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react_tanstack__react-query.mjs";
import { r as useAuth, t as ADMIN_EMAILS } from "./auth-context-B5NfnVdI.mjs";
import { a as useStoreData, i as hijab_soul_mark_default, n as compressImageFile, r as getProductFallbackImage, t as CURATED_IMAGE_PRESETS } from "./store-data-Bc0o-mtj.mjs";
import { h as Link } from "../_libs/@tanstack/react-router_chunks.mjs";
import { $ as Camera, A as Mail, B as FileText, C as Package, E as MessageCircle, F as LayoutGrid, G as Clock, I as LayoutDashboard, K as CircleX, L as Layers, M as Lock, O as Maximize2, P as Link$1, Q as CheckCheck, R as Image, S as Pen, T as MessageSquare, U as Download, W as Crown, X as ChevronDown, Y as CircleAlert, Z as Check, _ as RotateCcw, a as Upload, b as Plus, c as TrendingUp, d as Sparkles, et as ArrowUpRight, f as ShoppingBag, g as Search, h as Send, i as UserCheck, k as MapPin, l as Trash2, m as Settings, n as X, o as Truck, p as ShieldCheck, q as CircleCheck, r as User, s as TriangleAlert, t as Zap, tt as ArrowRight, u as Store, x as Phone, y as Printer } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-Bll-WRtL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminOverview({ products, orders, conversations, onTabChange, onSelectOrder }) {
	const totalRevenue = orders.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + o.grandTotal, 0);
	const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "processing").length;
	const unreadMessagesCount = conversations.reduce((sum, c) => sum + c.unreadCount, 0);
	const lowStockProducts = products.filter((p) => p.stock <= 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl bg-[#2B2119] text-[#FAF6F0] p-6 sm:p-8 relative overflow-hidden shadow-lg border border-[#433225]",
				style: { backgroundImage: "radial-gradient(circle at 90% 20%, rgba(200, 160, 120, 0.15) 0%, transparent 60%), linear-gradient(135deg, #2B2119 0%, #1E1610 100%)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E5D2B8] mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-3.5 w-3.5 text-[#E5D2B8]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "لوحة الإدارة الرسمية • حجاب سول" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl sm:text-3xl font-black text-white",
							children: "مرحباً بكِ في إدارة متجر حجاب سول 🕊️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-[#D5C2AA] mt-1 max-w-xl leading-relaxed",
							children: "تحكّمي بكل تفاصيل المتجر: تعديل المنتجات والأسعار، متابعة وشحن طلبات الزبائن، والرد المباشر على المحادثات."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 sm:gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onTabChange("products"),
							className: "px-4 py-2.5 rounded-xl bg-[#E5D2B8] text-[#2B2119] font-bold text-xs sm:text-sm hover:bg-white active:scale-95 transition-all shadow-sm",
							children: "+ إضافة أو تعديل منتج"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onTabChange("orders"),
							className: "px-4 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs sm:text-sm hover:bg-white/20 active:scale-95 transition-all border border-white/15",
							children: [
								"عرض الطلبات (",
								orders.length,
								")"
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[#FAF6F0] p-5 border border-[#E3D4C0] shadow-sm relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-[#735A45]",
								children: "إجمالي المبيعات النشطة"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-xl bg-[#EDE0CD] text-[#2B2119] flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-2xl font-black text-[#2B2119]",
								dir: "ltr",
								children: [
									totalRevenue.toLocaleString("en-US"),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-bold text-[#8C2A3E]",
										children: "دج"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"من ",
									orders.filter((o) => o.status !== "cancelled").length,
									" طلب مؤكد"
								] })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => onTabChange("orders"),
						className: "rounded-2xl bg-[#FAF6F0] p-5 border border-[#E3D4C0] shadow-sm relative overflow-hidden cursor-pointer hover:border-[#2B2119] transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-[#735A45]",
								children: "طلبات بانتظار التجهيز"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-2xl font-black text-[#2B2119]",
								children: [
									pendingOrders,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-[#735A45] font-normal",
										children: "طلب"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-amber-800 font-semibold mt-1",
								children: pendingOrders > 0 ? "يتطلب تأكيداً أو شحناً" : "كل الطلبات مجهزة"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => onTabChange("products"),
						className: "rounded-2xl bg-[#FAF6F0] p-5 border border-[#E3D4C0] shadow-sm relative overflow-hidden cursor-pointer hover:border-[#2B2119] transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-[#735A45]",
								children: "المنتجات في المتجر"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-xl bg-[#EDE0CD] text-[#2B2119] flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-2xl font-black text-[#2B2119]",
								children: [
									products.length,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-[#735A45] font-normal",
										children: "منتج نشط"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-[#735A45] font-semibold mt-1",
								children: lowStockProducts.length > 0 ? `${lowStockProducts.length} منتجات قاربت على النفاد` : "المخزون ممتاز"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => onTabChange("chat"),
						className: "rounded-2xl bg-[#FAF6F0] p-5 border border-[#E3D4C0] shadow-sm relative overflow-hidden cursor-pointer hover:border-[#2B2119] transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-[#735A45]",
								children: "محادثات الزبائن"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-5 w-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-2xl font-black text-[#2B2119]",
								children: [
									conversations.length,
									" ",
									unreadMessagesCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold",
										children: [unreadMessagesCount, " جديدة"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-blue-700 font-semibold mt-1",
								children: "الدردشة الحية والمباشرة مع الزبائن"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 rounded-2xl bg-[#FAF6F0] p-5 sm:p-6 border border-[#E3D4C0] shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4 pb-3 border-b border-[#E3D4C0]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base sm:text-lg font-black text-[#2B2119]",
							children: "آخر الطلبات الواردة"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[#735A45]",
							children: "متابعة وتحديث طلبات التوصيل للولايات"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onTabChange("orders"),
							className: "text-xs font-bold text-[#8C2A3E] hover:underline",
							children: [
								"عرض كافة الطلبات (",
								orders.length,
								") ←"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => {
									onSelectOrder(order);
									onTabChange("orders");
								},
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-[#E8DC CE] hover:border-[#2B2119] transition-all cursor-pointer shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "h-10 w-10 shrink-0 rounded-xl bg-[#EDE0CD] text-[#2B2119] font-bold text-xs flex items-center justify-center border border-[#D5C2AA]",
										children: ["#", order.orderNumber.replace("HS-", "")]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-sm text-[#2B2119]",
											children: order.customerName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadge.bg}`,
											children: statusBadge.label
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-[#735A45] mt-0.5",
										children: [
											order.wilaya,
											" • ",
											order.items.length,
											" قطع • ",
											order.createdAt
										]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-[#F0E6D8]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-black text-sm text-[#2B2119]",
										dir: "ltr",
										children: [order.grandTotal.toLocaleString("en-US"), " دج"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "px-2.5 py-1 rounded-lg bg-[#FAF6F0] border border-[#D5C2AA] text-xs font-semibold text-[#2B2119] hover:bg-[#EDE0CD]",
										children: "تفاصيل"
									})]
								})]
							}, order.id);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[#FAF6F0] p-5 border border-[#E3D4C0] shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[#8C2A3E] font-bold text-sm mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تنبيهات المخزون" })]
						}), lowStockProducts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2.5",
							children: lowStockProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-[#E8DCCE]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.image,
										alt: p.name,
										className: "h-9 w-9 rounded-lg object-cover border border-[#D5C2AA]",
										onError: (e) => {
											e.target.src = getProductFallbackImage(p.category);
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold text-[#2B2119] truncate",
											children: p.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-red-700 font-semibold",
											children: [
												"باقي ",
												p.stock,
												" قطع فقط"
											]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => onTabChange("products"),
									className: "px-2 py-1 rounded-lg bg-[#EDE0CD] text-[11px] font-bold text-[#2B2119] hover:bg-[#D5C2AA] shrink-0",
									children: "تعديل"
								})]
							}, p.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[#735A45]",
							children: "جميع المنتجات متوفرة بكميات كافية."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[#EDE0CD] p-5 border border-[#D5C2AA]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-bold text-sm text-[#2B2119] mb-2",
							children: "إجراءات سريعة للمدير"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-xs font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => onTabChange("categories"),
									className: "w-full flex items-center justify-between p-2.5 rounded-xl bg-white/90 hover:bg-white text-[#2B2119] transition-all border border-[#D5C2AA] font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-4 w-4 text-[#8C2A3E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تغيير صور وبنرات أقسام المتجر" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "←" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => onTabChange("products"),
									className: "w-full flex items-center justify-between p-2.5 rounded-xl bg-white/80 hover:bg-white text-[#2B2119] transition-all",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تغيير أسعار أو صور المنتجات" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "←" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => onTabChange("chat"),
									className: "w-full flex items-center justify-between p-2.5 rounded-xl bg-white/80 hover:bg-white text-[#2B2119] transition-all",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الرد على استفسارات الزبائن" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "←" })]
								})
							]
						})]
					})]
				})]
			})
		]
	});
}
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
	"/images/uploads/black_floral_embroidered_abaya_1789830101193.jpg",
	"/images/uploads/ivory_watercolor_floral_abaya_1789830182632.jpg",
	"/images/uploads/hijab_pearl_beaded_shawls_1789831343828.jpg",
	"/images/uploads/chocolate_brown_cape_abaya_1789830195176.jpg",
	"/images/uploads/isdal_pastel_blue_white_1789832048044.jpg",
	"/images/uploads/hijab_black_silk_chiffon_1789831330976.jpg",
	"/images/uploads/akiki_cream_handbag_1789829330238.jpg",
	"/images/uploads/burgundy_silver_embroidery_abaya_1789830112029.jpg",
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
	"/images/uploads/isdal_pastel_blue_white_1789832048044.jpg",
	"/images/uploads/isdal_layered_grey_black_1789832059450.jpg",
	"/images/uploads/isdal_royal_blue_white_1789832073187.jpg",
	"/images/uploads/modest_black_isdal_1789749094153.jpg",
	"/images/uploads/modest_clothing_sale_1789749140662.jpg",
	"/images/uploads/ivory_watercolor_floral_abaya_1789830182632.jpg",
	"/images/uploads/mauve_hijab_model_1789749104873.jpg",
	"/images/uploads/sage_green_crystal_abaya_1789830162620.jpg",
	"/images/uploads/black_embroidered_abaya_1789749117503.jpg",
	"/images/uploads/chocolate_brown_cape_abaya_1789830195176.jpg",
	"/images/uploads/burgundy_pearl_lace_abaya_1789830171852.jpg",
	"/images/uploads/burgundy_silver_embroidery_abaya_1789830112029.jpg",
	"/images/uploads/crystal_sparkle_black_abaya_1789830134113.jpg",
	"/images/uploads/lady_white_handbag_1789829346343.jpg",
	"/images/uploads/embroidered_evening_bag_1789829357737.jpg",
	"/images/uploads/akiki_cream_handbag_1789829330238.jpg",
	"/images/uploads/sage_green_crossbody_1789829366417.jpg"
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			saveToast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-2xl bg-[#2B2119] text-white px-5 py-3 shadow-2xl border border-[#D5C2AA] text-sm animate-in slide-in-from-bottom-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: saveToast })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl sm:text-2xl font-black text-[#2B2119]",
					children: "إدارة المنتجات والأسعار"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-[#735A45]",
					children: "تعديل صور المنتجات، تغيير الأسعار (دج)، وتحديث المخزون"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: openCreateModal,
					className: "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2B2119] text-white font-bold text-xs sm:text-sm hover:bg-[#433225] active:scale-95 transition-all shadow-md cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إضافة منتج جديد" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-[#FAF6F0] p-4 rounded-2xl border border-[#E3D4C0]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#735A45]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						placeholder: "البحث بالاسم أو السعر ..",
						className: "w-full pr-10 pl-4 py-2 text-xs sm:text-sm rounded-xl border border-[#D5C2AA] bg-white text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none focus:border-[#2B2119]"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 overflow-x-auto pb-1 md:pb-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSelectedCategory("all"),
						className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === "all" ? "bg-[#2B2119] text-white shadow-xs" : "bg-white text-[#735A45] border border-[#D5C2AA] hover:bg-[#EDE0CD]"}`,
						children: [
							"الكل (",
							products.length,
							")"
						]
					}), Object.entries(CATEGORY_MAP).map(([key, label]) => {
						const count = products.filter((p) => p.category === key).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSelectedCategory(key),
							className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === key ? "bg-[#2B2119] text-white shadow-xs" : "bg-white text-[#735A45] border border-[#D5C2AA] hover:bg-[#EDE0CD]"}`,
							children: [
								label,
								" (",
								count,
								")"
							]
						}, key);
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6",
				children: filteredProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative rounded-2xl bg-[#FAF6F0] p-3.5 sm:p-4 border border-[#E3D4C0] shadow-sm hover:shadow-md hover:border-[#2B2119] transition-all flex flex-col justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-4/5 w-full overflow-hidden rounded-xl bg-[#EDE0CD] mb-3 border border-[#D5C2AA]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: product.image,
									alt: product.name,
									className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105",
									onError: (e) => {
										e.target.src = getProductFallbackImage(product.category);
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-[#2B2119]/80 backdrop-blur-xs text-[11px] font-bold text-white",
									children: CATEGORY_MAP[product.category] || product.category
								}),
								product.stock <= 8 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-red-600 text-[10px] font-bold text-white shadow-sm",
									children: [
										"مخزون قليل (",
										product.stock,
										")"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-sm sm:text-base text-[#2B2119] line-clamp-1",
									children: product.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-black text-base text-[#8C2A3E]",
										dir: "ltr",
										children: [product.price.toLocaleString("en-US"), " دج"]
									}), product.originalPrice && product.originalPrice > product.price && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-[#9F8A77] line-through",
										dir: "ltr",
										children: [product.originalPrice.toLocaleString("en-US"), " دج"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-[#735A45] flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"المتوفر: ",
										product.stock,
										" قطعة"
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-[#9F8A77]",
										children: ["كود: ", product.id]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-3 border-t border-[#E3D4C0] flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => openEditModal(product),
								className: "flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] active:scale-95 transition-all shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تعديل السعر والصورة" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "حذف المنتج",
								onClick: () => setDeleteConfirmId(product.id),
								className: "p-2 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 active:scale-95 transition-all",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})]
						})
					]
				}, product.id))
			}),
			filteredProducts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center py-16 bg-[#FAF6F0] rounded-2xl border border-dashed border-[#D5C2AA]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold text-[#735A45]",
					children: "لا توجد منتجات مطابقة للبحث"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setSearchQuery("");
						setSelectedCategory("all");
					},
					className: "mt-3 px-4 py-2 rounded-xl bg-[#EDE0CD] text-xs font-bold text-[#2B2119]",
					children: "إعادة تعيين الفلاتر"
				})]
			}),
			deleteConfirmId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-2xl bg-[#FAF6F0] p-6 border border-[#E3D4C0] shadow-2xl text-center space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-12 w-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-black text-lg text-[#2B2119]",
							children: "هل أنتِ متأكدة من حذف المنتج؟"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[#735A45]",
							children: "سيتم إزالة المنتج نهائياً من المتجر ولن يتمكن الزبائن من طلبه."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									onDeleteProduct(deleteConfirmId);
									setDeleteConfirmId(null);
									showToast("تم حذف المنتج بنجاح");
								},
								className: "flex-1 py-2.5 rounded-xl bg-red-700 text-white text-xs font-bold hover:bg-red-800 transition-all",
								children: "نعم، احذف المنتج"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setDeleteConfirmId(null),
								className: "flex-1 py-2.5 rounded-xl border border-[#D5C2AA] bg-white text-xs font-bold text-[#2B2119] hover:bg-[#EDE0CD] transition-all",
								children: "إلغاء"
							})]
						})
					]
				})
			}),
			isModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					dir: "rtl",
					className: "relative w-full max-w-lg rounded-2xl bg-[#FAF6F0] p-6 sm:p-7 border border-[#E3D4C0] shadow-2xl my-8 text-[#2B2119]",
					style: { backgroundImage: "linear-gradient(180deg, #FCF9F4 0%, #F5EDE0 100%)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsModalOpen(false),
							className: "absolute top-4 left-4 h-8 w-8 rounded-full bg-[#EDE0CD] flex items-center justify-center text-[#2B2119] hover:bg-[#D5C2AA]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-[#8C2A3E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg sm:text-xl font-black text-[#2B2119]",
								children: editingProduct ? `تعديل: ${editingProduct.name}` : "إضافة منتج جديد للمتجر"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3.5 rounded-xl bg-white border border-[#D5C2AA] space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block text-xs font-bold text-[#423124]",
											children: ["صورة المنتج ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[#8C2A3E]",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "relative h-24 w-20 shrink-0 rounded-xl overflow-hidden border border-[#D5C2AA] bg-[#EDE0CD]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: formImage,
													alt: "معاينة",
													className: "h-full w-full object-cover"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2 flex-1 min-w-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "file",
														ref: fileInputRef,
														onChange: handleFileUpload,
														accept: "image/*",
														className: "hidden"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => fileInputRef.current?.click(),
														className: "w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#EDE0CD] text-xs font-bold text-[#2B2119] hover:bg-[#D5C2AA] transition-all",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "رفع صورة من الجهاز" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-[11px] text-[#735A45]",
														children: "أو اختاري صورة من مكتبة حجاب سول:"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex items-center gap-1.5 overflow-x-auto pb-1",
														children: DEFAULT_IMAGE_OPTIONS.map((imgUrl, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => setFormImage(imgUrl),
															className: `h-7 w-7 rounded-md overflow-hidden shrink-0 border-2 transition-all ${formImage === imgUrl ? "border-[#8C2A3E] scale-110" : "border-transparent opacity-60"}`,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																src: imgUrl,
																alt: "",
																className: "h-full w-full object-cover"
															})
														}, idx))
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: formImage.startsWith("data:") ? "صورة مخصصة مرفوعة" : formImage,
											onChange: (e) => setFormImage(e.target.value),
											placeholder: "أو الصقي رابط URL للصورة هنا ..",
											className: "w-full rounded-lg border border-[#D5C2AA] px-3 py-1.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none",
											dir: "ltr"
										}) })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: ["اسم المنتج ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[#8C2A3E]",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: formName,
									onChange: (e) => setFormName(e.target.value),
									placeholder: "مثال: فستان كريب شتوي فاخر",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-bold text-[#423124] mb-1",
										children: ["السعر الحالي (دج) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#8C2A3E]",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										required: true,
										min: 100,
										step: 100,
										value: formPrice,
										onChange: (e) => setFormPrice(Number(e.target.value)),
										className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] font-bold focus:outline-none focus:border-[#2B2119]",
										dir: "ltr"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-bold text-[#423124] mb-1",
										children: "السعر قبل التخفيض (اختياري)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 0,
										step: 100,
										value: formOriginalPrice || "",
										onChange: (e) => setFormOriginalPrice(e.target.value ? Number(e.target.value) : void 0),
										placeholder: "مثال: 4500",
										className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]",
										dir: "ltr"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-bold text-[#423124] mb-1",
										children: ["القسم / التصنيف ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#8C2A3E]",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: formCategory,
										onChange: (e) => setFormCategory(e.target.value),
										className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] font-bold focus:outline-none focus:border-[#2B2119]",
										children: Object.entries(CATEGORY_MAP).map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: key,
											children: label
										}, key))
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-bold text-[#423124] mb-1",
										children: ["كمية المخزون (قطعة) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#8C2A3E]",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 0,
										value: formStock,
										onChange: (e) => setFormStock(Number(e.target.value)),
										className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] font-bold focus:outline-none focus:border-[#2B2119]",
										dir: "ltr"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "وصف المنتج ومميزاته"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 2,
									value: formDescription,
									onChange: (e) => setFormDescription(e.target.value),
									placeholder: "نوع القماش، المقاسات المتوفرة، تفاصيل الخياطة ..",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "flex-1 py-2.5 rounded-xl bg-[#2B2119] text-white text-xs sm:text-sm font-bold hover:bg-[#433225] active:scale-98 transition-all shadow-md cursor-pointer",
										children: editingProduct ? "حفظ التغييرات" : "إضافة المنتج للمتجر"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setIsModalOpen(false),
										className: "px-4 py-2.5 rounded-xl border border-[#D5C2AA] bg-white text-xs sm:text-sm font-bold text-[#2B2119] hover:bg-[#EDE0CD]",
										children: "إلغاء"
									})]
								})
							]
						})
					]
				})
			})
		]
	});
}
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-6xl",
		children: [
			toastMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-2xl bg-[#2B2119] text-white px-5 py-3 shadow-2xl border border-[#D5C2AA] text-sm animate-in slide-in-from-bottom-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: toastMessage })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-6 w-6 text-[#8C2A3E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl sm:text-2xl font-black text-[#2B2119]",
						children: "إدارة الأقسام والصور (Sections & Categories)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-[#735A45] mt-1",
					children: "تخصيص صور بطاقات الأقسام في شريط الواجهة الرئيسية، بنرات الصفحات، وإضافة أقسام جديدة"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setIsHeroModalOpen(true),
							className: "flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#2B2119] border border-[#D5C2AA] text-xs font-bold hover:bg-[#EDE0CD] transition-all shadow-xs cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-[#8C2A3E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تغيير بنر الواجهة الرئيسية" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: openCreateModal,
							className: "flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] transition-all shadow-sm cursor-pointer active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إضافة قسم جديد" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								if (confirm("هل تريدين استعادة الصور والتصنيفات الافتراضية الأصلية للمتجر؟")) {
									onResetCategories();
									showToast("تمت استعادة التصنيفات الافتراضية بنجاح!");
								}
							},
							title: "استعادة الصور الافتراضية",
							className: "p-2 rounded-xl bg-[#FAF6F0] text-[#735A45] border border-[#D5C2AA] hover:text-[#2B2119] hover:bg-[#EDE0CD] transition-all cursor-pointer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" })
						})
					]
				})]
			}),
			heroBanner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-[#FAF6F0] p-4 border border-[#D5C2AA] flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: heroBanner,
						alt: "بنر الواجهة الرئيسية المخصص",
						className: "h-12 w-24 object-cover rounded-lg border border-[#D5C2AA] shrink-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-[#2B2119] block",
							children: "بنر الواجهة الرئيسية مخصص حالياً"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] text-[#735A45] truncate block",
							children: "يظهر هذا البنر في أعلى الصفحة الرئيسية للمتجر"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setIsHeroModalOpen(true),
						className: "px-3 py-1.5 rounded-lg bg-[#EDE0CD] text-xs font-bold text-[#2B2119] hover:bg-[#D5C2AA]",
						children: "تعديل"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							onUpdateHeroBanner(null);
							showToast("تمت استعادة البنر الافتراضي للواجهة");
						},
						className: "px-2.5 py-1.5 rounded-lg text-xs font-bold text-red-700 hover:bg-red-50",
						children: "إلغاء المخصص"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
				children: categories.map((cat, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `rounded-2xl bg-[#FAF6F0] p-4 sm:p-5 border transition-all duration-200 shadow-sm flex flex-col justify-between ${cat.isActive ? "border-[#E3D4C0]" : "border-dashed border-[#D5C2AA] opacity-75"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-6 w-6 items-center justify-center rounded-full bg-[#EDE0CD] text-[11px] font-bold text-[#2B2119] border border-[#D5C2AA]",
								children: idx + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-black text-[#2B2119]",
								children: cat.name
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => onUpdateCategory(cat.id, { isActive: !cat.isActive }),
									className: `px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${cat.isActive ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-gray-200 text-gray-700 border border-gray-300"}`,
									children: cat.isActive ? "ظاهر بالمتجر ✓" : "مخفي"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => openEditModal(cat),
									className: "p-1.5 rounded-lg text-[#735A45] hover:bg-[#EDE0CD] hover:text-[#2B2119] transition-colors",
									title: "تعديل بيانات القسم",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3.5 w-3.5" })
								}),
								categories.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										if (confirm(`هل أنتِ متأكدة من حذف قسم "${cat.name}"؟`)) {
											onDeleteCategory(cat.id);
											showToast(`تم حذف قسم "${cat.name}"`);
										}
									},
									className: "p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors",
									title: "حذف القسم",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative group rounded-xl overflow-hidden bg-[#EDE0CD] aspect-[4/3] border border-[#D5C2AA]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: cat.image,
									alt: cat.name,
									className: "h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105",
									onError: (e) => {
										e.target.src = getProductFallbackImage(cat.id);
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-3 text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => openImagePicker(cat, "image"),
										className: "px-3.5 py-1.5 rounded-xl bg-white text-[#2B2119] text-xs font-bold shadow-md hover:bg-[#FAF6F0] flex items-center gap-1.5 transition-transform active:scale-95",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5 text-[#8C2A3E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تغيير صورة القسم" })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-[#E2D0AC]/95 backdrop-blur-xs text-center border border-[#D5C2AA]/80 shadow-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-hand font-extrabold text-xs text-[#3B2A1A] truncate block",
										children: cat.name
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-[#5A412F] space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "line-clamp-1 font-medium",
								children: cat.description || "بدون وصف إضافي"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] font-mono text-[#8C7665] dir-ltr text-right",
								children: ["الرابط: ", cat.href]
							})]
						})]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 pt-3 border-t border-[#E3D4C0] flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => openImagePicker(cat, "image"),
							className: "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] transition-all active:scale-98 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-3.5 w-3.5 text-[#E2D0AC]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تغيير الصورة" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => openImagePicker(cat, "bannerImage"),
							className: "flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl bg-white border border-[#D5C2AA] text-xs font-semibold text-[#2B2119] hover:bg-[#EDE0CD] transition-all cursor-pointer",
							title: "تخصيص بنر رأس الصفحة لهذا القسم",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "بنر الصفحة" }), cat.bannerImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-600" })]
						})]
					})]
				}, cat.id))
			}),
			activeImagePickerCat && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					dir: "rtl",
					className: "relative w-full max-w-2xl rounded-3xl bg-[#FAF6F0] p-5 sm:p-7 shadow-2xl border border-[#D5C2AA] text-[#2B2119] my-6 max-h-[90vh] flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveImagePickerCat(null),
							className: "absolute top-4 left-4 p-1.5 rounded-full bg-[#EDE0CD] text-[#2B2119] hover:bg-[#E3D4C0] transition-colors",
							"aria-label": "إغلاق",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 pr-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-bold text-[#8C2A3E]",
								children: activeImagePickerCat.targetField === "image" ? "تغيير صورة بطاقة القسم" : "تغيير بنر رأس صفحة القسم"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-lg sm:text-xl font-black text-[#2B2119]",
								children: ["قسم: ", activeImagePickerCat.category.name]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#E3D4C0]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: activeImagePickerCat.targetField === "image" ? activeImagePickerCat.category.image : activeImagePickerCat.category.bannerImage || activeImagePickerCat.category.image,
								alt: activeImagePickerCat.category.name,
								className: "h-16 w-16 rounded-xl object-cover border border-[#D5C2AA] shrink-0"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-[#2B2119] block",
									children: "الصورة الحالية"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-[#735A45] block truncate",
									children: "اختاري طريقة لإضافة صورة جديدة للقسم: الرفع من الهاتف/الكمبيوتر، رابط مباشر، أو مكتبة الصور"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 border-b border-[#E3D4C0] pb-2 mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setModalTab("upload"),
									className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${modalTab === "upload" ? "bg-[#2B2119] text-white shadow-xs" : "text-[#735A45] hover:bg-[#EDE0CD]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "رفع من الجهاز" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setModalTab("presets"),
									className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${modalTab === "presets" ? "bg-[#2B2119] text-white shadow-xs" : "text-[#735A45] hover:bg-[#EDE0CD]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"مكتبة الصور المقترحة (",
										CURATED_IMAGE_PRESETS.length,
										")"
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setModalTab("url"),
									className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${modalTab === "url" ? "bg-[#2B2119] text-white shadow-xs" : "text-[#735A45] hover:bg-[#EDE0CD]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "رابط مباشر (URL)" })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 overflow-y-auto pr-1 space-y-4",
							children: [
								modalTab === "upload" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											ref: fileInputRef,
											type: "file",
											accept: "image/*",
											onChange: handleFileChange,
											className: "hidden",
											id: "section-image-file-input"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											htmlFor: "section-image-file-input",
											className: "flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-[#CBB39C] hover:border-[#2B2119] bg-white/70 hover:bg-[#EDE0CD]/30 transition-all cursor-pointer group",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-14 w-14 rounded-2xl bg-[#EDE0CD] text-[#2B2119] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-6 w-6" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-bold text-[#2B2119]",
													children: isUploading ? "جارٍ معالجة وضغط الصورة..." : "انقري لاختيار صورة من هاتفك أو جهازك"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-[#735A45] mt-1",
													children: "يدعم JPG, PNG, WEBP — يتم حفظ وتحديث الصورة فورياً"
												})
											]
										}),
										uploadError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold text-rose-600",
											children: uploadError
										})
									]
								}),
								modalTab === "presets" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
										].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setPresetFilter(f.id),
											className: `px-3 py-1 rounded-full text-[11px] font-bold transition-all ${presetFilter === f.id ? "bg-[#2B2119] text-white" : "bg-white text-[#5A412F] border border-[#D5C2AA]"}`,
											children: f.label
										}, f.id))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-[340px] overflow-y-auto p-1",
										children: filteredPresets.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => handleSelectPreset(preset.url),
											className: "group relative rounded-xl overflow-hidden aspect-square bg-[#E4D4BE] border border-[#D5C2AA] hover:border-[#2B2119] cursor-pointer shadow-xs transition-all hover:scale-102",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: preset.url,
												alt: preset.name,
												loading: "lazy",
												className: "h-full w-full object-cover"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1 text-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-bold text-white leading-tight",
													children: "اختيار هذه الصورة ✓"
												})
											})]
										}, preset.id))
									})]
								}),
								modalTab === "url" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleApplyUrl,
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-bold text-[#423124] mb-1",
											children: "رابط الصورة المباشر (URL)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "url",
											required: true,
											value: urlInput,
											onChange: (e) => setUrlInput(e.target.value),
											placeholder: "https://images.unsplash.com/...",
											className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs text-[#2B2119] focus:outline-none focus:border-[#2B2119]",
											dir: "ltr"
										})] }),
										urlInput && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl overflow-hidden border border-[#D5C2AA] p-2 bg-white flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: urlInput,
												alt: "معاينة",
												className: "h-16 w-16 rounded-lg object-cover",
												onError: (e) => {
													e.target.src = "/images/categories/dresses.jpg";
												}
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-[#735A45]",
												children: "معاينة الرابط المدخل"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											className: "w-full py-2.5 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] transition-all cursor-pointer",
											children: "تطبيق الصورة"
										})
									]
								})
							]
						})
					]
				})
			}),
			isHeroModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					dir: "rtl",
					className: "relative w-full max-w-xl rounded-3xl bg-[#FAF6F0] p-5 sm:p-7 shadow-2xl border border-[#D5C2AA] text-[#2B2119]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsHeroModalOpen(false),
							className: "absolute top-4 left-4 p-1.5 rounded-full bg-[#EDE0CD] text-[#2B2119] hover:bg-[#E3D4C0]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-black text-[#2B2119] mb-1",
							children: "تخصيص بنر الواجهة الرئيسية (Hero Banner)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[#735A45] mb-4",
							children: "يمكنكِ رفع صورة بانر عريضة من جهازك أو وضع رابط صورة ليتم عرضها في أعلى الموقع"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: heroFileInputRef,
							type: "file",
							accept: "image/*",
							onChange: handleHeroFileUpload,
							className: "hidden",
							id: "hero-file-input"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "hero-file-input",
									className: "flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-[#CBB39C] hover:border-[#2B2119] bg-white cursor-pointer group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-6 w-6 text-[#8C2A3E] mb-2 group-hover:scale-110 transition-transform" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-[#2B2119]",
										children: "انقري لرفع بنر عريض من جهازك (1400x600 موصى به)"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "url",
										value: heroInputUrl,
										onChange: (e) => setHeroInputUrl(e.target.value),
										placeholder: "أو ضعي رابط صورة مباشر...",
										className: "flex-1 rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] focus:outline-none focus:border-[#2B2119]",
										dir: "ltr"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
									})]
								}),
								heroBanner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										onUpdateHeroBanner(null);
										setHeroInputUrl("");
										showToast("تمت استعادة العمل الفني الأصلي للواجهة");
										setIsHeroModalOpen(false);
									},
									className: "w-full py-2 rounded-xl bg-[#EDE0CD] text-xs font-bold text-[#2B2119] hover:bg-[#D5C2AA]",
									children: "استعادة رسمة حجاب سول الأصلية"
								})
							]
						})
					]
				})
			}),
			isNewCategoryModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					dir: "rtl",
					className: "relative w-full max-w-lg rounded-3xl bg-[#FAF6F0] p-5 sm:p-7 shadow-2xl border border-[#D5C2AA] text-[#2B2119] my-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsNewCategoryModalOpen(false),
							className: "absolute top-4 left-4 p-1.5 rounded-full bg-[#EDE0CD] text-[#2B2119] hover:bg-[#E3D4C0]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-black text-[#2B2119] mb-4",
							children: editingCategory ? `تعديل بيانات قسم "${editingCategory.name}"` : "إضافة قسم جديد للمتجر"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSaveCategoryForm,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: ["اسم القسم ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-rose-600",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: formName,
									onChange: (e) => setFormName(e.target.value),
									placeholder: "مثال: أوشحة حريرية، أطقم صلاة، حقائب...",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "مسار الرابط (URL Path)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: formHref,
									onChange: (e) => setFormHref(e.target.value),
									placeholder: "/dresses أو /my-category",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]",
									dir: "ltr"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "رابط صورة البطاقة"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: formImage,
									onChange: (e) => setFormImage(e.target.value),
									placeholder: "/images/categories/... أو رابط ويب",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]",
									dir: "ltr"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "وصف مختصر للقسم"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 2,
									value: formDescription,
									onChange: (e) => setFormDescription(e.target.value),
									placeholder: "أزياء محتشمة وراقية تناسب جميع الأذواق...",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-bold text-[#423124] mb-1",
										children: "ترتيب الظهور"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: formOrder,
										onChange: (e) => setFormOrder(Number(e.target.value)),
										className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs font-bold text-[#2B2119]",
										dir: "ltr"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-col justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 p-2 rounded-xl bg-white border border-[#D5C2AA] cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: formIsActive,
												onChange: (e) => setFormIsActive(e.target.checked),
												className: "rounded accent-[#2B2119]"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold text-[#2B2119]",
												children: "تفعيل القسم"
											})]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "w-full py-2.5 rounded-xl bg-[#2B2119] text-white text-xs sm:text-sm font-bold hover:bg-[#433225] transition-all cursor-pointer",
									children: editingCategory ? "حفظ التعديلات" : "إضافة القسم"
								})
							]
						})
					]
				})
			})
		]
	});
}
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
	const [activeOrder, setActiveOrder] = (0, import_react.useState)(propSelectedOrder ?? (orders[0] || null));
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			actionSuccessToast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-2xl bg-[#2B2119] text-white px-5 py-3 shadow-2xl border border-[#D5C2AA] text-sm animate-in slide-in-from-bottom-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: actionSuccessToast })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl sm:text-2xl font-black text-[#2B2119]",
					children: "استقبال وإدارة الطلبات"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-[#735A45]",
					children: "متابعة طلبات الزبائن وتحديث حالات الشحن والتوصيل لجميع الولايات"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-bold text-[#735A45]",
						children: ["إجمالي الطلبات: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-[#2B2119]",
							children: orders.length
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-[#FAF6F0] p-4 rounded-2xl border border-[#E3D4C0]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#735A45]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						placeholder: "البحث برقم الطلب، اسم العميل، الهاتف، أو الولاية ..",
						className: "w-full pr-10 pl-4 py-2 text-xs sm:text-sm rounded-xl border border-[#D5C2AA] bg-white text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none focus:border-[#2B2119]"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 overflow-x-auto pb-1 md:pb-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setStatusFilter("all"),
							className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${statusFilter === "all" ? "bg-[#2B2119] text-white shadow-xs" : "bg-white text-[#735A45] border border-[#D5C2AA] hover:bg-[#EDE0CD]"}`,
							children: [
								"الكل (",
								orders.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setStatusFilter("pending"),
							className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${statusFilter === "pending" ? "bg-amber-700 text-white shadow-xs" : "bg-white text-amber-900 border border-amber-300 hover:bg-amber-50"}`,
							children: [
								"جديد (",
								orders.filter((o) => o.status === "pending").length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setStatusFilter("processing"),
							className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${statusFilter === "processing" ? "bg-blue-700 text-white shadow-xs" : "bg-white text-blue-900 border border-blue-300 hover:bg-blue-50"}`,
							children: [
								"قيد التجهيز (",
								orders.filter((o) => o.status === "processing").length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setStatusFilter("shipped"),
							className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${statusFilter === "shipped" ? "bg-purple-700 text-white shadow-xs" : "bg-white text-purple-900 border border-purple-300 hover:bg-purple-50"}`,
							children: [
								"تم الشحن (",
								orders.filter((o) => o.status === "shipped").length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setStatusFilter("delivered"),
							className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${statusFilter === "delivered" ? "bg-emerald-700 text-white shadow-xs" : "bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-50"}`,
							children: [
								"مكتمل (",
								orders.filter((o) => o.status === "delivered").length,
								")"
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs font-bold text-[#735A45] px-1",
						children: [
							"قائمة الطلبات (",
							filteredOrders.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2.5 max-h-[720px] overflow-y-auto pr-1",
						children: [filteredOrders.map((order) => {
							const cfg = STATUS_CONFIG[order.status];
							const isSelected = activeOrder?.id === order.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setActiveOrder(order),
								className: `p-4 rounded-2xl border transition-all cursor-pointer text-right ${isSelected ? "bg-[#FAF6F0] border-[#2B2119] shadow-md ring-2 ring-[#2B2119]/10" : "bg-white border-[#E3D4C0] hover:border-[#2B2119] shadow-xs"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-bold text-xs text-[#2B2119] bg-[#EDE0CD] px-2 py-0.5 rounded-md",
										children: order.orderNumber
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text}`,
										children: cfg.label.split(" ")[0]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold text-sm text-[#2B2119]",
										children: order.customerName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-[#735A45] mt-0.5 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: order.wilaya })]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-left",
										dir: "ltr",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-black text-sm text-[#8C2A3E]",
											children: [order.grandTotal.toLocaleString("en-US"), " دج"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-[#9F8A77] font-semibold",
											children: order.createdAt
										})]
									})]
								})]
							}, order.id);
						}), filteredOrders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center py-12 bg-[#FAF6F0] rounded-2xl border border-dashed border-[#D5C2AA] text-xs text-[#735A45]",
							children: "لا توجد طلبات مطابقة للبحث أو الفلتر"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-7",
					children: activeOrder ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[#FAF6F0] p-6 sm:p-7 border border-[#E3D4C0] shadow-md space-y-6",
						style: { backgroundImage: "linear-gradient(180deg, #FCF9F4 0%, #F8F1E5 100%)" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E3D4C0]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-base sm:text-lg font-black text-[#2B2119]",
										children: ["طلب رقم: #", activeOrder.orderNumber]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-[#735A45] mt-1",
									children: ["تاريخ ووقت الطلب: ", activeOrder.createdAt]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setStatusDropdownOpen((prev) => !prev),
										className: `inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all shadow-xs ${STATUS_CONFIG[activeOrder.status].bg} ${STATUS_CONFIG[activeOrder.status].border} ${STATUS_CONFIG[activeOrder.status].text}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["الحالة: ", STATUS_CONFIG[activeOrder.status].label] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5" })]
									}), statusDropdownOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute left-0 sm:right-0 sm:left-auto top-full mt-1.5 w-56 rounded-xl bg-white border border-[#D5C2AA] shadow-xl p-1.5 z-20 space-y-1",
										children: Object.keys(STATUS_CONFIG).map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleStatusChange(st),
											className: `w-full text-right px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-between ${activeOrder.status === st ? "bg-[#2B2119] text-white" : "text-[#2B2119] hover:bg-[#FAF6F0]"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: STATUS_CONFIG[st].label }), activeOrder.status === st && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" })]
										}, st))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-white p-4 sm:p-5 border border-[#E3D4C0] space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-11 w-11 rounded-full bg-[#2B2119] text-white flex items-center justify-center font-black text-base",
												children: activeOrder.customerName[0] || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "font-bold text-sm sm:text-base text-[#2B2119]",
												children: activeOrder.customerName
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-[#735A45] font-mono",
												dir: "ltr",
												children: activeOrder.phone
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: `tel:${activeOrder.phone}`,
												className: "p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-colors",
												title: "اتصال هاتفي بالزبون",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => onOpenCustomerChat(activeOrder.customerName, activeOrder.phone, activeOrder.wilaya),
												className: "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] transition-all shadow-xs cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "محادثة فورية" })]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-3 border-t border-[#F0E6D8] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#9F8A77] block mb-0.5",
											children: "الولاية والبلدية:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
											className: "text-[#2B2119]",
											children: [
												activeOrder.wilaya,
												" — ",
												activeOrder.commune
											]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#9F8A77] block mb-0.5",
											children: "عنوان التوصيل:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-[#2B2119]",
											children: activeOrder.address
										})] })]
									}),
									activeOrder.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "ملاحظات العميل:" }),
											" ",
											activeOrder.notes
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "font-bold text-xs sm:text-sm text-[#2B2119] flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4 text-[#8C2A3E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"المنتجات المطلوبة (",
										activeOrder.items.length,
										")"
									] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: activeOrder.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3 p-3 rounded-xl bg-white border border-[#E3D4C0]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: item.image,
												alt: item.name,
												className: "h-12 w-12 rounded-lg object-cover border border-[#D5C2AA]",
												onError: (e) => {
													e.target.src = getProductFallbackImage();
												}
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-xs sm:text-sm text-[#2B2119]",
												children: item.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-[#735A45]",
												children: [
													"الكمية: ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.quantity }),
													" ×",
													" ",
													item.price.toLocaleString("en-US"),
													" دج"
												]
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-black text-sm text-[#2B2119]",
											dir: "ltr",
											children: [(item.price * item.quantity).toLocaleString("en-US"), " دج"]
										})]
									}, idx))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-white p-4 border border-[#E3D4C0] space-y-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[#735A45]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "مجموع المنتجات:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold",
											dir: "ltr",
											children: [activeOrder.totalAmount.toLocaleString("en-US"), " دج"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[#735A45]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"تكلفة التوصيل (",
											activeOrder.wilaya,
											"):"
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold",
											dir: "ltr",
											children: [activeOrder.shippingCost.toLocaleString("en-US"), " دج"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-sm sm:text-base font-black text-[#8C2A3E] pt-2 border-t border-[#F0E6D8]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "المبلغ الإجمالي المستحق (عند الاستلام):" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											dir: "ltr",
											children: [activeOrder.grandTotal.toLocaleString("en-US"), " دج"]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: handlePrintInvoice,
									className: "inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D5C2AA] bg-white text-xs font-bold text-[#2B2119] hover:bg-[#EDE0CD] transition-all cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "طباعة وصل التسليم" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										activeOrder.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleStatusChange("processing"),
											className: "px-4 py-2 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] transition-all shadow-xs",
											children: "تأكيد والبدء بالتجهيز ✓"
										}),
										activeOrder.status === "processing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleStatusChange("shipped"),
											className: "px-4 py-2 rounded-xl bg-purple-700 text-white text-xs font-bold hover:bg-purple-800 transition-all shadow-xs",
											children: "تم التسليم لشركة الشحن 🚚"
										}),
										activeOrder.status === "shipped" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleStatusChange("delivered"),
											className: "px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-all shadow-xs",
											children: "تأكيد الاستلام من الزبون ✅"
										})
									]
								})]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center p-12 bg-[#FAF6F0] rounded-2xl border border-dashed border-[#D5C2AA] text-center min-h-[400px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-12 w-12 text-[#D5C2AA] mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold text-sm text-[#735A45]",
							children: "اختاري طلباً من القائمة لعرض كامل تفاصيله"
						})]
					})
				})]
			})
		]
	});
}
var QUICK_REPLIES = [
	"أهلاً بكِ في حجاب سول 🕊️ يسعدنا تقديم المساعدة!",
	"تم تأكيد طلبكِ بنجاح وجاري تجهيزه للشحن اليوم إن شاء الله.",
	"المقاس متوفر حالياً ويمكنكِ إتمام الطلب مباشرة من المتجر.",
	"مدة التوصيل لولايتكِ من 24 إلى 48 ساعة والدفع عند الاستلام.",
	"يسعدنا جداً رضاكِ عن جودة القماش والخياطة! دمتم بخير ♡"
];
function AdminChat({ conversations, products = [], activeConversationId: initialActiveId, onSendMessage, onMarkAsRead }) {
	const [selectedConvId, setSelectedConvId] = (0, import_react.useState)(initialActiveId || conversations[0]?.id || "");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [inputText, setInputText] = (0, import_react.useState)("");
	const [selectedImage, setSelectedImage] = (0, import_react.useState)(null);
	const [selectedImageName, setSelectedImageName] = (0, import_react.useState)("");
	const [isTyping, setIsTyping] = (0, import_react.useState)(false);
	const [isProductPickerOpen, setIsProductPickerOpen] = (0, import_react.useState)(false);
	const [isUrlModalOpen, setIsUrlModalOpen] = (0, import_react.useState)(false);
	const [customImageUrl, setCustomImageUrl] = (0, import_react.useState)("");
	const [lightboxImage, setLightboxImage] = (0, import_react.useState)(null);
	const [productSearch, setProductSearch] = (0, import_react.useState)("");
	const fileInputRef = (0, import_react.useRef)(null);
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
	}, [activeConv?.messages.length, selectedImage]);
	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			alert("يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).");
			return;
		}
		const reader = new FileReader();
		reader.onload = (event) => {
			if (event.target?.result) {
				setSelectedImage(event.target.result);
				setSelectedImageName(file.name);
			}
		};
		reader.readAsDataURL(file);
		e.target.value = "";
	};
	const handlePaste = (e) => {
		const items = e.clipboardData?.items;
		if (!items) return;
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			if (item && item.type.indexOf("image") !== -1) {
				const file = item.getAsFile();
				if (file) {
					const reader = new FileReader();
					reader.onload = (event) => {
						if (event.target?.result) {
							setSelectedImage(event.target.result);
							setSelectedImageName("صورة من الحافظة");
						}
					};
					reader.readAsDataURL(file);
					e.preventDefault();
					break;
				}
			}
		}
	};
	const handleSend = (textToSend, imageToSend) => {
		const text = (textToSend !== void 0 ? textToSend : inputText).trim();
		const img = imageToSend !== void 0 ? imageToSend : selectedImage;
		if (!activeConv) return;
		if (!text && !img) return;
		onSendMessage(activeConv.id, text, "admin", img || void 0);
		if (textToSend === void 0) setInputText("");
		setSelectedImage(null);
		setSelectedImageName("");
		setIsTyping(true);
		setTimeout(() => {
			setIsTyping(false);
		}, 1500);
	};
	const handleSimulateCustomerImage = () => {
		if (!activeConv) return;
		const sampleCustomerImages = [
			{
				url: "/images/uploads/black_floral_embroidered_abaya_1789830101193.jpg",
				text: "السلام عليكم، هل هذا الموديل متوفر منه مقاس 42 ولون كحلي؟"
			},
			{
				url: "/images/uploads/ivory_watercolor_floral_abaya_1789830182632.jpg",
				text: "أهلاً، لقد حولت المبلغ عبر بريدي موب وهذا وصل الدفع المرفق."
			},
			{
				url: "/images/uploads/hijab_pearl_beaded_shawls_1789831343828.jpg",
				text: "هل القماش شيفون تركي ناعم أم كريب كوري؟"
			}
		];
		const randomItem = sampleCustomerImages[Math.floor(Math.random() * sampleCustomerImages.length)] || sampleCustomerImages[0];
		setIsTyping(true);
		setTimeout(() => {
			setIsTyping(false);
			if (randomItem) onSendMessage(activeConv.id, randomItem.text, "customer", randomItem.url);
		}, 1200);
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};
	const filteredConversations = conversations.filter((c) => c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || c.customerPhone.includes(searchQuery) || c.wilaya.toLowerCase().includes(searchQuery.toLowerCase()) || c.messages.some((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase())));
	const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.category.toLowerCase().includes(productSearch.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl sm:text-2xl font-black text-[#2B2119]",
					children: "الدردشة الحية مع العملاء"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-[#735A45]",
					children: "التواصل المباشر، إرسال واستقبال صور المنتجات والوصولات، وتأكيد طلبات الزبائن فورياً"
				})] }), activeConv && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleSimulateCustomerImage,
					className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#D5C2AA] text-xs font-bold text-[#5A412F] hover:bg-[#FAF6F0] hover:border-[#2B2119] transition-all cursor-pointer shadow-xs",
					title: "تجربة استلام صورة من الزبون في المحادثة",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-3.5 w-3.5 text-[#8C2A3E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "محاكاة إرسال صورة من الزبون" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 rounded-2xl bg-[#FAF6F0] border border-[#E3D4C0] shadow-md overflow-hidden min-h-[660px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-4 border-l border-[#E3D4C0] flex flex-col bg-[#FAF6F0]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-3.5 border-b border-[#E3D4C0] bg-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#735A45]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								placeholder: "بحث في المحادثات والرسائل ..",
								className: "w-full pr-8 pl-3 py-1.5 text-xs rounded-xl border border-[#D5C2AA] bg-[#FAF6F0] text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none focus:border-[#2B2119]"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 overflow-y-auto divide-y divide-[#EADCCB] max-h-[600px]",
						children: [filteredConversations.map((conv) => {
							const isSelected = activeConv?.id === conv.id;
							const hasImages = conv.messages.some((m) => m.imageUrl || m.imageAttachment);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setSelectedConvId(conv.id),
								className: `p-3.5 flex items-start gap-3 cursor-pointer transition-colors text-right ${isSelected ? "bg-[#EDE0CD]" : "hover:bg-[#F5EDE0] bg-transparent"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-10 w-10 rounded-full bg-[#2B2119] text-white font-bold text-sm flex items-center justify-center shrink-0",
										children: conv.customerName[0] || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 left-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-1 mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-xs sm:text-sm text-[#2B2119] truncate",
												children: conv.customerName
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-[#735A45] shrink-0 font-mono",
												children: conv.lastMessageTime
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [hasImages && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												title: "يحتوي على صور",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-3 w-3 text-[#8C2A3E] shrink-0" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-[#5A412F] truncate line-clamp-1",
												children: conv.lastMessage
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between mt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-[#9F8A77]",
												children: conv.wilaya
											}), conv.unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-4 min-w-[16px] px-1 rounded-full bg-[#8C2A3E] text-[10px] font-bold text-white flex items-center justify-center",
												children: conv.unreadCount
											})]
										})
									]
								})]
							}, conv.id);
						}), filteredConversations.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center py-8 text-xs text-[#735A45]",
							children: "لا توجد محادثات مطابقة للبحث"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-8 flex flex-col bg-white",
					children: activeConv ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 border-b border-[#E3D4C0] bg-[#FAF6F0] flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 rounded-full bg-[#2B2119] text-white font-bold flex items-center justify-center text-sm",
									children: activeConv.customerName[0]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-sm sm:text-base text-[#2B2119]",
										children: activeConv.customerName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold",
										children: "متصل الآن"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-[#735A45] mt-0.5",
									children: [
										activeConv.wilaya,
										" • هاتف: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											dir: "ltr",
											children: activeConv.customerPhone
										})
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${activeConv.customerPhone}`,
									className: "p-2 rounded-xl bg-white border border-[#D5C2AA] text-[#2B2119] hover:bg-[#EDE0CD] transition-colors",
									title: "اتصال بالهاتف",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" })
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FAF6F0]/40 max-h-[440px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE0CD]/80 text-[11px] text-[#735A45]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-[#8C2A3E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "محادثة مباشرة ومشفرة — تدعم إرسال واستقبال الصور بجودة عالية" })]
									})
								}),
								activeConv.messages.map((msg) => {
									const isAdmin = msg.sender === "admin";
									const imageUrl = msg.imageUrl || msg.imageAttachment;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `flex flex-col ${isAdmin ? "items-start" : "items-end"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-end gap-2 max-w-[85%] sm:max-w-[70%]",
											children: [!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-6 w-6 rounded-full bg-[#2B2119] text-white text-[10px] font-bold flex items-center justify-center shrink-0",
												children: activeConv.customerName[0]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: `rounded-2xl p-2 sm:p-3 text-xs sm:text-sm leading-relaxed shadow-xs overflow-hidden ${isAdmin ? "bg-[#2B2119] text-white rounded-br-xs" : "bg-white text-[#2B2119] border border-[#E3D4C0] rounded-bl-xs"}`,
												children: [
													imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "relative mb-2 group rounded-xl overflow-hidden border border-black/10 bg-black/5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: imageUrl,
															alt: "مرفق صورة",
															className: "w-full max-h-64 object-cover rounded-lg cursor-pointer transition-transform duration-200 group-hover:scale-[1.02]",
															onClick: () => setLightboxImage({
																url: imageUrl,
																caption: msg.text
															}),
															loading: "lazy"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															type: "button",
															onClick: () => setLightboxImage({
																url: imageUrl,
																caption: msg.text
															}),
															className: "absolute bottom-2 left-2 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] cursor-pointer hover:bg-black/80",
															title: "تكبير الصورة",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تكبير" })]
														})]
													}),
													msg.productAttachment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mb-2 p-2 rounded-xl bg-black/10 border border-white/10 flex items-center gap-2 text-right",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: msg.productAttachment.image,
															alt: msg.productAttachment.name,
															className: "h-12 w-12 rounded-lg object-cover"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex-1 min-w-0",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-bold text-xs truncate",
																children: msg.productAttachment.name
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "text-[11px] font-mono text-emerald-300",
																children: [msg.productAttachment.price.toLocaleString("ar-DZ"), " دج"]
															})]
														})]
													}),
													msg.text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "px-1",
														children: msg.text
													})
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `flex items-center gap-1 text-[10px] text-[#9F8A77] mt-1 px-1 ${isAdmin ? "mr-2" : "ml-8"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: msg.timestamp }), isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-3 w-3 text-emerald-600" })]
										})]
									}, msg.id);
								}),
								isTyping && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs text-[#735A45] italic",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-[#8C2A3E] animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الزبون يكتب الآن .." })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: messagesEndRef })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-2.5 bg-[#FAF6F0] border-t border-[#E3D4C0] flex items-center gap-1.5 overflow-x-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 text-[11px] font-bold text-[#735A45] shrink-0 pl-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3 w-3 text-[#8C2A3E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ردود جاهزة:" })]
							}), QUICK_REPLIES.map((rep, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => handleSend(rep),
								className: "px-2.5 py-1 rounded-lg bg-white border border-[#D5C2AA] text-[11px] text-[#2B2119] hover:bg-[#EDE0CD] whitespace-nowrap transition-colors cursor-pointer",
								children: rep
							}, idx))]
						}),
						selectedImage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 bg-[#FAF6F0] border-t border-[#E3D4C0] flex items-center justify-between gap-3 animate-in fade-in duration-150",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative h-14 w-14 rounded-lg overflow-hidden border border-[#D5C2AA] shrink-0 bg-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: selectedImage,
										alt: "معاينة الصورة المرفقة",
										className: "h-full w-full object-cover"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 text-xs font-bold text-[#2B2119]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-3.5 w-3.5 text-[#8C2A3E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedImageName || "صورة مرفقة جاهزة للإرسال" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-[#735A45]",
									children: "يمكنكِ كتابة تعليق مع الصورة أو إرسالها مباشرة بالضغط على زر الإرسال"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setSelectedImage(null);
									setSelectedImageName("");
								},
								className: "p-1.5 rounded-full bg-white hover:bg-red-50 text-[#735A45] hover:text-red-600 border border-[#D5C2AA] transition-colors cursor-pointer",
								title: "إلغاء إرفاق الصورة",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 sm:p-4 bg-white border-t border-[#E3D4C0]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								ref: fileInputRef,
								onChange: handleFileChange,
								accept: "image/*",
								className: "hidden"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => fileInputRef.current?.click(),
											className: "flex items-center justify-center h-10 w-10 rounded-xl bg-[#FAF6F0] border border-[#D5C2AA] text-[#5A412F] hover:bg-[#EDE0CD] hover:text-[#2B2119] transition-all cursor-pointer shrink-0",
											title: "إرفاق صورة من جهازكِ",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4 text-[#8C2A3E]" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setIsProductPickerOpen(true),
											className: "flex items-center justify-center h-10 w-10 rounded-xl bg-[#FAF6F0] border border-[#D5C2AA] text-[#5A412F] hover:bg-[#EDE0CD] hover:text-[#2B2119] transition-all cursor-pointer shrink-0",
											title: "إرفاق صورة منتج من المتجر",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: inputText,
										onChange: (e) => setInputText(e.target.value),
										onKeyDown: handleKeyDown,
										onPaste: handlePaste,
										placeholder: selectedImage ? "اكتبي تعليقاً على الصورة المرفقة واضغطي Enter .." : "اكتبي رسالتكِ أو قومي بلصق صورة (Ctrl+V) ..",
										className: "flex-1 rounded-xl border border-[#D5C2AA] bg-[#FAF6F0] px-4 py-2.5 text-xs sm:text-sm text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none focus:border-[#2B2119]"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => handleSend(),
										disabled: !inputText.trim() && !selectedImage,
										className: "flex items-center justify-center h-10 px-4 rounded-xl bg-[#2B2119] text-white hover:bg-[#433225] active:scale-95 disabled:opacity-40 transition-all cursor-pointer shrink-0 gap-1.5 text-xs font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إرسال" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5 rotate-180" })]
									})
								]
							})]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 flex flex-col items-center justify-center p-12 text-center text-xs text-[#735A45]",
						children: "اختاري محادثة من القائمة للبدء في الدردشة"
					})
				})]
			}),
			isProductPickerOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "dialog",
				"aria-modal": "true",
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in",
				onClick: (e) => {
					if (e.target === e.currentTarget) setIsProductPickerOpen(false);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					dir: "rtl",
					className: "relative w-full max-w-2xl rounded-2xl bg-[#FAF6F0] p-6 shadow-2xl border border-[#E3D4C0] text-[#2B2119] max-h-[85vh] flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-3 border-b border-[#E3D4C0]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5 text-[#8C2A3E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-base text-[#2B2119]",
									children: "اختيار صورة منتج من كتالوج المتجر"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setIsProductPickerOpen(false),
								className: "p-1 rounded-full bg-[#EDE0CD] text-[#2B2119] hover:bg-[#E2CEB4] cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#735A45]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: productSearch,
									onChange: (e) => setProductSearch(e.target.value),
									placeholder: "ابحثي عن عباءة، فستان، خمار ..",
									className: "w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-[#D5C2AA] bg-white text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3 py-2",
							children: [filteredProducts.map((prod) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => {
									setSelectedImage(prod.image);
									setSelectedImageName(prod.name);
									setIsProductPickerOpen(false);
								},
								className: "group relative rounded-xl border border-[#D5C2AA] bg-white p-2 text-right hover:border-[#8C2A3E] hover:shadow-md transition-all cursor-pointer flex flex-col",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative aspect-3/4 w-full rounded-lg overflow-hidden bg-[#FAF6F0] mb-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: prod.image,
											alt: prod.name,
											className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold text-xs text-[#2B2119] line-clamp-1",
										children: prod.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] font-mono text-[#8C2A3E] font-bold mt-1",
										children: [prod.price.toLocaleString("ar-DZ"), " دج"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-2 text-[10px] text-center py-1 rounded-md bg-[#FAF6F0] group-hover:bg-[#2B2119] group-hover:text-white transition-colors font-semibold",
										children: "إرفاق هذا الموديل"
									})
								]
							}, prod.id)), filteredProducts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "col-span-full py-8 text-center text-xs text-[#735A45]",
								children: "لم يتم العثور على منتجات مطابقة"
							})]
						})
					]
				})
			}),
			lightboxImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "dialog",
				"aria-modal": "true",
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in",
				onClick: (e) => {
					if (e.target === e.currentTarget) setLightboxImage(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-4xl max-h-[90vh] flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full flex items-center justify-between pb-3 text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-bold truncate max-w-[70%]",
							children: lightboxImage.caption || "عرض الصورة بالحجم الكامل"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: lightboxImage.url,
								download: "hijab-soul-chat-image.jpg",
								target: "_blank",
								rel: "noreferrer",
								className: "p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer",
								title: "تحميل الصورة",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setLightboxImage(null),
								className: "p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer",
								title: "إغلاق",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-black/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: lightboxImage.url,
							alt: "الصورة بالحجم الكامل",
							className: "max-h-[80vh] max-w-full object-contain rounded-2xl"
						})
					})]
				})
			})
		]
	});
}
function AdminSettings() {
	const [storeName, setStoreName] = (0, import_react.useState)("حجاب سول — Hijab Soul");
	const [supportPhone, setSupportPhone] = (0, import_react.useState)("0661234589");
	const [adminEmail, setAdminEmail] = (0, import_react.useState)(ADMIN_EMAILS[0] || "nexa.am.dz@gmail.com");
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-4xl",
		children: [
			savedToast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-2xl bg-[#2B2119] text-white px-5 py-3 shadow-2xl border border-[#D5C2AA] text-sm animate-in slide-in-from-bottom-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تم حفظ إعدادات المتجر بنجاح!" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl sm:text-2xl font-black text-[#2B2119]",
				children: "إعدادات المتجر والشحن"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs sm:text-sm text-[#735A45]",
				children: "تخصيص بيانات المتجر، حساب الإدارة المعتمد، وأسعار التوصيل للولايات الجزائرية"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSave,
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[#FAF6F0] p-5 sm:p-6 border border-[#E3D4C0] space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm sm:text-base font-bold text-[#2B2119] flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-4 w-4 text-[#8C2A3E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "بيانات حساب المدير العام (Super Admin)" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "مُعتمد ومفعّل" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "البريد الإلكتروني للإدارة"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										value: adminEmail,
										onChange: (e) => setAdminEmail(e.target.value),
										className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 pl-9 text-xs sm:text-sm text-[#2B2119] font-mono focus:outline-none focus:border-[#2B2119]",
										dir: "ltr"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9F8A77]" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-[#735A45] mt-1",
									children: "حساب المدير يمتلك صلاحيات إدارة وتعديل المنتجات، الأسعار، الأقسام، واستقبال الطلبات."
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-[#EDE0CD]/60 p-3.5 border border-[#D5C2AA] flex flex-col justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs font-bold text-[#2B2119] mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5 text-[#8C2A3E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "حالة الحماية والصلاحيات:" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[#5A412F]",
									children: "عند تسجيل الدخول بهذا البريد عبر جوجل أو كلمة المرور، تُفتح لوحة الإدارة تلقائياً في القائمة العلوية."
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[#FAF6F0] p-5 sm:p-6 border border-[#E3D4C0] space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm sm:text-base font-bold text-[#2B2119] flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-4 w-4 text-[#8C2A3E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "بيانات المتجر العامة" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "اسم المتجر"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: storeName,
									onChange: (e) => setStoreName(e.target.value),
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "رقم خدمة العملاء (واتساب / هاتف)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: supportPhone,
										onChange: (e) => setSupportPhone(e.target.value),
										className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]",
										dir: "ltr"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9F8A77]" })]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-bold text-[#423124] mb-1",
								children: "شريط الإعلان أعلى الموقع"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: announcement,
								onChange: (e) => setAnnouncement(e.target.value),
								className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[#FAF6F0] p-5 sm:p-6 border border-[#E3D4C0] space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-sm sm:text-base font-bold text-[#2B2119] flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-[#8C2A3E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تسعير الشحن للولايات (دج)" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "الجزائر العاصمة والوسط"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: shippingAlgiers,
									onChange: (e) => setShippingAlgiers(Number(e.target.value)),
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm font-bold text-[#2B2119]",
									dir: "ltr"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "الولايات الشمالية والشرق/الغرب"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: shippingMajorCities,
									onChange: (e) => setShippingMajorCities(Number(e.target.value)),
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm font-bold text-[#2B2119]",
									dir: "ltr"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[#423124] mb-1",
									children: "ولايات الجنوب والهضاب"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: shippingSouth,
									onChange: (e) => setShippingSouth(Number(e.target.value)),
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm font-bold text-[#2B2119]",
									dir: "ltr"
								})] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "px-6 py-2.5 rounded-xl bg-[#2B2119] text-white font-bold text-xs sm:text-sm hover:bg-[#433225] active:scale-95 transition-all shadow-md cursor-pointer",
						children: "حفظ التغييرات"
					})
				]
			})
		]
	});
}
function AdminDashboardPage() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	const [selectedOrderForDetails, setSelectedOrderForDetails] = (0, import_react.useState)(null);
	const [activeChatConvId, setActiveChatConvId] = (0, import_react.useState)(void 0);
	const { user, profile, isAdmin, openAuthModal, signOut, signInWithGoogle } = useAuth();
	const currentAdminEmail = user?.email || ADMIN_EMAILS[0] || "nexa.am.dz@gmail.com";
	const { products, orders, conversations, categories, heroBanner, updateProduct, addProduct, deleteProduct, updateOrderStatus, sendMessage, markConversationAsRead, updateCategory, addCategory, deleteCategory, resetCategoriesToDefault, updateHeroBanner } = useStoreData();
	const unreadMessagesTotal = conversations.reduce((sum, c) => sum + c.unreadCount, 0);
	const pendingOrdersCount = orders.filter((o) => o.status === "pending" || o.status === "processing").length;
	const handleOpenCustomerChat = (customerName) => {
		const existing = conversations.find((c) => c.customerName.toLowerCase() === customerName.toLowerCase());
		if (existing) setActiveChatConvId(existing.id);
		setActiveTab("chat");
	};
	if (!user || !isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		dir: "rtl",
		className: "min-h-screen bg-[#FAF6F0] text-[#2B2119] flex flex-col font-sans selection:bg-[#8C2A3E] selection:text-white",
		style: { backgroundImage: "linear-gradient(180deg, #FAF6F0 0%, #F5EDE0 100%), radial-gradient(circle at 15% 15%, rgba(60,45,30,0.02) 0 1px, transparent 1px)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "w-full bg-[#2B2119] text-[#FAF6F0] py-4 px-6 border-b border-[#433225]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-5xl mx-auto flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hijab_soul_mark_default,
						alt: "حجاب سول",
						className: "h-8 w-auto"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg text-white",
						children: "Hijab Soul"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "text-xs text-[#E5D2B8] hover:text-white transition-colors font-bold inline-flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "العودة للمتجر" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 rotate-180" })]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 flex items-center justify-center p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md rounded-2xl bg-white p-7 sm:p-9 shadow-xl border border-[#E3D4C0] text-center space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF6F0] border-2 border-[#D5C2AA] text-[#8C2A3E]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl sm:text-2xl font-black text-[#2B2119]",
						children: "منطقة إدارة المتجر المحمية"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs sm:text-sm text-[#735A45] mt-2 leading-relaxed",
						children: [
							"لوحة التحكم مخصصة حصرياً للمدير العام. يرجى تسجيل الدخول أو إنشاء حساب بالبريد المعتمد",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono font-bold text-[#8C2A3E]",
								dir: "ltr",
								children: "nexa.am.dz@gmail.com"
							}),
							" ",
							"للوصول."
						]
					})] }),
					user && !isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-right space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold",
								children: "حسابك الحالي غير مصرح له بالإدارة:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[11px] text-[#5A412F]",
								dir: "ltr",
								children: [user.email, " (حساب زبون عادي)"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-2 flex gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										signOut().then(() => {
											openAuthModal("signin", "nexa.am.dz@gmail.com");
										});
									},
									className: "flex-1 py-2 px-3 rounded-lg bg-[#2B2119] text-white text-xs font-bold hover:bg-[#3D2F24] cursor-pointer",
									children: "تبديل إلى حساب المدير"
								})
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2.5 pt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: async () => {
									await signInWithGoogle({ email: "nexa.am.dz@gmail.com" });
								},
								className: "w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white border border-[#D5C2AA] text-[#2B2119] hover:bg-[#FAF6F0] hover:border-[#2B2119] active:scale-[0.98] shadow-sm transition-all font-bold text-xs sm:text-sm cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									className: "h-4 w-4 shrink-0",
									viewBox: "0 0 24 24",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#4285F4",
											d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#34A853",
											d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#FBBC05",
											d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#EA4335",
											d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "دخول فوري بحساب Google المعتمد" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex items-center justify-center my-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-[#E3D4C0] w-full" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-[#FAF6F0] px-3 text-[11px] text-[#8C745E] shrink-0",
										children: "أو بكلمة المرور"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-[#E3D4C0] w-full" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => openAuthModal("signin", "nexa.am.dz@gmail.com"),
								className: "w-full py-2.5 px-4 rounded-xl bg-[#2B2119] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#3D2F24] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-[#E5D2B8]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تسجيل الدخول بالبريد وكلمة المرور" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => openAuthModal("signup", "nexa.am.dz@gmail.com"),
								className: "w-full py-2 px-4 rounded-xl bg-[#FAF6F0] hover:bg-[#F2E8DC] text-[#2B2119] border border-[#D5C2AA] text-xs font-bold transition-all cursor-pointer",
								children: "إنشاء حساب جديد للمدير"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-3 border-t border-[#E3D4C0]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-xs text-[#735A45] hover:text-[#2B2119] underline font-medium",
							children: "العودة إلى الصفحة الرئيسية للمتجر"
						})
					})
				]
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		dir: "rtl",
		className: "min-h-screen bg-[#FAF6F0] text-[#2B2119] flex flex-col font-sans selection:bg-[#8C2A3E] selection:text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 w-full bg-[#2B2119] text-[#FAF6F0] shadow-md border-b border-[#433225]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-2.5 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: hijab_soul_mark_default,
								alt: "حجاب سول",
								className: "h-9 w-auto select-none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg tracking-wide text-white flex items-center gap-1",
								children: "Hijab Soul"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-[#D5C2AA] block -mt-1 font-semibold",
								children: "لوحة تحكم المدير"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] text-[#E5D2B8] font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-[#E5D2B8]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "وضع الإدارة نشط" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 sm:gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-[#E5D2B8]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[11px]",
								dir: "ltr",
								children: currentAdminEmail
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF6F0] text-xs font-bold transition-all border border-white/10 active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "معاينة المتجر" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 rotate-180" })]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-[#3D2E22] bg-[#241B14]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex w-full max-w-[1400px] items-center gap-1 sm:gap-2 px-4 sm:px-6 overflow-x-auto py-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab("overview"),
								className: `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${activeTab === "overview" ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm" : "text-[#D5C2AA] hover:text-white hover:bg-white/5"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الرئيسية والإحصائيات" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab("categories"),
								className: `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${activeTab === "categories" ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm" : "text-[#D5C2AA] hover:text-white hover:bg-white/5"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"الأقسام والصور (",
									categories.length,
									")"
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab("products"),
								className: `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${activeTab === "products" ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm" : "text-[#D5C2AA] hover:text-white hover:bg-white/5"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"المنتجات والأسعار (",
									products.length,
									")"
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab("orders"),
								className: `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all relative ${activeTab === "orders" ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm" : "text-[#D5C2AA] hover:text-white hover:bg-white/5"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الطلبات الواردة" }),
									pendingOrdersCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-4 min-w-[16px] px-1 rounded-full bg-amber-500 text-[10px] font-bold text-white flex items-center justify-center",
										children: pendingOrdersCount
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab("chat"),
								className: `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all relative ${activeTab === "chat" ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm" : "text-[#D5C2AA] hover:text-white hover:bg-white/5"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "دردشة العملاء" }),
									unreadMessagesTotal > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-4 min-w-[16px] px-1 rounded-full bg-[#8C2A3E] text-[10px] font-bold text-white flex items-center justify-center",
										children: unreadMessagesTotal
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab("settings"),
								className: `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${activeTab === "settings" ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm" : "text-[#D5C2AA] hover:text-white hover:bg-white/5"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الإعدادات" })]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 mx-auto w-full max-w-[1400px] p-4 sm:p-6 lg:p-8",
				children: [
					activeTab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminOverview, {
						products,
						orders,
						conversations,
						categories,
						onTabChange: setActiveTab,
						onSelectOrder: (ord) => {
							setSelectedOrderForDetails(ord);
							setActiveTab("orders");
						}
					}),
					activeTab === "categories" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCategories, {
						categories,
						heroBanner,
						onUpdateCategory: updateCategory,
						onAddCategory: addCategory,
						onDeleteCategory: deleteCategory,
						onResetCategories: resetCategoriesToDefault,
						onUpdateHeroBanner: updateHeroBanner
					}),
					activeTab === "products" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminProducts, {
						products,
						onUpdateProduct: updateProduct,
						onAddProduct: addProduct,
						onDeleteProduct: deleteProduct
					}),
					activeTab === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminOrders, {
						orders,
						selectedOrder: selectedOrderForDetails,
						onUpdateOrderStatus: updateOrderStatus,
						onOpenCustomerChat: handleOpenCustomerChat
					}),
					activeTab === "chat" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminChat, {
						conversations,
						products,
						activeConversationId: activeChatConvId,
						onSendMessage: sendMessage,
						onMarkAsRead: markConversationAsRead
					}),
					activeTab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSettings, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-auto border-t border-[#E3D4C0] bg-[#FAF6F0] py-4 text-center text-xs text-[#735A45]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1400px] px-4 flex flex-col sm:flex-row items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["نظام إدارة متجر حجاب سول — جميع الحقوق محفوظة © ", (/* @__PURE__ */ new Date()).getFullYear()] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-[#8C2A3E]",
						children: "إنه أكثر من مجرد ملابس .. إنه أسلوب حياة ♡"
					})]
				})
			})
		]
	});
}
//#endregion
export { AdminDashboardPage as component };
