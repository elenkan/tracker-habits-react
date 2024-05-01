import { createReducer } from '@reduxjs/toolkit'
import {
  addColorDifficulty,
  addChangeableHabit,
  setAuthStatus,
  changeHabitList,
  changeArchiveHabitList,
  setCurrentTheme,
  setIsGuestAuth,
  setUserColorTheme,
  setIsLoading,
  setShowCongratulation,
  setIsListLoading,
} from 'shared/store/actions'
import type { StoreData } from 'shared/types/state'

const initialState: StoreData = {
  challengeHabitsList: [],
  archiveHabitsList: [],
  colorDifficulty: '',
  changeableHabit: null,
  isAuth: false,
  isGuestAuth: false,
  currentTheme: 'light',
  userColorTheme: null,
  isLoading: false,
  showCongratulation: false,
  isListLoading: false,
}

const reducer = createReducer(initialState, builder => {
  builder.addCase(changeHabitList, (state, action) => {
    state.challengeHabitsList = action.payload
  })

  builder.addCase(changeArchiveHabitList, (state, action) => {
    state.archiveHabitsList = action.payload
  })

  builder.addCase(addColorDifficulty, (state, action) => {
    state.colorDifficulty = action.payload
  })

  builder.addCase(addChangeableHabit, (state, action) => {
    state.changeableHabit = action.payload
  })

  builder.addCase(setAuthStatus, (state, action) => {
    state.isAuth = action.payload
  })

  builder.addCase(setCurrentTheme, (state, action) => {
    state.currentTheme = action.payload
  })

  builder.addCase(setUserColorTheme, (state, action) => {
    state.userColorTheme = action.payload
  })

  builder.addCase(setIsGuestAuth, (state, action) => {
    state.isGuestAuth = action.payload
  })

  builder.addCase(setIsLoading, (state, action) => {
    state.isLoading = action.payload
  })

  builder.addCase(setShowCongratulation, (state, action) => {
    state.showCongratulation = action.payload
  })

  builder.addCase(setIsListLoading, (state, action) => {
    state.isListLoading = action.payload
  })
})

export { reducer }
