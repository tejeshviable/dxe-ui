import React, { useState, useEffect } from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  Checkbox,
  Box,
  Typography,
  IconButton,
  Chip,
  TablePagination,
  CircularProgress,
  Avatar,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Modal
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import DateRangeIcon from "@mui/icons-material/DateRange";
import WorkIcon from "@mui/icons-material/Work";
import FlagIcon from "@mui/icons-material/Flag";
import { fetchCampaignDetailsThunk, fetchCampaignListDeleteThunk } from "../redux/teamSlice/team.thunk";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchTeamsDetailsSlice } from "../redux/teamSlice/team.slice";
import ResponsiveTableView from "./ResponsiveTableView";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTheme } from '@mui/material/styles';
import CustomPagination from "./CustomPagination/CustomPagination";


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
  textAlign: "center",
  fontWeight: "500",
  lineHeight: "1.5rem",
}));

const TableDataTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#455967",
  fontWeight: "500",
}));

const tableStyles = {
  tablecellData: {
    color: "#455967",
    fontSize: "14px",
    fontWeight: "500",
  },
};

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

const platformList = [
  {
    name: "WhatsApp",
    logo: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
  },
];

const CampaignTable = ({
  campaigns,
  totalItems,
  page,
  rowsPerPage,
  loading,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [viewCampaignDetails, setViewCampaignDetails] = useState(null)
  const [showSpinner, setShowSpinner] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    setShowSpinner(true);
  }, []);

  const isSelected = (id) => selected.indexOf(id) !== -1;

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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = campaigns.map((campaign) => campaign.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleDelete = async (campaign) => {
    const data = {
      campaignId: campaign.campaignId,
    };

    const result = await fetchCampaignListDeleteThunk(data);

    if (result) {
      dispatch(fetchTeamsDetailsSlice({ page, rowsPerPage }));
      toast.success("Data Deleted Successfully");
      setOpenDialog(false); // Close the dialog
    } else {
      toast.error("Error Deleting Campaign");
    }
  };

  const handleOpenDialog = (campaign) => {
    setCampaignToDelete(campaign); // Store the campaign to be deleted
    setOpenDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog without doing anything
  };

  const handleViewDetails = async (row, index) => {
    setOpenRowIndex(openRowIndex === index ? null : index);
    const result = await fetchCampaignDetailsThunk(row?.campaignId)
    if (result) {
      setViewCampaignDetails(result)
    }
    setShowSpinner(false)
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ mt: 3, border: "1px solid #D4D4D4", borderRadius: "12px" }}
      >
        {loading ? (
          <BoxContainer display="flex" justifyContent="center" my={3}>
            <CircularProgress />
          </BoxContainer>
        ) : (
          <Table aria-label="campaign table">
            <TableHead>
              <TableRow>
                <TableCell>
                  {/* <Checkbox
                    color="primary"
                    sx={{
                      "&.MuiCheckbox-indeterminate": {
                        color: "#13BECF",
                      },
                      "&.Mui-checked": {
                        color: "#13BECF",
                      },
                    }}
                    indeterminate={
                      selected?.length > 0 &&
                      selected?.length < campaigns?.length
                    }
                    checked={
                      campaigns?.length > 0 &&
                      selected?.length === campaigns?.length
                    }
                    onChange={handleSelectAllClick}
                  /> */}
                </TableCell>
                <TableCell sx={{minWidth:'170px'}}>
                  <BoxContainer>
                    <PersonIcon fontSize={"14px"} sx={{ color: "#455967" }} />
                    <TableHeadTitle>Organisation Name</TableHeadTitle>
                  </BoxContainer>
                </TableCell>
                <TableCell sx={{minWidth:'170px'}}>
                  <BoxContainer>
                    <DescriptionIcon
                      fontSize={"14px"}
                      sx={{ color: "#455967" }}
                    />
                    <TableHeadTitle>Website Url</TableHeadTitle>
                  </BoxContainer>
                </TableCell>
                <TableCell sx={{minWidth:'170px'}}>
                  <BoxContainer>
                    <FlagIcon fontSize={"14px"} sx={{ color: "#455967" }} />
                    <TableHeadTitle>Goal</TableHeadTitle>
                  </BoxContainer>
                </TableCell>
                <TableCell sx={{minWidth:'170px'}}>
                  <BoxContainer>
                    <DateRangeIcon
                      fontSize={"14px"}
                      sx={{ color: "#455967" }}
                    />
                    <TableHeadTitle>Start Date</TableHeadTitle>
                  </BoxContainer>
                </TableCell>
                <TableCell sx={{minWidth:'170px'}}>
                  <BoxContainer>
                    <WorkIcon fontSize={"14px"} sx={{ color: "#455967" }} />
                    <TableHeadTitle>Platform</TableHeadTitle>
                  </BoxContainer>
                </TableCell>
                <TableCell sx={{minWidth:'170px'}}>
                  <BoxContainer>
                    <CheckBoxIcon fontSize={"14px"} sx={{ color: "#455967" }} />
                    <TableHeadTitle>Status</TableHeadTitle>
                  </BoxContainer>
                </TableCell>

                <TableCell sx={{minWidth:'100px'}}></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {campaigns?.map((campaign, index) => {
                const isItemSelected = isSelected(campaign.id);
                const labelId = `campaign-table-checkbox-${campaign.id}`;

                return (

                  <>
                    <StyledTableRow
                      onClick={(event) => {
                        // handleClick(event, campaign.id)
                        // setShowSpinner(true);
                        handleViewDetails(campaign, index);
                      }}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={campaign.id}
                      selected={isItemSelected}

                      style={{
                        cursor: "pointer",
                        backgroundColor: openRowIndex === index ? "#D5F3F6" : "inherit", // Highlight selected row
                      }}
                    >
                      <TableCell>
                        {/* <Checkbox
                        color="primary"
                        sx={{
                          "&.Mui-checked": {
                            color: "#13BECF",
                          },
                        }}
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      /> */}
                      </TableCell>
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
                          <TableDataTitle>{campaign.campaignName}</TableDataTitle>
                        </BoxContainer>
                      </TableCell>
                      <TableCell className={tableStyles.tablecellData}>
                        <TableDataTitle>{campaign.description}</TableDataTitle>
                      </TableCell>
                      <TableCell className={tableStyles.tablecellData}>
                        <TableDataTitle>
                          {campaign.description}
                        </TableDataTitle>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          color: "#455967",
                          fontWeight: "500",
                        }}
                      >
                        {new Date(campaign.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          {(() => {
                            const randomPlatform = platformList[0]; // Just using the first platform for simplicity
                            return (
                              <>
                                <Avatar
                                  alt={randomPlatform.name}
                                  src={randomPlatform.logo}
                                  sx={{ width: 20, height: 20 }}
                                />
                                <TableDataTitle>
                                  {randomPlatform.name}
                                </TableDataTitle>
                              </>
                            );
                          })()}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`• ${campaign.active ? "Active" : "Inactive"}`} // Adds the dot before the text
                          sx={{
                            ...statusStyles[
                            campaign.active ? "active" : "offline"
                            ],
                            fontWeight: "bold",
                            fontSize: "14px",
                            padding: "2px 6px",
                            borderRadius: "2px",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton disabled color="#455967">
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="#455967"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleOpenDialog(campaign);
                          }} // Open dialog on delete click
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>

                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          // onClick={() => }
                          onClick={() => {
                            handleViewDetails(campaign, index);
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

                    <ResponsiveTableView
                      openRowIndex={openRowIndex}
                      index={index}
                      viewCampaignDetails={viewCampaignDetails}
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
        onPageChange={(e, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(e) =>
          onRowsPerPageChange(parseInt(e.target.value, 10))
        }
      />

      {/* Confirmation Dialog for Deleting */}


      <Modal open={openDialog}
        onClose={handleCloseDialog}>
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
                  borderColor: "#13BECF"
                },
              }}
              onClick={() => handleDelete(campaignToDelete)}
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
              onClick={handleCloseDialog}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="delete-confirmation-dialog"
      >
        <DialogTitle id="delete-confirmation-dialog">
          Are you sure you want to delete this campaign?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary">
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button
            onClick={() => handleDelete(campaignToDelete)}
            color="secondary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default CampaignTable;
