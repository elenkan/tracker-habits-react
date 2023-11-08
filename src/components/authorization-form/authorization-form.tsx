import {useState, useEffect} from 'react';
import {Box, Button, Dialog, DialogContent} from '@mui/material';
import BaseButton from '../base-button';
import './authorization-form.scss';
import {
  login,
  createLogin,
  signInAsGuest,
  saveColorMode,
  fetchHabitList,
  getColorMode,
} from '../../actions/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks/stateHooks';
import {
  changeHabitList,
  setAuthStatus,
  setCurrentTheme,
  setIsGuestAuth,
} from '../../actions/actions';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {AppRouteList} from '../../router/enums';
import FormTextField from '../form-fields/form-text-field';
import FormPasswordField from '../form-fields/form-password-field';
import FormButton from '../form-fields/form-button';
import type {FormData} from '../../types';
import {guestHabitsList} from '../../guestData';
import classNames from 'classnames';
import {auth} from '../../index';

const AuthorizationForm = () => {
  const currentTheme = useAppSelector(state => state.currentTheme);
  const userColorTheme = useAppSelector(state => state.userColorTheme);
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const defaultValues = {
    userName: '',
    email: '',
    password: '',
  };

  const dividerClass = classNames('auth-form__divider', {
    'auth-form__divider_dark': currentTheme === 'dark',
  });
  const methods = useForm<FormData>({defaultValues});
  const {handleSubmit, control, reset} = methods;
  const handleClickOpen = (type: string) => () => {
    setOpen(true);
    setType(type);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    reset({userName: '', email: '', password: ''});
  }, [open]);

  const saveMode = () => {
    if (userColorTheme === 'light' && currentTheme === 'dark') {
      dispatch(setCurrentTheme(currentTheme));
      dispatch(saveColorMode(currentTheme));
      localStorage.setItem('theme', currentTheme);
    } else {
      dispatch(setCurrentTheme(userColorTheme));
      localStorage.setItem('theme', userColorTheme);
    }
  };

  const onClickGuestBtn = () => {
    dispatch(signInAsGuest()).then(_ => {
      dispatch(setAuthStatus(true));
      dispatch(setIsGuestAuth(true));
      dispatch(changeHabitList(guestHabitsList));
      localStorage.setItem('checkAuth', 'true');
      navigate(AppRouteList.ProgressPage);
    });
  };

  const onSubmit = async (data: FormData) => {
    const {userName: name, email, password} = data;
    if (type === 'signup') {
      await dispatch(createLogin({name, email, password}));
      if (auth.currentUser) {
        dispatch(setAuthStatus(true));
        localStorage.setItem('checkAuth', 'true');
        navigate(AppRouteList.HabitsPage);
      }
    } else {
      await dispatch(login({email, password}));
      if (auth.currentUser) {
        dispatch(setAuthStatus(true));
        await dispatch(getColorMode());
        saveMode();
        dispatch(fetchHabitList());
        localStorage.setItem('checkAuth', 'true');
        navigate(AppRouteList.HabitsPage);
      }
    }
    setOpen(false);
  };

  return (
    <div className="auth">
      <Button
        sx={{
          color: '#fff',
          fontFamily: '"Raleway-Medium",Arial,sans-serif',
          '@media (max-width: 600px)': {
            fontSize: '13px',
          },
        }}
        onClick={handleClickOpen('signup')}>
        Регистрация
      </Button>
      <Button
        sx={{
          color: '#fff',
          fontFamily: '"Raleway-Medium",Arial,sans-serif',
          '@media (max-width: 600px)': {
            fontSize: '13px',
          },
        }}
        onClick={handleClickOpen('signin')}>
        Войти
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          borderRadius: '10px',
        }}>
        <DialogContent
          sx={{
            '@media (max-width: 600px)': {
              paddingLeft: '15px',
              paddingRight: '15px',
            },
          }}>
          <Box component="form" autoComplete="off" className="auth-form">
            <BaseButton
              buttonTitle="Войти как гость"
              buttonWidth="180px"
              action={onClickGuestBtn}
              style={{
                margin: '0 auto',
              }}
            />
            <span className={dividerClass}>Или</span>

            {type === 'signup' && <FormTextField fieldName="userName" control={control} />}

            <FormTextField fieldName="email" control={control} />

            <FormPasswordField control={control} keyDownAction={handleSubmit(onSubmit)} />

            <FormButton
              buttonWidth="300px"
              buttonTitle={type === 'signup' ? 'Зарегистрироваться' : 'Войти'}
              action={handleSubmit(onSubmit)}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthorizationForm;
