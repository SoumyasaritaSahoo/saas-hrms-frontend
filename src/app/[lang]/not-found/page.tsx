"use client";

import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTranslation } from "@/contexts/TranslationContext";

export default function NotFoundPage() {
  const router = useRouter();
  const { trans } = useTranslation();

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
          background: "linear-gradient(135deg, #f56d0e, #d95a06)",
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
        {trans.notFoundTitle}
      </Box>
      <Box
        sx={{
          mb: 4,
          fontSize: 15,
          color: "text.secondary",
          maxWidth: 400,
        }}
      >
        {trans.notFoundDescription}
      </Box>
      <Button
        variant="contained"
        onClick={() => router.back()}
        sx={{
          height: 48,
          px: 4,
          borderRadius: "10px",
          fontWeight: 700,
          fontSize: 15,
          textTransform: "none",
          background: "linear-gradient(135deg, #f56d0e 0%, #d95a06 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #d95a06 0%, #b54604 100%)",
          },
        }}
      >
        {trans.notFoundGoBack}
      </Button>
    </Box>
  );
}
