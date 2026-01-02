import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { PhoneInput } from "@/components/ui/phone-input";
import { useAuth } from "@/hooks/useAuth";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Eye, 
  EyeOff, 
  Mail, 
  User, 
  Lock,
  Zap,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { ROUTES } from "@/constants/routes";
import type { LocationState } from "@/types/navigation";

type AuthMode = "login" | "signup";
type SignupStep = 1 | 2 | 3;

const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, signUp, loading: authLoading } = useAuth();
  const { t } = useLanguage();

  const [mode, setMode] = useState<AuthMode>("login");
  const [signupStep, setSignupStep] = useState<SignupStep>(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);

  // Form data
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [otpCode, setOtpCode] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      const state = location.state as LocationState | null;
      const from = state?.from?.pathname || ROUTES.DASHBOARD;
      navigate(from, { replace: true });
    }
  }, [user, authLoading, navigate, location]);

  const checkEmailExists = async (email: string) => {
    if (!emailSchema.safeParse(email).success) return;
    
    setCheckingEmail(true);
    // Check if email exists by trying to fetch profiles
    const { data } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email)
      .maybeSingle();
    
    setEmailExists(!!data);
    setCheckingEmail(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailSchema.safeParse(loginData.email).success) {
      toast({
        title: t.auth.errors.invalidEmail,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await signIn(loginData.email, loginData.password);
    
    if (error) {
      toast({
        title: t.auth.errors.loginFailed,
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleSignupStep1 = async () => {
    if (!signupData.fullName.trim()) {
      toast({ title: t.auth.errors.nameRequired, variant: "destructive" });
      return;
    }
    if (!emailSchema.safeParse(signupData.email).success) {
      toast({ title: t.auth.errors.invalidEmail, variant: "destructive" });
      return;
    }
    if (emailExists) {
      toast({ title: t.auth.errors.emailExists, variant: "destructive" });
      return;
    }
    setSignupStep(2);
  };

  const handleSignupStep2 = async () => {
    if (!passwordSchema.safeParse(signupData.password).success) {
      toast({ title: t.auth.errors.passwordTooShort, variant: "destructive" });
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      toast({ title: t.auth.errors.passwordMismatch, variant: "destructive" });
      return;
    }
    if (!signupData.acceptTerms) {
      toast({ title: t.auth.errors.acceptTerms, variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await signUp(signupData.email, signupData.password, signupData.fullName);
    
    if (error) {
      toast({
        title: t.auth.errors.signupFailed,
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    // Since auto-confirm is enabled, user is logged in directly
    // Navigate to onboarding
    toast({
      title: t.auth.signupSuccess,
      description: t.auth.welcomeMessage,
    });
    setLoading(false);
  };

  const handleOTPVerify = async () => {
    if (otpCode.length !== 6) {
      toast({ title: t.auth.errors.invalidOTP, variant: "destructive" });
      return;
    }
    // With auto-confirm enabled, this step is skipped
    navigate(ROUTES.ONBOARDING);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-1/2 gradient-hero p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10">
          <Link to={ROUTES.HOME} className="flex items-center gap-2 font-display font-bold text-2xl text-white">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span>Pulse</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-display font-bold text-white leading-tight">
            {t.auth.brandingTitle}
          </h1>
          <p className="text-xl text-white/80">
            {t.auth.brandingDescription}
          </p>
          <div className="flex gap-6 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10k+</div>
              <div className="text-sm text-white/70">{t.hero.stats.users}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">30%</div>
              <div className="text-sm text-white/70">{t.auth.savingsAverage}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.9</div>
              <div className="text-sm text-white/70">{t.hero.stats.rating}</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-white/60">
          © 2024 Pulse. {t.footer.copyright.split("©")[1]}
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl gradient-text">Pulse</span>
          </div>

          <AnimatePresence mode="wait">
            {/* Login Form */}
            {mode === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-display font-bold mb-2">
                    {t.auth.welcomeBack}
                  </h1>
                  <p className="text-muted-foreground">
                    {t.auth.loginSubtitle}
                  </p>
                </div>

                <SocialLoginButtons />

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-background text-muted-foreground">
                      {t.auth.orContinueWith}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">{t.auth.email}</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder={t.auth.emailPlaceholder}
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">{t.auth.password}</Label>
                      <Link to={ROUTES.FORGOT_PASSWORD} className="text-sm text-primary hover:underline">
                        {t.auth.forgotPassword}
                      </Link>
                    </div>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="pl-10 pr-10 h-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full h-12" 
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      t.auth.signIn
                    )}
                  </Button>
                </form>

                <p className="text-center mt-6 text-muted-foreground">
                  {t.auth.noAccount}{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="text-primary font-medium hover:underline"
                  >
                    {t.auth.createAccount}
                  </button>
                </p>
              </motion.div>
            )}

            {/* Signup Flow */}
            {mode === "signup" && (
              <motion.div
                key={`signup-${signupStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Progress Steps */}
                <div className="flex items-center gap-2 mb-8">
                  {[1, 2].map((step) => (
                    <div
                      key={step}
                      className={cn(
                        "h-2 flex-1 rounded-full transition-all",
                        signupStep >= step ? "gradient-hero" : "bg-secondary"
                      )}
                    />
                  ))}
                </div>

                {/* Step 1: Basic Info */}
                {signupStep === 1 && (
                  <div>
                    <div className="text-center mb-8">
                      <h1 className="text-3xl font-display font-bold mb-2">
                        {t.auth.createYourAccount}
                      </h1>
                      <p className="text-muted-foreground">
                        {t.auth.signupStep1Subtitle}
                      </p>
                    </div>

                    <SocialLoginButtons />

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-background text-muted-foreground">
                          {t.auth.orContinueWith}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">{t.auth.fullName}</Label>
                        <div className="relative mt-1">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="fullName"
                            type="text"
                            placeholder={t.auth.fullNamePlaceholder}
                            value={signupData.fullName}
                            onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="signupEmail">{t.auth.email}</Label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="signupEmail"
                            type="email"
                            placeholder={t.auth.emailPlaceholder}
                            value={signupData.email}
                            onChange={(e) => {
                              setSignupData({ ...signupData, email: e.target.value });
                              checkEmailExists(e.target.value);
                            }}
                            className={cn(
                              "pl-10 pr-10 h-12",
                              emailExists && "border-destructive"
                            )}
                          />
                          {checkingEmail && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-muted-foreground" />
                          )}
                          {!checkingEmail && signupData.email && emailSchema.safeParse(signupData.email).success && (
                            emailExists ? (
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive text-xs">
                                {t.auth.errors.emailExists}
                              </span>
                            ) : (
                              <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success" />
                            )
                          )}
                        </div>
                      </div>

                      <Button
                        variant="hero"
                        className="w-full h-12"
                        onClick={handleSignupStep1}
                        disabled={!signupData.fullName || !signupData.email || emailExists}
                      >
                        {t.auth.continue}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>

                    <p className="text-center mt-6 text-muted-foreground">
                      {t.auth.hasAccount}{" "}
                      <button
                        onClick={() => setMode("login")}
                        className="text-primary font-medium hover:underline"
                      >
                        {t.auth.signIn}
                      </button>
                    </p>
                  </div>
                )}

                {/* Step 2: Password & Details */}
                {signupStep === 2 && (
                  <div>
                    <button
                      onClick={() => setSignupStep(1)}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {t.auth.back}
                    </button>

                    <div className="text-center mb-8">
                      <h1 className="text-3xl font-display font-bold mb-2">
                        {t.auth.completeYourProfile}
                      </h1>
                      <p className="text-muted-foreground">
                        {t.auth.signupStep2Subtitle}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="phone">{t.auth.phone} ({t.auth.optional})</Label>
                        <div className="mt-1">
                          <PhoneInput
                            value={signupData.phone}
                            onChange={(value) => setSignupData({ ...signupData, phone: value })}
                            placeholder={t.auth.phonePlaceholder}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="newPassword">{t.auth.password}</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="newPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder={t.auth.passwordPlaceholder}
                            value={signupData.password}
                            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                            className="pl-10 pr-10 h-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t.auth.passwordHint}
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">{t.auth.confirmPassword}</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder={t.auth.confirmPasswordPlaceholder}
                            value={signupData.confirmPassword}
                            onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                            className={cn(
                              "pl-10 h-12",
                              signupData.confirmPassword && signupData.password !== signupData.confirmPassword && "border-destructive"
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex items-start gap-3 pt-2">
                        <Checkbox
                          id="terms"
                          checked={signupData.acceptTerms}
                          onCheckedChange={(checked) => 
                            setSignupData({ ...signupData, acceptTerms: checked as boolean })
                          }
                        />
                        <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                          {t.auth.acceptTermsText}{" "}
                          <Link to={ROUTES.TERMS} className="text-primary hover:underline">
                            {t.auth.termsOfService}
                          </Link>{" "}
                          {t.auth.and}{" "}
                          <Link to={ROUTES.PRIVACY} className="text-primary hover:underline">
                            {t.auth.privacyPolicy}
                          </Link>
                        </label>
                      </div>

                      <Button
                        variant="hero"
                        className="w-full h-12"
                        onClick={handleSignupStep2}
                        disabled={loading || !signupData.password || !signupData.acceptTerms}
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            {t.auth.createAccount}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: OTP Verification (kept for future use if needed) */}
                {signupStep === 3 && (
                  <div>
                    <button
                      onClick={() => setSignupStep(2)}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {t.auth.back}
                    </button>

                    <div className="text-center mb-8">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-primary" />
                      </div>
                      <h1 className="text-3xl font-display font-bold mb-2">
                        {t.auth.verifyEmail}
                      </h1>
                      <p className="text-muted-foreground">
                        {t.auth.otpSentTo} <strong>{signupData.email}</strong>
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={otpCode}
                          onChange={setOtpCode}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>

                      <Button
                        variant="hero"
                        className="w-full h-12"
                        onClick={handleOTPVerify}
                        disabled={otpCode.length !== 6}
                      >
                        {t.auth.verify}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>

                      <p className="text-center text-muted-foreground text-sm">
                        {t.auth.didntReceiveCode}{" "}
                        <button className="text-primary font-medium hover:underline">
                          {t.auth.resendCode}
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Auth;
