import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  TablePagination,
  Card,
  Typography,
  Breadcrumbs,
  Grid2,
  Chip
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { fetchContentListSlice } from "../../redux/stepperSlice/stepper.slice";
import CustomModal from "../../components/CustomModal/CustomModal";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ContactsIcon from "@mui/icons-material/Contacts";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MmsIcon from "@mui/icons-material/Mms";
import DateRangeIcon from '@mui/icons-material/DateRange';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import BadgeIcon from '@mui/icons-material/Badge';
import CustomPagination from "../../components/CustomPagination/CustomPagination";


const useStyles = makeStyles((theme) => ({
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
const statusStyles = {
  active: {
    backgroundColor: "#e0f7e9",
    color: "#34a853",
  },
  offline: {
    backgroundColor: "#f5f5f5",
    color: "#9e9e9e",
  },
};

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
    month: "short",
    day: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    //   hour12: true, // Use 12-hour format
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}


const ContentLibrary = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { listContentData, totalItems, loading } = useSelector(
    (state) => state.stepper
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [popupImage, setPopUpImage] = useState("");

  const [selected, setSelected] = useState([]);
  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Function to handle row selection
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // Function to handle selecting all rows
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = listContentData.map((item) => item.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  useEffect(() => {
    dispatch(fetchContentListSlice({ page, rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleImageClick = (image) => {
    setPopUpImage(image);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPopUpImage("");
  };

  const filteredData = listContentData.filter(
    (item) =>
      item?.org?.orgName?.toLowerCase().includes(searchQuery) ||
      item?.org?.firstName?.toLowerCase().includes(searchQuery) ||
      item?.org?.lastName?.toLowerCase().includes(searchQuery) ||
      item?.org?.primaryPhone?.toLowerCase().includes(searchQuery) ||
      item?.org?.primaryEmailId?.toLowerCase().includes(searchQuery)
  );

  useEffect(() => {
    dispatch(fetchContentListSlice({ page, rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  console.log("listContentData----", listContentData);

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
          Content Library
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: "flex", marginTop: "16px" }}>
        <Typography
          sx={{ color: "#445A68", fontSize: "29px", fontWeight: "500" }}
        >
          Content Library
        </Typography>
      </Box>

      <Grid2 container sx={{ justifyContent: "end" }}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <TextField
            disabled
            variant="outlined"
            placeholder="Search"
            fullWidth
            className={classes.searchBar}
            sx={{ color: "#ECECEC" }}
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid2>
      </Grid2>

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
                {/* <TableCell>
                  <Checkbox
                    sx={{
                      "&.MuiCheckbox-indeterminate": {
                        color: "#13BECF",
                      },
                      "&.Mui-checked": {
                        color: "#13BECF",
                      },
                    }}
                    color="primary"
                    indeterminate={
                      selected?.length > 0 &&
                      selected?.length < listContentData?.length
                    }
                    checked={
                      listContentData?.length > 0 &&
                      selected?.length === listContentData?.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </TableCell> */}
                <TableCell sx={{minWidth:'170px'}}>
                  <BoxContainer>
                    <MmsIcon fontSize={"14px"} sx={{ color: "#455967" }} />
                    <TableHeadTitle>Media</TableHeadTitle>
                    {/* <SwapVertIcon fontSize={"14px"} sx={{ color: "#455967" }} /> */}
                  </BoxContainer>
                </TableCell>

                <TableCell sx={{minWidth:'170px'}}>
                  <BoxContainer>
                    <LocationOnIcon
                      fontSize={"14px"}
                      sx={{ color: "#455967" }}
                    />
                    <TableHeadTitle>Template Type</TableHeadTitle>
                    {/* <SwapVertIcon fontSize={"14px"} sx={{ color: "#455967" }} /> */}
                  </BoxContainer>
                </TableCell>

                <TableCell sx={{minWidth:'170px'}}>
                  <BoxContainer>
                    <BadgeIcon
                      fontSize={"14px"}
                      sx={{ color: "#455967" }}
                    />
                    <TableHeadTitle>Template Name</TableHeadTitle>
                    {/* <SwapVertIcon fontSize={"14px"} sx={{ color: "#455967" }} /> */}
                  </BoxContainer>
                </TableCell>
                <TableCell sx={{minWidth:'170px'}}>
                  <BoxContainer>
                    <DateRangeIcon fontSize={"14px"} sx={{ color: "#455967" }} />
                    <TableHeadTitle>Created At</TableHeadTitle>
                    {/* <SwapVertIcon fontSize={"14px"} sx={{ color: "#455967" }} /> */}
                  </BoxContainer>
                </TableCell>


                <TableCell sx={{minWidth:'170px'}}>
                  <BoxContainer>
                    <NewReleasesIcon
                      fontSize={"14px"}
                      sx={{ color: "#455967" }}
                    />
                    <TableHeadTitle>Status</TableHeadTitle>
                    {/* <SwapVertIcon fontSize={"14px"} sx={{ color: "#455967" }} /> */}
                  </BoxContainer>
                </TableCell>






                <TableCell sx={{minWidth:'100px'}}>
                  {/* <BoxContainer>
                                        <TableHeadTitle>Actions</TableHeadTitle>
                                        <SwapVertIcon fontSize={'14px'} sx={{ color: "#455967" }} />
                                    </BoxContainer> */}
                </TableCell>


              </TableRow>
            </TableHead>

            <TableBody>
              {listContentData.map((item, key) => {
                const isItemSelected = isSelected(item.id);
                const labelId = `campaign-table-checkbox-${item.id}`;
                return (
                  <StyledTableRow
                    onClick={(event) => handleClick(event, item.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={item.id}
                    selected={isItemSelected}
                  >
                    {/* <TableCell>
                      <Checkbox
                        color="primary"
                        sx={{
                          "&.Mui-checked": {
                            color: "#13BECF",
                          },
                        }}
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell> */}
                    <TableCell>
                      <img
                        src={item?.content}
                        width={50}
                        height={50}
                        alt="Logo"
                        style={{ cursor: "pointer", borderRadius: "6px" }}
                        onClick={() => handleImageClick(item?.content)}
                      />
                    </TableCell>

                    {/* <TableCell>{item?.org?.firstName}{" "}{item?.org?.lastName}</TableCell> */}
                    <TableCell>
                      <TableDataTitle>{item?.contentType}</TableDataTitle>
                    </TableCell>
                    {/* <TableCell>{item?.org?.firstName}{" "}{item?.org?.lastName}</TableCell> */}
                    <TableCell>
                      <TableDataTitle>{item?.name}</TableDataTitle>
                    </TableCell>

                    <TableCell>
                      <TableDataTitle>{formatDate(item?.createdOn)}</TableDataTitle>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={`• ${item.status === "ACTIVE" ? "Active" : "Inactive"}`} // Adds the dot before the text
                        sx={{
                          ...statusStyles[
                          item.status ? "active" : "offline"
                          ],
                          fontWeight: "bold",
                          fontSize: "14px",
                          padding: "2px 6px",
                          borderRadius: "2px",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton disabled={true} color="#455967">
                        <EditIcon />
                      </IconButton>
                      <IconButton disabled={true} color="#455967">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                );
              })}
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
      <CustomModal
        open={openDialog}
        onClose={handleCloseDialog}
        heading={"Preview"}
      >
        <img
          // src={`data:image/png;base64,${popupImage}`}
          src={popupImage}
          alt="Full-size logo"
          style={{ width: "100%", height: "auto" }}
        />
      </CustomModal>
    </Box>
  );
};

export default ContentLibrary;
