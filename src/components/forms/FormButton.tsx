import { Button, ButtonProps } from '@mui/material';

interface FormButtonProps extends ButtonProps {}

const FormButton = (props: FormButtonProps): JSX.Element => {
    return (
        <Button
            variant='contained'
            {...props}
            sx={{ height: '2.3rem', ...props.sx }}
        />
    );
};

export default FormButton;
