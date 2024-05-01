import { wrapperTestingComponent } from 'shared/helpers/tests/wrapperTestingComponent'
import { screen } from '@testing-library/react'
import ColorModeSwitcher from 'features/color-mode-switcher/color-mode-switcher'

describe('тест компонента ColorMode', () => {
  test('отображение light icon', () => {
    wrapperTestingComponent(<ColorModeSwitcher />)

    const iconWrapper = screen.getByTestId(/wrapper/i)
    const lightIcon = screen.getByTestId(/icon-light/i)
    const darkIcon = screen.queryByTestId(/icon-dark/i)

    expect(iconWrapper).toBeInTheDocument()
    expect(lightIcon).toBeInTheDocument()
    expect(darkIcon).toBeNull()
  })

  test('отображение dark icon', () => {
    wrapperTestingComponent(<ColorModeSwitcher />, { currentTheme: 'dark' })

    expect(screen.queryByTestId(/icon-dark/i)).toBeInTheDocument()
    expect(screen.queryByTestId(/icon-light/i)).toBeNull()
  })
})
