import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo:
      localStorage.getItem("user") !== undefined
        ? JSON.parse(localStorage.getItem("user"))
        : undefined,
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    isLoading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.userInfo = action.payload.user;
      state.isLoading = false;
      state.accessToken = action.payload.tokens.access.token;
      state.refreshToken = action.payload.tokens.refresh.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    initialiseUser: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  initialiseUser,
  updateUserInfo,
} = userSlice.actions;
export default userSlice.reducer;
