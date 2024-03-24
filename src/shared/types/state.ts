import type { store } from 'shared/store'

export type State = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
