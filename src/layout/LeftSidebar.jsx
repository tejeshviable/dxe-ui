import * as React from "react";
import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import GroupIcon from "@mui/icons-material/Group";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MovingIcon from "@mui/icons-material/Moving";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import { Avatar, Chip, Menu, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import correctly
import useerProfile from "../assets/userProfile.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const drawerWidth = 250;

const options = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    title: "List Of Campaigns",
    icon: <ContentPasteIcon />,
    path: "campaign-list",
  },

  // {
  //   title: 'Audience Manager',
  //   icon: <GroupIcon />,
  // },
  {
    title: "Content Library",
    icon: <DateRangeIcon />,
    path: "/content-library",
  },
  // {
  //   title: "Analytics",
  //   icon: <AnalyticsIcon />,
  //   path: "/analytics",
  // },
  // {
  //   title: 'Campaign Scheduled',
  //   icon: <DateRangeIcon />,
  // },
  {
    title: "Data Requests",
    icon: <DataUsageIcon />,
    path: "/data-request",
  },
  {
    title: "Fetch Data",
    icon: <AnalyticsIcon />,
    path: "/data-permission",
  },

  {
    title: "Data Request Status",
    icon: <AnalyticsIcon />,
    path: "/data-request-test",
  },
  {
    title: 'Ipification',
    icon: <MovingIcon />,
    path: "/ipification1",
  },
];

const settingsOption = {
  title: "Settings",
  icon: <SettingsIcon />,
};

export default function LeftSidebar({ open, toggleDrawer }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); // For controlling menu

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("idToken"); // Remove tokens from localStorage
    navigate("/login"); // Navigate to the login page
  };

  const getInitials = (name) => {
    const nameParts = name.split(" ");

    // Handle cases where there's only one part in the name
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase(); // Use only the first letter of the first name
    }

    // Otherwise, use the first letters of the first and second names
    const initials =
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[1].charAt(0).toUpperCase();
    return initials;
  };

  const token = localStorage.getItem("idToken");
  const tokenData = jwtDecode(token);
  const cognitoGroups = tokenData["cognito:groups"];

  console.log("tokenData", tokenData.name);
  console.log("Cognito Groups:", cognitoGroups[0]);

  const filteredOptions =
    cognitoGroups[0] === "DataProvider"
      ? options.filter((item) => item.title === "Data Requests" || item.title === "Data Request Status") // Only show 'Data Request'
      : options.filter((item) => item.title !== "Data Requests" && item.title !== "Data Request Status"); // Show everything except 'Data Request'

  const drawerSx = {
    width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
    transition: "width 0.3s ease-out",
    overflowX: "hidden",
    "& .MuiDrawer-paper": {
      overflow: "hidden",
      width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
      transition: "width 0.3s ease-out",
      background: open
        ? "white"
        : "linear-gradient(180deg, #13BECF 0%, #455869 100%)", // For example, customize background color based on `open`
    },
  };

  return (
    <>
      <MuiDrawer variant="permanent" anchor="left" open={open} sx={drawerSx}>
        <br />
        {/* User Profile Section */}
        {open && (
          <IconButton
            sx={{
              position: "absolute",
              top: "20px",
              left: "20px",
              zIndex: 1200, // Ensure it stays on top of other elements
            }}
            onClick={toggleDrawer}
          >
            <MenuOpenIcon sx={{ fontSize: "20px", color: "#13BECF" }} />
          </IconButton>
        )}{" "}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingY: 2,
          }}
        >
          {!open && (
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                left: "12px",
                zIndex: 1200, // Ensure it stays on top of other elements
              }}
              onClick={toggleDrawer}
            >
              <ArrowForwardIcon sx={{ fontSize: "20px", color: "#fff" }} />
            </IconButton>
          )}

          <Avatar
            alt="Olivia Rhye"
            src="https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid"
            sx={{
              width: open ? 95 : 45,
              height: open ? 95 : 45,
              cursor: "pointer",
              marginBottom: "10px",
            }}
            onClick={toggleDrawer}
          />

          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: "600",
              color: open ? "black" : "white",
            }}
          >
            {open ? `${tokenData.name}` : getInitials(`${tokenData.name}`)}
          </Typography>

          {open && (
            <>
              <Typography
                sx={{ fontSize: "17px", fontWeight: "500", color: "#13BECF" }}
              >
                {cognitoGroups[0] === "DataProvider"
                  ? "Data Provider"
                  : "Data Consumer"}
              </Typography>
              <Chip
                icon={<EditIcon />}
                label="Edit Profile"
                color="primary"
                size="small"
                sx={{
                  padding: "8px",
                  marginTop: "4px",
                  cursor: "not-allowed",
                  background:
                    "linear-gradient(180deg, #13BECF 0%, #455869 100%)",
                  color: "#fff",
                  borderRadius: "16px",
                  "& .MuiChip-icon": {
                    color: "#fff",
                  },
                }}
              />
            </>
          )}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <List sx={{ marginTop: "20PX" }}>
            {filteredOptions.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    height: open ? 48 : 50,
                    justifyContent: open ? "initial" : "center",
                    px: 2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                      color: open ? "#13BECF" : "white",

                      mr: open ? 2 : "auto",
                    }}
                  >
                    {React.cloneElement(item.icon, {
                      sx: { fontSize: open ? "30px" : "25px" },
                    })}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontWeight: "600",
                      fontSize: "15px",
                    }}
                    sx={{
                      opacity: open ? 1 : 0,
                      transition: "opacity 0.3s ease-out",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
              onClick={handleMenuOpen} // Open dropdown on click
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: open ? "#13BECF" : "white",
                }}
              >
                {settingsOption.icon}
              </ListItemIcon>
              <ListItemText
                primary={settingsOption.title}
                primaryTypographyProps={{
                  fontWeight: "600",
                  fontSize: "15px",
                }}
                sx={{
                  opacity: open ? 1 : 0,
                  display: open ? "block" : "none",
                  transition: "opacity 0.3s ease-out",
                }}
              />
            </ListItemButton>
            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </ListItem>
        </List>
      </MuiDrawer>
    </>
  );
}
