import { render, screen } from '@testing-library/react'
import NotFoundPage from './not-found-page'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedUsedNavigate,
}))

test('рендер компонента', () => {
  render(<NotFoundPage />)
  const mainText = screen.getByText('Такой страницы не существует')
  const buttonText = screen.getByText('Перейти на главную страницу')

  expect(mainText).toBeInTheDocument()
  expect(buttonText).toBeInTheDocument()
})
