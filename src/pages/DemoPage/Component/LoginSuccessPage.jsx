import React from "react";
import { Box, Typography, Button, Container, Card, CardContent } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const LoginSuccessPage = () => {
    const navigate = useNavigate();
    const handleContinue = () => {
        // Handle navigation or further action here
        alert("Redirecting to Dashboard!");
    };

    const handleLogout = () => {
        navigate('/ipification')
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card sx={{ width: "100%", borderRadius: '15px', boxShadow: '0px 4px 16.5px -6px rgba(0, 0, 0, 0.25)', padding:3 }}>
                <CardContent>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                    >
                        <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
                        <Typography variant="h4" gutterBottom>
                            Login Successful!
                        </Typography>
                        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                            Welcome back! You have successfully logged in.
                        </Typography>
                        {/* <Button
                            variant="contained"
                            color="primary"
                            onClick={handleContinue}
                            size="large"
                            sx={{ mb: 2 }}
                        >
                            Go to Dashboard
                        </Button> */}
                        <Button
                            sx={{
                                borderRadius: '10px',
                                color: '#FFFFFF !important',
                                fontSize: '18px !important',
                                background: 'linear-gradient(180deg, #13BECF 0%, #455869 100%)',
                                padding: '8px 16px !important',
                                textTransform: 'capitalize'
                            }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default LoginSuccessPage;
