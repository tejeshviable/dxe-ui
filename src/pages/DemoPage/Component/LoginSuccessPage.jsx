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
            // sx={{
            //     // display: "flex",
            //     // justifyContent: "center",
            //     // alignItems: "center",
            //     // height: "100vh",
            // }}
            sx={{ mt: 5, p: 3, backgroundColor: 'transparent', boxShadow: 'none', maxWidth: '800px', margin: '80px auto' }}
        >
            <Card sx={{ mt: 5, p: 3, backgroundColor: 'transparent', boxShadow: 'none', borderRadius: '15px', maxWidth: '800px', margin: '50px auto' }}>
                <CardContent>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                    >
                        <CheckCircleIcon color="success" sx={{ fontSize: 40, mb: 2 }} />
                        <Typography variant="h7" gutterBottom>
                            Login Successful!
                        </Typography>
                        <Typography variant="body1" color="textSecondary" sx={{ mb: 4, fontSize: '14px' }}>
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
                            borderRadius: '5px',
                            color: '#FFFFFF !important',
                            fontSize: '12px !important',
                            background: 'linear-gradient(180deg, #13BECF 0%, #455869 100%)',
                            padding: '8px 16px !important',
                            textTransform: 'capitalize',
                            width: '100%'
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
