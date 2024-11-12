import { Box, Breadcrumbs, Card, Chip, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

const ViewDataRequest = () => {

  const { viewDataRequestData, loading } = useSelector((state) => state.dataRequest);


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
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/dashboard"
        >

          Data Requests
        </Typography>

        <Typography
          sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
        >

          View Details
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', marginTop: '16px' }}>
        <Typography sx={{ color: '#13BECF', fontSize: '29px', fontWeight: '500', }}>View Details</Typography>
      </Box>

      <Card sx={{ mt: 4, p: 3 }}>

        {
          viewDataRequestData?.selfAttribute?.length ? (

            viewDataRequestData?.selfAttributes?.map((item, index) => {

              return (
                <Box key={index} style={{ marginBottom: '8px' }}>
                  <Typography variant="body2">{item.name}:</Typography>

                  {item.value.map((val, idx) => (
                    <Chip
                      key={idx}
                      label={val}
                      size="small"
                      style={{ margin: '2px' }}
                      sx={{
                        borderRadius: "18px",
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
              )
            })

          ) : (
            <Typography sx={{ py:2}}>No Data Avaiable for Self Attributes</Typography>
          )
        }

        {
          viewDataRequestData?.restAttributes?.length ? (

            viewDataRequestData?.restAttributes?.map((item, index) => {

              return (
                <Box key={index} style={{ marginBottom: '8px' }}>
                  <Typography variant="body2">{item.name}:</Typography>

                  {item.value.map((val, idx) => (
                    <Chip
                      key={idx}
                      label={val}
                      size="small"
                      style={{ margin: '2px' }}
                      sx={{
                        borderRadius: "18px",
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
              )
            })
          ) : (

            <Typography>No Data Avaiable for Rest Attributes</Typography>
          )
        }

      </Card>
    </Box>
  )
}

export default ViewDataRequest