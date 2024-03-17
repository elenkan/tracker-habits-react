import type { store } from 'app/redux/store'

export type State = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
