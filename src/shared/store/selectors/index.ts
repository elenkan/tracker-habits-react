import type { State } from 'shared/types/state'

export const isAuthSelector = (state: State) => state.isAuth

export const currentThemeSelector = (state: State) => state.currentTheme
export const habitListSelector = (state: State) => state.challengeHabitsList

export const archiveHabitsListSelector = (state: State) => state.archiveHabitsList

export const isListLoadingSelector = (state: State) => state.isListLoading
