import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Habit } from 'shared/types'
import type { AppDispatch, AppThunk } from 'shared/types/state'
import { auth, database } from 'shared/config/firebase'
import { onValue, push, ref, remove, update } from 'firebase/database'
import { Notification } from 'shared/ui'
import { fetchHabitList } from 'shared/store/thunks/habit-list'

export const addHabit = createAsyncThunk<void, Habit, { dispatch: AppDispatch }>(
  'habitAction',
  async (habit, { dispatch }) => {
    try {
      const user = auth?.currentUser?.uid
      await push(ref(database, `users/${user}/challengeHabitsList`), habit).then(_ => {
        dispatch(fetchHabitList())
      })
    } catch (e) {
      Notification.showErrorNotification(e)
    }
  }
)

export const updateHabit =
  (habit: Habit): AppThunk =>
  (dispatch: AppDispatch) => {
    try {
      const user = auth?.currentUser?.uid
      onValue(
        ref(database, `users/${user}/challengeHabitsList`),
        snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach(item => {
              if (item.val().id === habit.id) {
                update(ref(database, `users/${user}/challengeHabitsList/${item.key}`), habit).then(
                  _ => {
                    dispatch(fetchHabitList())
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

export const deleteHabit =
  (habitId: number | string): AppThunk =>
  (dispatch: AppDispatch) => {
    try {
      const user = auth?.currentUser?.uid
      onValue(
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
