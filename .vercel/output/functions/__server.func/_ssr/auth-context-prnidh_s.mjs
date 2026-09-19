import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-context-prnidh_s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var supabaseUrl = "https://xiytavyvffzaxxygctbs.supabase.co";
var supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpeXRhdnl2ZmZ6YXh4eWdjdGJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4NDc4ODgsImV4cCI6MjEwNTQyMzg4OH0.P4nZA9VApWxNOkd5Yer9Ir3eoYLVAg3PReKHBwCm5_A";
/**
* Checks if Supabase credentials have been properly set by the user.
*/
var isSupabaseConfigured = Boolean(supabaseUrl.startsWith("http"));
/**
* Supabase client instance.
* Safe fallback client if credentials are not yet configured.
*/
var supabase = createClient(isSupabaseConfigured ? supabaseUrl : "https://placeholder-project.supabase.co", isSupabaseConfigured ? supabaseAnonKey : "placeholder-anon-key", { auth: {
	persistSession: true,
	autoRefreshToken: true,
	detectSessionInUrl: true
} });
var _jsxFileName = "/app/applet/src/lib/auth-context.tsx";
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [authModalOpen, setAuthModalOpen] = (0, import_react.useState)(false);
	const [authModalMode, setAuthModalMode] = (0, import_react.useState)("signin");
	const openAuthModal = (mode = "signin") => {
		setAuthModalMode(mode);
		setAuthModalOpen(true);
	};
	const closeAuthModal = () => {
		setAuthModalOpen(false);
	};
	const getProfile = (u) => {
		if (!u) return null;
		const meta = u.user_metadata || {};
		const firstName = meta.first_name || meta.given_name || (meta.full_name ? meta.full_name.split(" ")[0] : "") || (meta.name ? meta.name.split(" ")[0] : "") || u.email?.split("@")[0] || "المستخدم";
		const lastName = meta.last_name || meta.family_name || (meta.full_name ? meta.full_name.split(" ").slice(1).join(" ") : "") || "";
		const fullName = meta.full_name || meta.name || `${firstName} ${lastName}`.trim() || u.email?.split("@")[0] || "المستخدم";
		const avatarUrl = meta.avatar_url || meta.picture || "";
		return {
			firstName,
			lastName,
			fullName,
			email: u.email || "",
			avatarUrl
		};
	};
	(0, import_react.useEffect)(() => {
		if (!isSupabaseConfigured) {
			setLoading(false);
			return;
		}
		supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
			setSession(currentSession);
			setUser(currentSession?.user ?? null);
			setLoading(false);
		});
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
			setSession(currentSession);
			setUser(currentSession?.user ?? null);
			setLoading(false);
		});
		return () => {
			subscription.unsubscribe();
		};
	}, []);
	const signUpWithEmail = async ({ email, password, firstName, lastName }) => {
		if (!isSupabaseConfigured) return { error: /* @__PURE__ */ new Error("مفاتيح Supabase غير مهيأة بعد. يرجى إضافة VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY") };
		const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
		try {
			if (password) return await supabase.auth.signUp({
				email: email.trim(),
				password,
				options: { data: {
					first_name: firstName.trim(),
					last_name: lastName.trim(),
					full_name: fullName
				} }
			});
			else return await supabase.auth.signInWithOtp({
				email: email.trim(),
				options: { data: {
					first_name: firstName.trim(),
					last_name: lastName.trim(),
					full_name: fullName
				} }
			});
		} catch (err) {
			return { error: err instanceof Error ? err : new Error(String(err)) };
		}
	};
	const signInWithEmail = async ({ email, password }) => {
		if (!isSupabaseConfigured) return { error: /* @__PURE__ */ new Error("مفاتيح Supabase غير مهيأة بعد. يرجى إضافة VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY") };
		try {
			if (password) return await supabase.auth.signInWithPassword({
				email: email.trim(),
				password
			});
			else return await supabase.auth.signInWithOtp({ email: email.trim() });
		} catch (err) {
			return { error: err instanceof Error ? err : new Error(String(err)) };
		}
	};
	const signInWithGoogle = async () => {
		if (!isSupabaseConfigured) return { error: /* @__PURE__ */ new Error("مفاتيح Supabase غير مهيأة بعد. يرجى إضافة VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY") };
		try {
			return await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: typeof window !== "undefined" ? window.location.origin : void 0,
					queryParams: {
						access_type: "offline",
						prompt: "consent"
					}
				}
			});
		} catch (err) {
			return { error: err instanceof Error ? err : new Error(String(err)) };
		}
	};
	const signOut = async () => {
		if (!isSupabaseConfigured) {
			setUser(null);
			setSession(null);
			return { error: null };
		}
		try {
			return await supabase.auth.signOut();
		} catch (err) {
			return { error: err instanceof Error ? err : new Error(String(err)) };
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthContext.Provider, {
		value: {
			user,
			session,
			profile: getProfile(user),
			loading,
			isConfigured: isSupabaseConfigured,
			authModalOpen,
			authModalMode,
			openAuthModal,
			closeAuthModal,
			signUpWithEmail,
			signInWithEmail,
			signInWithGoogle,
			signOut
		},
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 242,
		columnNumber: 5
	}, this);
}
function useAuth() {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
}
//#endregion
export { useAuth as n, AuthProvider as t };
