import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Grid,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AvatarCard from "../components/AvatarCard";
import { styled, useTheme } from "@mui/material/styles";
import CampaignTable from "../components/table";
import { fetchTeamsDetailsSlice } from "../redux/teamSlice/team.slice";
import Stepper from "../components/stepper";
import CreateCampaign from "../components/stepper";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";

const cardData = [
  {
    socialIcon: "facebook",
    title: "Strategic Email Newsletter Campaign for Subscriber Engagement",
    status: "Not Started",
    lastUpdatedData: "March 24, 6:23pm",
  },
  {
    socialIcon: "instagram",
    title: "Maximinzing Reach with targeted instagram sponsored Posts",
    status: "Apr 1, 2024 12:02 pm",
    lastUpdatedData: "March 24, 6:23pm",
  },
  {
    socialIcon: "linkedin",
    title: "Optimizing PPC Campaigns Through Strategic Keyword Biddings",
    status: "Apr 1, 2024 12:02 pm",
    lastUpdatedData: "March 24, 6:23pm",
  },
  {
    socialIcon: "linkedin",
    title: "Optimizing PPC Campaigns Through Strategic Keyword Biddings",
    status: "Apr 1, 2024 12:02 pm",
    lastUpdatedData: "March 24, 6:23pm",
  },
];

const DashboardCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { campaigns, totalItems, loading } = useSelector(
    (state) => state.teamsDetails
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
        <Typography
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          // href="/dashboard"
        >
          Home
        </Typography>

        <Typography
          sx={{ color: "text.primary", display: "flex", alignItems: "center" }}
        >
          Dashboard
        </Typography>
      </Breadcrumbs>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
        }}
      >
        {/* <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            color: "#445A68",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: '80px',
            border: "1px solid #445A68",
          }}
          onClick={() => { navigate('/create-campaign') }}
        >
          New Campaign
        </Button> */}
        <Button
          disabled
          variant="contained"
          endIcon={<SortIcon />}
          sx={{
            color: "#fff",
            background: "#13BECF",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "6px",
            // border: "1px solid #13BECF",
            cursor: "not-allowed",
            marginLeft: "auto",
          }}
        >
          Sort
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '16px' }}>
        <Typography sx={{ color: '#445A68', fontSize: '29px', fontWeight: '600' }}>Dashboard</Typography>

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
        campaigns={campaigns || []}
        totalItems={totalItems}
        page={page}
        rowsPerPage={rowsPerPage}
        loading={loading}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* <CreateCampaign/> */}
    </Box>
  );
};

export default DashboardCard;
