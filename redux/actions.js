import { SIGN_IN } from "./actionsConstant";

export const signinUser = (enteredEmaiPassword) => {
  return {
    type: SIGN_IN,
    payload: enteredEmaiPassword,
  };
};
