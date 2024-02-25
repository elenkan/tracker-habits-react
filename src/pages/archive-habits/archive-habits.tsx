import MessageScreen from 'components/message-screen'
import { useAppSelector } from 'hooks/stateHooks'
import { currentThemeSelector, archiveHabitsListSelector } from 'selectors/selectors'
import { AppRouteList } from 'router/enums'
import { Box, Typography } from '@mui/material'
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp'
import classNames from 'classnames'
import './archive-habits.scss'

const ArchiveHabitsList = () => {
  const archiveHabitsList = useAppSelector(archiveHabitsListSelector)
  const currentTheme = useAppSelector(currentThemeSelector)
  const contentClass = classNames('archive-habits__item', {
    'archive-habits__item_dark': currentTheme === 'dark',
  })

  return (
    <div className="archive-habits">
      {archiveHabitsList.length ? (
        <div>
          {archiveHabitsList.map(item => (
            <Box component="div" className={contentClass} key={item.id}>
              <Typography component="span" color="text.primary">
                {item.name}
              </Typography>
              <div className="archive-habits__results">
                <Typography component="span" color="text.primary">
                  {item.completedDays}
                </Typography>
                <CheckCircleSharpIcon color="primary" />
              </div>
            </Box>
          ))}
        </div>
      ) : (
        <MessageScreen
          title="Кажется список завершенных привычек пуст..."
          buttonTitle="Зачекать привычку"
          buttonLink={AppRouteList.HabitsPage}
        />
      )}
    </div>
  )
}

export default ArchiveHabitsList
