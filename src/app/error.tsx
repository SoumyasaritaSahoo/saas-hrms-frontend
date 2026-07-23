"use client";

import { useEffect } from "react";
import Box from "@mui/material/Box";
import { AppButton } from "@/components";
import { gradients } from "@/lib/theme";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
        component="span"
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
        500
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
        Something went wrong
      </Box>
      <Box
        sx={{
          mb: 4,
          fontSize: 15,
          color: "text.secondary",
          maxWidth: 400,
        }}
      >
        An unexpected error occurred. Please try again.
      </Box>
      <AppButton
        brandVariant="primary"
        onClick={reset}
        sx={{ height: 48, px: 4 }}
      >
        Try Again
      </AppButton>
    </Box>
  );
}
