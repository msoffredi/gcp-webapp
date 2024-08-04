import { CircularProgress, styled } from '@mui/material';

interface OverlayProps {
    processing?: boolean;
    'no-icon'?: boolean;
}

const Overlay = (props: OverlayProps): JSX.Element => {
    return (
        <>
            {props.processing && (
                <Container>
                    {!props['no-icon'] && <CircularProgress color='warning' />}
                </Container>
            )}
        </>
    );
};

const Container = styled('div')({
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#0f0f0f',
    opacity: 0.2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    zIndex: 9000
});

export default Overlay;
