import { Box, Typography } from '@mui/material'
import { BaseButton } from 'shared/ui'
import { useNavigate } from 'react-router-dom'
import { AppRouteList } from 'app/providers/router-provider/enums'
import { useAppSelector } from 'shared/hooks/stateHooks'
import { currentThemeSelector } from 'shared/store/selectors'
import classNames from 'classnames'
import './message-screen.scss'

interface Props {
  title?: string
  buttonTitle?: string
  buttonLink?: string
}

const MessageScreen = ({ title, buttonTitle, buttonLink }: Props) => {
  const currentTheme = useAppSelector(currentThemeSelector)
  const contentClass = classNames('message-screen__content', {
    'message-screen__content_dark': currentTheme === 'dark',
  })

  const navigate = useNavigate()
  const onClick = () => {
    const link = buttonLink || AppRouteList.CreateHabitPage
    navigate(link)
  }

  return (
    <div className="message-screen">
      <Box component="div" className={contentClass} sx={{ color: '#fff' }}>
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
  )
}

export default MessageScreen
