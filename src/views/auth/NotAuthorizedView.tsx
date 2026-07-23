"use client";

import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from "next/navigation";
import AppButton from "@/components/ui/AppButton";
import { gradients } from "@/lib/theme";
import { useTranslation } from "@/contexts/TranslationContext";

type NotAuthorizedViewProps = {
  message?: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function NotAuthorizedView({
  message,
  actionLabel,
  actionHref,
}: NotAuthorizedViewProps) {
  const theme = useTheme();
  const router = useRouter();
  const { trans } = useTranslation();
  const resolvedMessage = message ?? trans.notAuthorizedMessage;
  const resolvedActionLabel = actionLabel ?? trans.notAuthorizedActionLabel;

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
        <LockIcon sx={{ fontSize: 36, color: theme.palette.common.white }} />
      </Box>
      <Box
        sx={{
          fontSize: { xs: 96, md: 128 },
          fontWeight: 800,
          lineHeight: 1,
          background: gradients.primary,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.04em",
        }}
      >
        401
      </Box>
      <Box
        sx={{
          mt: -1,
          mb: 1,
          fontSize: { xs: 18, md: 24 },
          fontWeight: 700,
          color: "text.primary",
        }}
      >
        {trans.notAuthorizedTitle}
      </Box>
      <Box
        sx={{
          mb: 4,
          color: "text.secondary",
          maxWidth: 420,
        }}
      >
        {resolvedMessage}
      </Box>
      <AppButton
        brandVariant="primary"
        onClick={() => {
          if (actionHref) {
            router.push(actionHref);
          } else {
            router.back();
          }
        }}
        sx={{ height: 48, px: 4 }}
      >
        {actionHref ? resolvedActionLabel : trans.notAuthorizedGoBack}
      </AppButton>
    </Box>
  );
}
