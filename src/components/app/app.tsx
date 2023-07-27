import AppRouter from '../../router';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useMemo} from 'react';
import {PaletteMode} from '@mui/material';
import {useAppSelector} from '../../hooks/stateHooks';
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
  const currentTheme = useAppSelector(state => state.currentTheme);
  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
          primary: {
            main: '#89ccc5',
          },
          secondary: {
            main: '#fff',
          },
          text: {
            primary: '#272727'
          },
          button: {
            text: '#fff',
            background: '#e2958c',
          },
          background: {
            default: '#fff',
          },
          card: {
            background: '#d7ebe9'
          }
        }
        : {
          primary: {
            main: '#e2958c'
          },
          card: {
            background: 'rgba(255, 255, 255, 0.1)'
          }
        })
    },
    typography: {
      fontFamily: 'Montserrat-Regular, Arial, sans-serif;'
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(currentTheme)), [currentTheme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="content">
        <AppRouter/>
      </div>
    </ThemeProvider>
  )
};

export default App;
