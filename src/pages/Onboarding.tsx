import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Home, 
  Target, 
  Users, 
  Wallet,
  Zap,
  Sparkles,
  Crown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface OnboardingData {
  goal: string;
  monthlyBudget: string;
  householdSize: string;
}

const goalIcons = [Wallet, Home, Zap, Target];

// Plan recommendation logic
const recommendPlan = (data: OnboardingData): string => {
  const budget = parseInt(data.monthlyBudget) || 0;
  const householdSize = parseInt(data.householdSize) || 1;
  
  // Family plan for larger households or high budgets
  if (householdSize >= 3 || budget > 400) {
    return "Family";
  }
  // Pro plan for medium usage
  if (budget > 200 || householdSize >= 2) {
    return "Pro";
  }
  // Free for starters
  return "Free";
};

const Onboarding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { profile, updateProfile } = useAuth();
  const planData = location.state as { plan?: string; isYearly?: boolean } | null;

  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    goal: "",
    monthlyBudget: "",
    householdSize: "",
  });
  const [recommendedPlan, setRecommendedPlan] = useState<string>("Free");
  const [loading, setLoading] = useState(false);

  // If already completed onboarding, redirect to dashboard
  useEffect(() => {
    if (profile?.onboarding_completed) {
      navigate("/dashboard", { replace: true });
    }
  }, [profile, navigate]);

  const steps = [
    { id: 1, title: t.onboarding.steps.goals.title, icon: Target },
    { id: 2, title: t.onboarding.steps.budget.title, icon: Wallet },
    { id: 3, title: t.onboarding.steps.household.title, icon: Users },
    { id: 4, title: t.onboarding.planRecommendation.title, icon: Sparkles },
    { id: 5, title: t.onboarding.success.title, icon: Check },
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.goal !== "";
      case 2:
        return data.monthlyBudget !== "";
      case 3:
        return data.householdSize !== "";
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (currentStep === 3) {
      // Calculate recommended plan before showing it
      const plan = planData?.plan || recommendPlan(data);
      setRecommendedPlan(plan);
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setCurrentStep(5);
    } else if (currentStep === 5) {
      // Save to database and navigate
      setLoading(true);
      const { error } = await updateProfile({
        goal: data.goal,
        monthly_budget: parseFloat(data.monthlyBudget),
        household_size: parseInt(data.householdSize),
        recommended_plan: recommendedPlan,
        subscription_plan: recommendedPlan,
        onboarding_completed: true,
      });

      if (error) {
        toast({
          title: "Erro ao salvar",
          description: error.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({
        title: t.onboarding.success.title,
        description: t.onboarding.success.description,
      });
      navigate("/dashboard");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case "Family":
        return Crown;
      case "Pro":
        return Sparkles;
      default:
        return Zap;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Family":
        return "from-amber-500 to-orange-500";
      case "Pro":
        return "from-primary to-accent";
      default:
        return "from-emerald-500 to-teal-500";
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Progress */}
      <div className="hidden lg:flex w-80 bg-secondary/30 border-r border-border p-8 flex-col">
        <div className="flex items-center gap-2 font-display font-bold text-xl mb-12">
          <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="gradient-text">Pulse</span>
        </div>

        <div className="space-y-4 flex-1">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl transition-all",
                currentStep === step.id && "bg-card shadow-soft",
                currentStep > step.id && "opacity-50"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                  currentStep === step.id && "gradient-hero",
                  currentStep > step.id && "bg-primary/20",
                  currentStep < step.id && "bg-secondary"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5 text-primary" />
                ) : (
                  <step.icon
                    className={cn(
                      "w-5 h-5",
                      currentStep === step.id ? "text-primary-foreground" : "text-muted-foreground"
                    )}
                  />
                )}
              </div>
              <div>
                <p
                  className={cn(
                    "font-medium text-sm",
                    currentStep === step.id ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {t.onboarding.step} {step.id}
                </p>
              </div>
            </div>
          ))}
        </div>

        {profile?.full_name && (
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Bem-vindo</p>
            <p className="font-semibold text-primary">{profile.full_name}</p>
          </div>
        )}
      </div>

      {/* Right Panel - Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          {/* Mobile Progress */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "h-2 flex-1 rounded-full transition-all",
                  currentStep >= step.id ? "gradient-hero" : "bg-secondary"
                )}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Step 1: Goal */}
              {currentStep === 1 && (
                <div>
                  <h1 className="text-3xl font-display font-bold mb-2">
                    {t.onboarding.steps.goals.title}
                  </h1>
                  <p className="text-muted-foreground mb-8">
                    {t.onboarding.steps.goals.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {t.onboarding.steps.goals.options.map((goal, index) => {
                      const Icon = goalIcons[index] || Target;
                      return (
                        <button
                          key={goal.id}
                          onClick={() => setData({ ...data, goal: goal.id })}
                          className={cn(
                            "p-6 rounded-2xl border-2 text-left transition-all hover:border-primary/50",
                            data.goal === goal.id
                              ? "border-primary bg-primary/5 shadow-glow"
                              : "border-border bg-card"
                          )}
                        >
                          <div
                            className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                              data.goal === goal.id ? "gradient-hero" : "bg-secondary"
                            )}
                          >
                            <Icon
                              className={cn(
                                "w-6 h-6",
                                data.goal === goal.id
                                  ? "text-primary-foreground"
                                  : "text-muted-foreground"
                              )}
                            />
                          </div>
                          <p className="font-medium">{goal.label}</p>
                          <p className="text-xs text-muted-foreground mt-1">{goal.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Budget */}
              {currentStep === 2 && (
                <div>
                  <h1 className="text-3xl font-display font-bold mb-2">
                    {t.onboarding.steps.budget.title}
                  </h1>
                  <p className="text-muted-foreground mb-8">
                    {t.onboarding.steps.budget.description}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="budget" className="text-base">
                        {t.onboarding.steps.budget.title}
                      </Label>
                      <div className="relative mt-2">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                          €
                        </span>
                        <Input
                          id="budget"
                          type="number"
                          placeholder="100"
                          value={data.monthlyBudget}
                          onChange={(e) =>
                            setData({ ...data, monthlyBudget: e.target.value })
                          }
                          className="pl-10 h-14 text-lg rounded-xl"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      💡 {t.onboarding.steps.budget.hint}
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Household */}
              {currentStep === 3 && (
                <div>
                  <h1 className="text-3xl font-display font-bold mb-2">
                    {t.onboarding.steps.household.title}
                  </h1>
                  <p className="text-muted-foreground mb-8">
                    {t.onboarding.steps.household.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {t.onboarding.steps.household.options.map((size, index) => (
                      <button
                        key={size}
                        onClick={() => setData({ ...data, householdSize: String(index + 1) })}
                        className={cn(
                          "p-6 rounded-2xl border-2 text-left transition-all hover:border-primary/50",
                          data.householdSize === String(index + 1)
                            ? "border-primary bg-primary/5 shadow-glow"
                            : "border-border bg-card"
                        )}
                      >
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                            data.householdSize === String(index + 1)
                              ? "gradient-hero"
                              : "bg-secondary"
                          )}
                        >
                          <Users
                            className={cn(
                              "w-6 h-6",
                              data.householdSize === String(index + 1)
                                ? "text-primary-foreground"
                                : "text-muted-foreground"
                            )}
                          />
                        </div>
                        <p className="font-medium">{size}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Plan Recommendation */}
              {currentStep === 4 && (
                <div className="text-center">
                  <div className={cn(
                    "w-20 h-20 rounded-full bg-gradient-to-br flex items-center justify-center mx-auto mb-6",
                    getPlanColor(recommendedPlan)
                  )}>
                    {(() => {
                      const PlanIcon = getPlanIcon(recommendedPlan);
                      return <PlanIcon className="w-10 h-10 text-white" />;
                    })()}
                  </div>
                  <h1 className="text-3xl font-display font-bold mb-2">
                    {t.onboarding.planRecommendation.title}
                  </h1>
                  <p className="text-muted-foreground mb-6">
                    {t.onboarding.planRecommendation.description}
                  </p>
                  
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 mb-6">
                    <div className="text-4xl font-display font-bold gradient-text mb-2">
                      {recommendedPlan === "Free" 
                        ? t.pricing.plans.free.name 
                        : recommendedPlan === "Pro" 
                          ? t.pricing.plans.pro.name 
                          : t.pricing.plans.family.name
                      }
                    </div>
                    <p className="text-muted-foreground">
                      {recommendedPlan === "Free" 
                        ? t.pricing.plans.free.description 
                        : recommendedPlan === "Pro" 
                          ? t.pricing.plans.pro.description 
                          : t.pricing.plans.family.description
                      }
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/50 text-left space-y-3 mb-4">
                    <p className="text-sm font-medium">{t.onboarding.planRecommendation.based}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t.onboarding.steps.budget.title}</span>
                      <span className="font-medium">€{data.monthlyBudget}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t.onboarding.steps.household.title}</span>
                      <span className="font-medium">
                        {t.onboarding.steps.household.options[parseInt(data.householdSize) - 1] || data.householdSize}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/pricing")}
                  >
                    {t.onboarding.planRecommendation.viewAllPlans}
                  </Button>
                </div>
              )}

              {/* Step 5: Complete */}
              {currentStep === 5 && (
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h1 className="text-3xl font-display font-bold mb-2">
                    {t.onboarding.success.title}
                  </h1>
                  <p className="text-muted-foreground mb-8">
                    {t.onboarding.success.description}
                  </p>
                  <div className="p-6 rounded-2xl bg-secondary/50 text-left space-y-3 mb-8">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t.pricing.badge}</span>
                      <span className="font-medium">{recommendedPlan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t.onboarding.steps.budget.title}</span>
                      <span className="font-medium">€{data.monthlyBudget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t.onboarding.steps.household.title}</span>
                      <span className="font-medium">
                        {t.onboarding.steps.household.options[parseInt(data.householdSize) - 1] || data.householdSize}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={cn(currentStep === 1 && "invisible")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.onboarding.previous}
            </Button>
            <Button
              variant="hero"
              size="lg"
              onClick={handleNext}
              disabled={!canProceed() || loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : currentStep === 5 ? (
                t.onboarding.success.cta
              ) : currentStep === 4 ? (
                <>
                  {t.onboarding.planRecommendation.startWith} {recommendedPlan}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  {t.onboarding.next}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
