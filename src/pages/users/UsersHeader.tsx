import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import { UserRecord } from '../../models/user';
import UserForm from './UserForm';

interface UsersHeaderProps {
    onChange: (user: UserRecord) => void;
}

const UsersHeader = (props: UsersHeaderProps): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);

    const onClickHandler = (): void => {
        setOpen(true);
    };

    return (
        <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>
                <Typography variant='h3' component='h3' gutterBottom>
                    Users
                </Typography>
            </Grid>
            <Grid item>
                <Button
                    onClick={onClickHandler}
                    sx={{ mt: { xs: 2, md: 0 } }}
                    variant='contained'
                    startIcon={<AddIcon fontSize='small' />}
                >
                    User
                </Button>
                <UserForm
                    open={open}
                    setOpen={setOpen}
                    formTitle='Add User'
                    submitButtonText='Add'
                    onChange={props.onChange}
                />
            </Grid>
        </Grid>
    );
};

export default UsersHeader;
