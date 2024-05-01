import type { Habit } from 'shared/types'
import { Box } from '@mui/material'
import GoalBar from './ui/goal-bar'
import DifficultyChart from './ui/difficulty-chart'
import './progress-list.scss'

interface Props {
  progressData: Habit[]
}

const ProgressList = ({ progressData }: Props) => {
  return (
    <div className="progress-list">
      {progressData.map(item => {
        return (
          <Box
            component="div"
            sx={{ bgcolor: 'background.default' }}
            className="progress-list__item"
            key={item.id}>
            <h2 className="progress-list__title">{item.name}</h2>
            <div className="progress-list__content">
              <GoalBar progressValue={item} />
              <DifficultyChart colorsValue={item.colorsValue} />
            </div>
          </Box>
        )
      })}
    </div>
  )
}

export default ProgressList
