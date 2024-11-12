import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
} from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import { SvgImageComponent } from "./svgImageComponent";


function AvatarCard({ data }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid rgba(0, 0, 0, 0.2)", // Add border
        borderRadius: "8px", // Optional: Customize border radius
      }}
    >
      <CardHeader
        avatar={<SvgImageComponent icon={data.socialIcon} />}
        title={
          <AvatarGroup total={5}>
            <Avatar
              alt="User 1"
              src="https://mui.com/static/images/avatar/1.jpg"
            />
            <Avatar
              alt="User 2"
              src="https://mui.com/static/images/avatar/2.jpg"
            />
            <Avatar
              alt="User 3"
              src="https://mui.com/static/images/avatar/3.jpg"
            />
            {/* <Avatar alt="User 4" src="/static/images/avatar/4.jpg" />
            <Avatar alt="User 5" src="/static/images/avatar/5.jpg" /> */}
          </AvatarGroup>
        }
      />
      <CardContent sx={{ paddingBottom: '16px !important' }}>
        <Typography
          fontWeight={'bold'}
          textAlign={'left'}
          sx={{
            display: '-webkit-box',
            fontSize: '18px',
            lineHeight: '1.3',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
          {data.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ paddingY: '12px', borderBottom: '1px solid rgba(0, 0, 0, 0.2)', textAlign: 'left', fontSize: '12px' }}>
          Start: {data.status}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ paddingY: '12px', textAlign: 'left', fontSize: '16px' }}>
          Last update date: {data.lastUpdatedData}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AvatarCard;
