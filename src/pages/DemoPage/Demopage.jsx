import React, { useState } from 'react'
import { Autocomplete, Box, Button, Card, CircularProgress, TextField, Typography } from '@mui/material'
import Grid from "@mui/material/Grid2";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { fetchIpiFicationAuthPostSlice, fetchIpiFicationGetSlice, fetchIpiFicationPostSlice, fetchIpiFicationRespPostSlice, VerifysmsOtpSmsSlice, VerifyWhatsAppOtpSlice } from '../../redux/teamSlice/team.slice';
import axios from 'axios';
import { toast } from 'react-toastify';
import IDALOGO from '../../assets/IDA_Logo.svg'
import RedirectIframe from './RedirectIframe';
import OTPInput from './Component/OTPInput';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: "10px",
      border: "0px solid #C5C5C5",
      height: "60px", // Updated height to 60px
      background: "#FFF",
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
      borderRadius: "10px",
      height: "60px", // Updated height to 60px
      background: "#FFF",
    },
    "& .MuiInputBase-input::placeholder": {
      backgroundColor: "#FFF", // Ensuring placeholder background is white
    },
  },
  label: {
    color: "#BEBEBE",
    fontWeight: 500,
    marginBottom: "2px",
    fontSize: "18px !important",
  },

  Typo: {
    color: "#455967",
    fontWeight: 500,
    marginBottom: "2px",
    fontSize: "16px !important",
  },

  fetchButton: {
    borderRadius: '10px',
    border: '1px solid #A9A9A9',
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
  },
  {
    label: 'WhatsApp',
    value: 'whatsApp',
  }
]

const Demopage = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState("");
  const [rxId, setRxId] = useState("");
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
      .of(Yup.string().oneOf(['sms', 'whatsApp'])),
    smsMobileNumber: Yup.string().test(
      'smsMobileNumber',
      'SMS Mobile Number is required',
      function (value) {
        const { fallbackChannel } = this.parent;
        return fallbackChannel?.includes('sms') ? !!value : true;
      }
    ),
    whatsAppMobileNumber: Yup.string().test(
      'whatsAppMobileNumber',
      'WhatsApp Mobile Number is required',
      function (value) {
        const { fallbackChannel } = this.parent;
        return fallbackChannel?.includes('whatsApp') ? !!value : true;
      }
    ),
  });


  const openRedirectWindow = (redirectUrl) => {
    console.log(redirectUrl);
    console.log("rxId in openRedirectWindow updated : ", rxId);
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

    const workflow = [{
      channel: "silent_auth",
      mobileNumberTo: values.mobileNumber
    },]

    if (values.fallbackChannel.includes("sms")) {
      workflow.push({
        channel: "sms",
        mobileNumberTo: values.smsMobileNumber
      })
    }

    if (values.fallbackChannel.includes("whatsApp")) {
      workflow.push({
        channel: 'whatsApp',
        mobileNumberTo: values.whatsAppMobileNumber
      })
    }

    const payload = {
      brand: "IOH",
      workflow
    }

    const result = await dispatch(fetchIpiFicationAuthPostSlice(payload)).unwrap();

    if (result) {
      console.log("result : ", result);
      console.log("rxId : ", result?.requestId);
      setRxId(result?.requestId);
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


  const handleSuccess = async (state) => {
    console.log("rxId in handleSuccess : ", state);
    const payload = { mobileNumber: mobile, requestId: state };
    console.log("payload in handleSuccess : ", payload);
    const successResult = await dispatch(fetchIpiFicationGetSlice(payload)).unwrap();
    console.log("Tejeshvi : " + successResult.status);
    if (successResult.status === null || successResult.status === undefined) {

      setTimeout(() => {
        handleSuccess(state);
      }, 100);
    } else if (successResult.status === 'VERIFICATION_PENDING') {
      if (successResult.channel === 'sms') {
        setLoading(false);
        toast.success("Call sms verify otp");
        setotpInfo(successResult);
        setOtpPopup(true);
      } else if (successResult.channel === 'whatsApp') {
        setLoading(false);
        toast.success("Call whatsapp verify otp");
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
        toast.success("Verified");
      } else {
        // toast.error(successResult?.errorMsg ? successResult?.errorMsg : "Not verified");
        toast.error("Not verified. We will send sms when ready");
      }
    }
  }

  const handleComplete = async (otp) => {

    const payload = {
      otp: otp,
      txnId: otpInfo?.txnId
    }

    if (otpInfo?.channel === 'sms') {

      const smsResult = await dispatch(VerifysmsOtpSmsSlice(payload)).unwrap();

      if (smsResult) {
        toast.success("Verified");
      }
      else {
        toast.error("Not verified. We will send sms when ready");
      }
    }
    else if (otpInfo?.channel === 'whatsApp') {

      const whatsAppResult = await dispatch(VerifyWhatsAppOtpSlice(payload)).unwrap();

      if (whatsAppResult) {
        toast.success("Verified");
      }
      else {
        toast.error("Not verified. We will send sms when ready");
      }
    }
  };

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

      <form onSubmit={formik.handleSubmit}>
        <Card sx={{ mt: 5, p: 3, borderRadius: '15px', boxShadow: '0px 4px 16.5px -6px rgba(0, 0, 0, 0.25)' }}>
          <Grid container item size={{ md: 12 }} sx={{ pt: 2 }} spacing={2}>
            <Grid size={{ md: 4 }}>
              <Typography className={classes.label}>Phone Number</Typography>

              <TextField
                name="mobileNumber"
                placeholder='Enter Mobile Number'
                value={formik.values.mobileNumber}
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
            <Grid size={{ md: 4 }}>
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
            </Grid>
            {formik.values.fallbackChannel.includes('sms') && (
              <Grid size={{ md: 4 }}>
                <Typography className={classes.label}>SMS Mobile Number</Typography>
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
            )}
            {formik.values.fallbackChannel.includes('whatsApp') && (
              <Grid size={{ md: 4 }}>
                <Typography className={classes.label}>WhatsApp Mobile Number</Typography>
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
            )}
          </Grid>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: "center", mt: '16px' }}>
          <Button
            sx={{
              borderRadius: '10px',
              border: '1px solid #A9A9A9',
              color: '#FFFFFF !important',
              fontSize: '18px !important',
              background: 'linear-gradient(180deg, #13BECF 0%, #455869 100%)',
              padding: '8px 16px !important',
              textTransform: 'capitalize'
            }}
            type='submit'
          >
            Authenticate
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: "center", mt: '5px', alignItems: 'center' }}>
          <Typography sx={{ color: '#455967', }}>Powered by{' '}</Typography>

          <span>
            <img src={IDALOGO} width={'30px'}></img>
          </span>
        </Box>

        {
          otpPopup ? <>

            <Box sx={{ margin: 'auto' }}>
              <OTPInput length={6} onComplete={handleComplete} otpPopup={otpPopup} setOtpPopup={setOtpPopup} otpInfo={otpInfo} />
            </Box>
          </> : <></>
        }

      </form>
      <RedirectIframe redirectUrl={iframeUrl} handleSuccess={handleSuccess} />
    </Box>
  )
}

export default Demopage



