"use client";

import { createContext, useContext, useMemo } from "react";
import { useParams } from "next/navigation";
import en from "@/locales/en.json";
import hi from "@/locales/hi.json";

const translations: Record<string, Record<string, string>> = { en, hi };

interface TranslationValue {
  trans: Record<string, string>;
  lang: string;
}

const TranslationContext = createContext<TranslationValue>({
  trans: translations.en,
  lang: "en",
});

export function TranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const lang = (params?.lang as string) || "en";

  const value = useMemo(
    () => ({
      trans: translations[lang] || translations.en,
      lang,
    }),
    [lang],
  );

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
