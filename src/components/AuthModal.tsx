import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";

export function AuthModal() {
  const {
    authModalOpen,
    authModalMode,
    closeAuthModal,
    openAuthModal,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    isConfigured,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  if (!authModalOpen) return null;

  const isSignUp = authModalMode === "signup";

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg("يرجى ملء جميع الحقول المطلوبة.");
      return;
    }

    if (isSignUp && (!firstName.trim() || !lastName.trim())) {
      setErrorMsg("يرجى إدخال الاسم واللقب.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("كلمة المرور يجب أن تتكون من 6 أحرف أو أرقام على الأقل.");
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUpWithEmail({
          email,
          password,
          firstName,
          lastName,
        });

        if (error) {
          setErrorMsg(error.message || "حدث خطأ أثناء إنشاء الحساب.");
        } else {
          setSuccessMsg(
            "تم إنشاء الحساب بنجاح! تفقد بريدك الإلكتروني لتأكيد التسجيل أو تم تسجيل الدخول مباشرة.",
          );
          setTimeout(() => {
            closeAuthModal();
          }, 2000);
        }
      } else {
        const { error } = await signInWithEmail({
          email,
          password,
        });

        if (error) {
          setErrorMsg(error.message || "فشل تسجيل الدخول. يرجى التحقق من البريد وكلمة المرور.");
        } else {
          setSuccessMsg("تم تسجيل الدخول بنجاح! أهلاً بك.");
          setTimeout(() => {
            closeAuthModal();
          }, 1200);
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "حدث خطأ غير متوقع.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setGoogleLoading(true);

    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setErrorMsg(error.message || "تعذر تسجيل الدخول عبر Google.");
        setGoogleLoading(false);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "تعذر الاتصال بـ Google.";
      setErrorMsg(message);
      setGoogleLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      {/* Modal Card */}
      <div
        dir="rtl"
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#FAF6F0] p-6 sm:p-8 shadow-2xl border border-[#E3D4C0] text-[#2B2119] select-none"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #FCF9F4 0%, #F5EDE0 100%), radial-gradient(circle at 20% 20%, rgba(60,45,30,0.025) 0 1px, transparent 1px)",
          backgroundSize: "100% 100%, 8px 8px",
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          aria-label="إغلاق النافذة"
          onClick={closeAuthModal}
          className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#EDE0CD] text-[#2B2119] transition-transform hover:scale-110 active:scale-95 hover:bg-[#E2CEB4]"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Branding & Mode Toggle */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EDE0CD] text-xs font-semibold text-[#5A412F] mb-2">
            <Sparkles className="h-3.5 w-3.5 text-[#8C2A3E]" />
            <span>عالم حجاب سول</span>
          </div>
          <h2 id="auth-modal-title" className="text-xl sm:text-2xl font-black text-[#2B2119]">
            {isSignUp ? "إنشاء حساب جديد" : "تسجيل الدخول"}
          </h2>
          <p className="text-xs sm:text-sm text-[#735A45] mt-1">
            {isSignUp
              ? "انضمي إلينا وتمتعي بتجربة تسوق فريدة ومتابعة طلباتكِ"
              : "أهلاً بعودتكِ! يرجى إدخال بياناتكِ للدخول إلى حسابكِ"}
          </p>
        </div>

        {/* Configuration Notice if API Keys are not yet plugged */}
        {!isConfigured && (
          <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50/90 p-3 text-xs text-amber-900 leading-relaxed">
            <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">جاهز لربط Supabase!</strong>
              تم تجهيز الكود بالكامل، وسيتم تفعيل تسجيل الدخول الفعلي فور إضافتك لمفاتيح Supabase
              API.
            </div>
          </div>
        )}

        {/* Mode Switch Tabs */}
        <div className="flex rounded-xl bg-[#EDE0CD]/80 p-1 mb-5">
          <button
            type="button"
            onClick={() => {
              setErrorMsg(null);
              setSuccessMsg(null);
              openAuthModal("signin");
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              !isSignUp
                ? "bg-[#2B2119] text-white shadow-sm"
                : "text-[#5A412F] hover:text-[#2B2119]"
            }`}
          >
            تسجيل الدخول
          </button>
          <button
            type="button"
            onClick={() => {
              setErrorMsg(null);
              setSuccessMsg(null);
              openAuthModal("signup");
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              isSignUp ? "bg-[#2B2119] text-white shadow-sm" : "text-[#5A412F] hover:text-[#2B2119]"
            }`}
          >
            حساب جديد
          </button>
        </div>

        {/* Quick Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading || isLoading}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-[#D5C2AA] bg-white text-[#2B2119] font-bold text-sm shadow-xs transition-all hover:bg-stone-50 hover:border-[#BFA88D] active:scale-[0.99] disabled:opacity-60 mb-4"
        >
          {googleLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-[#2B2119]" />
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24">
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
          )}
          <span>المتابعة باستخدام Google</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="w-full border-t border-[#D5C2AA]" />
          <span className="absolute bg-[#FAF6F0] px-3 text-xs text-[#8C745E] font-medium">
            أو عبر البريد الإلكتروني
          </span>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="mb-3.5 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 p-2.5 text-xs text-red-800 leading-snug">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-3.5 flex items-start gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-800 leading-snug">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Email & Password / Name Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-3">
          {isSignUp && (
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-[#423124] mb-1">
                  الاسم الأول <span className="text-[#8C2A3E]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="مثال: مريم"
                    className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none"
                  />
                  <UserIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#423124] mb-1">
                  اللقب <span className="text-[#8C2A3E]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="مثال: بن علي"
                    className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none"
                  />
                  <UserIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#423124] mb-1">
              البريد الإلكتروني <span className="text-[#8C2A3E]">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left"
                dir="ltr"
              />
              <Mail className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#423124] mb-1">
              كلمة المرور <span className="text-[#8C2A3E]">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left"
                dir="ltr"
              />
              <Lock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || googleLoading}
            className="w-full mt-2 min-h-[42px] flex items-center justify-center gap-2 rounded-xl bg-[#2B2119] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:bg-[#3D2F24] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : (
              <span>{isSignUp ? "إنشاء الحساب والتسجيل" : "تسجيل الدخول"}</span>
            )}
          </button>
        </form>

        {/* Footer switch prompt */}
        <div className="text-center mt-5 pt-3 border-t border-[#E3D4C0] text-xs text-[#735A45]">
          {isSignUp ? (
            <p>
              لديكِ حساب بالفعل؟{" "}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  setSuccessMsg(null);
                  openAuthModal("signin");
                }}
                className="font-bold text-[#8C2A3E] underline hover:text-[#2B2119] cursor-pointer"
              >
                سجلي دخولكِ من هنا
              </button>
            </p>
          ) : (
            <p>
              ليس لديكِ حساب بعد؟{" "}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  setSuccessMsg(null);
                  openAuthModal("signup");
                }}
                className="font-bold text-[#8C2A3E] underline hover:text-[#2B2119] cursor-pointer"
              >
                أنشئي حساباً جديداً
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
