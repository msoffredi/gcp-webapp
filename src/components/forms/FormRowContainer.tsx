import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import { Box, BoxTypeMap, SxProps, Theme } from '@mui/system';
import { PropsWithChildren } from 'react';

const FormRowContainer = (
    props: PropsWithChildren<DefaultComponentProps<BoxTypeMap>>
): JSX.Element => {
    const className = props.className
        ? `form-row-container ${props.className}`
        : 'form-row-container';

    const sx: SxProps<Theme> = {
        ...props.sx,
        display: 'block',
        marginBottom: '0.3rem'
    };

    return (
        <Box {...props} className={className} sx={sx}>
            {props.children}
        </Box>
    );
};

export default FormRowContainer;
