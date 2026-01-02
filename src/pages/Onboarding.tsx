import { useState } from "react";
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
  Zap 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

interface OnboardingData {
  goal: string;
  monthlyBudget: string;
  householdSize: string;
}

const goalIcons = [Wallet, Home, Zap, Target];

const Onboarding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const planData = location.state as { plan?: string; isYearly?: boolean } | null;

  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    goal: "",
    monthlyBudget: "",
    householdSize: "",
  });

  const steps = [
    { id: 1, title: t.onboarding.steps.goals.title, icon: Target },
    { id: 2, title: t.onboarding.steps.budget.title, icon: Wallet },
    { id: 3, title: t.onboarding.steps.household.title, icon: Users },
    { id: 4, title: t.onboarding.success.title, icon: Check },
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

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/dashboard", { state: { ...data, plan: planData?.plan || "Free" } });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
          {steps.map((step, index) => (
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

        {planData?.plan && (
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">{t.pricing.badge}</p>
            <p className="font-semibold text-primary">{planData.plan}</p>
            {planData.isYearly && (
              <p className="text-xs text-muted-foreground">{t.pricing.yearly}</p>
            )}
          </div>
        )}
      </div>

      {/* Right Panel - Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          {/* Mobile Progress */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            {steps.map((step, index) => (
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
                          R$
                        </span>
                        <Input
                          id="budget"
                          type="number"
                          placeholder="250"
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

              {/* Step 4: Complete */}
              {currentStep === 4 && (
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
                      <span className="font-medium">{planData?.plan || "Free"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t.onboarding.steps.budget.title}</span>
                      <span className="font-medium">R${data.monthlyBudget}</span>
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
              disabled={!canProceed()}
            >
              {currentStep === 4 ? t.onboarding.success.cta : t.onboarding.next}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
