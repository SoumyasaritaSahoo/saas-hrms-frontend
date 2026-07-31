import * as HttpService from "../http.services";

import {
  LOGIN,
  LOGOUT,
  CHECK_USER_EXISTS,
  GET_USER_ROLES,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  VERIFY_EMAIL,
  RESEND_VERIFICATION,
  GET_PROFILE,
  UPDATE_PROFILE,
} from "../url.services";

// NOTE: the source file also exported Upload_Profile_Documents,
// Delete_Profile_Document, Update_Profile_Document, Upload_Profile_Picture
// and Delete_Profile_Picture. Profile-document/picture management is a
// separate feature from core auth and wasn't ported (the ported backend's
// UserController doesn't expose those endpoints either).

export const Check_User_Exists = (data: { email: string }) => {
  return HttpService.postWithAuthToken(CHECK_USER_EXISTS(), data);
};

export const Sign_in = (data: { email: string; password: string }) => {
  return HttpService.postWithAuthToken(LOGIN(), data);
};

export const Sign_out = () => {
  return HttpService.postWithAuthToken(LOGOUT(), {});
};

export const Get_User_Roles = () => {
  return HttpService.getWithAuthToken(GET_USER_ROLES());
};
export const Forgot_Password = (data: { email: string }) => {
  return HttpService.postWithAuthToken(FORGOT_PASSWORD(), data);
};

export const Reset_Password = (data: { token: string; password: string }) => {
  return HttpService.postWithAuthToken(RESET_PASSWORD(), data);
};

export const Verify_Email = (data: { token: string }) => {
  return HttpService.postWithAuthToken(VERIFY_EMAIL(), data);
};

export const Resend_Verification = (data: { email: string }) => {
  return HttpService.postWithAuthToken(RESEND_VERIFICATION(), data);
};

export const Get_Profile = () => {
  return HttpService.getWithAuthToken(GET_PROFILE());
};

export const Update_Profile = (data: Record<string, any>) => {
  return HttpService.putWithAuthToken(UPDATE_PROFILE(), data);
};
