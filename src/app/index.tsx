import AppRouter from './router'
import LoadingScreen from 'features/loading-screen'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { useEffect, useMemo } from 'react'
import type { PaletteMode } from '@mui/material'
import { useAppSelector, useAppDispatch } from 'app/redux/hooks/stateHooks'
import {
  currentThemeSelector,
  isLoadingSelector,
  showCongratulationSelector,
  habitListSelector,
} from 'app/redux/selectors/selectors'
import CssBaseline from '@mui/material/CssBaseline'
import { setAuthStatus, setCurrentTheme, setIsGuestAuth } from 'app/redux/actions/actions'
import { fetchArchiveHabitList, fetchHabitList, getColorMode } from 'app/redux/actions/api-actions'
import CongratulationsScreen from 'features/congratulations-screen'
import { paletteDark, paletteLight } from 'app/model/paletteData'
import { ThemeModes } from 'app/enums'
import { auth } from 'app/firebase'

const App = () => {
  const currentTheme = useAppSelector(currentThemeSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const showCongratulation = useAppSelector(showCongratulationSelector)
  const habitList = useAppSelector(habitListSelector)
  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === ThemeModes.Light ? paletteLight : paletteDark),
    },
    typography: {
      fontFamily: 'Montserrat-Regular, Arial, sans-serif;',
    },
  })

  const theme = useMemo(() => createTheme(getDesignTokens(currentTheme)), [currentTheme])
  const dispatch = useAppDispatch()

  useEffect(() => {
    const checkAuth = localStorage.getItem('checkAuth')
    const theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : ThemeModes.Light
    if (checkAuth !== 'true') {
      return
    }
    if (checkAuth === 'true') {
      auth.onAuthStateChanged(user => {
        if (user && !habitList?.length) {
          dispatch(getColorMode())
          dispatch(setAuthStatus(true))
          if (user.isAnonymous) {
            dispatch(setIsGuestAuth(true))
          }
          dispatch(fetchHabitList())
          dispatch(fetchArchiveHabitList())
          dispatch(setCurrentTheme(theme))
        } else {
          dispatch(setAuthStatus(false))
        }
      })
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="content" data-testid="content">
        <AppRouter />
        {isLoading && <LoadingScreen />}
        {showCongratulation && <CongratulationsScreen />}
      </div>
    </ThemeProvider>
  )
}

export default App
