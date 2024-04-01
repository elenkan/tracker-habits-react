import Box from '@mui/material/Box'
import { Tabs, Tab, Switch, Typography } from '@mui/material'
import { BaseButton } from 'shared/ui'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/hooks/stateHooks'
import { currentThemeSelector } from 'shared/store/selectors'
import { setAuthStatus, setCurrentTheme } from 'shared/store/actions'
import { deleteAccount } from './store/thunks'
import { saveColorMode } from 'shared/store/thunks/color-mode'
import { AppRouteList } from 'app/router/enums'
import { useNavigate } from 'react-router-dom'
import './settings-board.scss'

const SettingBoard = () => {
  const [activeTab, setActiveTab] = useState(0)
  const currentTheme = useAppSelector(currentThemeSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleChangeSwitch = async () => {
    const theme = currentTheme === 'light' ? 'dark' : 'light'
    dispatch(setCurrentTheme(theme))
    await dispatch(saveColorMode(theme))
    localStorage.setItem('theme', theme)
  }

  const deleteUserAccount = async () => {
    await dispatch(deleteAccount()).then(_ => {
      dispatch(setAuthStatus(false))
      navigate(AppRouteList.Home)
    })
  }

  return (
    <Box
      component="div"
      className="setting"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        boxShadow: '0 1px 12px -4px #bababa',
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
      <Tabs value={activeTab} variant="fullWidth" className="setting__tabs" onChange={handleChange}>
        <Tab label="Аккаунт" />
        <Tab label="Темы" />
      </Tabs>
      <div className="setting__item">
        <Typography
          component="span"
          color="text.primary"
          sx={{
            '@media (max-width: 600px)': {
              fontSize: '15px',
            },
          }}>
          {activeTab === 0 ? 'Удалить аккаунт' : 'Темная тема'}
        </Typography>
        {activeTab === 0 ? (
          <BaseButton buttonTitle="Удалить" buttonWidth="150px" action={deleteUserAccount} />
        ) : (
          <Switch checked={currentTheme === 'dark'} onChange={handleChangeSwitch} />
        )}
      </div>
    </Box>
  )
}

export default SettingBoard
