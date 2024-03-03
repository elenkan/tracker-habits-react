// import { useAppDispatch, useAppSelector } from 'hooks/stateHooks'
import { wrapperTestingComponent } from 'tests/helpers/wrapperTestingComponent'
import { fireEvent, screen } from '@testing-library/react'
import ColorModeSwitcher from './color-mode-switcher'

// jest.mock('../../hooks/stateHooks')

test('тест компонента ColorMode', () => {
  // const hook = { useAppDispatch, useAppSelector }
  // const dispatch = jest.spyOn(hook, 'useAppDispatch').mockReturnValue(jest.fn())
  // const selector = jest.spyOn(hook, 'useAppSelector').mockReturnValue('dark')
  wrapperTestingComponent(<ColorModeSwitcher />)

  const iconWrapper = screen.getByTestId(/wrapper/i)
  const lightIcon = screen.getByTestId(/icon-light/i)
  const darkIcon = screen.queryByTestId(/icon-dark/i)

  expect(iconWrapper).toBeInTheDocument()
  expect(lightIcon).toBeInTheDocument()
  expect(darkIcon).toBeNull()

  // fireEvent.click(iconWrapper)
  // expect(darkIcon).toBeInTheDocument()
  // expect(lightIcon).toBeNull()
})
