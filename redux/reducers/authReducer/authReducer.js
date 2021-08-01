import { checkUser } from './authReducerFunc';

const initialState = {
  // isLoading: true,
  isSignedIn: false,
  currentUser: {
    // "message": "Successful login",
    // "type": "success",
    // "shortid": "DVGeKlbeD",
    // "role": "user",
    // "email": "kabirpokharel12@gmail.com"
  },
  error: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SIGN_IN':
      return {
        ...state,
        isSignedIn: true,
        currentUser: payload,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignedIn: false,
        currentUser: null,
        // isLoading: false,
      };
    default:
      return state;
  }
};

export default auth;
