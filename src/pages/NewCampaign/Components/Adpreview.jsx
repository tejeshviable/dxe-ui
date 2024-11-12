import React, { useState, useEffect, useRef } from 'react';
import { Card, Typography, Box, IconButton, Divider, useMediaQuery } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ADPreview1 from '../../../assets/Ad Preview.svg';
import ADPreview2 from '../../../assets/Campaign.svg';
import ADPreview3 from '../../../assets/Login Illustration 1.svg';

const AdPreview = ({width}) => {
    const adImages = [ADPreview1, ADPreview2, ADPreview3];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isAutoplaying, setIsAutoplaying] = useState(true); // Controls autoplay
    const intervalRef = useRef(null); // Use a ref to manage the interval without rerenders

    // Check if the screen size is small
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    // Function to go to the next image
    const handleNext = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % adImages.length);
            setIsTransitioning(false);
        }, 300);
    };

    // Function to go to the previous image
    const handleBack = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? adImages.length - 1 : prevIndex - 1
            );
            setIsTransitioning(false);
        }, 300);
    };

    // Autoplay functionality
    useEffect(() => {
        if (isAutoplaying) {
            intervalRef.current = setInterval(() => {
                handleNext();
            }, 7000); // Automatically change image every 7 seconds
        }

        return () => {
            clearInterval(intervalRef.current); // Clear the interval when autoplay stops or component unmounts
        };
    }, [isAutoplaying]);

    // Pause/Play toggle handler
    const handlePausePlay = () => {
        if (isAutoplaying) {
            clearInterval(intervalRef.current); // Stop autoplay when paused
        } else {
            setIsAutoplaying(true); // Resume autoplay
        }
        setIsAutoplaying(!isAutoplaying); // Toggle autoplay state
    };

    return (
        <Box
            sx={{
                width: {width},
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: isSmallScreen ? 1 : 2,
            }}
        >
            <Card
                sx={{
                    width: isSmallScreen ? '100%' : '445px',
                    maxWidth: '100%',
                    borderRadius: '8px',
                    border: '0.2px solid #00000040',
                    boxShadow: 'none',
                    padding: 2,
                }}
            >
                {/* Header with navigation icons */}
                <Box display="flex" justifyContent="space-between" alignItems="center" paddingBottom={1}>
                    <Typography sx={{ color: '#333333', fontSize: isSmallScreen ? '18px' : '22px', fontWeight: '500' }}>
                        Ad Preview
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <IconButton onClick={handleBack}>
                            <ArrowBackIosIcon />
                        </IconButton>
                        <IconButton onClick={handleNext}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                        <IconButton onClick={handlePausePlay}>
                            {isAutoplaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                    </Box>
                </Box>

                {/* Ad content with fade transition */}
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 'auto',
                        overflow: 'hidden',
                    }}
                >
                    <img
                        src={adImages[currentIndex]}
                        alt="Ad Preview"
                        width="100%"
                        height={isSmallScreen ? '200px' : '312px'}
                        style={{
                            transition: 'opacity 0.3s ease',
                            opacity: isTransitioning ? 0 : 1,
                        }}
                    />
                </Box>
            </Card>
        </Box>
    );
};

export default AdPreview;
