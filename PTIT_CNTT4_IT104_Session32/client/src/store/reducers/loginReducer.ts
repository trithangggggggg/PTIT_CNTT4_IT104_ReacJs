interface LoginState {
  email: string | null;
  isLoggedIn: boolean;
}

const initialState: LoginState = {
  email: null,
  isLoggedIn: false,
};

export const loginReducer = (state = initialState, action: any): LoginState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        email: action.payload,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        email: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
