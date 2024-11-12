import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import LeftSidebar from "./layout/LeftSidebar";
import RightSidebar from "./layout/RightSidebar";
import DashboardCard from "./pages/dashboard";
// import Outlate from "react-router-dom"
import { Outlet } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';


const MainLayout = () => {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(false);

  const toggleLeftDrawer = () => {
    setLeftOpen(!leftOpen);
  };

  const toggleRightDrawer = () => {
    setRightOpen(!rightOpen);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Left Sidebar */}
      <LeftSidebar open={leftOpen} toggleDrawer={toggleLeftDrawer} />

      {/* Main Dashboard Content */}

      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          transition: "margin-left 0.3s ease-out, margin-right 0.3s ease-out",
          backgroundColor: "#f8f8f8",
          overflowX: "hidden",
        }}
      >
        {/* <DashboardCard /> */}
        <Outlet />
      </Box>

      {/* Right Sidebar */}
      <RightSidebar open={rightOpen} toggleDrawer={toggleRightDrawer} />

      {/* Toggle Button for Right Drawer */}
      {!rightOpen && (
        <IconButton
          onClick={toggleRightDrawer}
          sx={{
            position: "absolute",
            right: 10,
            top: "10px",
            zIndex: 1300,
            bgcolor: "#fff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": { bgcolor: "#f0f0f0" },
          }}
        >
          <NotificationsIcon   sx={{
        color: "#13BECF"}}/>
        </IconButton>
      )}
    </Box>
  );
};

export default MainLayout;
