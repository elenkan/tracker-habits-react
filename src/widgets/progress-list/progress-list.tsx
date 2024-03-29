import type { Habit } from 'shared/types'
import { Box } from '@mui/material'
import GoalBar from 'features/goal-bar'
import DifficultyChart from 'features/difficulty-chart/difficulty-chart'
import './progress-list.scss'

interface PropsType {
  progressData: Habit[]
}

const ProgressList = ({ progressData }: PropsType) => {
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
