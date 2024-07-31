import { Box, Grid, styled, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import SideBar from './SideBar';

interface PageLayoutProps {
    title: string;
}

const PageLayout = (props: PropsWithChildren<PageLayoutProps>): JSX.Element => {
    return (
        <Container>
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
                    <Box
                        style={{
                            padding: '10px',
                            height: '70px',
                            width: '100%'
                        }}
                    >
                        <h1>{props.title}</h1>
                    </Box>
                    <Box
                        style={{
                            padding: '10px'
                        }}
                    >
                        {props.children}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

const Container = styled('div')({});

export default PageLayout;
