import Box from '@mui/material/Box'
import { Tabs, Tab, Switch, Typography } from '@mui/material'
import BaseButton from 'shared/ui/base-button'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/redux/hooks/stateHooks'
import { currentThemeSelector } from 'app/redux/selectors/selectors'
import { setAuthStatus, setCurrentTheme } from 'app/redux/actions/actions'
import { deleteAccount, saveColorMode } from 'app/redux/actions/api-actions'
import { AppRouteList } from 'app/router/enums'
import { useNavigate } from 'react-router-dom'
import './settings-page.scss'

const SettingPage = () => {
  const [value, setValue] = useState(0)
  const currentTheme = useAppSelector(currentThemeSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeSwitch = () => {
    const theme = currentTheme === 'light' ? 'dark' : 'light'
    dispatch(setCurrentTheme(theme))
    dispatch(saveColorMode(theme))
    localStorage.setItem('theme', theme)
  }

  const deleteUserAccount = () => {
    dispatch(deleteAccount()).then(res => {
      dispatch(setAuthStatus(false))
      navigate(AppRouteList.Home)
    })
  }

  const tabsContent = (value: number) => {
    if (value === 0) {
      return (
        <div className="setting__item">
          <Typography
            component="span"
            color="text.primary"
            sx={{
              '@media (max-width: 600px)': {
                fontSize: '14px',
              },
            }}>
            Удалить аккаунт
          </Typography>
          <BaseButton buttonTitle="Удалить" buttonWidth="150px" action={deleteUserAccount} />
        </div>
      )
    } else {
      return (
        <div className="setting__item">
          <Typography
            component="span"
            color="text.primary"
            sx={{
              '@media (max-width: 600px)': {
                fontSize: '15px',
              },
            }}>
            Темная тема
          </Typography>
          <Switch checked={currentTheme === 'dark'} onChange={handleChangeSwitch} />
        </div>
      )
    }
  }
  return (
    <Box
      component="div"
      className="setting"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        boxShadow: '0 1px 12px -4px #bababa',
        marginTop: '70px',
        borderRadius: '10px',
        width: '400px',
        minHeight: '300px',
        fontSize: '20px',
        lineHeight: '28px',
        bgcolor: 'background.default',
        '@media (max-width: 600px)': {
          width: '100%',
          maxWidth: '400px',
        },
      }}>
      <Tabs value={value} variant="fullWidth" className="setting__tabs" onChange={handleChange}>
        <Tab label="Аккаунт" />
        <Tab label="Темы" />
      </Tabs>
      {tabsContent(value)}
    </Box>
  )
}

export default SettingPage
