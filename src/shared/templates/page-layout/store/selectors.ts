import type { State } from 'shared/types/state'

export const isLoadingSelector = (state: State) => state.isLoading
export const showCongratulationSelector = (state: State) => state.showCongratulation
