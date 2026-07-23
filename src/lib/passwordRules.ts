export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_PATTERNS = {
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  digit: /\d/,
  specialChar: /[^a-zA-Z0-9]/,
} as const;

export const PASSWORD_ERROR_MESSAGES = {
  required: "Password is required",
  minLength: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
  lowercase: "Password must contain a lowercase letter",
  uppercase: "Password must contain an uppercase letter",
  digit: "Password must contain a number",
  specialChar: "Password must contain a special character",
  confirmRequired: "Confirm your password",
  mismatch: "Passwords do not match",
} as const;
