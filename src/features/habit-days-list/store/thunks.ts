import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Habit } from 'shared/types'
import type { AppDispatch } from 'shared/types/state'
import { auth, database } from 'shared/config/firebase'
import { push, ref } from 'firebase/database'
import { fetchArchiveHabitList } from 'shared/store/thunks/habit-list'
import { Notification } from 'shared/ui'

export const addArchiveHabit = createAsyncThunk<void, Habit, { dispatch: AppDispatch }>(
  'archiveHabitAction',
  async (habit, { dispatch }) => {
    try {
      const user = auth?.currentUser?.uid
      await push(ref(database, `users/${user}/archiveHabitsList`), habit).then(async _ => {
        await dispatch(fetchArchiveHabitList())
      })
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  }
)
