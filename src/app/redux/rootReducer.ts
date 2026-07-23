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
    console.error(error);
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
