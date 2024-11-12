import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Box,
  Typography,
  CircularProgress,
  Breadcrumbs,
  Avatar,
  TablePagination,
  IconButton,
  Collapse,
  Grid2,
  Button,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchNotificationApproveSlice,
  fetchNotificationPreviewSlice,
} from "../../redux/teamSlice/team.slice";
import { NotificationApproveThunk } from "../../redux/teamSlice/team.thunk";
import { toast } from "react-toastify";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useMediaQuery } from "@mui/material";

function formatDate(dateString) {
  const date = new Date(dateString);

  // Options for formatting
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Use 12-hour format
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const BoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
}));

const TableHeadTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#455967",
  fontWeight: "500",
  lineHeight: "1.5rem",
}));

const TableDataTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#455967",
  fontWeight: "500",
}));

const styles = {
  container: (isSmallScreen) => ({
    padding: 2,
    display: "flex",
    justifyContent: "space-between",
    flexWrap: isSmallScreen ? "wrap" : "nowrap",
    flexDirection: isSmallScreen ? "column" : "row",
  }),
  boxWidth: { width: "50%" },
  labelText: { color: "#455967", fontWeight: "600", fontSize: "16px" },
  valueText: { fontSize: "14px", fontWeight: "400", color: "#455967" },
  chip: {
    borderRadius: "18px",
    background: "#445A68E5",
    color: "#fff",
    "& .MuiChip-deleteIcon": { color: "white", fontSize: "16px" },
    "& .MuiChip-deleteIcon:hover": {
      backgroundColor: "transparent",
      color: "white",
    },
    margin: "2px",
  },
};

const NotificationPreview = () => {
  const dispatch = useDispatch();
  const { notificationPreview, loading } = useSelector(
    (state) => state.teamsDetails
  );
  const [pageNumber] = useState(0);
  const [pageSize] = useState(10);
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  const fetchNotificationData = () => {
    dispatch(fetchNotificationPreviewSlice({ pageNumber, pageSize }));
  };

  useEffect(() => {
    fetchNotificationData();
  }, []);

  // console.log("noti", notificationPreview?.content);

  // const handleApprove = (item) => {
  //   console.log("handleApproveitem", item);

  //   const data = {
  //     id: item.requestId,
  //   };

  //   const result = dispatch(fetchNotificationApproveSlice(data)).unwrap();
  //   console.log(result, "roshanresult");
  //   fetchNotificationData();

  //   if (result) {
  //   } else {
  //   }
  // };

  const handleApprove = async (item) => {
    console.log("handleApproveitem", item);

    const data = {
      id: item.requestId,
    };

    try {
      // Dispatch the approval action and wait for it to finish
      const result = await dispatch(
        fetchNotificationApproveSlice(data)
      ).unwrap();

      // After the result is resolved, fetch new data
      fetchNotificationData();

      // Log success if needed
      console.log("Approval successful", result);
      // toast.success("Notification approved successfully!");
    } catch (error) {
      // Log the error if something goes wrong
      console.error("Approval failed", error);
      // toast.error("Failed to approve notification!");
    }
  };

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/dashboard"
        >
          Home
        </Typography>

        <Typography
          sx={{ color: "text.primary", display: "flex", alignItems: "center" }}
        >
          Notification Preview
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: "flex", marginTop: "16px" }}>
        <Typography
          sx={{ color: "#445A68", fontSize: "29px", fontWeight: "500" }}
        >
          Notification Preview
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ mt: 3, border: "1px solid #D4D4D4", borderRadius: "12px" }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" my={3}>
            <CircularProgress />
          </Box>
        ) : (
          <Table aria-label="campaign table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableHeadTitle>Description</TableHeadTitle>
                </TableCell>
                <TableCell>
                  <TableHeadTitle>Date</TableHeadTitle>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {notificationPreview?.content?.map((row, index) => {
                return (
                  <>
                    <StyledTableRow
                      hover
                      key={row.id}
                      onClick={() => {
                        setOpenRowIndex(openRowIndex === index ? null : index);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>{row.message}</TableCell>
                      <TableCell>
                        {row?.createdOn ? formatDate(row?.createdOn) : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            row?.status === "DRAFT" ? "Execute" : "Executed"
                          }
                          color="primary"
                          style={{
                            backgroundColor:
                              row?.status === "DRAFT"
                                ? "transparent"
                                : "#1976d2", // Primary color for Executed
                            color: row?.status === "DRAFT" ? "inherit" : "#fff", // White text for Executed
                            borderColor:
                              row?.status === "DRAFT" ? "#1976d2" : "#1976d2", // Primary border color for both
                          }}
                          variant="outlined"
                          onClick={(event) => {
                            event.stopPropagation();

                            if (row?.status === "APPROVED") {
                              // If the status is already Executed, show a toast
                              toast.info("Already Executed");
                            } else {
                              // If the status is not Executed, proceed with the approve action
                              handleApprove(row);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => {
                            setOpenRowIndex(
                              openRowIndex === index ? null : index
                            );
                          }}
                        >
                          {openRowIndex === index ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>

                    {openRowIndex === index && (
                      <TableRow>
                        <TableCell
                          style={{
                            paddingBottom: 0,
                            paddingTop: 0,
                          }}
                          colSpan={4}
                          sx={{ backgroundColor: "#D5F3F666" }}
                        >
                          <Collapse
                            in={openRowIndex === index}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box sx={styles.container(isSmallScreen)}>
                              <Box sx={styles.boxWidth}>
                                <Typography sx={styles.labelText}>
                                  Campaign Name:{" "}
                                  <span style={styles.valueText}>
                                    {row.message}
                                  </span>
                                </Typography>
                              </Box>
                              <Box sx={styles.boxWidth}>
                                <Typography sx={styles.labelText}>
                                  Start Date:{" "}
                                  <span style={styles.valueText}>
                                    {row?.createdOn
                                      ? formatDate(row?.createdOn)
                                      : "N/A"}
                                  </span>
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={styles.container(isSmallScreen)}>
                              {row?.attributes?.map((attr, index) => (
                                <Box key={index} sx={styles.boxWidth}>
                                  <Typography sx={styles.labelText}>
                                    {attr.name}:
                                    <span>
                                      {attr.possibleValues.map((value, idx) => (
                                        <Chip
                                          key={idx}
                                          label={value}
                                          size="small"
                                          style={{
                                            margin: "2px",
                                          }}
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
                                    </span>
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default NotificationPreview;
