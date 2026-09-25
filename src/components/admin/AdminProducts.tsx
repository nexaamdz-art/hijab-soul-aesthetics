import { useState, useRef } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Upload,
  Check,
  X,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { AdminProduct, getProductFallbackImage, compressImageFile } from "@/lib/store-data";

interface AdminProductsProps {
  products: AdminProduct[];
  onUpdateProduct: (product: AdminProduct) => void;
  onAddProduct: (product: Omit<AdminProduct, "id" | "createdAt">) => void;
  onDeleteProduct: (id: string) => void;
}

const CATEGORY_MAP: Record<AdminProduct["category"], string> = {
  abayas: "العبايات",
  dresses: "الفساتين",
  khimar: "الخمار",
  isdalat: "الإسدالات",
  accessories: "الإكسسوارات",
  "hijab-supplies": "مستلزمات الحجاب",
  sales: "تخفيضات",
};

const DEFAULT_IMAGE_OPTIONS = [
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
  "/images/uploads/sage_green_crossbody_1789829366417.jpg",
];

export function AdminProducts({
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
}: AdminProductsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState<number>(3500);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number | undefined>(undefined);
  const [formImage, setFormImage] = useState("/images/products/product-1.jpg");
  const [formCategory, setFormCategory] = useState<AdminProduct["category"]>("dresses");
  const [formStock, setFormStock] = useState<number>(10);
  const [formDescription, setFormDescription] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormName("");
    setFormPrice(3500);
    setFormOriginalPrice(undefined);
    setFormImage("/images/products/product-1.jpg");
    setFormCategory("dresses");
    setFormStock(15);
    setFormDescription("");
    setIsModalOpen(true);
  };

  const openEditModal = (product: AdminProduct) => {
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

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingImage(true);
      try {
        const compressed = await compressImageFile(file, 1200, 0.88);
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: compressed }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.url) {
            setFormImage(data.url);
            showToast("تم رفع وحفظ الصورة بنجاح!");
            return;
          }
        }
        setFormImage(compressed);
      } catch (err) {
        console.error("Image upload error:", err);
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            setFormImage(reader.result);
          }
        };
        reader.readAsDataURL(file);
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        name: formName.trim(),
        price: Number(formPrice),
        originalPrice: formOriginalPrice ? Number(formOriginalPrice) : undefined,
        image: formImage,
        category: formCategory,
        stock: Number(formStock),
        description: formDescription.trim(),
      });
      showToast("تم تحديث المنتج بنجاح!");
    } else {
      onAddProduct({
        name: formName.trim(),
        price: Number(formPrice),
        originalPrice: formOriginalPrice ? Number(formOriginalPrice) : undefined,
        image: formImage,
        category: formCategory,
        stock: Number(formStock),
        href: `/${formCategory}`,
        description: formDescription.trim(),
      });
      showToast("تمت إضافة المنتج الجديد بنجاح إلى المتجر!");
    }
    setIsModalOpen(false);
  };

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.price.toString().includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Toast notification */}
      {saveToast && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-2xl bg-[#2B2119] text-white px-5 py-3 shadow-2xl border border-[#D5C2AA] text-sm animate-in slide-in-from-bottom-5">
          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#2B2119]">إدارة المنتجات والأسعار</h2>
          <p className="text-xs sm:text-sm text-[#735A45]">
            تعديل صور المنتجات، تغيير الأسعار (دج)، وتحديث المخزون
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2B2119] text-white font-bold text-xs sm:text-sm hover:bg-[#433225] active:scale-95 transition-all shadow-md cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>إضافة منتج جديد</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-[#FAF6F0] p-4 rounded-2xl border border-[#E3D4C0]">
        <div className="relative flex-1">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#735A45]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث بالاسم أو السعر .."
            className="w-full pr-10 pl-4 py-2 text-xs sm:text-sm rounded-xl border border-[#D5C2AA] bg-white text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none focus:border-[#2B2119]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-[#2B2119] text-white shadow-xs"
                : "bg-white text-[#735A45] border border-[#D5C2AA] hover:bg-[#EDE0CD]"
            }`}
          >
            الكل ({products.length})
          </button>
          {Object.entries(CATEGORY_MAP).map(([key, label]) => {
            const count = products.filter((p) => p.category === key).length;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === key
                    ? "bg-[#2B2119] text-white shadow-xs"
                    : "bg-white text-[#735A45] border border-[#D5C2AA] hover:bg-[#EDE0CD]"
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product, idx) => (
          <div
            key={`${product.id}-${idx}`}
            className="group relative rounded-2xl bg-[#FAF6F0] p-3.5 sm:p-4 border border-[#E3D4C0] shadow-sm hover:shadow-md hover:border-[#2B2119] transition-all flex flex-col justify-between"
          >
            {/* Image & Badges */}
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-[#EDE0CD] mb-3 border border-[#D5C2AA]">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getProductFallbackImage(product.category);
                }}
              />
              <span className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-[#2B2119]/80 backdrop-blur-xs text-[11px] font-bold text-white">
                {CATEGORY_MAP[product.category] || product.category}
              </span>

              {product.stock <= 8 && (
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-red-600 text-[10px] font-bold text-white shadow-sm">
                  مخزون قليل ({product.stock})
                </span>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-1.5">
              <h3 className="font-bold text-sm sm:text-base text-[#2B2119] line-clamp-1">
                {product.name}
              </h3>

              <div className="flex items-baseline gap-2">
                <span className="font-black text-base text-[#8C2A3E]" dir="ltr">
                  {product.price.toLocaleString("en-US")} دج
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-[#9F8A77] line-through" dir="ltr">
                    {product.originalPrice.toLocaleString("en-US")} دج
                  </span>
                )}
              </div>

              <p className="text-[11px] text-[#735A45] flex items-center justify-between">
                <span>المتوفر: {product.stock} قطعة</span>
                <span className="text-[10px] text-[#9F8A77]">كود: {product.id}</span>
              </p>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-[#E3D4C0] flex items-center gap-2">
              <button
                type="button"
                onClick={() => openEditModal(product)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] active:scale-95 transition-all shadow-xs"
              >
                <Edit2 className="h-3.5 w-3.5" />
                <span>تعديل السعر والصورة</span>
              </button>

              <button
                type="button"
                aria-label="حذف المنتج"
                onClick={() => setDeleteConfirmId(product.id)}
                className="p-2 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 active:scale-95 transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-[#FAF6F0] rounded-2xl border border-dashed border-[#D5C2AA]">
          <p className="text-sm font-bold text-[#735A45]">لا توجد منتجات مطابقة للبحث</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-[#EDE0CD] text-xs font-bold text-[#2B2119]"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-[#FAF6F0] p-6 border border-[#E3D4C0] shadow-2xl text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="font-black text-lg text-[#2B2119]">هل أنتِ متأكدة من حذف المنتج؟</h3>
            <p className="text-xs text-[#735A45]">
              سيتم إزالة المنتج نهائياً من المتجر ولن يتمكن الزبائن من طلبه.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  onDeleteProduct(deleteConfirmId);
                  setDeleteConfirmId(null);
                  showToast("تم حذف المنتج بنجاح");
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-700 text-white text-xs font-bold hover:bg-red-800 transition-all"
              >
                نعم، احذف المنتج
              </button>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#D5C2AA] bg-white text-xs font-bold text-[#2B2119] hover:bg-[#EDE0CD] transition-all"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Create Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div
            dir="rtl"
            className="relative w-full max-w-lg rounded-2xl bg-[#FAF6F0] p-6 sm:p-7 border border-[#E3D4C0] shadow-2xl my-8 text-[#2B2119]"
            style={{
              backgroundImage: "linear-gradient(180deg, #FCF9F4 0%, #F5EDE0 100%)",
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 h-8 w-8 rounded-full bg-[#EDE0CD] flex items-center justify-center text-[#2B2119] hover:bg-[#D5C2AA]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-[#8C2A3E]" />
              <h3 className="text-lg sm:text-xl font-black text-[#2B2119]">
                {editingProduct ? `تعديل: ${editingProduct.name}` : "إضافة منتج جديد للمتجر"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Preview & Upload Controls */}
              <div className="p-3.5 rounded-xl bg-white border border-[#D5C2AA] space-y-3">
                <label className="block text-xs font-bold text-[#423124]">
                  صورة المنتج <span className="text-[#8C2A3E]">*</span>
                </label>

                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-20 shrink-0 rounded-xl overflow-hidden border border-[#D5C2AA] bg-[#EDE0CD]">
                    <img src={formImage} alt="معاينة" className="h-full w-full object-cover" />
                  </div>

                  <div className="space-y-2 flex-1 min-w-0">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={isUploadingImage}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#EDE0CD] text-xs font-bold text-[#2B2119] hover:bg-[#D5C2AA] transition-all disabled:opacity-50"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      <span>
                        {isUploadingImage ? "جاري رفع الصورة وحفظها..." : "رفع صورة من الجهاز"}
                      </span>
                    </button>

                    <div className="text-[11px] text-[#735A45]">
                      أو اختاري صورة من مكتبة حجاب سول:
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                      {DEFAULT_IMAGE_OPTIONS.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormImage(imgUrl)}
                          className={`h-7 w-7 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                            formImage === imgUrl
                              ? "border-[#8C2A3E] scale-110"
                              : "border-transparent opacity-60"
                          }`}
                        >
                          <img src={imgUrl} alt="" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    value={formImage.startsWith("data:") ? "صورة مخصصة مرفوعة" : formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="أو الصقي رابط URL للصورة هنا .."
                    className="w-full rounded-lg border border-[#D5C2AA] px-3 py-1.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold text-[#423124] mb-1">
                  اسم المنتج <span className="text-[#8C2A3E]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="مثال: فستان كريب شتوي فاخر"
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
                />
              </div>

              {/* Price & Original Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#423124] mb-1">
                    السعر الحالي (دج) <span className="text-[#8C2A3E]">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    step={100}
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] font-bold focus:outline-none focus:border-[#2B2119]"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#423124] mb-1">
                    السعر قبل التخفيض (اختياري)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={formOriginalPrice || ""}
                    onChange={(e) =>
                      setFormOriginalPrice(e.target.value ? Number(e.target.value) : undefined)
                    }
                    placeholder="مثال: 4500"
                    className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Category & Stock */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#423124] mb-1">
                    القسم / التصنيف <span className="text-[#8C2A3E]">*</span>
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as AdminProduct["category"])}
                    className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] font-bold focus:outline-none focus:border-[#2B2119]"
                  >
                    {Object.entries(CATEGORY_MAP).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#423124] mb-1">
                    كمية المخزون (قطعة) <span className="text-[#8C2A3E]">*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] font-bold focus:outline-none focus:border-[#2B2119]"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#423124] mb-1">
                  وصف المنتج ومميزاته
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="نوع القماش، المقاسات المتوفرة، تفاصيل الخياطة .."
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#2B2119] text-white text-xs sm:text-sm font-bold hover:bg-[#433225] active:scale-98 transition-all shadow-md cursor-pointer"
                >
                  {editingProduct ? "حفظ التغييرات" : "إضافة المنتج للمتجر"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#D5C2AA] bg-white text-xs sm:text-sm font-bold text-[#2B2119] hover:bg-[#EDE0CD]"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
