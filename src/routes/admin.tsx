import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useStoreData, CustomerOrder } from "@/lib/store-data";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminCategories } from "@/components/admin/AdminCategories";
import { AdminOrders } from "@/components/admin/AdminOrders";
import { AdminChat } from "@/components/admin/AdminChat";
import { AdminSettings } from "@/components/admin/AdminSettings";
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  Package,
  MessageSquare,
  Settings,
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ArrowRight,
  ExternalLink,
  Store,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "لوحة التحكم والإدارة | روح الحجاب" },
      { name: "description", content: "إدارة متجر روح الحجاب — المنتجات والطلبات والرسائل" },
    ],
  }),
});

type AdminTab = "overview" | "products" | "categories" | "orders" | "chat" | "settings";

function AdminPage() {
  const { user, profile, isAdmin, signInWithEmail } = useAuth();
  const store = useStoreData();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);

  // Admin Login Gate State
  const [adminEmail, setAdminEmail] = useState("nexa.am.dz@gmail.com");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const emailClean = adminEmail.trim().toLowerCase();
    const passClean = adminPassword.trim();

    if (!emailClean || !passClean) {
      setLoginError("يرجى إدخال البريد الإلكتروني وكلمة المرور.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await signInWithEmail({ email: emailClean, password: passClean });
      if (res.error) {
        setLoginError(res.error.message || "بيانات الدخول غير صحيحة.");
      } else {
        // Success: isAdmin state will update automatically
      }
    } catch {
      setLoginError("حدث خطأ أثناء التحقق من كلمة المرور.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If not logged in as admin, require strict password authentication
  if (!isAdmin) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-[#FAF6F0]" dir="rtl">
        <div className="w-full max-w-md rounded-3xl bg-white p-7 sm:p-8 shadow-xl border border-[#E3D4C0] text-center space-y-5">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2B2119] text-[#FAF6F0] shadow-md">
            <Lock className="h-8 w-8 text-amber-300" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold mb-2">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
              <span>بوابة الإدارة المحمية</span>
            </div>
            <h1 className="text-2xl font-black text-[#2B2119]">تسجيل دخول مدير المتجر</h1>
            <p className="text-xs sm:text-sm text-[#735A45] mt-1.5 leading-relaxed">
              هذه المنطقة مخصصة لإدارة المتجر وتتطلب إدخال كلمة المرور السرية للمدير العام.
            </p>
          </div>

          {loginError && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-800 text-right leading-snug">
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLoginSubmit} className="space-y-3.5 text-right">
            <div>
              <label className="block text-xs font-bold text-[#423124] mb-1">
                بريد الإدارة المعتمد <span className="text-[#8C2A3E]">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="nexa.am.dz@gmail.com"
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] focus:border-[#2B2119] focus:outline-none text-left"
                  dir="ltr"
                />
                <Mail className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#423124]">
                  كلمة المرور السرية <span className="text-[#8C2A3E]">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="text-[11px] text-[#8C745E] hover:text-[#2B2119] inline-flex items-center gap-1 cursor-pointer"
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="h-3 w-3" />
                      <span>إخفاء</span>
                    </>
                  ) : (
                    <>
                      <Eye className="h-3 w-3" />
                      <span>إظهار</span>
                    </>
                  )}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] focus:border-[#2B2119] focus:outline-none text-left"
                  dir="ltr"
                />
                <Lock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-[#2B2119] text-white font-bold text-sm hover:bg-[#3D2F24] active:scale-[0.98] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>جاري التحقق من كلمة المرور...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 text-amber-300" />
                  <span>دخول لوحة التحكم</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-[#E3D4C0]/60">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-1.5 text-xs text-[#735A45] hover:text-[#2B2119] font-medium transition-colors"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <span>العودة للمتجر الرئيسي</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const unreadMessagesCount = store.conversations.reduce((sum, c) => sum + c.unreadCount, 0);
  const pendingOrdersCount = store.orders.filter(
    (o) => o.status === "pending" || o.status === "processing",
  ).length;

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#2B2119]" dir="rtl">
      {/* Admin Top Banner */}
      <header className="sticky top-0 z-30 bg-[#2B2119] text-[#FAF6F0] border-b border-[#3D2F24] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF6F0]/10 text-amber-300">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm sm:text-base tracking-wide">روح الحجاب</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                  لوحة الإدارة
                </span>
              </div>
              <p className="text-[11px] text-[#D5C2AA]/80 hidden sm:block">
                مرحباً {profile?.fullName || "بالمدير العام"} — {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF6F0]/10 hover:bg-[#FAF6F0]/20 text-xs font-bold text-[#FAF6F0] transition-colors border border-white/10"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>معاينة المتجر</span>
            </Link>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none flex gap-1 sm:gap-2 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "overview"
                ? "bg-[#FAF6F0] text-[#2B2119] shadow-xs"
                : "text-[#D5C2AA] hover:bg-white/10 hover:text-white"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>نظرة عامة</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "orders"
                ? "bg-[#FAF6F0] text-[#2B2119] shadow-xs"
                : "text-[#D5C2AA] hover:bg-white/10 hover:text-white"
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>الطلبات</span>
            {pendingOrdersCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#8C2A3E] text-white text-[10px] font-bold">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "products"
                ? "bg-[#FAF6F0] text-[#2B2119] shadow-xs"
                : "text-[#D5C2AA] hover:bg-white/10 hover:text-white"
            }`}
          >
            <Package className="h-4 w-4" />
            <span>المنتجات ({store.products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("categories")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "categories"
                ? "bg-[#FAF6F0] text-[#2B2119] shadow-xs"
                : "text-[#D5C2AA] hover:bg-white/10 hover:text-white"
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>الأقسام ({store.categories.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "chat"
                ? "bg-[#FAF6F0] text-[#2B2119] shadow-xs"
                : "text-[#D5C2AA] hover:bg-white/10 hover:text-white"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>المحادثات</span>
            {unreadMessagesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "settings"
                ? "bg-[#FAF6F0] text-[#2B2119] shadow-xs"
                : "text-[#D5C2AA] hover:bg-white/10 hover:text-white"
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>الإعدادات</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === "overview" && (
          <AdminOverview
            products={store.products}
            orders={store.orders}
            conversations={store.conversations}
            categories={store.categories}
            onTabChange={(tab) => setActiveTab(tab)}
            onSelectOrder={(ord) => {
              setSelectedOrder(ord);
              setActiveTab("orders");
            }}
          />
        )}

        {activeTab === "orders" && (
          <AdminOrders
            orders={store.orders}
            selectedOrder={selectedOrder}
            onUpdateOrderStatus={store.updateOrderStatus}
            onOpenCustomerChat={(_name, _phone, _wilaya) => {
              setActiveTab("chat");
            }}
          />
        )}

        {activeTab === "products" && (
          <AdminProducts
            products={store.products}
            onUpdateProduct={store.updateProduct}
            onAddProduct={store.addProduct}
            onDeleteProduct={store.deleteProduct}
          />
        )}

        {activeTab === "categories" && (
          <AdminCategories
            categories={store.categories}
            heroBanner={store.heroBanner}
            onUpdateCategory={store.updateCategory}
            onAddCategory={store.addCategory}
            onDeleteCategory={store.deleteCategory}
            onResetCategories={store.resetCategoriesToDefault}
            onUpdateHeroBanner={store.updateHeroBanner}
          />
        )}

        {activeTab === "chat" && (
          <AdminChat
            conversations={store.conversations}
            products={store.products}
            onSendMessage={store.sendMessage}
            onMarkAsRead={store.markConversationAsRead}
          />
        )}

        {activeTab === "settings" && <AdminSettings />}
      </main>
    </div>
  );
}
