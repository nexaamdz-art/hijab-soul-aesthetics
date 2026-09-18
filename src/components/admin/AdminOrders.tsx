import { useState } from "react";
import {
  Search,
  Phone,
  MessageCircle,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  FileText,
  Printer,
  ChevronDown,
  User,
  ShoppingBag,
  Check,
} from "lucide-react";
import { CustomerOrder, OrderStatus } from "@/lib/store-data";

interface AdminOrdersProps {
  orders: CustomerOrder[];
  selectedOrder?: CustomerOrder | null;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onOpenCustomerChat: (customerName: string, phone: string, wilaya: string) => void;
}

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bg: string; border: string; text: string; icon: typeof Clock }
> = {
  pending: {
    label: "جديد (بانتظار التأكيد)",
    bg: "bg-amber-50",
    border: "border-amber-300",
    text: "text-amber-800",
    icon: Clock,
  },
  processing: {
    label: "قيد التجهيز والتغليف",
    bg: "bg-blue-50",
    border: "border-blue-300",
    text: "text-blue-800",
    icon: ShoppingBag,
  },
  shipped: {
    label: "تم الشحن مع شركة التوصيل",
    bg: "bg-purple-50",
    border: "border-purple-300",
    text: "text-purple-800",
    icon: Truck,
  },
  delivered: {
    label: "تم التسليم بنجاح",
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    text: "text-emerald-800",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "ملغى",
    bg: "bg-red-50",
    border: "border-red-300",
    text: "text-red-800",
    icon: XCircle,
  },
};

export function AdminOrders({
  orders,
  selectedOrder: propSelectedOrder,
  onUpdateOrderStatus,
  onOpenCustomerChat,
}: AdminOrdersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeOrder, setActiveOrder] = useState<CustomerOrder | null>(
    propSelectedOrder || (orders.length > 0 ? orders[0] : null),
  );
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [actionSuccessToast, setActionSuccessToast] = useState<string | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.phone.includes(searchQuery) ||
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.wilaya.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (status: OrderStatus) => {
    if (!activeOrder) return;
    onUpdateOrderStatus(activeOrder.id, status);
    setActiveOrder({ ...activeOrder, status });
    setStatusDropdownOpen(false);
    setActionSuccessToast(`تم تحديث حالة الطلب إلى "${STATUS_CONFIG[status].label}"`);
    setTimeout(() => setActionSuccessToast(null), 2500);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Toast */}
      {actionSuccessToast && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-2xl bg-[#2B2119] text-white px-5 py-3 shadow-2xl border border-[#D5C2AA] text-sm animate-in slide-in-from-bottom-5">
          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{actionSuccessToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#2B2119]">استقبال وإدارة الطلبات</h2>
          <p className="text-xs sm:text-sm text-[#735A45]">
            متابعة طلبات الزبائن وتحديث حالات الشحن والتوصيل لجميع الولايات
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#735A45]">
            إجمالي الطلبات: <strong className="text-[#2B2119]">{orders.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-[#FAF6F0] p-4 rounded-2xl border border-[#E3D4C0]">
        <div className="relative flex-1">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#735A45]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث برقم الطلب، اسم العميل، الهاتف، أو الولاية .."
            className="w-full pr-10 pl-4 py-2 text-xs sm:text-sm rounded-xl border border-[#D5C2AA] bg-white text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none focus:border-[#2B2119]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === "all"
                ? "bg-[#2B2119] text-white shadow-xs"
                : "bg-white text-[#735A45] border border-[#D5C2AA] hover:bg-[#EDE0CD]"
            }`}
          >
            الكل ({orders.length})
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === "pending"
                ? "bg-amber-700 text-white shadow-xs"
                : "bg-white text-amber-900 border border-amber-300 hover:bg-amber-50"
            }`}
          >
            جديد ({orders.filter((o) => o.status === "pending").length})
          </button>
          <button
            onClick={() => setStatusFilter("processing")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === "processing"
                ? "bg-blue-700 text-white shadow-xs"
                : "bg-white text-blue-900 border border-blue-300 hover:bg-blue-50"
            }`}
          >
            قيد التجهيز ({orders.filter((o) => o.status === "processing").length})
          </button>
          <button
            onClick={() => setStatusFilter("shipped")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === "shipped"
                ? "bg-purple-700 text-white shadow-xs"
                : "bg-white text-purple-900 border border-purple-300 hover:bg-purple-50"
            }`}
          >
            تم الشحن ({orders.filter((o) => o.status === "shipped").length})
          </button>
          <button
            onClick={() => setStatusFilter("delivered")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === "delivered"
                ? "bg-emerald-700 text-white shadow-xs"
                : "bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-50"
            }`}
          >
            مكتمل ({orders.filter((o) => o.status === "delivered").length})
          </button>
        </div>
      </div>

      {/* Main Layout: Orders List (Right) & Selected Order Details (Left) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Orders List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-[#735A45] px-1">
            قائمة الطلبات ({filteredOrders.length})
          </div>

          <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredOrders.map((order) => {
              const cfg = STATUS_CONFIG[order.status];
              const isSelected = activeOrder?.id === order.id;

              return (
                <div
                  key={order.id}
                  onClick={() => setActiveOrder(order)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-right ${
                    isSelected
                      ? "bg-[#FAF6F0] border-[#2B2119] shadow-md ring-2 ring-[#2B2119]/10"
                      : "bg-white border-[#E3D4C0] hover:border-[#2B2119] shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono font-bold text-xs text-[#2B2119] bg-[#EDE0CD] px-2 py-0.5 rounded-md">
                      {order.orderNumber}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text}`}
                    >
                      {cfg.label.split(" ")[0]}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-[#2B2119]">{order.customerName}</h4>
                      <p className="text-xs text-[#735A45] mt-0.5 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{order.wilaya}</span>
                      </p>
                    </div>

                    <div className="text-left" dir="ltr">
                      <span className="font-black text-sm text-[#8C2A3E]">
                        {order.grandTotal.toLocaleString("en-US")} دج
                      </span>
                      <p className="text-[10px] text-[#9F8A77] font-semibold">{order.createdAt}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredOrders.length === 0 && (
              <div className="text-center py-12 bg-[#FAF6F0] rounded-2xl border border-dashed border-[#D5C2AA] text-xs text-[#735A45]">
                لا توجد طلبات مطابقة للبحث أو الفلتر
              </div>
            )}
          </div>
        </div>

        {/* Order Details Panel (7 cols) */}
        <div className="lg:col-span-7">
          {activeOrder ? (
            <div
              className="rounded-2xl bg-[#FAF6F0] p-6 sm:p-7 border border-[#E3D4C0] shadow-md space-y-6"
              style={{
                backgroundImage: "linear-gradient(180deg, #FCF9F4 0%, #F8F1E5 100%)",
              }}
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E3D4C0]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base sm:text-lg font-black text-[#2B2119]">
                      طلب رقم: #{activeOrder.orderNumber}
                    </span>
                  </div>
                  <p className="text-xs text-[#735A45] mt-1">
                    تاريخ ووقت الطلب: {activeOrder.createdAt}
                  </p>
                </div>

                {/* Status Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setStatusDropdownOpen((prev) => !prev)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all shadow-xs ${
                      STATUS_CONFIG[activeOrder.status].bg
                    } ${STATUS_CONFIG[activeOrder.status].border} ${
                      STATUS_CONFIG[activeOrder.status].text
                    }`}
                  >
                    <span>الحالة: {STATUS_CONFIG[activeOrder.status].label}</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>

                  {statusDropdownOpen && (
                    <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-1.5 w-56 rounded-xl bg-white border border-[#D5C2AA] shadow-xl p-1.5 z-20 space-y-1">
                      {(Object.keys(STATUS_CONFIG) as OrderStatus[]).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleStatusChange(st)}
                          className={`w-full text-right px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-between ${
                            activeOrder.status === st
                              ? "bg-[#2B2119] text-white"
                              : "text-[#2B2119] hover:bg-[#FAF6F0]"
                          }`}
                        >
                          <span>{STATUS_CONFIG[st].label}</span>
                          {activeOrder.status === st && <Check className="h-3.5 w-3.5" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Info Card & Actions */}
              <div className="rounded-xl bg-white p-4 sm:p-5 border border-[#E3D4C0] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-[#2B2119] text-white flex items-center justify-center font-black text-base">
                      {activeOrder.customerName[0] || <User className="h-5 w-5" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-[#2B2119]">
                        {activeOrder.customerName}
                      </h4>
                      <p className="text-xs text-[#735A45] font-mono" dir="ltr">
                        {activeOrder.phone}
                      </p>
                    </div>
                  </div>

                  {/* Customer Quick Actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${activeOrder.phone}`}
                      className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-colors"
                      title="اتصال هاتفي بالزبون"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenCustomerChat(
                          activeOrder.customerName,
                          activeOrder.phone,
                          activeOrder.wilaya,
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] transition-all shadow-xs cursor-pointer"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>محادثة فورية</span>
                    </button>
                  </div>
                </div>

                {/* Address & Delivery */}
                <div className="pt-3 border-t border-[#F0E6D8] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#9F8A77] block mb-0.5">الولاية والبلدية:</span>
                    <strong className="text-[#2B2119]">
                      {activeOrder.wilaya} — {activeOrder.commune}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#9F8A77] block mb-0.5">عنوان التوصيل:</span>
                    <strong className="text-[#2B2119]">{activeOrder.address}</strong>
                  </div>
                </div>

                {activeOrder.notes && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                    <strong>ملاحظات العميل:</strong> {activeOrder.notes}
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs sm:text-sm text-[#2B2119] flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-[#8C2A3E]" />
                  <span>المنتجات المطلوبة ({activeOrder.items.length})</span>
                </h4>

                <div className="space-y-2">
                  {activeOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white border border-[#E3D4C0]"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-lg object-cover border border-[#D5C2AA]"
                        />
                        <div>
                          <p className="font-bold text-xs sm:text-sm text-[#2B2119]">{item.name}</p>
                          <p className="text-[11px] text-[#735A45]">
                            الكمية: <strong>{item.quantity}</strong> ×{" "}
                            {item.price.toLocaleString("en-US")} دج
                          </p>
                        </div>
                      </div>

                      <div className="font-black text-sm text-[#2B2119]" dir="ltr">
                        {(item.price * item.quantity).toLocaleString("en-US")} دج
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Financial Breakdown */}
              <div className="rounded-xl bg-white p-4 border border-[#E3D4C0] space-y-2 text-xs">
                <div className="flex justify-between text-[#735A45]">
                  <span>مجموع المنتجات:</span>
                  <span className="font-bold" dir="ltr">
                    {activeOrder.totalAmount.toLocaleString("en-US")} دج
                  </span>
                </div>
                <div className="flex justify-between text-[#735A45]">
                  <span>تكلفة التوصيل ({activeOrder.wilaya}):</span>
                  <span className="font-bold" dir="ltr">
                    {activeOrder.shippingCost.toLocaleString("en-US")} دج
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-black text-[#8C2A3E] pt-2 border-t border-[#F0E6D8]">
                  <span>المبلغ الإجمالي المستحق (عند الاستلام):</span>
                  <span dir="ltr">{activeOrder.grandTotal.toLocaleString("en-US")} دج</span>
                </div>
              </div>

              {/* Print & Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handlePrintInvoice}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D5C2AA] bg-white text-xs font-bold text-[#2B2119] hover:bg-[#EDE0CD] transition-all cursor-pointer"
                >
                  <Printer className="h-4 w-4" />
                  <span>طباعة وصل التسليم</span>
                </button>

                <div className="flex items-center gap-2">
                  {activeOrder.status === "pending" && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange("processing")}
                      className="px-4 py-2 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#433225] transition-all shadow-xs"
                    >
                      تأكيد والبدء بالتجهيز ✓
                    </button>
                  )}
                  {activeOrder.status === "processing" && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange("shipped")}
                      className="px-4 py-2 rounded-xl bg-purple-700 text-white text-xs font-bold hover:bg-purple-800 transition-all shadow-xs"
                    >
                      تم التسليم لشركة الشحن 🚚
                    </button>
                  )}
                  {activeOrder.status === "shipped" && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange("delivered")}
                      className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-all shadow-xs"
                    >
                      تأكيد الاستلام من الزبون ✅
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-[#FAF6F0] rounded-2xl border border-dashed border-[#D5C2AA] text-center min-h-[400px]">
              <FileText className="h-12 w-12 text-[#D5C2AA] mb-3" />
              <p className="font-bold text-sm text-[#735A45]">
                اختاري طلباً من القائمة لعرض كامل تفاصيله
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
