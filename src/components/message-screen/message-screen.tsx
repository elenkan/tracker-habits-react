import './message-screen.scss';
import {Box, Typography} from '@mui/material';
import BaseButton from '../base-button';
import {useNavigate} from 'react-router-dom';
import {AppRouteList} from '../../router/enums';
import {useAppSelector} from '../../hooks/stateHooks';
import classNames from 'classnames';

interface PropsType {
  title?: string;
  buttonTitle?: string;
  buttonLink?: string;
}

const MessageScreen = ({title, buttonTitle, buttonLink}: PropsType) => {
  const currentTheme = useAppSelector(state => state.currentTheme);
  const contentClass = classNames('message-screen__content', {
    'message-screen__content_dark': currentTheme === 'dark',
  });

  const navigate = useNavigate();
  const onClick = () => {
    const link = buttonLink || AppRouteList.CreateHabitPage;
    navigate(link);
  };
  return (
    <div className="message-screen">
      <Box component="div" className={contentClass} sx={{color: '#fff'}}>
        <Typography
          component="span"
          color="text.primary"
          sx={{
            marginBottom: '20px',
          }}>
          {title || 'Кажется список полезных привычек пуст...'}
        </Typography>
        <BaseButton
          buttonWidth="250px"
          buttonTitle={buttonTitle || 'Создать привычку'}
          action={onClick}
        />
      </Box>
    </div>
  );
};

export default MessageScreen;
