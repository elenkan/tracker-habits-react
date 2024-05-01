import { Provider } from 'react-redux'
import { store } from 'shared/store'
import { render } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import type { ReactNode } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from 'shared/store/reducers'

export const wrapperTestingComponent = (
  component: ReactNode,
  initialState: object | null = null
): RenderResult => {
  const testingStore = initialState
    ? configureStore({
        reducer,
        preloadedState: initialState,
      })
    : store
  return render(<Provider store={testingStore}>{component}</Provider>)
}
