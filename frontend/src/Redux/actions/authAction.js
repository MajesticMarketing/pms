import api from "../api.js";
import {
  UpdatePassword,
  Login,
  Register,
  LoadUser,
  LogOut,
  ClearError,
} from "../constants/user.jsx";

// login User
export const loginUser = (email, password) => async (dispatch) => {
  console.log(email, password);
  try {
    let link = `/auth/login`;
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await api.post(link, { email, password }, config);
    console.log(data, "User Login Data from Action");
    dispatch({ type: Login.Success, payload: data });
  } catch (error) {
    dispatch({ type: Login.Fail, payload: error.message });
  }
};
// register User
export const registerUser =
  (firstName, lastName, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: Register.Request,
      });
      let link = `/auth/register`;
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await api.post(
        link,
        {
          firstName,
          lastName,
          email,
          password,
        },
        config
      );
      console.log("Registered User Data : ", data);
      dispatch({
        type: Register.Success,
        payload: data,
      });
      localStorage.setItem("token", JSON.stringify(data.token));
    } catch (error) {
      dispatch({ type: Register.Fail, payload: error.response.data.message });
    }
  };
export const logoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    let link = `/auth/logout`;
    await api.get(link);
    dispatch({ type: LogOut.Success });
  } catch (error) {
    dispatch({ type: LogOut.Fail });
  }
};

// get user profile
export const loadSingleUser = () => async (dispatch) => {
  try {
    localStorage.setItem("token");
    let link = `/user/:id`;
    const { data } = await api.get(link);
    if (data) {
      dispatch({
        type: LoadUser.Success,
        payload: data.user,
      });
    } else {
      dispatch({
        type: LoadUser.Fail,
      });
    }
  } catch (error) {
    dispatch({ type: LoadUser.Fail, payload: error.message });
  }
};
// UPDATE Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UpdatePassword.Request });
    let link = `/password/update`;
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await api.put(link, passwords, config);

    dispatch({ type: UpdatePassword.Success, payload: data.success });
  } catch (error) {
    dispatch({
      type: UpdatePassword.Fail,
      payload: error.response.data.message,
    });
  }
};

// Clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: ClearError });
};
