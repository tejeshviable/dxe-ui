import React, { useState } from 'react'
import { Box, Button, Card, CircularProgress, TextField, Typography } from '@mui/material'
import Grid from "@mui/material/Grid2";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { fetchIpiFicationGetSlice, fetchIpiFicationPostSlice, fetchIpiFicationRespPostSlice } from '../../redux/teamSlice/team.slice';
import axios from 'axios';
import { toast } from 'react-toastify';
import IDALOGO from '../../assets/IDA_Logo.svg'
import RedirectIframe from './RedirectIframe';

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
    },
  },
  selectField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: "10px",
      border: "1px solid #C5C5C5",
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

const Demopage = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState("");
  const [rxId, setRxId] = useState("");
  const [iframeUrl, setIframeUrl] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const initialValues = {
    mobileNumber: '',
  }

  const validationSchema = Yup.object({
    mobileNumber: Yup.string()
      .required("Mobile number is required"),
  })

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
    // setMobile(values.mobileNumber);
    const payload = {
      mobileNumber: values.mobileNumber
    }

    const result = await dispatch(fetchIpiFicationPostSlice(payload)).unwrap();


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

    if (successResult.status === null) {

      setTimeout(() => {
        handleSuccess(state);
      }, 100);
    }
    else {
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  })


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
            <Grid size={{ md: 6 }}>
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

        <Box sx={{ display: 'flex', justifyContent: "center", mt: '5px', alignItems:'center' }}>
          <Typography sx={{ color:'#455967',}}>Powered by{' '}</Typography>

          <span>
            <img src={IDALOGO} width={'30px'}></img>
          </span>
        </Box>

      </form>
      <RedirectIframe redirectUrl={iframeUrl} handleSuccess={handleSuccess} />
    </Box>
  )
}

export default Demopage