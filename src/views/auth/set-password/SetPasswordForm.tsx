"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme, alpha } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CheckIcon from "@mui/icons-material/CheckOutlined";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";

import AppTypography from "@/components/ui/AppTypography";
import AppTextField from "@/components/ui/AppTextField";
import AppAlert from "@/components/ui/AppAlert";
import { validatePassword } from "@/utils/password";
import { PASSWORD_PATTERNS, PASSWORD_MIN_LENGTH } from "@/lib/passwordRules";
import { dispatch } from "@/app/redux/store";
import { ResetPassword } from "@/app/redux/slices/Auth/auth";
import { useToast } from "@/components/ui/ToastProvider";
import { useTranslation } from "@/contexts/TranslationContext";
import { getLocalizedPath } from "@/path";

export default function SetPasswordForm() {
  const router = useRouter();
  const theme = useTheme();
  const toast = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { trans, lang } = useTranslation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const passwordRules = [
    { label: trans.min8Chars, key: "length" as const },
    { label: trans.uppercaseLetter, key: "uppercase" as const },
    { label: trans.number, key: "digit" as const },
    { label: trans.specialCharacter, key: "specialChar" as const },
  ];

  const ruleTest = (key: string, val: string) => {
    if (key === "length") return val.length >= PASSWORD_MIN_LENGTH;
    return (
      PASSWORD_PATTERNS[key as keyof typeof PASSWORD_PATTERNS]?.test(val) ??
      false
    );
  };

  const validate = () => {
    const err = validatePassword(password, confirmPassword);
    if (err) {
      setError(err);
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!token) {
      setError(trans.setPasswordInvalidToken);
      return;
    }
    setLoading(true);
    try {
      const res: any = await dispatch(ResetPassword({ token, password }));
      if (res?.status) {
        toast.success(trans.setPasswordUpdated);
        router.push(getLocalizedPath("/dashboard", lang));
      } else {
        const errMsg =
          typeof res?.message === "string"
            ? res.message
            : (res?.message?.message ?? trans.setPasswordFailed);
        toast.error(trans.setPasswordFailedTitle, errMsg);
      }
    } catch {
      toast.error(trans.setPasswordError);
    } finally {
      setLoading(false);
    }
  };

  // ── Form ──────────────────────────────────────────────────────
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <AppTypography
        variant="h4"
        sx={{ fontWeight: 700, color: "text.primary", lineHeight: "32px" }}
      >
        {trans.setPasswordTitle ?? "Set New Password"}
      </AppTypography>
      <AppTypography
        variant="body2"
        sx={{ mt: 0.5, mb: 3.5, color: "text.secondary" }}
      >
        {trans.setPasswordInstruction}
      </AppTypography>

      {error && (
        <Box sx={{ mb: 2 }}>
          <AppAlert type="error">{error}</AppAlert>
        </Box>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* NEW PASSWORD */}
        <AppTextField
          label={`${trans.setPasswordNewLabel ?? "New Password"} *`}
          placeholder={
            trans.setPasswordNewPlaceholder ?? "Create a strong password"
          }
          type={showPass ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowPass(!showPass)}
                    tabIndex={-1}
                    edge="end"
                  >
                    {showPass ? (
                      <VisibilityOffRoundedIcon
                        sx={{ fontSize: 18, color: "text.disabled" }}
                      />
                    ) : (
                      <VisibilityRoundedIcon
                        sx={{ fontSize: 18, color: "text.disabled" }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* CONFIRM PASSWORD */}
        <AppTextField
          label={`${trans.setPasswordConfirmLabel ?? "Confirm Password"} *`}
          placeholder={
            trans.setPasswordConfirmPlaceholder ?? "Re-enter your password"
          }
          type={showConfirmPass ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    tabIndex={-1}
                    edge="end"
                  >
                    {showConfirmPass ? (
                      <VisibilityOffRoundedIcon
                        sx={{ fontSize: 18, color: "text.disabled" }}
                      />
                    ) : (
                      <VisibilityRoundedIcon
                        sx={{ fontSize: 18, color: "text.disabled" }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        {password.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: { xs: "wrap", md: "nowrap" },
              gap: "8px 16px",
              my: 1.5,
              justifyContent: "center",
            }}
          >
            {passwordRules.map((r) => {
              const ok = ruleTest(r.key, password);
              return (
                <AppTypography
                  key={r.key}
                  variant="caption"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    whiteSpace: "nowrap",
                    color: ok
                      ? theme.palette.mode === "dark"
                        ? theme.palette.success.main
                        : theme.palette.primary.main
                      : alpha(theme.palette.text.primary, 0.35),
                  }}
                >
                  {ok ? (
                    <CheckIcon sx={{ fontSize: 14 }} />
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ fontSize: 14 }} />
                  )}
                  {r.label}
                </AppTypography>
              );
            })}
          </Box>
        )}

        {/* UPDATE BUTTON */}
        <Box
          component="button"
          type="submit"
          disabled={loading}
          sx={{
            mt: "12px",
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
            transition: "background-color 0.15s ease",
            "&:hover": {
              bgcolor: loading
                ? theme.palette.primary.main
                : theme.palette.primary.dark,
            },
          }}
        >
          {loading ? (
            <CircularProgress
              size={18}
              sx={{ color: theme.palette.primary.contrastText }}
            />
          ) : (
            <>
              {trans.setPasswordUpdate}
              <ArrowForwardRoundedIcon sx={{ fontSize: 18, color: "#fff" }} />
            </>
          )}
        </Box>
      </Box>

      {/* BACK LINK */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 9 }}>
        <Link
          href={getLocalizedPath("/login", lang)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            textDecoration: "none",
          }}
        >
          <ArrowBackRoundedIcon
            sx={{ fontSize: 18, color: "var(--color-back-link)" }}
          />
          <AppTypography
            variant="body2"
            sx={{
              color: "var(--color-back-link)",
              fontWeight: 600,
            }}
          >
            {trans.setPasswordBackToSignIn}
          </AppTypography>
        </Link>
      </Box>
    </Box>
  );
}
