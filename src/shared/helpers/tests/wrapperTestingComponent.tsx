import { Provider } from 'react-redux'
import { store } from 'shared/store'
import { render } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import type { ReactNode } from 'react'

export const wrapperTestingComponent = (component: ReactNode): RenderResult => {
  return render(<Provider store={store}>{component}</Provider>)
}
