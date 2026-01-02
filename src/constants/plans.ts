import { Crown, Sparkles, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Subscription plan types
 */
export type SubscriptionPlan = "Free" | "Pro" | "Family";

/**
 * Plan configuration constants
 */
export const PLAN_THRESHOLDS = {
  FAMILY: {
    MIN_HOUSEHOLD_SIZE: 3,
    MIN_BUDGET: 400,
  },
  PRO: {
    MIN_BUDGET: 200,
    MIN_HOUSEHOLD_SIZE: 2,
  },
} as const;

/**
 * Default plan
 */
export const DEFAULT_PLAN: SubscriptionPlan = "Free";

/**
 * Plan icon mapping
 */
export const PLAN_ICONS: Record<SubscriptionPlan, LucideIcon> = {
  Family: Crown,
  Pro: Sparkles,
  Free: Zap,
};

/**
 * Plan color gradient classes
 */
export const PLAN_COLORS: Record<SubscriptionPlan, string> = {
  Family: "from-amber-500 to-orange-500",
  Pro: "from-primary to-accent",
  Free: "from-emerald-500 to-teal-500",
};

/**
 * Plan multipliers for consumption calculations
 */
export const PLAN_MULTIPLIERS: Record<SubscriptionPlan, number> = {
  Pro: 0.85,
  Family: 0.75,
  Free: 1,
};

