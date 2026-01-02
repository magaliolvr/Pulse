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

interface OnboardingData {
  goal: string;
  monthlyBudget: string;
  householdSize: string;
}

const steps = [
  { id: 1, title: "Your Goal", icon: Target },
  { id: 2, title: "Budget", icon: Wallet },
  { id: 3, title: "Household", icon: Users },
  { id: 4, title: "Complete", icon: Check },
];

const goals = [
  { id: "save-money", label: "Save money on bills", icon: Wallet },
  { id: "reduce-carbon", label: "Reduce carbon footprint", icon: Home },
  { id: "track-usage", label: "Track energy usage", icon: Zap },
  { id: "all-above", label: "All of the above", icon: Target },
];

const householdSizes = [
  { value: "1", label: "1 person" },
  { value: "2", label: "2 people" },
  { value: "3-4", label: "3-4 people" },
  { value: "5+", label: "5+ people" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const planData = location.state as { plan?: string; isYearly?: boolean } | null;

  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    goal: "",
    monthlyBudget: "",
    householdSize: "",
  });

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
                  Step {step.id}
                </p>
                <p className="text-xs text-muted-foreground">{step.title}</p>
              </div>
            </div>
          ))}
        </div>

        {planData?.plan && (
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Selected Plan</p>
            <p className="font-semibold text-primary">{planData.plan}</p>
            {planData.isYearly && (
              <p className="text-xs text-muted-foreground">Billed yearly</p>
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
                    What's your main goal?
                  </h1>
                  <p className="text-muted-foreground mb-8">
                    Help us personalize your Pulse experience.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {goals.map((goal) => (
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
                          <goal.icon
                            className={cn(
                              "w-6 h-6",
                              data.goal === goal.id
                                ? "text-primary-foreground"
                                : "text-muted-foreground"
                            )}
                          />
                        </div>
                        <p className="font-medium">{goal.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Budget */}
              {currentStep === 2 && (
                <div>
                  <h1 className="text-3xl font-display font-bold mb-2">
                    What's your monthly energy budget?
                  </h1>
                  <p className="text-muted-foreground mb-8">
                    We'll help you stay within this target.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="budget" className="text-base">
                        Monthly budget (USD)
                      </Label>
                      <div className="relative mt-2">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="budget"
                          type="number"
                          placeholder="150"
                          value={data.monthlyBudget}
                          onChange={(e) =>
                            setData({ ...data, monthlyBudget: e.target.value })
                          }
                          className="pl-8 h-14 text-lg rounded-xl"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      💡 The average US household spends about $120-150/month on energy.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Household */}
              {currentStep === 3 && (
                <div>
                  <h1 className="text-3xl font-display font-bold mb-2">
                    How many people in your household?
                  </h1>
                  <p className="text-muted-foreground mb-8">
                    This helps us provide accurate insights.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {householdSizes.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => setData({ ...data, householdSize: size.value })}
                        className={cn(
                          "p-6 rounded-2xl border-2 text-left transition-all hover:border-primary/50",
                          data.householdSize === size.value
                            ? "border-primary bg-primary/5 shadow-glow"
                            : "border-border bg-card"
                        )}
                      >
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                            data.householdSize === size.value
                              ? "gradient-hero"
                              : "bg-secondary"
                          )}
                        >
                          <Users
                            className={cn(
                              "w-6 h-6",
                              data.householdSize === size.value
                                ? "text-primary-foreground"
                                : "text-muted-foreground"
                            )}
                          />
                        </div>
                        <p className="font-medium">{size.label}</p>
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
                    You're all set!
                  </h1>
                  <p className="text-muted-foreground mb-8">
                    Your personalized dashboard is ready. Let's start tracking 
                    your energy usage and saving money.
                  </p>
                  <div className="p-6 rounded-2xl bg-secondary/50 text-left space-y-3 mb-8">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Plan</span>
                      <span className="font-medium">{planData?.plan || "Free"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Budget</span>
                      <span className="font-medium">${data.monthlyBudget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Household Size</span>
                      <span className="font-medium">
                        {householdSizes.find((s) => s.value === data.householdSize)?.label}
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
              Back
            </Button>
            <Button
              variant="hero"
              size="lg"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {currentStep === 4 ? "Go to Dashboard" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
