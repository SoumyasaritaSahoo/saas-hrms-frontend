"use client";

import { Stack, Box, useTheme } from "@mui/material";
import AppTypography from "@/components/ui/AppTypography";
import { alpha } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/CheckOutlined";
import { useTranslation } from "@/contexts/TranslationContext";

const STEP_KEYS: string[] = [
  "onboardingbreadcrumStep1",
  "onboardingbreadcrumStep2",
  "onboardingbreadcrumStep3",
  "onboardingbreadcrumStep4",
  "onboardingbreadcrumStep5",
];

interface Props {
  completedSteps: number;
  skippedSteps?: number[];
}

export default function StepBreadcrumbs({ completedSteps, skippedSteps = [] }: Props) {
  const theme = useTheme();
  const { trans } = useTranslation();

  if (completedSteps === 0) return null;

  return (
    <Stack
      direction="row"
      useFlexGap
      sx={{ px: { xs: 2, sm: 3, md: 5 }, pt: 1.5, pb: 0.5, flexWrap: "wrap", gap: 1 }}
    >
      {STEP_KEYS.slice(0, completedSteps).map((key, i) => {
        const skipped = skippedSteps.includes(i);
        const label = (trans as Record<string, string>)[key];
        return (
          <Box
            key={i}
            sx={{
              px: 1.5,
              py: 0.75,
              borderRadius: 999,
              bgcolor: alpha(theme.palette.primary.main, 0.15),
              outline: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
              outlineOffset: -1,
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CheckIcon
              sx={{
                fontSize: 10,
                color: theme.palette.primary.light,
              }}
            />
            <AppTypography
              sx={{
                fontSize: 10,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                lineHeight: "13.33px",
                color: "text.secondary",
              }}
            >
              {label}
              {skipped && ` (${trans.skipped})`}
            </AppTypography>
          </Box>
        );
      })}
    </Stack>
  );
}
