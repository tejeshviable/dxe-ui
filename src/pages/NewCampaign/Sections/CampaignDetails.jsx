import {
  Box,
  Button,
  Chip,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ListContentModal from "../Components/ListContentModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { MobileDatePicker } from "@mui/x-date-pickers";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Grid from "@mui/material/Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { fetchCreateCampaignSlice } from "../../../redux/stepperSlice/stepper.slice";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Autocomplete from "@mui/material/Autocomplete";
import AdPreview from "../Components/Adpreview";
import { toast } from "react-toastify";
import whatsappImg from "../../../assets/whatsappImg.svg";

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const channelData = [
  // { label: "Google" },
  // { label: "Facebook" },
  // { label: "Mobile" },
  { label: "Whatsapp" },
];

const CampaignDetails = ({
  formValues,
  classes,
  handleNext,
  setCampaignDetails,
  setFormValues,
  setCampaignId,
}) => {
  const initialValues = formValues;
  const [open, setOpen] = useState(false);
  const [contentIds, setContentIds] = useState([]);
  const [FacNameInputValue, setFacNameInputValue] = useState("");
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    title: Yup.string().required("Campaign title is required"),
    description: Yup.string().required("Campaign description is required"),
    channel: Yup.array()
      .of(Yup.string().required("Channel is required"))
      .min(1, "At least one channel is required")
      .required("Channel is required"),
    startDate: Yup.date().required("Start date is required").nullable(),
    endDate: Yup.date().required("End date is required").nullable(),
    media: Yup.string().required("Please select media content"),
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    const payload = {
      channel: values.channel.join(","),
      campaignName: values.title,
      description: values.description,
      goalDescription: "dummy Data",
      startDate: formatDate(values.startDate),
      endDate: formatDate(values.endDate),
      scheduled: true,
      scenario: "Nothing",
      contentIds: contentIds,
      budget: 51000,
      approxAudience: 133,
    };
    console.log(values.channel.join(","));
    setFormValues(values);

    const result = await dispatch(fetchCreateCampaignSlice(payload)).unwrap();

    if (result) {
      setCampaignId(result.campaignId);
      toast.success("Campaign Details Submitted Successfully.");
      handleNext();
    } else {
      console.log("Error");
    }
  };

  const handleDraft = () => {
    setCampaignDetails(false);
  };

  const formik = useFormik({
    initialValues: {
      ...formValues,
      channel: formValues.channel || [],
    },

    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  //   useEffect(() => {
  //     formik.setFieldValue("media", contentIds.join(", "));
  //   }, [contentIds]);

  useEffect(() => {
    // Set media field value and update parent values
    formik.setFieldValue("media", contentIds.join(", "));
    setFormValues(formik.values); // Update parent form values here as well
  }, [contentIds, formik.values, setFormValues]);

  return (
    <form onSubmit={formik.handleSubmit} style={{ marginTop: "20px" }}>
      <Accordion
        sx={{
          border: "1px solid #ccc",
          borderRadius: "10px !important",
          boxShadow: "none",
          overflow: "hidden",
          boxShadow: "0px 4px 16.5px -6px rgba(0, 0, 0, 0.25)",
          marginBottom: "25px !important",
        }}
        defaultExpanded
      >
        <AccordionSummary
          // sx={{ backgroundColor: '#F9FAFB', borderRadius: '10px', minHeight: '50px', color: '#333333', fontWeight: '500', fontSize: '19px' }}
          sx={{
            minHeight: "65px ",
            color: "#333333",
            fontWeight: "500",
            fontSize: "19px",
            backgroundColor: "#F9FAFB",
            borderTopLeftRadius: "15px !important",
            borderTopRightRadius: "15px !important",
            borderRadius: "10px",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <RadioButtonUncheckedIcon
              sx={{
                fill: "#13BECF",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
              }}
            />
            Campaign Details
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={5} paddingY={2} paddingX={1}>
            <Grid item container spacing={2} size={7}>
              <Grid size={12}>
                <Typography className={classes.label}>
                  Campaign Title
                </Typography>

                <TextField
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  className={classes.textField}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>

              <Grid size={12}>
                <Typography className={classes.label}>
                  Brand Name or Website URL
                </Typography>

                <TextField
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  className={classes.textField}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>

              <Grid size={12}>
                <Typography className={classes.label}>Channel</Typography>

                <Autocomplete
                  multiple
                  options={channelData}
                  getOptionLabel={(option) =>
                    option?.label ? option.label : ""
                  } // Avoid undefined
                  name="channel"
                  disablePortal
                  value={
                    channelData.filter((option) =>
                      formik.values.channel.includes(option.label)
                    ) || []
                  }
                  onChange={(event, value) => {
                    // Set the selected values as an array of labels
                    formik.setFieldValue(
                      "channel",
                      value.map((v) => v.label)
                    );
                  }}
                  onBlur={formik.handleBlur}
                  inputValue={FacNameInputValue}
                  onInputChange={(event, newInputValue) => {
                    setFacNameInputValue(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      placeholder="Select Channels"
                      {...params}
                      error={
                        formik.touched.channel && Boolean(formik.errors.channel)
                      }
                      helperText={
                        formik.touched.channel && formik.errors.channel
                      }
                      className={classes.textField}
                    />
                  )}
                  renderTags={() => null}
                />

                <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                  {(Array.isArray(formik.values.channel)
                    ? formik.values.channel
                    : []
                  ).map((label, index) => (
                    <Chip
                      key={index}
                      label={label} // Display the channel label
                      onDelete={() => {
                        // Handle deleting the chip
                        const updatedChannels = formik.values.channel.filter(
                          (item) => item !== label
                        );
                        formik.setFieldValue("channel", updatedChannels);
                      }}
                      sx={{
                        borderRadius: "18px",
                        marginBottom: "15px",
                        background: "#445A68E5",
                        color: "#fff",
                        "& .MuiChip-deleteIcon": {
                          color: "white",
                          fontSize: "16px",
                        },
                        "& .MuiChip-deleteIcon:hover": {
                          backgroundColor: "transparent",
                          color: "white",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid size={12}>
                <Typography className={classes.label}>Media</Typography>

                <TextField
                  fullWidth
                  // disabled
                  name="media"
                  value={formik.values.media || ""}
                  variant="outlined"
                  className={classes.textField}
                  error={formik.touched.media && Boolean(formik.errors.media)}
                  helperText={formik.touched.media && formik.errors.media}
                  onClick={handleOpen}
                  InputProps={{
                    endAdornment: (
                      <>
                        <Typography
                          sx={{
                            color: "#445A68",
                            cursor: "pointer",
                            marginRight: "8px",
                          }}
                          onClick={handleOpen}
                        >
                          Browse
                        </Typography>
                      </>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Grid size={5}>
              {/* <AdPreview width={"90%"} /> */}
              {/* <Typography  sx={{display:'flex', justifyContent:'center', marginBottom:'20px',fontWeight:'500',fontSize:'20px'}}>Ad Preview</Typography>
                  
              <Box sx={{display:'flex', justifyContent:'center'}}>

                <img src={whatsappImg} style={{minWidth:'290px',height:'430px'}} ></img>
              </Box> */}

              {/* Conditionally render whatsappImg based on media field */}
              {formik.values.media && (
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                    fontWeight: "500",
                    fontSize: "20px",
                  }}
                >
                  Ad Preview
                </Typography>
              )}

              {formik.values.media && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={whatsappImg}
                    style={{ minWidth: "290px", height: "430px" }}
                    alt="ad"
                  />
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={3} marginTop={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography className={classes.label}>Start Date:</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  name="startDate"
                  closeOnSelect
                  format="DD/MM/YYYY"
                  showToolbar={false}
                  value={
                    formik.values.startDate
                      ? dayjs(formik.values.startDate)
                      : null
                  }
                  onBlur={formik.handleBlur}
                  onChange={(date) => {
                    formik.setFieldValue(
                      "startDate",
                      date ? dayjs(date).toISOString() : null
                    );
                  }}
                  className={classes.textField}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        formik.touched.startDate &&
                        Boolean(formik.errors.startDate)
                      }
                      helperText={
                        formik.touched.startDate && formik.errors.startDate
                      }
                      className={classes.textField}
                    />
                  )}
                />
              </LocalizationProvider>
              <FormHelperText error>
                {formik.touched.startDate && formik.errors.startDate}
              </FormHelperText>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography className={classes.label}>End Date:</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  name="endDate"
                  closeOnSelect
                  format="DD/MM/YYYY"
                  showToolbar={false}
                  value={
                    formik.values.endDate ? dayjs(formik.values.endDate) : null
                  }
                  onBlur={formik.handleBlur}
                  onChange={(date) => {
                    formik.setFieldValue(
                      "endDate",
                      date ? dayjs(date).toISOString() : null
                    );
                  }}
                  className={classes.textField}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        formik.touched.endDate && Boolean(formik.errors.endDate)
                      }
                      helperText={
                        formik.touched.endDate && formik.errors.endDate
                      }
                      className={classes.textField}
                    />
                  )}
                />
              </LocalizationProvider>
              <FormHelperText error>
                {formik.touched.endDate && formik.errors.endDate}
              </FormHelperText>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          paddingY: "10px",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{
            borderRadius: "40px",
            padding: "16px 24px",
            fontSize: "18px",
            backgroundColor:'#445A68',
            color:'#FFFFFF',
            fontWeight: "600",
            border: "1px solid rgba(68, 90, 104, 1)",
          }}
          onClick={handleDraft}
        >
          Save For Draft
        </Button>
        <Button
          variant="outlined"
          type="submit"
          endIcon={<ArrowForwardIcon />}
          sx={{
            borderRadius: "40px",
            padding: "16px 24px",
            color: "#FFFFFF",
            background:'linear-gradient(0deg, #13BECF 0%, #435D6B 100%)',
            fontSize: "18px",
            fontWeight: "600",
            border: "1px solid #13BECF",
          }}
        >
          Save and Next
        </Button>
      </Box>

      <ListContentModal
        open={open}
        handleClose={handleClose}
        setContentIds={setContentIds}
        classes={classes}
      />
    </form>
  );
};

export default CampaignDetails;
