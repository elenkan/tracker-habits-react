import {useAppDispatch} from '../../hooks/stateHooks';
import {Provider} from 'react-redux';
import {store} from '../../store';
import {render, fireEvent, screen} from '@testing-library/react';
import CongratulationsScreen from '../congratulations-screen';

jest.mock('../../hooks/stateHooks');

test('тест компонента CongratulationsScreen', () => {
  const hook = {useAppDispatch};
  const dispatch = jest.spyOn(hook, 'useAppDispatch').mockReturnValue(jest.fn());

  render(
    <Provider store={store}>
      <CongratulationsScreen />
    </Provider>,
  );

  expect(screen.getByText(/поздравляем/i)).toBeInTheDocument();
  expect(screen.getByText(/челлендж завершен/i)).toBeInTheDocument();
  fireEvent.click(screen.getByTestId(/congratulations-screen/i));
  expect(dispatch).toHaveBeenCalled();
});
