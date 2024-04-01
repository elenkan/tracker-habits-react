import { wrapperTestingComponent } from 'shared/helpers/tests/wrapperTestingComponent'
import { useAppDispatch } from 'shared/hooks/stateHooks'
import { fireEvent, screen } from '@testing-library/react'
import CongratulationsScreen from 'widgets/congratulations-screen/index'

jest.mock('../../hooks/stateHooks')

test('тест компонента CongratulationsScreen', () => {
  const hook = { useAppDispatch }
  const dispatch = jest.spyOn(hook, 'useAppDispatch').mockReturnValue(jest.fn())

  wrapperTestingComponent(<CongratulationsScreen />)

  expect(screen.getByText(/поздравляем/i)).toBeInTheDocument()
  expect(screen.getByText(/челлендж завершен/i)).toBeInTheDocument()
  fireEvent.click(screen.getByTestId(/congratulations-screen/i))
  expect(dispatch).toHaveBeenCalled()
})
