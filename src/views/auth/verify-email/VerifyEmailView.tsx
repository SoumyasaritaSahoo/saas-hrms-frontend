"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme, alpha } from "@mui/material/styles";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackOutlined";

import AppTypography from "@/components/ui/AppTypography";
import AppTextField from "@/components/ui/AppTextField";
import AppButton from "@/components/ui/AppButton";
import { dispatch } from "@/app/redux/store";
import { VerifyEmail, ResendVerification } from "@/app/redux/slices/Auth/auth";
import type { RootState } from "@/app/redux/store";
import { useToast } from "@/components/ui/ToastProvider";
import { useTranslation } from "@/contexts/TranslationContext";
import { getLocalizedPath } from "@/path";

type Status = "verifying" | "success" | "error";

const RESEND_COOLDOWN_SECONDS = 30;

export default function VerifyEmailView() {
  const router = useRouter();
  const theme = useTheme();
  const toast = useToast();
  const { trans, lang } = useTranslation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const sessionEmail = useSelector((state: RootState) => (state as any).auth.user?.email as string | undefined);

  const [status, setStatus] = useState<Status>("verifying");
  const [resendEmail, setResendEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    (async () => {
      const res: any = await dispatch(VerifyEmail({ token }));
      setStatus(res?.status ? "success" : "error");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = async () => {
    const email = sessionEmail ?? resendEmail;

    if (!email) {
      toast.error(trans.verifyEmailEmailRequired);
      return;
    }

    setResending(true);
    try {
      const res: any = await dispatch(ResendVerification({ email }));
      if (res?.status) {
        toast.success(trans.verifyEmailResendSent);
        setCooldown(RESEND_COOLDOWN_SECONDS);
      } else {
        const msg =
          typeof res?.message === "string"
            ? res.message
            : (res?.message?.message ?? trans.verifyEmailFailed);
        toast.error(msg);
      }
    } catch {
      toast.error(trans.verifyEmailFailed);
    } finally {
      setResending(false);
    }
  };

  const iconCircle = (icon: React.ReactNode, color: string) => (
    <Box
      className="animate-fade-in-up"
      sx={{
        width: 88,
        height: 88,
        borderRadius: "50%",
        bgcolor: alpha(color, 0.12),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 4,
        mx: "auto",
        "--delay": "0s",
      }}
    >
      {icon}
    </Box>
  );

  return (
    <Box sx={{ textAlign: "center" }}>
      {status === "verifying" && (
        <>
          {iconCircle(
            <MarkEmailReadOutlinedIcon sx={{ color: theme.palette.primary.main, fontSize: 48 }} />,
            theme.palette.primary.main,
          )}
          <AppTypography variant="h2" sx={{ fontWeight: 700, color: "text.primary", lineHeight: "28px" }}>
            {trans.verifyEmailVerifying}
          </AppTypography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <CircularProgress size={28} />
          </Box>
        </>
      )}

      {status === "success" && (
        <>
          {iconCircle(
            <CheckCircleOutlinedIcon sx={{ color: theme.palette.success.main, fontSize: 48 }} />,
            theme.palette.success.main,
          )}
          <AppTypography variant="h2" sx={{ fontWeight: 700, color: "text.primary", lineHeight: "28px" }}>
            {trans.verifyEmailSuccess}
          </AppTypography>
          <AppTypography variant="body2" sx={{ mt: 3, mb: 3.75, color: "text.secondary", maxWidth: 340, mx: "auto" }}>
            {trans.verifyEmailSuccessSubtitle}
          </AppTypography>
          <AppButton
            brandVariant="primary"
            onClick={() => router.push(getLocalizedPath("/dashboard", lang))}
            sx={{ width: "100%", maxWidth: 320, mx: "auto" }}
          >
            {trans.verifyEmailContinue}
          </AppButton>
        </>
      )}

      {status === "error" && (
        <>
          {iconCircle(
            <ErrorOutlinedIcon sx={{ color: theme.palette.error.main, fontSize: 48 }} />,
            theme.palette.error.main,
          )}
          <AppTypography variant="h2" sx={{ fontWeight: 700, color: "text.primary", lineHeight: "28px" }}>
            {trans.verifyEmailFailedTitle}
          </AppTypography>
          <AppTypography variant="body2" sx={{ mt: 3, mb: 3, color: "text.secondary", maxWidth: 360, mx: "auto" }}>
            {trans.verifyEmailInvalidToken}
          </AppTypography>

          {!sessionEmail && (
            <Box sx={{ mb: 2, maxWidth: 320, mx: "auto", textAlign: "left" }}>
              <AppTextField
                label={trans.workEmail ?? "Work Email"}
                placeholder="jane@company.com"
                type="email"
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
              />
            </Box>
          )}

          <AppButton
            brandVariant="primary"
            loading={resending}
            disabled={cooldown > 0}
            onClick={handleResend}
            sx={{ width: "100%", maxWidth: 320, mx: "auto" }}
          >
            {cooldown > 0
              ? `${trans.verifyEmailResendButton} (${cooldown}s)`
              : trans.verifyEmailResendButton}
          </AppButton>
        </>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 9 }}>
        <Link
          href={getLocalizedPath("/login", lang)}
          style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}
        >
          <ArrowBackRoundedIcon sx={{ fontSize: 18, color: "var(--color-back-link)" }} />
          <AppTypography variant="body2" sx={{ color: "var(--color-back-link)", fontWeight: 600 }}>
            {trans.forgotBackToSignIn}
          </AppTypography>
        </Link>
      </Box>
    </Box>
  );
}
