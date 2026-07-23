import Cookies from "js-cookie";

const COOKIE_PREFIX = "optihr_onboarding";

const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  expires: 1,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
};

const SENSITIVE_FIELDS = ["password", "confirmPassword", "confirm_password"];

const getCookieKey = (key: string) => `${COOKIE_PREFIX}_${key}`;

export const saveOnboardingCookie = (key: string, value: any) => {
  const safe =
    value && typeof value === "object"
      ? Object.fromEntries(
          Object.entries(value).filter(([k]) => !SENSITIVE_FIELDS.includes(k)),
        )
      : value;

  Cookies.set(getCookieKey(key), JSON.stringify(safe), COOKIE_OPTIONS);
};

export const getOnboardingCookie = (key: string) => {
  const data = Cookies.get(getCookieKey(key));
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const removeOnboardingCookie = (key: string) => {
  Cookies.remove(getCookieKey(key));
};

export const clearOnboardingCookies = () => {
  ["registration", "organization", "location", "admin"].forEach((key) =>
    Cookies.remove(getCookieKey(key)),
  );
};
