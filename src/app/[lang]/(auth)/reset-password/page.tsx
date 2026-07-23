import { Suspense } from "react";
import SetPasswordForm from "@/views/auth/set-password/SetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <SetPasswordForm />
    </Suspense>
  );
}
