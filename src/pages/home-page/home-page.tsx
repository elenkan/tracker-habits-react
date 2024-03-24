import { Box } from '@mui/material'
import { useAppSelector } from 'shared/hooks/stateHooks'
import { currentThemeSelector } from 'shared/store/selectors'
import classNames from 'classnames'
import './home-page.scss'

const HomePage = () => {
  const currentTheme = useAppSelector(currentThemeSelector)
  const contentClass = classNames('main-content', { 'main-content_dark': currentTheme === 'dark' })
  const nameAppClass = classNames('main-content__name-app', {
    'main-content__name-app_dark': currentTheme === 'dark',
  })

  return (
    <div className={contentClass}>
      <Box component="span" className={nameAppClass} sx={{ color: '#fff' }}>
        Трекер привычек
      </Box>
    </div>
  )
}

export default HomePage
