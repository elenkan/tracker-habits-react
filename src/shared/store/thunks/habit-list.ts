import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AppDispatch } from 'shared/types/state'
import { auth, database } from 'shared/config/firebase'
import { onValue, ref } from 'firebase/database'
import type { Habit } from 'shared/types'
import { changeArchiveHabitList, changeHabitList } from 'shared/store/actions'
import { Notification } from 'shared/ui'

export const fetchHabitList = createAsyncThunk<void, undefined, { dispatch: AppDispatch }>(
  'fetchHabitList',
  async (_args, { dispatch }) => {
    try {
      const user = auth?.currentUser?.uid
      onValue(
        ref(database, `users/${user}/challengeHabitsList`),
        snapshot => {
          const habitsList: Habit[] = []
          if (snapshot) {
            snapshot.forEach(item => {
              habitsList?.push(item.val())
            })
            dispatch(changeHabitList(habitsList))
          }
        },
        { onlyOnce: true }
      )
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  }
)

export const fetchArchiveHabitList = createAsyncThunk<void, undefined, { dispatch: AppDispatch }>(
  'fetchArchiveHabitList',
  async (_args, { dispatch }) => {
    try {
      const user = auth?.currentUser?.uid
      onValue(
        ref(database, `users/${user}/archiveHabitsList`),
        snapshot => {
          const habitsList: Habit[] = []
          if (snapshot) {
            snapshot.forEach(item => {
              habitsList?.push(item.val())
            })
            dispatch(changeArchiveHabitList(habitsList))
          }
        },
        { onlyOnce: true }
      )
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  }
)
