import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {Box} from '@mui/material';
import './authorization-form.scss';
import {login, createLogin} from '../../actions/api-actions';
import {useAppDispatch} from '../../hooks/stateHooks';
import {setAuthStatus, setUserData} from '../../actions/actions';
import {useNavigate} from 'react-router-dom';
import {useForm, FormProvider} from 'react-hook-form';
import {AppRouteList} from '../../router/enums';
import FormTextField from '../form-fields/form-text-field';
import FormPasswordField from '../form-fields/form-password-field';
import FormButton from '../form-fields/form-button';

type FormProps = {
  userName?: string,
  email?: string,
  password?: string
}

const AuthorizationForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const defaultValues = {
    userName: '',
    email: ''
  }
  const methods = useForm<FormProps>({defaultValues: defaultValues})
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
  

  const onSubmit = async (data: FormProps) => {
    const { userName: name, email, password} = data
    if (type === 'signup') {
      // TODO: разобраться с типами
      // @ts-ignore
      const user = await dispatch(createLogin({name, email, password}))
      if (user) {
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
        navigate(AppRouteList.CreateHabitPage)
      }
    }
    setOpen(false);
  }

  return (
    <div className="auth">
      <Button sx={{color: '#fff', fontFamily: '"Raleway-Bold",Arial,sans-serif'}}
              onClick={handleClickOpen('signup')}>Регистрация</Button>
      <Button sx={{color: '#fff', fontFamily: '"Raleway-Bold",Arial,sans-serif'}}
              onClick={handleClickOpen('signin')}>Войти</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          borderRadius: '10px'
        }}
      >
        <DialogContent>
          <FormProvider {...methods}>
            <Box
              component="form"
              autoComplete="off"
              className="auth-form"
              sx={{m: 'auto'}}>

              <Button variant="outlined"
                      className="auth_form__item"
                      sx={{
                        color: '#272727',
                        width: '180px',
                        margin: '0 auto',
                      }}>
                Войти как гость
              </Button>

              <span className="auth-form__divider">Или</span>

              { type === 'signup' &&
                <FormTextField name="userName" control={control}/>
              }

              <FormTextField name="email" control={control}/>

              <FormPasswordField control={control}/>

              <FormButton
                buttonWidth="300px"
                buttonTitle={type === 'signup' ? 'Зарегистрироваться' : 'Войти'}
                action={handleSubmit(onSubmit)}
              />
            </Box>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AuthorizationForm