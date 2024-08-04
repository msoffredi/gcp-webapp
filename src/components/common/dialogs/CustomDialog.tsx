import {
    Dialog,
    DialogContent,
    DialogProps,
    IconButton,
    ModalProps
} from '@mui/material';
import { PropsWithChildren } from 'react';

interface CustomDialogProps extends DialogProps {
    onClose: ModalProps['onClose'] | (() => void);
}

const CustomDialog = (
    props: PropsWithChildren<CustomDialogProps>
): JSX.Element => {
    const { children, ...dialogProps } = props;

    return (
        <Dialog {...dialogProps}>
            <IconButton
                aria-label='close'
                onClick={() => {
                    if (dialogProps.onClose) {
                        dialogProps.onClose({}, 'backdropClick');
                    }
                }}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                }}
            >
                X
            </IconButton>
            <DialogContent sx={{ minWidth: 500 }}>{children}</DialogContent>
        </Dialog>
    );
};

export default CustomDialog;
