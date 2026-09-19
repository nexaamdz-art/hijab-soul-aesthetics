import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Heart,
  ShoppingBag,
  Check,
  Truck,
  Sparkles,
  Search,
  ArrowRight,
  X,
  Plus,
  Minus,
  Crown,
} from "lucide-react";
import { useStoreData, AdminProduct, CustomerOrder } from "@/lib/store-data";

export interface CategoryPageProps {
  title: string;
  categoryKey?: string;
  subtitle?: string;
}

// 58 Algerian Wilayas
const ALGERIAN_WILAYAS = [
  { code: "01", name: "01 - أدرار", region: "south" },
  { code: "02", name: "02 - الشلف", region: "north" },
  { code: "03", name: "03 - الأغواط", region: "south" },
  { code: "04", name: "04 - أم البواقي", region: "north" },
  { code: "05", name: "05 - باتنة", region: "north" },
  { code: "06", name: "06 - بجاية", region: "north" },
  { code: "07", name: "07 - بسكرة", region: "south" },
  { code: "08", name: "08 - بشار", region: "south" },
  { code: "09", name: "09 - البليدة", region: "center" },
  { code: "10", name: "10 - البويرة", region: "center" },
  { code: "11", name: "11 - تمنراست", region: "south" },
  { code: "12", name: "12 - تبسة", region: "north" },
  { code: "13", name: "13 - تلمسان", region: "north" },
  { code: "14", name: "14 - تيارت", region: "north" },
  { code: "15", name: "15 - تيزي وزو", region: "center" },
  { code: "16", name: "16 - الجزائر العاصمة", region: "center" },
  { code: "17", name: "17 - الجلفة", region: "south" },
  { code: "18", name: "18 - جيجل", region: "north" },
  { code: "19", name: "19 - سطيف", region: "north" },
  { code: "20", name: "20 - سعيدة", region: "north" },
  { code: "21", name: "21 - سكيكدة", region: "north" },
  { code: "22", name: "22 - سيدي بلعباس", region: "north" },
  { code: "23", name: "23 - عنابة", region: "north" },
  { code: "24", name: "24 - قالمة", region: "north" },
  { code: "25", name: "25 - قسنطينة", region: "north" },
  { code: "26", name: "26 - المدية", region: "center" },
  { code: "27", name: "27 - مستغانم", region: "north" },
  { code: "28", name: "28 - المسيلة", region: "north" },
  { code: "29", name: "29 - معسكر", region: "north" },
  { code: "30", name: "30 - ورقلة", region: "south" },
  { code: "31", name: "31 - وهران", region: "north" },
  { code: "32", name: "32 - البيض", region: "south" },
  { code: "33", name: "33 - إليزي", region: "south" },
  { code: "34", name: "34 - برج بوعريريج", region: "north" },
  { code: "35", name: "35 - بومرداس", region: "center" },
  { code: "36", name: "36 - الطارف", region: "north" },
  { code: "37", name: "37 - تندوف", region: "south" },
  { code: "38", name: "38 - تسمسيلت", region: "north" },
  { code: "39", name: "39 - الوادي", region: "south" },
  { code: "40", name: "40 - خنشلة", region: "north" },
  { code: "41", name: "41 - سوق أهراس", region: "north" },
  { code: "42", name: "42 - تيبازة", region: "center" },
  { code: "43", name: "43 - ميلة", region: "north" },
  { code: "44", name: "44 - عين الدفلى", region: "center" },
  { code: "45", name: "45 - النعامة", region: "south" },
  { code: "46", name: "46 - عين تموشنت", region: "north" },
  { code: "47", name: "47 - غرداية", region: "south" },
  { code: "48", name: "48 - غليزان", region: "north" },
  { code: "49", name: "49 - تيميمون", region: "south" },
  { code: "50", name: "50 - برج باجي مختار", region: "south" },
  { code: "51", name: "51 - أولاد جلال", region: "south" },
  { code: "52", name: "52 - بني عباس", region: "south" },
  { code: "53", name: "53 - عين صالح", region: "south" },
  { code: "54", name: "54 - عين قزام", region: "south" },
  { code: "55", name: "55 - تقرت", region: "south" },
  { code: "56", name: "56 - جانت", region: "south" },
  { code: "57", name: "57 - المغير", region: "south" },
  { code: "58", name: "58 - المنيعة", region: "south" },
];

function getShippingCost(wilayaName: string): number {
  const w = ALGERIAN_WILAYAS.find((item) => item.name === wilayaName);
  if (!w) return 600;
  if (w.region === "center") return 500;
  if (w.region === "south") return 900;
  return 700;
}

function formatDZD(amount: number): string {
  return `${amount.toLocaleString("en-US")} دج`;
}

// Map page titles to store category keys
function resolveCategory(title: string, categoryKey?: string): string | null {
  if (categoryKey) return categoryKey;
  const t = title.trim();
  if (t === "إكسسوارات" || t === "اكسسوارات") return "accessories";
  if (t === "عبايات" || t === "عباءات") return "abayas";
  if (t === "فساتين") return "dresses";
  if (t === "خمارات") return "khimar";
  if (t === "إسدالات" || t === "اسدالات") return "isdalat";
  if (t === "مستلزمات الحجاب" || t === "حجابات") return "hijab-supplies";
  if (t === "تخفيضات") return "sales";
  if (t === "تسوقي الآن" || t === "المتجر") return null; // all
  return null;
}

export function CategoryPage({ title, categoryKey, subtitle }: CategoryPageProps) {
  const { products: storeProducts, addOrder } = useStoreData();
  const resolvedCat = resolveCategory(title, categoryKey);

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Quick Order Modal
  const [orderModalProduct, setOrderModalProduct] = useState<AdminProduct | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedWilaya, setSelectedWilaya] = useState("16 - الجزائر العاصمة");
  const [commune, setCommune] = useState("");
  const [address, setAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [orderSubmittedSuccess, setOrderSubmittedSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter products by resolved category
  const categoryProducts = useMemo(() => {
    if (!resolvedCat) return storeProducts;
    if (resolvedCat === "sales") {
      return storeProducts.filter(
        (p) => p.category === "sales" || (p.originalPrice && p.originalPrice > p.price),
      );
    }
    if (resolvedCat === "hijab-supplies" || resolvedCat === "khimar") {
      return storeProducts.filter(
        (p) => p.category === "hijab-supplies" || p.category === "khimar",
      );
    }
    return storeProducts.filter((p) => p.category === resolvedCat);
  }, [storeProducts, resolvedCat]);

  // Apply search and sort
  const displayProducts = useMemo(() => {
    let list = [...categoryProducts];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)),
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [categoryProducts, searchQuery, sortBy]);

  // Favorite toggle
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

  // Add to cart with header badge animation
  const handleAddToCart = (product: AdminProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const badge = document.querySelector('button[aria-label="سلة التسوق"] span');
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
      setAddedProductId((prev) => (prev === product.id ? null : prev));
    }, 1400);
  };

  // Open Quick Order Modal
  const handleOpenQuickOrder = (product: AdminProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOrderModalProduct(product);
    setOrderQuantity(1);
    setOrderSubmittedSuccess(null);
  };

  // Handle Quick Order Submission
  const handleConfirmOrder = (e: React.FormEvent) => {
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
    const orderNumber = `HS-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: CustomerOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: customerName.trim(),
      phone: customerPhone.trim(),
      wilaya: selectedWilaya,
      commune: commune.trim() || "المركز",
      address: address.trim(),
      items: [
        {
          productId: orderModalProduct.id,
          name: orderModalProduct.name,
          price: orderModalProduct.price,
          quantity: orderQuantity,
          image: orderModalProduct.image,
        },
      ],
      totalAmount,
      shippingCost,
      grandTotal,
      status: "pending",
      createdAt: "الآن",
      notes: orderNotes.trim() || undefined,
    };

    setTimeout(() => {
      addOrder(newOrder);
      setIsSubmitting(false);
      setOrderSubmittedSuccess(orderNumber);
    }, 400);
  };

  return (
    <div className="w-full bg-[#FAF6F0] text-[#2B2119] min-h-[70vh] py-8 sm:py-12">
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="مسار التنقل"
          className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-[#735A45]"
        >
          <Link to="/" className="hover:text-[#2B2119] transition-colors">
            الرئيسية
          </Link>
          <span className="opacity-50">/</span>
          <span className="font-bold text-[#2B2119]">{title}</span>
        </nav>

        {/* Section Header with Artistic Dark Brush Banner */}
        <div className="relative mb-8 sm:mb-10 text-center">
          <div className="inline-block relative px-8 py-3">
            <div
              className="absolute inset-0 bg-[#2B2119] rounded-2xl shadow-md -rotate-0.5"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #3A2D23 0%, #2B2119 100%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0 1px, transparent 1px)",
                backgroundSize: "100% 100%, 8px 8px",
              }}
            />
            <div className="relative z-10 flex items-center justify-center gap-2.5 text-white">
              <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-[#E2D0AC]" />
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-wide">
                {title}
              </h1>
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#E2D0AC]" />
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-[#5A412F] max-w-2xl mx-auto font-medium leading-relaxed">
            {subtitle ||
              (resolvedCat === "accessories"
                ? "تشكيلة مختارة بعناية من أرقى الإكسسوارات، الحقائب الفاخرة، المجوهرات الذهبية، وأطواق الشعر التي تكتمل بها إطلالتك المحتشمة."
                : `استكشفي أحدث وأرقى تشكيلات ${title} المصممة لتجمع بين الأصالة والحشمة والأناقة.`)}
          </p>
        </div>

        {/* Search & Sort Bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-3.5 bg-[#EDE0CD]/40 p-3 sm:p-4 rounded-2xl border border-[#E3D4C0]">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`ابحثي في ${title} ...`}
              className="w-full rounded-xl border border-[#D5C2AA] bg-white pr-9 pl-3 py-2 text-xs sm:text-sm text-[#2B2119] placeholder:text-[#8C7665] focus:border-[#2B2119] focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#735A45]" />
          </div>

          {/* Results Count & Sort Dropdown */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
            <span className="text-xs sm:text-sm font-bold text-[#735A45]">
              عرض <strong className="text-[#2B2119]">{displayProducts.length}</strong> منتج
            </span>

            <div className="flex items-center gap-1.5">
              <label
                htmlFor="sort-select"
                className="text-xs text-[#735A45] font-semibold whitespace-nowrap"
              >
                الترتيب:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "featured" | "price-asc" | "price-desc")
                }
                className="rounded-xl border border-[#D5C2AA] bg-white px-3 py-1.5 text-xs text-[#2B2119] font-bold focus:border-[#2B2119] focus:outline-none"
              >
                <option value="featured">المميز أولاً</option>
                <option value="price-asc">الأقل سعراً</option>
                <option value="price-desc">الأعلى سعراً</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {displayProducts.length === 0 ? (
          <div className="py-16 text-center bg-[#EDE0CD]/30 rounded-3xl border border-[#E3D4C0] p-8">
            <ShoppingBag className="mx-auto h-12 w-12 text-[#A48E7C] mb-3" />
            <h3 className="text-base sm:text-lg font-bold text-[#2B2119]">
              لا توجد منتجات مطابقة للبحث
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#735A45]">
              جربي تغيير كلمات البحث أو اختيار تبويب آخر لرؤية المنتجات.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#3D2E24]"
            >
              عرض جميع المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 md:gap-6">
            {displayProducts.map((product) => {
              const isFav = favorites.has(product.id);
              const isAdded = addedProductId === product.id;
              const hasDiscount = product.originalPrice && product.originalPrice > product.price;

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col rounded-2xl bg-[#F1E6D0] p-2.5 sm:p-3 shadow-[0_4px_14px_rgba(43,33,25,0.08)] border border-[#E2D2BC] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(43,33,25,0.14)]"
                  style={{
                    backgroundImage: "linear-gradient(180deg, #FAF4E8 0%, #F1E6D0 100%)",
                  }}
                >
                  {/* Product Image Box */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-[#E4D4BE]">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Favorite Heart Button */}
                    <button
                      type="button"
                      aria-label={isFav ? `إزالة من المفضلة` : `إضافة للمفضلة`}
                      onClick={(e) => toggleFavorite(product.id, e)}
                      className="absolute top-2 left-2 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#FAF5EE]/90 backdrop-blur-xs text-[#2B2119] shadow-sm transition-all duration-200 hover:scale-110 active:scale-95"
                    >
                      <Heart
                        className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors duration-200 ${
                          isFav
                            ? "fill-[#8C2A3E] text-[#8C2A3E]"
                            : "text-[#2B2119]/70 hover:text-[#8C2A3E]"
                        }`}
                        strokeWidth={2}
                      />
                    </button>

                    {/* Offer Badge if on sale */}
                    {hasDiscount && (
                      <span className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-md bg-[#8C2A3E] text-white text-[10px] sm:text-xs font-black shadow-xs">
                        تخفيض
                      </span>
                    )}

                    {/* Stock Alert */}
                    {product.stock <= 8 && (
                      <span className="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded-md bg-[#2B2119]/80 backdrop-blur-xs text-white text-[10px] font-bold">
                        بقي {product.stock} فقط
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="mt-2.5 sm:mt-3 flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-xs sm:text-sm md:text-[15px] font-bold text-[#2B2119] leading-snug line-clamp-2 min-h-[34px]">
                        {product.name}
                      </h3>

                      {product.description && (
                        <p className="mt-1 text-[11px] sm:text-xs text-[#735A45] line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      )}
                    </div>

                    {/* Price in DZD */}
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-sm sm:text-base font-extrabold text-[#2B2119] tracking-tight">
                        {formatDZD(product.price)}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs text-[#8C7665] line-through font-semibold">
                          {formatDZD(product.originalPrice!)}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons: Quick Order & Add to Cart */}
                    <div className="mt-3 grid grid-cols-1 gap-1.5 pt-1 border-t border-[#E3D4C0]">
                      {/* Direct Quick Purchase Button */}
                      <button
                        type="button"
                        onClick={(e) => handleOpenQuickOrder(product, e)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#2B2119] hover:bg-[#3D2E24] text-white text-xs font-bold transition-all duration-150 active:scale-98 shadow-xs"
                      >
                        <Truck className="h-3.5 w-3.5 text-[#E2D0AC]" />
                        <span>طلب سريع (الدفع عند الاستلام)</span>
                      </button>

                      {/* Add to Cart Button */}
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all duration-150 active:scale-98 ${
                          isAdded
                            ? "bg-emerald-700 text-white border-emerald-700"
                            : "bg-[#FAF6F0] text-[#423124] border-[#D5C2AA] hover:bg-[#EDE0CD]"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>تمت الإضافة للسلة ✓</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="h-3.5 w-3.5 text-[#735A45]" />
                            <span>أضيفي للسلة</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* QUICK ORDER MODAL (ALGERIAN CHECKOUT) */}
      {orderModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div
            dir="rtl"
            className="relative w-full max-w-lg rounded-3xl bg-[#FAF6F0] p-5 sm:p-7 shadow-2xl border border-[#D5C2AA] text-[#2B2119] my-6"
            style={{
              backgroundImage: "linear-gradient(180deg, #FCF9F4 0%, #F5EDE0 100%)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setOrderModalProduct(null);
                setOrderSubmittedSuccess(null);
              }}
              className="absolute top-4 left-4 p-1.5 rounded-full bg-[#EDE0CD] text-[#2B2119] hover:bg-[#E3D4C0] transition-colors"
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
            </button>

            {orderSubmittedSuccess ? (
              /* Success Confirmation Screen */
              <div className="py-6 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="h-8 w-8 stroke-[2.5]" />
                </div>

                <h3 className="text-xl font-black text-[#2B2119]">تم استلام طلبكِ بنجاح!</h3>

                <p className="text-sm text-[#5A412F] leading-relaxed max-w-sm mx-auto">
                  شكراً لثقتكِ في <strong>حجاب سول</strong>. رقم طلبكِ هو:
                </p>

                <div className="inline-block px-4 py-2 rounded-xl bg-[#EDE0CD] font-mono text-base font-black text-[#2B2119] border border-[#D5C2AA]">
                  #{orderSubmittedSuccess}
                </div>

                <div className="rounded-2xl bg-white/70 p-4 text-xs sm:text-sm text-right space-y-1.5 border border-[#E3D4C0]">
                  <p className="font-bold text-[#2B2119]">تفاصيل الشحن:</p>
                  <p className="text-[#5A412F]">
                    العميل: <strong>{customerName}</strong> ({customerPhone})
                  </p>
                  <p className="text-[#5A412F]">
                    الولاية: <strong>{selectedWilaya}</strong> — {commune || "المركز"}
                  </p>
                  <p className="text-[#5A412F]">
                    العنوان: <strong>{address}</strong>
                  </p>
                  <p className="text-[#5A412F]">
                    المجموع الكلي مع التوصيل:{" "}
                    <strong className="text-[#8C2A3E]">
                      {formatDZD(
                        orderModalProduct.price * orderQuantity + getShippingCost(selectedWilaya),
                      )}
                    </strong>
                  </p>
                  <p className="text-[11px] text-emerald-700 font-semibold pt-1">
                    ✓ الدفع نقداً عند الاستلام ومعاينة الطلب.
                  </p>
                </div>

                <p className="text-xs text-[#735A45]">
                  سنتصل بكِ على الرقم ({customerPhone}) لتأكيد موعد التوصيل قبل الإرسال.
                </p>

                <button
                  onClick={() => {
                    setOrderModalProduct(null);
                    setOrderSubmittedSuccess(null);
                  }}
                  className="w-full py-3 rounded-2xl bg-[#2B2119] text-white font-bold text-sm hover:bg-[#3D2E24] transition-colors"
                >
                  مواصلة التسوق
                </button>
              </div>
            ) : (
              /* Direct Order Form */
              <form onSubmit={handleConfirmOrder} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-[#E3D4C0] pb-3.5">
                  <img
                    src={orderModalProduct.image}
                    alt={orderModalProduct.name}
                    className="h-16 w-16 rounded-xl object-cover border border-[#D5C2AA] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold text-[#8C2A3E]">
                      طلب فوري (توصيل للمنزل)
                    </span>
                    <h3 className="text-sm font-black text-[#2B2119] truncate">
                      {orderModalProduct.name}
                    </h3>
                    <p className="text-xs font-extrabold text-[#2B2119] mt-0.5">
                      {formatDZD(orderModalProduct.price)}
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between bg-[#EDE0CD]/50 p-2.5 rounded-xl border border-[#E3D4C0]">
                  <span className="text-xs font-bold text-[#423124]">الكمية المطلوبة:</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setOrderQuantity((q) => Math.max(1, q - 1))}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#2B2119] shadow-xs border border-[#D5C2AA]"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="font-bold text-sm w-5 text-center">{orderQuantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setOrderQuantity((q) => Math.min(orderModalProduct.stock || 10, q + 1))
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#2B2119] shadow-xs border border-[#D5C2AA]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-[#423124] mb-1">
                      الاسم الكامل <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="مثال: أمينة بن ساسي"
                      className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] placeholder:text-[#8C7665] focus:border-[#2B2119] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#423124] mb-1">
                      رقم الهاتف <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="مثال: 0661234589 أو 0555..."
                      className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] placeholder:text-[#8C7665] focus:border-[#2B2119] focus:outline-none"
                      dir="ltr"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#423124] mb-1">
                        الولاية (58 ولاية) <span className="text-rose-600">*</span>
                      </label>
                      <select
                        value={selectedWilaya}
                        onChange={(e) => setSelectedWilaya(e.target.value)}
                        className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] font-bold focus:border-[#2B2119] focus:outline-none"
                      >
                        {ALGERIAN_WILAYAS.map((w) => (
                          <option key={w.code} value={w.name}>
                            {w.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#423124] mb-1">البلدية</label>
                      <input
                        type="text"
                        value={commune}
                        onChange={(e) => setCommune(e.target.value)}
                        placeholder="مثال: دالي إبراهيم"
                        className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#8C7665] focus:border-[#2B2119] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#423124] mb-1">
                      العنوان بالتفصيل <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="الحي، رقم العمارة، أو معالم قريبة لتسهيل التوصيل"
                      className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#8C7665] focus:border-[#2B2119] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#423124] mb-1">
                      ملاحظات إضافية (اختياري)
                    </label>
                    <input
                      type="text"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="مثال: يرجى الاتصال بعد الظهر، أو لون محدد"
                      className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#8C7665] focus:border-[#2B2119] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="rounded-2xl bg-[#EDE0CD]/60 p-3.5 space-y-1.5 text-xs border border-[#E3D4C0]">
                  <div className="flex justify-between text-[#5A412F]">
                    <span>سعر المنتج ({orderQuantity} قطعة):</span>
                    <span>{formatDZD(orderModalProduct.price * orderQuantity)}</span>
                  </div>
                  <div className="flex justify-between text-[#5A412F]">
                    <span>تكلفة التوصيل ({selectedWilaya.split("-")[1] || selectedWilaya}):</span>
                    <span>{formatDZD(getShippingCost(selectedWilaya))}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-[#2B2119] pt-2 border-t border-[#D5C2AA]">
                    <span>المجموع الإجمالي عند الاستلام:</span>
                    <span className="text-[#8C2A3E]">
                      {formatDZD(
                        orderModalProduct.price * orderQuantity + getShippingCost(selectedWilaya),
                      )}
                    </span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-[#2B2119] text-white font-bold text-sm hover:bg-[#3D2E24] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>جاري إرسال الطلب ...</span>
                  ) : (
                    <>
                      <Check className="h-4 w-4 text-[#E2D0AC]" />
                      <span>تأكيد الطلب الآن (الدفع عند الباب)</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
