"use client";

import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import { AppButton } from "@/components";
import { gradients } from "@/lib/theme";

export default function NotFound() {
  const router = useRouter();

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
        404
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
        Page not found
      </Box>
      <Box
        sx={{
          mb: 4,
          fontSize: 15,
          color: "text.secondary",
          maxWidth: 400,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Box>
      <AppButton
        brandVariant="primary"
        onClick={() => router.push("/en/login")}
        sx={{ height: 48, px: 4 }}
      >
        Go Back
      </AppButton>
    </Box>
  );
}
