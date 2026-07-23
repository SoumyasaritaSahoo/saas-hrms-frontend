"use client";

import { TranslationProvider } from "@/contexts/TranslationContext";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TranslationProvider>{children}</TranslationProvider>;
}
