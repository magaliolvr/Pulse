import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";

export function SocialLoginButtons() {
  const { signInWithProvider } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleSocialLogin = async (provider: "google" | "apple") => {
    setLoading(provider);
    const { error } = await signInWithProvider(provider);
    if (error) {
      toast({
        title: t.auth.errors.socialLoginFailed,
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(null);
  };

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full h-12 gap-3"
        onClick={() => handleSocialLogin("google")}
        disabled={loading !== null}
      >
        {loading === "google" ? (
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
        )}
        Google
      </Button>

      <Button
        variant="outline"
        className="w-full h-12 gap-3"
        onClick={() => handleSocialLogin("apple")}
        disabled={loading !== null}
      >
        {loading === "apple" ? (
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.52-3.23 0-1.44.63-2.2.52-3.08-.4C3.11 15.5 3.7 9.08 8.58 8.82c1.26.06 2.14.68 2.88.72 1.1-.22 2.15-.87 3.33-.77 1.41.13 2.47.63 3.17 1.6-2.87 1.76-2.18 5.63.49 6.72-.57 1.51-1.3 3-2.4 4.19zM12.03 8.72c-.14-2.18 1.64-4.03 3.7-4.22.28 2.4-2.15 4.32-3.7 4.22z" />
          </svg>
        )}
        Apple
      </Button>
    </div>
  );
}
