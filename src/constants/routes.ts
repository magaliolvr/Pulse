/**
 * Application route constants
 * Centralizes all route paths to avoid magic strings
 */
export const ROUTES = {
  HOME: "/",
  PRICING: "/pricing",
  AUTH: "/auth",
  ONBOARDING: "/onboarding",
  DASHBOARD: "/dashboard",
  FORGOT_PASSWORD: "/forgot-password",
  TERMS: "/terms",
  PRIVACY: "/privacy",
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];

