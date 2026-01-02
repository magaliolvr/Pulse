import type { SubscriptionPlan } from "@/constants/plans";
import { PLAN_ICONS, PLAN_COLORS } from "@/constants/plans";

/**
 * Gets the icon component for a given plan
 * 
 * @param plan - Subscription plan name
 * @returns Lucide icon component
 */
export function getPlanIcon(plan: SubscriptionPlan) {
  return PLAN_ICONS[plan];
}

/**
 * Gets the color gradient class for a given plan
 * 
 * @param plan - Subscription plan name
 * @returns Tailwind gradient class string
 */
export function getPlanColor(plan: SubscriptionPlan): string {
  return PLAN_COLORS[plan];
}

