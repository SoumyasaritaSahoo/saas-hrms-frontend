"use client";

import { Box, Button, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import AmbientBackground from "./AmbientBackground";
import OnboardingHeader from "./OnboardingHeader";
import StepBreadcrumbs from "./StepBreadcrumbs";
import ProgressDots from "./ProgressDots";

interface Props {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  completedSteps?: number;
  skippedSteps?: number[];
  onBack?: () => void;
  hideDots?: boolean;
}

export default function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  completedSteps = 0,
  skippedSteps = [],
  onBack,
  hideDots = false,
}: Props) {
  const theme = useTheme();

  const progressPct = `${(currentStep / totalSteps) * 100}%`;

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AmbientBackground />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          height: 2,
          bgcolor: alpha(theme.palette.text.primary, 0.06),
        }}
      >
        <Box
          sx={{
            width: progressPct,
            height: 2,
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
            borderRadius: 999,
            transition: "width 0.4s ease",
          }}
        />
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <OnboardingHeader currentStep={currentStep} totalSteps={totalSteps} />
        {currentStep < totalSteps && (
          <StepBreadcrumbs
            completedSteps={completedSteps}
            skippedSteps={skippedSteps}
          />
        )}

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 2, sm: 3, md: 5 },
            py: 6,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 576 }}>
            {currentStep < totalSteps && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 4,
                }}
              >
                {onBack && (
                  <Button
                    onClick={onBack}
                    sx={{
                      minWidth: 28,
                      width: 28,
                      height: 28,
                      p: 0,
                      borderRadius: 1.25,
                      bgcolor: alpha(theme.palette.text.primary, 0.06),
                      outline: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
                      outlineOffset: -1,
                      "&:hover": {
                        bgcolor: alpha(theme.palette.text.primary, 0.1),
                      },
                    }}
                  >
                    <ArrowBackIosNewIcon
                      sx={{
                        fontSize: 14,
                        color: alpha(theme.palette.text.primary, 0.5),
                      }}
                    />
                  </Button>
                )}
                <ProgressDots
                  current={currentStep}
                  total={totalSteps}
                  completed={completedSteps}
                />
              </Box>
            )}

            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
