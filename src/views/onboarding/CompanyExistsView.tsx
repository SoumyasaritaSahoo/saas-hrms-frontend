"use client";

import { useParams } from "next/navigation";
import { Box, useTheme } from "@mui/material";
import AppTypography from "@/components/ui/AppTypography";
import { alpha } from "@mui/material/styles";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import AppLogo from "@/components/ui/AppLogo";
import AppButton from "@/components/ui/AppButton";
import { paths, getLocalizedPath } from "@/path";
import { APP_NAME, APP_EMAIL } from "@/lib/constants";
import AmbientBackground from "./steps/AmbientBackground";
import StepFooter from "./steps/StepFooter";
import { useTranslation } from "@/contexts/TranslationContext";

export default function CompanyExistsView() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const theme = useTheme();
  const { trans } = useTranslation();

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
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header — matches OnboardingHeader layout */}
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

          <AppButton
            brandVariant="secondary"
            href={getLocalizedPath(paths.auth.login, lang)}
          >
            {trans.signInInstead}
          </AppButton>
        </Box>

        {/* Content */}
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
            {/* Heading — same two-line style as all onboarding steps */}
            <Box>
              <AppTypography
                sx={{
                  fontSize: { xs: 40, md: 48 },
                  fontWeight: 300,
                  lineHeight: 1.2,
                  color: alpha(theme.palette.text.primary, 0.85),
                }}
              >
                <Box component="span" sx={{ fontWeight: 700 }}>
                  {trans.companyExists?.replace("{appName}", APP_NAME)}
                </Box>
              </AppTypography>
            </Box>

            {/* Subtitle */}
            <AppTypography
              sx={{
                fontSize: 14,
                color: alpha(theme.palette.text.primary, 0.35),
                mt: 2,
                mb: 0,
                fontFamily: "Inter, sans-serif",
                lineHeight: 1.6,
                maxWidth: 420,
              }}
            >
              Someone from your organisation has already registered. Reach out
              to our sales team and we&apos;ll help you get the right access.
            </AppTypography>

            {/* Action buttons — same spacing as StepActionBar */}
            <Box
              sx={{
                pt: 4,
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <AppButton
                brandVariant="secondary"
                href={`mailto:${APP_EMAIL}`}
                startIcon={<EmailOutlinedIcon />}
              >
                {trans.contactSales}
              </AppButton>
            </Box>
          </Box>
        </Box>

        <StepFooter />
      </Box>
    </Box>
  );
}
