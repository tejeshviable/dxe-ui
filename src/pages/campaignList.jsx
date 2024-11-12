import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTeamsDetailsSlice } from "../redux/teamSlice/team.slice";
import { Typography, Button, Box } from "@mui/material";
import CampaignTable from "../components/table";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";

const CampaignList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { campaigns, totalItems, loading } = useSelector(
    (state) => state.teamsDetails
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch campaigns when page or rowsPerPage change
  useEffect(() => {
    dispatch(fetchTeamsDetailsSlice({ page, rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  // Handle page change in table
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  return (
    <Box sx={{ mt: 5 }}>
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
          Campaign Page
        </Typography>
      </Breadcrumbs>
      {/* <CampaignListCards /> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            color: "#445A68",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "80px",
            border: "1px solid #445A68",
          }}
          onClick={() => {
            navigate("/create-campaign");
          }}
        >
          New Campaign
        </Button>
        <Button
          disabled
          variant="contained"
          endIcon={<SortIcon />}
          sx={{
            color: "#fff",
            backgroundColor: "#13BECF",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "6px",
            // border: "1px solid #13BECF",
            cursor: "not-allowed ",
          }}
        >
          Sort
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '16px' }}>
        <Typography sx={{ color: '#445A68', fontSize: '29px', fontWeight: '600' }}>Campaign List</Typography>

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


      <CampaignTable
        campaigns={campaigns}
        totalItems={totalItems}
        page={page}
        rowsPerPage={rowsPerPage}
        loading={loading}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default CampaignList;
