import { useState } from "react";
import { Store, Phone, Check, ShieldCheck, Mail, UserCheck, Lock } from "lucide-react";
import { ADMIN_EMAILS } from "@/lib/auth-context";

export function AdminSettings() {
  const [storeName, setStoreName] = useState("حجاب سول — Hijab Soul");
  const [supportPhone, setSupportPhone] = useState("0661234589");
  const [adminEmail, setAdminEmail] = useState(ADMIN_EMAILS[0] || "nexa.am.dz@gmail.com");
  const [shippingAlgiers, setShippingAlgiers] = useState<number>(500);
  const [shippingMajorCities, setShippingMajorCities] = useState<number>(700);
  const [shippingSouth, setShippingSouth] = useState<number>(900);
  const [announcement, setAnnouncement] = useState(
    "توصيل سريع لكافة الـ 58 ولاية والدفع عند الاستلام ♡",
  );
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {savedToast && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-2xl bg-[#2B2119] text-white px-5 py-3 shadow-2xl border border-[#D5C2AA] text-sm animate-in slide-in-from-bottom-5">
          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>تم حفظ إعدادات المتجر بنجاح!</span>
        </div>
      )}

      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#2B2119]">إعدادات المتجر والشحن</h2>
        <p className="text-xs sm:text-sm text-[#735A45]">
          تخصيص بيانات المتجر، حساب الإدارة المعتمد، وأسعار التوصيل للولايات الجزائرية
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Administrator Account Info */}
        <div className="rounded-2xl bg-[#FAF6F0] p-5 sm:p-6 border border-[#E3D4C0] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-[#2B2119] flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-[#8C2A3E]" />
              <span>بيانات حساب المدير العام (Super Admin)</span>
            </h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>مُعتمد ومفعّل</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#423124] mb-1">
                البريد الإلكتروني للإدارة
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 pl-9 text-xs sm:text-sm text-[#2B2119] font-mono focus:outline-none focus:border-[#2B2119]"
                  dir="ltr"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9F8A77]" />
              </div>
              <p className="text-[11px] text-[#735A45] mt-1">
                حساب المدير يمتلك صلاحيات إدارة وتعديل المنتجات، الأسعار، الأقسام، واستقبال الطلبات.
              </p>
            </div>

            <div className="rounded-xl bg-[#EDE0CD]/60 p-3.5 border border-[#D5C2AA] flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2B2119] mb-1">
                <Lock className="h-3.5 w-3.5 text-[#8C2A3E]" />
                <span>حالة الحماية والصلاحيات:</span>
              </div>
              <p className="text-xs text-[#5A412F]">
                عند تسجيل الدخول بهذا البريد عبر جوجل أو كلمة المرور، تُفتح لوحة الإدارة تلقائياً في القائمة العلوية.
              </p>
            </div>
          </div>
        </div>

        {/* General Info */}
        <div className="rounded-2xl bg-[#FAF6F0] p-5 sm:p-6 border border-[#E3D4C0] space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-[#2B2119] flex items-center gap-2">
            <Store className="h-4 w-4 text-[#8C2A3E]" />
            <span>بيانات المتجر العامة</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#423124] mb-1">اسم المتجر</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423124] mb-1">
                رقم خدمة العملاء (واتساب / هاتف)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
                  dir="ltr"
                />
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9F8A77]" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#423124] mb-1">
              شريط الإعلان أعلى الموقع
            </label>
            <input
              type="text"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
            />
          </div>
        </div>

        {/* Shipping Rates */}
        <div className="rounded-2xl bg-[#FAF6F0] p-5 sm:p-6 border border-[#E3D4C0] space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-[#2B2119] flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#8C2A3E]" />
            <span>تسعير الشحن للولايات (دج)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#423124] mb-1">
                الجزائر العاصمة والوسط
              </label>
              <input
                type="number"
                value={shippingAlgiers}
                onChange={(e) => setShippingAlgiers(Number(e.target.value))}
                className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm font-bold text-[#2B2119]"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423124] mb-1">
                الولايات الشمالية والشرق/الغرب
              </label>
              <input
                type="number"
                value={shippingMajorCities}
                onChange={(e) => setShippingMajorCities(Number(e.target.value))}
                className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm font-bold text-[#2B2119]"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423124] mb-1">
                ولايات الجنوب والهضاب
              </label>
              <input
                type="number"
                value={shippingSouth}
                onChange={(e) => setShippingSouth(Number(e.target.value))}
                className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3.5 py-2 text-xs sm:text-sm font-bold text-[#2B2119]"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-[#2B2119] text-white font-bold text-xs sm:text-sm hover:bg-[#433225] active:scale-95 transition-all shadow-md cursor-pointer"
        >
          حفظ التغييرات
        </button>
      </form>
    </div>
  );
}
