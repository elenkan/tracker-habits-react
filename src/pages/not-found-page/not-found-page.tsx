import {Typography} from '@mui/material';
import BaseButton from '../../components/base-button';
import {useNavigate} from 'react-router-dom';
import {AppRouteList} from '../../router/enums';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(AppRouteList.Home)
  }
  return (
    <div style={{marginTop: '90px'}}>
      <Typography
        variant="h1"
        color="text.primary"
        sx={{
          marginBottom: '10px'
        }}>
        404
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.primary"
        sx={{
          marginBottom: '20px'
        }}>
        Такой страницы не существует
      </Typography>
      <BaseButton
        buttonWidth='250px'
        buttonTitle='Перейти на главную страницу'
        action={onClick}
      />

    </div>
  );
};

export default NotFoundPage;
