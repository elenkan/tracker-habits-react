import './message-screen.scss';
import {Box, Typography} from '@mui/material';
import BaseButton from '../base-button';
import {useNavigate} from 'react-router-dom';
import {AppRouteList} from '../../router/enums';
import {useAppSelector} from '../../hooks/stateHooks';
import classNames from 'classnames';

const MessageScreen = () => {
  const currentTheme = useAppSelector(state => state.currentTheme);
  const contentClass = classNames(
    'message-screen__content',
    {'message-screen__content_dark': currentTheme === 'dark'}
  )

  const navigate = useNavigate();
  const onClick = () => {
    navigate(AppRouteList.CreateHabitPage)
  }
  return (
    <div className='message-screen'>
      <Box
        component="div"
        className={contentClass}
        sx={{color: '#fff'}}>
        <Typography
          component="span"
          color="text.primary"
          sx={{
            marginBottom: '20px'
          }}>
           Кажется список полезных привычек пуст...
        </Typography>
        <BaseButton
          buttonWidth='250px'
          buttonTitle='Создать привычку'
          action={onClick}
        />
      </Box>
    </div>
  )
}

export default MessageScreen;