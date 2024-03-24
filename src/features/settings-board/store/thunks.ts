import { createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from 'shared/config/firebase'
import { deleteUser } from 'firebase/auth'
import Notification from 'shared/ui/notification/notification'

export const deleteAccount = createAsyncThunk<void>('deleteAccount', async () => {
  try {
    const user = auth.currentUser
    user && (await deleteUser(user))
  } catch (e) {
    Notification.showErrorNotification(e)
  }
})
