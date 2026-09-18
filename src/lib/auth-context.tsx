import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session, AuthError, AuthResponse, OAuthResponse } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "./supabase";

export interface UserProfile {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
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
  loading: boolean;
  isConfigured: boolean;
  authModalOpen: boolean;
  authModalMode: "signin" | "signup";
  openAuthModal: (mode?: "signin" | "signup") => void;
  closeAuthModal: () => void;
  signUpWithEmail: (
    params: SignUpParams,
  ) => Promise<{ data?: AuthResponse["data"]; error: AuthError | Error | null }>;
  signInWithEmail: (
    params: SignInParams,
  ) => Promise<{ data?: AuthResponse["data"]; error: AuthError | Error | null }>;
  signInWithGoogle: () => Promise<{
    data?: OAuthResponse["data"];
    error: AuthError | Error | null;
  }>;
  signOut: () => Promise<{ error: AuthError | Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">("signin");

  const openAuthModal = (mode: "signin" | "signup" = "signin") => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  // Extract friendly profile from user metadata or Google identity
  const getProfile = (u: User | null): UserProfile | null => {
    if (!u) return null;

    const meta = u.user_metadata || {};
    const firstName =
      (meta.first_name as string) ||
      (meta.given_name as string) ||
      (meta.full_name ? (meta.full_name as string).split(" ")[0] : "") ||
      (meta.name ? (meta.name as string).split(" ")[0] : "") ||
      u.email?.split("@")[0] ||
      "المستخدم";

    const lastName =
      (meta.last_name as string) ||
      (meta.family_name as string) ||
      (meta.full_name ? (meta.full_name as string).split(" ").slice(1).join(" ") : "") ||
      "";

    const fullName =
      (meta.full_name as string) ||
      (meta.name as string) ||
      `${firstName} ${lastName}`.trim() ||
      u.email?.split("@")[0] ||
      "المستخدم";

    const avatarUrl = (meta.avatar_url as string) || (meta.picture as string) || "";

    return {
      firstName,
      lastName,
      fullName,
      email: u.email || "",
      avatarUrl,
    };
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Initial session check
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUpWithEmail = async ({ email, password, firstName, lastName }: SignUpParams) => {
    if (!isSupabaseConfigured) {
      return {
        error: new Error(
          "مفاتيح Supabase غير مهيأة بعد. يرجى إضافة VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY",
        ),
      };
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    try {
      if (password) {
        const res = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              first_name: firstName.trim(),
              last_name: lastName.trim(),
              full_name: fullName,
            },
          },
        });
        return res;
      } else {
        const res = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: {
            data: {
              first_name: firstName.trim(),
              last_name: lastName.trim(),
              full_name: fullName,
            },
          },
        });
        return res;
      }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  const signInWithEmail = async ({ email, password }: SignInParams) => {
    if (!isSupabaseConfigured) {
      return {
        error: new Error(
          "مفاتيح Supabase غير مهيأة بعد. يرجى إضافة VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY",
        ),
      };
    }

    try {
      if (password) {
        const res = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        return res;
      } else {
        const res = await supabase.auth.signInWithOtp({
          email: email.trim(),
        });
        return res;
      }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      return {
        error: new Error(
          "مفاتيح Supabase غير مهيأة بعد. يرجى إضافة VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY",
        ),
      };
    }

    try {
      const res = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      return res;
    } catch (err: unknown) {
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
      const res = await supabase.auth.signOut();
      return res;
    } catch (err: unknown) {
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  return (
    <AuthContext.Provider
      value={{
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
