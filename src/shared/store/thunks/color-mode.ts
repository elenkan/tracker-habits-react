import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AppDispatch, AppThunk } from 'shared/types/state'
import { auth, database } from 'shared/config/firebase'
import { onValue, ref, set } from 'firebase/database'
import { setUserColorTheme } from 'shared/store/actions'
import { Notification } from 'shared/ui/notification/notification'

export const getColorMode = (): AppThunk => (dispatch: AppDispatch) => {
  try {
    const user = auth?.currentUser?.uid
    onValue(
      ref(database, `users/${user}/colorMode`),
      snapshot => {
        snapshot.exists()
          ? dispatch(setUserColorTheme(snapshot.val()))
          : dispatch(setUserColorTheme('light'))
      },
      { onlyOnce: true }
    )
  } catch (e) {
    Notification.showErrorNotification(e)
  }
}

export const saveColorMode = createAsyncThunk<void, 'light' | 'dark', { dispatch: AppDispatch }>(
  'saveColorMode',
  async colorMode => {
    try {
      const user = auth?.currentUser?.uid
      await set(ref(database, `users/${user}/colorMode`), colorMode)
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  }
)
