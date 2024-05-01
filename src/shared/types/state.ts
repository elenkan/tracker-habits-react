import type { store } from 'shared/store'
import type { ThunkAction } from '@reduxjs/toolkit'
import type { Habit } from 'shared/types/index'

export type State = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, State, undefined, any>

export interface StoreData {
  challengeHabitsList: Habit[]
  archiveHabitsList: Habit[]
  colorDifficulty: string
  changeableHabit: Habit | null
  isAuth: boolean
  isGuestAuth: boolean
  currentTheme: 'light' | 'dark'
  userColorTheme: 'light' | 'dark' | null
  isLoading: boolean
  showCongratulation: boolean
  isListLoading: boolean
}
