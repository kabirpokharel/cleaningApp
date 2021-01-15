import { checkUser } from "./authReducerFunc";

const initialState = {
  isLoading: true,
  isSignedIn: false,
  currentUser: {},
  error: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      const user = checkUser(action.payload);
      const loginSuccessful = !!Object.keys(user).length;
      console.log("this is user from redux!!!!!=====>", user);
      return {
        ...state,
        isSignedIn: loginSuccessful,
        currentUser: user,
        isLoading: false,
        error: loginSuccessful ? null : "Invalid login, please try again",
      };

    case "SIGN_OUT":
      return {
        ...state,
        isSignedIn: false,
        currentUser: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default auth;
