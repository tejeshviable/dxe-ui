import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";

const teamMembers = [
  {
    name: "John Doe",
    title: "Software Engineer",
    img: "https://mui.com/static/images/avatar/1.jpg",
  },
];

function SingleAvatarList() {
  return (
    <List>
      {teamMembers.map((member, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar src={member.img} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="body1" fontWeight="bold">
                {member.name}
              </Typography>
            }
            secondary={
              <Typography variant="body2" color="textSecondary">
                {member.title}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default SingleAvatarList;
