import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { t } = useLanguage();

  const plans = [
    {
      key: "free" as const,
      monthlyPrice: 0,
      yearlyPrice: 0,
    },
    {
      key: "pro" as const,
      monthlyPrice: 9.99,
      yearlyPrice: 7.99,
      popular: true,
    },
    {
      key: "family" as const,
      monthlyPrice: 19.99,
      yearlyPrice: 15.99,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-[600px]:pb-12 pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-[600px]:mb-12 text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4"
            >
              {t.pricing.badge}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mb-4"
            >
              {t.pricing.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8"
            >
              {t.pricing.description}
            </motion.p>

            {/* Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-4 p-1.5 bg-secondary rounded-full"
            >
              <button
                onClick={() => setIsYearly(false)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  !isYearly ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
                )}
              >
                {t.pricing.monthly}
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  isYearly ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
                )}
              >
                {t.pricing.yearly}
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {t.pricing.savePercent}
                </span>
              </button>
            </motion.div>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const planTranslations = t.pricing.plans[plan.key];
              return (
                <motion.div
                  key={plan.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={cn(
                    "relative p-8 rounded-3xl border transition-all duration-300",
                    plan.popular
                      ? "bg-card border-primary shadow-glow scale-[1.02]"
                      : "bg-card border-border/50 shadow-soft hover:shadow-lg"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="flex items-center gap-1 px-4 py-1.5 rounded-full gradient-hero text-primary-foreground text-sm font-medium">
                        <Sparkles className="w-4 h-4" />
                        {t.pricing.popular}
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-display font-bold mb-2">{planTranslations.name}</h3>
                    <p className="text-muted-foreground text-sm">{planTranslations.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-display font-bold">
                        €{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground">{t.pricing.perMonth}</span>
                    </div>
                    {isYearly && plan.monthlyPrice > 0 && (
                      <p className="text-sm text-primary mt-1">
                        €{(plan.yearlyPrice * 12).toFixed(2)}/ano
                      </p>
                    )}
                  </div>

                  <Button
                    variant={plan.popular ? "hero" : "outline"}
                    className="w-full mb-8"
                    size="lg"
                    asChild
                  >
                    <Link to="/onboarding" state={{ plan: planTranslations.name, isYearly }}>
                      {plan.monthlyPrice === 0 ? t.pricing.getStarted : t.pricing.startTrial}
                    </Link>
                  </Button>

                  <ul className="space-y-3">
                    {planTranslations.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
