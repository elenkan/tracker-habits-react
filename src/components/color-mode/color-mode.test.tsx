import { useAppDispatch, useAppSelector } from 'hooks/stateHooks'
import { Provider } from 'react-redux'
import { store } from '../../store'
import { render, fireEvent, screen } from '@testing-library/react'
import ColorMode from './color-mode'

jest.mock('../../hooks/stateHooks')

test('тест компонента ColorMode', () => {
  const hook = { useAppDispatch, useAppSelector }
  const dispatch = jest.spyOn(hook, 'useAppDispatch').mockReturnValue(jest.fn())
  const selector = jest.spyOn(hook, 'useAppSelector').mockReturnValue('dark')

  render(
    <Provider store={store}>
      <ColorMode />
    </Provider>
  )
  const wrapperIcon = screen.getByTestId(/wrapper/i)
  expect(wrapperIcon).toBeInTheDocument()
  expect(screen.getByTestId(/icon-dark/i)).toBeInTheDocument()
  expect(screen.findByTestId(/icon-light/i)).toBeEmpty()
  // expect(screen.getByText(/челлендж завершен/i)).toBeInTheDocument();
  // fireEvent.click(screen.getByTestId(/congratulations-screen/i));
  // expect(dispatch).toHaveBeenCalled();
})
