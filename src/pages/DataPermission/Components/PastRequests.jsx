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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomPagination from "../../../components/CustomPagination/CustomPagination";


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

function formatDate(dateString) {
    if (!dateString) {
        return false
    }
    const date = new Date(dateString);

    // Options for formatting
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        //   hour: "numeric",
        //   minute: "numeric",
        //   hour12: true, // Use 12-hour format
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
}


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

const ResponsiveTableRow = ({
    openRowIndex,
    index,
    rowData
}) => {
    const dispatch = useDispatch();
    console.log("data", rowData);
    return (
        openRowIndex === index && (
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                    sx={{ backgroundColor: "#D5F3F666" }}
                >
                    <Collapse in={openRowIndex === index} timeout="auto" unmountOnExit>

                        <Grid2 container item size={{ md: 12 }} sx={{ padding: '16px' }}>
                            {
                                rowData?.attributes.map((item, index) => {
                                    return (
                                        <>
                                            <Chip
                                                key={index}
                                                label={item}
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
                                        </>
                                    )
                                })
                            }
                        </Grid2>
                    </Collapse>
                </TableCell>
            </TableRow>
        )
    );
};



const PastRequests = ({ pastRequestData, handlePageChange, handleRowsPerPageChange, totalItems, rowsPerPage, page }) => {

    const loading = false;
    const [openRowIndex, setOpenRowIndex] = useState(null);
    const [rowData, setRowData] = useState([]);

    const handleViewDetails = (row, index) => {
        setRowData(row);
        setOpenRowIndex(openRowIndex === index ? null : index);
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
                <Typography sx={{ color: '#445A68', fontSize: '26px', fontWeight: '600' }}>Past Requests</Typography>

                <Typography
                    sx={{
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
                sx={{ mt: 3, border: "1px solid #D4D4D4", borderRadius: "12px" }}>

                {loading ? (<Box display="flex" justifyContent="center" my={3}>
                    <CircularProgress />
                </Box>) : (
                    <Table aria-label="campaign table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ minWidth: '140px' }}>
                                    <TableHeadTitle>Mobile Number</TableHeadTitle>
                                </TableCell>
                                <TableCell>
                                    <TableHeadTitle sx={{ minWidth: '140px' }}>Requested On</TableHeadTitle>
                                </TableCell>
                                <TableCell>
                                    <TableHeadTitle sx={{ minWidth: '150px' }}>Data Requested</TableHeadTitle>
                                </TableCell>
                                {/* <TableCell></TableCell> */}
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                pastRequestData?.content?.map((row, index) => {

                                    return (
                                        <>
                                            <StyledTableRow
                                                key={row.id}
                                                onClick={() => {
                                                    handleViewDetails(row, index);
                                                }}
                                                style={{
                                                    cursor: "pointer",
                                                    backgroundColor: openRowIndex === index ? "#D5F3F6" : "inherit",
                                                }}

                                            >
                                                <TableCell>{row.value}</TableCell>
                                                <TableCell>{formatDate(row.createdDate)}</TableCell>
                                                <TableCell>
                                                    <span style={{ color: '#445A68' }}>
                                                        {row?.attributes.slice(0, 3).join(', ')}
                                                        {row?.attributes.length > 2 ? ', ...' : ''}
                                                    </span>
                                                </TableCell>
                                                {/* <TableCell>
                                                    <Box display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                                                        <Chip
                                                            // key={idx}
                                                            label={'Pending'}
                                                            size="small"
                                                            onClick={(event) => event.stopPropagation()}
                                                            style={{
                                                                margin: "2px",
                                                            }}
                                                            sx={{
                                                                borderRadius: "6px",
                                                                border: '1px solid #E7E7E7',
                                                                background: "#FFF",
                                                                color: "#455967",
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
                                                        <Chip
                                                            // key={idx}
                                                            label={'Withdraw'}
                                                            size="small"
                                                            onClick={(event) => event.stopPropagation()}
                                                            style={{
                                                                margin: "2px",
                                                            }}
                                                            sx={{
                                                                borderRadius: "6px",
                                                                border: '1px solid #F95D5D',
                                                                background: "#FFF",
                                                                color: "#455967",
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
                                                    </Box>
                                                </TableCell> */}
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

                                            <ResponsiveTableRow openRowIndex={openRowIndex} index={index} rowData={rowData} />
                                        </>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <CustomPagination
                rowsPerPageOptions={[5, 10, 25]}
                count={totalItems}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => handlePageChange(newPage)}
                onRowsPerPageChange={(e) =>
                    handleRowsPerPageChange(parseInt(e.target.value, 10))
                }
            />
        </>
    )
}

export default PastRequests