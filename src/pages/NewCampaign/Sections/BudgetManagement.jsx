import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const BudgetManagement = ({ classes, handleNext, prevStep }) => {

    const [value, setValue] = useState(0);
  const [expanded, setExpanded] = useState(true);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleAccordionChange = () => {
        setExpanded((prev) => !prev);
      };


    return (
        <>
            <Accordion
            //   onChange={handleAccordionChange}
                sx={{
                    border: "1px solid #ccc",
                    borderRadius: "10px !important",
                    boxShadow: "none",
                    overflow: "hidden",
                    boxShadow: "0px 4px 16.5px -6px rgba(0, 0, 0, 0.25)",
                    marginBottom: "25px !important",
                }}
                
            >
                <AccordionSummary
                    // sx={{ backgroundColor: '#F9FAFB', borderRadius: '10px', minHeight: '50px', color: '#333333', fontWeight: '500', fontSize: '19px' }}
                    sx={{
                        minHeight: "65px ",
                        color: "#333333",
                        fontWeight: "500",
                        fontSize: "19px",
                        backgroundColor: '#F9FAFB',
                        borderTopLeftRadius: "15px !important",
                        borderTopRightRadius: "15px !important",
                        borderRadius: "10px",
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {!expanded ? (
            <CheckCircleIcon
              sx={{
                fill: '#13BECF',
                borderRadius: '50%',
                width: '25px',
                height: '25px',
              }}
            />
          ) : (
            <RadioButtonUncheckedIcon
              sx={{
                fill: '#13BECF',
                borderRadius: '50%',
                width: '25px',
                height: '25px',
              }}
            />
          )}
                        Budget Management
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '0px 0px 16px' }}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="fullWidth" // Makes the tabs take full width
                                sx={{
                                    width: '100%',
                                    '.MuiTabs-flexContainer': {
                                        justifyContent: 'space-around',
                                    },
                                    '.MuiTabs-indicator': {
                                        height: '5px',
                                        backgroundColor: '#13BECF'
                                    },

                                    '.MuiButtonBase-root-MuiTab-root': {
                                        '.Mui-selected': {
                                            color: '',
                                            backgroundColor: '#000'
                                        }
                                    }
                                }}
                            >
                                <Tab
                                    sx={{
                                        flex: 1,
                                        '&.Mui-selected': {
                                            color: '#333333',
                                            fontWeight: '600',
                                            backgroundColor: '#F5F5F5',
                                        },
                                    }}
                                    label="1 Day"
                                    {...a11yProps(0)}
                                />
                                <Tab
                                    sx={{

                                        flex: 1,
                                        '&.Mui-selected': {
                                            color: '#333333',
                                            fontWeight: '600',
                                            backgroundColor: '#F5F5F5',
                                        },
                                    }}
                                    label="7 Days"
                                    {...a11yProps(1)}
                                />
                                <Tab
                                    sx={{

                                        flex: 1,
                                        '&.Mui-selected': {
                                            color: '#333333',
                                            fontWeight: '600',
                                            backgroundColor: '#F5F5F5',
                                        },
                                    }}
                                    label="30 Days"
                                    {...a11yProps(2)}
                                />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <Typography className={classes.label}>
                                        Budget
                                    </Typography>

                                    <TextField
                                        name="title"
                                        // value={formik.values.title}
                                        // onChange={formik.handleChange}
                                        className={classes.textField}
                                    // error={formik.touched.title && Boolean(formik.errors.title)}
                                    // helperText={formik.touched.title && formik.errors.title}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <Typography className={classes.label}>
                                        Estimated Impressions
                                    </Typography>

                                    <TextField
                                        name="title"
                                        // value={formik.values.title}
                                        // onChange={formik.handleChange}
                                        className={classes.textField}
                                    // error={formik.touched.title && Boolean(formik.errors.title)}
                                    // helperText={formik.touched.title && formik.errors.title}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <Typography className={classes.label}>
                                        Estimated Clicks
                                    </Typography>

                                    <TextField
                                        name="title"
                                        // value={formik.values.title}
                                        // onChange={formik.handleChange}
                                        className={classes.textField}
                                    // error={formik.touched.title && Boolean(formik.errors.title)}
                                    // helperText={formik.touched.title && formik.errors.title}
                                    />
                                </Grid>
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <Typography className={classes.label}>
                                        Budget
                                    </Typography>

                                    <TextField
                                        name="title"
                                        // value={formik.values.title}
                                        // onChange={formik.handleChange}
                                        className={classes.textField}
                                    // error={formik.touched.title && Boolean(formik.errors.title)}
                                    // helperText={formik.touched.title && formik.errors.title}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <Typography className={classes.label}>
                                        Estimated Impressions
                                    </Typography>

                                    <TextField
                                        name="title"
                                        // value={formik.values.title}
                                        // onChange={formik.handleChange}
                                        className={classes.textField}
                                    // error={formik.touched.title && Boolean(formik.errors.title)}
                                    // helperText={formik.touched.title && formik.errors.title}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <Typography className={classes.label}>
                                        Estimated Clicks
                                    </Typography>

                                    <TextField
                                        name="title"
                                        // value={formik.values.title}
                                        // onChange={formik.handleChange}
                                        className={classes.textField}
                                    // error={formik.touched.title && Boolean(formik.errors.title)}
                                    // helperText={formik.touched.title && formik.errors.title}
                                    />
                                </Grid>
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <Typography className={classes.label}>
                                        Budget
                                    </Typography>

                                    <TextField
                                        name="title"
                                        // value={formik.values.title}
                                        // onChange={formik.handleChange}
                                        className={classes.textField}
                                    // error={formik.touched.title && Boolean(formik.errors.title)}
                                    // helperText={formik.touched.title && formik.errors.title}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <Typography className={classes.label}>
                                        Estimated Impressions
                                    </Typography>

                                    <TextField
                                        name="title"
                                        // value={formik.values.title}
                                        // onChange={formik.handleChange}
                                        className={classes.textField}
                                    // error={formik.touched.title && Boolean(formik.errors.title)}
                                    // helperText={formik.touched.title && formik.errors.title}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <Typography className={classes.label}>
                                        Estimated Clicks
                                    </Typography>

                                    <TextField
                                        name="title"
                                        // value={formik.values.title}
                                        // onChange={formik.handleChange}
                                        className={classes.textField}
                                    // error={formik.touched.title && Boolean(formik.errors.title)}
                                    // helperText={formik.touched.title && formik.errors.title}
                                    />
                                </Grid>
                            </Grid>
                        </CustomTabPanel>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default BudgetManagement