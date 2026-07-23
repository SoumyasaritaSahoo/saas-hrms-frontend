// Trimmed for the onboarding-wizard port: the source onboarding.service.ts
// also had Get_Postal_Details, Save_Organization, Save_Location,
// Save_Admin_User, and Register_Workspace — none of those are called by
// the actual OnboardingView wizard (src/views/onboarding/index.tsx), which
// only ever dispatches RegisterUser. Only Register_User is kept here.
import * as HttpService from "../http.services";

import { REGISTER_USER } from "../url.services";

export const Register_User = (data: any) => {
  return HttpService.post(REGISTER_USER(), data);
};
