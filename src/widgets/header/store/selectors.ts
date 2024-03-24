import type { State } from 'shared/types/state'

export const isAuthSelector = (state: State) => state.isAuth
export const isGuestAuthSelector = (state: State) => state.isGuestAuth
