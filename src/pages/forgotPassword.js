import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Container,
  Alert,
} from "@mui/material";
import { authConfirmPasswordSlice } from "../redux/authSlice/auth.slice"; // Import the confirm password slice
import LoginImage from "../assets/Login Illustration 1.svg"; // Use the same image or a different one
import Grid from "@mui/material/Grid2";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    newPassword: Yup.string().required("Required"),
    confirmationCode: Yup.string().required("Confirmation code is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmationCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setErrorMessage(""); // Clear previous error messages
      try {
        // Dispatch the confirm password action
        await dispatch(
          authConfirmPasswordSlice({
            username: values.email,
            newPassword: values.newPassword,
            confirmationCode: values.confirmationCode,
          })
        ).unwrap();

        // Navigate to a success or confirmation page
        navigate("/login"); // Change to your desired route after success
      } catch (error) {
        setErrorMessage("Failed to update password. Please try again."); // Set error message
      }
    },
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        size={{ sm: 4, md: 6 }}
        sx={{ height: "100vh", overflow: "hidden" }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
          }}
          src={LoginImage}
          alt="Login Illustration"
        />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 8, md: 6 }}
        component={Box}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card sx={{ padding: 4, width: "65%", borderRadius: "50px" }}>
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: "#153060", fontWeight: "600" }}
                >
                  Update Password
                </Typography>
                {errorMessage && ( // Show error message if it exists
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage}
                  </Alert>
                )}
                <form onSubmit={formik.handleSubmit}>
                  <Box mb={2}>
                    <Typography sx={{ color: "#153060", fontWeight: "500" }}>
                      User Name
                    </Typography>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      type="email"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Box>

                  <Box mb={2}>
                    <Typography sx={{ color: "#153060", fontWeight: "500" }}>
                      New Password
                    </Typography>
                    <TextField
                      fullWidth
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.newPassword}
                      error={
                        formik.touched.newPassword &&
                        Boolean(formik.errors.newPassword)
                      }
                      helperText={
                        formik.touched.newPassword && formik.errors.newPassword
                      }
                    />
                  </Box>

                  <Box mb={2}>
                    <Typography sx={{ color: "#153060", fontWeight: "500" }}>
                      Enter Confirmation Code
                    </Typography>
                    <TextField
                      fullWidth
                      id="confirmationCode"
                      name="confirmationCode"
                      type="text"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmationCode}
                      error={
                        formik.touched.confirmationCode &&
                        Boolean(formik.errors.confirmationCode)
                      }
                      helperText={
                        formik.touched.confirmationCode &&
                        formik.errors.confirmationCode
                      }
                    />
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      width: "100%",
                      padding: 1,
                      color: "#fff",
                      fontSize: "18px",
                      fontWeight: 500,
                      background: "linear-gradient(180deg, #13BECF 0%, #455869 100%)",
                    }}
                    variant="contained"
                    color="primary"
                    disabled={formik.isSubmitting}
                  >
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
