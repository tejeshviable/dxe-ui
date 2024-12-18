import React, { useState } from 'react'
import { Autocomplete, Box, Button, Card, CircularProgress, TextField, Typography } from '@mui/material'
import Grid from "@mui/material/Grid2";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { fetchIpiFicationAuthPostSlice, fetchIpiFicationGetSlice, fetchIpiFicationPostSlice, fetchIpiFicationRespPostSlice, resendOtpSlice, VerifyOtpSlice, VerifysmsOtpSmsSlice, VerifyWhatsAppOtpSlice } from '../../redux/teamSlice/team.slice';
import axios from 'axios';
import { toast } from 'react-toastify';
import IDALOGO from '../../assets/IDA_Logo.svg'
import RedirectIframe from './RedirectIframe';
import OTPInput from './Component/OTPInput';
import { encryption } from '../../helper/encryption';
import { useNavigate } from 'react-router-dom';
import { authIpificationLoginSlice } from '../../redux/authSlice/auth.slice';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: "0px",
      border: "0px solid #C5C5C5",
      height: "40px", // Updated height to 60px
      background: "#FFF",
      fontSize: '13px'
    },
    "& .MuiInputBase-input::placeholder": {
      backgroundColor: "#FFF", // Ensuring placeholder background is white
    },
    "& .MuiFormHelperText-root": {
      marginLeft: "0px",
      color: "red", // Ensure error messages are styled prominently
    },
  },
  selectField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: "0px",
      height: "40px", // Updated height to 60px
      background: "#FFF",
    },
    "& .MuiInputBase-input::placeholder": {
      backgroundColor: "#FFF", // Ensuring placeholder background is white
    },
  },
  label: {
    color: "#7C7C7C",
    fontWeight: 500,
    marginBottom: "2px",
    fontSize: "18px !important",
  },

  TypoHead: {
    color: "#455967",
    fontWeight: 500,
    marginBottom: "2px",
    fontSize: "14px !important",
  },
  Typo: {
    color: "#455967",
    fontWeight: 500,
    marginBottom: "2px",
    fontSize: "13px !important",
  },

  fetchButton: {
    borderRadius: '10px',
    color: '#FFFFFF !important',
    fontSize: '18px !important',
    background: 'linear-gradient(180deg, #13BECF 0%, #455869 100%)',
    padding: '8px 16px !important'
  }
}));

let openedWindow;

const channelFallbackList = [
  {
    label: 'SMS',
    value: 'sms',
  }
  // ,
  // {
  //   label: 'WhatsApp',
  //   value: 'whatsApp',
  // }
]

const Demopage = () => {

  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState("");
  const [txnId, setTxnId] = useState("");
  const [iframeUrl, setIframeUrl] = useState(null);
  const [AttriuteInputValue, setAttriuteInputValue] = useState('');
  const [otpPopup, setOtpPopup] = useState(false);
  const [otpInfo, setotpInfo] = useState('');

  const [loading, setLoading] = useState(false);
  const initialValues = {
    mobileNumber: "",
    fallbackChannel: [], // Ensure it's an array
    smsMobileNumber: "",
    whatsAppMobileNumber: "",
  };

  const validationSchema = Yup.object().shape({
    mobileNumber: Yup.string().required('Mobile number is required'),
    fallbackChannel: Yup.array()
      .of(Yup.string().oneOf(['sms', 'whatsApp']))
    // ,
    // smsMobileNumber: Yup.string().test(
    //   'smsMobileNumber',
    //   'SMS Mobile Number is required',
    //   function (value) {
    //     const { fallbackChannel } = this.parent;
    //     return fallbackChannel?.includes('sms') ? !!value : true;
    //   }
    // ),
    // whatsAppMobileNumber: Yup.string().test(
    //   'whatsAppMobileNumber',
    //   'WhatsApp Mobile Number is required',
    //   function (value) {
    //     const { fallbackChannel } = this.parent;
    //     return fallbackChannel?.includes('whatsApp') ? !!value : true;
    //   }
    // ),
  });


  const openRedirectWindow = (redirectUrl) => {
    console.log(redirectUrl);
    console.log("txnId in openRedirectWindow updated : ", txnId);
    // Parse the URL
    const parsedUrl = new URL(redirectUrl);

    // Extract the 'state' parameter
    const state = parsedUrl.searchParams.get("state");
    setTimeout(() => {
      openedWindow = window.open(redirectUrl, "", "width=200,height=200");
      handleSuccess(state);
    }, 10);
  }

  const handleSubmit = async (values) => {


    const payloadLogin = {
      username: 'pDo1PV8w1IRhtUPbY5J5GoecJxtcVxNvaadWUgmWO6xqtKkM',
      password: '3kimDwXFQMhZHclcNWvx1m2ffyvTPcwVXRj8yAM29rqIRPXFajJFC6PA9dO9Tuq1',
    }

    const workflow = [{
      channel: "silent_auth",
      mobileNumberTo: encryption(values.mobileNumber)
    },]

    // if (values.fallbackChannel.includes("sms")) {
    workflow.push({
      channel: "sms",
      // mobileNumberTo: encryption(values.smsMobileNumber)
      mobileNumberTo: encryption(values.mobileNumber)
    })
    // }

    if (values.fallbackChannel.includes("whatsApp")) {
      // workflow.push({
      //   channel: 'whatsApp',
      //   mobileNumberTo: encryption(values.whatsAppMobileNumber)
      // })
    }

    const payload = {
      brand: "IOH",
      workflow
    }

    const loginResult = await dispatch(authIpificationLoginSlice(payloadLogin)).unwrap();

    if (loginResult) {

      const result = await dispatch(fetchIpiFicationAuthPostSlice(payload)).unwrap();

      if (result) {
        console.log("result : ", result);
        console.log("txnId : ", result?.txnId);
        setTxnId(result?.txnId);
        setLoading(true);
        var redirectUrl = result?.redirectionUrl;
        setIframeUrl(redirectUrl);
        // openRedirectWindow(redirectUrl);
      }
      else {
        setLoading(false);

        if (openedWindow && !openedWindow.closed) {
          openedWindow.close();
          openedWindow = null;
        }

        console.log("error")
      }
    }

  }


  const handleSuccess = async (state) => {
    console.log("txnId in handleSuccess : ", state);
    const payload = { mobileNumber: encryption(mobile), requestId: state };
    console.log("payload in handleSuccess : ", payload);
    const successResult = await dispatch(fetchIpiFicationGetSlice(payload)).unwrap();
    console.log("Tejeshvi : " + successResult.status);
    if (successResult.status === null || successResult.status === undefined) {

      setTimeout(() => {
        handleSuccess(state);
      }, 100);
    } else if (successResult.status === 'OTP_SENT') {
      if (successResult.channel === 'sms') {
        setLoading(false);
        // toast.success("Call sms verify otp");
        setotpInfo(successResult);
        setOtpPopup(true);
      } else if (successResult.channel === 'whatsApp') {
        setLoading(false);
        // toast.success("Call whatsapp verify otp");
        setotpInfo(successResult);
        setOtpPopup(true);
      }
    } else {
      setLoading(false);

      if (openedWindow && !openedWindow.closed) {
        openedWindow.close();
        openedWindow = null;
      }

      if (successResult?.status == "true") {
        toast.success("Authentication successful");
        navigate('/login-success-page')
      } else {
        // toast.error(successResult?.errorMsg ? successResult?.errorMsg : "Not verified");
        toast.error("Not verified. We will send sms when ready");
      }
    }
  }

  const handleComplete = async (otp) => {

    const payload = {
      otp: encryption(otp),
      txnId: otpInfo?.txnId
    }
    // const whatsAppPayload = {
    //   otp: encryption(otp),
    //   mobileNumber: encryption(formik.values.whatsAppMobileNumber),
    //   txnId: otpInfo?.txnId
    // }

    // if (otpInfo?.channel === 'sms') {

    //   const smsResult = await dispatch(VerifysmsOtpSmsSlice(smsPayload)).unwrap();

    //   if (smsResult) {
    //     toast.success("Verified");
    //   }
    //   else {
    //     toast.error("Not verified. We will send sms when ready");
    //   }
    // }
    // else if (otpInfo?.channel === 'whatsApp') {

    //   const whatsAppResult = await dispatch(VerifyWhatsAppOtpSlice(whatsAppPayload)).unwrap();

    //   if (whatsAppResult) {
    //     // toast.success("Verified");

    //     if (whatsAppResult.status === 'VERIFICATION_PENDING') {
    //       toast.error(whatsAppResult.message);
    //     }
    //     else if (whatsAppResult.status === 'false') {
    //       toast.error(whatsAppResult.message);
    //       setOtpPopup(false);
    //       formik.resetForm();
    //     }
    //     else if (whatsAppResult.status === 'true') {
    //       toast.success(whatsAppResult.message);
    //       setOtpPopup(false);
    //       formik.resetForm();
    //     }

    //   }
    //   else {
    //     toast.error("Not verified. We will send sms when ready");
    //   }
    // }

    const result = await dispatch(VerifyOtpSlice(payload)).unwrap();

    if (result) {
      // toast.success("Verified");

      if (result.status === 'OTP_SENT') {
        toast.error(result.message);
      }
      else if (result.status === 'false') {
        toast.error(result.message);
        setOtpPopup(false);
        formik.resetForm();
      }
      else if (result.status === 'true') {
        toast.success(result.message);
        // setOtpPopup(false);
        // formik.resetForm();
        navigate('/login-success-page')
      }
    }
    else {
      toast.error("Not verified. We will send sms when ready");
    }

  };

  const handleResendOtp = async () => {

    const payload = {
      txnId: otpInfo?.txnId
    }

    const result = await dispatch(resendOtpSlice(payload));
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  })

  console.log("formik", formik)

  console.log("otpinfo---", otpInfo);


  return (
    <Box>

      {
        loading ?
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
            }}
          >
            <CircularProgress />
          </Box>
          : ''
      }

      {
        !otpPopup ?
          <>
            <form onSubmit={formik.handleSubmit}>
              <Card sx={{ mt: 5, p: 3, backgroundColor: 'transparent', boxShadow: 'none', maxWidth: '800px', margin: '180px auto' }}>

                <Typography sx={{ fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>WHAT'S YOUR MOBILE NUMBER</Typography>

                <Grid container sx={{ pt: 1 }} spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    {/*<Typography className={classes.label}>Mobile Number{" "}<span style={{ color: '#FF0000' }}>*</span></Typography>*/}

                    <TextField
                      name="mobileNumber"
                      placeholder='999123456789'
                      value={formik.values.mobileNumber}
                      fontSize='14px'
                      // onChange={formik.handleChange}
                      onChange={(event) => {
                        formik.handleChange(event);
                        setMobile(event.target.value);
                      }}
                      className={classes.textField}
                      error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                      helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                    />
                  </Grid>
                  {/*<Grid size={{ xs: 12 }}>
                    <Typography className={classes.label}>Fallback</Typography>
                    <Autocomplete
                      name="fallbackChannel"
                      multiple
                      options={channelFallbackList}
                      getOptionLabel={(option) => (option?.label ? option.label : "")}
                      value={
                        channelFallbackList.filter((option) =>
                          formik.values.fallbackChannel.includes(option.value) // Match by value
                        ) || []
                      }
                      onChange={(event, value) => {
                        // Set the selected values as an array of `value` strings
                        formik.setFieldValue(
                          "fallbackChannel",
                          value.map((v) => v.value) // Extract the `value` property
                        );
                      }}
                      onBlur={formik.handleBlur}
                      inputValue={AttriuteInputValue}
                      onInputChange={(event, newInputValue) => {
                        setAttriuteInputValue(newInputValue);
                      }}
                      className={classes.selectField}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select Fallback"
                          className={classes.textField}
                        />
                      )}
                    />
                  </Grid>*/}
                  {/*formik.values.fallbackChannel.includes('sms') && (
                    <Grid size={{ xs: 12 }}>
                      <Typography className={classes.label}>SMS Mobile Number<span style={{ color: '#FF0000' }}>*</span></Typography>
                      <TextField
                        name="smsMobileNumber"
                        placeholder="Enter SMS Mobile Number"
                        value={formik.values.smsMobileNumber}
                        onChange={formik.handleChange}
                        className={classes.textField}
                        error={formik.touched.smsMobileNumber && Boolean(formik.errors.smsMobileNumber)}
                        helperText={formik.touched.smsMobileNumber && formik.errors.smsMobileNumber}
                      />
                    </Grid>
                  )*/}
                  {/*formik.values.fallbackChannel.includes('whatsApp') && (
                    <Grid size={{ xs: 12 }}>
                      <Typography className={classes.label}>WhatsApp Mobile Number<span style={{ color: '#FF0000' }}>*</span></Typography>
                      <TextField
                        name="whatsAppMobileNumber"
                        placeholder="Enter WhatsApp Mobile Number"
                        value={formik.values.whatsAppMobileNumber}
                        onChange={formik.handleChange}
                        className={classes.textField}
                        error={formik.touched.whatsAppMobileNumber && Boolean(formik.errors.whatsAppMobileNumber)}
                        helperText={formik.touched.whatsAppMobileNumber && formik.errors.whatsAppMobileNumber}
                      />
                    </Grid>
                  )*/}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: "center", mt: '15px', alignItems: 'end' }}>
                  <Button
                    sx={{
                      borderRadius: '5px',
                      color: '#FFFFFF !important',
                      fontSize: '12px !important',
                      background: 'linear-gradient(180deg, #13BECF 0%, #455869 100%)',
                      padding: '8px 16px !important',
                      textTransform: 'capitalize',
                      width: '100%'
                    }}
                    type='submit'
                  >
                    VERIFY
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: "center", mt: '5px', alignItems: 'center' }}>
                  <Typography sx={{ color: '#455967', fontSize: '10px !important', }}>Powered by{' '}{' '}</Typography>

                  <span>
                    <img src={IDALOGO} width={'15px'}></img>
                  </span>
                </Box>
              </Card>
            </form>
          </> :
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <OTPInput length={6} onComplete={handleComplete} otpPopup={otpPopup} setOtpPopup={setOtpPopup} otpInfo={otpInfo} classes={classes} />
            </Box>
          </>
      }
      <RedirectIframe redirectUrl={iframeUrl} handleSuccess={handleSuccess} />
    </Box>
  )
}

export default Demopage




