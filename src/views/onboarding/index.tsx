"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";

import { paths, getLocalizedPath } from "@/path";
import { RegisterUser } from "@/app/redux/slices/onboarding/onboarding";
import { useTranslation } from "@/contexts/TranslationContext";
import { useToast } from "@/components/ui/ToastProvider";

import OnboardingLayout from "./steps/OnboardingLayout";
import StepFirstName from "./steps/StepFirstName";
import StepLastName from "./steps/StepLastName";
import StepMiddleName from "./steps/StepMiddleName";
import StepWorkEmail from "./steps/StepWorkEmail";
import StepPassword from "./steps/StepPassword";
import StepWelcome from "./steps/StepWelcome";
import {
  clearOnboardingCookies,
  saveOnboardingCookie,
  getOnboardingCookie,
} from "../../utils/cookies";

const TOTAL_STEPS = 5;

interface FormData {
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
}

export default function OnboardingView() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const { trans } = useTranslation();
  const toast = useToast();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [skippedSteps, setSkippedSteps] = useState<number[]>([]);

  const [formData, setFormData] = useState<FormData>(() => {
    const saved = getOnboardingCookie("registration");
    return (
      saved ?? { firstName: "", lastName: "", middleName: null, email: "" }
    );
  });

  const persistAndAdvance = (update: Partial<FormData>) => {
    const next = { ...formData, ...update };
    setFormData(next);
    saveOnboardingCookie("registration", next);
    setStep((s) => s + 1);
  };

  const handleFirstName = (firstName: string) =>
    persistAndAdvance({ firstName });

  const handleLastName = (lastName: string) => persistAndAdvance({ lastName });

  const handleMiddleName = (middleName: string | null) => {
    if (middleName === null) setSkippedSteps((s) => [...s, 2]); // step index 2 = middle name
    persistAndAdvance({ middleName });
  };

  const handleEmail = (email: string) => persistAndAdvance({ email });

  const handlePassword = async (password: string) => {
    setIsLoading(true);
    try {
      const result = await dispatch(
        RegisterUser({
          first_name: formData.firstName,
          last_name: formData.lastName,
          middle_name: formData.middleName ?? undefined,
          email: formData.email,
          password,
        }),
      );

      if (result?.payload?.success) {
        clearOnboardingCookies();
        setStep(6);
      } else if (result?.payload?.error_code === "COMPANY_ALREADY_EXISTS") {
        clearOnboardingCookies();
        router.push(getLocalizedPath(paths.auth.onboardingCompanyExists, lang));
      } else {
        toast.error(result?.payload?.message || trans.registrationFailed);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleGoToDashboard = () => {
    router.push(getLocalizedPath(paths.dashboard, lang));
  };

  return (
    <OnboardingLayout
      currentStep={step === 6 ? TOTAL_STEPS : step}
      totalSteps={TOTAL_STEPS}
      completedSteps={step - 1}
      skippedSteps={skippedSteps}
      onBack={step > 1 && step < 6 ? back : undefined}
      hideDots={step === 6}
    >
      {step === 1 && (
        <StepFirstName
          onNext={handleFirstName}
          defaultValue={formData.firstName}
        />
      )}
      {step === 2 && (
        <StepLastName
          firstName={formData.firstName}
          onNext={handleLastName}
          defaultValue={formData.lastName}
        />
      )}
      {step === 3 && (
        <StepMiddleName
          onNext={handleMiddleName}
          defaultValue={formData.middleName}
        />
      )}
      {step === 4 && (
        <StepWorkEmail
          firstName={formData.firstName}
          onNext={handleEmail}
          defaultValue={formData.email}
        />
      )}
      {step === 5 && (
        <StepPassword onSubmit={handlePassword} isLoading={isLoading} />
      )}
      {step === 6 && (
        <StepWelcome
          firstName={formData.firstName}
          onGoToDashboard={handleGoToDashboard}
        />
      )}
    </OnboardingLayout>
  );
}
