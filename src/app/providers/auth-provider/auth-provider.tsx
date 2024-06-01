import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { ThemeModes } from 'app/enums'
import { auth } from 'shared/config/firebase'
import { setAuthStatus, setCurrentTheme, setIsGuestAuth } from 'shared/store/actions'
import { fetchArchiveHabitList, fetchHabitList } from 'shared/store/thunks/habit-list'
import { useAppDispatch, useAppSelector } from 'shared/hooks/stateHooks'
import { habitListSelector, isListLoadingSelector } from 'shared/store/selectors'
import LoadingScreen from 'widgets/loading-screen'

interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const habitList = useAppSelector(habitListSelector)
  const isListLoading = useAppSelector(isListLoadingSelector)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const theme = localStorage.getItem('theme') || ThemeModes.Light

    auth.onAuthStateChanged(async user => {
      if (user && !habitList?.length) {
        if (user.isAnonymous) {
          dispatch(setIsGuestAuth(true))
        }
        dispatch(fetchHabitList())
        dispatch(fetchArchiveHabitList())
        dispatch(setAuthStatus(true))
      } else {
        dispatch(setAuthStatus(false))
        setIsLoading(false)
      }
      dispatch(setCurrentTheme(theme))
    })
  }, [])

  useEffect(() => {
    if (isListLoading) {
      setIsLoading(false)
    }
  }, [isListLoading])

  return <>{isLoading ? <LoadingScreen /> : children}</>
}

export default AuthProvider
