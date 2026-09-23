import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react_tanstack__react-query.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-context-Cb-evhs3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var supabaseUrl = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpeXRhdnl2ZmZ6YXh4eWdjdGJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4NDc4ODgsImV4cCI6MjEwNTQyMzg4OH0.P4nZA9VApWxNOkd5Yer9Ir3eoYLVAg3PReKHBwCm5_A",
	"VITE_SUPABASE_URL": "https://xiytavyvffzaxxygctbs.supabase.co"
}["VITE_SUPABASE_URL"] || "";
var supabaseAnonKey = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpeXRhdnl2ZmZ6YXh4eWdjdGJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4NDc4ODgsImV4cCI6MjEwNTQyMzg4OH0.P4nZA9VApWxNOkd5Yer9Ir3eoYLVAg3PReKHBwCm5_A",
	"VITE_SUPABASE_URL": "https://xiytavyvffzaxxygctbs.supabase.co"
}["VITE_SUPABASE_ANON_KEY"] || "";
/**
* Checks if Supabase credentials have been properly set by the user.
*/
var isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== "https://your-project.supabase.co" && supabaseAnonKey !== "your-anon-key-here" && supabaseUrl.startsWith("http"));
/**
* Supabase client instance.
* Safe fallback client if credentials are not yet configured.
*/
var supabase = createClient(isSupabaseConfigured ? supabaseUrl : "https://placeholder-project.supabase.co", isSupabaseConfigured ? supabaseAnonKey : "placeholder-anon-key", { auth: {
	persistSession: true,
	autoRefreshToken: true,
	detectSessionInUrl: true
} });
var ADMIN_EMAILS = [];
var LOCAL_STORAGE_USER_KEY = "hijab_soul_active_user";
function isAdminEmail(email) {
	if (!email) return false;
	return ADMIN_EMAILS.some((admin) => admin.toLowerCase() === email.trim().toLowerCase());
}
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [authModalOpen, setAuthModalOpen] = (0, import_react.useState)(false);
	const [authModalMode, setAuthModalMode] = (0, import_react.useState)("signin");
	const [prefilledEmail, setPrefilledEmail] = (0, import_react.useState)(void 0);
	const openAuthModal = (mode = "signin", emailPrefill) => {
		setAuthModalMode(mode);
		setPrefilledEmail(emailPrefill);
		setAuthModalOpen(true);
	};
	const closeAuthModal = () => {
		setAuthModalOpen(false);
		setPrefilledEmail(void 0);
	};
	const getProfile = (u) => {
		if (!u) return null;
		const meta = u.user_metadata || {};
		const firstName = meta["first_name"] || meta["given_name"] || (meta["full_name"] ? meta["full_name"].split(" ")[0] : "") || (meta["name"] ? meta["name"].split(" ")[0] : "") || u.email?.split("@")[0] || "المستخدم";
		const lastName = meta["last_name"] || meta["family_name"] || (meta["full_name"] ? meta["full_name"].split(" ").slice(1).join(" ") : "") || "";
		const fullName = meta["full_name"] || meta["name"] || `${firstName} ${lastName}`.trim() || u.email?.split("@")[0] || "المستخدم";
		const avatarUrl = meta["avatar_url"] || meta["picture"] || "";
		const email = u.email || "";
		return {
			firstName,
			lastName,
			fullName,
			email,
			avatarUrl,
			isAdmin: isAdminEmail(email),
			provider: u.app_metadata?.provider || "email"
		};
	};
	(0, import_react.useEffect)(() => {
		try {
			const stored = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
			if (stored) {
				const parsed = JSON.parse(stored);
				if (parsed && parsed.email) setUser(parsed);
			}
		} catch {}
		if (!isSupabaseConfigured) {
			setLoading(false);
			return;
		}
		supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
			if (currentSession?.user) {
				setSession(currentSession);
				setUser(currentSession.user);
				try {
					localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(currentSession.user));
				} catch {}
			}
			setLoading(false);
		});
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
			if (currentSession?.user) {
				setSession(currentSession);
				setUser(currentSession.user);
				try {
					localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(currentSession.user));
				} catch {}
			} else if (!localStorage.getItem(LOCAL_STORAGE_USER_KEY)) {
				setSession(null);
				setUser(null);
			}
			setLoading(false);
		});
		return () => {
			subscription.unsubscribe();
		};
	}, []);
	const signUpWithEmail = async ({ email, password, firstName, lastName }) => {
		const normalizedEmail = email.trim().toLowerCase();
		const cleanFirstName = firstName.trim();
		const cleanLastName = lastName.trim();
		const fullName = `${cleanFirstName} ${cleanLastName}`.trim();
		if (!normalizedEmail || !password) return { error: /* @__PURE__ */ new Error("يرجى إدخال البريد الإلكتروني وكلمة المرور.") };
		if (!cleanFirstName || !cleanLastName) return { error: /* @__PURE__ */ new Error("يرجى إدخال الاسم الأول واللقب.") };
		if (password.length < 6) return { error: /* @__PURE__ */ new Error("كلمة المرور يجب ألا تقل عن 6 خانات.") };
		if (!isSupabaseConfigured) return { error: /* @__PURE__ */ new Error("تنبيه أمني: إرسال بريد التفعيل يتطلب إعداد مفاتيح Supabase (VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY). يرجى ربط المفاتيح في ملف البيئة لتشغيل إرسال الأكواد الفعلية للبريد.") };
		try {
			const res = await supabase.auth.signUp({
				email: normalizedEmail,
				password,
				options: {
					data: {
						first_name: cleanFirstName,
						last_name: cleanLastName,
						full_name: fullName
					},
					emailRedirectTo: typeof window !== "undefined" ? window.location.origin : ""
				}
			});
			if (res.error) return { error: res.error };
			return {
				data: res.data,
				error: null
			};
		} catch (err) {
			return { error: err instanceof Error ? err : new Error(String(err)) };
		}
	};
	const verifySignUpOtp = async (email, token) => {
		const normalizedEmail = email.trim().toLowerCase();
		const cleanToken = token.trim();
		if (!normalizedEmail || !cleanToken) return { error: /* @__PURE__ */ new Error("يرجى إدخال البريد الإلكتروني ورمز التحقق الكامل.") };
		if (!isSupabaseConfigured) return { error: /* @__PURE__ */ new Error("Supabase غير متصل. يرجى إعداد مفاتيح الاتصال أولاً.") };
		try {
			let res = await supabase.auth.verifyOtp({
				email: normalizedEmail,
				token: cleanToken,
				type: "signup"
			});
			if (res.error) res = await supabase.auth.verifyOtp({
				email: normalizedEmail,
				token: cleanToken,
				type: "email"
			});
			if (res.error) return { error: /* @__PURE__ */ new Error("رمز التحقق غير صحيح أو منتهي الصلاحية. يرجى التأكد من البريد والمحاولة مجدداً.") };
			if (res.data?.user) {
				setUser(res.data.user);
				setSession(res.data.session);
				try {
					localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.user));
				} catch {}
			}
			return {
				data: res.data,
				error: null
			};
		} catch (err) {
			return { error: err instanceof Error ? err : new Error(String(err)) };
		}
	};
	const signInWithEmail = async ({ email, password }) => {
		const normalizedEmail = email.trim().toLowerCase();
		if (!normalizedEmail || !password) return { error: /* @__PURE__ */ new Error("يرجى إدخال البريد الإلكتروني وكلمة المرور.") };
		if (!isSupabaseConfigured) return { error: /* @__PURE__ */ new Error("تسجيل الدخول يتطلب ربط مفاتيح Supabase. يرجى إدخال VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY في البيئة.") };
		try {
			const res = await supabase.auth.signInWithPassword({
				email: normalizedEmail,
				password
			});
			if (res.error) return { error: /* @__PURE__ */ new Error("بيانات الدخول غير صحيحة أو الحساب غير مؤكد عبر البريد الإلكتروني بعد.") };
			if (res.data?.user) {
				setUser(res.data.user);
				setSession(res.data.session);
				try {
					localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.user));
				} catch {}
				return res;
			}
			return { error: /* @__PURE__ */ new Error("تعذر إكمال عملية تسجيل الدخول.") };
		} catch (err) {
			return { error: err instanceof Error ? err : new Error(String(err)) };
		}
	};
	const signInWithGoogle = async () => {
		if (!isSupabaseConfigured) return { error: /* @__PURE__ */ new Error("تسجيل الدخول بـ Google يتطلب ربط مشروع Supabase وإدخال مفاتيح VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY وتفعيل Google Provider في لوحة Supabase.") };
		try {
			const res = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: { redirectTo: typeof window !== "undefined" ? window.location.origin : "" }
			});
			if (res.error) return { error: res.error };
			return res;
		} catch (err) {
			return { error: err instanceof Error ? err : new Error(String(err)) };
		}
	};
	const sendPasswordResetOtp = async (email) => {
		const normalizedEmail = email.trim().toLowerCase();
		if (!normalizedEmail) return { error: /* @__PURE__ */ new Error("يرجى إدخال البريد الإلكتروني.") };
		if (!isSupabaseConfigured) return { error: /* @__PURE__ */ new Error("خدمة استرجاع كلمة المرور تتطلب ربط مفاتيح Supabase.") };
		try {
			const res = await supabase.auth.resetPasswordForEmail(normalizedEmail, { redirectTo: typeof window !== "undefined" ? window.location.origin : "" });
			if (res.error) return { error: res.error };
			return { error: null };
		} catch (err) {
			return { error: err instanceof Error ? err : new Error(String(err)) };
		}
	};
	const verifyPasswordResetOtpAndUpdate = async (email, token, newPassword) => {
		const normalizedEmail = email.trim().toLowerCase();
		const cleanToken = token.trim();
		const cleanPass = newPassword.trim();
		if (!normalizedEmail || !cleanToken || !cleanPass) return { error: /* @__PURE__ */ new Error("يرجى إدخال البريد والرمز وكلمة المرور الجديدة.") };
		if (cleanPass.length < 6) return { error: /* @__PURE__ */ new Error("كلمة المرور يجب ألا تقل عن 6 خانات.") };
		if (!isSupabaseConfigured) return { error: /* @__PURE__ */ new Error("تأكيد كلمة المرور يتطلب ربط Supabase.") };
		try {
			if ((await supabase.auth.verifyOtp({
				email: normalizedEmail,
				token: cleanToken,
				type: "recovery"
			})).error) return { error: /* @__PURE__ */ new Error("رمز الاسترجاع غير صحيح أو منتهي الصلاحية.") };
			const updateRes = await supabase.auth.updateUser({ password: cleanPass });
			if (updateRes.error) return { error: updateRes.error };
			return { error: null };
		} catch (err) {
			return { error: err instanceof Error ? err : new Error(String(err)) };
		}
	};
	const resetPassword = async (email, newPassword) => {
		return verifyPasswordResetOtpAndUpdate(email, "", newPassword);
	};
	const signOut = async () => {
		try {
			localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
		} catch {}
		setUser(null);
		setSession(null);
		if (isSupabaseConfigured) try {
			await supabase.auth.signOut();
		} catch {}
		return { error: null };
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			session,
			profile: getProfile(user),
			isAdmin: isAdminEmail(user?.email),
			loading,
			isConfigured: isSupabaseConfigured,
			authModalOpen,
			authModalMode,
			prefilledEmail,
			openAuthModal,
			closeAuthModal,
			signUpWithEmail,
			verifySignUpOtp,
			signInWithEmail,
			signInWithGoogle,
			sendPasswordResetOtp,
			verifyPasswordResetOtpAndUpdate,
			resetPassword,
			signOut
		},
		children
	});
}
function useAuth() {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
}
//#endregion
export { AuthProvider as n, useAuth as r, ADMIN_EMAILS as t };
