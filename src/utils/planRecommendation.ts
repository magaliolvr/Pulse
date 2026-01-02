import type { SubscriptionPlan } from "@/constants/plans";
import { DEFAULT_PLAN, PLAN_THRESHOLDS } from "@/constants/plans";
import type { PlanRecommendationInput } from "@/types/onboarding";

/**
 * Recommends a subscription plan based on user data
 * 
 * Business rules:
 * - Family: household >= 3 OR budget > 400
 * - Pro: budget > 200 OR household >= 2
 * - Free: default for all other cases
 * 
 * @param input - User onboarding data
 * @returns Recommended subscription plan
 */
export function recommendPlan(input: PlanRecommendationInput): SubscriptionPlan {
  const { monthlyBudget, householdSize } = input;

  // Family plan for larger households or high budgets
  if (
    householdSize >= PLAN_THRESHOLDS.FAMILY.MIN_HOUSEHOLD_SIZE ||
    monthlyBudget > PLAN_THRESHOLDS.FAMILY.MIN_BUDGET
  ) {
    return "Family";
  }

  // Pro plan for medium usage
  if (
    monthlyBudget > PLAN_THRESHOLDS.PRO.MIN_BUDGET ||
    householdSize >= PLAN_THRESHOLDS.PRO.MIN_HOUSEHOLD_SIZE
  ) {
    return "Pro";
  }

  // Free for starters
  return DEFAULT_PLAN;
}

