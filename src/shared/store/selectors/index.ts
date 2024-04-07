import type { State } from 'shared/types/state'

export const currentThemeSelector = (state: State) => state.currentTheme
export const habitListSelector = (state: State) => state.challengeHabitsList

export const archiveHabitsListSelector = (state: State) => state.archiveHabitsList
