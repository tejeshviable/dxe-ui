import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"; // Import Button for Load More
import { fetchNotificationsThunk } from "../redux/teamSlice/team.thunk.js";
import { GiftOutlined, SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const avatarSX = { width: 36, height: 36, fontSize: "1rem" };

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // Fetch notifications
  const loadNotifications = async (currentPage) => {
    if (loading) return;

    setLoading(true);
    const response = await dispatch(fetchNotificationsThunk(currentPage, 4));
    console.log(response, "Load notifications");

    const newNotifications = response?.content || [];

    if (newNotifications.length) {
      setNotifications((prev) => [
        ...prev,
        ...newNotifications.filter(
          (n) => !prev.some((existing) => existing.id === n.id)
        ),
      ]);

      if (newNotifications.length < 4) {
        setHasMore(false); // No more notifications to load
      }
    } else {
      setHasMore(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadNotifications(pageNumber); // Load initial notifications
  }, []); // Empty dependency array to load once on mount

  // Load more notifications when button is clicked
  const handleLoadMore = () => {
    if (hasMore) {
      setPageNumber((prev) => prev + 1);
      loadNotifications(pageNumber + 1); // Load next page
    }
  };

  return (
    <>
      <Box
        sx={{ flexShrink: 0, ml: 0.75, maxHeight: "400px", overflowY: "auto" }}
      >
        <List
          component="nav"
          sx={{
            p: 0,
            "& .MuiListItemButton-root": {
              py: 0.5,
              "&.Mui-selected": { bgcolor: "grey.50", color: "text.primary" },
              "& .MuiAvatar-root": avatarSX,
            },
          }}
        >
          {notifications.map((notification, index) => (
            <div key={notification.id || index}>
              <ListItemButton
                onClick={() => {
                  navigate("/notification-preview");
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{ color: "success.main", bgcolor: "transparent" }}
                  >
                    {index % 2 === 0 ? <GiftOutlined /> : <SettingOutlined />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" style={{     display: 'inline-block', 
                      maxWidth: '200px', 
                      overflow: 'hidden', 
                      whiteSpace: 'nowrap', 
                      textOverflow: 'ellipsis'}}>
                      {notification.message}
                    </Typography>
                  }
                  secondary={formatDate(notification.createdOn)}
                />
              </ListItemButton>
              <Divider />
            </div>
          ))}
        </List>
        {loading && <Typography variant="subtitle1">Loading...</Typography>}
        {!hasMore ? (
          <Typography variant="subtitle1" className="mt-3 " sx={{display:'flex',justifyContent:'center'}}>
            No more notifications
          </Typography>
        ) : (
          <Button
            className="mt-3"
            sx={{ color: "#13BECF",
              display:'flex',justifyContent:'center'
             }}
            onClick={handleLoadMore}
            disabled={loading}
          >
            Load More...
          </Button>
        )}
      </Box>
      <Box display={"flex"} justifyContent={"center"} pt={1}>
        <Button
          sx={{ color: "#13BECF" }}
          onClick={() => {
            navigate("/notification-preview");
          }}
        >
          View All Notifications
        </Button>
      </Box>
    </>
  );
}
