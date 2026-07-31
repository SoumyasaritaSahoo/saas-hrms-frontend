"use client";

import { useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme, alpha } from "@mui/material/styles";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackOutlined";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import AppTypography from "@/components/ui/AppTypography";
import AppTextField from "@/components/ui/AppTextField";
import AppAlert from "@/components/ui/AppAlert";
import { dispatch } from "@/app/redux/store";
import { ForgotPassword } from "@/app/redux/slices/Auth/auth";
import { errMsg } from "@/utils/error";
import { useToast } from "@/components/ui/ToastProvider";
import { useTranslation } from "@/contexts/TranslationContext";
import { getLocalizedPath } from "@/path";

export default function ForgotPasswordForm() {
  const theme = useTheme();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { trans, lang } = useTranslation();

  const validate = () => {
    if (!email) {
      setError(trans.forgotEmailRequired);
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(trans.forgotEnterValidEmail);
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const res: any = await dispatch(ForgotPassword({ email }));

      if (res?.status) {
        setSubmitted(true);
        toast.success(trans.forgotResetSent);
      } else {
        toast.error(errMsg(res, trans.forgotFailed));
      }
    } catch (err) {
      toast.error(trans.forgotFailed);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const res: any = await dispatch(ForgotPassword({ email }));
      if (res?.status) {
        toast.success(trans.forgotResetSent);
      } else {
        toast.error(errMsg(res, trans.forgotFailed));
      }
    } catch (err) {
      toast.error(trans.forgotFailed);
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ─────────────────────────────────────────────
  if (submitted) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}>
        <Box
          className="animate-fade-in-up"
          sx={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            bgcolor: alpha(theme.palette.primary.main, 0.12),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
            "--delay": "0s",
          }}>
          <ForwardToInboxOutlinedIcon
            sx={{
              color: theme.palette.primary.main,
              fontSize: 48,

            }}
          />
        </Box>

        <AppTypography
          variant="h2"
          className="animate-fade-in-up"
          sx={{ fontWeight: 700, color: "text.primary", lineHeight: "28px", "--delay": "0.08s" }}>
          {trans.forgotCheckEmail}
        </AppTypography>

        <AppTypography
          variant="body2"
          className="animate-fade-in-up"
          sx={{ mt: 3, mb: 3.75, color: "text.secondary", maxWidth: 340, "--delay": "0.14s" }}>
          {trans.forgotSentPrefix ??
            "We've sent a password reset link to your registered email address."}
        </AppTypography>

        <Box
          className="animate-fade-in-up"
          sx={{
            px: 2,
            py: 0.75,
            borderRadius: "999px",
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            mb: 3.75,
            "--delay": "0.2s",
          }}>
          <AppTypography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}>
            {email}
          </AppTypography>
        </Box>

        <Box
          component="button"
          type="button"
          onClick={() => window.open(`mailto:${email}`, "_blank")}
          disabled={loading}
          className="animate-fade-in-up"
          sx={{
            width: "100%",
            height: 48,
            borderRadius: "14px",
            border: "none",
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontSize: 15,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.85 : 1,
            boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.28)}`,
            transition:
              "background-color .2s ease, transform .15s ease, box-shadow .2s ease",
            "--delay": "0.26s",
            "&:hover": {
              bgcolor:
                loading ?
                  theme.palette.primary.main
                : theme.palette.primary.dark,
              transform: loading ? "none" : "translateY(-2px)",
              boxShadow: loading
                ? `0 4px 14px ${alpha(theme.palette.primary.main, 0.28)}`
                : `0 10px 24px ${alpha(theme.palette.primary.main, 0.38)}`,
            },
            "&:active": {
              transform: loading ? "none" : "translateY(0) scale(0.98)",
            },
          }}>
          {trans.forgotOpenEmailApp ?? "Open Email App"}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mt: 3.75,
          }}>
          <AppTypography variant="body2" sx={{ color: "text.secondary" }}>
            {trans.forgotDidntReceive ?? "Didn't receive the email?"}
          </AppTypography>
          <Box
            component="button"
            type="button"
            onClick={handleResend}
            disabled={loading}
            sx={{
              background: "none",
              border: "none",
              p: 0,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "underline",
              color: theme.palette.primary.main,
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}>
            {trans.forgotResend}
          </Box>
        </Box>

        <Link
          href={getLocalizedPath("/login", lang)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            textDecoration: "none",
            marginTop: 80,
          }}>
          <ArrowBackRoundedIcon
            sx={{ fontSize: 18, color: "var(--color-back-link)" }}
          />
          <AppTypography
            variant="body2"
            sx={{
              color: "var(--color-back-link)",
              fontWeight: 600,
            }}>
            {trans.forgotBackToSignIn}
          </AppTypography>
        </Link>
      </Box>
    );
  }

  // ── Form state ────────────────────────────────────────────────
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            bgcolor: alpha(theme.palette.primary.main, 0.12),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
          }}>
          <EmailOutlinedIcon
            sx={{
              color: theme.palette.primary.main,
              fontSize: 48,
            }}
          />
        </Box>
      </Box>
      <AppTypography variant="body2" sx={{ mb: 3.75, color: "text.secondary" }}>
        {trans.forgotInstruction}
      </AppTypography>

      {error && (
        <Box sx={{ mb: 2 }}>
          <AppAlert type="error">{error}</AppAlert>
        </Box>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* EMAIL */}
        <AppTextField
          label={`${trans.workEmail ?? "Work Email"} *`}
          placeholder="jane@company.com"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />

        {/* SUBMIT BUTTON */}
        <Box
          component="button"
          type="submit"
          disabled={loading}
          sx={{
            mt: 2,
            width: "100%",
            height: 48,
            borderRadius: "14px",
            border: "none",
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontSize: 15,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.75,
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.85 : 1,
            boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.28)}`,
            transition:
              "background-color .2s ease, transform .15s ease, box-shadow .2s ease",
            "&:hover": {
              bgcolor:
                loading ?
                  theme.palette.primary.main
                : theme.palette.primary.dark,
              transform: loading ? "none" : "translateY(-2px)",
              boxShadow: loading
                ? `0 4px 14px ${alpha(theme.palette.primary.main, 0.28)}`
                : `0 10px 24px ${alpha(theme.palette.primary.main, 0.38)}`,
            },
            "&:active": {
              transform: loading ? "none" : "translateY(0) scale(0.98)",
            },
          }}>
          {loading ?
            <CircularProgress
              size={18}
              sx={{ color: theme.palette.primary.contrastText }}
            />
          : trans.forgotSendReset}
        </Box>
      </Box>

      {/* BACK LINK */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Link
          href={getLocalizedPath("/login", lang)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            textDecoration: "none",
          }}>
          <ArrowBackRoundedIcon
            sx={{ fontSize: 18, color: "var(--color-back-link)" }}
          />
          <AppTypography
            variant="body2"
            sx={{
              color: "var(--color-back-link)",
              fontWeight: 600,
            }}>
            {trans.forgotBackToSignIn}
          </AppTypography>
        </Link>
      </Box>
    </Box>
  );
}
