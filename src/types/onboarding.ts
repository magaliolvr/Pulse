/**
 * Onboarding data structure
 */
export interface OnboardingData {
  goal: string;
  monthlyBudget: string;
  householdSize: string;
}

/**
 * Onboarding step data (parsed)
 */
export interface ParsedOnboardingData {
  goal: string;
  monthlyBudget: number;
  householdSize: number;
}

/**
 * Plan recommendation result
 */
export interface PlanRecommendationInput {
  monthlyBudget: number;
  householdSize: number;
}

