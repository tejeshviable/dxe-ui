import React, { useEffect, useState, useCallback } from "react";
import { useRef } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  Select,
  Chip,
  MenuItem,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import {
  fetchPrimarySelectSlice,
  fetchPrimaryOptionsSlice,
  fetchSecondarySelectSlice,
  fetchSecondaryOptionsSlice,
  fetchDiscoverIdSlice,
} from "../../../redux/stepperSlice/stepper.slice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import {
  setDiscoverFields,
  socketCounts,
} from "../../../redux/stepperSlice/stepper.slice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
// import BudgetManagement from "./BudgetManagement";

const AudienceManager = ({
  handleChange,
  formValues,
  classes,
  prevStep,
  handleNext,
  setAudienceData,
  setFormValues,
}) => {
  const dispatch = useDispatch();
  const audienceData = useSelector((state) => state.stepper);
  const [attributes, setAttributes] = useState([]);
  const [primaryOptions, setPrimaryOptions] = useState({});
  const [secondaryOptions, setSecondaryOptions] = useState({});
  const [secondaryAttributes, setSecondaryAttributes] = useState([]);
  const [loadingPrimary, setLoadingPrimary] = useState(false);
  const [loadingSecondary, setLoadingSecondary] = useState(false);
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [allAttributes, setAllAttributes] = useState([]);
  const [filteredAttributes, setFilteredAttributes] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [loadingState, setLoadingState] = useState({});
  const { discoverFields, socketCountsData } = useSelector(
    (state) => state.stepper
  );
  const wsRef = useRef(new Map()); // Use a Map to store WebSocket connections
  // const [socketData, setSocketData] = useState({}); // Assuming this is defined in your component

  const setupWebSocket = useCallback((socketId, attributeCode) => {
    if (wsRef.current.has(socketId)) {
      console.warn(`WebSocket for ${socketId} already exists.`);
      return; // Prevent creating multiple connections for the same socketId
    }

    const ws = new WebSocket(
      `ws://13.232.49.252:7006/api/dxe/websocket/websocket?id=${socketId}`
    );
    wsRef.current.set(socketId, ws);
    ws.onmessage = (event) => {
      const newValue = event.data;
      // setSocketData((prev) => ({
      //   ...prev,
      //   [attributeCode]: newValue,
      // }));

      setLoadingState((prevState) => ({
        ...prevState,
        [attributeCode]: false,
      }));

      dispatch(
        socketCounts({
          [attributeCode]: newValue,
        })
      );
    };

    // dispatch(socketCounts(socketData))
    ws.onopen = () =>
      console.log(`WebSocket connection opened for ${socketId}.`);
    ws.onclose = () => {
      console.log(`WebSocket connection closed for ${socketId}.`);
      wsRef.current.delete(socketId); // Remove closed WebSocket from Map
    };

    return ws;
  }, []);

  // Cleanup WebSockets on unmount
  useEffect(() => {
    return () => {
      wsRef.current.forEach((ws) => ws?.close());
      wsRef.current.clear();
    };
  }, []);

  // Example usage of setupWebSocket
  useEffect(() => {
    const socketId = "your_socket_id"; // Replace with actual socketId
    const attributeCode = "your_attribute_code"; // Replace with actual attributeCode
    const ws = setupWebSocket(socketId, attributeCode);

    return () => {
      ws?.close(); // Close the specific WebSocket on unmount
      wsRef.current.delete(socketId); // Ensure it's removed from the Map
    };
  }, [setupWebSocket]);

  useEffect(() => {
    const fetchAttributes = async () => {
      setLoadingPrimary(true);
      try {
        await dispatch(fetchPrimarySelectSlice()).unwrap();
      } catch (error) {
        console.error("Failed to fetch primary attributes:", error);
      } finally {
        setLoadingPrimary(false);
      }

      setLoadingSecondary(true);
      try {
        await dispatch(fetchSecondarySelectSlice()).unwrap();
      } catch (error) {
        console.error("Failed to fetch secondary attributes:", error);
      } finally {
        setLoadingSecondary(false);
      }
    };

    fetchAttributes();
  }, [dispatch]);

  // Update attributes and options once fetched
  useEffect(() => {
    if (audienceData?.primary) {
      setAttributes(audienceData.primary);
    }
    if (audienceData?.secondary) {
      setSecondaryAttributes(audienceData.secondary || []);
    }
  }, [audienceData]);

  const fetchPrimaryOptions = useCallback(
    async (attributeCode) => {
      if (primaryOptions[attributeCode]) return;
      try {
        await dispatch(fetchPrimaryOptionsSlice(attributeCode)).unwrap();
        const fetchedOptions = audienceData.primaryOption[attributeCode];
        setPrimaryOptions((prev) => ({
          ...prev,
          [attributeCode]: fetchedOptions,
        }));
      } catch (error) {
        console.error("Failed to fetch primary options:", error);
      }
    },
    [audienceData.primaryOption, dispatch, primaryOptions]
  );

  const fetchSecondaryOptions = useCallback(
    async (attributeCode) => {
      if (secondaryOptions[attributeCode]) return;
      try {
        await dispatch(fetchSecondaryOptionsSlice(attributeCode)).unwrap();
        const fetchedOptions = audienceData.secondaryOptions[attributeCode];
        setSecondaryOptions((prev) => ({
          ...prev,
          [attributeCode]: fetchedOptions,
        }));
      } catch (error) {
        console.error("Failed to fetch secondary options:", error);
      }
    },
    [audienceData.secondaryOptions, dispatch, secondaryOptions]
  );

  const handleAutocompleteChange = useCallback(
    (attributeCode, type, attributeName) => async (event, newValue) => {
      console.log("newValue", attributeName);

      handleChange({
        target: {
          name: attributeCode,
          value: newValue,
        },
      });

      const updatedFormValues = {
        ...formValues,
        [attributeCode]: newValue,
      };

      setFormValues(updatedFormValues);
      const newAttributes = newValue.map((value) => ({
        code: attributeCode,
        value: value,
        type: type,
        name: attributeName,
      }));

      const updateData = {
        name: attributeCode,
        value: newValue,
        type: type,
      };

      const updatedAttributes = [
        ...allAttributes.filter((attr) => attr.name !== attributeCode),
        ...newAttributes, // Add the new values
      ];

      setAllAttributes(updatedAttributes);

      const data = { attributes: [updateData] };

      const response = await dispatch(fetchDiscoverIdSlice(data)).unwrap();
      setSocketId(response.requestId);
      const newSocketId = response.requestId;
      const ws = setupWebSocket(newSocketId, attributeCode);

      const updatedDiscoverFields = [
        ...discoverFields.filter((attr) => attr.name !== attributeCode),
        ...newAttributes,
      ];

      setDiscoverFields(updatedDiscoverFields);
      dispatch(setDiscoverFields(updatedDiscoverFields));
      setAudienceData(data);
    },
    [
      handleChange,
      allAttributes,
      formValues,
      dispatch,
      setSocketId,
      setSocket,
      discoverFields,
      setupWebSocket,
    ]
  );

  useEffect(() => {
    const fetchAllPrimaryOptions = async () => {
      try {
        const fetchPromises = attributes.map((attribute) =>
          fetchPrimaryOptions(attribute.attributeCode)
        );
        await Promise.all(fetchPromises);
      } catch (error) {
        console.error("Error fetching primary options:", error);
      }
    };

    if (attributes.length > 0) {
      fetchAllPrimaryOptions();
    }
  }, [attributes]);

  useEffect(() => {
    const fetchAllSecondaryOptions = async () => {
      try {
        const fetchPromises = secondaryAttributes.map((attribute) =>
          fetchSecondaryOptions(attribute.attributeCode)
        );
        await Promise.all(fetchPromises);
      } catch (error) {
        console.error("Error fetching secondary options:", error);
      }
    };

    if (secondaryAttributes.length > 0) {
      fetchAllSecondaryOptions();
    }
  }, [secondaryAttributes]);

  useEffect(() => {
    if (formValues && formValues.Parentattributes) {
      setFilteredAttributes(formValues?.Parentattributes);
    }
  }, [formValues]);

  const handleDeleteChip = (attributeCode, optionToDelete) => {
    // handleAutocompleteChange(attributeCode,optionToDelete)

    setFormValues((prevValues) => ({
      ...prevValues,
      [attributeCode]: prevValues[attributeCode].filter(
        (option) => option !== optionToDelete
      ),
    }));

    if (optionToDelete && optionToDelete.attributeCode) {
      const attributeCodeToCheck = optionToDelete.attributeCode;
      if (socketCountsData.hasOwnProperty(attributeCodeToCheck)) {
        const updatedSocketCounts = { ...socketCountsData };
        updatedSocketCounts[attributeCodeToCheck] = 0;
        dispatch(socketCounts(updatedSocketCounts));
      }
    }
  };

  useEffect(() => {
    if (filteredAttributes.length === 0) {
      dispatch(setDiscoverFields([]));
      dispatch(socketCounts({}));
      setLoadingState({});
    }
  }, [filteredAttributes]);

  const handleAccordionChange = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <form>
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
            defaultExpanded
            onChange={handleAccordionChange}
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
                {expanded ? (
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
                Audience Manager
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Grid
                container
                spacing={2}
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "left",
                  alignItems: "left",
                  marginY: "30px",
                }}
              >
                {/* <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
                 
                </Grid> */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "block", textAlign: "left" }}
                >
                  <Button
                    disabled
                    variant="contained"
                    sx={{
                      width: {
                        // xs: "100%",
                        // sm: "150px",
                      },
                      paddingX: "25px",
                      cursor: "not-allowed",

                      height: "64px",
                      borderRadius: "10px",

                      background: "#445A68",
                      borderWidth: "1px",
                      color: "#fff",
                      marginRight: "20px",
                      "&.Mui-disabled": {
                        borderColor: "blue",
                        color: "#333",
                      },
                    }}
                  >
                    Add Saved Audience
                  </Button>

                  <Button
                    disabled
                    variant="contained"
                    sx={{
                      width: {
                        // xs: "100%",
                        // sm: "150px",
                      },
                      height: "64px",
                      paddingX: "25px",
                      borderRadius: "10px",
                      cursor: "not-allowed",
                      // borderColor: "#EF4B07",
                      background: "#13BECF",
                      // borderWidth: "1px",
                      color: "#fff",
                      "&.Mui-disabled": {
                        // borderColor: "blue",
                        color: "gray",
                      },
                    }}
                  >
                    Add Audience
                  </Button>
                </Grid>
              </Grid>
              <Typography
                variant="h5"
                sx={{ marginLeft: 1 }}
                className={classes.additionInfo}
              >
                Add Parameters
              </Typography>

              <Autocomplete
                multiple
                options={secondaryAttributes}
                getOptionLabel={(option) => option.attributeName}
                value={filteredAttributes}
                onChange={(event, newValue) => {
                  // Find attributes that were removed (those that were previously selected but now aren't)
                  const removedAttributes = filteredAttributes.filter(
                    (attr) => !newValue.includes(attr)
                  );

                  const addedAttributes = newValue.filter(
                    (attr) => !filteredAttributes.includes(attr)
                  );
                  removedAttributes.forEach((attr) => {
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      [attr.attributeCode]: [],
                    }));
                  });

                  addedAttributes.forEach((attr) => {
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      [attr.attributeCode]: [],
                    }));
                  });

                  setFilteredAttributes(newValue);

                  setFormValues((prevValues) => ({
                    ...prevValues,
                    Parentattributes: newValue,
                  }));
                }}
                inputValue={searchInputValue}
                onInputChange={(event, newInputValue) =>
                  setSearchInputValue(newInputValue)
                } // Update search input without clearing selected values
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Search and select attributes"
                    placeholder="Type to search attributes"
                    sx={{ marginTop: "15px" }}
                  />
                )}
                renderTags={() => null} // Prevent default rendering of tags
              />

              {/* Display Selected Chips */}
              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {filteredAttributes.map((option, index) => (
                  <Chip
                    key={index}
                    label={option.attributeName} // Use attributeName for display
                    onDelete={() =>
                      handleDeleteChip("Parentattributes", option)
                    }
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

              {loadingSecondary ? (
                <Typography variant="body1" color="textSecondary">
                  Loading secondary attributes...
                </Typography>
              ) : (
                filteredAttributes.map((attribute) => (
                  <Grid item xs={12} key={attribute.id} mt={2}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography className={classes.label}>
                        {attribute.attributeName}
                      </Typography>

                      {/* Audience count on the right */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 400,
                          fontSize: "18px",
                          fontStyle: "italic",
                          color: "#00ADEB",
                          marginRight: "10px", // Adds space to the right
                        }}
                      >
                        {attribute.attributeName} Count:{" "}
                        {loadingState[attribute.attributeCode] ? (
                          <CircularProgress size={15} />
                        ) : socketCountsData[attribute?.attributeCode] ? (
                          socketCountsData[attribute?.attributeCode]
                        ) : (
                          "0"
                        )}
                      </Typography>
                    </Box>

                    <Autocomplete
                      multiple
                      options={secondaryOptions[attribute.attributeCode] || []} // Options specific to the attribute
                      getOptionLabel={(option) => option.name || option}
                      value={formValues[attribute.attributeCode] || []} // Controlled value
                      onChange={handleAutocompleteChange(
                        attribute.attributeCode,
                        attribute.type,
                        attribute.attributeName
                      )} // Update form values
                      onOpen={() => {
                        setLoadingState((prevState) => ({
                          ...prevState,
                          [attribute.attributeCode]: true,
                        }));
                        fetchSecondaryOptions(attribute.attributeCode);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          className={classes.textField}
                          placeholder={`Select options for ${attribute.attributeName}`}
                        />
                      )}
                      renderTags={() => null}
                    />

                    <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                      {formValues[attribute.attributeCode]?.map(
                        (option, index) => (
                          <Chip
                            key={index}
                            label={option.name || option}
                            onDelete={() =>
                              handleDeleteChip(attribute.attributeCode, option)
                            }
                            sx={{
                              borderRadius: "18px",
                              marginBottom: "15px",
                              background: "#445A68E5",
                              color: "#fff",
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
                        )
                      )}
                    </Box>
                  </Grid>
                ))
              )}
            </AccordionDetails>
          </Accordion>
          {/* <BudgetManagement classes={classes}/> */}
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
            borderRadius: "40px",
            padding: "16px 24px",
            fontSize: "18px",
            color: "#FFFFFF",
            background:'linear-gradient(0deg, #13BECF 0%, #435D6B 100%)',
            fontWeight: "600",
            border: "1px solid #13BECF",
          }}
          onClick={handleNext}
        >
          Save and Next
        </Button>
      </Box>
    </form>
  );
};

export default AudienceManager;
