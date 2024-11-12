import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Grid, IconButton, Menu, MenuItem } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupIcon from '@mui/icons-material/Group';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const cardsData = [
  {
    title: 'Subscriptions',
    value: '2.3K',
    percentage: '+11.5%',
    icon: <StarIcon />,
    percentageColor: 'success.main',
  },
  {
    title: 'New Sign ups',
    value: '756',
    percentage: '+3.1%',
    icon: <PersonIcon />,
    percentageColor: 'success.main',
  },
  {
    title: 'Pageviews',
    value: '50.8K',
    percentage: '+24.8%',
    icon: <VisibilityIcon />,
    percentageColor: 'success.main',
  },
  {
    title: 'Monthly ',
    value: '23.6K',
    percentage: '-12.4%',
    icon: <GroupIcon />,
    percentageColor: 'error.main',
  },
];

export default function CampaignListCards() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {cardsData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 1 }}>
              <CardContent sx={{padding: '10px !important'}}>
                {/* Title with Icon */}
                <Box display="flex" justifyContent="space-between" alignItems="center" >
                  <Box display="flex" alignItems="center">
                    {card.icon}
                    <Typography variant="subtitle2" sx={{ ml: 1, fontWeight: 600 }}>
                      {card.title}
                    </Typography>
                  </Box>
                  {/* Vertically Stacked 3 Dots */}
                  <IconButton onClick={handleClick}>
                    <MoreVertIcon sx={{ transform: 'rotate(90deg)', fontSize: 22, color: 'gray' }} />
                  </IconButton>
                </Box>

                {/* Centered Value */}
                <Box display="flex" justifyContent="center" alignItems="center" padding={1}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: 700,
                      color: 'orange',
                      textAlign: 'center',
                    }}
                  >
                    {card.value}
                  </Typography>
                </Box>

                {/* Percentage Change */}
                <Box display="flex" justifyContent="center" alignItems="center" >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      color: card.percentageColor,
                      backgroundColor: card.percentageColor === 'success.main' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                      padding: '4px 8px',
                      borderRadius: 2,
                      fontSize: '0.875rem',
                    }}
                  >
                    {card.percentage}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 1,
          sx: { width: 200 },
        }}
      >
        <MenuItem onClick={handleClose}>Action 1</MenuItem>
        <MenuItem onClick={handleClose}>Action 2</MenuItem>
        <MenuItem onClick={handleClose}>Action 3</MenuItem>
      </Menu>
    </Box>
  );
}
