import { configureStore } from '@reduxjs/toolkit'
import { reducer } from 'app/redux/reducers/reducer'

export const store = configureStore({
  reducer,
})
