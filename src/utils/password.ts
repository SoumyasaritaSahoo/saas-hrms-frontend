import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_PATTERNS,
  PASSWORD_ERROR_MESSAGES,
} from "@/lib/passwordRules";

export function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= PASSWORD_MIN_LENGTH) score++;
  if (PASSWORD_PATTERNS.lowercase.test(password)) score++;
  if (PASSWORD_PATTERNS.uppercase.test(password)) score++;
  if (PASSWORD_PATTERNS.digit.test(password)) score++;
  if (PASSWORD_PATTERNS.specialChar.test(password)) score++;
  return score;
}

export function validatePassword(password: string, confirmPassword?: string): string | null {
  if (!password) return PASSWORD_ERROR_MESSAGES.required;
  if (password.length < PASSWORD_MIN_LENGTH) return PASSWORD_ERROR_MESSAGES.minLength;
  if (!PASSWORD_PATTERNS.lowercase.test(password)) return PASSWORD_ERROR_MESSAGES.lowercase;
  if (!PASSWORD_PATTERNS.uppercase.test(password)) return PASSWORD_ERROR_MESSAGES.uppercase;
  if (!PASSWORD_PATTERNS.digit.test(password)) return PASSWORD_ERROR_MESSAGES.digit;
  if (!PASSWORD_PATTERNS.specialChar.test(password)) return PASSWORD_ERROR_MESSAGES.specialChar;
  if (confirmPassword !== undefined) {
    if (!confirmPassword) return PASSWORD_ERROR_MESSAGES.confirmRequired;
    if (password !== confirmPassword) return PASSWORD_ERROR_MESSAGES.mismatch;
  }
  return null;
}
