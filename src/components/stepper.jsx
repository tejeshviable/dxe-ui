import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  Typography,
  Grid,
  Grid2,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CampaignType from "../pages/NewCampaign/Sections/CampaignType";
import AudienceManager from "../pages/NewCampaign/Sections/AudienceManager";
import AdditionalInfo from "../pages/NewCampaign/Sections/AdditionalInfo";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import ContactsIcon from "@mui/icons-material/Contacts";
import HubIcon from "@mui/icons-material/Hub";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 27,
  },
  [`&.${stepConnectorClasses.root}`]: {
    left: "calc(-50% + 60px)",
    right: "calc(50% + 60px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "#13BECF",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "#13BECF",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    backgroundColor: "#CFD6DC",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme }) => ({
  backgroundColor: "transparent",
  zIndex: 1,
  color: "#ABB7C2",
  width: 56,
  height: 56,
  display: "flex",
  borderRadius: "50%",
  border: "2px solid #ABB7C2",
  justifyContent: "center",
  alignItems: "center",
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        border: "2px solid #445A68",
        color: "#445A68",
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        border: "2px solid  #13BECF",
        color: "#13BECF",
      },
    },
  ],
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
 
  const icons = {
    1: <ContactsIcon />,
    2: <HubIcon />,
    3: <ConfirmationNumberIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

// ColorlibStepIcon.propTypes = {
//   /**
//    * Whether this step is active.
//    * @default false
//    */
//   active: PropTypes.bool,
//   className: PropTypes.string,
//   /**
//    * Mark the step as completed. Is passed to child components.
//    * @default false
//    */
//   completed: PropTypes.bool,
//   /**
//    * The label displayed in the step icon.
//    */
//   icon: PropTypes.node,
// };

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    margin: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
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
  stepperLine: {
    "& .MuiStepLabel-label": {
      color: "#ABB7C2",
    },
    "& .Mui-active .MuiStepLabel-label": {
      color: "#13BECF",
    },
    "& .Mui-completed .MuiStepLabel-label": {
      color: "#13BECF",
    },
  },
  additionInfo: {
    color: "#000",
    fontWeight: 500,
    fontSize: "18px !important",
    margin: "auto",
  },
  additionInfoValue: {
    color: "#524f4f",
    fontWeight: 400,
    fontSize: "18px !important",
  },

  searchBar: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#e6e6e6",
      borderRadius: "10px",
    },
    "& .MuiFormHelperText-root": {
      marginLeft: "0px",
    },
  },
}));

function CreateCampaign() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [audienceData, setAudienceData] = useState([]);
  const[campaignId,setCampaignId] = useState(null)
  const [formValues, setFormValues] = useState({
    media:'',
    title:'',
    description:'',
    startDate:'',
    endDate:'',
  });

  // const steps = ['New Campaign', 'Audience Manager', 'Additional Information'];

  const steps = [
    { label: "Details", description: "Campaign Settings" },
    { label: "Parameters", description: "Audience & Budget Management" },
    { label: "Confirmation", description: "Preview and Payment Details" },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  console.log("formValues", formValues);
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CampaignType
            handleChange={handleChange}
            formValues={formValues}
            classes={classes}
            handleNext={handleNext}
            setFormValues={setFormValues}
            setCampaignId={setCampaignId}
          />
        );
      case 1:
        return (
          <AudienceManager
            handleChange={handleChange}
            formValues={formValues}
            classes={classes}
            prevStep={handleBack}
            handleNext={handleNext}
            setAudienceData={setAudienceData}
            setFormValues={setFormValues}
          />
        );
      case 2:
        return (
          <AdditionalInfo
            handleChange={handleChange}
            formValues={formValues}
            classes={classes}
            handleNext={handleNext}
            prevStep={handleBack}
            audienceData={audienceData}
            campaignId={campaignId}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/dashboard"
        >
          Home
        </Link>

        <Typography
          sx={{ color: "text.primary", display: "flex", alignItems: "center" }}
        >
          Create Campaign
        </Typography>
      </Breadcrumbs>

      <Stepper
        activeStep={activeStep}
        sx={{ marginY: 4 }}
        alternativeLabel
        connector={<ColorlibConnector />}
        className={classes.stepperLine}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            {/* <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel> */}
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: activeStep === index && "#445A68", 
                  fontWeight: activeStep === index && "500",
                  fontSize: "16px",
                }}
              >
                {label.label}
              </Typography>
              <Typography
                sx={{ fontSize: "18px", fontWeight: "400", color: "#ABB7C2" }}
              >
                {label.description}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <p>All steps completed</p>
          </div>
        ) : (
          // <Card sx={{ padding: 10 }}>
          <>{renderStepContent(activeStep)}</>
          // </Card>
        )}
      </div>
    </div>
  );
}

export default CreateCampaign;
