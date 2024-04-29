import type { store } from 'shared/store'
import type { ThunkAction } from '@reduxjs/toolkit'

export type State = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, State, undefined, any>
