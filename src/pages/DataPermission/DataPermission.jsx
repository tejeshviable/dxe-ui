import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Breadcrumbs, Button, Card, CardContent, Chip, Grid2, TextField, Typography } from '@mui/material'
import Grid from "@mui/material/Grid2";
import { makeStyles } from "@mui/styles";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import PastRequests from './Components/PastRequests';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrimarySelectSlice, fetchSecondarySelectSlice } from '../../redux/stepperSlice/stepper.slice';
import { fetchDataPermissionSlice, fetchDataPermissonUnionSlice, fetchPastRequestSlice } from '../../redux/teamSlice/team.slice';


const useStyles = makeStyles((theme) => ({
    textField: {
        width: "100%",
        "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff",
            borderRadius: "10px",
            border: "0px solid #C5C5C5",
            height: "60px", // Updated height to 60px
            background: "#FFF",
        },
        "& .MuiInputBase-input::placeholder": {
            backgroundColor: "#FFF", // Ensuring placeholder background is white
        },
        "& .MuiFormHelperText-root": {
            marginLeft: "0px",
        },
    },
    selectField: {
        width: "100%",
        "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff",
            borderRadius: "10px",
            border: "1px solid #C5C5C5",
            height: "60px", // Updated height to 60px
            background: "#FFF",
        },
        "& .MuiInputBase-input::placeholder": {
            backgroundColor: "#FFF", // Ensuring placeholder background is white
        },
    },
    label: {
        color: "#BEBEBE",
        fontWeight: 500,
        marginBottom: "2px",
        fontSize: "18px !important",
    },

    Typo: {
        color: "#455967",
        fontWeight: 500,
        marginBottom: "2px",
        fontSize: "16px !important",
    },

    fetchButton: {
        borderRadius: '10px',
        border: '1px solid #A9A9A9',
        color: '#FFFFFF !important',
        fontSize: '18px !important',
        background: 'linear-gradient(180deg, #13BECF 0%, #455869 100%)',
        padding: '8px 16px !important'
    }
}));

const channelData = [
    { label: "Data Usage" },
    { label: "Wallet Affluence" },
    { label: "Food Choice" },
];


const DataPermission = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [AttriuteInputValue, setAttriuteInputValue] = useState("");
    const [showUserDetails, setShowUserDetails] = useState(false);
    const [loadingPrimary, setLoadingPrimary] = useState(false);
    const [loadingSecondary, setLoadingSecondary] = useState(false);
    const [attributesData, setAttributesData] = useState([]);
    const audienceData = useSelector((state) => state.stepper);
    const [mobile, setMobile] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { pastRequestData, totalItems, loading } = useSelector((state) => state.teamsDetails)
    const { dataPermissionUnionData } = useSelector((state) => state.teamsDetails)

    const initialValues = {
        mobileNumber: '',
        attributes: '',
    }

    const validationSchema = Yup.object({
        attributes: Yup.array()
            .of(Yup.string().required("Attributes is required"))
            .min(1, "At least one attribute is required")
            .required("Attributes is required"),
        mobileNumber: Yup.string()
            .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
            .required("Mobile number is required"),
    })


    useEffect(() => {
        const fetchAttributes = async () => {
            setLoadingPrimary(true);
            try {
                await dispatch(fetchPrimarySelectSlice()).unwrap();
            } catch (error) {
                console.error("Failed to fetch primary attributes:", error);
            } finally {
                setLoadingPrimary(false);
            }

            setLoadingSecondary(true);
            try {
                await dispatch(fetchSecondarySelectSlice()).unwrap();
            } catch (error) {
                console.error("Failed to fetch secondary attributes:", error);
            } finally {
                setLoadingSecondary(false);
            }
        };

        fetchAttributes();
    }, [dispatch]);

    useEffect(() => {
        if (audienceData?.secondary) {
            setAttributesData(audienceData.secondary);
        }
    }, [audienceData]);

    useEffect(() => {

        dispatch(fetchPastRequestSlice({ page, rowsPerPage }))
    }, [dispatch, page, rowsPerPage])


    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };



    const handleSubmit = async (values) => {
        console.log("formik", formik)

        // if (Object.keys(formik.errors).length === 0) {
        //     setShowUserDetails(true);
        // }

        const payload = {
            requestId: "19",
            identifier: {
                column: "mobileNumber",
                value: values.mobileNumber
            },
            attributes: values.attributes
        }

        const result = await dispatch(fetchDataPermissionSlice(payload)).unwrap();

        if (result) {
            console.log("result---", result);
            setShowUserDetails(true);
            setMobile(values.mobileNumber)
            dispatch(fetchDataPermissonUnionSlice(result))
            dispatch(fetchPastRequestSlice({ page, rowsPerPage }))
        }
        else {

        }
    }

    const formik = useFormik({

        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit
    })

    console.log("attributes---", attributesData);

    console.log("formikattribute", formik.values.attributes);

    console.log("dataPermissionUnionData", dataPermissionUnionData);

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/dashboard"
                >

                    Home
                </Typography>

                <Typography
                    sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
                >

                    Fetch Data
                </Typography>
            </Breadcrumbs>

            {/* <Box sx={{ display: 'flex', marginTop: '16px' }}>
                <Typography sx={{ color: '#445A68', fontSize: '28px', fontWeight: '600', }}>Fetch Data</Typography>
            </Box> */}

            <form onSubmit={formik.handleSubmit}>
                <Card sx={{ mt: 5, p: 3, borderRadius: '15px', boxShadow: '0px 4px 16.5px -6px rgba(0, 0, 0, 0.25)' }}>
                    <Grid container>
                        <Grid size={{ md: 12 }}>
                            <Typography sx={{ fontSize: '26px', color: '#445A68', fontWeight: '500' }}>
                                Fetch Data
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container item size={{ md: 12 }} sx={{ pt: 2 }} spacing={2}>
                        <Grid size={{ md: 6 }}>
                            <Typography className={classes.label}>Phone Number</Typography>

                            <TextField
                                name="mobileNumber"
                                placeholder='Enter Mobile Number'
                                disabled={showUserDetails}
                                value={formik.values.mobileNumber}
                                onChange={formik.handleChange}
                                className={classes.textField}
                                error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                                helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                            />
                        </Grid>
                    </Grid>

                    <Grid container item size={{ md: 12 }} sx={{ pt: 3 }} spacing={2}>
                        <Grid size={{ md: 6, sm: 12 }}>
                            <Typography className={classes.label}>Request Attributes</Typography>

                            <Autocomplete
                                multiple
                                name='attributes'
                                options={attributesData}
                                disabled={showUserDetails}
                                getOptionLabel={(option) =>
                                    option?.attributeName ? option.attributeName : ""
                                } // Avoid undefined
                                disablePortal
                                value={
                                    attributesData.filter((option) =>
                                        formik.values.attributes.includes(option.attributeName)
                                    ) || []
                                }
                                onChange={(event, value) => {
                                    // Set the selected values as an array of labels
                                    formik.setFieldValue(
                                        "attributes",
                                        value.map((v) => v.attributeName)
                                    );
                                }}
                                onBlur={formik.handleBlur}
                                inputValue={AttriuteInputValue}
                                onInputChange={(event, newInputValue) => {
                                    setAttriuteInputValue(newInputValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        placeholder="Select Multiple Attributes"
                                        {...params}
                                        error={
                                            formik.touched.attributes && Boolean(formik.errors.attributes)
                                        }
                                        helperText={
                                            formik.touched.attributes && formik.errors.attributes
                                        }
                                        className={classes.textField}
                                    />
                                )}
                                renderTags={() => null}
                            />
                        </Grid>

                        <Grid size={{ md: 6, sm: 12 }} alignContent={'end'} >
                            <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                                {(Array.isArray(formik.values.attributes)
                                    ? formik.values.attributes
                                    : []
                                ).map((label, index) => (
                                    <Chip
                                        key={index}
                                        disabled={showUserDetails}
                                        label={label} // Display the attributes label
                                        onDelete={() => {
                                            // Handle deleting the chip
                                            const updatedChannels = formik.values.attributes.filter(
                                                (item) => item !== label
                                            );
                                            formik.setFieldValue("attributes", updatedChannels);
                                        }}
                                        sx={{
                                            borderRadius: "18px",
                                            marginBottom: "4px",
                                            background: "#445A68E5",
                                            color: "#fff",
                                            "& .MuiChip-deleteIcon": {
                                                color: "white",
                                                fontSize: "16px",
                                            },
                                            "& .MuiChip-deleteIcon:hover": {
                                                backgroundColor: "transparent",
                                                color: "white",
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Card>

                {showUserDetails ?
                    <Card sx={{ margin: 'auto', padding: 3, mt: 4, borderRadius: '15px', boxShadow: '0px 4px 16.5px -6px rgba(0, 0, 0, 0.25)' }}>
                        <CardContent>
                            {/* User Details Section */}

                            <Grid2 container mb={2}>
                                <Grid2 size={{ md: 12 }}>
                                    <Typography sx={{ color: '#445A68', fontSize: '26px', fontWeight: '600', }} gutterBottom>
                                        User Details
                                    </Typography>
                                </Grid2>
                                <Grid2 size={{ md: 2 }} sx={{ fontSize: '18px', fontWeight: '400', color: '#455967', padding: '5px' }}>Mobile Number:</Grid2>
                                <Grid2 size={{ md: 10 }} sx={{ fontSize: '18px', fontWeight: '400', color: '#455967', padding: '5px' }}>{mobile}</Grid2>
                            </Grid2>

                            {/* Data Permissions Details Section */}

                            <Grid2 container>
                                <Grid2 size={{ md: 12 }}>
                                    <Typography sx={{ color: '#445A68', fontSize: '22px', fontWeight: '600', }} gutterBottom>
                                        Data Permissions Details
                                    </Typography>
                                </Grid2>

                                {dataPermissionUnionData?.values?.map((item, index) => {

                                    return (
                                        <>
                                            <Grid2 size={{ md: 2 }} sx={{ fontSize: '18px', fontWeight: '400', color: '#455967', padding: '5px' }}>{item?.key}</Grid2>
                                            <Grid2 size={{ md: 10 }} sx={{ fontSize: '18px', fontWeight: '400', color: '#1EA9BA', padding: '5px' }}>{item?.value}</Grid2>

                                        </>
                                    )
                                })}
                            </Grid2>
                        </CardContent>
                    </Card> : <></>}

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    {/* <Button
                        // className={classes.fetchButton}
                        sx={{
                            borderRadius: '10px',
                            border: '1px solid #A9A9A9',
                            color: showUserDetails ? '#A9A9A9 important' : '#FFFFFF !important',
                            fontSize: '18px !important',
                            background: showUserDetails ? 'transparant' : 'linear-gradient(180deg, #13BECF 0%, #455869 100%)',
                            padding: '8px 16px !important',
                            textTransform: 'capitalize'
                        }}
                        type='submit'
                    >
                        Fetch Data
                    </Button> */}
                    {showUserDetails ?
                        <>
                            <Button
                                sx={{
                                    borderRadius: '10px',
                                    border: '1px solid #A9A9A9',
                                    color: '#FFFFFF !important',
                                    fontSize: '18px !important',
                                    background: 'linear-gradient(180deg, #13BECF 0%, #455869 100%)',
                                    padding: '8px 16px !important',
                                    textTransform: 'capitalize'
                                }}
                                onClick={() => {
                                    formik.resetForm();
                                    setShowUserDetails(false);
                                }}
                            >
                                Reset
                            </Button>
                        </> : <>
                        <Button
                                sx={{
                                    borderRadius: '10px',
                                    border: '1px solid #A9A9A9',
                                    color: '#FFFFFF !important',
                                    fontSize: '18px !important',
                                    background: 'linear-gradient(180deg, #13BECF 0%, #455869 100%)',
                                    padding: '8px 16px !important',
                                    textTransform: 'capitalize'
                                }}
                                type='submit'
                            >
                                Fetch Data
                            </Button>
                        </>}
                </Box>
            </form>

            <PastRequests pastRequestData={pastRequestData} handlePageChange={handlePageChange} handleRowsPerPageChange={handleRowsPerPageChange} totalItems={totalItems} rowsPerPage={rowsPerPage} page={page} />
        </Box>
    )
}

export default DataPermission