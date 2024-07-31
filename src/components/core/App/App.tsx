import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRouter from '../AppRouter';
import { baseTheme } from '../../theme/base_theme';

const App = (): JSX.Element => {
    const theme = baseTheme;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRouter />
        </ThemeProvider>
    );
};

export default App;
