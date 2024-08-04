import { Typography } from '@mui/material';

interface FormTitleProps {
    text: string;
}

const FormTitle = (props: FormTitleProps): JSX.Element => {
    return (
        <Typography
            variant='h2'
            sx={{ fontSize: '1.2rem', color: 'black', marginBottom: '1.5rem' }}
        >
            {props.text}
        </Typography>
    );
};

export default FormTitle;
