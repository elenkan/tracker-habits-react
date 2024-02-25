import { fireEvent, render, screen } from '@testing-library/react'
import FormButton from './form-button'

describe('тест компонента FormButton', () => {
  const onClick = jest.fn()
  beforeEach(() => {
    render(<FormButton buttonWidth="200px" buttonTitle="Test title" action={onClick} />)
  })
  test('тест рендера FormButton', async () => {
    const button = screen.getByText(/test title/i)
    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle({ width: '200px' })
  })

  test('тест вызова переданной функции', () => {
    fireEvent.click(screen.getByText(/test title/i))
    expect(onClick).toHaveBeenCalled()
  })
})
