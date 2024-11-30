import React, { useState, useRef } from "react";
import { Box, Button, Card, CardContent, TextField, Typography, Alert } from "@mui/material";

const OTPInput = ({ length = 6, onComplete, otpPopup, setOtpPopup, otpInfo, onResend }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const [error, setError] = useState(""); // To store error messages
    const inputRefs = useRef([]);

    const handleChange = (value, index) => {
        if (!/^\d*$/.test(value)) return; // Allow only digits

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to the next field
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        setError(""); // Clear error when input changes
    };

    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        // Validate OTP: Check if all fields are filled
        if (otp.some((digit) => digit === "")) {
            setError("Please fill in all the OTP fields.");
            return;
        }

        // If valid, invoke onComplete
        const otpValue = otp.join("");
        onComplete?.(otpValue);

    };


    return (
        <Card
            sx={{
                maxWidth: 500,
                p: 2,
                borderRadius: "20px",
                boxShadow: "0px 4px 16.5px -6px rgba(0, 0, 0, 0.25)",
            }}
        >
            <CardContent>
                <Typography align="center" gutterBottom>
                    Enter OTP
                </Typography>
                <Typography align="center" gutterBottom>
                    {otpInfo?.message}
                </Typography>
                <Box display="flex" justifyContent="center" gap={2}>
                    {otp.map((digit, index) => (
                        <TextField
                            key={index}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            inputRef={(ref) => (inputRefs.current[index] = ref)}
                            variant="outlined"
                            inputProps={{
                                maxLength: 1,
                                style: { textAlign: "center", fontSize: "1.5rem", width: "2rem" },
                            }}
                        />
                    ))}
                </Box>
                {error && (
                    <Alert variant="outlined" severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "24px", gap: '12px' }}>
                    {/* <Button
                        variant="outlined"
                        onClick={onResend}
                        sx={{
                            borderRadius: "15px",
                            backgroundColor: '#445A68',
                            color: '#FFFFFF',
                            padding: "8px 16px !important",
                            fontSize: "18px",
                            fontWeight: "600",
                            border: "1px solid rgba(68, 90, 104, 1)",
                            textTransform: "capitalize",
                        }}
                    >
                        Resend Otp
                    </Button> */}
                    <Button
                        onClick={handleSubmit}
                        sx={{
                            borderRadius: "12px",
                            color: "#FFFFFF !important",
                            fontSize: "18px !important",
                            background: "linear-gradient(180deg, #13BECF 0%, #455869 100%)",
                            padding: "8px 16px !important",
                            textTransform: "capitalize",
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default OTPInput;
