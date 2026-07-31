import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

import {
  Sign_in,
  Sign_out,
  Check_User_Exists,
  Forgot_Password,
  Reset_Password,
  Verify_Email,
  Resend_Verification,
  Get_Profile,
  Update_Profile,
} from "../../../../../services/Auth/auth.service";
import { setAxiosCompanyId } from "../../../../../services/http.services";
// NOTE: the source slice also imported `pauseTimer` from
// "@/hooks/useAttendanceTimer" and called it in SignOut() to pause the
// attendance timer on logout. Attendance is a separate feature vertical
// that wasn't ported, so that import/call was dropped here.

const cookies = new Cookies();

const initialState = {
  isLoading: false,
  error: null,

  isAuthenticated: false,

  user: null,
  accessToken: null,

  company: null,

  role: null,
  permissions: [],

  userExists: null,
};

const AuthSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    startLoading: (state: any) => {
      state.isLoading = true;
    },

    hasError: (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    setUserLogin: (state: any, action: any) => {
      state.isLoading = false;

      state.user = action.payload?.user || null;
      state.accessToken = action.payload?.accessToken || null;

      state.company = action.payload?.company || null;

      state.role = action.payload?.role || null;
      state.permissions = action.payload?.permissions || [];

      state.isAuthenticated = true;
    },

    setUserLogout: (state: any) => {
      state.isLoading = false;

      state.user = null;
      state.accessToken = null;
      state.company = null;

      state.role = null;
      state.permissions = [];

      state.isAuthenticated = false;
    },

    setUserCheck: (state: any, action: any) => {
      state.isLoading = false;

      state.userExists = action.payload?.exists ?? false;
    },
    setCompany: (state: any, action: any) => {
      state.company = action.payload;
    },

    clearCompany: (state: any) => {
      state.company = null;
    },

    setPermissions: (state: any, action: any) => {
      state.permissions = action.payload ?? [];
    },

    forgotPasswordSuccess(state: any) {
      state.isLoading = false;
    },

    setUserProfile: (state: any, action: any) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const {
  startLoading,
  hasError,
  setUserLogin,
  setUserLogout,
  setUserCheck,
  setCompany,
  clearCompany,
  forgotPasswordSuccess,
  setPermissions,
  setUserProfile,
} = AuthSlice.actions;

/**
 * Login
 */
const COOKIE_OPTIONS = {
  path: "/",
  domain: process.env.NEXT_PUBLIC_SESSION_DOMAIN?.replace(/"/g, ""),
  secure: true,
  sameSite: "strict" as const,
};

export function SignIn(data: {
  email: string;
  password: string;
  keepSignedIn?: boolean;
}) {
  return async (dispatch: any) => {
    dispatch(startLoading());

    try {
      const response: any = await Sign_in({ email: data.email, password: data.password });

      if (response?.status) {
        const profileResponse: any = await Get_Profile();

        const profile = profileResponse?.data?.data ?? profileResponse?.data;

         dispatch(
           setUserLogin({
             user: profile,
             company: profile.company ?? null,
             accessToken: null,
             role: profile.roles?.[0] ?? null,
             permissions:
               profile.roles?.flatMap(
                 (role: any) =>
                   role.role_permissions?.map(
                     (rp: any) => rp.permission?.key,
                   ) ?? [],
               ) ?? [],
           } as any),
         );

        if (profile.company?.id) {
          setAxiosCompanyId(profile.company.id);
        }

        cookies.set("isAuth", "true", {
          ...COOKIE_OPTIONS,
          expires: data.keepSignedIn
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            : undefined,
        });
      }

      return response;
    } catch (error: any) {
      dispatch(hasError(error));

      return error;
    }
  };
}

/**
 * Logout
 */
export function SignOut() {
  return async (dispatch: any) => {
    dispatch(startLoading());

    try {
      const response: any = await Sign_out();

      dispatch(setUserLogout());
      cookies.remove("isAuth", COOKIE_OPTIONS);

      return response;
    } catch (error: any) {
      dispatch(hasError(error));

      return error;
    }
  };
}

/**
 * Check User Exists
 */
export function CheckUserExists(data: { email: string }) {
  return async (dispatch: any) => {
    dispatch(startLoading());

    try {
      const response: any = await Check_User_Exists(data);

      dispatch(setUserCheck(response.data));

      return response;
    } catch (error: any) {
      dispatch(hasError(error));

      return error;
    }
  };
}
export function ForgotPassword(data: { email: string }) {
  return async (dispatch: any) => {
    dispatch(startLoading());

    try {
      const response: any = await Forgot_Password(data);

      if (response?.status) {
        dispatch(forgotPasswordSuccess());
      }

      return response;
    } catch (error: any) {
      dispatch(hasError(error));
      return error;
    }
  };
}
export function ResetPassword(data: { token: string; password: string }) {
  return async (dispatch: any) => {
    dispatch(startLoading());

    try {
      const response: any = await Reset_Password(data);

      if (response?.status) {
        cookies.set("isAuth", "true", COOKIE_OPTIONS);

        const profileResponse: any = await Get_Profile();
        const profile = profileResponse?.data?.data ?? profileResponse?.data;

        dispatch(
          setUserLogin({
            user: profile,
            company: profile.company ?? null,
            accessToken: null,
            role: profile.roles?.[0] ?? null,
            permissions:
              profile.roles?.flatMap(
                (role: any) =>
                  role.role_permissions?.map(
                    (rp: any) => rp.permission?.key,
                  ) ?? [],
              ) ?? [],
          } as any),
        );

        if (profile.company?.id) {
          setAxiosCompanyId(profile.company.id);
        }
      }

      return response;
    } catch (error: any) {
      dispatch(hasError(error));
      return error;
    }
  };
}


export function VerifyEmail(data: { token: string }) {
  return async (dispatch: any) => {
    dispatch(startLoading());

    try {
      const response: any = await Verify_Email(data);

      if (response?.status) {
        await dispatch(GetProfile());
        dispatch(forgotPasswordSuccess());
      } else {
        dispatch(hasError(response?.message));
      }

      return response;
    } catch (error: any) {
      dispatch(hasError(error));
      return error;
    }
  };
}

export function ResendVerification(data: { email: string }) {
  return async (dispatch: any) => {
    dispatch(startLoading());

    try {
      const response: any = await Resend_Verification(data);

      if (response?.status) {
        dispatch(forgotPasswordSuccess());
      } else {
        dispatch(hasError(response?.message));
      }

      return response;
    } catch (error: any) {
      dispatch(hasError(error));
      return error;
    }
  };
}

export function RefreshPermissions() {
  return async (dispatch: any) => {
    try {
      const profileResponse: any = await Get_Profile();
      const profile = profileResponse?.data?.data ?? profileResponse?.data;
      const permissions: string[] =
        profile.roles?.flatMap(
          (role: any) =>
            role.role_permissions?.map(
              (rp: any) => rp.permission?.key,
            ) ?? [],
        ) ?? [];
      dispatch(setPermissions(permissions as any));
    } catch {
      // silently fail — stale permissions are acceptable
    }
  };
}

export function UpdateUserProfile(data: Record<string, any>) {
  return async (dispatch: any) => {
    try {
      const response: any = await Update_Profile(data);
      if (response?.status) {
        const updated = response?.data?.data ?? response?.data;
        if (updated) dispatch(setUserProfile(updated));
      }
      return response;
    } catch (error: any) {
      return error;
    }
  };
}

export function GetProfile() {
  return async (dispatch: any) => {
    dispatch(startLoading());
    try {
      const response: any = await Get_Profile();
      if (response?.status) {
        const profile = response?.data?.data ?? response?.data;
        if (profile) dispatch(setUserProfile(profile));
      }
      return response;
    } catch (error: any) {
      dispatch(hasError(error?.message ?? "Failed to fetch profile"));
      return error;
    }
  };
}

export const { reducer } = AuthSlice;
