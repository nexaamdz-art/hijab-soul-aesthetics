import {
  Crown,
  TrendingUp,
  Package,
  ShoppingBag,
  MessageSquare,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { AdminProduct, CustomerOrder, CustomerConversation } from "@/lib/store-data";

interface AdminOverviewProps {
  products: AdminProduct[];
  orders: CustomerOrder[];
  conversations: CustomerConversation[];
  onTabChange: (tab: "products" | "orders" | "chat" | "settings") => void;
  onSelectOrder: (order: CustomerOrder) => void;
}

export function AdminOverview({
  products,
  orders,
  conversations,
  onTabChange,
  onSelectOrder,
}: AdminOverviewProps) {
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.grandTotal, 0);

  const pendingOrders = orders.filter(
    (o) => o.status === "pending" || o.status === "processing",
  ).length;
  const unreadMessagesCount = conversations.reduce((sum, c) => sum + c.unreadCount, 0);
  const lowStockProducts = products.filter((p) => p.stock <= 8);

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div
        className="rounded-2xl bg-[#2B2119] text-[#FAF6F0] p-6 sm:p-8 relative overflow-hidden shadow-lg border border-[#433225]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 90% 20%, rgba(200, 160, 120, 0.15) 0%, transparent 60%), linear-gradient(135deg, #2B2119 0%, #1E1610 100%)",
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E5D2B8] mb-3">
              <Crown className="h-3.5 w-3.5 text-[#E5D2B8]" />
              <span>لوحة الإدارة الرسمية • حجاب سول</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              مرحباً بكِ في إدارة متجر حجاب سول 🕊️
            </h2>
            <p className="text-sm text-[#D5C2AA] mt-1 max-w-xl leading-relaxed">
              تحكّمي بكل تفاصيل المتجر: تعديل المنتجات والأسعار، متابعة وشحن طلبات الزبائن، والرد
              المباشر على المحادثات.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => onTabChange("products")}
              className="px-4 py-2.5 rounded-xl bg-[#E5D2B8] text-[#2B2119] font-bold text-xs sm:text-sm hover:bg-white active:scale-95 transition-all shadow-sm"
            >
              + إضافة أو تعديل منتج
            </button>
            <button
              onClick={() => onTabChange("orders")}
              className="px-4 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs sm:text-sm hover:bg-white/20 active:scale-95 transition-all border border-white/15"
            >
              عرض الطلبات ({orders.length})
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div className="rounded-2xl bg-[#FAF6F0] p-5 border border-[#E3D4C0] shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#735A45]">إجمالي المبيعات النشطة</span>
            <div className="h-9 w-9 rounded-xl bg-[#EDE0CD] text-[#2B2119] flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#2B2119]" dir="ltr">
              {totalRevenue.toLocaleString("en-US")}{" "}
              <span className="text-sm font-bold text-[#8C2A3E]">دج</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>من {orders.filter((o) => o.status !== "cancelled").length} طلب مؤكد</span>
            </p>
          </div>
        </div>

        {/* Pending Orders */}
        <div
          onClick={() => onTabChange("orders")}
          className="rounded-2xl bg-[#FAF6F0] p-5 border border-[#E3D4C0] shadow-sm relative overflow-hidden cursor-pointer hover:border-[#2B2119] transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#735A45]">طلبات بانتظار التجهيز</span>
            <div className="h-9 w-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#2B2119]">
              {pendingOrders} <span className="text-xs text-[#735A45] font-normal">طلب</span>
            </div>
            <p className="text-[11px] text-amber-800 font-semibold mt-1">
              {pendingOrders > 0 ? "يتطلب تأكيداً أو شحناً" : "كل الطلبات مجهزة"}
            </p>
          </div>
        </div>

        {/* Total Products */}
        <div
          onClick={() => onTabChange("products")}
          className="rounded-2xl bg-[#FAF6F0] p-5 border border-[#E3D4C0] shadow-sm relative overflow-hidden cursor-pointer hover:border-[#2B2119] transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#735A45]">المنتجات في المتجر</span>
            <div className="h-9 w-9 rounded-xl bg-[#EDE0CD] text-[#2B2119] flex items-center justify-center">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#2B2119]">
              {products.length} <span className="text-xs text-[#735A45] font-normal">منتج نشط</span>
            </div>
            <p className="text-[11px] text-[#735A45] font-semibold mt-1">
              {lowStockProducts.length > 0
                ? `${lowStockProducts.length} منتجات قاربت على النفاد`
                : "المخزون ممتاز"}
            </p>
          </div>
        </div>

        {/* Customer Inquiries */}
        <div
          onClick={() => onTabChange("chat")}
          className="rounded-2xl bg-[#FAF6F0] p-5 border border-[#E3D4C0] shadow-sm relative overflow-hidden cursor-pointer hover:border-[#2B2119] transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#735A45]">محادثات الزبائن</span>
            <div className="h-9 w-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#2B2119]">
              {conversations.length}{" "}
              {unreadMessagesCount > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">
                  {unreadMessagesCount} جديدة
                </span>
              )}
            </div>
            <p className="text-[11px] text-blue-700 font-semibold mt-1">
              الدردشة الحية والمباشرة مع الزبائن
            </p>
          </div>
        </div>
      </div>

      {/* Two columns: Recent Orders & Quick Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-[#FAF6F0] p-5 sm:p-6 border border-[#E3D4C0] shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E3D4C0]">
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#2B2119]">
                آخر الطلبات الواردة
              </h3>
              <p className="text-xs text-[#735A45]">متابعة وتحديث طلبات التوصيل للولايات</p>
            </div>
            <button
              onClick={() => onTabChange("orders")}
              className="text-xs font-bold text-[#8C2A3E] hover:underline"
            >
              عرض كافة الطلبات ({orders.length}) ←
            </button>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 4).map((order) => {
              const statusBadge =
                order.status === "pending"
                  ? { label: "جديد", bg: "bg-amber-100 text-amber-900 border-amber-300" }
                  : order.status === "processing"
                    ? { label: "قيد التجهيز", bg: "bg-blue-100 text-blue-900 border-blue-300" }
                    : order.status === "shipped"
                      ? { label: "تم الشحن", bg: "bg-purple-100 text-purple-900 border-purple-300" }
                      : order.status === "delivered"
                        ? {
                            label: "مكتمل",
                            bg: "bg-emerald-100 text-emerald-900 border-emerald-300",
                          }
                        : { label: "ملغى", bg: "bg-red-100 text-red-900 border-red-300" };

              return (
                <div
                  key={order.id}
                  onClick={() => {
                    onSelectOrder(order);
                    onTabChange("orders");
                  }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-[#E8DC CE] hover:border-[#2B2119] transition-all cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-[#EDE0CD] text-[#2B2119] font-bold text-xs flex items-center justify-center border border-[#D5C2AA]">
                      #{order.orderNumber.replace("HS-", "")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#2B2119]">
                          {order.customerName}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadge.bg}`}
                        >
                          {statusBadge.label}
                        </span>
                      </div>
                      <p className="text-xs text-[#735A45] mt-0.5">
                        {order.wilaya} • {order.items.length} قطع • {order.createdAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-[#F0E6D8]">
                    <span className="font-black text-sm text-[#2B2119]" dir="ltr">
                      {order.grandTotal.toLocaleString("en-US")} دج
                    </span>
                    <button className="px-2.5 py-1 rounded-lg bg-[#FAF6F0] border border-[#D5C2AA] text-xs font-semibold text-[#2B2119] hover:bg-[#EDE0CD]">
                      تفاصيل
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Low stock & Quick shortcuts (1 col) */}
        <div className="space-y-6">
          {/* Low Stock Alert */}
          <div className="rounded-2xl bg-[#FAF6F0] p-5 border border-[#E3D4C0] shadow-sm">
            <div className="flex items-center gap-2 text-[#8C2A3E] font-bold text-sm mb-3">
              <AlertCircle className="h-4 w-4" />
              <span>تنبيهات المخزون</span>
            </div>

            {lowStockProducts.length > 0 ? (
              <div className="space-y-2.5">
                {lowStockProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-[#E8DCCE]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-9 w-9 rounded-lg object-cover border border-[#D5C2AA]"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#2B2119] truncate">{p.name}</p>
                        <p className="text-[11px] text-red-700 font-semibold">
                          باقي {p.stock} قطع فقط
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onTabChange("products")}
                      className="px-2 py-1 rounded-lg bg-[#EDE0CD] text-[11px] font-bold text-[#2B2119] hover:bg-[#D5C2AA] shrink-0"
                    >
                      تعديل
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#735A45]">جميع المنتجات متوفرة بكميات كافية.</p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl bg-[#EDE0CD] p-5 border border-[#D5C2AA]">
            <h4 className="font-bold text-sm text-[#2B2119] mb-2">إجراءات سريعة للمدير</h4>
            <div className="space-y-2 text-xs font-semibold">
              <button
                onClick={() => onTabChange("products")}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/80 hover:bg-white text-[#2B2119] transition-all"
              >
                <span>تغيير أسعار أو صور المنتجات</span>
                <span>←</span>
              </button>
              <button
                onClick={() => onTabChange("chat")}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/80 hover:bg-white text-[#2B2119] transition-all"
              >
                <span>الرد على استفسارات الزبائن</span>
                <span>←</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
