"use client";

import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { usePathname } from "next/navigation";

import AppLogo from "@/components/ui/AppLogo";
import { TranslationProvider } from "@/contexts/TranslationContext";

import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";

const cards = [
  {
    icon: <BarChartRoundedIcon sx={{ fontSize: 20 }} />,
    header: "Real-time workforce analytics",
    description: "Track headcount, turnover, and performance in real time.",
  },
  {
    icon: <CalendarMonthOutlinedIcon sx={{ fontSize: 20 }} />,
    header: "Attendance & Leave managed easily",
    description: "Approve requests, track balances, and sync calendars.",
  },
  {
    icon: <GroupsOutlinedIcon sx={{ fontSize: 20 }} />,
    header: "Centralized employee management",
    description: "One place for profiles, documents, and lifecycle changes.",
  },
  {
    icon: <BoltOutlinedIcon sx={{ fontSize: 20 }} />,
    header: "AI-Powered Insights",
    description: "Predictive signals to help you act before issues escalate.",
  },
];

function AuthContent({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const pathname = usePathname();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
      }}>
      {/* ── Left: Brand panel ───────────────────────────────── */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "45%",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
          bgcolor: isDark ? "#080D1E" : alpha("#C9DAF6", 0.5),
        }}>
        {/* Top-left decorative glow */}
        <Box
          className="animate-float-blob"
          sx={{
            position: "absolute",
            top: 30,
            left: -20,
            width: 288,
            height: 288,
            borderRadius: "9999px",
            opacity: 0.2,
            pointerEvents: "none",
            "--delay": "0s",
            background:
              isDark ?
                "radial-gradient(70.71% 70.71% at 50% 50%, #8B5CF6 0%, rgba(0,0,0,0) 100%)"
              : "radial-gradient(70.71% 70.71% at 50% 50%, #6C63FF 0%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Bottom-right decorative glow */}
        <Box
          className="animate-float-blob"
          sx={{
            position: "absolute",
            bottom: -10,
            right: -10,
            width: 224,
            height: 224,
            borderRadius: "9999px",
            opacity: 0.15,
            pointerEvents: "none",
            "--delay": "-3s",
            animationDuration: "13s",
            background:
              isDark ?
                "radial-gradient(70.71% 70.71% at 50% 50%, #F97316 0%, rgba(0,0,0,0) 100%)"
              : "radial-gradient(70.71% 70.71% at 50% 50%, #F97316 0%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* ── Content column ─────────────────────────────── */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            px: 6,
            pt: 6,
            pb: 6,
            display: "flex",
            flexDirection: "column",
          }}>
          {/* Logo */}
          <Box
            className="animate-fade-in-up"
            sx={{ display: "flex", justifyContent: "flex-start", "--delay": "0s" }}>
            <AppLogo size="md" />
          </Box>

          {/* Heading + subtitle + cards */}
          <Box
            sx={{
              mt: 18,
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}>
            {/* Heading */}
            <Box
              className="animate-fade-in-up"
              sx={{
                fontWeight: 700,
                fontSize: 36,
                lineHeight: "43.2px",
                letterSpacing: 0,
                "--delay": "0.1s",
              }}>
              <Box
                component="span"
                sx={{
                  color: isDark ? theme.palette.common.white : "#080D1E",
                  display: "block",
                }}>
                Welcome back to your
              </Box>
              <Box
                component="span"
                className="animate-gradient-text"
                sx={{
                  display: "block",
                  background:
                    "linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #6366F1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                people platform
              </Box>
            </Box>

            {/* Subtitle */}
            <Box
              className="animate-fade-in-up"
              sx={{
                mt: "-8px",
                fontWeight: 400,
                fontSize: 15,
                lineHeight: "22px",
                color: isDark ? alpha(theme.palette.common.white, 0.65) : "#5B6B85",
                maxWidth: 580,
                "--delay": "0.2s",
              }}>
              Everything you need to manage, engage, and grow your workforce all
              in one place.
            </Box>

            {/* 4 cards (2x2 grid) */}
            <Box
              sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
              }}>
              {cards.map((card, i) => (
                <Box
                  key={i}
                  className="animate-fade-in-up"
                  sx={{
                    minHeight: 180,
                    p: 2.5,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "18px",
                    bgcolor: isDark ? "#161B2C" : theme.palette.background.paper,
                    border:
                      isDark ?
                        `1px solid ${alpha(theme.palette.common.white, 0.06)}`
                      : `1px solid ${theme.palette.divider}`,
                    boxShadow:
                      isDark ?
                        "0 10px 25px rgba(0,0,0,.25)"
                      : "0px 10px 30px rgba(15,23,42,.08)",
                    transition: "transform .3s ease, box-shadow .3s ease",
                    "--delay": `${0.3 + i * 0.08}s`,
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow:
                        isDark ?
                          "0 16px 34px rgba(0,0,0,.35)"
                        : "0px 16px 38px rgba(15,23,42,.12)",
                    },
                    "&:hover .auth-card-icon": {
                      transform: "scale(1.1) rotate(-4deg)",
                    },
                  }}>
                  {/* Icon */}
                  <Box
                    className="auth-card-icon"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: alpha(theme.palette.primary.main, 0.14),
                      color: theme.palette.primary.main,
                      mb: 2.5,
                      transition: "transform .3s ease",
                    }}>
                    {card.icon}
                  </Box>

                  {/* Heading */}
                  <Box
                    sx={{
                      fontSize: 16,
                      fontWeight: 700,
                      lineHeight: 1.25,
                      color: isDark ? theme.palette.common.white : theme.palette.text.primary,
                      mb: 1.2,
                    }}>
                    {card.header}
                  </Box>

                  {/* Description */}
                  <Box
                    sx={{
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: isDark ? alpha(theme.palette.common.white, 0.65) : theme.palette.text.secondary,
                    }}>
                    {card.description}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Right: Form panel ───────────────────────────────── */}
      <Box
        sx={{
          width: { xs: "100%", md: "55%" },
          height: { xs: "100dvh", md: "100vh" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: { xs: 2, md: 6 },
          pt: { xs: 2, md: 6 },
          pb: 6,
          bgcolor: theme.palette.background.paper,
          overflow: "auto",
        }}>
        {/* Mobile: Logo */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            width: "100%",
            mb: 10,
          }}>
          <AppLogo size="lg" />
        </Box>

        <Box
          key={pathname}
          className="animate-fade-in-up"
          sx={{
            mt: { xs: 0, md: "185px" },
            mb: "auto",
            width: "100%",
            maxWidth: 448,
            "--delay": "0.05s",
          }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TranslationProvider>
      <AuthContent>{children}</AuthContent>
    </TranslationProvider>
  );
}
