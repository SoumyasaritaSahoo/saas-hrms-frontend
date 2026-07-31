import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "@/configs/i18n";
import { paths } from "@/path";

// ─── Helpers ──────────────────────────────────────────────────────

const isUrlMissingLocale = (pathname: string) =>
  i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

const getLocalizedUrl = (url: string, locale: string) =>
  `/${locale}${url.startsWith("/") ? url : `/${url}`}`;

const getLocale = (request: NextRequest): string => {
  // 1. Try URL
  const urlLocale = i18n.locales.find((locale) =>
    request.nextUrl.pathname.startsWith(`/${locale}`),
  );
  if (urlLocale) return urlLocale;

  // 2. Try Accept-Language header
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = [...i18n.locales] as string[];
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

  try {
    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch {
    return i18n.defaultLocale;
  }
};

const localizedRedirect = (
  url: string,
  locale: string,
  request: NextRequest,
) => {
  const localizedUrl =
    isUrlMissingLocale(url) ? getLocalizedUrl(url, locale) : url;
  const redirectUrl = new URL(localizedUrl, request.url);
  // Preserve original query params (e.g. ?token=... on reset-password links)
  request.nextUrl.searchParams.forEach((value, key) => {
    redirectUrl.searchParams.set(key, value);
  });
  return NextResponse.redirect(redirectUrl.toString());
};

// ─── Middleware ───────────────────────────────────────────────────

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = getLocale(request);

  // ── Auth state from cookies ──
  const isUserLoggedIn =
    (
      request.cookies.get("isAuth")?.value &&
      request.cookies.get("isAuth")?.value !== "deleted"
    ) ?
      true
    : false;

  // ── Route categories ──
  const guestRoutes = [paths.auth.login, paths.auth.forgotPassword, paths.auth.resetPassword, paths.auth.onboarding, paths.auth.onboardingCompanyExists, paths.auth.onboardingAccountExists];
  const publicRoutes = [
    paths.notFound,
    paths.notAuthorized,
  ];

  const isPublicRoute = publicRoutes.some((route) => pathname.endsWith(route));
  const isGuestRoute = guestRoutes.some((route) => pathname.endsWith(route));
  const isPrivateRoute = !isGuestRoute && !isPublicRoute;

  // ── Public routes — just localize ──
  if (isPublicRoute) {
    return isUrlMissingLocale(pathname) ?
        localizedRedirect(pathname, locale, request)
      : NextResponse.next();
  }

  // ── Not logged in + private route → redirect to login ──
  if (!isUserLoggedIn && isPrivateRoute) {
    let redirectUrl = paths.auth.login;

    // Preserve intended destination
    if (pathname !== "/" && pathname !== `/${locale}`) {
      const searchParams = new URLSearchParams({ redirectTo: pathname });
      redirectUrl += `?${searchParams.toString()}`;
    }

    return localizedRedirect(redirectUrl, locale, request);
  }

  // ── Logged in + guest route → redirect to dashboard ──
  if (
    isUserLoggedIn &&
    (isGuestRoute || pathname === "/" || pathname === `/${locale}`)
  ) {
    return localizedRedirect(paths.dashboard, locale, request);
  }

  // ── Localize if missing ──
  return isUrlMissingLocale(pathname) ?
      localizedRedirect(pathname, locale, request)
    : NextResponse.next();
}

// ─── Matcher ──────────────────────────────────────────────────────
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.svg|.*\\.png|.*\\.ico).*)",
  ],
};
