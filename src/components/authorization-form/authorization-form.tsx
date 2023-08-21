import {useState, useEffect} from 'react';
import {Box, Button, Dialog, DialogContent} from '@mui/material';
import './authorization-form.scss';
import {login, createLogin, signInAsGuest, saveColorMode, fetchHabitList} from '../../actions/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks/stateHooks';
import {changeHabitList, setAuthStatus, setIsGuestAuth, setUserData} from '../../actions/actions';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {AppRouteList} from '../../router/enums';
import FormTextField from '../form-fields/form-text-field';
import FormPasswordField from '../form-fields/form-password-field';
import FormButton from '../form-fields/form-button';
import {FormData} from '../../types';
import {guestHabitsList} from '../../guestData';

const AuthorizationForm = () => {
  const currentTheme = useAppSelector(state => state.currentTheme);
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const defaultValues = {
    userName: '',
    email: ''
  }
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
        dispatch(fetchHabitList())
        navigate(AppRouteList.CreateHabitPage)
      }
    }
    dispatch(saveColorMode(currentTheme === 'light' ? 'dark' : 'light'))
    setOpen(false);
  }

  return (
    <div className="auth">
      <Button sx={{color: '#fff', fontFamily: '"Raleway-Medium",Arial,sans-serif'}}
              onClick={handleClickOpen('signup')}>Регистрация</Button>
      <Button sx={{color: '#fff', fontFamily: '"Raleway-Medium",Arial,sans-serif'}}
              onClick={handleClickOpen('signin')}>Войти</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          borderRadius: '10px'
        }}
      >
        <DialogContent>
          <Box
            component="form"
            autoComplete="off"
            className="auth-form"
            sx={{m: 'auto'}}>

            <Button variant="outlined"
                    className="auth_form__item"
                    sx={{
                      color: 'primary.main',
                      width: '180px',
                      margin: '0 auto',
                    }}
                    onClick={onClickGuestBtn}
            >
              Войти как гость
            </Button>

            <span className="auth-form__divider">Или</span>

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