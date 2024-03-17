import type { State } from 'types/state'

export const currentThemeSelector = (state: State) => state.currentTheme
export const isLoadingSelector = (state: State) => state.isLoading
export const showCongratulationSelector = (state: State) => state.showCongratulation
export const habitListSelector = (state: State) => state.challengeHabitsList
export const userColorThemeSelector = (state: State) => state.userColorTheme
export const archiveHabitsListSelector = (state: State) => state.archiveHabitsList
export const colorDifficultySelector = (state: State) => state.colorDifficulty
export const isAuthSelector = (state: State) => state.isAuth
export const isGuestAuthSelector = (state: State) => state.isGuestAuth
export const changeableHabitSelector = (state: State) => state.changeableHabit
