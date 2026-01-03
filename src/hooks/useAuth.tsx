import { createContext, useContext, useEffect, useState, useRef, ReactNode } from "react";
import type { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Profile } from "@/types/auth";
import { ROUTES } from "@/constants/routes";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signInWithProvider: (provider: "google" | "facebook" | "apple") => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchingProfileRef = useRef<string | null>(null);

  const fetchProfile = async (userId: string) => {
    // Prevent duplicate fetches for the same user
    if (fetchingProfileRef.current === userId) {
      return;
    }

    fetchingProfileRef.current = userId;
    
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
        return;
      }

      if (data) {
        setProfile(data);
      }
    } finally {
      // Clear ref only if we're still fetching the same user
      if (fetchingProfileRef.current === userId) {
        fetchingProfileRef.current = null;
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    // Safety timeout - force loading to false after 5 seconds
    const timeoutId = setTimeout(() => {
      if (mounted && loading) {
        console.warn("Auth loading timeout - forcing completion");
        setLoading(false);
      }
    }, 5000);

    // Set up auth state listener - callback must be synchronous
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Defer profile fetch to avoid deadlock
          setTimeout(() => {
            if (mounted) {
              fetchProfile(session.user.id);
            }
          }, 0);
        } else {
          setProfile(null);
          fetchingProfileRef.current = null;
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Defer profile fetch to avoid deadlock
        setTimeout(() => {
          if (mounted) {
            fetchProfile(session.user.id).finally(() => {
              if (mounted) setLoading(false);
            });
          }
        }, 0);
      } else {
        setLoading(false);
      }
    }).catch(() => {
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string): Promise<{ error: AuthError | null }> => {
    const redirectUrl = `${window.location.origin}${ROUTES.HOME}`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });
    return { error };
  };

  const signIn = async (email: string, password: string): Promise<{ error: AuthError | null }> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signInWithProvider = async (provider: "google" | "facebook" | "apple"): Promise<{ error: AuthError | null }> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}${ROUTES.DASHBOARD}`,
      },
    });
    return { error };
  };

  const signOut = async (): Promise<void> => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    fetchingProfileRef.current = null;
  };

  const updateProfile = async (updates: Partial<Profile>): Promise<{ error: Error | null }> => {
    if (!user) {
      return { error: new Error("No user logged in") };
    }

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("user_id", user.id);

    if (!error) {
      setProfile((prev) => prev ? { ...prev, ...updates } : null);
    }
    
    return { error: error ? new Error(error.message) : null };
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signUp,
        signIn,
        signInWithProvider,
        signOut,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
