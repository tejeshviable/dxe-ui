import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Checkbox,
  CardMedia,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IMAGE from "../../../assets/Campaign.svg";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CampaignDetails from "./CampaignDetails";
import { toast } from "react-toastify";

const cardData = [
  {
    image: "",
    title: "Lead Generation",
    description:
      "Sodales velit sapien tortor ut morbi quam parturient massa. Tempor urna enim ac porta lacus tincidunt arcu.",
  },
  {
    image: "",
    title: "Brand Awareness",
    description:
      "Sodales velit sapien tortor ut morbi quam parturient massa. Tempor urna enim ac porta lacus tincidunt arcu.",
  },
  {
    image: "",
    title: "Website Traffic",
    description:
      "Sodales velit sapien tortor ut morbi quam parturient massa. Tempor urna enim ac porta lacus tincidunt arcu.",
  },
  {
    image: "",
    title: "Sales",
    description:
      "Sodales velit sapien tortor ut morbi quam parturient massa. Tempor urna enim ac porta lacus tincidunt arcu.",
  },
  // {
  //   image: "",
  //   title: "App Promotion",
  //   description:
  //     "Sodales velit sapien tortor ut morbi quam parturient massa. Tempor urna enim ac porta lacus tincidunt arcu.",
  // },
  // {
  //   image: "",
  //   title: "Awareness & Consideration",
  //   description:
  //     "Sodales velit sapien tortor ut morbi quam parturient massa. Tempor urna enim ac porta lacus tincidunt arcu.",
  // },
  // {
  //   image: "",
  //   title: "Offline Event Promotions",
  //   description:
  //     "Sodales velit sapien tortor ut morbi quam parturient massa. Tempor urna enim ac porta lacus tincidunt arcu.",
  // },
  // {
  //   image: "",
  //   title: "Event Generation",
  //   description:
  //     "Sodales velit sapien tortor ut morbi quam parturient massa. Tempor urna enim ac porta lacus tincidunt arcu.",
  // },
];

const CampaignType = ({
  formValues,
  classes,
  handleNext,
  setFormValues,
  setCampaignId,
}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [campaignDetails, setCampaignDetails] = useState(false);

  const handleSelectCard = (index) => {
    setSelectedCard(index);
    setCampaignDetails(true);
  };

  const handleSaveandNext = () => {
    return toast.error("Please Select Atleast One Campaign Card");
  };

  const handleAccordionOpen = () => {
    if (campaignDetails) {
      setCampaignDetails(false);
      // setSelectedCard(null);
    }
  };

  return (
    <>
      <Accordion
        sx={{
          border: "1px solid #ccc",
          borderRadius: "10px !important",
          boxShadow: "none",
          overflow: "hidden",
          boxShadow: "0px 4px 16.5px -6px rgba(0, 0, 0, 0.25)",
          marginBottom: "25px !important",
        }}
        expanded={!campaignDetails}
        onClick={handleAccordionOpen}
      >
        <AccordionSummary
          sx={{
            minHeight: "65px",
            color: "#333333",
            backgroundColor: !campaignDetails ? "#F9FAFB" : "",
            fontWeight: "500",
            fontSize: "19px",
            borderTopLeftRadius: "15px !important",
            borderTopRightRadius: "15px !important",
            borderRadius: "10px",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {/* <CheckCircleIcon sx={{ fill: '#13BECF', borderRadius: '50%', width: '25px', height: '25px' }} /> */}
            {campaignDetails ? (
              <CheckCircleIcon
                sx={{
                  fill: "#13BECF",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px",
                }}
              />
            ) : (
              <RadioButtonUncheckedIcon
                sx={{
                  fill: "#13BECF",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px",
                }}
              />
            )}
            Choose your Campaign Type
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            container
            sx={{ maxWidth: "95%", margin: "auto" }}
            justifyContent={"center"}
            spacing={3}
            paddingY={2}
          >
            {cardData?.map((item, index) => {
              const isSelected = selectedCard === index;

              return (
                <Grid
                  size={{ xs: 12, md: 3 }}
                  sx={{ width: "324px !important" }}
                  onClick={() => {
                    handleSelectCard(index);
                  }}
                >
                  <Card
                    sx={{
                      maxWidth: "100%",
                      borderRadius: "10px",
                      padding: "24px",
                      cursor: "pointer",
                      background: isSelected ? "linear-gradient(180deg, #13BECF 0%, #455869 100%)" : "white",
                      transition: "background-color 1s ease",

                      "& .image-box": {
                        backgroundColor: isSelected ? "white" : "#0401100D",
                      },
                      "& .text-primary": {
                        color: isSelected ? "white" : "#333333",
                      },

                      "& .text-secondary": {
                        color: isSelected ? "white" : "#cacaca",
                      },

                      "&:hover": {
                        background: isSelected ? "linear-gradient(180deg, #13BECF 0%, #455869 100%)" : "linear-gradient(180deg, #13BECF 0%, #455869 100%)",

                        "& .image-box": {
                          backgroundColor: "white",
                        },
                        "& .text-primary": {
                          color: "white",
                        },

                        "& .text-secondary": {
                          color: "white",
                        },
                      },
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      className="image-box"
                      sx={{
                        position: "relative",
                        borderRadius: "20px",
                        backgroundColor: "#0401100D",
                        padding: "20px",
                        transition: "background-color 0.5s ease",
                      }}
                    >
                      <Checkbox
                        icon={
                          <RadioButtonUncheckedIcon
                            style={{ color: "white" }}
                          />
                        }
                        checkedIcon={
                          <CheckCircleIcon style={{ color: "#13BECF" }} />
                        }
                        checked={selectedCard === index}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          zIndex: 1,
                          "& .MuiSvgIcon-root": {
                            backgroundColor: "white",
                            borderRadius: "50%",
                          },
                        }}
                      />

                      <CardMedia
                        component="img"
                        sx={{ width: 154, height: 159 }}
                        image={IMAGE}
                        alt="No Image Available"
                      />
                    </Box>

                    <CardContent sx={{ padding: "0px", paddingTop: "24px" }}>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: "600" }}
                        component="div"
                        className="text-primary"
                      >
                        {item?.title}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "14px", fontWeight: "400" }}
                        className="text-secondary"
                      >
                        {item?.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {!campaignDetails ? (
        <>
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
                backgroundColor:'#445A68',
                color:'#FFFFFF',
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
                borderRadius: "40px",
                padding: "16px 24px",
                color: "#FFFFFF",
                background:'linear-gradient(0deg, #13BECF 0%, #435D6B 100%)',
                fontSize: "18px",
                fontWeight: "600",
                border: "1px solid #13BECF",
              }}
              onClick={handleSaveandNext}
            >
              Save and Next
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}

      {campaignDetails ? (
        <CampaignDetails
          formValues={formValues}
          classes={classes}
          setCampaignDetails={setCampaignDetails}
          handleNext={handleNext}
          setFormValues={setFormValues}
          setCampaignId={setCampaignId}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default CampaignType;
