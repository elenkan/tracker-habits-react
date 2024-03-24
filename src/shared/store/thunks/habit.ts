import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Habit } from 'shared/types'
import type { AppDispatch } from 'shared/types/state'
import { auth, database } from 'shared/config/firebase'
import { onValue, push, ref, remove, update } from 'firebase/database'
import Notification from 'shared/ui/notification/notification'
import { fetchHabitList } from 'shared/store/thunks/habit-list'

export const addHabit = createAsyncThunk<void, Habit, { dispatch: AppDispatch }>(
  'habitAction',
  async (habit, { dispatch }) => {
    try {
      const user = auth?.currentUser?.uid
      await push(ref(database, `users/${user}/challengeHabitsList`), habit).then(res => {
        dispatch(fetchHabitList())
      })
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  }
)

export const updateHabit = createAsyncThunk<void, Habit, { dispatch: AppDispatch }>(
  'updateHabitAction',
  async (habit, { dispatch }) => {
    try {
      const user = auth?.currentUser?.uid
      // eslint-disable-next-line @typescript-eslint/await-thenable
      onValue(
        ref(database, `users/${user}/challengeHabitsList`),
        snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach(item => {
              if (item.val().id === habit.id) {
                update(ref(database, `users/${user}/challengeHabitsList/${item.key}`), habit).then(
                  async _ => {
                    await dispatch(fetchHabitList())
                  }
                )
              }
            })
          }
        },
        { onlyOnce: true }
      )
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  }
)

export const deleteHabit = createAsyncThunk<void, number | string, { dispatch: AppDispatch }>(
  'deleteHabitAction',
  async (habitId, { dispatch }) => {
    try {
      const user = auth?.currentUser?.uid
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await onValue(
        ref(database, `users/${user}/challengeHabitsList`),
        snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach(item => {
              if (item.val().id === habitId) {
                remove(ref(database, `users/${user}/challengeHabitsList/${item.key}`)).then(_ => {
                  dispatch(fetchHabitList())
                })
              }
            })
          }
        },
        { onlyOnce: true }
      )
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  }
)
