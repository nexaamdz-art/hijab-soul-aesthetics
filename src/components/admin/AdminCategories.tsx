import { useState, useRef } from "react";
import {
  Layers,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Sparkles,
  RotateCcw,
  Eye,
  Sliders,
  FolderPlus,
  LayoutGrid,
} from "lucide-react";
import {
  StoreCategory,
  CURATED_IMAGE_PRESETS,
  compressImageFile,
  getProductFallbackImage,
} from "@/lib/store-data";

interface AdminCategoriesProps {
  categories: StoreCategory[];
  heroBanner: string | null;
  onUpdateCategory: (id: string, updates: Partial<StoreCategory>) => void;
  onAddCategory: (category: Omit<StoreCategory, "id"> & { id?: string }) => void;
  onDeleteCategory: (id: string) => void;
  onResetCategories: () => void;
  onUpdateHeroBanner: (url: string | null) => void;
}

export function AdminCategories({
  categories,
  heroBanner,
  onUpdateCategory,
  onAddCategory,
  onDeleteCategory,
  onResetCategories,
  onUpdateHeroBanner,
}: AdminCategoriesProps) {
  // Active target for image picker modal
  const [activeImagePickerCat, setActiveImagePickerCat] = useState<{
    category: StoreCategory;
    targetField: "image" | "bannerImage";
  } | null>(null);

  // Hero banner modal
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [heroInputUrl, setHeroInputUrl] = useState(heroBanner || "");

  // Category Edit / Create Modal
  const [editingCategory, setEditingCategory] = useState<StoreCategory | null>(null);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);

  // Category Deletion & Reset Confirmation Modals
  const [deleteTargetCategory, setDeleteTargetCategory] = useState<StoreCategory | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Form states for Create/Edit
  const [formName, setFormName] = useState("");
  const [formHref, setFormHref] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formBannerImage, setFormBannerImage] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formOrder, setFormOrder] = useState<number>(1);
  const [formIsActive, setFormIsActive] = useState<boolean>(true);

  // Modal tab: upload | url | presets
  const [modalTab, setModalTab] = useState<"upload" | "url" | "presets">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [presetFilter, setPresetFilter] = useState<string>("all");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Open Image Picker Modal
  const openImagePicker = (category: StoreCategory, targetField: "image" | "bannerImage") => {
    setActiveImagePickerCat({ category, targetField });
    const currentVal = targetField === "image" ? category.image : category.bannerImage || "";
    setUrlInput(currentVal);
    setModalTab("upload");
    setUploadError(null);
  };

  // Handle Image File Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      const compressedDataUrl = await compressImageFile(file, 1000, 0.85);

      let finalImageUrl = compressedDataUrl;
      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: compressedDataUrl }),
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          if (uploadData.url) finalImageUrl = uploadData.url;
        }
      } catch (err) {
        console.error("Upload error:", err);
      }

      if (activeImagePickerCat) {
        onUpdateCategory(activeImagePickerCat.category.id, {
          [activeImagePickerCat.targetField]: finalImageUrl,
        });
        showToast(
          activeImagePickerCat.targetField === "image"
            ? `تم تحديث صورة قسم "${activeImagePickerCat.category.name}" بنجاح!`
            : `تم تحديث بنر قسم "${activeImagePickerCat.category.name}" بنجاح!`,
        );
        setActiveImagePickerCat(null);
      }
    } catch {
      setUploadError("حدث خطأ أثناء معالجة الصورة، يرجى المحاولة مرة أخرى.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Handle URL Apply
  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim() || !activeImagePickerCat) return;

    onUpdateCategory(activeImagePickerCat.category.id, {
      [activeImagePickerCat.targetField]: urlInput.trim(),
    });
    showToast(`تم تحديث الصورة للقسم بنجاح!`);
    setActiveImagePickerCat(null);
  };

  // Handle Preset Select
  const handleSelectPreset = (presetUrl: string) => {
    if (!activeImagePickerCat) return;
    onUpdateCategory(activeImagePickerCat.category.id, {
      [activeImagePickerCat.targetField]: presetUrl,
    });
    showToast(`تم اختيار الصورة للقسم بنجاح!`);
    setActiveImagePickerCat(null);
  };

  // Handle Hero Banner Upload
  const handleHeroFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const dataUrl = await compressImageFile(file, 1400, 0.88);
      let finalBannerUrl = dataUrl;
      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: dataUrl }),
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          if (uploadData.url) finalBannerUrl = uploadData.url;
        }
      } catch (err) {
        console.error("Hero upload error:", err);
      }
      onUpdateHeroBanner(finalBannerUrl);
      showToast("تم تحديث بنر الواجهة الرئيسية بنجاح!");
      setIsHeroModalOpen(false);
    } catch {
      showToast("تعذر رفع الصورة، يرجى المحاولة مرة أخرى");
    } finally {
      setIsUploading(false);
      if (heroFileInputRef.current) heroFileInputRef.current.value = "";
    }
  };

  // Open Edit Modal for a Category
  const openEditModal = (cat: StoreCategory) => {
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

  // Open Create Modal
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

  // Save Category form (Create or Update)
  const handleSaveCategoryForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      showToast("يرجى إدخال اسم القسم");
      return;
    }

    const path = formHref.trim().startsWith("/")
      ? formHref.trim()
      : `/${formHref.trim().replace(/\s+/g, "-").toLowerCase()}`;

    if (editingCategory) {
      onUpdateCategory(editingCategory.id, {
        name: formName.trim(),
        href: path,
        image: formImage.trim() || "/images/categories/dresses.jpg",
        bannerImage: formBannerImage.trim() || undefined,
        description: formDescription.trim(),
        order: Number(formOrder),
        isActive: formIsActive,
      });
      showToast(`تم تعديل قسم "${formName}" بنجاح!`);
    } else {
      const generatedId = formName.trim().replace(/\s+/g, "-").toLowerCase() || `cat-${Date.now()}`;
      onAddCategory({
        id: generatedId,
        name: formName.trim(),
        href: path,
        image: formImage.trim() || "/images/categories/dresses.jpg",
        bannerImage: formBannerImage.trim() || undefined,
        alt: `${formName} محتشمة وراقية - حجاب سول`,
        description: formDescription.trim(),
        order: Number(formOrder),
        isActive: formIsActive,
      });
      showToast(`تمت إضافة القسم الجديد "${formName}" بنجاح!`);
    }

    setIsNewCategoryModalOpen(false);
  };

  // Filtered presets
  const filteredPresets =
    presetFilter === "all"
      ? CURATED_IMAGE_PRESETS
      : CURATED_IMAGE_PRESETS.filter((p) => p.category === presetFilter);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-2xl bg-[#2B2119] text-white px-5 py-3 shadow-2xl border border-[#D5C2AA] text-sm animate-in slide-in-from-bottom-5">
          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Main Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-[#8C2A3E]" />
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2119]">
              إدارة الأقسام والصور (Sections & Categories)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#735A45] mt-1">
            تخصيص صور بطاقات الأقسام في شريط الواجهة الرئيسية، بنرات الصفحات، وإضافة أقسام جديدة
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsHeroModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#2B2119] border border-[#D5C2AA] text-xs font-bold hover:bg-[#EDE0CD] transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#8C2A3E]" />
            <span>تغيير بنر الواجهة الرئيسية</span>
          </button>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] transition-all shadow-sm cursor-pointer active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة قسم جديد</span>
          </button>

          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            title="استعادة الصور والتصنيفات الافتراضية"
            className="p-2 rounded-xl bg-[#FAF6F0] text-[#735A45] border border-[#D5C2AA] hover:text-[#2B2119] hover:bg-[#EDE0CD] transition-all cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Hero Banner Status Bar */}
      {heroBanner && (
        <div className="rounded-2xl bg-[#FAF6F0] p-4 border border-[#D5C2AA] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={heroBanner}
              alt="بنر الواجهة الرئيسية المخصص"
              className="h-12 w-24 object-cover rounded-lg border border-[#D5C2AA] shrink-0"
            />
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#2B2119] block">
                بنر الواجهة الرئيسية مخصص حالياً
              </span>
              <span className="text-[11px] text-[#735A45] truncate block">
                يظهر هذا البنر في أعلى الصفحة الرئيسية للمتجر
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsHeroModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#EDE0CD] text-xs font-bold text-[#2B2119] hover:bg-[#D5C2AA]"
            >
              تعديل
            </button>
            <button
              onClick={() => {
                onUpdateHeroBanner(null);
                showToast("تمت استعادة البنر الافتراضي للواجهة");
              }}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-red-700 hover:bg-red-50"
            >
              إلغاء المخصص
            </button>
          </div>
        </div>
      )}

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            className={`rounded-2xl bg-[#FAF6F0] p-4 sm:p-5 border transition-all duration-200 shadow-sm flex flex-col justify-between ${
              cat.isActive ? "border-[#E3D4C0]" : "border-dashed border-[#D5C2AA] opacity-75"
            }`}
          >
            {/* Top row: Name, Order badge, Active switch */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EDE0CD] text-[11px] font-bold text-[#2B2119] border border-[#D5C2AA]">
                    {idx + 1}
                  </span>
                  <h3 className="text-base font-black text-[#2B2119]">{cat.name}</h3>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onUpdateCategory(cat.id, { isActive: !cat.isActive })}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                      cat.isActive
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-gray-200 text-gray-700 border border-gray-300"
                    }`}
                  >
                    {cat.isActive ? "ظاهر بالمتجر ✓" : "مخفي"}
                  </button>

                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 rounded-lg text-[#735A45] hover:bg-[#EDE0CD] hover:text-[#2B2119] transition-colors"
                    title="تعديل بيانات القسم"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>

                  {categories.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setDeleteTargetCategory(cat)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="حذف القسم"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Card Image Display & Change Button */}
              <div className="space-y-3">
                <div className="relative group rounded-xl overflow-hidden bg-[#EDE0CD] aspect-[4/3] border border-[#D5C2AA]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback image if broken
                      (e.target as HTMLImageElement).src = getProductFallbackImage(cat.id);
                    }}
                  />

                  {/* Overlay on hover / tap */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-3 text-white">
                    <button
                      onClick={() => openImagePicker(cat, "image")}
                      className="px-3.5 py-1.5 rounded-xl bg-white text-[#2B2119] text-xs font-bold shadow-md hover:bg-[#FAF6F0] flex items-center gap-1.5 transition-transform active:scale-95"
                    >
                      <Upload className="h-3.5 w-3.5 text-[#8C2A3E]" />
                      <span>تغيير صورة القسم</span>
                    </button>
                  </div>

                  {/* Section Label Badge */}
                  <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-[#E2D0AC]/95 backdrop-blur-xs text-center border border-[#D5C2AA]/80 shadow-xs">
                    <span className="font-hand font-extrabold text-xs text-[#3B2A1A] truncate block">
                      {cat.name}
                    </span>
                  </div>
                </div>

                {/* Section details */}
                <div className="text-xs text-[#5A412F] space-y-1">
                  <p className="line-clamp-1 font-medium">{cat.description || "بدون وصف إضافي"}</p>
                  <p className="text-[11px] font-mono text-[#8C7665] dir-ltr text-right">
                    الرابط: {cat.href}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="mt-4 pt-3 border-t border-[#E3D4C0] flex items-center justify-between gap-2">
              <button
                onClick={() => openImagePicker(cat, "image")}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] transition-all active:scale-98 cursor-pointer"
              >
                <ImageIcon className="h-3.5 w-3.5 text-[#E2D0AC]" />
                <span>تغيير الصورة</span>
              </button>

              <button
                onClick={() => openImagePicker(cat, "bannerImage")}
                className="flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl bg-white border border-[#D5C2AA] text-xs font-semibold text-[#2B2119] hover:bg-[#EDE0CD] transition-all cursor-pointer"
                title="تخصيص بنر رأس الصفحة لهذا القسم"
              >
                <span>بنر الصفحة</span>
                {cat.bannerImage && <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* IMAGE PICKER MODAL (Upload / URL / Presets) */}
      {/* ========================================================================= */}
      {activeImagePickerCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div
            dir="rtl"
            className="relative w-full max-w-2xl rounded-3xl bg-[#FAF6F0] p-5 sm:p-7 shadow-2xl border border-[#D5C2AA] text-[#2B2119] my-6 max-h-[90vh] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImagePickerCat(null)}
              className="absolute top-4 left-4 p-1.5 rounded-full bg-[#EDE0CD] text-[#2B2119] hover:bg-[#E3D4C0] transition-colors"
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Title */}
            <div className="mb-4 pr-1">
              <span className="text-[11px] font-bold text-[#8C2A3E]">
                {activeImagePickerCat.targetField === "image"
                  ? "تغيير صورة بطاقة القسم"
                  : "تغيير بنر رأس صفحة القسم"}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#2B2119]">
                قسم: {activeImagePickerCat.category.name}
              </h3>
            </div>

            {/* Current Image Preview */}
            <div className="mb-4 flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#E3D4C0]">
              <img
                src={
                  activeImagePickerCat.targetField === "image"
                    ? activeImagePickerCat.category.image
                    : activeImagePickerCat.category.bannerImage ||
                      activeImagePickerCat.category.image
                }
                alt={activeImagePickerCat.category.name}
                className="h-16 w-16 rounded-xl object-cover border border-[#D5C2AA] shrink-0"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#2B2119] block">الصورة الحالية</span>
                <span className="text-[11px] text-[#735A45] block truncate">
                  اختاري طريقة لإضافة صورة جديدة للقسم: الرفع من الهاتف/الكمبيوتر، رابط مباشر، أو
                  مكتبة الصور
                </span>
              </div>
            </div>

            {/* Tab Selector */}
            <div className="flex items-center gap-2 border-b border-[#E3D4C0] pb-2 mb-4">
              <button
                onClick={() => setModalTab("upload")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  modalTab === "upload"
                    ? "bg-[#2B2119] text-white shadow-xs"
                    : "text-[#735A45] hover:bg-[#EDE0CD]"
                }`}
              >
                <Upload className="h-3.5 w-3.5" />
                <span>رفع من الجهاز</span>
              </button>

              <button
                onClick={() => setModalTab("presets")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  modalTab === "presets"
                    ? "bg-[#2B2119] text-white shadow-xs"
                    : "text-[#735A45] hover:bg-[#EDE0CD]"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>مكتبة الصور المقترحة ({CURATED_IMAGE_PRESETS.length})</span>
              </button>

              <button
                onClick={() => setModalTab("url")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  modalTab === "url"
                    ? "bg-[#2B2119] text-white shadow-xs"
                    : "text-[#735A45] hover:bg-[#EDE0CD]"
                }`}
              >
                <LinkIcon className="h-3.5 w-3.5" />
                <span>رابط مباشر (URL)</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4">
              {/* TAB 1: UPLOAD FROM DEVICE */}
              {modalTab === "upload" && (
                <div className="space-y-4 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="section-image-file-input"
                  />

                  <label
                    htmlFor="section-image-file-input"
                    className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-[#CBB39C] hover:border-[#2B2119] bg-white/70 hover:bg-[#EDE0CD]/30 transition-all cursor-pointer group"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-[#EDE0CD] text-[#2B2119] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="h-6 w-6" />
                    </div>

                    <span className="text-sm font-bold text-[#2B2119]">
                      {isUploading
                        ? "جارٍ معالجة وضغط الصورة..."
                        : "انقري لاختيار صورة من هاتفك أو جهازك"}
                    </span>
                    <span className="text-xs text-[#735A45] mt-1">
                      يدعم JPG, PNG, WEBP — يتم حفظ وتحديث الصورة فورياً
                    </span>
                  </label>

                  {uploadError && (
                    <p className="text-xs font-semibold text-rose-600">{uploadError}</p>
                  )}
                </div>
              )}

              {/* TAB 2: CURATED PRESETS */}
              {modalTab === "presets" && (
                <div className="space-y-3">
                  {/* Category filter pills for presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pb-1">
                    {[
                      { id: "all", label: "الكل" },
                      { id: "dresses", label: "فساتين" },
                      { id: "abayas", label: "عبايات" },
                      { id: "hijabs", label: "حجابات وخمارات" },
                      { id: "isdalat", label: "إسدالات" },
                      { id: "accessories", label: "إكسسوارات" },
                      { id: "sales", label: "تخفيضات" },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setPresetFilter(f.id)}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                          presetFilter === f.id
                            ? "bg-[#2B2119] text-white"
                            : "bg-white text-[#5A412F] border border-[#D5C2AA]"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Preset Grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-[340px] overflow-y-auto p-1">
                    {filteredPresets.map((preset) => (
                      <div
                        key={preset.id}
                        onClick={() => handleSelectPreset(preset.url)}
                        className="group relative rounded-xl overflow-hidden aspect-square bg-[#E4D4BE] border border-[#D5C2AA] hover:border-[#2B2119] cursor-pointer shadow-xs transition-all hover:scale-102"
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1 text-center">
                          <span className="text-[10px] font-bold text-white leading-tight">
                            اختيار هذه الصورة ✓
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: IMAGE URL */}
              {modalTab === "url" && (
                <form onSubmit={handleApplyUrl} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#423124] mb-1">
                      رابط الصورة المباشر (URL)
                    </label>
                    <input
                      type="url"
                      required
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
                      dir="ltr"
                    />
                  </div>

                  {/* Preview URL */}
                  {urlInput && (
                    <div className="rounded-xl overflow-hidden border border-[#D5C2AA] p-2 bg-white flex items-center gap-3">
                      <img
                        src={urlInput}
                        alt="معاينة"
                        className="h-16 w-16 rounded-lg object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/categories/dresses.jpg";
                        }}
                      />
                      <span className="text-xs text-[#735A45]">معاينة الرابط المدخل</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] transition-all cursor-pointer"
                  >
                    تطبيق الصورة
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* HOMEPAGE HERO BANNER CUSTOMIZATION MODAL */}
      {/* ========================================================================= */}
      {isHeroModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div
            dir="rtl"
            className="relative w-full max-w-xl rounded-3xl bg-[#FAF6F0] p-5 sm:p-7 shadow-2xl border border-[#D5C2AA] text-[#2B2119]"
          >
            <button
              onClick={() => setIsHeroModalOpen(false)}
              className="absolute top-4 left-4 p-1.5 rounded-full bg-[#EDE0CD] text-[#2B2119] hover:bg-[#E3D4C0]"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-black text-[#2B2119] mb-1">
              تخصيص بنر الواجهة الرئيسية (Hero Banner)
            </h3>
            <p className="text-xs text-[#735A45] mb-4">
              يمكنكِ رفع صورة بانر عريضة من جهازك أو وضع رابط صورة ليتم عرضها في أعلى الموقع
            </p>

            <input
              ref={heroFileInputRef}
              type="file"
              accept="image/*"
              onChange={handleHeroFileUpload}
              className="hidden"
              id="hero-file-input"
            />

            <div className="space-y-4">
              <label
                htmlFor="hero-file-input"
                className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-[#CBB39C] hover:border-[#2B2119] bg-white cursor-pointer group"
              >
                <Upload className="h-6 w-6 text-[#8C2A3E] mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-[#2B2119]">
                  انقري لرفع بنر عريض من جهازك (1400x600 موصى به)
                </span>
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={heroInputUrl}
                  onChange={(e) => setHeroInputUrl(e.target.value)}
                  placeholder="أو ضعي رابط صورة مباشر..."
                  className="flex-1 rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (heroInputUrl.trim()) {
                      onUpdateHeroBanner(heroInputUrl.trim());
                      showToast("تم تحديث بنر الواجهة بنجاح!");
                      setIsHeroModalOpen(false);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-[#2B2119] text-white text-xs font-bold"
                >
                  حفظ
                </button>
              </div>

              {heroBanner && (
                <button
                  type="button"
                  onClick={() => {
                    onUpdateHeroBanner(null);
                    setHeroInputUrl("");
                    showToast("تمت استعادة العمل الفني الأصلي للواجهة");
                    setIsHeroModalOpen(false);
                  }}
                  className="w-full py-2 rounded-xl bg-[#EDE0CD] text-xs font-bold text-[#2B2119] hover:bg-[#D5C2AA]"
                >
                  استعادة رسمة حجاب سول الأصلية
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ADD / EDIT CATEGORY DETAILS MODAL */}
      {/* ========================================================================= */}
      {isNewCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div
            dir="rtl"
            className="relative w-full max-w-lg rounded-3xl bg-[#FAF6F0] p-5 sm:p-7 shadow-2xl border border-[#D5C2AA] text-[#2B2119] my-6"
          >
            <button
              onClick={() => setIsNewCategoryModalOpen(false)}
              className="absolute top-4 left-4 p-1.5 rounded-full bg-[#EDE0CD] text-[#2B2119] hover:bg-[#E3D4C0]"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-black text-[#2B2119] mb-4">
              {editingCategory
                ? `تعديل بيانات قسم "${editingCategory.name}"`
                : "إضافة قسم جديد للمتجر"}
            </h3>

            <form onSubmit={handleSaveCategoryForm} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#423124] mb-1">
                  اسم القسم <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="مثال: أوشحة حريرية، أطقم صلاة، حقائب..."
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#423124] mb-1">
                  مسار الرابط (URL Path)
                </label>
                <input
                  type="text"
                  value={formHref}
                  onChange={(e) => setFormHref(e.target.value)}
                  placeholder="/dresses أو /my-category"
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#423124] mb-1">
                  رابط صورة البطاقة
                </label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="/images/categories/... أو رابط ويب"
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#423124] mb-1">
                  وصف مختصر للقسم
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="أزياء محتشمة وراقية تناسب جميع الأذواق..."
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#423124] mb-1">
                    ترتيب الظهور
                  </label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs font-bold text-[#2B2119]"
                    dir="ltr"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#D5C2AA] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsActive}
                      onChange={(e) => setFormIsActive(e.target.checked)}
                      className="rounded accent-[#2B2119]"
                    />
                    <span className="text-xs font-bold text-[#2B2119]">تفعيل القسم</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#2B2119] text-white text-xs sm:text-sm font-bold hover:bg-[#433225] transition-all cursor-pointer"
              >
                {editingCategory ? "حفظ التعديلات" : "إضافة القسم"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONFIRM DELETE CATEGORY MODAL */}
      {/* ========================================================================= */}
      {deleteTargetCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div
            dir="rtl"
            className="relative w-full max-w-md rounded-3xl bg-[#FAF6F0] p-6 shadow-2xl border border-[#D5C2AA] text-[#2B2119] animate-in fade-in zoom-in-95 my-6"
          >
            <button
              onClick={() => setDeleteTargetCategory(null)}
              className="absolute top-4 left-4 p-1.5 rounded-full bg-[#EDE0CD] text-[#2B2119] hover:bg-[#E3D4C0]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-4 text-rose-700">
              <div className="p-2.5 rounded-2xl bg-rose-100 border border-rose-200 shrink-0">
                <Trash2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#2B2119]">تأكيد حذف القسم</h3>
                <p className="text-xs text-[#735A45]">
                  هذا الإجراء سيقوم بإزالة هذا القسم من المتجر نهائياً
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E3D4C0] mb-5">
              <img
                src={deleteTargetCategory.image}
                alt={deleteTargetCategory.name}
                className="h-14 w-14 rounded-xl object-cover border border-[#D5C2AA] shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getProductFallbackImage(
                    deleteTargetCategory.id,
                  );
                }}
              />
              <div className="min-w-0">
                <span className="text-sm font-bold text-[#2B2119] block">
                  {deleteTargetCategory.name}
                </span>
                <span className="text-xs text-[#735A45] block font-mono dir-ltr text-right truncate">
                  {deleteTargetCategory.href}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteTargetCategory(null)}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#D5C2AA] text-xs font-bold text-[#735A45] hover:bg-[#EDE0CD] transition-all cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => {
                  const catName = deleteTargetCategory.name;
                  const catId = deleteTargetCategory.id;
                  onDeleteCategory(catId);
                  setDeleteTargetCategory(null);
                  showToast(`تم حذف قسم "${catName}" بنجاح!`);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-700 text-white text-xs font-bold hover:bg-rose-800 transition-all shadow-md cursor-pointer active:scale-95"
              >
                نعم، تأكيد الحذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONFIRM RESET CATEGORIES MODAL */}
      {/* ========================================================================= */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div
            dir="rtl"
            className="relative w-full max-w-md rounded-3xl bg-[#FAF6F0] p-6 shadow-2xl border border-[#D5C2AA] text-[#2B2119] animate-in fade-in zoom-in-95 my-6"
          >
            <button
              onClick={() => setIsResetModalOpen(false)}
              className="absolute top-4 left-4 p-1.5 rounded-full bg-[#EDE0CD] text-[#2B2119] hover:bg-[#E3D4C0]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-4 text-[#8C2A3E]">
              <div className="p-2.5 rounded-2xl bg-[#F5E6D3] border border-[#D5C2AA] shrink-0">
                <RotateCcw className="h-6 w-6 text-[#8C2A3E]" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#2B2119]">استعادة الأقسام الافتراضية</h3>
                <p className="text-xs text-[#735A45]">
                  هل تريدين إعادة تعيين الأقسام والصور للوضع الافتراضي؟
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 mt-5">
              <button
                type="button"
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#D5C2AA] text-xs font-bold text-[#735A45] hover:bg-[#EDE0CD] transition-all cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetCategories();
                  setIsResetModalOpen(false);
                  showToast("تمت استعادة التصنيفات الافتراضية بنجاح!");
                }}
                className="px-5 py-2.5 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] transition-all shadow-md cursor-pointer active:scale-95"
              >
                نعم، استعادة الافتراضي
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
