"use client";

import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import { useColorScheme } from "@/components/ColorSchemeContext";
import { APP_NAME } from "@/lib/constants";
import LightLogoImg from "@/images/logo-light.png";
import DarkLogoImg from "@/images/logo-dark.png";

type LogoSize = "sm" | "md" | "lg";

type AppLogoProps = {
  size?: LogoSize;
  href?: string;
  alt?: string;
  sx?: SxProps<Theme>;
};

const dimensions: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 120, height: 30 },
  md: { width: 149, height: 37 },
  lg: { width: 180, height: 39 },
};

export default function AppLogo({
  size = "md",
  href,
  alt = `${APP_NAME} Logo`,
  sx,
}: AppLogoProps) {
  const { mode } = useColorScheme();
  const { width, height } = dimensions[size];

  const logoSrc = mode === "dark" ? LightLogoImg : DarkLogoImg;

  const logo = (
    <Image
      src={logoSrc}
      alt={alt}
      width={width}
      height={height}
      priority
      style={{ display: "block" }}
    />
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none", lineHeight: 0 }}>
        <Box sx={sx}>{logo}</Box>
      </Link>
    );
  }

  return <Box sx={sx}>{logo}</Box>;
}
