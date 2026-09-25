import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react_tanstack__react-query.mjs";
import { n as AuthProvider, r as useAuth } from "./auth-context-D3gqmc4C.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router_chunks.mjs";
import { A as Mail, H as Eye, M as Lock, N as LoaderCircle, U as EyeOff, Y as CircleCheck, Z as CircleAlert, d as Sparkles, n as X, p as ShieldCheck, r as User, rt as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DTm_RmQU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CQTQhOgM.css";
function AuthModal() {
	const { authModalOpen, authModalMode, prefilledEmail, closeAuthModal, signInWithEmail, signUpWithEmail, signInWithGoogle, resetPasswordDirect } = useAuth();
	const [currentView, setCurrentView] = (0, import_react.useState)("signin");
	const [googleNotice, setGoogleNotice] = (0, import_react.useState)(null);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [firstName, setFirstName] = (0, import_react.useState)("");
	const [lastName, setLastName] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)(null);
	const [successMsg, setSuccessMsg] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmNewPassword, setConfirmNewPassword] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (authModalOpen) {
			setErrorMsg(null);
			setSuccessMsg(null);
			setGoogleNotice(null);
			setCurrentView(authModalMode === "signup" ? "signup" : "signin");
			if (prefilledEmail) setEmail(prefilledEmail);
		}
	}, [
		authModalOpen,
		authModalMode,
		prefilledEmail
	]);
	if (!authModalOpen) return null;
	const handleGoogleSignIn = async () => {
		setErrorMsg(null);
		setSuccessMsg(null);
		setGoogleNotice(null);
		setIsLoading(true);
		try {
			const res = await signInWithGoogle();
			if (res.error) {
				setGoogleNotice("خدمة تسجيل الدخول السريع بحساب Google قيد التجهيز من قبل إدارة المتجر. يمكنكِ استخدام البريد الإلكتروني وكلمة المرور للمتابعة الفورية.");
				setIsLoading(false);
				return;
			}
			const authUrl = res.data?.url;
			if (!authUrl) {
				setGoogleNotice("خدمة تسجيل الدخول السريع بحساب Google قيد التجهيز حالياً. يرجى المتابعة بالبريد الإلكتروني.");
				setIsLoading(false);
				return;
			}
			const width = 500;
			const height = 650;
			const left = typeof window !== "undefined" ? window.screenX + (window.outerWidth - width) / 2 : 0;
			const top = typeof window !== "undefined" ? window.screenY + (window.outerHeight - height) / 2 : 0;
			if (!window.open(authUrl, "google_oauth_popup", `width=${width},height=${height},left=${left},top=${top},status=no,toolbar=no,menubar=no`)) window.open(authUrl, "_blank");
			setSuccessMsg("تم فتح نافذة تسجيل الدخول بـ Google. يرجى إكمال التسجيل فيها.");
		} catch {
			setGoogleNotice("خدمة تسجيل الدخول السريع بحساب Google قيد التجهيز حالياً. يرجى المتابعة بالبريد الإلكتروني.");
		} finally {
			setIsLoading(false);
		}
	};
	const handleSignUpSubmit = async (e) => {
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
				lastName: lastName.trim()
			});
			if (result.alreadyRegistered) {
				setErrorMsg("هذا الحساب مسجل مسبقاً. يرجى تسجيل الدخول بكلمة المرور الخاصة بكِ.");
				setCurrentView("signin");
			} else if (result.error) setErrorMsg(result.error.message || "حدث خطأ أثناء إنشاء الحساب.");
			else {
				setSuccessMsg("🎉 تم إنشاء حسابكِ بنجاح وتسجيل الدخول! مرحباً بكِ في روح الحجاب.");
				setTimeout(() => {
					closeAuthModal();
				}, 1200);
			}
		} catch (err) {
			setErrorMsg(err instanceof Error ? err.message : "حدث خطأ غير متوقع.");
		} finally {
			setIsLoading(false);
		}
	};
	const handleSignInSubmit = async (e) => {
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
				password: cleanPass
			});
			if (error) setErrorMsg(error.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة.");
			else {
				setSuccessMsg("تم تسجيل الدخول بنجاح! مرحباً بكِ مجدداً.");
				setTimeout(() => {
					closeAuthModal();
				}, 1e3);
			}
		} catch (err) {
			setErrorMsg(err instanceof Error ? err.message : "حدث خطأ أثناء تسجيل الدخول.");
		} finally {
			setIsLoading(false);
		}
	};
	const handleForgotRequest = (e) => {
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
	const handleDirectPasswordReset = async (e) => {
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
			if (error) setErrorMsg(error.message || "فشل تحديث كلمة المرور.");
			else {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "auth-modal-title",
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200",
		onClick: (e) => {
			if (e.target === e.currentTarget) closeAuthModal();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			dir: "rtl",
			className: "relative w-full max-w-md overflow-hidden rounded-2xl bg-[#FAF6F0] p-6 sm:p-8 shadow-2xl border border-[#E3D4C0] text-[#2B2119] select-none max-h-[92vh] overflow-y-auto",
			style: {
				backgroundImage: "linear-gradient(180deg, #FCF9F4 0%, #F5EDE0 100%), radial-gradient(circle at 20% 20%, rgba(60,45,30,0.025) 0 1px, transparent 1px)",
				backgroundSize: "100% 100%, 8px 8px"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "إغلاق النافذة",
					onClick: closeAuthModal,
					className: "absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#EDE0CD] text-[#2B2119] transition-transform hover:scale-110 active:scale-95 hover:bg-[#E2CEB4] cursor-pointer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EDE0CD] text-xs font-semibold text-[#5A412F] mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-[#8C2A3E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "روح الحجاب (Hijab Soul)" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							id: "auth-modal-title",
							className: "text-xl sm:text-2xl font-black text-[#2B2119]",
							children: [
								currentView === "signin" && "تسجيل الدخول",
								currentView === "signup" && "إنشاء حساب جديد",
								currentView === "forgot-request" && "استرجاع كلمة المرور",
								currentView === "forgot-reset" && "تعيين كلمة مرور جديدة"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs sm:text-sm text-[#735A45] mt-1",
							children: [
								currentView === "signin" && "أدخلي بريدكِ وكلمة المرور لمتابعة التسوق ومتابعة الطلبات",
								currentView === "signup" && "أنشئي حسابكِ للتمتع بتجربة تسوق راقية وحفظ العناوين والطلبات",
								currentView === "forgot-request" && "أدخلي بريدكِ الإلكتروني المسجل لتعيين كلمة مرور جديدة",
								currentView === "forgot-reset" && "أدخلي كلمة المرور الجديدة لحسابكِ للمتابعة"
							]
						})
					]
				}),
				(currentView === "signin" || currentView === "signup") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex rounded-xl bg-[#EDE0CD]/80 p-1 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setErrorMsg(null);
								setSuccessMsg(null);
								setGoogleNotice(null);
								setCurrentView("signin");
							},
							className: `flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${currentView === "signin" ? "bg-[#2B2119] text-white shadow-sm" : "text-[#5A412F] hover:text-[#2B2119]"}`,
							children: "تسجيل الدخول"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setErrorMsg(null);
								setSuccessMsg(null);
								setGoogleNotice(null);
								setCurrentView("signup");
							},
							className: `flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${currentView === "signup" ? "bg-[#2B2119] text-white shadow-sm" : "text-[#5A412F] hover:text-[#2B2119]"}`,
							children: "إنشاء حساب جديد"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleGoogleSignIn,
						disabled: isLoading,
						className: "w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white border border-[#D5C2AA] text-[#2B2119] hover:bg-[#FAF6F0] hover:border-[#2B2119] active:scale-[0.98] shadow-xs transition-all font-bold text-xs sm:text-sm cursor-pointer disabled:opacity-60 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							className: "h-4 w-4 shrink-0",
							viewBox: "0 0 24 24",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fill: "#4285F4",
									d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fill: "#34A853",
									d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fill: "#FBBC05",
									d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fill: "#EA4335",
									d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: currentView === "signup" ? "التسجيل بحساب Google" : "تسجيل الدخول بحساب Google" })]
					}),
					googleNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 rounded-xl border border-amber-200 bg-amber-50/90 p-3 text-xs text-amber-900 leading-relaxed flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 text-amber-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: googleNotice })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex items-center justify-center my-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-[#E3D4C0] w-full" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-[#FAF6F0] px-3 text-[11px] text-[#8C745E] shrink-0 font-medium",
								children: "أو بالمتابعة بالبريد الإلكتروني"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-[#E3D4C0] w-full" })
						]
					})
				] }),
				errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-800 leading-snug animate-in fade-in duration-150",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 text-red-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: errorMsg })]
				}),
				successMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-start gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 leading-snug animate-in fade-in duration-150",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-emerald-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: successMsg })]
				}),
				currentView === "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSignInSubmit,
					className: "space-y-3.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-bold text-[#423124] mb-1",
							children: ["البريد الإلكتروني ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#8C2A3E]",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "name@gmail.com",
								className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left",
								dir: "ltr"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-bold text-[#423124]",
								children: ["كلمة المرور ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[#8C2A3E]",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowPassword((p) => !p),
								className: "text-[11px] text-[#8C745E] hover:text-[#2B2119] inline-flex items-center gap-1 cursor-pointer",
								children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إخفاء" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إظهار" })] })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: showPassword ? "text" : "password",
								required: true,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "••••••••",
								className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left",
								dir: "ltr"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 cursor-pointer text-[#735A45]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									defaultChecked: true,
									className: "rounded border-[#D5C2AA] text-[#2B2119] focus:ring-0 cursor-pointer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تذكرني على هذا الجهاز" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setErrorMsg(null);
									setSuccessMsg(null);
									setCurrentView("forgot-request");
								},
								className: "text-[#8C2A3E] hover:underline font-medium cursor-pointer",
								children: "نسيت كلمة المرور؟"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: isLoading,
							className: "w-full py-2.5 rounded-xl bg-[#2B2119] text-[#FAF6F0] font-bold text-xs sm:text-sm hover:bg-[#3D2F24] active:scale-[0.98] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60",
							children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "جاري تسجيل الدخول..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تسجيل الدخول" })
						})
					]
				}),
				currentView === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSignUpSubmit,
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-bold text-[#423124] mb-1",
								children: ["الاسم الأول ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[#8C2A3E]",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: firstName,
									onChange: (e) => setFirstName(e.target.value),
									placeholder: "أمينة",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" })]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-bold text-[#423124] mb-1",
								children: ["اللقب ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[#8C2A3E]",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: lastName,
									onChange: (e) => setLastName(e.target.value),
									placeholder: "بن علي",
									className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" })]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-bold text-[#423124] mb-1",
							children: ["البريد الإلكتروني ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#8C2A3E]",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "name@gmail.com",
								className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left",
								dir: "ltr"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-bold text-[#423124]",
								children: ["كلمة المرور ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[#8C2A3E]",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-[#8C745E]",
								children: "6 أحرف أو أرقام على الأقل"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: showPassword ? "text" : "password",
								required: true,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "••••••••",
								className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left",
								dir: "ltr"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-bold text-[#423124] mb-1",
							children: ["تأكيد كلمة المرور ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#8C2A3E]",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: showPassword ? "text" : "password",
								required: true,
								value: confirmPassword,
								onChange: (e) => setConfirmPassword(e.target.value),
								placeholder: "••••••••",
								className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left",
								dir: "ltr"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: isLoading,
							className: "w-full py-2.5 rounded-xl bg-[#2B2119] text-[#FAF6F0] font-bold text-xs sm:text-sm hover:bg-[#3D2F24] active:scale-[0.98] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 mt-1",
							children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "جاري إنشاء الحساب..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إنشاء الحساب والمتابعة فوراً" })
						})
					]
				}),
				currentView === "forgot-request" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleForgotRequest,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-bold text-[#423124] mb-1",
							children: ["البريد الإلكتروني المسجل ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#8C2A3E]",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "name@gmail.com",
								className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left",
								dir: "ltr"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: isLoading,
							className: "w-full py-2.5 rounded-xl bg-[#2B2119] text-[#FAF6F0] font-bold text-xs sm:text-sm hover:bg-[#3D2F24] active:scale-[0.98] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "متابعة تعيين كلمة المرور" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setErrorMsg(null);
								setSuccessMsg(null);
								setCurrentView("signin");
							},
							className: "w-full text-center text-xs text-[#735A45] hover:text-[#2B2119] font-medium flex items-center justify-center gap-1 cursor-pointer pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "العودة لتسجيل الدخول" })]
						})
					]
				}),
				currentView === "forgot-reset" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleDirectPasswordReset,
					className: "space-y-3.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-bold text-[#423124] mb-1",
							children: "البريد الإلكتروني"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							disabled: true,
							value: email,
							className: "w-full rounded-xl border border-[#D5C2AA] bg-white/60 px-3 py-2 text-xs text-[#735A45] text-left",
							dir: "ltr"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-bold text-[#423124] mb-1",
							children: ["كلمة المرور الجديدة ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#8C2A3E]",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: showPassword ? "text" : "password",
								required: true,
								value: newPassword,
								onChange: (e) => setNewPassword(e.target.value),
								placeholder: "••••••••",
								className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left",
								dir: "ltr"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-bold text-[#423124] mb-1",
							children: ["تأكيد كلمة المرور الجديدة ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#8C2A3E]",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: showPassword ? "text" : "password",
								required: true,
								value: confirmNewPassword,
								onChange: (e) => setConfirmNewPassword(e.target.value),
								placeholder: "••••••••",
								className: "w-full rounded-xl border border-[#D5C2AA] bg-white px-3 py-2.5 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:border-[#2B2119] focus:outline-none text-left",
								dir: "ltr"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9F8A77]" })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: isLoading,
							className: "w-full py-2.5 rounded-xl bg-[#2B2119] text-[#FAF6F0] font-bold text-xs sm:text-sm hover:bg-[#3D2F24] active:scale-[0.98] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60",
							children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "جاري تحديث كلمة المرور..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "حفظ كلمة المرور وتسجيل الدخول" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setErrorMsg(null);
								setSuccessMsg(null);
								setCurrentView("signin");
							},
							className: "w-full text-center text-xs text-[#735A45] hover:text-[#2B2119] font-medium flex items-center justify-center gap-1 cursor-pointer pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "العودة لتسجيل الدخول" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 pt-3 border-t border-[#E3D4C0]/60 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-[#8C745E] flex items-center justify-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-emerald-700 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "بياناتكِ مشفرة وآمنة تماماً ولا يمكن لأي شخص الدخول دون كلمة المرور." })]
					})
				})
			]
		})
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "الصفحة غير موجودة"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "الصفحة التي تبحثين عنها غير متوفرة أو تم نقلها."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "العودة للرئيسية"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error("Application runtime error:", error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "حدث خطأ أثناء تحميل الصفحة"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "يرجى المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "إعادة المحاولة"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "الرئيسية"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "حجاب سول | أزياء محتشمة أنيقة" },
			{
				name: "description",
				content: "أكثر من مجرد ملابس .. إنه أسلوب حياة - متجر أزياء محتشمة أنيقة"
			},
			{
				name: "author",
				content: "Hijab Soul"
			},
			{
				name: "theme-color",
				content: "#2B2119"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "حجاب سول"
			},
			{
				property: "og:title",
				content: "حجاب سول | أزياء محتشمة أنيقة"
			},
			{
				property: "og:description",
				content: "أكثر من مجرد ملابس .. إنه أسلوب حياة"
			},
			{
				property: "og:image",
				content: "/app-icon.png"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@HijabSoul"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/manifest.json"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;500;600&family=Marck+Script&family=Aref+Ruqaa:wght@400;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				sizes: "any"
			},
			{
				rel: "icon",
				href: "/favicon-32x32.png",
				type: "image/png",
				sizes: "32x32"
			},
			{
				rel: "icon",
				href: "/favicon-16x16.png",
				type: "image/png",
				sizes: "16x16"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png",
				sizes: "180x180"
			},
			{
				rel: "shortcut icon",
				href: "/favicon.ico"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModal, {})] })
	});
}
var $$splitComponentImporter$12 = () => import("./routes-BSbzYmBN.mjs");
var Route$12 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "حجاب سول | أزياء محتشمة أنيقة" },
		{
			name: "description",
			content: "حجاب سول: فساتين، إسدالات، خمار، عبايات وإكسسوارات محتشمة بلمسة أنيقة وراقية."
		},
		{
			property: "og:title",
			content: "حجاب سول | أزياء محتشمة أنيقة"
		},
		{
			property: "og:description",
			content: "أكثر من مجرد ملابس .. إنه أسلوب حياة."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./abayas-DI1LEhBc.mjs");
var Route$11 = createFileRoute("/abayas")({
	head: () => ({ meta: [
		{ title: "عبايات | حجاب سول" },
		{
			name: "description",
			content: "عبايات من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية."
		},
		{
			property: "og:title",
			content: "عبايات | حجاب سول"
		},
		{
			property: "og:description",
			content: "عبايات من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./accessories-D-4iIPvu.mjs");
var Route$10 = createFileRoute("/accessories")({
	head: () => ({ meta: [
		{ title: "إكسسوارات | حجاب سول" },
		{
			name: "description",
			content: "إكسسوارات من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية."
		},
		{
			property: "og:title",
			content: "إكسسوارات | حجاب سول"
		},
		{
			property: "og:description",
			content: "إكسسوارات من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./admin-an5saqxH.mjs");
var Route$9 = createFileRoute("/admin")({
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	head: () => ({ meta: [{ title: "لوحة التحكم والإدارة | روح الحجاب" }, {
		name: "description",
		content: "إدارة متجر روح الحجاب — المنتجات والطلبات والرسائل"
	}] })
});
var $$splitComponentImporter$8 = () => import("./articles-SOzdjXIC.mjs");
var Route$8 = createFileRoute("/articles")({
	head: () => ({ meta: [
		{ title: "مقالات و نصائح | حجاب سول" },
		{
			name: "description",
			content: "مقالات و نصائح من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية."
		},
		{
			property: "og:title",
			content: "مقالات و نصائح | حجاب سول"
		},
		{
			property: "og:description",
			content: "مقالات و نصائح من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./dresses-4wADM1A_.mjs");
var Route$7 = createFileRoute("/dresses")({
	head: () => ({ meta: [
		{ title: "فساتين | حجاب سول" },
		{
			name: "description",
			content: "فساتين من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية."
		},
		{
			property: "og:title",
			content: "فساتين | حجاب سول"
		},
		{
			property: "og:description",
			content: "فساتين من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./hijab-robe-8tUl8eUJ.mjs");
var Route$6 = createFileRoute("/hijab-robe")({
	head: () => ({ meta: [
		{ title: "روب حجاب | حجاب سول" },
		{
			name: "description",
			content: "تشكيلة روب حجاب الفاخرة — أناقة ملكية ومحتشمة من حجاب سول الجزائر."
		},
		{
			property: "og:title",
			content: "روب حجاب | حجاب سول"
		},
		{
			property: "og:description",
			content: "تشكيلة روب حجاب الفاخرة — أناقة ملكية ومحتشمة من حجاب سول الجزائر."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./hijab-supplies-CkZ-cYqS.mjs");
var Route$5 = createFileRoute("/hijab-supplies")({
	head: () => ({ meta: [
		{ title: "حجابات | حجاب سول" },
		{
			name: "description",
			content: "حجابات وشالات فاخرة من حجاب سول — أقمشة شيفون جورجيت وكريب تركي ناعم وشالات سهرة."
		},
		{
			property: "og:title",
			content: "حجابات | حجاب سول"
		},
		{
			property: "og:description",
			content: "حجابات وشالات فاخرة من حجاب سول — أقمشة شيفون جورجيت وكريب تركي ناعم وشالات سهرة."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./isdalat-CEhWDyh5.mjs");
var Route$4 = createFileRoute("/isdalat")({
	head: () => ({ meta: [
		{ title: "اسدالات | حجاب سول" },
		{
			name: "description",
			content: "اسدالات من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية."
		},
		{
			property: "og:title",
			content: "اسدالات | حجاب سول"
		},
		{
			property: "og:description",
			content: "اسدالات من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./khimar-iHJPyieI.mjs");
var Route$3 = createFileRoute("/khimar")({
	head: () => ({ meta: [
		{ title: "خمار | حجاب سول" },
		{
			name: "description",
			content: "خمار من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية."
		},
		{
			property: "og:title",
			content: "خمار | حجاب سول"
		},
		{
			property: "og:description",
			content: "خمار من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./sales-BGp0xG3c.mjs");
var Route$2 = createFileRoute("/sales")({
	head: () => ({ meta: [
		{ title: "تخفيضات | حجاب سول" },
		{
			name: "description",
			content: "تخفيضات حجاب سول — قطع محتشمة أنيقة بأسعار مميزة."
		},
		{
			property: "og:title",
			content: "تخفيضات | حجاب سول"
		},
		{
			property: "og:description",
			content: "تخفيضات حجاب سول — قطع محتشمة أنيقة بأسعار مميزة."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./shoes-BAtF8ouf.mjs");
var Route$1 = createFileRoute("/shoes")({
	head: () => ({ meta: [
		{ title: "أحذية شرعية | حجاب سول" },
		{
			name: "description",
			content: "أحذية شرعية من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية."
		},
		{
			property: "og:title",
			content: "أحذية شرعية | حجاب سول"
		},
		{
			property: "og:description",
			content: "أحذية شرعية من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./shop-BLsK41GU.mjs");
var Route = createFileRoute("/shop")({
	head: () => ({ meta: [
		{ title: "تسوقي الآن | حجاب سول" },
		{
			name: "description",
			content: "تسوقي أزياء حجاب سول المحتشمة والأنيقة."
		},
		{
			property: "og:title",
			content: "تسوقي الآن | حجاب سول"
		},
		{
			property: "og:description",
			content: "تسوقي أزياء حجاب سول المحتشمة والأنيقة."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$12.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$13
	}),
	AbayasRoute: Route$11.update({
		id: "/abayas",
		path: "/abayas",
		getParentRoute: () => Route$13
	}),
	AccessoriesRoute: Route$10.update({
		id: "/accessories",
		path: "/accessories",
		getParentRoute: () => Route$13
	}),
	AdminRoute: Route$9.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$13
	}),
	ArticlesRoute: Route$8.update({
		id: "/articles",
		path: "/articles",
		getParentRoute: () => Route$13
	}),
	DressesRoute: Route$7.update({
		id: "/dresses",
		path: "/dresses",
		getParentRoute: () => Route$13
	}),
	HijabRobeRoute: Route$6.update({
		id: "/hijab-robe",
		path: "/hijab-robe",
		getParentRoute: () => Route$13
	}),
	HijabSuppliesRoute: Route$5.update({
		id: "/hijab-supplies",
		path: "/hijab-supplies",
		getParentRoute: () => Route$13
	}),
	IsdalatRoute: Route$4.update({
		id: "/isdalat",
		path: "/isdalat",
		getParentRoute: () => Route$13
	}),
	KhimarRoute: Route$3.update({
		id: "/khimar",
		path: "/khimar",
		getParentRoute: () => Route$13
	}),
	SalesRoute: Route$2.update({
		id: "/sales",
		path: "/sales",
		getParentRoute: () => Route$13
	}),
	ShoesRoute: Route$1.update({
		id: "/shoes",
		path: "/shoes",
		getParentRoute: () => Route$13
	}),
	ShopRoute: Route.update({
		id: "/shop",
		path: "/shop",
		getParentRoute: () => Route$13
	})
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
