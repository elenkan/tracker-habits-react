import {useState, useEffect} from 'react';
import {Box, Button, Dialog, DialogContent} from '@mui/material';
import './authorization-form.scss';
import {
  login,
  createLogin,
  signInAsGuest,
  saveColorMode,
  fetchHabitList,
  getColorMode
} from '../../actions/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks/stateHooks';
import {changeHabitList, setAuthStatus, setCurrentTheme, setIsGuestAuth, setUserData} from '../../actions/actions';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {AppRouteList} from '../../router/enums';
import FormTextField from '../form-fields/form-text-field';
import FormPasswordField from '../form-fields/form-password-field';
import FormButton from '../form-fields/form-button';
import {FormData} from '../../types';
import {guestHabitsList} from '../../guestData';
import classNames from 'classnames';

const AuthorizationForm = () => {
  const currentTheme = useAppSelector(state => state.currentTheme);
  const userColorTheme = useAppSelector(state => state.userColorTheme);
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const defaultValues = {
    userName: '',
    email: ''
  }

  const dividerClass = classNames('auth-form__divider', {'auth-form__divider_dark': currentTheme === 'dark'})
  const methods = useForm<FormData>({defaultValues: defaultValues})
  const {handleSubmit, control, reset} = methods;
  const handleClickOpen = (type: string) => () => {
    setOpen(true);
    setType(type)
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    reset({userName: '', email: ''})
  }, [open])

  const saveMode = () => {
    if (userColorTheme && userColorTheme !== currentTheme) {
      dispatch(setCurrentTheme(userColorTheme))
    } else {
      dispatch(saveColorMode(currentTheme))
    }
  }

  const onClickGuestBtn = async () => {
    await dispatch(signInAsGuest()).then(res => {
      dispatch(setAuthStatus(true))
      dispatch(setIsGuestAuth(true))
      dispatch(changeHabitList(guestHabitsList))
      navigate(AppRouteList.ProgressPage)
    })
  };

  const onSubmit = async (data: FormData) => {
    const {userName: name, email, password} = data
    if (type === 'signup') {
      // TODO: разобраться с типами
      // @ts-ignore
      const user = await dispatch(createLogin({name, email, password}))
      if (user.payload?.users) {
        dispatch(setUserData(user))
        dispatch(setAuthStatus(true))
        navigate(AppRouteList.CreateHabitPage)
      }
    } else {
      // TODO: разобраться с типами
      // @ts-ignore
      const user = await dispatch(login({email, password}))
      if (user) {
        dispatch(setUserData(user))
        dispatch(setAuthStatus(true))
        dispatch(getColorMode())
        saveMode()
        dispatch(fetchHabitList())
        navigate(AppRouteList.CreateHabitPage)
      }
    }
    setOpen(false);
  }

  return (
    <div className="auth">
      <Button sx={{
        color: '#fff',
        fontFamily: '"Raleway-Medium",Arial,sans-serif',
        '@media (max-width: 600px)': {
          fontSize: '13px',
        }
      }} onClick={handleClickOpen('signup')}>
        Регистрация
      </Button>
      <Button sx={{
        color: '#fff',
        fontFamily: '"Raleway-Medium",Arial,sans-serif',
        '@media (max-width: 600px)': {
          fontSize: '13px',
        }
      }} onClick={handleClickOpen('signin')}>
        Войти
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          borderRadius: '10px'
        }}
      >
        <DialogContent
        sx={{
          '@media (max-width: 600px)': {
            paddingLeft:' 15px',
            paddingRight: '15px'
          }
        }}>
          <Box
            component="form"
            autoComplete="off"
            className="auth-form">

            <Button variant="outlined"
                    sx={{
                      color: 'primary.main',
                      width: '180px',
                      margin: '0 auto',
                      '@media (max-width: 600px)': {
                        fontSize: '13px'
                      }
                    }}
                    onClick={onClickGuestBtn}
            >
              Войти как гость
            </Button>

            <span className={dividerClass}>Или</span>

            {type === 'signup' &&
            <FormTextField fieldName="userName" control={control}/>
            }

            <FormTextField fieldName="email" control={control}/>

            <FormPasswordField control={control}/>

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
}

export default AuthorizationForm