import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Card, CardContent, Container, TextField, Button, Typography, Grid2 } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { authIpificationLoginSlice } from '../../../redux/authSlice/auth.slice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "100%",
        "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff",
            borderRadius: "0px",
            border: "0px solid #C5C5C5",
            height: "40px", // Updated height to 60px
            background: "#FFF",
            fontSize: '13px'
        },
        "& .MuiInputBase-input::placeholder": {
            backgroundColor: "#FFF", // Ensuring placeholder background is white
        },
        "& .MuiFormHelperText-root": {
            marginLeft: "0px",
            color: "red", // Ensure error messages are styled prominently
        },
    },
    selectField: {
        width: "100%",
        "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff",
            borderRadius: "0px",
            height: "40px", // Updated height to 60px
            background: "#FFF",
        },
        "& .MuiInputBase-input::placeholder": {
            backgroundColor: "#FFF", // Ensuring placeholder background is white
        },
    },
    label: {
        color: "#7C7C7C",
        fontWeight: 500,
        marginBottom: "2px",
        fontSize: "18px !important",
    },

    TypoHead: {
        color: "#455967",
        fontWeight: 500,
        marginBottom: "2px",
        fontSize: "14px !important",
    },
    Typo: {
        color: "#455967",
        fontWeight: 500,
        marginBottom: "2px",
        fontSize: "13px !important",
    },

    fetchButton: {
        borderRadius: '10px',
        color: '#FFFFFF !important',
        fontSize: '18px !important',
        background: 'linear-gradient(180deg, #13BECF 0%, #455869 100%)',
        padding: '8px 16px !important'
    }
}));

const IpificationLogin = () => {

    const classes = useStyles();
    const dispatch = useDispatch(); 

    const initialValues = {
        username: '',
        password: '',
    }

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters long'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters long'),
    })

    const handleSubmit = async (values) => {
        console.log('Form Values:', values);
        
        const payload = {
            username: values.username,
            password: values.password
        }

        const result = await dispatch(authIpificationLoginSlice(payload)).unwrap();

        if (result) {
            console.log("result---", result);
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit
    });

    return (
        <Container
            maxWidth="sm"
            sx={{
                mt: 5,
                p: 3,
                backgroundColor: 'transparent',
                boxShadow: 'none',
                maxWidth: '800px',
                margin: '80px auto',
            }}
        >
            <Card
                sx={{
                    mt: 5,
                    p: 3,
                    backgroundColor: '#f5f5f5',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '15px',
                    maxWidth: '800px',
                    margin: '50px auto',
                }}
            >
                <CardContent>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography variant="h5" gutterBottom>
                            Login
                        </Typography>
                        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>



                            <Grid2 container>
                                <Grid2 size={{ md: 12 }}>
                                    <Typography className={classes.label}>Username{" "}<span style={{ color: '#FF0000' }}>*</span></Typography>
                                    <TextField
                                        name="username"
                                        variant="outlined"
                                        fullWidth
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.username && Boolean(formik.errors.username)}
                                        helperText={formik.touched.username && formik.errors.username}
                                        sx={{ mb: 2 }}
                                    />
                                </Grid2>
                                <Grid2 size={{ md: 12 }}>
                                    <Typography className={classes.label}>Password{" "}<span style={{ color: '#FF0000' }}>*</span></Typography>
                                    <TextField
                                        name="password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                        sx={{ mb: 3 }}
                                    />
                                </Grid2>

                            </Grid2>
                            <Button
                                type="submit"
                                sx={{
                                    borderRadius: '5px',
                                    color: '#FFFFFF !important',
                                    fontSize: '16px !important',
                                    background: 'linear-gradient(180deg, #13BECF 0%, #455869 100%)',
                                    padding: '8px 16px !important',
                                    textTransform: 'capitalize',
                                    width: '100%'
                                }}
                            >
                                Login
                            </Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default IpificationLogin;
