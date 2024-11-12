import { TablePagination } from '@mui/material'
import React from 'react'

import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';

function CustomTablePaginationActions(props) {
    const { count, page, rowsPerPage, onPageChange } = props;
    const theme = useTheme();

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    return (
        <div className="pagination-actions">
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                className="pagination-icon-button"
            >
                <ArrowBackIcon />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                className="pagination-icon-button"
            >
                <ArrowForwardIcon />
            </IconButton>
        </div>
    );
}

const CustomPagination = ({ rowsPerPageOptions, count, rowsPerPage, page, onPageChange, onRowsPerPageChange }) => {
  return (
    <>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        className="pagination"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        ActionsComponent={CustomTablePaginationActions}
      />
    </>
  )
}

export default CustomPagination