import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";

import { fetchTeamMemberListSlice } from "../redux/teamSlice/team.slice";
import { useSelector, useDispatch } from "react-redux";

const teamMembers = [
  {
    name: "John Doe",
    title: "Software Engineer",
    img: "https://mui.com/static/images/avatar/1.jpg",
  },
  {
    name: "Jane Smith",
    title: "Product Manager",
    img: "https://mui.com/static/images/avatar/2.jpg",
  },
  {
    name: "Alice Johnson",
    title: "UX Designer",
    img: "https://mui.com/static/images/avatar/3.jpg",
  },
  // {
  //   name: "Alice Johnson",
  //   title: "UX Designer",
  //   img: "https://mui.com/static/images/avatar/3.jpg",
  // },
  // {
  //   name: "Alice Johnson",
  //   title: "UX Designer",
  //   img: "https://mui.com/static/images/avatar/3.jpg",
  // },
];

function TeamMembersList() {
  const { teams } = useSelector((state) => state.teamsDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeamMemberListSlice());
  }, [dispatch]);

  console.log(teams, "Team members list");

  // Check if teams is empty
  if (!teams || teams.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary" align="center">
        No team members available.
      </Typography>
    );
  }

  return (
    <List>
      {teams.length &&
        teams?.map((member, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar src={"https://mui.com/static/images/avatar/1.jpg"} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="body1" fontWeight="bold">
                  {member.userName}
                </Typography>
              }
              secondary={
                <Typography variant="body2" color="textSecondary">
                  {member.userEmail}
                </Typography>
              }
            />
          </ListItem>
        ))}
    </List>
  );
}

export default TeamMembersList;
