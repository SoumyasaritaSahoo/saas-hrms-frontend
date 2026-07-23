"use client";

import { Box, useTheme } from "@mui/material";
import AppTypography from "@/components/ui/AppTypography";
import { alpha } from "@mui/material/styles";
import AppLogo from "@/components/ui/AppLogo";
import AppButton from "@/components/ui/AppButton";
import { paths, getLocalizedPath } from "@/path";
import { useTranslation } from "@/contexts/TranslationContext";

interface Props {
  currentStep: number;
  totalSteps: number;
}

export default function OnboardingHeader({ currentStep, totalSteps }: Props) {
  const { trans, lang } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, sm: 3, md: 5 },
        pt: 3,
      }}
    >
      <AppLogo size="lg" />

      <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
        <AppTypography
          sx={{
            fontSize: 12,
            fontWeight: 400,
            color: alpha(theme.palette.text.primary, 0.35),
            lineHeight: "18px",
          }}
        >
          {currentStep} / {totalSteps}
        </AppTypography>
        <AppButton
          brandVariant="secondary"
          href={getLocalizedPath(paths.auth.login, lang)}
        >
          {trans.signInInstead}
        </AppButton>
      </Box>
    </Box>
  );
}
