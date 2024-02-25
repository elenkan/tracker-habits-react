import { render, screen, fireEvent } from '@testing-library/react'
import BaseButton from './base-button'

describe('тест компонента BaseButton', () => {
  let testFunction: jest.Mock<any, any>

  beforeEach(() => {
    testFunction = jest.fn()
    render(
      <BaseButton
        buttonTitle="test title"
        buttonWidth="100px"
        action={testFunction}
        style={{
          margin: '0 auto',
        }}
      />
    )
  })

  test('тест рендера компонента', () => {
    const button = screen.getByText(/test title/i)
    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle({ width: '100px', margin: '0 auto' })
  })

  test('тест вызова переданной функции', () => {
    fireEvent.click(screen.getByText(/test title/i))
    expect(testFunction).toHaveBeenCalled()
  })
})
