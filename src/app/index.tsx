import AppRouter from './router'
import LoadingScreen from 'widgets/loading-screen'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { useEffect, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from 'shared/hooks/stateHooks'
import {
  currentThemeSelector,
  isLoadingSelector,
  showCongratulationSelector,
  habitListSelector,
} from 'shared/store/selectors'
import CssBaseline from '@mui/material/CssBaseline'
import { setAuthStatus, setCurrentTheme, setIsGuestAuth } from 'shared/store/actions'
import { fetchArchiveHabitList, fetchHabitList } from 'shared/store/thunks/habit-list'
import { getColorMode } from 'shared/store/thunks/color-mode'
import CongratulationsScreen from 'widgets/congratulations-screen'
import { ThemeModes } from 'app/enums'
import { getDesignTokens } from 'app/lib/getDesignTokens'
import { auth } from 'shared/config/firebase'

const App = () => {
  const currentTheme = useAppSelector(currentThemeSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const showCongratulation = useAppSelector(showCongratulationSelector)
  const habitList = useAppSelector(habitListSelector)

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
