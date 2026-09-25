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

export interface StoredAccount {
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

export interface SignUpResult {
  data?: AuthResponse["data"] | { user: User; session: Session | null };
  alreadyRegistered?: boolean;
  rateLimited?: boolean;
  error: AuthError | Error | null;
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
  signUpWithEmail: (params: SignUpParams) => Promise<SignUpResult>;
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
  sendPasswordResetOtp: (email: string) => Promise<{ error: AuthError | Error | null }>;
  verifyPasswordResetOtpAndUpdate: (
    email: string,
    token: string,
    newPassword: string,
  ) => Promise<{ error: AuthError | Error | null }>;
  resetPasswordDirect: (
    email: string,
    newPassword: string,
    currentPassword?: string,
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: AuthError | Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getLocalAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ACCOUNTS_KEY);
    if (!raw) return [];
    const accounts = JSON.parse(raw) as StoredAccount[];
    // Security: Filter out any accounts with insecure default passwords
    return accounts.filter((a) => a.passwordHash !== "admin123456");
  } catch {
    return [];
  }
}

function saveLocalAccounts(accounts: StoredAccount[]): void {
  try {
    const sanitized = accounts.filter((a) => a.passwordHash !== "admin123456");
    localStorage.setItem(LOCAL_STORAGE_ACCOUNTS_KEY, JSON.stringify(sanitized));
  } catch {
    // ignore
  }
}

function accountToUser(account: StoredAccount): User {
  // STRICT SECURITY: An account is ONLY an admin if their email is in the authorized ADMIN_EMAILS list!
  const isOwner = isAdminEmail(account.email);
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

  const signUpWithEmail = async ({
    email,
    password,
    firstName,
    lastName,
  }: SignUpParams): Promise<SignUpResult> => {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanPassword = password?.trim() || "";
    const fullName = `${cleanFirstName} ${cleanLastName}`.trim();

    if (!normalizedEmail || !cleanPassword) {
      return { error: new Error("يرجى إدخال البريد الإلكتروني وكلمة المرور.") };
    }

    if (!cleanFirstName || !cleanLastName) {
      return { error: new Error("يرجى إدخال الاسم الأول واللقب.") };
    }

    if (cleanPassword.length < 6) {
      return { error: new Error("كلمة المرور يجب ألا تقل عن 6 خانات.") };
    }

    // Security check: Strictly block registering admin emails via public form
    const isOwner = isAdminEmail(normalizedEmail);
    if (isOwner) {
      return {
        alreadyRegistered: true,
        error: new Error(
          "هذا البريد الإلكتروني محجوز لإدارة المتجر ولا يمكن تسجيله كحساب زبون جديد. يرجى تسجيل الدخول مباشرة بكلمة المرور الخاصة بك.",
        ),
      };
    }

    const existingAccounts = getLocalAccounts();
    const alreadyExistsLocally = existingAccounts.some(
      (a) => a.email.toLowerCase() === normalizedEmail,
    );

    if (alreadyExistsLocally) {
      // Must log in with password
      return {
        alreadyRegistered: true,
        error: new Error("هذا الحساب مسجل مسبقاً. يرجى تسجيل الدخول بكلمة المرور."),
      };
    }

    // Try server registration first
    try {
      const apiRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          password: cleanPassword,
          firstName: cleanFirstName,
          lastName: cleanLastName,
        }),
      });
      const apiData = await apiRes.json();
      if (!apiRes.ok) {
        if (apiData.code === "user_already_exists") {
          return {
            alreadyRegistered: true,
            error: new Error("هذا الحساب مسجل مسبقاً. يرجى تسجيل الدخول بكلمة المرور."),
          };
        }
        return { error: new Error(apiData.error || "فشل إنشاء الحساب.") };
      }
    } catch {
      // continue to local and Supabase
    }

    const accountRecord: StoredAccount = {
      email: normalizedEmail,
      passwordHash: cleanPassword,
      firstName: cleanFirstName,
      lastName: cleanLastName,
      fullName,
      createdAt: new Date().toISOString(),
      role: "authenticated",
    };

    // Save locally
    existingAccounts.push(accountRecord);
    saveLocalAccounts(existingAccounts);

    const fallbackUser = accountToUser(accountRecord);

    if (!isSupabaseConfigured) {
      setUser(fallbackUser);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(fallbackUser));
      return { data: { user: fallbackUser, session: null }, error: null };
    }

    try {
      const res = await supabase.auth.signUp({
        email: normalizedEmail,
        password: cleanPassword,
        options: {
          data: {
            first_name: cleanFirstName,
            last_name: cleanLastName,
            full_name: fullName,
          },
          emailRedirectTo: typeof window !== "undefined" ? window.location.origin : "",
        },
      });

      if (res.data?.user && (!res.data.user.identities || res.data.user.identities.length === 0)) {
        return {
          alreadyRegistered: true,
          error: new Error("هذا الحساب مسجل مسبقاً. يرجى تسجيل الدخول بكلمة المرور."),
        };
      }

      if (res.data?.session?.user) {
        setUser(res.data.session.user);
        setSession(res.data.session);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.session.user));
        return { data: res.data, error: null };
      }

      // Automatically log in without waiting for broken SMTP
      setUser(fallbackUser);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(fallbackUser));
      return { data: { user: fallbackUser, session: null }, error: null };
    } catch {
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
        // continue
      }
    }

    const accounts = getLocalAccounts();
    const found = accounts.find((a) => a.email.toLowerCase() === normalizedEmail);
    if (found) {
      const activeUser = accountToUser(found);
      setUser(activeUser);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(activeUser));
      return { data: { user: activeUser, session: null }, error: null };
    }

    return { error: new Error("رمز التحقق غير صحيح أو منتهي الصلاحية.") };
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
        // Fallback to server verification
      }
    }

    // 2. Strict Server Auth Verification (/api/auth/login)
    try {
      const apiRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password: cleanPassword }),
      });
      const apiData = await apiRes.json();

      if (apiRes.status === 401) {
        return {
          error: new Error(apiData.error || "كلمة المرور غير صحيحة. يرجى التأكد وإعادة المحاولة."),
        };
      }

      if (apiData.success && apiData.account) {
        const account = apiData.account as StoredAccount;
        account.passwordHash = cleanPassword;
        const localUser = accountToUser(account);
        setUser(localUser);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(localUser));

        // update local cache
        const local = getLocalAccounts();
        const idx = local.findIndex((l) => l.email.toLowerCase() === normalizedEmail);
        if (idx >= 0) local[idx] = account;
        else local.push(account);
        saveLocalAccounts(local);

        return { data: { user: localUser, session: null }, error: null };
      }
    } catch {
      // Server unreachable, fallback to verified local account
    }

    // 3. Strict Local Accounts Verification (Requires EXACT password match)
    const accounts = getLocalAccounts();
    const found = accounts.find((a) => a.email.toLowerCase() === normalizedEmail);
    if (found) {
      if (!found.passwordHash || found.passwordHash !== cleanPassword) {
        return { error: new Error("كلمة المرور غير صحيحة. يرجى التأكد والمحاولة مجدداً.") };
      }
      const localUser = accountToUser(found);
      setUser(localUser);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(localUser));
      return { data: { user: localUser, session: null }, error: null };
    }

    return {
      error: new Error("بيانات الدخول غير صحيحة أو الحساب غير مسجل بعد."),
    };
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      return {
        error: new Error(
          "خدمة تسجيل الدخول بـ Google قيد الإعداد التقني. يرجى استخدام البريد الإلكتروني للمتابعة.",
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

  const sendPasswordResetOtp = async (email: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      return { error: new Error("يرجى إدخال البريد الإلكتروني.") };
    }

    if (isSupabaseConfigured) {
      try {
        const res = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
          redirectTo: typeof window !== "undefined" ? window.location.origin : "",
        });
        if (!res.error) return { error: null };
      } catch {
        // continue
      }
    }

    return { error: null };
  };

  const verifyPasswordResetOtpAndUpdate = async (
    email: string,
    token: string,
    newPassword: string,
  ) => {
    return resetPasswordDirect(email, newPassword);
  };

  const resetPasswordDirect = async (
    email: string,
    newPassword: string,
    currentPassword?: string,
  ) => {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPass = newPassword.trim();

    if (!normalizedEmail || !cleanPass) {
      return { error: new Error("يرجى إدخال البريد الإلكتروني وكلمة المرور الجديدة.") };
    }

    if (cleanPass.length < 6) {
      return { error: new Error("كلمة المرور يجب ألا تقل عن 6 خانات.") };
    }

    // Security: Require currentPassword to prevent unauthorized takeover
    if (!currentPassword) {
      return {
        error: new Error("كلمة المرور الحالية مطلوبة لتأكيد هويتك وتحديث كلمة المرور بأمان."),
      };
    }

    // Call server to securely verify and update password
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          newPassword: cleanPass,
          currentPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: new Error(data.error || "فشل تحديث كلمة المرور.") };
      }
    } catch {
      // offline fallback
    }

    // Update locally if found and verified
    const accounts = getLocalAccounts();
    const found = accounts.find((a) => a.email.toLowerCase() === normalizedEmail);
    if (found) {
      if (found.passwordHash && found.passwordHash !== currentPassword) {
        return { error: new Error("كلمة المرور الحالية غير صحيحة.") };
      }
      found.passwordHash = cleanPass;
      saveLocalAccounts(accounts);
    }

    return { error: null };
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
        sendPasswordResetOtp,
        verifyPasswordResetOtpAndUpdate,
        resetPasswordDirect,
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
