import './congratulations-screen.scss';
import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import {useAppDispatch} from '../../hooks/stateHooks';
import {setShowCongratulation} from '../../actions/actions';

const CongratulationsScreen = () => {
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    dispatch(setShowCongratulation(false));
  };
  return (
    <div className="congratulations-screen" onClick={handleClickOpen}>
      <Box component="div" className="congratulations-screen__content">
        <Typography component="span" color="text.primary">
          Поздравляем!
        </Typography>
        <Typography component="span" color="text.primary">
          Челлендж завершен :)
        </Typography>
      </Box>
    </div>
  );
};

export default CongratulationsScreen;
