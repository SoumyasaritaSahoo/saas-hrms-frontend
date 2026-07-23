"use client";

import { Stack, Box, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardOutlined";
import AppButton from "@/components/ui/AppButton";
import { useTranslation } from "@/contexts/TranslationContext";

interface Props {
  onNext?: () => void;
  nextLabel?: string;
  isLoading?: boolean;
  showEnterHint?: boolean;
}

export default function StepActionBar({
  onNext,
  nextLabel,
  isLoading,
  showEnterHint = true,
}: Props) {
  const theme = useTheme();
  const { trans } = useTranslation();
  const resolvedLabel = nextLabel ?? trans.next;

  return (
    <Stack
      direction="row"
      sx={{
        pt: 4,
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {onNext && (
        <AppButton
          brandVariant="primary"
          onClick={onNext}
          disabled={isLoading}
          endIcon={
            !isLoading ? (
              <ArrowForwardIcon
                sx={{ fontSize: 15, color: "inherit" }}
              />
            ) : undefined
          }
        >
          {isLoading ? trans.creatingAccount : resolvedLabel}
        </AppButton>
      )}

      {showEnterHint && !isLoading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            whiteSpace: "nowrap",
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: 12,
              fontWeight: 400,
              fontFamily: "Inter, sans-serif",
              color: alpha(theme.palette.text.primary, 0.2),
              lineHeight: "18px",
            }}
          >
            {trans.orPress}
          </Box>
          <Box
            sx={{
              bgcolor: alpha(theme.palette.text.primary, 0.08),
              borderRadius: 0.5,
              outline: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
              outlineOffset: -1,
              px: 1,
              py: 0.25,
              fontSize: 12,
              fontWeight: 400,
              fontFamily: "Cousine, monospace",
              color: alpha(theme.palette.text.primary, 0.4),
              lineHeight: "16px",
            }}
          >
            {trans.enterKey} ↵
          </Box>
        </Box>
      )}
    </Stack>
  );
}
