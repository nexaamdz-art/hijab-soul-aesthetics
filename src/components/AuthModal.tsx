import React, { useState, useEffect } from "react";
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
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

type ModalView = "signin" | "signup" | "forgot-request" | "forgot-reset";

export function AuthModal() {
  const {
    authModalOpen,
    authModalMode,
    prefilledEmail,
    closeAuthModal,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    resetPasswordDirect,
  } = useAuth();

  const [currentView, setCurrentView] = useState<ModalView>("signin");
  const [googleNotice, setGoogleNotice] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password state
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (authModalOpen) {
      setErrorMsg(null);
      setSuccessMsg(null);
      setGoogleNotice(null);
      setCurrentView(authModalMode === "signup" ? "signup" : "signin");
      if (prefilledEmail) {
        setEmail(prefilledEmail);
      }
    }
  }, [authModalOpen, authModalMode, prefilledEmail]);

  if (!authModalOpen) return null;

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setGoogleNotice(null);
    setIsLoading(true);
    try {
      const res = await signInWithGoogle();
      if (res.error) {
        setGoogleNotice(
          "خدمة تسجيل الدخول السريع بحساب Google قيد التجهيز من قبل إدارة المتجر. يمكنكِ استخدام البريد الإلكتروني وكلمة المرور للمتابعة الفورية.",
        );
        setIsLoading(false);
        return;
      }

      const authUrl = res.data?.url;
      if (!authUrl) {
        setGoogleNotice(
          "خدمة تسجيل الدخول السريع بحساب Google قيد التجهيز حالياً. يرجى المتابعة بالبريد الإلكتروني.",
        );
        setIsLoading(false);
        return;
      }

      const width = 500;
      const height = 650;
      const left =
        typeof window !== "undefined" ? window.screenX + (window.outerWidth - width) / 2 : 0;
      const top =
        typeof window !== "undefined" ? window.screenY + (window.outerHeight - height) / 2 : 0;
      const popup = window.open(
        authUrl,
        "google_oauth_popup",
        `width=${width},height=${height},left=${left},top=${top},status=no,toolbar=no,menubar=no`,
      );

      if (!popup) {
        window.open(authUrl, "_blank");
      }

      setSuccessMsg("تم فتح نافذة تسجيل الدخول بـ Google. يرجى إكمال التسجيل فيها.");
    } catch {
      setGoogleNotice(
        "خدمة تسجيل الدخول السريع بحساب Google قيد التجهيز حالياً. يرجى المتابعة بالبريد الإلكتروني.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Registration Form
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setGoogleNotice(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMsg("يرجى إدخال الاسم الأول واللقب.");
      return;
    }
    if (!cleanEmail) {
      setErrorMsg("يرجى إدخال البريد الإلكتروني.");
      return;
    }
    if (cleanPass.length < 6) {
      setErrorMsg("كلمة المرور يجب أن تكون 6 أحرف أو أرقام على الأقل.");
      return;
    }
    if (cleanPass !== confirmPassword.trim()) {
      setErrorMsg("كلمتا المرور غير متطابقتين. يرجى التأكد وإعادة المحاولة.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signUpWithEmail({
        email: cleanEmail,
        password: cleanPass,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      if (result.alreadyRegistered) {
        setErrorMsg("هذا الحساب مسجل مسبقاً. يرجى تسجيل الدخول بكلمة المرور الخاصة بكِ.");
        setCurrentView("signin");
      } else if (result.error) {
        setErrorMsg(result.error.message || "حدث خطأ أثناء إنشاء الحساب.");
      } else {
        setSuccessMsg("🎉 تم إنشاء حسابكِ بنجاح وتسجيل الدخول! مرحباً بكِ في روح الحجاب.");
        setTimeout(() => {
          closeAuthModal();
        }, 1200);
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "حدث خطأ غير متوقع.");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Sign In Form (Strict Password Verification)
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setGoogleNotice(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setErrorMsg("يرجى إدخال البريد الإلكتروني وكلمة المرور.");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signInWithEmail({
        email: cleanEmail,
        password: cleanPass,
      });

      if (error) {
        setErrorMsg(error.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      } else {
        setSuccessMsg("تم تسجيل الدخول بنجاح! مرحباً بكِ مجدداً.");
        setTimeout(() => {
          closeAuthModal();
        }, 1000);
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "حدث خطأ أثناء تسجيل الدخول.");
    } finally {
      setIsLoading(false);
    }
  };

  // Request password reset view switch
  const handleForgotRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMsg("يرجى إدخال البريد الإلكتروني أولاً.");
      return;
    }

    setCurrentView("forgot-reset");
    setSuccessMsg(`أدخلي كلمة المرور الجديدة لحساب (${cleanEmail}) لتحديثها.`);
  };

  // Reset password
  const handleDirectPasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanNewPass = newPassword.trim();

    if (!cleanEmail) {
      setErrorMsg("يرجى إدخال البريد الإلكتروني.");
      return;
    }
    if (cleanNewPass.length < 6) {
      setErrorMsg("كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل.");
      return;
    }
    if (cleanNewPass !== confirmNewPassword.trim()) {
      setErrorMsg("كلمتا المرور غير متطابقتين.");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await resetPasswordDirect(cleanEmail, cleanNewPass);
      if (error) {
        setErrorMsg(error.message || "فشل تحديث كلمة المرور.");
      } else {
        setSuccessMsg("تم تغيير كلمة المرور بنجاح! يرجى إدخال كلمة المرور لتسجيل الدخول.");
        setPassword(cleanNewPass);
        setTimeout(() => {
          setCurrentView("signin");
        }, 1200);
      }
    } catch {
      setErrorMsg("حدث خطأ أثناء تحديث كلمة المرور.");
    } finally {
      setIsLoading(false);
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
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#FAF6F0] p-6 sm:p-8 shadow-2xl border border-[#E3D4C0] text-[#2B2119] select-none max-h-[92vh] overflow-y-auto"
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
          className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#EDE0CD] text-[#2B2119] transition-transform hover:scale-110 active:scale-95 hover:bg-[#E2CEB4] cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Branding */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EDE0CD] text-xs font-semibold text-[#5A412F] mb-2">
            <Sparkles className="h-3.5 w-3.5 text-[#8C2A3E]" />
            <span>روح الحجاب (Hijab Soul)</span>
          </div>
          <h2 id="auth-modal-title" className="text-xl sm:text-2xl font-black text-[#2B2119]">
            {currentView === "signin" && "تسجيل الدخول"}
            {currentView === "signup" && "إنشاء حساب جديد"}
            {currentView === "forgot-request" && "استرجاع كلمة المرور"}
            {currentView === "forgot-reset" && "تعيين كلمة مرور جديدة"}
          </h2>
          <p className="text-xs sm:text-sm text-[#735A45] mt-1">
            {currentView === "signin" && "أدخلي بريدكِ وكلمة المرور لمتابعة التسوق ومتابعة الطلبات"}
            {currentView === "signup" &&
              "أنشئي حسابكِ للتمتع بتجربة تسوق راقية وحفظ العناوين والطلبات"}
            {currentView === "forgot-request" &&
              "أدخلي بريدكِ الإلكتروني المسجل لتعيين كلمة مرور جديدة"}
            {currentView === "forgot-reset" && "أدخلي كلمة المرور الجديدة لحسابكِ للمتابعة"}
          </p>
        </div>

        {/* Mode Switch Tabs (only for signin/signup) */}
        {(currentView === "signin" || currentView === "signup") && (
          <>
            <div className="flex rounded-xl bg-[#EDE0CD]/80 p-1 mb-4">
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  setSuccessMsg(null);
                  setGoogleNotice(null);
                  setCurrentView("signin");
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                  currentView === "signin"
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
                  setGoogleNotice(null);
                  setCurrentView("signup");
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                  currentView === "signup"
                    ? "bg-[#2B2119] text-white shadow-sm"
                    : "text-[#5A412F] hover:text-[#2B2119]"
                }`}
              >
                إنشاء حساب جديد
              </button>
            </div>

            {/* Google Sign-in Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white border border-[#D5C2AA] text-[#2B2119] hover:bg-[#FAF6F0] hover:border-[#2B2119] active:scale-[0.98] shadow-xs transition-all font-bold text-xs sm:text-sm cursor-pointer disabled:opacity-60 mb-2"
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
              <span>
                {currentView === "signup" ? "التسجيل بحساب Google" : "تسجيل الدخول بحساب Google"}
              </span>
            </button>

            {googleNotice && (
              <div className="mb-3 rounded-xl border border-amber-200 bg-amber-50/90 p-3 text-xs text-amber-900 leading-relaxed flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{googleNotice}</span>
              </div>
            )}

            {/* Divider */}
            <div className="relative flex items-center justify-center my-3.5">
              <div className="border-t border-[#E3D4C0] w-full" />
              <span className="bg-[#FAF6F0] px-3 text-[11px] text-[#8C745E] shrink-0 font-medium">
                أو بالمتابعة بالبريد الإلكتروني
              </span>
              <div className="border-t border-[#E3D4C0] w-full" />
            </div>
          </>
        )}

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="mb-4 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-800 leading-snug animate-in fade-in duration-150">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 flex items-start gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 leading-snug animate-in fade-in duration-150">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* VIEW 1: SIGN IN FORM */}
        {currentView === "signin" && (
          <form onSubmit={handleSignInSubmit} className="space-y-3.5">
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
                  placeholder="name@gmail.com"
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left"
                  dir="ltr"
                />
                <Mail className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#423124]">
                  كلمة المرور <span className="text-[#8C2A3E]">*</span>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left"
                  dir="ltr"
                />
                <Lock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#735A45]">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-[#D5C2AA] text-[#2B2119] focus:ring-0 cursor-pointer"
                />
                <span>تذكرني على هذا الجهاز</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  setSuccessMsg(null);
                  setCurrentView("forgot-request");
                }}
                className="text-[#8C2A3E] hover:underline font-medium cursor-pointer"
              >
                نسيت كلمة المرور؟
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-[#2B2119] text-[#FAF6F0] font-bold text-xs sm:text-sm hover:bg-[#3D2F24] active:scale-[0.98] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>جاري تسجيل الدخول...</span>
                </>
              ) : (
                <span>تسجيل الدخول</span>
              )}
            </button>
          </form>
        )}

        {/* VIEW 2: SIGN UP FORM */}
        {currentView === "signup" && (
          <form onSubmit={handleSignUpSubmit} className="space-y-3">
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
                    placeholder="أمينة"
                    className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none"
                  />
                  <UserIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
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
                    placeholder="بن علي"
                    className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none"
                  />
                  <UserIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
                </div>
              </div>
            </div>

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
                  placeholder="name@gmail.com"
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left"
                  dir="ltr"
                />
                <Mail className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#423124]">
                  كلمة المرور <span className="text-[#8C2A3E]">*</span>
                </label>
                <span className="text-[10px] text-[#8C745E]">6 أحرف أو أرقام على الأقل</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
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

            <div>
              <label className="block text-xs font-bold text-[#423124] mb-1">
                تأكيد كلمة المرور <span className="text-[#8C2A3E]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left"
                  dir="ltr"
                />
                <Lock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-[#2B2119] text-[#FAF6F0] font-bold text-xs sm:text-sm hover:bg-[#3D2F24] active:scale-[0.98] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 mt-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>جاري إنشاء الحساب...</span>
                </>
              ) : (
                <span>إنشاء الحساب والمتابعة فوراً</span>
              )}
            </button>
          </form>
        )}

        {/* VIEW 3: FORGOT PASSWORD REQUEST */}
        {currentView === "forgot-request" && (
          <form onSubmit={handleForgotRequest} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#423124] mb-1">
                البريد الإلكتروني المسجل <span className="text-[#8C2A3E]">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left"
                  dir="ltr"
                />
                <Mail className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-[#2B2119] text-[#FAF6F0] font-bold text-xs sm:text-sm hover:bg-[#3D2F24] active:scale-[0.98] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <span>متابعة تعيين كلمة المرور</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setErrorMsg(null);
                setSuccessMsg(null);
                setCurrentView("signin");
              }}
              className="w-full text-center text-xs text-[#735A45] hover:text-[#2B2119] font-medium flex items-center justify-center gap-1 cursor-pointer pt-1"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <span>العودة لتسجيل الدخول</span>
            </button>
          </form>
        )}

        {/* VIEW 4: DIRECT PASSWORD RESET */}
        {currentView === "forgot-reset" && (
          <form onSubmit={handleDirectPasswordReset} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#423124] mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full rounded-xl border border-[#D5C2AA] bg-white/60 px-3 py-2 text-xs text-[#735A45] text-left"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423124] mb-1">
                كلمة المرور الجديدة <span className="text-[#8C2A3E]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left"
                  dir="ltr"
                />
                <Lock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423124] mb-1">
                تأكيد كلمة المرور الجديدة <span className="text-[#8C2A3E]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left"
                  dir="ltr"
                />
                <Lock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-[#2B2119] text-[#FAF6F0] font-bold text-xs sm:text-sm hover:bg-[#3D2F24] active:scale-[0.98] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>جاري تحديث كلمة المرور...</span>
                </>
              ) : (
                <span>حفظ كلمة المرور وتسجيل الدخول</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setErrorMsg(null);
                setSuccessMsg(null);
                setCurrentView("signin");
              }}
              className="w-full text-center text-xs text-[#735A45] hover:text-[#2B2119] font-medium flex items-center justify-center gap-1 cursor-pointer pt-1"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <span>العودة لتسجيل الدخول</span>
            </button>
          </form>
        )}

        {/* Security & Privacy Footer Note */}
        <div className="mt-5 pt-3 border-t border-[#E3D4C0]/60 text-center">
          <p className="text-[11px] text-[#8C745E] flex items-center justify-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
            <span>بياناتكِ مشفرة وآمنة تماماً ولا يمكن لأي شخص الدخول دون كلمة المرور.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
