import type { Habit } from 'shared/types'
import { useAppSelector } from 'shared/hooks/stateHooks'
import { currentThemeSelector } from 'shared/store/selectors'
import { Box, Typography } from '@mui/material'
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp'
import classNames from 'classnames'
import 'widgets/archive-habits-list/archive-habits-list.scss'

interface Props {
  list: Habit[]
}

const ArchiveHabitsList = ({ list }: Props) => {
  const currentTheme = useAppSelector(currentThemeSelector)
  const contentClass = classNames('archive-habits__item', {
    'archive-habits__item_dark': currentTheme === 'dark',
  })

  return (
    <div className="archive-habits">
      {list.map(item => (
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
  )
}

export default ArchiveHabitsList
