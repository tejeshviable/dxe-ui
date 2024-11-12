import React, { useEffect, useState } from "react";
import { fetchDataRequestDataSlice } from "../../../redux/teamSlice/team.slice";
import { fetchDiscoverIdSlice } from "../../../redux/stepperSlice/stepper.slice";
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
    Switch,
    Button,
    Tabs,
    Tab
} from "@mui/material";
import {
    fetchDataRequestStatusSlice,
    fetchDataRequestUpdateSlice,
    fetchDataRequestViewSlice,
} from "../../../redux/dataRequestSlice/dataRequest.slice";
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
import SortIcon from '@mui/icons-material/Sort';
import ApprovedBtnSelected from '../../../assets/Approved 4.svg'
import PendingBtnSelected from '../../../assets/Pending 2.svg'
import RejectedBtnSelected from '../../../assets/Rejected 3.svg'
import ApproveBtnUnSelected from '../../../assets/Approved Unselected 1.svg'
import PendingBtnUnSelected from '../../../assets/Pending Unselected.svg'
import RejectedBtnUnSelected from '../../../assets/Rejected Unselected.svg'
import CustomPagination from "../../../components/CustomPagination/CustomPagination";

function convertToUpperSnakeCase(input) {
    return input.toUpperCase().replace(/ /g, "_");
}

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 49,
    height: 24,
    padding: 0,
    borderRadius: '12px',
    backgroundColor: '#13BECF',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 16,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translate(9px,2px);',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        transform: 'translate(3px,2px);',
        '&.Mui-checked': {
            transform: 'translate(27px,2px);',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#13BECF',
                ...theme.applyStyles('dark', {
                    backgroundColor: '#177ddc',
                }),
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 16,
        height: 16,
        borderRadius: 8,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
        ...theme.applyStyles('dark', {
            backgroundColor: 'rgba(255,255,255,.35)',
        }),
    },
}));


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
    // const { dataRequest, loading, totalItems } = useSelector(
    //   (state) => state.teamsDetails
    // );
    const { viewDataRequestData } = useSelector((state) => state.dataRequest);
    const [open, setOpen] = useState(false);
    const [openRowIndex, setOpenRowIndex] = useState(null);
    const [selected, setSelected] = useState([]);
    const [wsCount, setWsCount] = useState(null);
    const isSelected = (id) => selected.indexOf(id) !== -1;
    const [showSpinner, setShowSpinner] = useState(true);
    const timeoutRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue)
        setOpenRowIndex(null);
    };
    const { dataRequestStatusData, totalItems, loading } = useSelector((state) => state.dataRequest)

    const handlePageChange = (newPage) => {
        setPage(newPage);
        setOpenRowIndex(null);
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
            const status = activeTab === 0 ? 'approved' : activeTab === 1 ? 'rejected' : activeTab === 2 ? 'pending' : null;

            const successResult = await dispatch(fetchDataRequestStatusSlice({ page, rowsPerPage, status })).unwrap();

            if (successResult) {
                setOpenRowIndex(null);
            }
            else {
                console.log("Error");
            }

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

        const status = activeTab === 0 ? 'approved' : activeTab === 1 ? 'rejected' : activeTab === 2 ? 'pending' : null;

        dispatch(fetchDataRequestStatusSlice({ page, rowsPerPage, status }));
    }, [dispatch, page, rowsPerPage, activeTab]);

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

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>

                <Button
                    variant="contained"
                    disabled
                    endIcon={<SortIcon />}
                    sx={{
                        color: "#fff",
                        backgroundColor: '#13BECF',
                        borderRadius: "10px",
                        fontSize: "16px",
                        fontWeight: "500",
                        borderRadius: '6px',
                        // border: "1px solid #13BECF",
                        cursor: 'not-allowed'
                    }}
                >

                    Sort
                </Button>

                <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>

                    <Typography sx={{ fontSize: '22px', color: '#13BECF' }}>
                        Data Contributor
                    </Typography>
                    <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                </Box>
            </Box>

            <Box sx={{ paddingTop: '8px', width: '100%' }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    TabIndicatorProps={{ style: { display: 'none' } }}
                    sx={{
                        '& .MuiTabs-flexContainer': {
                            borderRadius: '8px',
                            padding: '4px',
                            gap: '8px',
                        },
                    }}
                >
                    <Tab
                        sx={{ padding: '0px', borderRadius: '10px' }}
                        label={
                            <Button sx={{
                                padding: '0px !important', width: '100%', minHeight: '48px', borderRadius: '10px'
                            }}>
                                <img
                                    src={activeTab === 0 ? ApprovedBtnSelected : ApproveBtnUnSelected}
                                    alt="Approved"
                                    style={{ width: '100%', height: '100%', borderRadius: '10px', boxShadow: activeTab === 0 ? '0px 4px 7px 2px rgba(0, 0, 0, 0.17)' : '' }}
                                />
                            </Button>
                        }
                    />
                    <Tab
                        sx={{ padding: '0px', borderRadius: '10px' }}
                        label={
                            <Button sx={{
                                padding: '0px !important', width: '100%', minHeight: '48px', borderRadius: '10px'
                            }}>
                                <img
                                    src={activeTab === 1 ? RejectedBtnSelected : RejectedBtnUnSelected}
                                    alt="Rejected"
                                    style={{ width: '100%', height: '100%', borderRadius: '10px', boxShadow: activeTab === 1 ? '0px 4px 7px 2px rgba(0, 0, 0, 0.17)' : '' }}
                                />
                            </Button>
                        }
                    />
                    <Tab
                        sx={{ padding: '0px', borderRadius: '10px' }}
                        label={
                            <Button sx={{ padding: '0px !important', width: '100%', minHeight: '48px', borderRadius: '10px' }}>
                                <img
                                    src={activeTab === 2 ? PendingBtnSelected : PendingBtnUnSelected}
                                    alt="Pending"
                                    style={{ width: '100%', height: '100%', borderRadius: '10px', boxShadow: activeTab === 2 ? '0px 4px 7px 2px rgba(0, 0, 0, 0.17)' : '' }}
                                />
                            </Button>
                        }
                    />
                </Tabs>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mt: 4 }}>

                <Typography sx={{
                    fontSize: '19px',
                    fontWeight: '600',
                    background: 'linear-gradient(180deg, #13BECF 0%, #455967 100%)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                }}>
                    {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, totalItems)} <span style={{ color: '#455967' }}>of {totalItems}</span>
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
                            {dataRequestStatusData?.content?.map((row, index) => {
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
