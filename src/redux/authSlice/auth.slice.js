import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  authLoginThunk,
  authForgotThunk,
  authConfirmPasswordThunk,
} from "./auth.thunk";

// Create async thunk for login
export const authLoginSlice = createAsyncThunk("auth/login", authLoginThunk);

// Create async thunk for forgot password
export const authForgotSlice = createAsyncThunk(
  "auth/forgotPassword",
  authForgotThunk
);

// Create async thunk for confirm password
export const authConfirmPasswordSlice = createAsyncThunk(
  "auth/confirmPassword",
  authConfirmPasswordThunk
);

const initialState = {
  token: null,
  data: null,
  status: "idle",
  error: null,
  forgotPasswordStatus: "idle", // Track status for forgot password
  forgotPasswordError: null, // Track error for forgot password
  confirmPasswordStatus: "idle", // Track status for confirm password
  confirmPasswordError: null, // Track error for confirm password
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login extra reducers
    builder
      .addCase(authLoginSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authLoginSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(authLoginSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Forgot password extra reducers
      .addCase(authForgotSlice.pending, (state) => {
        state.forgotPasswordStatus = "loading";
      })
      .addCase(authForgotSlice.fulfilled, (state) => {
        state.forgotPasswordStatus = "succeeded";
        state.forgotPasswordError = null; // Clear any previous errors
      })
      .addCase(authForgotSlice.rejected, (state, action) => {
        state.forgotPasswordStatus = "failed";
        state.forgotPasswordError = action.error.message;
      })

      // Confirm password extra reducers
      .addCase(authConfirmPasswordSlice.pending, (state) => {
        state.confirmPasswordStatus = "loading";
      })
      .addCase(authConfirmPasswordSlice.fulfilled, (state) => {
        state.confirmPasswordStatus = "succeeded";
        state.confirmPasswordError = null; // Clear any previous errors
      })
      .addCase(authConfirmPasswordSlice.rejected, (state, action) => {
        state.confirmPasswordStatus = "failed";
        state.confirmPasswordError = action.error.message;
      });
  },
});

export default loginSlice.reducer;
