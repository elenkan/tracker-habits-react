import { within, render, screen } from '@testing-library/react'
import LoadingScreen from './loading-screen'

test('тест компонента LoadingScreen', async () => {
  render(<LoadingScreen />)
  expect(screen.queryByTestId('loading-screen')).not.toBeNull()
  const list = screen.getByRole('list')
  expect(list).toBeInTheDocument()

  const { getAllByRole } = within(list)
  const items = getAllByRole('listitem')
  expect(items.length).toBe(3)
})
