import { useState, useEffect } from "react";
import {
  Store,
  Phone,
  Check,
  ShieldCheck,
  Mail,
  UserCheck,
  Lock,
  KeyRound,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function AdminSettings() {
  const { user, profile } = useAuth();
  const [storeName, setStoreName] = useState("حجاب سول — Hijab Soul");
  const [supportPhone, setSupportPhone] = useState("0661234589");
  const [adminEmail, setAdminEmail] = useState(
    user?.email || profile?.email || "admin@hijabsoul.dz",
  );
  const [shippingAlgiers, setShippingAlgiers] = useState<number>(500);
  const [shippingMajorCities, setShippingMajorCities] = useState<number>(700);
  const [shippingSouth, setShippingSouth] = useState<number>(900);
  const [announcement, setAnnouncement] = useState(
    "توصيل سريع لكافة الـ 58 ولاية والدفع عند الاستلام ♡",
  );
  const [savedToast, setSavedToast] = useState(false);

  // Load existing settings from server
  useEffect(() => {
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (data.storeName) setStoreName(data.storeName);
          if (data.supportPhone) setSupportPhone(data.supportPhone);
          if (data.shippingAlgiers) setShippingAlgiers(data.shippingAlgiers);
          if (data.shippingMajorCities) setShippingMajorCities(data.shippingMajorCities);
          if (data.shippingSouth) setShippingSouth(data.shippingSouth);
          if (data.announcement) setAnnouncement(data.announcement);
        }
      })
      .catch((err) => console.error("Failed to load settings:", err));
  }, []);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [confirmAdminPassword, setConfirmAdminPassword] = useState("");
  const [passwordToast, setPasswordToast] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isChangingPass, setIsChangingPass] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeName,
          supportPhone,
          shippingAlgiers,
          shippingMajorCities,
          shippingSouth,
          announcement,
        }),
      });
    } catch (err) {
      console.error("Failed to save settings:", err);
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordToast(null);

    if (newAdminPassword.length < 6) {
      setPasswordError("كلمة المرور الجديدة يجب ألا تقل عن 6 خانات.");
      return;
    }

    if (newAdminPassword !== confirmAdminPassword) {
      setPasswordError("كلمتا المرور غير متطابقتين.");
      return;
    }

    setIsChangingPass(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email || profile?.email || adminEmail,
          currentPassword,
          newPassword: newAdminPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPasswordError(data.error || "فشل تحديث كلمة المرور.");
      } else {
        setPasswordToast("تم تحديث كلمة مرور المدير بنجاح!");
        setCurrentPassword("");
        setNewAdminPassword("");
        setConfirmAdminPassword("");
        setTimeout(() => setPasswordToast(null), 3000);
      }
    } catch {
      setPasswordError("حدث خطأ أثناء الاتصال بالخادم.");
    } finally {
      setIsChangingPass(false);
    }
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
                <span>حالة الحماية والأمان:</span>
              </div>
              <p className="text-xs text-[#5A412F]">
                لا يمكن لأي مستخدم الوصول إلى لوحة الإدارة إلا بعد التحقق الصارم من كلمة المرور
                السرية.
              </p>
            </div>
          </div>

          {/* Admin Password Change Sub-Form */}
          <div className="pt-4 border-t border-[#E3D4C0] mt-4">
            <h4 className="text-xs font-bold text-[#2B2119] flex items-center gap-1.5 mb-2">
              <KeyRound className="h-3.5 w-3.5 text-[#8C2A3E]" />
              <span>تغيير كلمة المرور السرية للمدير</span>
            </h4>

            {passwordError && (
              <div className="mb-3 flex items-start gap-1.5 rounded-xl bg-red-50 border border-red-200 p-2.5 text-xs text-red-800">
                <AlertCircle className="h-3.5 w-3.5 text-red-600 shrink-0 mt-0.5" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordToast && (
              <div className="mb-3 flex items-start gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-800">
                <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{passwordToast}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#423124] mb-1">
                  كلمة المرور الحالية
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-1.5 text-xs text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#423124] mb-1">
                  كلمة المرور الجديدة
                </label>
                <input
                  type="password"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-1.5 text-xs text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#423124] mb-1">
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  value={confirmAdminPassword}
                  onChange={(e) => setConfirmAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-1.5 text-xs text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="mt-2.5 flex justify-end">
              <button
                type="button"
                disabled={isChangingPass || !newAdminPassword}
                onClick={handleUpdatePassword}
                className="py-1.5 px-4 rounded-xl bg-[#2B2119] text-white text-xs font-bold hover:bg-[#3D2F24] transition-all disabled:opacity-50 cursor-pointer"
              >
                {isChangingPass ? "جاري التحديث..." : "تحديث كلمة المرور"}
              </button>
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
