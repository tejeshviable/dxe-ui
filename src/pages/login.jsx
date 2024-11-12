import React, { useEffect, useState } from "react";
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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { authForgotSlice, authLoginSlice, authTokenForDemoSlice } from "../redux/authSlice/auth.slice";
import LoginImage from "../assets/Login Illustration 1.svg";
import Grid from "@mui/material/Grid2";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [rememberMe, setRememberMe] = useState(false);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail && savedPassword) {
      formik.setValues({ email: savedEmail, password: savedPassword });
      setRememberMe(true);
    }
  }, []);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setErrorMessage(""); // Clear previous error messages
      const resultAction = await dispatch(authLoginSlice(values)).unwrap();

      console.log("resultAction", resultAction);
      if (resultAction) {
        if (rememberMe) {
          localStorage.setItem("email", values.email);
          localStorage.setItem("password", values.password);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }

        // console.log("resultAction",resultAction);

        const cognitoGroups = resultAction["cognito:groups"];

        if (cognitoGroups[0] === "DataProvider") {
          navigate("/data-request");
        } else {
          navigate("/dashboard");
        }

        // For Demo 

        dispatch(authTokenForDemoSlice())

      } else {
        // Handle login failure
        setErrorMessage("Login failed. Please check your credentials."); // Set error message
      }
    },
  });

  const handleForgotPasswordClick = async () => {
    if (!formik.values.email) {
      formik.setTouched({ email: true });
      formik.validateForm().then((errors) => {
        if (errors.email) {
          // setErrorMessage("User Name is required");
        }
      });
      return;
    }

    try {
      await dispatch(authForgotSlice(formik.values.email)); // Dispatch the forgot password thunk
      navigate("/forgot-password");
    } catch (error) {
      setErrorMessage("Failed to send password reset link.");
    }
  };

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
        ></img>
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
                  Welcome Back
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
                      Password
                    </Typography>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      type="password"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                    <FormControlLabel
                      sx={{ fontSize: "14px", fontWeight: "400" }}
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={handleRememberMeChange}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              color: "#153060",
                            },
                          }}
                        />
                      }
                      label="Remember me on this computer"
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
                    Login
                  </Button>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      onClick={handleForgotPasswordClick}
                      sx={{
                        paddingTop: 4,
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#F2451C",
                        cursor: "pointer",
                        display: "inline-block",
                      }}
                    >
                      Forgot Password?
                    </Typography>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;