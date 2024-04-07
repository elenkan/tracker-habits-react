import MuiThemeProvider from './providers/mui-theme-provider/mui-theme-provider'
import AppRouter from './providers/router-provider'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from 'shared/hooks/stateHooks'
import { habitListSelector } from 'shared/store/selectors'
import { setAuthStatus, setCurrentTheme, setIsGuestAuth } from 'shared/store/actions'
import { fetchArchiveHabitList, fetchHabitList } from 'shared/store/thunks/habit-list'
import { getColorMode } from 'shared/store/thunks/color-mode'
import { ThemeModes } from 'app/enums'
import { auth } from 'shared/config/firebase'

const App = () => {
  const habitList = useAppSelector(habitListSelector)

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
    <MuiThemeProvider>
      <div className="content" data-testid="content">
        <AppRouter />
      </div>
    </MuiThemeProvider>
  )
}

export default App
