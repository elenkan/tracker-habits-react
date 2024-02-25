import { useAppSelector } from 'hooks/stateHooks'
import { habitListSelector } from 'selectors/selectors'
import { Box } from '@mui/material'
import GoalBar from 'components/goal-bar'
import DifficultyStatistics from 'components/difficulty-statistics'
import MessageScreen from 'components/message-screen'
import './progress-list.scss'

const ProgressList = () => {
  const progressData = useAppSelector(habitListSelector)
  const progressListItem = progressData?.length
    ? progressData.map(item => {
        return (
          <Box
            component="div"
            sx={{ bgcolor: 'background.default' }}
            className="progress-list__item"
            key={item.id}>
            <h2 className="progress-list__title">{item.name}</h2>
            <div className="progress-list__content">
              <GoalBar progressValue={item} />
              <DifficultyStatistics colorsValue={item.colorsValue} />
            </div>
          </Box>
        )
      })
    : []
  return (
    <div className="progress-list">
      {progressListItem.length ? <>{progressListItem}</> : <MessageScreen />}
    </div>
  )
}

export default ProgressList
