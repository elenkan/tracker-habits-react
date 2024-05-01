import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AppDispatch, AppThunk } from 'shared/types/state'
import { auth, database } from 'shared/config/firebase'
import { onValue, ref, set } from 'firebase/database'
import { setCurrentTheme } from 'shared/store/actions'
import { Notification } from 'shared/ui/notification/notification'

export const saveColorMode = createAsyncThunk<void, 'light' | 'dark', { dispatch: AppDispatch }>(
  'saveColorMode',
  async (colorMode, { dispatch }) => {
    try {
      const user = auth?.currentUser?.uid
      localStorage.setItem('theme', colorMode)
      dispatch(setCurrentTheme(colorMode))
      await set(ref(database, `users/${user}/colorMode`), colorMode)
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  }
)

export const getColorMode =
  (theme: 'light' | 'dark'): AppThunk =>
  (dispatch: AppDispatch) => {
    try {
      const user = auth?.currentUser?.uid
      onValue(
        ref(database, `users/${user}/colorMode`),
        snapshot => {
          if (snapshot.exists()) {
            dispatch(saveColorMode(snapshot.val()))
          } else {
            dispatch(saveColorMode(theme))
          }
        },
        { onlyOnce: true }
      )
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  }
