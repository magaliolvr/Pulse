import type { OnboardingData } from "@/types/onboarding";
import { parseIntSafe, parseFloatSafe } from "./formatters";
import { recommendPlan } from "./planRecommendation";
import type { SubscriptionPlan } from "@/constants/plans";

/**
 * Parses onboarding form data into structured format
 * 
 * @param data - Raw onboarding form data
 * @returns Parsed onboarding data
 */
export function parseOnboardingData(data: OnboardingData) {
  return {
    goal: data.goal,
    monthlyBudget: parseFloatSafe(data.monthlyBudget, 0),
    householdSize: parseIntSafe(data.householdSize, 1),
  };
}

/**
 * Calculates recommended plan from onboarding data
 * 
 * @param data - Onboarding form data
 * @returns Recommended subscription plan
 */
export function calculateRecommendedPlan(data: OnboardingData): SubscriptionPlan {
  const parsed = parseOnboardingData(data);
  return recommendPlan({
    monthlyBudget: parsed.monthlyBudget,
    householdSize: parsed.householdSize,
  });
}

