import React, { useState, useEffect, useRef } from "react";
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
  KeyRound,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

type ModalView = "signin" | "signup" | "verify-otp" | "forgot-request" | "forgot-reset";

export function AuthModal() {
  const {
    authModalOpen,
    authModalMode,
    prefilledEmail,
    closeAuthModal,
    openAuthModal,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    resetPassword,
  } = useAuth();

  const [currentView, setCurrentView] = useState<ModalView>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // OTP State
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [otpInput, setOtpInput] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState<number>(60);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (authModalOpen) {
      setErrorMsg(null);
      setSuccessMsg(null);
      setCurrentView(authModalMode === "signup" ? "signup" : "signin");
      if (prefilledEmail) {
        setEmail(prefilledEmail);
      }
    }
  }, [authModalOpen, authModalMode, prefilledEmail]);

  // Timer countdown for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if ((currentView === "verify-otp" || currentView === "forgot-reset") && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentView, resendTimer]);

  if (!authModalOpen) return null;

  const generate6DigitOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);
    try {
      const res = await signInWithGoogle();
      if (res.error) {
        setErrorMsg(res.error.message || "تعذر تسجيل الدخول بحساب Google.");
      } else {
        setSuccessMsg("تم تسجيل الدخول بنجاح بحساب Google! مرحباً بكِ.");
        setTimeout(() => {
          closeAuthModal();
        }, 1000);
      }
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "حدث خطأ غير متوقع أثناء تسجيل الدخول بـ Google.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 1. Submit Registration Form -> Send OTP Code
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMsg("يرجى إدخال الاسم واللقب.");
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

    const code = generate6DigitOtp();
    setGeneratedOtp(code);
    setOtpInput(["", "", "", "", "", ""]);
    setResendTimer(60);
    setCurrentView("verify-otp");
    setSuccessMsg(`📧 تم إرسال رمز التحقق المكون من 6 أرقام إلى بريدك الإلكتروني (رمز التفعيل: ${code})`);
  };

  // 2. Verify Sign-Up OTP & Complete Registration
  const handleVerifySignUpOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const enteredCode = otpInput.join("");
    if (enteredCode.length < 6) {
      setErrorMsg("يرجى إدخال كامل أرقام الرمز الستة.");
      return;
    }

    if (enteredCode !== generatedOtp) {
      setErrorMsg("رمز التحقق غير صحيح! يرجى التأكد وإعادة المحاولة.");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signUpWithEmail({
        email: email.trim(),
        password: password.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      if (error) {
        setErrorMsg(error.message || "حدث خطأ أثناء إنشاء الحساب.");
      } else {
        setSuccessMsg("تم تأكيد البريد الإلكتروني وإنشاء حسابكِ بنجاح! أهلاً بكِ في حجاب سول.");
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

  // 3. Submit Sign In Form
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setErrorMsg("يرجى ملء البريد الإلكتروني وكلمة المرور.");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signInWithEmail({
        email: cleanEmail,
        password: cleanPass,
      });

      if (error) {
        setErrorMsg(error.message || "بيانات الدخول غير صحيحة.");
      } else {
        setSuccessMsg("تم تسجيل الدخول بنجاح! أهلاً بكِ مجدداً.");
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

  // 4. Request Password Reset OTP
  const handleForgotRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMsg("يرجى إدخال البريد الإلكتروني المسجل.");
      return;
    }

    const code = generate6DigitOtp();
    setGeneratedOtp(code);
    setOtpInput(["", "", "", "", "", ""]);
    setResendTimer(60);
    setCurrentView("forgot-reset");
    setSuccessMsg(`📧 تم إرسال رمز استرجاع كلمة المرور المكون من 6 أرقام إلى بريدك الإلكتروني (رمز التعديل: ${code})`);
  };

  // 5. Submit Password Reset
  const handleForgotReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const enteredCode = otpInput.join("");
    if (enteredCode.length < 6) {
      setErrorMsg("يرجى إدخال كامل أرقام الرمز الستة.");
      return;
    }

    if (enteredCode !== generatedOtp) {
      setErrorMsg("رمز الاسترجاع غير صحيح! يرجى التأكد وإعادة المحاولة.");
      return;
    }

    if (newPassword.trim().length < 6) {
      setErrorMsg("كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل.");
      return;
    }

    if (newPassword.trim() !== confirmNewPassword.trim()) {
      setErrorMsg("كلمتا المرور الجديدة غير متطابقتين.");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await resetPassword(email, newPassword);
      if (error) {
        setErrorMsg(error.message || "فشل تحديث كلمة المرور.");
      } else {
        setSuccessMsg("تم تغيير كلمة المرور بنجاح! يمكنكِ الآن تسجيل الدخول بكودكِ الجديد.");
        setTimeout(() => {
          setCurrentView("signin");
          setPassword(newPassword);
          setSuccessMsg("تم تحديث كلمة المرور! أدخلي كلمة المرور لتسجيل الدخول.");
        }, 1200);
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "حدث خطأ أثنائ تحديث كلمة المرور.");
    } finally {
      setIsLoading(false);
    }
  };

  // OTP digit boxes handler
  const handleOtpDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpInput];
    newOtp[index] = value.slice(-1);
    setOtpInput(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      otpRefs[index + 1]?.current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpInput[index] && index > 0) {
      otpRefs[index - 1]?.current?.focus();
    }
  };

  const handleResendOtp = () => {
    const code = generate6DigitOtp();
    setGeneratedOtp(code);
    setResendTimer(60);
    setOtpInput(["", "", "", "", "", ""]);
    setSuccessMsg(`📧 تم إعادة إرسال رمز جديد المكون من 6 أرقام (الرمز الجديد: ${code})`);
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
            <span>حجاب سول (Hijab Soul)</span>
          </div>
          <h2 id="auth-modal-title" className="text-xl sm:text-2xl font-black text-[#2B2119]">
            {currentView === "signin" && "تسجيل الدخول"}
            {currentView === "signup" && "إنشاء حساب جديد"}
            {currentView === "verify-otp" && "تأكيد بريدك الإلكتروني"}
            {currentView === "forgot-request" && "استرجاع كلمة المرور"}
            {currentView === "forgot-reset" && "تعيين كلمة مرور جديدة"}
          </h2>
          <p className="text-xs sm:text-sm text-[#735A45] mt-1">
            {currentView === "signin" && "أدخلي بريدكِ الإلكتروني وكلمة المرور لمتابعة التسوق والطلب"}
            {currentView === "signup" && "أنشئي حسابكِ بكلمة المرور للوصول الكامل لخدمات المتجر"}
            {currentView === "verify-otp" && `أدخلي الرمز المكون من 6 أرقام الذي أرسلناه إلى ${email}`}
            {currentView === "forgot-request" && "أدخلي بريدكِ الإلكتروني لإرسال كود استرجاع الحساب"}
            {currentView === "forgot-reset" && "أدخلي الكود المكون من 6 أرقام وكلمة المرور الجديدة"}
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
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white border border-[#D5C2AA] text-[#2B2119] hover:bg-[#FAF6F0] hover:border-[#2B2119] active:scale-[0.98] shadow-xs transition-all font-bold text-xs sm:text-sm cursor-pointer disabled:opacity-60 mb-3"
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
                {currentView === "signup"
                  ? "التسجيل السريع بحساب Google"
                  : "تسجيل الدخول بحساب Google"}
              </span>
            </button>

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
                  minLength={6}
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left"
                  dir="ltr"
                />
                <Lock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
              </div>

              {/* Forgot password link */}
              <div className="text-left mt-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg(null);
                    setSuccessMsg(null);
                    setCurrentView("forgot-request");
                  }}
                  className="text-[11px] font-bold text-[#8C2A3E] hover:underline cursor-pointer"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#2B2119] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:bg-[#3D2F24] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <span>تسجيل الدخول</span>
              )}
            </button>
          </form>
        )}

        {/* VIEW 2: SIGN UP FORM */}
        {currentView === "signup" && (
          <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
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
                    placeholder="مثال: أمينة"
                    className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none"
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
                    placeholder="مثال: بن سالم"
                    className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none"
                  />
                  <UserIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
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
                  minLength={6}
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left"
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
                  minLength={6}
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left"
                  dir="ltr"
                />
                <Lock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#2B2119] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:bg-[#3D2F24] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
            >
              <KeyRound className="h-4 w-4 text-[#E5D2B8]" />
              <span>إرسال رمز التحقق وإكمال التسجيل</span>
            </button>
          </form>
        )}

        {/* VIEW 3: VERIFY SIGN-UP OTP */}
        {currentView === "verify-otp" && (
          <form onSubmit={handleVerifySignUpOtp} className="space-y-4 text-center">
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-right text-xs text-amber-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <KeyRound className="h-4 w-4 text-[#8C2A3E]" />
                <span>إدخال رمز التأكيد البريدي (OTP)</span>
              </p>
              <p className="text-[11px] text-[#5A412F]">
                أدخلي الأرقام الستة المرسلة إلى بريدك الإلكتروني للتأكد من ملكية الحساب.
              </p>
            </div>

            {/* 6 Digit Inputs */}
            <div className="flex justify-center items-center gap-2 dir-ltr" dir="ltr">
              {otpInput.map((digit, idx) => (
                <input
                  key={idx}
                  ref={otpRefs[idx]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className="w-10 h-12 text-center text-lg font-black rounded-xl border-2 border-[#D5C2AA] bg-white text-[#2B2119] focus:border-[#8C2A3E] focus:outline-none shadow-xs transition-all"
                />
              ))}
            </div>

            {/* Resend button & timer */}
            <div className="flex items-center justify-between text-xs text-[#735A45] pt-1">
              <button
                type="button"
                onClick={() => setCurrentView("signup")}
                className="hover:underline flex items-center gap-1 text-[#5A412F] cursor-pointer"
              >
                <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                <span>تعديل البيانات</span>
              </button>

              <button
                type="button"
                disabled={resendTimer > 0}
                onClick={handleResendOtp}
                className="font-bold text-[#8C2A3E] disabled:opacity-50 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${resendTimer === 0 ? "animate-spin" : ""}`} />
                <span>{resendTimer > 0 ? `إعادة الإرسال بعد (${resendTimer}ث)` : "إعادة إرسال الرمز"}</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#2B2119] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:bg-[#3D2F24] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <span>تأكيد الرمز وإنشاء الحساب</span>
              )}
            </button>
          </form>
        )}

        {/* VIEW 4: FORGOT PASSWORD REQUEST */}
        {currentView === "forgot-request" && (
          <form onSubmit={handleForgotRequest} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#423124] mb-1">
                البريد الإلكتروني الحساب <span className="text-[#8C2A3E]">*</span>
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
              className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#2B2119] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:bg-[#3D2F24] active:scale-[0.98] cursor-pointer"
            >
              <Mail className="h-4 w-4 text-[#E5D2B8]" />
              <span>إرسال رمز استرجاع كلمة المرور</span>
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setCurrentView("signin")}
                className="text-xs font-bold text-[#8C2A3E] hover:underline cursor-pointer"
              >
                العودة إلى تسجيل الدخول
              </button>
            </div>
          </form>
        )}

        {/* VIEW 5: FORGOT PASSWORD RESET */}
        {currentView === "forgot-reset" && (
          <form onSubmit={handleForgotReset} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#423124] mb-1 text-center">
                أدخلي رمز التعيين المكون من 6 أرقام <span className="text-[#8C2A3E]">*</span>
              </label>
              <div className="flex justify-center items-center gap-2 dir-ltr mb-2" dir="ltr">
                {otpInput.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={otpRefs[idx]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-10 h-11 text-center text-lg font-black rounded-xl border-2 border-[#D5C2AA] bg-white text-[#2B2119] focus:border-[#8C2A3E] focus:outline-none shadow-xs transition-all"
                  />
                ))}
              </div>
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
                  minLength={6}
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
                  minLength={6}
                  className="w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left"
                  dir="ltr"
                />
                <Lock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#2B2119] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:bg-[#3D2F24] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <span>تحديث كلمة المرور والحفظ</span>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setCurrentView("signin")}
                className="text-xs font-bold text-[#8C2A3E] hover:underline cursor-pointer"
              >
                إلغاء والعودة لتسجيل الدخول
              </button>
            </div>
          </form>
        )}

        {/* Footer switch prompt for signin/signup */}
        {(currentView === "signin" || currentView === "signup") && (
          <div className="text-center mt-5 pt-3.5 border-t border-[#E3D4C0] text-xs text-[#735A45]">
            {currentView === "signup" ? (
              <p>
                لديكِ حساب بالفعل؟{" "}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg(null);
                    setSuccessMsg(null);
                    setCurrentView("signin");
                  }}
                  className="font-bold text-[#8C2A3E] underline hover:text-[#2B2119] cursor-pointer mr-1"
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
                    setCurrentView("signup");
                  }}
                  className="font-bold text-[#8C2A3E] underline hover:text-[#2B2119] cursor-pointer mr-1"
                >
                  أنشئي حساباً جديداً بالبريد وكلمة المرور
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
