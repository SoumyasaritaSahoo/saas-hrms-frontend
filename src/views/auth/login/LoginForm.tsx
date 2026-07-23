"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import InputAdornment from "@mui/material/InputAdornment";

import AppTypography from "@/components/ui/AppTypography";
import AppTextField from "@/components/ui/AppTextField";
import AppButton from "@/components/ui/AppButton";
import { dispatch } from "@/app/redux/store";
import { SignIn } from "@/app/redux/slices/Auth/auth";
import { useToast } from "@/components/ui/ToastProvider";
import { useTranslation } from "@/contexts/TranslationContext";
import { getLocalizedPath } from "@/path";
import { APP_NAME } from "@/lib/constants";

interface LoginFormData {
  email: string;
  password: string;
  keepSignedIn: boolean;
}

export default function LoginForm() {
  const theme = useTheme();
  const toast = useToast();
  const [showPass, setShowPass] = useState(false);

  const router = useRouter();
  const { trans, lang } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: { email: "", password: "", keepSignedIn: false },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response: any = await dispatch(
        SignIn({
          email: data.email,
          password: data.password,
          keepSignedIn: data.keepSignedIn,
        }),
      );

      if (response?.status) {
        router.push(getLocalizedPath("/dashboard", lang));
      } else {
        toast.error(
          response?.message?.message ??
            response?.message ??
            "Invalid email or password",
        );
      }
    } catch (error) {
      console.error("Login Error", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* HEADER */}
      <AppTypography
        variant="h4"
        sx={{ fontWeight: 700, color: "text.primary", lineHeight: "32px" }}
      >
        {trans.signInToWorkspace ?? "Sign in to your workspace"}
      </AppTypography>
      <AppTypography
        variant="body2"
        sx={{ mt: 0.5, mb: 3.5, color: "text.secondary" }}
      >
        {trans.enterCredentials ?? "Enter your credentials to continue"}
      </AppTypography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Fields stack — 16px gap between each field block */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* EMAIL */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: trans.emailRequired,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: trans.enterValidEmail,
              },
            }}
            render={({ field }) => (
              <AppTextField
                {...field}
                label={`${trans.workEmail ?? "Work Email"} *`}
                placeholder="jane@company.com"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          {/* PASSWORD */}
          <Controller
            name="password"
            control={control}
            rules={{ required: trans.passwordRequired }}
            render={({ field }) => (
              <AppTextField
                {...field}
                label={`${trans.password ?? "Password"} *`}
                placeholder="••••••••"
                type={showPass ? "text" : "password"}
                error={!!errors.password}
                helperText={errors.password?.message}
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
            )}
          />
          <Link
            href={getLocalizedPath("/forgot-password", lang)}
            style={{ textDecoration: "none", alignSelf: "flex-end" }}
          >
            <AppTypography
              variant="body2"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              {trans.forgotPassword ?? "Forgot password?"}
            </AppTypography>
          </Link>

          {/* SIGN IN BUTTON */}
          <Box
            component="button"
            type="submit"
            disabled={isSubmitting}
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
              cursor: isSubmitting ? "default" : "pointer",
              opacity: isSubmitting ? 0.85 : 1,
              transition: "background-color 0.15s ease",
              "&:hover": {
                bgcolor: isSubmitting
                  ? theme.palette.primary.main
                  : theme.palette.primary.dark,
              },
            }}
          >
            {isSubmitting ? (
              <CircularProgress
                size={18}
                sx={{ color: theme.palette.primary.contrastText }}
              />
            ) : (
              <>
                {trans.signIn ?? "Sign in"}
                <ArrowForwardRoundedIcon sx={{ fontSize: 18, color: "#fff" }} />
              </>
            )}
          </Box>
        </Box>
      </Box>

      {/* DIVIDER */}
      <Box sx={{ display: "flex", alignItems: "center", my: 3.5 }}>
        <Box sx={{ flex: 1, height: "1px", bgcolor: theme.palette.divider }} />
        <AppTypography
          variant="caption"
          sx={{ px: 1.75, color: "text.disabled", whiteSpace: "nowrap" }}
        >
          {trans.newToOptiHR?.replace("{appName}", APP_NAME) ??
            `New to ${APP_NAME}?`}
        </AppTypography>
        <Box sx={{ flex: 1, height: "1px", bgcolor: theme.palette.divider }} />
      </Box>

      {/* CREATE ACCOUNT */}
      <AppButton
        brandVariant="tertiary"
        onClick={() => router.push(getLocalizedPath("/onboarding", lang))}
        sx={{ width: "100%", minHeight: 48 }}
      >
        {trans.createFreeAccount ?? "Create a free account"}
      </AppButton>

      {/* FOOTER */}
      <AppTypography
        variant="caption"
        sx={{
          display: "block",
          mt: 3,
          textAlign: "center",
          color: "text.disabled",
        }}
      >
        {trans.protectedByMessage ?? "Protected by enterprise-grade security"}
      </AppTypography>
    </Box>
  );
}
