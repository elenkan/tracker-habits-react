import AppRouter from '../../router';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const App = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#89ccc5',

            },
            secondary: {
                main: '#fff',
            }
            // secondary: {
            //     // This is green.A700 as hex.
            //     main: '#11cb5f',
            // },
        },
        typography: {
            fontFamily: 'Montserrat-Regular, Arial, sans-serif;'
        }
    });
    return (
        <ThemeProvider theme={theme}>
            <AppRouter/>
        </ThemeProvider>
    )
};

export default App;
