"use client";

import { useState } from "react";
import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import AppButton from "@/components/ui/AppButton";
import AppTypography from "@/components/ui/AppTypography";
import { gradients } from "@/lib/theme";
import { dispatch } from "@/app/redux/store";
import { ResendVerification, GetProfile } from "@/app/redux/slices/Auth/auth";
import { useToast } from "@/components/ui/ToastProvider";
import { useTranslation } from "@/contexts/TranslationContext";

type EmailNotVerifiedViewProps = {
  email?: string | null;
};

const RESEND_COOLDOWN_SECONDS = 30;

export default function EmailNotVerifiedView({ email }: EmailNotVerifiedViewProps) {
  const theme = useTheme();
  const toast = useToast();
  const { trans } = useTranslation();
  const [resending, setResending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    try {
      const res: any = await dispatch(ResendVerification({ email }));
      if (res?.status) {
        toast.success(trans.verifyEmailResendSent);
        setCooldown(RESEND_COOLDOWN_SECONDS);
        const tick = () => {
          setTimeout(() => {
            setCooldown((c) => {
              if (c <= 1) return 0;
              tick();
              return c - 1;
            });
          }, 1000);
        };
        tick();
      } else {
        toast.error(trans.verifyEmailFailed);
      }
    } catch {
      toast.error(trans.verifyEmailFailed);
    } finally {
      setResending(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch(GetProfile());
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: alpha(theme.palette.warning.main, 0.15),
          mb: 3,
        }}
      >
        <MarkEmailUnreadOutlinedIcon sx={{ fontSize: 36, color: theme.palette.common.white }} />
      </Box>

      <Box
        sx={{
          mb: 1,
          fontSize: { xs: 22, md: 28 },
          fontWeight: 800,
          background: gradients.primary,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.02em",
        }}
      >
        {trans.verifyEmailGateTitle}
      </Box>

      <Box sx={{ mb: 1, color: "text.secondary", maxWidth: 420 }}>
        {trans.verifyEmailGateMessage}
      </Box>

      {email && (
        <AppTypography variant="body2" sx={{ mb: 4, fontWeight: 600, color: "text.primary" }}>
          {email}
        </AppTypography>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
        <AppButton
          brandVariant="primary"
          loading={resending}
          disabled={cooldown > 0}
          onClick={handleResend}
          sx={{ height: 48, px: 4, minWidth: 260 }}
        >
          {cooldown > 0
            ? `${trans.verifyEmailResendButton} (${cooldown}s)`
            : trans.verifyEmailResendButton}
        </AppButton>

        <AppButton
          brandVariant="tertiary"
          loading={refreshing}
          onClick={handleRefresh}
          sx={{ height: 40 }}
        >
          {trans.verifyEmailAlreadyVerified}
        </AppButton>
      </Box>
    </Box>
  );
}
