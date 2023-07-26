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
            primary: '#272727',
            button: '#fff'
          },
          background: {
            default: '#fff',
            button: '#e2958c'
          }
        }
        : {
          primary: {
            main: '#e2958c'
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
