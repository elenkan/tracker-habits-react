import AppRouter from '../../router';
import LoadingScreen from '../loading-screen';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useEffect, useMemo} from 'react';
import type {PaletteMode} from '@mui/material';
import {useAppSelector, useAppDispatch} from '../../hooks/stateHooks';
import CssBaseline from '@mui/material/CssBaseline';
import {setAuthStatus, setCurrentTheme, setIsGuestAuth} from '../../actions/actions';
import {auth} from '../../index';
import {fetchArchiveHabitList, fetchHabitList, getColorMode} from '../../actions/api-actions';
import CongratulationsScreen from '../congratulations-screen';
import {paletteDark, paletteLight} from '../../paletteData';

const App = () => {
  const currentTheme = useAppSelector(state => state.currentTheme);
  const isLoading = useAppSelector(state => state.isLoading);
  const showCongratulation = useAppSelector(state => state.showCongratulation);
  const habitList = useAppSelector(state => state.challengeHabitsList);
  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light' ? paletteLight : paletteDark),
    },
    typography: {
      fontFamily: 'Montserrat-Regular, Arial, sans-serif;',
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(currentTheme)), [currentTheme]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = localStorage.getItem('checkAuth');
    const theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
    if (checkAuth === 'true') {
      auth.onAuthStateChanged(user => {
        if (user && !habitList?.length) {
          dispatch(getColorMode());
          dispatch(setAuthStatus(true));
          if (user.isAnonymous) {
            dispatch(setIsGuestAuth(true));
          }
          dispatch(fetchHabitList());
          dispatch(fetchArchiveHabitList());
          dispatch(setCurrentTheme(theme));
        } else {
          dispatch(setAuthStatus(false));
        }
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="content">
        <AppRouter />
        {isLoading && <LoadingScreen />}
        {showCongratulation && <CongratulationsScreen />}
      </div>
    </ThemeProvider>
  );
};

export default App;
