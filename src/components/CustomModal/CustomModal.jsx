import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Modal = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const CustomModal = ({ open, onClose, children, heading, button, customWidth }) => {

    return (
        <React.Fragment>
            <Modal
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{
                    '& .MuiPaper-root': {
                        maxWidth: customWidth,
                        width: '100%',
                    }
                }}
            >
                <DialogTitle sx={{ my: 0, p: 2, color:'#13BECF', fontSize:'24px', fontWeight:'500' }} id="customized-dialog-title">
                    {heading}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{overflow:'initial'}}>
                    {children}
                </DialogContent>
                {/* {
                    button ? <DialogActions>
                        <Button variant='contained' sx={{ color: '#fff', fontSize: '14px', fontWeight: 500, backgroundColor: '#13BECF', padding:'8px 16px', borderRadius:'6px' }} onClick={onClose}>
                            Save
                        </Button>
                    </DialogActions> : <></>
                } */}
            </Modal>
        </React.Fragment>
    );
}

export default CustomModal
