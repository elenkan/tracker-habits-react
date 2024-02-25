import { createAction } from '@reduxjs/toolkit'

export const changeHabitList = createAction('changeHabitList', list => ({ payload: list }))
export const changeArchiveHabitList = createAction('changeArchiveHabitList', list => ({
  payload: list,
}))
export const addColorDifficulty = createAction('addColorDifficulty', colorDifficulty => ({
  payload: colorDifficulty,
}))
export const addChangeableHabit = createAction('addChangeableHabit', changeableHabit => ({
  payload: changeableHabit,
}))
export const setAuthStatus = createAction('setAuthStatus', value => ({ payload: value }))
export const setUserColorTheme = createAction('setUserColorTheme', value => ({ payload: value }))
export const setCurrentTheme = createAction('setCurrentTheme', value => ({ payload: value }))
export const setIsGuestAuth = createAction('setIsGuestAuth', value => ({ payload: value }))
export const setIsLoading = createAction('setIsLoading', value => ({ payload: value }))
export const setShowCongratulation = createAction('setShowCongratulation', value => ({
  payload: value,
}))
