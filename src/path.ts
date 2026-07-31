// Trimmed for the auth-only port: only the route groups actually used by
// the ported auth flow (login/forgot-password/reset-password), the
// placeholder private dashboard, profile, and the shared not-found /
// not-authorized pages are kept. Every other feature vertical (employee,
// leave-types, leave-requests, leave-policies, leave-balances, attendance*,
// payroll, role, department, designation, location*, holiday, audit-log,
// settings, onboarding) was dropped along with its screens.
export const paths = {
  index: "/",

  auth: {
    login: "/login",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    verifyEmail: "/verify-email",
    onboarding: "/onboarding",
    onboardingCompanyExists: "/onboarding/company-exists",
    onboardingAccountExists: "/onboarding/account-exists",
  },

  dashboard: "/dashboard",

  profile: "/profile",

  notFound: "/not-found",
  notAuthorized: "/not-authorized",
} as const;

export const getLocalizedPath = (path: string, lang: string) =>
  `/${lang}${path.startsWith("/") ? path : `/${path}`}`;
