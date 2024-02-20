import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useAppDispatch, useAppSelector} from 'hooks/stateHooks';
import {setCurrentTheme} from 'actions/actions';

const ColorMode = () => {
  const currentTheme = useAppSelector(state => state.currentTheme);
  const dispatch = useAppDispatch();

  const handleChangeSwitch = () => {
    dispatch(setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light'));
  };
  return (
    <IconButton
      sx={{
        ml: 1,
        color: 'modeIcon.default',
        '@media (max-width: 600px)': {
          padding: 0,
        },
      }}
      onClick={handleChangeSwitch}
      data-testid="wrapper">
      {currentTheme === 'dark' ? (
        <Brightness7Icon
          sx={{
            '@media (max-width: 600px)': {
              width: '20px',
            },
          }}
          data-testid="icon-dark"
        />
      ) : (
        <Brightness4Icon
          sx={{
            '@media (max-width: 600px)': {
              width: '20px',
            },
          }}
          data-testid="icon-light"
        />
      )}
    </IconButton>
  );
};

export default ColorMode;
