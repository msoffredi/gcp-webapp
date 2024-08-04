import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import ClientForm from './ClientForm';
import { ClientRecord } from '../../models/client';

interface ClientsHeaderProps {
    onChange: (client: ClientRecord) => void;
}

const ClientsHeader = (props: ClientsHeaderProps): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);

    const onClickHandler = (): void => {
        setOpen(true);
    };

    return (
        <Grid
            container
            justifyContent='space-between'
            alignItems='center'
            // sx={{ mb: 2 }}
        >
            <Grid item>
                <Typography variant='h3' component='h3' gutterBottom>
                    Clients
                </Typography>
            </Grid>
            <Grid item>
                <Button
                    onClick={onClickHandler}
                    sx={{ mt: { xs: 2, md: 0 } }}
                    variant='contained'
                    startIcon={<AddIcon fontSize='small' />}
                >
                    Client
                </Button>
                <ClientForm
                    open={open}
                    setOpen={setOpen}
                    formTitle='Add Client'
                    submitButtonText='Add'
                    onChange={props.onChange}
                />
            </Grid>
        </Grid>
    );
};

export default ClientsHeader;
