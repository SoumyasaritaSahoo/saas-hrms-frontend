// Trimmed for the auth-only port: the source url.services.ts was one big
// file with URL builders for every feature (onboarding, roles,
// designations, departments, locations, holidays, employees, leave*,
// attendance*, audit logs, dashboard, company). Only the auth + profile
// builders actually used by the ported auth flow are kept.
const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

// ─── URL param replacer ───────────────────────────────────────────
export const UrlParamsReplace = (
  url: string,
  params: Record<string, string> = {},
): string => {
  let urlWithPrefix = `${ApiUrl}${url}`;

  Object.keys(params).forEach(
    (key) => (urlWithPrefix = urlWithPrefix.replace(`:${key}`, params[key])),
  );

  return urlWithPrefix;
};

// ─── Auth ─────────────────────────────────────────────────────────
export const CHECK_USER_EXISTS = () => UrlParamsReplace("/check-user");
export const GET_USER_ROLES = () => UrlParamsReplace("/get-user-role");
export const LOGIN = () => UrlParamsReplace("/app/login");
export const LOGOUT = () => UrlParamsReplace("/app/logout");
export const FORGOT_PASSWORD = () => UrlParamsReplace("/app/forgot-password");
export const RESET_PASSWORD = () => UrlParamsReplace("/app/reset-password");
export const VERIFY_EMAIL = () => UrlParamsReplace("/app/verify-email");
export const RESEND_VERIFICATION = () =>
  UrlParamsReplace("/app/resend-verification");

export const GET_PROFILE = () => UrlParamsReplace("/app/profile");
export const UPDATE_PROFILE = () => UrlParamsReplace("/app/profile");

// ─── Onboarding ─────────────────────────────────────────────────────
// Only the builder actually used by the onboarding wizard (RegisterUser)
// is kept — the source also had URL builders for postal-details,
// organization, location, admin-user, and create-company, all of which
// are dead code as far as the ported wizard is concerned.
export const REGISTER_USER = () => UrlParamsReplace("/app/register");
