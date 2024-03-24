import type { State } from 'shared/types/state'

export const currentThemeSelector = (state: State) => state.currentTheme
export const habitListSelector = (state: State) => state.challengeHabitsList

export const isLoadingSelector = (state: State) => state.isLoading
export const showCongratulationSelector = (state: State) => state.showCongratulation
export const archiveHabitsListSelector = (state: State) => state.archiveHabitsList
