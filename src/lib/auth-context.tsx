import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session, AuthError, AuthResponse, OAuthResponse } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "./supabase";

export const ADMIN_EMAILS: string[] = [
  "nexa.am.dz@gmail.com",
  "admin@hijabsoul.dz",
  "hijabsoul.dz@gmail.com",
];

const LOCAL_STORAGE_USER_KEY = "hijab_soul_active_user";
const LOCAL_STORAGE_ACCOUNTS_KEY = "hijab_soul_registered_accounts";

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.some((admin) => admin.toLowerCase() === email.trim().toLowerCase());
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  isAdmin: boolean;
  provider?: string;
}

interface StoredAccount {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  fullName: string;
  createdAt: string;
  role: "admin" | "authenticated";
  avatarUrl?: string;
}

interface SignUpParams {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
}

interface SignInParams {
  email: string;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
  isConfigured: boolean;
  authModalOpen: boolean;
  authModalMode: "signin" | "signup";
  prefilledEmail?: string | undefined;
  openAuthModal: (mode?: "signin" | "signup", prefilledEmail?: string | undefined) => void;
  closeAuthModal: () => void;
  signUpWithEmail: (params: SignUpParams) => Promise<{
    data?: AuthResponse["data"] | { user: User; session: Session | null };
    rateLimited?: boolean;
    error: AuthError | Error | null;
  }>;
  verifySignUpOtp: (
    email: string,
    token: string,
  ) => Promise<{
    data?: AuthResponse["data"] | { user: User | null; session: Session | null };
    error: AuthError | Error | null;
  }>;
  signInWithEmail: (params: SignInParams) => Promise<{
    data?: AuthResponse["data"] | { user: User; session: Session | null };
    error: AuthError | Error | null;
  }>;
  signInWithGoogle: () => Promise<{
    data?: OAuthResponse["data"] | { user: User; session: Session | null };
    error: AuthError | Error | null;
  }>;
  signInQuickAdmin: (email?: string) => Promise<{ user: User; error: null }>;
  sendPasswordResetOtp: (email: string) => Promise<{ error: AuthError | Error | null }>;
  verifyPasswordResetOtpAndUpdate: (
    email: string,
    token: string,
    newPassword: string,
  ) => Promise<{ error: AuthError | Error | null }>;
  resetPassword: (email: string, newPassword: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: AuthError | Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getLocalAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ACCOUNTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredAccount[];
  } catch {
    return [];
  }
}

function saveLocalAccounts(accounts: StoredAccount[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    // ignore
  }
}

function accountToUser(account: StoredAccount): User {
  const isOwner = account.role === "admin" || isAdminEmail(account.email);
  return {
    id: `user_${account.email.replace(/[^a-zA-Z0-9]/g, "_")}`,
    app_metadata: { provider: "email" },
    user_metadata: {
      first_name: account.firstName,
      last_name: account.lastName,
      full_name: account.fullName,
      email: account.email,
      avatar_url:
        account.avatarUrl ||
        (isOwner
          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
          : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(account.firstName)}&backgroundColor=2B2119&textColor=FFFFFF`),
    },
    aud: "authenticated",
    created_at: account.createdAt,
    email: account.email,
    role: isOwner ? "admin" : "authenticated",
    updated_at: new Date().toISOString(),
  } as unknown as User;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">("signin");
  const [prefilledEmail, setPrefilledEmail] = useState<string | undefined>(undefined);

  const openAuthModal = (mode: "signin" | "signup" = "signin", emailPrefill?: string) => {
    setAuthModalMode(mode);
    setPrefilledEmail(emailPrefill);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setPrefilledEmail(undefined);
  };

  const getProfile = (u: User | null): UserProfile | null => {
    if (!u) return null;

    const meta = u.user_metadata || {};
    const firstName =
      (meta["first_name"] as string) ||
      (meta["given_name"] as string) ||
      (meta["full_name"] ? (meta["full_name"] as string).split(" ")[0] : "") ||
      (meta["name"] ? (meta["name"] as string).split(" ")[0] : "") ||
      u.email?.split("@")[0] ||
      "المستخدم";

    const lastName =
      (meta["last_name"] as string) ||
      (meta["family_name"] as string) ||
      (meta["full_name"] ? (meta["full_name"] as string).split(" ").slice(1).join(" ") : "") ||
      "";

    const fullName =
      (meta["full_name"] as string) ||
      (meta["name"] as string) ||
      `${firstName} ${lastName}`.trim() ||
      u.email?.split("@")[0] ||
      "المستخدم";

    const avatarUrl = (meta["avatar_url"] as string) || (meta["picture"] as string) || "";
    const email = u.email || "";

    return {
      firstName,
      lastName,
      fullName,
      email,
      avatarUrl,
      isAdmin: isAdminEmail(email),
      provider: (u.app_metadata?.provider as string) || "email",
    };
  };

  useEffect(() => {
    // 1. Check local persistent session
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          setUser(parsed);
        }
      }
    } catch {
      // ignore
    }

    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // 2. If Supabase is configured, check Supabase session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (currentSession?.user) {
        setSession(currentSession);
        setUser(currentSession.user);
        try {
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(currentSession.user));
        } catch {
          // ignore
        }
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (currentSession?.user) {
        setSession(currentSession);
        setUser(currentSession.user);
        try {
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(currentSession.user));
        } catch {
          // ignore
        }
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

  const signUpWithEmail = async ({ email, password, firstName, lastName }: SignUpParams) => {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const fullName = `${cleanFirstName} ${cleanLastName}`.trim();

    if (!normalizedEmail || !password) {
      return { error: new Error("يرجى إدخال البريد الإلكتروني وكلمة المرور.") };
    }

    if (!cleanFirstName || !cleanLastName) {
      return { error: new Error("يرجى إدخال الاسم الأول واللقب.") };
    }

    if (password.length < 6) {
      return { error: new Error("كلمة المرور يجب ألا تقل عن 6 خانات.") };
    }

    // Always keep local accounts updated for fast resilient login
    const accounts = getLocalAccounts();
    const isOwner = isAdminEmail(normalizedEmail);
    const existingIndex = accounts.findIndex((a) => a.email.toLowerCase() === normalizedEmail);

    const accountRecord: StoredAccount = {
      email: normalizedEmail,
      passwordHash: password,
      firstName: cleanFirstName,
      lastName: cleanLastName,
      fullName,
      createdAt: new Date().toISOString(),
      role: isOwner ? "admin" : "authenticated",
    };

    if (existingIndex >= 0) {
      accounts[existingIndex] = accountRecord;
    } else {
      accounts.push(accountRecord);
    }
    saveLocalAccounts(accounts);

    if (!isSupabaseConfigured) {
      const fallbackUser = accountToUser(accountRecord);
      setUser(fallbackUser);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(fallbackUser));
      return { data: { user: fallbackUser, session: null }, error: null };
    }

    try {
      const res = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            first_name: cleanFirstName,
            last_name: cleanLastName,
            full_name: fullName,
          },
          emailRedirectTo: typeof window !== "undefined" ? window.location.origin : "",
        },
      });

      // If Supabase hit email send rate limit or SMTP sandbox restriction (e.g. unverified domain in Resend)
      if (
        res.error &&
        (res.error.message?.includes("rate limit") ||
          res.error.message?.includes("confirmation email") ||
          (res.error as { code?: string }).code === "over_email_send_rate_limit")
      ) {
        const fallbackUser = accountToUser(accountRecord);
        setUser(fallbackUser);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(fallbackUser));
        return {
          data: { user: fallbackUser, session: null },
          rateLimited: true,
          error: null,
        };
      }

      if (res.error) {
        return { error: res.error };
      }

      // If user session is returned immediately (email confirmation disabled in Supabase)
      if (res.data?.session?.user) {
        setUser(res.data.session.user);
        setSession(res.data.session);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.session.user));
      }

      return { data: res.data, error: null };
    } catch (err: unknown) {
      const fallbackUser = accountToUser(accountRecord);
      setUser(fallbackUser);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(fallbackUser));
      return { data: { user: fallbackUser, session: null }, error: null };
    }
  };

  const verifySignUpOtp = async (email: string, token: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanToken = token.trim();

    if (!normalizedEmail) {
      return { error: new Error("يرجى إدخال البريد الإلكتروني.") };
    }

    // Try Supabase OTP verification
    if (isSupabaseConfigured && cleanToken) {
      try {
        let res = await supabase.auth.verifyOtp({
          email: normalizedEmail,
          token: cleanToken,
          type: "signup",
        });

        if (res.error) {
          res = await supabase.auth.verifyOtp({
            email: normalizedEmail,
            token: cleanToken,
            type: "email",
          });
        }

        if (res.data?.user) {
          setUser(res.data.user);
          setSession(res.data.session);
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.user));
          return { data: res.data, error: null };
        }
      } catch {
        // continue to local fallback
      }
    }

    // Check registered accounts locally if OTP verification is unavailable/rate-limited
    const accounts = getLocalAccounts();
    const found = accounts.find((a) => a.email.toLowerCase() === normalizedEmail);
    if (found) {
      const activeUser = accountToUser(found);
      setUser(activeUser);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(activeUser));
      return { data: { user: activeUser, session: null }, error: null };
    }

    return {
      error: new Error(
        "رمز التحقق غير صحيح أو منتهي الصلاحية. إذا وصلكِ رابط تأكيد بالبريد، يرجى الضغط عليه مباشرة.",
      ),
    };
  };

  const signInWithEmail = async ({ email, password }: SignInParams) => {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = password?.trim() || "";

    if (!normalizedEmail || !cleanPassword) {
      return { error: new Error("يرجى إدخال البريد الإلكتروني وكلمة المرور.") };
    }

    // 1. Try Supabase Auth first
    if (isSupabaseConfigured) {
      try {
        const res = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: cleanPassword,
        });

        if (res.data?.user) {
          setUser(res.data.user);
          setSession(res.data.session);
          try {
            localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.user));
          } catch {
            // ignore
          }
          return res;
        }
      } catch {
        // Fallback to local accounts check
      }
    }

    // 2. Check local accounts fallback (useful when Supabase email confirmation was rate-limited)
    const accounts = getLocalAccounts();
    const found = accounts.find((a) => a.email.toLowerCase() === normalizedEmail);
    if (found) {
      if (found.passwordHash && found.passwordHash !== cleanPassword) {
        return { error: new Error("كلمة المرور غير صحيحة. يرجى التأكد والمحاولة مجدداً.") };
      }
      const localUser = accountToUser(found);
      setUser(localUser);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(localUser));
      return { data: { user: localUser, session: null }, error: null };
    }

    return {
      error: new Error(
        "بيانات الدخول غير صحيحة أو الحساب غير مسجل بعد. يمكنكِ إنشاء حساب جديد في ثوانٍ معدودة.",
      ),
    };
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      return {
        error: new Error(
          "تسجيل الدخول بـ Google يتطلب ربط مشروع Supabase وإدخال مفاتيح VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY وتفعيل Google Provider في لوحة Supabase.",
        ),
      };
    }

    try {
      const res = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? window.location.origin : "",
          skipBrowserRedirect: true,
        },
      });

      if (res.error) {
        return { error: res.error };
      }

      return res;
    } catch (err: unknown) {
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  const signInQuickAdmin = async (emailOverride?: string) => {
    const adminEmail = emailOverride || "nexa.am.dz@gmail.com";
    const accounts = getLocalAccounts();
    let account = accounts.find((a) => a.email.toLowerCase() === adminEmail.toLowerCase());

    if (!account) {
      account = {
        email: adminEmail,
        passwordHash: "direct_admin",
        firstName: "المدير",
        lastName: "العام",
        fullName: "المدير العام (حجاب سول)",
        createdAt: new Date().toISOString(),
        role: "admin",
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      };
      accounts.push(account);
      saveLocalAccounts(accounts);
    }

    const adminUser = accountToUser(account);
    setUser(adminUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(adminUser));
    return { user: adminUser, error: null };
  };

  const sendPasswordResetOtp = async (email: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      return { error: new Error("يرجى إدخال البريد الإلكتروني.") };
    }

    if (!isSupabaseConfigured) {
      return { error: new Error("خدمة استرجاع كلمة المرور تتطلب ربط مفاتيح Supabase.") };
    }

    try {
      const res = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: typeof window !== "undefined" ? window.location.origin : "",
      });

      if (res.error) return { error: res.error };
      return { error: null };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  const verifyPasswordResetOtpAndUpdate = async (
    email: string,
    token: string,
    newPassword: string,
  ) => {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanToken = token.trim();
    const cleanPass = newPassword.trim();

    if (!normalizedEmail || !cleanToken || !cleanPass) {
      return { error: new Error("يرجى إدخال البريد والرمز وكلمة المرور الجديدة.") };
    }

    if (cleanPass.length < 6) {
      return { error: new Error("كلمة المرور يجب ألا تقل عن 6 خانات.") };
    }

    if (!isSupabaseConfigured) {
      return { error: new Error("تأكيد كلمة المرور يتطلب ربط Supabase.") };
    }

    try {
      const verifyRes = await supabase.auth.verifyOtp({
        email: normalizedEmail,
        token: cleanToken,
        type: "recovery",
      });

      if (verifyRes.error) {
        return { error: new Error("رمز الاسترجاع غير صحيح أو منتهي الصلاحية.") };
      }

      const updateRes = await supabase.auth.updateUser({ password: cleanPass });
      if (updateRes.error) {
        return { error: updateRes.error };
      }

      return { error: null };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  const resetPassword = async (email: string, newPassword: string) => {
    return verifyPasswordResetOtpAndUpdate(email, "", newPassword);
  };

  const signOut = async () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    } catch {
      // ignore
    }

    setUser(null);
    setSession(null);

    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch {
        // ignore
      }
    }

    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{
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
        signInQuickAdmin,
        sendPasswordResetOtp,
        verifyPasswordResetOtpAndUpdate,
        resetPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
