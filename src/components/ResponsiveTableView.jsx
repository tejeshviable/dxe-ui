import { useMediaQuery } from "@mui/material";
import  React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Card,
    Box,
    Typography,
    Breadcrumbs,
    Avatar,
    TablePagination,
    CircularProgress,
    IconButton,
    Collapse,
    Grid2,
  } from "@mui/material";


const styles = {
    container: (isSmallScreen) => ({
      padding: 2,
      display: "flex",
      justifyContent: "space-between",
      flexWrap: isSmallScreen ? "wrap" : "nowrap",
      flexDirection: isSmallScreen ? "column" : "row",
    }),
    boxWidth: { width: "25%" },
    labelText: { color: "#455967", fontWeight: "600", fontSize: "16px" },
    valueText: { fontSize: "14px", fontWeight: "400", color: "#455967" },
    chip: {
      borderRadius: "18px",
      background: "#FF8D5D",
      color: "#fff",
      "& .MuiChip-deleteIcon": { color: "white", fontSize: "16px" },
      "& .MuiChip-deleteIcon:hover": {
        backgroundColor: "transparent",
        color: "white",
      },
      margin: "2px",
    },
  };
  function formatDate(dateString) {
    if(!dateString){
  return false
    }
    const date = new Date(dateString);
  
    // Options for formatting
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
     
    };
  
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const ResponsiveTableView = ({
    openRowIndex,
    index,
    viewCampaignDetails,
    showSpinner

  }) => {
 console.log('viewCampaignDetails',viewCampaignDetails)
    const isSmallScreen = useMediaQuery("(max-width:900px)");
  
    return (
      openRowIndex === index && (
        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={9}
            sx={{ backgroundColor: "#D5F3F666" }}
          >
            <Collapse in={openRowIndex === index} timeout="auto" unmountOnExit>

           
              <Box sx={styles.container(isSmallScreen)}>
                {/* Campaign Information */}
                <Box sx={styles.boxWidth}>
                  <Typography sx={styles.labelText}>
                    Campaign Name:{" "}
                    <span style={styles.valueText}>
                    {viewCampaignDetails?.campaignName ? viewCampaignDetails?.campaignName :'data not persent'}
                    </span>
                  </Typography>
                </Box>
                <Box sx={styles.boxWidth}>
                  <Typography sx={styles.labelText}>
                    Website Url:{" "}
                    <span style={styles.valueText}>
                    {viewCampaignDetails?.description ?  viewCampaignDetails?.description  :'data not persent'}

                    </span>
                  </Typography>
                </Box>
                <Box sx={styles.boxWidth}>
                  <Typography sx={styles.labelText}>
                   Channel:{" "}
                    <span style={styles.valueText}>
                    {viewCampaignDetails?.channel ?  viewCampaignDetails?.channel   :'data not persent'}
                    </span>
                  </Typography>
                </Box>
             
              </Box>

              <Box sx={styles.container(isSmallScreen)}>
                {/* Campaign Information */}
              
                <Box sx={styles.boxWidth}>
                  <Typography sx={styles.labelText}>
                    Start Date:{" "}
                    <span style={styles.valueText}>
                   {formatDate(viewCampaignDetails?.startDate)    ?  formatDate(viewCampaignDetails?.startDate)     :'data not persent'}
                    </span> 
                  </Typography>
                </Box>
                <Box sx={styles.boxWidth}>
                  <Typography sx={styles.labelText}>
                    End Date:{" "}
                    <span style={styles.valueText}>
                    {formatDate(viewCampaignDetails?.endDate)  ? formatDate(viewCampaignDetails?.endDate)      :'data not persent'}

                    </span>
                  </Typography>
                </Box>

                <Box sx={styles.boxWidth}>
                  <Typography sx={styles.labelText}>
                    UpdatedOn:{" "}
                    <span style={styles.valueText}>
                    {formatDate(viewCampaignDetails?.updatedOn)    ? formatDate(viewCampaignDetails?.updatedOn)        :'data not persent'}

                    </span>
                  </Typography>
                </Box>
              </Box>
  

            </Collapse>
          </TableCell>
        </TableRow>
      )
    );
  };
  
  
  export default ResponsiveTableView