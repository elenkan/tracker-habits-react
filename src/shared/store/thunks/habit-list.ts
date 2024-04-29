import type { AppDispatch, AppThunk } from 'shared/types/state'
import { auth, database } from 'shared/config/firebase'
import { onValue, ref } from 'firebase/database'
import type { Habit } from 'shared/types'
import { changeArchiveHabitList, changeHabitList, setIsListLoading } from 'shared/store/actions'
import { Notification } from 'shared/ui'

export const fetchHabitList = (): AppThunk => (dispatch: AppDispatch) => {
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
          dispatch(setIsListLoading(true))
        }
      },
      { onlyOnce: true }
    )
  } catch (e) {
    Notification.showErrorNotification(e)
  }
}

export const fetchArchiveHabitList = (): AppThunk => (dispatch: AppDispatch) => {
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
          dispatch(setIsListLoading(true))
        }
      },
      { onlyOnce: true }
    )
  } catch (e) {
    Notification.showErrorNotification(e)
  }
}
