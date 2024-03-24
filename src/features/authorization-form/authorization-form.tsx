import { useState, useEffect } from 'react'
import { Box, Button, Dialog, DialogContent } from '@mui/material'
import BaseButton from 'shared/ui/base-button'
import { login, createLogin, signInAsGuest, addGuestHabits } from './store/thunks'
import { fetchHabitList, fetchArchiveHabitList } from 'shared/store/thunks/habit-list'
import { saveColorMode, getColorMode } from 'shared/store/thunks/color-mode'
import { useAppDispatch, useAppSelector } from 'shared/hooks/stateHooks'
import { userColorThemeSelector } from './store/selectors'
import { currentThemeSelector } from 'shared/store/selectors'
import { setAuthStatus, setCurrentTheme, setIsGuestAuth } from 'shared/store/actions'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AppRouteList } from 'app/router/enums'
import FormTextField from 'shared/ui/form-fields/form-text-field/form-text-field'
import FormPasswordField from 'shared/ui/form-fields/form-password-field'
import FormButton from 'shared/ui/form-fields/form-button'
import type { FormData } from 'shared/types'
import { guestHabitsList } from 'features/authorization-form/model/guestData'
import classNames from 'classnames'
import { auth } from 'shared/config/firebase'
import 'features/authorization-form/authorization-form.scss'

const AuthorizationForm = () => {
  const currentTheme = useAppSelector(currentThemeSelector)
  const userColorTheme = useAppSelector(userColorThemeSelector)
  const [open, setOpen] = useState<boolean>(false)
  const [type, setType] = useState<string>('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const defaultValues = {
    userName: '',
    email: '',
    password: '',
  }

  const dividerClass = classNames('auth-form__divider', {
    'auth-form__divider_dark': currentTheme === 'dark',
  })
  const methods = useForm<FormData>({ defaultValues })
  const { handleSubmit, control, reset } = methods
  const handleClickOpen = (type: string) => () => {
    setOpen(true)
    setType(type)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const setAuthValues = () => {
    localStorage.setItem('checkAuth', 'true')
    dispatch(setAuthStatus(true))
  }

  useEffect(() => {
    reset({ userName: '', email: '', password: '' })
  }, [open])

  const saveMode = () => {
    if (userColorTheme === 'light' && currentTheme === 'dark') {
      dispatch(setCurrentTheme(currentTheme))
      dispatch(saveColorMode(currentTheme))
      localStorage.setItem('theme', currentTheme)
    } else {
      dispatch(setCurrentTheme(userColorTheme))
      localStorage.setItem('theme', userColorTheme)
    }
  }

  const onClickGuestBtn = () => {
    handleClose()
    dispatch(signInAsGuest()).then(_ => {
      setAuthValues()
      dispatch(setIsGuestAuth(true))
      dispatch(addGuestHabits(guestHabitsList))
      navigate(AppRouteList.ProgressPage)
    })
  }

  const onSubmit = async (data: FormData) => {
    handleClose()
    const { userName: name, email, password } = data
    if (type === 'signup') {
      await dispatch(createLogin({ name, email, password }))
      if (auth.currentUser) {
        setAuthValues()
        navigate(AppRouteList.HabitsPage)
      }
    } else {
      await dispatch(login({ email, password }))
      if (auth.currentUser) {
        setAuthValues()
        await dispatch(getColorMode())
        saveMode()
        dispatch(fetchHabitList())
        dispatch(fetchArchiveHabitList())
        navigate(AppRouteList.HabitsPage)
      }
    }
    setOpen(false)
  }

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
        sx={{
          borderRadius: '10px',
        }}
        onClose={handleClose}>
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
  )
}

export default AuthorizationForm
