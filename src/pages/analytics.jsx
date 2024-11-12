import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Container,
  Alert,
} from "@mui/material";


const AnalyticsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <Container maxWidth="xs">
     Analytics page
    </Container>
  );
};

export default AnalyticsPage;
