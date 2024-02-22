import {
  Login,
  Register,
  LogOut,
  LoadUser,
  ClearError,
} from "../constants/user.jsx";
export const userReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case Login.Success:
    case Register.Success:
    case LoadUser.Success:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LogOut.Success:
      return {
        loading: false,
        isLogin: false,
        user: null,
      };
    case Login.Fail:
    case Register.Fail:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LoadUser.Fail:
      return {
        loading: false,
        isLogin: false,
        user: null,
        error: action.payload,
      };
    case LogOut.Fail:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ClearError:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
