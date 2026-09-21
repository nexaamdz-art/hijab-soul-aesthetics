import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  MessageSquare,
  Settings,
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
} from "lucide-react";
import logoMark from "@/assets/hijab-soul-mark.png";
import { useStoreData, CustomerOrder } from "@/lib/store-data";
import { useAuth, ADMIN_EMAILS } from "@/lib/auth-context";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminCategories } from "@/components/admin/AdminCategories";
import { AdminOrders } from "@/components/admin/AdminOrders";
import { AdminChat } from "@/components/admin/AdminChat";
import { AdminSettings } from "@/components/admin/AdminSettings";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "لوحة تحكم المدير | حجاب سول" },
      {
        name: "description",
        content: "لوحة إدارة متجر حجاب سول — إدارة المنتجات، استقبال الطلبات، والدردشة مع الزبائن.",
      },
      { property: "og:title", content: "لوحة تحكم المدير | حجاب سول" },
      { property: "og:description", content: "لوحة إدارة متجر حجاب سول" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "categories" | "orders" | "chat" | "settings"
  >("overview");
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<CustomerOrder | null>(
    null,
  );
  const [activeChatConvId, setActiveChatConvId] = useState<string | undefined>(undefined);

  const { user, profile, isAdmin, openAuthModal, signOut, signInWithGoogle } = useAuth();
  const currentAdminEmail = user?.email || "إدارة المتجر";

  const {
    products,
    orders,
    conversations,
    categories,
    heroBanner,
    updateProduct,
    addProduct,
    deleteProduct,
    updateOrderStatus,
    sendMessage,
    markConversationAsRead,
    updateCategory,
    addCategory,
    deleteCategory,
    resetCategoriesToDefault,
    updateHeroBanner,
  } = useStoreData();

  const unreadMessagesTotal = conversations.reduce((sum, c) => sum + c.unreadCount, 0);
  const pendingOrdersCount = orders.filter(
    (o) => o.status === "pending" || o.status === "processing",
  ).length;

  const handleOpenCustomerChat = (customerName: string) => {
    const existing = conversations.find(
      (c) => c.customerName.toLowerCase() === customerName.toLowerCase(),
    );
    if (existing) {
      setActiveChatConvId(existing.id);
    }
    setActiveTab("chat");
  };

  // If user is not authenticated or is not an administrator, show strict authentication gate
  if (!user || !isAdmin) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#FAF6F0] text-[#2B2119] flex flex-col font-sans selection:bg-[#8C2A3E] selection:text-white"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #FAF6F0 0%, #F5EDE0 100%), radial-gradient(circle at 15% 15%, rgba(60,45,30,0.02) 0 1px, transparent 1px)",
        }}
      >
        {/* Simple Header */}
        <header className="w-full bg-[#2B2119] text-[#FAF6F0] py-4 px-6 border-b border-[#433225]">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoMark} alt="حجاب سول" className="h-8 w-auto" />
              <span className="font-display text-lg text-white">Hijab Soul</span>
            </Link>
            <Link
              to="/"
              className="text-xs text-[#E5D2B8] hover:text-white transition-colors font-bold inline-flex items-center gap-1"
            >
              <span>العودة للمتجر</span>
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            </Link>
          </div>
        </header>

        {/* Lock Screen Body */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-7 sm:p-9 shadow-xl border border-[#E3D4C0] text-center space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF6F0] border-2 border-[#D5C2AA] text-[#8C2A3E]">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#2B2119]">
                منطقة إدارة المتجر المحمية
              </h1>
              <p className="text-xs sm:text-sm text-[#735A45] mt-2 leading-relaxed">
                لوحة التحكم مخصصة حصرياً لإدارة المتجر. يرجى تسجيل الدخول بحساب مسؤول الوصول للتحكم بالمنتجات والطلبات.
              </p>
            </div>

            {user && !isAdmin ? (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-right space-y-2">
                <p className="font-bold">حسابك الحالي غير مصرح له بالإدارة:</p>
                <p className="font-mono text-[11px] text-[#5A412F]" dir="ltr">
                  {user.email} (حساب زبون عادي)
                </p>
                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      signOut().then(() => {
                        openAuthModal("signin");
                      });
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#2B2119] text-white text-xs font-bold hover:bg-[#3D2F24] cursor-pointer"
                  >
                    تبديل الحساب
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={async () => {
                    await signInWithGoogle();
                  }}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white border border-[#D5C2AA] text-[#2B2119] hover:bg-[#FAF6F0] hover:border-[#2B2119] active:scale-[0.98] shadow-sm transition-all font-bold text-xs sm:text-sm cursor-pointer"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>تسجيل الدخول بحساب Google</span>
                </button>

                <div className="relative flex items-center justify-center my-2">
                  <div className="border-t border-[#E3D4C0] w-full" />
                  <span className="bg-[#FAF6F0] px-3 text-[11px] text-[#8C745E] shrink-0">
                    أو بكلمة المرور
                  </span>
                  <div className="border-t border-[#E3D4C0] w-full" />
                </div>

                <button
                  type="button"
                  onClick={() => openAuthModal("signin")}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#2B2119] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#3D2F24] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="h-4 w-4 text-[#E5D2B8]" />
                  <span>تسجيل الدخول بالبريد وكلمة المرور</span>
                </button>

                <button
                  type="button"
                  onClick={() => openAuthModal("signup")}
                  className="w-full py-2 px-4 rounded-xl bg-[#FAF6F0] hover:bg-[#F2E8DC] text-[#2B2119] border border-[#D5C2AA] text-xs font-bold transition-all cursor-pointer"
                >
                  إنشاء حساب جديد
                </button>
              </div>
            )}

            <div className="pt-3 border-t border-[#E3D4C0]">
              <Link
                to="/"
                className="text-xs text-[#735A45] hover:text-[#2B2119] underline font-medium"
              >
                العودة إلى الصفحة الرئيسية للمتجر
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FAF6F0] text-[#2B2119] flex flex-col font-sans selection:bg-[#8C2A3E] selection:text-white"
    >
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#2B2119] text-[#FAF6F0] shadow-md border-b border-[#433225]">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-2.5 sm:px-6">
          {/* Right in RTL: Logo and Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <img src={logoMark} alt="حجاب سول" className="h-9 w-auto select-none" />
              <div>
                <span className="font-display text-lg tracking-wide text-white flex items-center gap-1">
                  Hijab Soul
                </span>
                <span className="text-[10px] text-[#D5C2AA] block -mt-1 font-semibold">
                  لوحة تحكم المدير
                </span>
              </div>
            </Link>

            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] text-[#E5D2B8] font-bold">
              <Sparkles className="h-3 w-3 text-[#E5D2B8]" />
              <span>وضع الإدارة نشط</span>
            </span>
          </div>

          {/* Left in RTL: Admin account indicator and back to live store button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-[#E5D2B8]">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span className="font-mono text-[11px]" dir="ltr">
                {currentAdminEmail}
              </span>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF6F0] text-xs font-bold transition-all border border-white/10 active:scale-95"
            >
              <span>معاينة المتجر</span>
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            </Link>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="border-t border-[#3D2E22] bg-[#241B14]">
          <div className="mx-auto flex w-full max-w-[1400px] items-center gap-1 sm:gap-2 px-4 sm:px-6 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === "overview"
                  ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm"
                  : "text-[#D5C2AA] hover:text-white hover:bg-white/5"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>الرئيسية والإحصائيات</span>
            </button>

            <button
              onClick={() => setActiveTab("categories")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === "categories"
                  ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm"
                  : "text-[#D5C2AA] hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>الأقسام والصور ({categories.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === "products"
                  ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm"
                  : "text-[#D5C2AA] hover:text-white hover:bg-white/5"
              }`}
            >
              <Package className="h-4 w-4" />
              <span>المنتجات والأسعار ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all relative ${
                activeTab === "orders"
                  ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm"
                  : "text-[#D5C2AA] hover:text-white hover:bg-white/5"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>الطلبات الواردة</span>
              {pendingOrdersCount > 0 && (
                <span className="h-4 min-w-[16px] px-1 rounded-full bg-amber-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all relative ${
                activeTab === "chat"
                  ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm"
                  : "text-[#D5C2AA] hover:text-white hover:bg-white/5"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>دردشة العملاء</span>
              {unreadMessagesTotal > 0 && (
                <span className="h-4 min-w-[16px] px-1 rounded-full bg-[#8C2A3E] text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadMessagesTotal}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === "settings"
                  ? "bg-[#E5D2B8] text-[#2B2119] shadow-sm"
                  : "text-[#D5C2AA] hover:text-white hover:bg-white/5"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>الإعدادات</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="flex-1 mx-auto w-full max-w-[1400px] p-4 sm:p-6 lg:p-8">
        {activeTab === "overview" && (
          <AdminOverview
            products={products}
            orders={orders}
            conversations={conversations}
            categories={categories}
            onTabChange={setActiveTab}
            onSelectOrder={(ord) => {
              setSelectedOrderForDetails(ord);
              setActiveTab("orders");
            }}
          />
        )}

        {activeTab === "categories" && (
          <AdminCategories
            categories={categories}
            heroBanner={heroBanner}
            onUpdateCategory={updateCategory}
            onAddCategory={addCategory}
            onDeleteCategory={deleteCategory}
            onResetCategories={resetCategoriesToDefault}
            onUpdateHeroBanner={updateHeroBanner}
          />
        )}

        {activeTab === "products" && (
          <AdminProducts
            products={products}
            onUpdateProduct={updateProduct}
            onAddProduct={addProduct}
            onDeleteProduct={deleteProduct}
          />
        )}

        {activeTab === "orders" && (
          <AdminOrders
            orders={orders}
            selectedOrder={selectedOrderForDetails}
            onUpdateOrderStatus={updateOrderStatus}
            onOpenCustomerChat={handleOpenCustomerChat}
          />
        )}

        {activeTab === "chat" && (
          <AdminChat
            conversations={conversations}
            products={products}
            activeConversationId={activeChatConvId}
            onSendMessage={sendMessage}
            onMarkAsRead={markConversationAsRead}
          />
        )}

        {activeTab === "settings" && <AdminSettings />}
      </main>

      {/* Subtle Footer */}
      <footer className="mt-auto border-t border-[#E3D4C0] bg-[#FAF6F0] py-4 text-center text-xs text-[#735A45]">
        <div className="mx-auto max-w-[1400px] px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>نظام إدارة متجر حجاب سول — جميع الحقوق محفوظة © {new Date().getFullYear()}</span>
          <span className="font-semibold text-[#8C2A3E]">
            إنه أكثر من مجرد ملابس .. إنه أسلوب حياة ♡
          </span>
        </div>
      </footer>
    </div>
  );
}
