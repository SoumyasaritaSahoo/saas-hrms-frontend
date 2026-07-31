// Trimmed for the auth-only port: the source rootReducer registered a
// slice per feature vertical (common, role, department, designation,
// employee, location, locationType, holiday, leaveType, leavePolicy,
// leaveRequest, leaveBalance, attendanceShift, attendanceLog,
// attendanceRegularization, dashboard). Only the auth slice was ported,
// plus onboarding (added back for the onboarding wizard port).
import { combineReducers } from "@reduxjs/toolkit";
import { encryptTransform } from "redux-persist-transform-encrypt";

import storage from "./storage";

import { reducer as AuthReducer } from "./slices/Auth/auth";
import { reducer as OnboardingReducer } from "./slices/onboarding/onboarding";

if (!process.env.NEXT_PUBLIC_REDUX_SECRET) {
  throw new Error(
    "NEXT_PUBLIC_REDUX_SECRET must be set to encrypt persisted redux state",
  );
}

const encryptor = encryptTransform({
  secretKey: process.env.NEXT_PUBLIC_REDUX_SECRET,

  onError(error) {
    // A decrypt failure means the persisted blob in localStorage predates
    // the current NEXT_PUBLIC_REDUX_SECRET (or is otherwise corrupted) and
    // can never be recovered. Purge it so the next load starts clean
    // instead of getting stuck. Logged via `warn`, not `error` — Next.js's
    // dev overlay treats `console.error` as a page-blocking crash even
    // though this case is already handled and non-fatal.
    console.warn("Discarding unreadable persisted redux state:", error);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(`persist:${rootPersistConfig.key}`);
    }
  },
});

export const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  transforms: [encryptor],
};

export const rootReducer = combineReducers({
  auth: AuthReducer,
  onboarding: OnboardingReducer,
});
