"use client";

// NOTE: simplified from the source project for this auth-only port.
// The original PrivateLayout also gated every route behind
// getRequiredPermission()/usePermission() (role + permission based access
// control) and wrapped children in the full dashboard chrome
// (LayoutWrapper -> AppSidebar/AppHeader). Both belong to features that
// were not ported (role/permission module isn't in the ported backend,
// and the sidebar/header are dashboard-feature UI). What remains here is
// just the auth guard: redirect to login if there's no authenticated user,
// and keep permissions refreshed in the background.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RefreshPermissions } from "@/app/redux/slices/Auth/auth";
import type { RootState, AppDispatch } from "@/app/redux/store";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { getLocalizedPath } from "@/path";
import { useTranslation } from "@/contexts/TranslationContext";

function PrivateGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { lang } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(RefreshPermissions());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      router.replace(getLocalizedPath("/login", lang));
    }
  }, [user, router, lang]);

  if (!user) return null;

  return <>{children}</>;
}

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TranslationProvider>
      <PrivateGuard>{children}</PrivateGuard>
    </TranslationProvider>
  );
}
