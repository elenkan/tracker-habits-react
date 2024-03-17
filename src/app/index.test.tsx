import { screen } from '@testing-library/react'
import { wrapperTestingComponent } from 'tests/helpers/wrapperTestingComponent'
import App from 'app/index'
import 'firebase/auth'
import 'firebase/database'
import 'chart.js'
import 'react-chartjs-2'

jest.mock('chart.js', () => {
  return {
    Chart: {
      register: jest.fn(),
    },
  }
})
jest.mock('react-chartjs-2', () => 'Chart')

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(),
  }
})
jest.mock('firebase/database', () => {
  return {
    getDatabase: jest.fn(),
  }
})
test('рендер', () => {
  wrapperTestingComponent(<App />)
  const content = screen.getByTestId(/content/i)
  expect(content).toBeInTheDocument()
})
