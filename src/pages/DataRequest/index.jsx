import React, { useEffect, useState } from "react";
import { fetchDataRequestDataSlice } from "../../redux/teamSlice/team.slice";
import { fetchDiscoverIdSlice } from "../../redux/stepperSlice/stepper.slice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
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
  Breadcrumbs,
  Avatar,
  TablePagination,
  IconButton,
  Collapse,
  Grid2,
} from "@mui/material";
import {
  fetchDataRequestUpdateSlice,
  fetchDataRequestViewSlice,
} from "../../redux/dataRequestSlice/dataRequest.slice";
import Chip from "@mui/material/Chip";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import DoneIcon from "@mui/icons-material/Done";
import PersonIcon from "@mui/icons-material/Person";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import DescriptionIcon from "@mui/icons-material/Description";
import PieChartIcon from "@mui/icons-material/PieChart";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { toast } from "react-toastify";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useMediaQuery } from "@mui/material";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

function convertToUpperSnakeCase(input) {
  return input.toUpperCase().replace(/ /g, "_");
}

function formatDate(dateString) {
  const date = new Date(dateString);

  // Options for formatting
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // hour12: true, // Use 12-hour format
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
  boxWidth: { width: "25%" },
  labelText: { color: "#455967", fontWeight: "600", fontSize: "16px" },
  labelTextself: { color: "#13becf", fontWeight: "600", fontSize: "16px" },

  valueText: { fontSize: "14px", fontWeight: "400", color: "#455967" },
  chip: {
    borderRadius: "18px",
    background: "#FF8D5D",
    color: "#fff",
    "& .MuiChip-deleteIcon": { color: "white", fontSize: "16px" },
    "& .MuiChip-deleteIcon:hover": {
      backgroundColor: "transparent",
      color: "white",
    },
    margin: "2px",
  },
};

const ResponsiveTableRow = ({
  openRowIndex,
  index,
  viewDataRequestData,
  wsCount,
  showSpinner,
  row,
  HandleStatusButton,
}) => {
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  return (
    openRowIndex === index && (
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
          sx={{ backgroundColor: "#D5F3F666" }}
        >
          <Collapse in={openRowIndex === index} timeout="auto" unmountOnExit>
            <Box sx={styles.container(isSmallScreen)}>
              {/* Campaign Information */}
              <Box sx={styles.boxWidth}>
                <Typography sx={styles.labelText}>
                  Campaign Name:{" "}
                  <span style={styles.valueText}>
                    {viewDataRequestData?.campaign?.campaignName}
                  </span>
                </Typography>
              </Box>
              <Box sx={styles.boxWidth}>
                <Typography sx={styles.labelText}>
                Website URL:{" "}
                  <span style={styles.valueText}>
                    {viewDataRequestData?.campaign?.description}
                  </span>
                </Typography>
              </Box>
              <Box sx={styles.boxWidth}>
                <Typography sx={styles.labelText}>
                  Start Date:{" "}
                  <span style={styles.valueText}>
                    {viewDataRequestData?.campaign?.startDate
                      ? formatDate(viewDataRequestData?.campaign?.startDate)
                      : "N/A"}
                  </span>
                </Typography>
              </Box>
              <Box sx={styles.boxWidth}>
                <Typography sx={styles.labelText}>
                  End Date:{" "}
                  <span style={styles.valueText}>
                    {viewDataRequestData?.campaign?.endDate
                      ? formatDate(viewDataRequestData?.campaign?.endDate)
                      : "N/A"}
                  </span>
                </Typography>
              </Box>
            </Box>

            <Grid2 container sx={{ marginTop: "8px", paddingX: 2 }}>
              <Grid2 size={{ md: 3 }}>
                {viewDataRequestData?.selfAttributes?.length ? (
                  viewDataRequestData?.selfAttributes?.map((item, index) => {
                    return (
                      <Box key={index} style={{ marginBottom: "8px" }}>
                        <Typography sx={styles.labelTextself}>
                          {item.name}:
                        </Typography>

                        {item.value.map((val, idx) => (
                          <Chip
                            key={idx}
                            label={val}
                            size="small"
                            style={{ margin: "2px" }}
                            sx={{
                              borderRadius: "18px",
                              marginBottom: "4px",
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
                    );
                  })
                ) : (
                  <Typography sx={{ py: 2 }}>
                    No Data Avaiable for Self Attributes
                  </Typography>
                )}
              </Grid2>
              <Grid2 size={{ md: 3 }}>
                {viewDataRequestData?.restAttributes?.length ? (
                  viewDataRequestData?.restAttributes?.map((item, index) => {
                    return (
                      <Box key={index} style={{ marginBottom: "8px" }}>
                        <Typography sx={styles.labelText}>
                          {item.name}:
                        </Typography>

                        {item.value.map((val, idx) => (
                          <Chip
                            key={idx}
                            label={val}
                            size="small"
                            style={{ margin: "2px" }}
                            sx={{
                              borderRadius: "18px",
                              marginBottom: "4px",
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
                    );
                  })
                ) : (
                  <Typography sx={{ py: 2 }}>
                    No Data Avaiable for Rest Attributes
                  </Typography>
                )}
              </Grid2>

              <Grid2 size={{ md: 3 }}>
                <Typography sx={{ fontWeight: "bold", color: "#333" }}>
                  Count:{" "}
                  {showSpinner ? <CircularProgress size={12} /> : wsCount}
                </Typography>
              </Grid2>

              <Grid2 size={{ md: 3 }}>
                {row?.status === "pending" ? (
                  <Box
                    sx={{
                      display: "flex",
                      // flexDirection: 'column',
                      gap: "8px",
                      // justifyContent: 'center',
                      alignItems: "center",
                      minHeight: "56px", // Set minimum height to avoid uneven rows
                    }}
                  >
                    <>
                      <Chip
                        label="Approve"
                        color="success"
                        variant="outlined"
                        onClick={() => HandleStatusButton(row, "approved")}
                      />
                      <Chip
                        label="Reject"
                        variant="outlined"
                        onClick={() => HandleStatusButton(row, "rejected")}
                        sx={{
                          borderColor: "red",
                          color: "red",
                        }}
                      />
                    </>
                  </Box>
                ) : (
                  <Chip
                    label={
                      row?.status?.charAt(0).toUpperCase() +
                      row?.status?.slice(1).toLowerCase()
                    }
                    color={row?.status === "approved" ? "success" : "error"}
                    variant="outlined"
                    deleteIcon={<DoneIcon />}
                  />
                )}
              </Grid2>
            </Grid2>
          </Collapse>
        </TableCell>
      </TableRow>
    )
  );
};

const DataRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { dataRequest, loading, totalItems } = useSelector(
    (state) => state.teamsDetails
  );
  const { viewDataRequestData } = useSelector((state) => state.dataRequest);
  const [open, setOpen] = useState(false);
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [selected, setSelected] = useState([]);
  const [wsCount, setWsCount] = useState(null);
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const [showSpinner, setShowSpinner] = useState(true);
  const timeoutRef = useRef(null);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const HandleStatusButton = async (row, actionStatus) => {
    var data = {
      requestId: row?.dataRequest?.request_id,
      status: actionStatus,
    };

    const result = await dispatch(fetchDataRequestUpdateSlice(data)).unwrap();

    if (result) {
      dispatch(fetchDataRequestDataSlice({ page, rowsPerPage }));

      if (actionStatus === "approved") {
        toast.success("Successfully Approved.");
      } else {
        toast.error("Request Rejected.");
      }
    } else {
      console.log("Error");
    }
  };

  const wsRef = useRef(new Map());

  // This function handles WebSocket setup and clean-up
  const setupWebSocket = useCallback((socketId) => {
    if (wsRef.current.has(socketId)) {
      console.warn(`WebSocket for ${socketId} already exists.`);
      return;
    }

    const ws = new WebSocket(
      `ws://13.232.49.252:7006/api/dxe/websocket/websocket?id=${socketId}`
    );

    wsRef.current.set(socketId, ws);

    ws.onmessage = (event) => {
      //   const newValue = event.data;
      setWsCount(event.data);
      setShowSpinner(false);
      //   console.log('newValue count', newValue);
    };

    ws.onopen = () => {
      console.log(`WebSocket connection opened for ${socketId}.`);
    };

    ws.onclose = () => {
      console.log(`WebSocket connection closed for ${socketId}.`);
      wsRef.current.delete(socketId); // Remove closed WebSocket from Map
    };

    return ws;
  }, []);

  const handleViewDetails = async (row, index) => {
    const payload = {
      requestId: row?.dataRequest?.request_id,
    };

    const result = await dispatch(fetchDataRequestViewSlice(payload)).unwrap();
    console.log("row-----------------------", result?.selfAttributes);
    const newVal = { attributes: result?.selfAttributes };
    if (result) {
      setOpenRowIndex(openRowIndex === index ? null : index);

      // Only set up the WebSocket if it has not been set up already for the current row
      if (openRowIndex !== index) {
        const response = await dispatch(fetchDiscoverIdSlice(newVal)).unwrap();
        const newSocketId = response?.requestId;

        if (newSocketId) {
          setupWebSocket(newSocketId); // Set up the WebSocket for the current row
        } else {
          console.error("No socketId found in the response.");
        }
      }
    }
  };

  useEffect(() => {
    setShowSpinner(true);
  }, []);

  useEffect(() => {
    dispatch(fetchDataRequestDataSlice({ page, rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    console.log("WebSocket count updated:", wsCount);
  }, [wsCount]);

 

  return (
    <Box sx={{ mt: 5 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="text.secondary"
          href="/dashboard"
        >
          Home
        </Typography>

        <Typography
          sx={{ color: "text.primary", display: "flex", alignItems: "center" }}
        >
          Data Requests
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: "flex", marginTop: "16px" }}>
        <Typography
          sx={{ color: "#445A68", fontSize: "29px", fontWeight: "500" }}
        >
          Data Requests
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
                <TableCell sx={{minWidth:'170px'}}>
                  <BoxContainer>
                    <DescriptionIcon
                      fontSize={"14px"}
                      sx={{ color: "#455967" }}
                    />
                    <TableHeadTitle>Website URL</TableHeadTitle>
                    {/* <SwapVertIcon fontSize={"14px"} sx={{ color: "#455967" }} /> */}
                  </BoxContainer>
                </TableCell>
                <TableCell sx={{minWidth:'170px'}}>
                  <TableHeadTitle>
                    <BoxContainer>
                      <PieChartIcon
                        fontSize={"14px"}
                        sx={{ color: "#455967" }}
                      />
                      <TableHeadTitle>Discover Attributes</TableHeadTitle>
                      {/* <SwapVertIcon
                        fontSize={"14px"}
                        sx={{ color: "#455967" }}
                      /> */}
                    </BoxContainer>
                  </TableHeadTitle>
                </TableCell>
                <TableCell sx={{minWidth:'170px'}}>
                  <TableHeadTitle>
                    <BoxContainer>
                      <CheckBoxIcon
                        fontSize={"14px"}
                        sx={{ color: "#455967" }}
                      />
                      <TableHeadTitle>Status</TableHeadTitle>
                      {/* <SwapVertIcon
                        fontSize={"14px"}
                        sx={{ color: "#455967" }}
                      /> */}
                    </BoxContainer>
                  </TableHeadTitle>
                </TableCell>
                {/* <TableCell></TableCell> */}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {dataRequest?.content?.map((row, index) => {
                return (
                  <>
                    <StyledTableRow
                      key={row.id}
                      onClick={() => {
                        setShowSpinner(true);
                        handleViewDetails(row, index);
                      }}
                      style={{
                        cursor: "pointer",
                        backgroundColor: openRowIndex === index ? "#D5F3F6" : "inherit", // Highlight selected row
                      }}
                    >
                      <TableCell>
                        <BoxContainer
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <Avatar
                            alt="User 1"
                            src={`https://mui.com/static/images/avatar/${index}.jpg`}
                          />
                          <TableDataTitle>
                            {row.dataRequest
                              ? row.dataRequest.description
                              : row.description}
                          </TableDataTitle>
                        </BoxContainer>
                      </TableCell>
                      <TableCell>
                        <TableDataTitle
                        // sx={{
                        //     cursor: 'pointer',
                        //     '&:hover': {
                        //         color: '#1e88e5',
                        //         textDecoration: 'underline',
                        //     },
                        // }}
                        >
                          {row.dataRequest
                            ? row.dataRequest.attributes
                                .map(
                                  (attr) =>
                                    `${attr.name}: ${attr.possibleValues?.join(
                                      ", "
                                    )}`
                                )
                                .join("; ")
                            : row.attributes
                                .map(
                                  (attr) =>
                                    `${attr.name}: ${attr.possibleValues?.join(
                                      ", "
                                    )}`
                                )
                                .join("; ")}
                        </TableDataTitle>
                      </TableCell>
                      <TableCell>
                        <TableDataTitle>
                          {row.status === "pending"
                            ? "Pending"
                            : row.status === "approved"
                            ? "Approved"
                            : row.status === "rejected"
                            ? "Rejected"
                            : "N/A"}
                        </TableDataTitle>
                      </TableCell>

                      {/* <TableCell>
                        {row?.status === "pending" ? (
                          <Box
                            sx={{
                              display: "flex",
                              // flexDirection: 'column',
                              gap: "8px",
                              // justifyContent: 'center',
                              alignItems: "center",
                              minHeight: "56px", // Set minimum height to avoid uneven rows
                            }}
                          >
                            <>
                              <Chip
                                label="Approve"
                                color="success"
                                variant="outlined"
                                onClick={() =>
                                  HandleStatusButton(row, "approved")
                                }
                              />
                              <Chip
                                label="Reject"
                                variant="outlined"
                                onClick={() =>
                                  HandleStatusButton(row, "rejected")
                                }
                                sx={{
                                  borderColor: "red",
                                  color: "red",
                                }}
                              />
                            </>
                          </Box>
                        ) : (
                          <Chip
                            label="Done"
                            color="success"
                            variant="contained"
                            deleteIcon={<DoneIcon />}
                          />
                        )}
                      </TableCell> */}

                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          // onClick={() => }
                          onClick={() => {
                            handleViewDetails(row, index);
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

                    <ResponsiveTableRow
                      openRowIndex={openRowIndex}
                      index={index}
                      viewDataRequestData={viewDataRequestData}
                      row={row}
                      HandleStatusButton={HandleStatusButton}
                      wsCount={wsCount}
                      showSpinner={showSpinner}
                    />
                  </>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <CustomPagination
        rowsPerPageOptions={[5, 10, 25]}
        // component="div"
        // className="pagination"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => handlePageChange(newPage)}
        onRowsPerPageChange={(e) =>
          handleRowsPerPageChange(parseInt(e.target.value, 10))
        }
      />
    </Box>
  );
};

export default DataRequest;
