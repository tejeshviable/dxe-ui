import axiosInstance from "../../components/utils/axiosInstance";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const authLoginThunk = async (data) => {
  try {
    const response = await axiosInstance.post("login", data);
    console.log("response", response);
    const { idToken } = response.data;
    localStorage.setItem("idToken", idToken);
    const tokenData = jwtDecode(idToken);
    localStorage.setItem("decodeToken", tokenData);

    return tokenData; // You can return more data if needed
  } catch (error) {
    // Handle errors
    toast.error(
      "Login failed: " + error.response?.data?.message ||
        "Something went wrong!"
    );
    // return rejectWithValue(error.response?.data?.message || "Something went wrong!");
  }
};

export const authForgotThunk = async (username) => {
  try {
    const response = await axiosInstance.post(
      `forget-password?username=${username}`
    );
    console.log("response", response);

    // Assuming the API returns a success message
    toast.success("Password reset link sent successfully.");

    return response.data; // You can return more data if needed
  } catch (error) {
    // Handle errors
    toast.error(
      "Failed to send password reset link: " +
        (error.response?.data?.message || "Something went wrong!")
    );
    // Optionally return a rejection if needed
    // return rejectWithValue(error.response?.data?.message || "Something went wrong!");
  }
};

export const authConfirmPasswordThunk = async ({
  username,
  newPassword,
  confirmationCode,
}) => {
  try {
    const response = await axiosInstance.post(
      `confirm-password?username=${username}&newPassword=${newPassword}&confirmationCode=${confirmationCode}`
    );
    console.log("response", response);

    toast.success("Password updated successfully.");

    return response.data; // You can return more data if needed
  } catch (error) {
    toast.error(
      "Failed to update password: " +
        (error.response?.data?.message || "Something went wrong!")
    );
  }
};
