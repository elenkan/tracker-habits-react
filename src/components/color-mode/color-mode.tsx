import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useAppDispatch, useAppSelector} from '../../hooks/stateHooks';
import {setCurrentTheme} from '../../actions/actions';

const ColorMode = () => {
  const currentTheme = useAppSelector(state => state.currentTheme);
  const dispatch = useAppDispatch();

  const handleChangeSwitch = () => {
    dispatch(setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light'))
  };
  return (
    <IconButton sx={{ ml: 1, color: "modeIcon.default"}} onClick={handleChangeSwitch}>
      {currentTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
};

export default ColorMode;