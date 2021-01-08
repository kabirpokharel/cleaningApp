import { checkUser } from "./authReduceFunc";

const initialState = {
  isLoading: true,
  isSignedIn: false,
  currentUser: null,
  error: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      const user = checkUser(action.payload);
      return {
        ...state,
        isSignedIn: !!user,
        currentUser: user,
        isLoading: false,
        error: !!user && "Invalid login, please try again",
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
