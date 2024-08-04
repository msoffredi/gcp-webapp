import { Container, Grid, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import SideBar from './SideBar';

const PageLayout = (props: PropsWithChildren): JSX.Element => {
    return (
        <Grid container>
            <Grid
                item
                xs={2}
                style={{
                    backgroundColor: 'lightgray',
                    height: '100vh'
                }}
            >
                <Typography variant='h6'>
                    <SideBar />
                </Typography>
            </Grid>
            <Grid item xs>
                <Container style={{ width: '100%', margin: 0 }}>
                    {props.children}
                </Container>
            </Grid>
        </Grid>
    );
};

export default PageLayout;
