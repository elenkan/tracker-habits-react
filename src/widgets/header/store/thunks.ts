import { createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from 'shared/config/firebase'

export const logout = createAsyncThunk<void, undefined>('logout', async () => {
  await auth.signOut()
})
