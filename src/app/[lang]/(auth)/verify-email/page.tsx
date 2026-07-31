import { Suspense } from "react";
import VerifyEmailView from "@/views/auth/verify-email/VerifyEmailView";

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailView />
    </Suspense>
  );
}
