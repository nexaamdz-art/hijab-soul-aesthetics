import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react_tanstack__react-query.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-context-D3gqmc4C.js
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
var ADMIN_EMAILS = [
	"nexa.am.dz@gmail.com",
	"admin@hijabsoul.dz",
	"hijabsoul.dz@gmail.com"
];
var LOCAL_STORAGE_USER_KEY = "hijab_soul_active_user";
var LOCAL_STORAGE_ACCOUNTS_KEY = "hijab_soul_registered_accounts";
function isAdminEmail(email) {
	if (!email) return false;
	return ADMIN_EMAILS.some((admin) => admin.toLowerCase() === email.trim().toLowerCase());
}
var AuthContext = (0, import_react.createContext)(void 0);
function getLocalAccounts() {
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_ACCOUNTS_KEY);
		if (!raw) return [];
		return JSON.parse(raw);
	} catch {
		return [];
	}
}
function saveLocalAccounts(accounts) {
	try {
		localStorage.setItem(LOCAL_STORAGE_ACCOUNTS_KEY, JSON.stringify(accounts));
	} catch {}
}
function accountToUser(account) {
	const isOwner = account.role === "admin" || isAdminEmail(account.email);
	return {
		id: `user_${account.email.replace(/[^a-zA-Z0-9]/g, "_")}`,
		app_metadata: { provider: "email" },
		user_metadata: {
			first_name: account.firstName,
			last_name: account.lastName,
			full_name: account.fullName,
			email: account.email,
			avatar_url: account.avatarUrl || (isOwner ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(account.firstName)}&backgroundColor=2B2119&textColor=FFFFFF`)
		},
		aud: "authenticated",
		created_at: account.createdAt,
		email: account.email,
		role: isOwner ? "admin" : "authenticated",
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
}
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
		const cleanPassword = password?.trim() || "";
		const fullName = `${cleanFirstName} ${cleanLastName}`.trim();
		if (!normalizedEmail || !cleanPassword) return { error: /* @__PURE__ */ new Error("يرجى إدخال البريد الإلكتروني وكلمة المرور.") };
		if (!cleanFirstName || !cleanLastName) return { error: /* @__PURE__ */ new Error("يرجى إدخال الاسم الأول واللقب.") };
		if (cleanPassword.length < 6) return { error: /* @__PURE__ */ new Error("كلمة المرور يجب ألا تقل عن 6 خانات.") };
		const isOwner = isAdminEmail(normalizedEmail);
		const existingAccounts = getLocalAccounts();
		const alreadyExistsLocally = existingAccounts.some((a) => a.email.toLowerCase() === normalizedEmail);
		if (isOwner || alreadyExistsLocally) return {
			alreadyRegistered: true,
			error: /* @__PURE__ */ new Error("هذا الحساب مسجل مسبقاً. يرجى تسجيل الدخول بكلمة المرور.")
		};
		try {
			const apiRes = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: normalizedEmail,
					password: cleanPassword,
					firstName: cleanFirstName,
					lastName: cleanLastName
				})
			});
			const apiData = await apiRes.json();
			if (!apiRes.ok) {
				if (apiData.code === "user_already_exists") return {
					alreadyRegistered: true,
					error: /* @__PURE__ */ new Error("هذا الحساب مسجل مسبقاً. يرجى تسجيل الدخول بكلمة المرور.")
				};
				return { error: new Error(apiData.error || "فشل إنشاء الحساب.") };
			}
		} catch {}
		const accountRecord = {
			email: normalizedEmail,
			passwordHash: cleanPassword,
			firstName: cleanFirstName,
			lastName: cleanLastName,
			fullName,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			role: "authenticated"
		};
		existingAccounts.push(accountRecord);
		saveLocalAccounts(existingAccounts);
		const fallbackUser = accountToUser(accountRecord);
		if (!isSupabaseConfigured) {
			setUser(fallbackUser);
			localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(fallbackUser));
			return {
				data: {
					user: fallbackUser,
					session: null
				},
				error: null
			};
		}
		try {
			const res = await supabase.auth.signUp({
				email: normalizedEmail,
				password: cleanPassword,
				options: {
					data: {
						first_name: cleanFirstName,
						last_name: cleanLastName,
						full_name: fullName
					},
					emailRedirectTo: typeof window !== "undefined" ? window.location.origin : ""
				}
			});
			if (res.data?.user && (!res.data.user.identities || res.data.user.identities.length === 0)) return {
				alreadyRegistered: true,
				error: /* @__PURE__ */ new Error("هذا الحساب مسجل مسبقاً. يرجى تسجيل الدخول بكلمة المرور.")
			};
			if (res.data?.session?.user) {
				setUser(res.data.session.user);
				setSession(res.data.session);
				localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.session.user));
				return {
					data: res.data,
					error: null
				};
			}
			setUser(fallbackUser);
			localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(fallbackUser));
			return {
				data: {
					user: fallbackUser,
					session: null
				},
				error: null
			};
		} catch {
			setUser(fallbackUser);
			localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(fallbackUser));
			return {
				data: {
					user: fallbackUser,
					session: null
				},
				error: null
			};
		}
	};
	const verifySignUpOtp = async (email, token) => {
		const normalizedEmail = email.trim().toLowerCase();
		const cleanToken = token.trim();
		if (!normalizedEmail) return { error: /* @__PURE__ */ new Error("يرجى إدخال البريد الإلكتروني.") };
		if (isSupabaseConfigured && cleanToken) try {
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
			if (res.data?.user) {
				setUser(res.data.user);
				setSession(res.data.session);
				localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.user));
				return {
					data: res.data,
					error: null
				};
			}
		} catch {}
		const found = getLocalAccounts().find((a) => a.email.toLowerCase() === normalizedEmail);
		if (found) {
			const activeUser = accountToUser(found);
			setUser(activeUser);
			localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(activeUser));
			return {
				data: {
					user: activeUser,
					session: null
				},
				error: null
			};
		}
		return { error: /* @__PURE__ */ new Error("رمز التحقق غير صحيح أو منتهي الصلاحية.") };
	};
	const signInWithEmail = async ({ email, password }) => {
		const normalizedEmail = email.trim().toLowerCase();
		const cleanPassword = password?.trim() || "";
		if (!normalizedEmail || !cleanPassword) return { error: /* @__PURE__ */ new Error("يرجى إدخال البريد الإلكتروني وكلمة المرور.") };
		if (isSupabaseConfigured) try {
			const res = await supabase.auth.signInWithPassword({
				email: normalizedEmail,
				password: cleanPassword
			});
			if (res.data?.user) {
				setUser(res.data.user);
				setSession(res.data.session);
				try {
					localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.user));
				} catch {}
				return res;
			}
		} catch {}
		try {
			const apiRes = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: normalizedEmail,
					password: cleanPassword
				})
			});
			const apiData = await apiRes.json();
			if (apiRes.status === 401) return { error: new Error(apiData.error || "كلمة المرور غير صحيحة. يرجى التأكد وإعادة المحاولة.") };
			if (apiData.success && apiData.account) {
				const account = apiData.account;
				account.passwordHash = cleanPassword;
				const localUser = accountToUser(account);
				setUser(localUser);
				localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(localUser));
				const local = getLocalAccounts();
				const idx = local.findIndex((l) => l.email.toLowerCase() === normalizedEmail);
				if (idx >= 0) local[idx] = account;
				else local.push(account);
				saveLocalAccounts(local);
				return {
					data: {
						user: localUser,
						session: null
					},
					error: null
				};
			}
		} catch {}
		const found = getLocalAccounts().find((a) => a.email.toLowerCase() === normalizedEmail);
		if (found) {
			if (!found.passwordHash || found.passwordHash !== cleanPassword) return { error: /* @__PURE__ */ new Error("كلمة المرور غير صحيحة. يرجى التأكد والمحاولة مجدداً.") };
			const localUser = accountToUser(found);
			setUser(localUser);
			localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(localUser));
			return {
				data: {
					user: localUser,
					session: null
				},
				error: null
			};
		}
		return { error: /* @__PURE__ */ new Error("بيانات الدخول غير صحيحة أو الحساب غير مسجل بعد.") };
	};
	const signInWithGoogle = async () => {
		if (!isSupabaseConfigured) return { error: /* @__PURE__ */ new Error("خدمة تسجيل الدخول بـ Google قيد الإعداد التقني. يرجى استخدام البريد الإلكتروني للمتابعة.") };
		try {
			const res = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: typeof window !== "undefined" ? window.location.origin : "",
					skipBrowserRedirect: true
				}
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
		if (isSupabaseConfigured) try {
			if (!(await supabase.auth.resetPasswordForEmail(normalizedEmail, { redirectTo: typeof window !== "undefined" ? window.location.origin : "" })).error) return { error: null };
		} catch {}
		return { error: null };
	};
	const verifyPasswordResetOtpAndUpdate = async (email, token, newPassword) => {
		return resetPasswordDirect(email, newPassword);
	};
	const resetPasswordDirect = async (email, newPassword, currentPassword) => {
		const normalizedEmail = email.trim().toLowerCase();
		const cleanPass = newPassword.trim();
		if (!normalizedEmail || !cleanPass) return { error: /* @__PURE__ */ new Error("يرجى إدخال البريد الإلكتروني وكلمة المرور الجديدة.") };
		if (cleanPass.length < 6) return { error: /* @__PURE__ */ new Error("كلمة المرور يجب ألا تقل عن 6 خانات.") };
		try {
			const res = await fetch("/api/auth/reset-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: normalizedEmail,
					newPassword: cleanPass,
					currentPassword
				})
			});
			const data = await res.json();
			if (!res.ok) return { error: new Error(data.error || "فشل تحديث كلمة المرور.") };
		} catch {}
		const accounts = getLocalAccounts();
		const found = accounts.find((a) => a.email.toLowerCase() === normalizedEmail);
		if (found) {
			if (currentPassword && found.passwordHash && found.passwordHash !== currentPassword) return { error: /* @__PURE__ */ new Error("كلمة المرور الحالية غير صحيحة.") };
			found.passwordHash = cleanPass;
			saveLocalAccounts(accounts);
		}
		return { error: null };
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
			resetPasswordDirect,
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
