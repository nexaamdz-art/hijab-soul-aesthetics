import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session, AuthError, AuthResponse, OAuthResponse } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "./supabase";

export const ADMIN_EMAILS: string[] = [];

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
  signUpWithEmail: (
    params: SignUpParams,
  ) => Promise<{ data?: AuthResponse["data"] | { user: User; session: Session | null }; error: AuthError | Error | null }>;
  signInWithEmail: (
    params: SignInParams,
  ) => Promise<{ data?: AuthResponse["data"] | { user: User; session: Session | null }; error: AuthError | Error | null }>;
  signInWithGoogle: (options?: {
    email?: string;
    fullName?: string;
    avatarUrl?: string;
  }) => Promise<{
    data?: OAuthResponse["data"] | { user: User; session: Session | null };
    error: AuthError | Error | null;
  }>;
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
      avatar_url: account.avatarUrl || (isOwner
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

    // Save locally
    const accounts = getLocalAccounts();
    const existingIndex = accounts.findIndex((a) => a.email.toLowerCase() === normalizedEmail);

    if (existingIndex >= 0) {
      return {
        error: new Error("هذا البريد الإلكتروني مسجل بالفعل! يرجى تسجيل الدخول بدلاً من ذلك."),
      };
    }

    const isOwner = isAdminEmail(normalizedEmail);
    const newAccount: StoredAccount = {
      email: normalizedEmail,
      passwordHash: password, // Stored for local verification
      firstName: cleanFirstName,
      lastName: cleanLastName,
      fullName,
      createdAt: new Date().toISOString(),
      role: isOwner ? "admin" : "authenticated",
    };

    accounts.push(newAccount);
    saveLocalAccounts(accounts);

    const newUser = accountToUser(newAccount);
    setUser(newUser);
    try {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUser));
    } catch {
      // ignore
    }

    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: {
              first_name: cleanFirstName,
              last_name: cleanLastName,
              full_name: fullName,
            },
          },
        });
      } catch {
        // Fallback to local accounts
      }
    }

    return { data: { user: newUser, session: null }, error: null };
  };

  const signInWithEmail = async ({ email, password }: SignInParams) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return { error: new Error("يرجى إدخال البريد الإلكتروني وكلمة المرور.") };
    }

    const accounts = getLocalAccounts();
    const found = accounts.find((a) => a.email.toLowerCase() === normalizedEmail);

    if (!found) {
      // If Supabase is configured, try Supabase first
      if (isSupabaseConfigured) {
        try {
          const res = await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password,
          });
          if (res.data?.user) {
            setUser(res.data.user);
            localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.user));
            return res;
          }
          if (res.error) {
            return { error: new Error("بيانات الدخول غير صحيحة أو الحساب غير موجود.") };
          }
        } catch (err: unknown) {
          return { error: err instanceof Error ? err : new Error(String(err)) };
        }
      }

      return {
        error: new Error("لم يتم العثور على حساب بهذا البريد الإلكتروني. يرجى إنشاء حساب جديد أولاً."),
      };
    }

    // Verify password
    if (found.passwordHash !== password) {
      return {
        error: new Error("كلمة المرور غير صحيحة. يرجى التأكد من كلمة المرور والمحاولة مجدداً."),
      };
    }

    const authenticatedUser = accountToUser(found);
    setUser(authenticatedUser);
    try {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(authenticatedUser));
    } catch {
      // ignore
    }

    return { data: { user: authenticatedUser, session: null }, error: null };
  };

  const signInWithGoogle = async (options?: {
    email?: string;
    fullName?: string;
    avatarUrl?: string;
  }) => {
    // If Supabase is fully configured and in a normal browser environment
    if (isSupabaseConfigured && !options?.email) {
      try {
        const res = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: typeof window !== "undefined" ? window.location.origin : "",
          },
        });
        if (!res.error) return res;
      } catch {
        // Fallback to local Google session
      }
    }

    // Google profile resolution
    const emailToUse = (options?.email || "user@gmail.com").trim();
    const isOwner = isAdminEmail(emailToUse);
    const nameToUse =
      options?.fullName?.trim() ||
      (isOwner ? "المدير العام" : emailToUse.split("@")[0] || "مستخدم Google");

    const nameParts = nameToUse.split(" ");
    const firstName = nameParts[0] || "مستخدم";
    const lastName = nameParts.slice(1).join(" ") || "Google";
    const avatar =
      options?.avatarUrl ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(firstName)}&backgroundColor=2B2119&textColor=FFFFFF`;

    const googleUser: User = {
      id: `google_${emailToUse.replace(/[^a-zA-Z0-9]/g, "_")}`,
      app_metadata: { provider: "google" },
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        full_name: nameToUse,
        avatar_url: avatar,
      },
      aud: "authenticated",
      created_at: new Date().toISOString(),
      email: emailToUse,
      role: isOwner ? "admin" : "authenticated",
    };

    // Store in registered accounts list
    const accounts = getLocalAccounts();
    const existingIndex = accounts.findIndex(
      (a) => a.email.toLowerCase() === emailToUse.toLowerCase(),
    );
    if (existingIndex >= 0) {
      accounts[existingIndex] = {
        ...accounts[existingIndex],
        fullName: nameToUse,
        avatarUrl: avatar,
      };
    } else {
      accounts.push({
        email: emailToUse,
        passwordHash: "google_oauth_verified",
        firstName,
        lastName,
        fullName: nameToUse,
        createdAt: new Date().toISOString(),
        role: "authenticated",
        avatarUrl: avatar,
      });
    }
    saveLocalAccounts(accounts);

    setUser(googleUser);
    try {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(googleUser));
    } catch {
      // ignore
    }

    return { data: { user: googleUser, session: null }, error: null };
  };

  const resetPassword = async (email: string, newPassword: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPass = newPassword.trim();
    if (!normalizedEmail || !cleanPass) {
      return { error: new Error("يرجى إدخال البريد الإلكتروني وكلمة المرور الجديدة.") };
    }
    if (cleanPass.length < 6) {
      return { error: new Error("كلمة المرور يجب ألا تقل عن 6 خانات.") };
    }

    const accounts = getLocalAccounts();
    const index = accounts.findIndex((a) => a.email.toLowerCase() === normalizedEmail);

    if (index >= 0) {
      accounts[index].passwordHash = cleanPass;
      saveLocalAccounts(accounts);
      return { error: null };
    }

    // Create or update account locally
    accounts.push({
      email: normalizedEmail,
      passwordHash: cleanPass,
      firstName: normalizedEmail.split("@")[0] || "زبون",
      lastName: "حجاب سول",
      fullName: normalizedEmail.split("@")[0] || "زبون",
      createdAt: new Date().toISOString(),
      role: "authenticated",
    });
    saveLocalAccounts(accounts);
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
        signInWithEmail,
        signInWithGoogle,
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
