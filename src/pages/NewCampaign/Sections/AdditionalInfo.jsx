import {
  Box,
  Button,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  Chip,
  Divider,
  Modal,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useDispatch, useSelector } from "react-redux";
import { fetchCreateDataRequestSlice } from "../../../redux/stepperSlice/stepper.slice";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdPreview from "../Components/Adpreview";
import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { jwtDecode } from "jwt-decode";
import whatsappImg from "../../../assets/whatsappImg.svg";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AdditionalInfo = ({
  handleChange,
  formValues,
  classes,
  prevStep,
  audienceData,
  campaignId,
}) => {
  const { createCampaignResponse } = useSelector((state) => state.stepper);
  const orgId = createCampaignResponse.orgId;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { discoverFields } = useSelector((state) => state.stepper);
  const [value, setValue] = useState(0);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newOrgId, setNewOrId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    const tokenData = jwtDecode(token);
    const cognitoGroups = tokenData["custom:orgId"];
    setNewOrId(cognitoGroups);
  }, []);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  function formatDateRange(startDateStr, endDateStr) {
    const options = { day: "2-digit", month: "short", year: "numeric" };

    // Check if the date strings are valid
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      // If either date is invalid, return an appropriate message or handle the error
      return "Invalid date range";
    }

    const formattedStartDate = new Intl.DateTimeFormat("en-GB", options).format(
      startDate
    );
    const formattedEndDate = new Intl.DateTimeFormat("en-GB", options).format(
      endDate
    );

    return `${formattedStartDate.toLowerCase()} to ${formattedEndDate.toLowerCase()}`;
  }

  const { Parentattributes } = formValues;
  function transformData(input) {
    const result = [];

    // Check if Parentattributes exists and is an array
    if (Array.isArray(input.Parentattributes)) {
      // Loop through Parentattributes
      for (const attribute of input.Parentattributes) {
        const code = attribute.attributeCode;
        const name = attribute.attributeName;
        const type = attribute.type;

        // Get the corresponding values from the input object
        if (input[code]) {
          for (const value of input[code]) {
            result.push({
              code: code,
              value: value,
              type: type,
              name: name,
            });
          }
        }
      }
    } else {
      console.error(
        "Parentattributes is not defined or not an array:",
        input.Parentattributes
      );
    }

    return result;
  }

  function transformAttributes(data) {
    const result = {};
    data.forEach((attribute) => {
      const { name, value, type, code } = attribute;

      if (!result[name]) {
        result[name] = {
          name: name,
          possibleValues: [],
          type: type,
          code: code,
        };
      }

      if (!result[name].possibleValues.includes(value)) {
        result[name].possibleValues.push(value);
      }
    });

    return Object.values(result);
  }

  const newValues = transformData(formValues);
  const transformedAttributes = transformAttributes(newValues);

  const handleApproval = async (orgId) => {
    const payload = {
      description: createCampaignResponse.description,
      owner: newOrgId,
      attributes: transformedAttributes,
      campaignId: campaignId,
    };

    const result = await dispatch(
      fetchCreateDataRequestSlice(payload)
    ).unwrap();

    if (result) {
      navigate("/campaign-list");
    } else {
      console.log("Error");
    }
  };

  const campaignDetails = [
    {
      title: "Campaign Title",
      value: formValues?.title,
    },

    { title: "Website Url:", value: formValues?.description },

    {
      title: "Dates:",
      value: formatDateRange(formValues?.startDate, formValues?.endDate),
    },
    {
      title: "Channel:",
      value: formValues.channel,
    },

    {
      title: "Media:",
      value: [
        "http://35.154.196.78:9000/campaign/45fac552-d5fc-4a48-83ca-da191b389193.jpeg?response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=7ZdaOcKMngTVI6Tl6Z5Z%2F20241107%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241107T051446Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=31591a6f575b35d484cc21dc2eaec9fe6467224ad1d38201ce1c7cfbae496291",
       
      ], // Array of image URLs
    },
  ];

  const budgetData = [
    {
      title: "Budget",
      value: "1,00,000",
    },
    {
      title: "Estimated Impressions",
      value: "63000 to 74000",
    },
    // {
    //   title: "63000 to 74000",
    //   value: "94-320",
    // },
  ];

  return (
    <Box>
      <Grid container spacing={2}>
        <Box sx={{ marginTop: "30px", width: "100%", marginX: "30px" }}>
          <Accordion
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px !important",
              boxShadow: "none",
              overflow: "hidden",
              boxShadow: "0px 4px 16.5px -6px rgba(0, 0, 0, 0.25)",
              marginBottom: "25px !important",
              pointerEvents: "none",
              cursor: "default",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                minHeight: "65px",
                color: "#333333",
                fontWeight: "500",
                fontSize: "19px",
                borderTopLeftRadius: "15px !important",
                borderTopRightRadius: "15px !important",
                borderRadius: "10px",
              }}
            >
              <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <CheckCircleIcon
                  sx={{
                    fill: "#13BECF",
                    borderRadius: "50%",
                    width: "25px",
                    height: "25px",
                  }}
                />
                Choose your Campaign Type
              </Box>
            </AccordionSummary>
          </Accordion>

          <Accordion
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px !important",
              boxShadow: "none",
              overflow: "hidden",
              boxShadow: "0px 4px 16.5px -6px rgba(0, 0, 0, 0.25)",
              marginBottom: "25px !important",
              pointerEvents: "none",
              cursor: "default",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                minHeight: "65px",
                color: "#333333",
                fontWeight: "500",
                fontSize: "19px",
                borderTopLeftRadius: "15px !important",
                borderTopRightRadius: "15px !important",
                borderRadius: "10px",
              }}
            >
              <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <CheckCircleIcon
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
          </Accordion>

          <Accordion
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px !important",
              boxShadow: "none",
              overflow: "hidden",
              boxShadow: "0px 4px 16.5px -6px rgba(0, 0, 0, 0.25)",
              marginBottom: "25px !important",
              pointerEvents: "none",
              cursor: "default",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                minHeight: "65px",
                color: "#333333",
                fontWeight: "500",
                fontSize: "19px",
                borderTopLeftRadius: "15px !important",
                borderTopRightRadius: "15px !important",
                borderRadius: "10px",
              }}
            >
              <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <CheckCircleIcon
                  sx={{
                    fill: "#13BECF",
                    borderRadius: "50%",
                    width: "25px",
                    height: "25px",
                  }}
                />
                Audience Manager
              </Box>
            </AccordionSummary>
          </Accordion>

          {/* <Accordion
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px !important",
              boxShadow: "none",
              overflow: "hidden",
              boxShadow: "0px 4px 16.5px -6px rgba(0, 0, 0, 0.25)",
              marginBottom: "25px !important",
              pointerEvents: "none",
              cursor: "default",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                minHeight: "65px",
                color: "#333333",
                fontWeight: "500",
                fontSize: "19px",
                borderTopLeftRadius: "15px !important",
                borderTopRightRadius: "15px !important",
                borderRadius: "10px",
              }}
            >
              <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <CheckCircleIcon
                  sx={{
                    fill: "#13BECF",
                    borderRadius: "50%",
                    width: "25px",
                    height: "25px",
                  }}
                />
                Budget Management
              </Box>
            </AccordionSummary>
          </Accordion> */}

          <Accordion
            defaultExpanded
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px !important",
              boxShadow: "none",
              overflow: "hidden",
              boxShadow: "0px 4px 16.5px -6px rgba(0, 0, 0, 0.25)",
              marginBottom: "25px !important",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                minHeight: "65px ",
                color: "#333333",
                fontWeight: "500",
                fontSize: "19px",
                borderTopLeftRadius: "15px !important",
                borderTopRightRadius: "15px !important",
                borderRadius: "10px",
              }}
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
                Preview
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Grid container spacing={2}>
                {/* Left section - Campaign details */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ padding: 4, borderBottom: "1px solid #3333" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 500,
                        fontSize: "20px",
                        marginLeft: "-20px",
                        marginBottom: "20px", // Adds space to the right
                      }}
                    >
                      Campaign Details
                    </Typography>
                    {campaignDetails.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          py: 1,
                        }}
                      >
                        {/* Title */}
                        <Typography
                          className={classes.additionInfo}
                          sx={{ width: "40%" }}
                        >
                          {item.title}
                        </Typography>

                        {/* Value - Display text, images, or chips based on content */}
                        <Box sx={{ width: "60%" }}>
                          {Array.isArray(item.value) ? (
                            item.title === "Channel:" ? (
                              /* Render Chip components for channels */
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 1,
                                }}
                              >
                                {item.value.map((val, idx) => (
                                  <Chip
                                    key={idx}
                                    label={val}
                                    sx={{
                                      borderRadius: "18px",
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
                            ) : (
                              /* If value is an array of images */
                              <Box sx={{ display: "flex", gap: 1 }}>
                                {item.value.map((imageUrl, idx) => (
                                  <img
                                    key={idx}
                                    src={imageUrl}
                                    alt={`${item.title} ${idx + 1}`}
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      borderRadius: "10px",
                                    }}
                                  />
                                ))}
                              </Box>
                            )
                          ) : typeof item.value === "string" &&
                            item.value.startsWith("http") &&
                            /\.(jpg|jpeg|png|gif)$/i.test(item.value) ? (
                            <img
                              src={item.value}
                              alt={item.title}
                              style={{
                                width: "100px",
                                height: "auto",
                                borderRadius: "10px",
                              }}
                            />
                          ) : (
                            <Typography className={classes.additionInfoValue}>
                              {item.value ? item.value : "Data not present"}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  {console.log(formValues, "sourabh formvalues")}

                  <Box sx={{ padding: 4 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 500,
                        fontSize: "20px",
                        marginLeft: "-20px",
                        marginBottom: "20px", // Adds space to the right
                      }}
                    >
                      Audience Manager
                    </Typography>
                    {Parentattributes?.map((item, index) => {
                      // Get the value corresponding to the attributeName in formValues
                      const value = formValues[item?.attributeCode];

                      return (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            py: 1,
                          }}
                        >
                          {/* Title */}
                          <Typography
                            className={classes.additionInfo}
                            sx={{ width: "40%" }}
                          >
                            {item?.attributeName}
                          </Typography>

                          {/* Value - Check if the corresponding formValues key exists */}
                          <Box sx={{ width: "60%" }}>
                            {Array.isArray(value) ? (
                              /* If value is an array, display it as chips */
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  flexWrap: "wrap",
                                }}
                              >
                                {value.map((val, idx) => (
                                  <Chip
                                    key={idx}
                                    label={val}
                                    sx={{
                                      borderRadius: "18px",
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
                            ) : (
                              /* If value is not an array, show the text or a default message */
                              <Typography className={classes.additionInfoValue}>
                                {value ? value : "Data not present"}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Grid>

                {/* Right section - AdPreview Component (5 columns) */}
                {/* <Grid size={{ xs: 12, md: 6 }}>
                  <AdPreview width={"90%"} />
                </Grid> */}
                <Grid size={5}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {/* <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "20px",
                        fontWeight: "500",
                        fontSize: "20px",
                      }}
                    >
                      Ad Preview
                    </Typography> */}
                    <img
                      src={whatsappImg}
                      style={{ minWidth: "290px", height: "430px" }}
                      alt="ad"
                    />
                  </Box>
                </Grid>
              </Grid>

              <Divider />

              {/* <Grid container>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 500,
                    fontSize: "20px",
                    // marginLeft: "-20px",
                    // marginBottom: "20px", // Adds space to the right
                    padding: "12px 16px",
                  }}
                >
                  Budget Management
                </Typography>

                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleTabChange}
                      variant="fullWidth" // Makes the tabs take full width
                      sx={{
                        width: "100%",
                        ".MuiTabs-flexContainer": {
                          justifyContent: "space-around",
                        },
                        ".MuiTabs-indicator": {
                          height: "5px",
                          backgroundColor: "linear-gradient(180deg, #13BECF 0%, #455869 100%)",
                        },

                        ".MuiButtonBase-root-MuiTab-root": {
                          ".Mui-selected": {
                            color: "",
                            backgroundColor: "#000",
                          },
                        },
                      }}
                    >
                      <Tab
                        sx={{
                          flex: 1,
                          "&.Mui-selected": {
                            color: "#333333",
                            fontWeight: "600",
                            backgroundColor: "#F5F5F5",
                          },
                        }}
                        label="1 Day"
                        {...a11yProps(0)}
                      />
                      <Tab
                        sx={{
                          flex: 1,
                          "&.Mui-selected": {
                            color: "#333333",
                            fontWeight: "600",
                            backgroundColor: "#F5F5F5",
                          },
                        }}
                        label="7 Days"
                        {...a11yProps(1)}
                      />
                      <Tab
                        sx={{
                          flex: 1,
                          "&.Mui-selected": {
                            color: "#333333",
                            fontWeight: "600",
                            backgroundColor: "#F5F5F5",
                          },
                        }}
                        label="30 Days"
                        {...a11yProps(2)}
                      />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    <Grid item container size={{ xs: 12, md: 6 }}>
                      {budgetData?.map((item, index) => {
                        return (
                          <>
                            <Typography
                              className={classes.additionInfo}
                              sx={{ width: "50%", marginBottom: "10px" }}
                            >
                              {item.title}
                            </Typography>

                            <Typography
                              sx={{ width: "50%", marginBottom: "10px" }}
                              className={classes.additionInfoValue}
                            >
                              {item.value ? item.value : "Data not present"}
                            </Typography>
                          </>
                        );
                      })}
                    </Grid>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    <Grid item container size={{ xs: 12, md: 6 }}>
                      {budgetData?.map((item, index) => {
                        return (
                          <>
                            <Typography
                              className={classes.additionInfo}
                              sx={{ width: "50%", marginBottom: "10px" }}
                            >
                              {item.title}
                            </Typography>

                            <Typography
                              sx={{ width: "50%", marginBottom: "10px" }}
                              className={classes.additionInfoValue}
                            >
                              {item.value ? item.value : "Data not present"}
                            </Typography>
                          </>
                        );
                      })}
                    </Grid>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={2}>
                    <Grid item container size={{ xs: 12, md: 6 }}>
                      {budgetData?.map((item, index) => {
                        return (
                          <>
                            <Typography
                              className={classes.additionInfo}
                              sx={{ width: "50%", marginBottom: "10px" }}
                            >
                              {item.title}
                            </Typography>

                            <Typography
                              sx={{ width: "50%", marginBottom: "10px" }}
                              className={classes.additionInfoValue}
                            >
                              {item.value ? item.value : "Data not present"}
                            </Typography>
                          </>
                        );
                      })}
                    </Grid>
                  </CustomTabPanel>
                </Box>
              </Grid> */}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>

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
          onClick={prevStep}
          startIcon={<ArrowBackIcon />}
          sx={{
            borderRadius: "40px",
            backgroundColor:'#445A68',
            color:'#FFFFFF',
            padding: "16px 24px",
            fontSize: "18px",
            fontWeight: "600",
            border: "1px solid rgba(68, 90, 104, 1)",
          }}
        >
          Save For Draft
        </Button>
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          sx={{
            color: "#13BECF",
            borderRadius: "40px",
            color: "#FFFFFF",
            background:'linear-gradient(0deg, #13BECF 0%, #435D6B 100%)',
            padding: "16px 24px",
            fontSize: "18px",
            fontWeight: "600",
            border: "1px solid #13BECF",
          }}
          onClick={handleOpen}
          // onClick={() => {
          //   handleApproval(orgId);
          // }}
        >
          Send For Approval
        </Button>

        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Are you sure?
            </Typography>
            <Box mt={3}>
              <Button
                variant="outline"
                color="primary"
                sx={{
                  marginRight: "10px",
                  color: "#13BECF",
                  // background: "#13BECF",
                  borderRadius: "13px",
                  padding: "0 20px",
                  fontSize: "16px",
                  fontWeight: "500",
                  border: "1px solid #13BECF",
                  transition: "all 0.3s ease", // For smooth transition
                  "&:hover": {
                    // backgroundColor: "#11A6B6", // Slightly darker on hover
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Add shadow
                    borderColor: "#13BECF",
                  },
                }}
                onClick={() => {
                  handleApproval();
                  handleClose();
                }}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "13px",
                  padding: "0 20px",
                  fontSize: "16px",
                  fontWeight: "500",
                  border: "1px solid #445A68",
                  color: "#445A68",
                  transition: "all 0.3s ease", // For smooth transition
                  "&:hover": {
                    borderColor: "#445A68", // Keep border color on hover
                    color: "#445A68", // Change text color on hover
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Add shadow
                  },
                }}
                onClick={handleClose}
              >
                No
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default AdditionalInfo;
