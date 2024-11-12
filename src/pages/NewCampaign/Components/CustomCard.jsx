import React from 'react';
import { Card, CardContent, Typography, Box, Checkbox, CardMedia } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IMAGE from '../../../assets/Campaign.svg'


const CustomCard = () => {
    return (
        <Card sx={{ maxWidth: 345, borderRadius: 2, padding: '24px' }}>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{borderRadius:'10px', backgroundColor:'#0401100D', padding:'20px'}}>
                <CardMedia
                    component="img"
                    sx={{ width: 154, height:159}}
                    image={IMAGE}
                    alt="Lead Generation"
                />
            </Box>
            <CardContent sx={{ padding:'0px', paddingTop:'24px'}}>
                <Typography variant="h6" component="div">
                    Lead Generation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Sodales velit sapien tortor ut morbi parturient massa. Tempor urna enim ac porta lacus tincidunt arcu.
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CustomCard