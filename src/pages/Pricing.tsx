import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Free",
    description: "Perfect for getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Basic energy tracking",
      "Monthly reports",
      "1 property",
      "Email support",
    ],
  },
  {
    name: "Premium",
    description: "Best for active households",
    monthlyPrice: 9.99,
    yearlyPrice: 7.99,
    popular: true,
    features: [
      "Everything in Free",
      "Real-time monitoring",
      "Smart alerts & notifications",
      "Unlimited properties",
      "Budget forecasting",
      "Priority support",
      "AI-powered insights",
    ],
  },
  {
    name: "Family",
    description: "For multi-household management",
    monthlyPrice: 19.99,
    yearlyPrice: 15.99,
    features: [
      "Everything in Premium",
      "Up to 5 family members",
      "Shared dashboards",
      "Comparison analytics",
      "Advanced reporting",
      "Dedicated account manager",
    ],
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4"
            >
              Pricing
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mb-4"
            >
              Simple, transparent pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8"
            >
              Start free and upgrade when you need more features. 
              No hidden fees, cancel anytime.
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
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  isYearly ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
                )}
              >
                Yearly
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </motion.div>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
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
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-bold">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  {isYearly && plan.monthlyPrice > 0 && (
                    <p className="text-sm text-primary mt-1">
                      Billed ${(plan.yearlyPrice * 12).toFixed(2)}/year
                    </p>
                  )}
                </div>

                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  className="w-full mb-8"
                  size="lg"
                  asChild
                >
                  <Link to="/onboarding" state={{ plan: plan.name, isYearly }}>
                    {plan.monthlyPrice === 0 ? "Get started free" : "Start free trial"}
                  </Link>
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* FAQ Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <p className="text-muted-foreground">
              Have questions?{" "}
              <span className="text-primary cursor-pointer hover:underline">
                Check our FAQ
              </span>{" "}
              or{" "}
              <span className="text-primary cursor-pointer hover:underline">
                contact support
              </span>
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
