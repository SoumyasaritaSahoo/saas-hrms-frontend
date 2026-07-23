"use client";

// NOTE: placeholder for the auth-only port. The real DashboardView (charts,
// widgets, etc.) is a separate feature and was not ported. This page exists
// only so the auth flow (login -> redirect to /dashboard) is testable
// end-to-end.
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import AppTypography from "@/components/ui/AppTypography";
import AppButton from "@/components/ui/AppButton";
import { dispatch } from "@/app/redux/store";
import { SignOut } from "@/app/redux/slices/Auth/auth";
import type { RootState } from "@/app/redux/store";
import { useTranslation } from "@/contexts/TranslationContext";
import { getLocalizedPath } from "@/path";

export default function DashboardPage() {
  const router = useRouter();
  const { lang } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user) as
    | { email?: string; first_name?: string }
    | null;

  const handleLogout = async () => {
    await dispatch(SignOut());
    router.push(getLocalizedPath("/login", lang));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        px: 2,
        textAlign: "center",
      }}
    >
      <AppTypography variant="h4" sx={{ fontWeight: 700 }}>
        Logged in as {user?.email ?? "unknown"}
      </AppTypography>
      <AppButton brandVariant="primary" onClick={handleLogout}>
        Log out
      </AppButton>
    </Box>
  );
}
