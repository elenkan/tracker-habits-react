import { configureStore } from '@reduxjs/toolkit'
import { reducer } from 'shared/store/reducers'

export const store = configureStore({
  reducer,
})
