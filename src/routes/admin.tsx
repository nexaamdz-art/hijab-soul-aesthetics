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
} from "lucide-react";
import logoMark from "@/assets/hijab-soul-mark.png";
import { useStoreData, CustomerOrder } from "@/lib/store-data";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { AdminProducts } from "@/components/admin/AdminProducts";
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
    "overview" | "products" | "orders" | "chat" | "settings"
  >("overview");
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<CustomerOrder | null>(
    null,
  );
  const [activeChatConvId, setActiveChatConvId] = useState<string | undefined>(undefined);

  const {
    products,
    orders,
    conversations,
    updateProduct,
    addProduct,
    deleteProduct,
    updateOrderStatus,
    sendMessage,
    markConversationAsRead,
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

          {/* Left in RTL: Back to live store button */}
          <div className="flex items-center gap-3">
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
            onTabChange={setActiveTab}
            onSelectOrder={(ord) => {
              setSelectedOrderForDetails(ord);
              setActiveTab("orders");
            }}
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
