import type { Habit } from 'types'
import CircularProgress from '@mui/material/CircularProgress'
import { Typography, Box } from '@mui/material'
import './goal-bar.scss'

interface PropsType {
  progressValue: Habit
}

const GoalBar = ({ progressValue }: PropsType) => {
  const CircularProgressWithLabel = (value: number) => {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={value} size={80} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            sx={{
              fontSize: '16px',
              lineHeight: '16px',
              '@media(max-width: 900px)': {
                fontSize: '14px',
                lineHeight: '14px',
              },
            }}>
            {`${Math.round(value)}%`}
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <div className="goal-bar">
      <Box component="div" sx={{ bgcolor: 'card.background' }} className="goal-bar__circle">
        <h4 className="goal-bar__title">Прогресс выполнения</h4>
        {CircularProgressWithLabel(progressValue.value)}
      </Box>
      <Box component="div" sx={{ bgcolor: 'card.background' }} className="goal-bar__days">
        <h4 className="goal-bar__title">Завершено дней</h4>
        <div>
          <span>{progressValue.completedDays}</span>
          {` / ${progressValue.period}`}
        </div>
      </Box>
    </div>
  )
}

export default GoalBar
