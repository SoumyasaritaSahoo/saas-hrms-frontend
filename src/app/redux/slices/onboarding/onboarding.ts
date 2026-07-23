import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

import { Register_User } from "../../../../../services/Onboarding/onboarding.service";
import { setUserLogin } from "../Auth/auth";
import { setAxiosCompanyId } from "../../../../../services/http.services";

const cookies = new Cookies();

const initialState = {
  isLoading: false,
  error: null,
};

const OnboardingSlice = createSlice({
  name: "onboarding",

  initialState,

  reducers: {
    startLoading(state: any) {
      state.isLoading = true;
    },

    hasError(state: any, action: any) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { startLoading, hasError } = OnboardingSlice.actions;

export function RegisterUser(data: {
  first_name: string;
  last_name: string;
  middle_name?: string;
  email: string;
  password: string;
}) {
  return async (dispatch: any) => {
    dispatch(startLoading());

    try {
      const response: any = await Register_User(data);

      if (response?.status) {
        const payload = response.data?.data ?? response.data;
        const { token, user: profile } = payload;

        dispatch(
          setUserLogin({
            user: profile,
            company: profile.company ?? null,
            accessToken: token ?? null,
            role: profile.roles?.[0] ?? null,
            permissions:
              profile.roles?.flatMap(
                (role: any) =>
                  role.role_permissions?.map((rp: any) => rp.permission?.key) ?? [],
              ) ?? [],
          } as any),
        );

        if (profile.company?.id) {
          setAxiosCompanyId(profile.company.id);
        }

        cookies.set("isAuth", "true", {
          path: "/",
          domain: process.env.NEXT_PUBLIC_SESSION_DOMAIN?.replace(/"/g, ""),
        });

        return { payload: { success: true } };
      }

      const errorData: any = response?.message;
      const errorMessage = typeof errorData === 'object' ? errorData?.message : errorData;
      const errorCode = errorData?.error_code;
      dispatch(hasError(errorMessage));
      return { payload: { success: false, message: errorMessage, error_code: errorCode } };
    } catch (error: any) {
      dispatch(hasError(error));
      return { payload: { success: false, message: error?.message } };
    }
  };
}

export const { reducer } = OnboardingSlice;
