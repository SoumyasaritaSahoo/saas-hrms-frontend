"use client";

import { Box, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Lottie from "lottie-react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardOutlined";
import onboardCompleteAnimation from "@/images/onboard-complete.json";
import { useTranslation } from "@/contexts/TranslationContext";

interface Props {
  firstName: string;
  onGoToDashboard: () => void;
}

export default function StepWelcome({ firstName, onGoToDashboard }: Props) {
  const theme = useTheme();
  const { trans } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: 100, md: 150 },
          height: { xs: 100, md: 150 },
        }}
      >
        <Lottie
          animationData={onboardCompleteAnimation}
          autoplay
          loop={false}
        />
      </Box>

      <Box sx={{ mt: 4.5 }}>
        <Box
          sx={{
            fontSize: { xs: 34, sm: 40, md: 48 },
            fontWeight: 300,
            lineHeight: 1.15,
            color: alpha(theme.palette.text.primary, 0.7),
          }}
        >
          Welcome aboard,
        </Box>
        <Box
          sx={{
            fontSize: { xs: 34, sm: 40, md: 48 },
            fontWeight: 700,
            lineHeight: 1.15,
            mt: 0.5,
            color: theme.palette.primary.main,
          }}
        >
          {firstName}!
        </Box>
      </Box>

      <Box
        component="button"
        onClick={onGoToDashboard}
        sx={{
          mt: 5,
          px: 5,
          py: 1.75,
          borderRadius: "16px",
          border: "none",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 1.5,
          fontSize: 16,
          fontWeight: 700,
          lineHeight: 1,
          color: "#fff",
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          boxShadow: `0 8px 28px ${alpha(theme.palette.primary.main, 0.3)}`,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: `0 12px 36px ${alpha(theme.palette.primary.main, 0.4)}`,
          },
          "&:active": {
            transform: "translateY(0)",
          },
        }}
      >
        {trans.gotodashboard ?? "Go To Dashboard"}
        <ArrowForwardIcon sx={{ fontSize: 20 }} />
      </Box>
    </Box>
  );
}
