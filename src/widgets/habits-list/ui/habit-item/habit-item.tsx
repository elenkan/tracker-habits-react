import type { Habit } from 'shared/types'
import { IconButton, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch } from 'shared/hooks/stateHooks'
import { addChangeableHabit } from 'shared/store/actions'
import { useNavigate } from 'react-router-dom'
import { deleteHabit } from 'shared/store/thunks/habit'
import HabitDaysList from 'features/habit-days-list/habit-days-list'
import 'widgets/habits-list/ui/habit-item/habit-item.scss'

interface PropsType {
  habit: Habit
}

const HabitItem = ({ habit }: PropsType) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const changeHabit = (habit: Habit) => {
    dispatch(addChangeableHabit(habit))
    navigate('/create-habit')
  }
  const deleteHabitAction = (habitId: number | string) => {
    dispatch(deleteHabit(habitId))
  }

  return (
    <li className="habit-item">
      <div className="habit-item__data">
        <Typography
          component="span"
          color="text.primary"
          sx={{
            marginBottom: habit.description ? '10px' : '0',
          }}>
          {habit.name}
        </Typography>
        {habit.description && (
          <Typography
            component="span"
            color="text.primary"
            sx={{
              fontSize: '14px',
              lineHeight: '14px',
              '@media (max-width: 795px)': {
                display: 'inline-block',
                marginBottom: '10px',
              },
            }}>
            {habit.description}
          </Typography>
        )}
      </div>
      <HabitDaysList data={habit} />
      <div className="habit-item__button-group">
        <IconButton
          sx={{
            color: 'modeIcon.secondary',
          }}
          onClick={() => {
            changeHabit(habit)
          }}>
          <CreateIcon />
        </IconButton>
        <IconButton
          sx={{
            color: 'modeIcon.secondary',
          }}
          onClick={() => {
            deleteHabitAction(habit.id)
          }}>
          <DeleteIcon />
        </IconButton>
      </div>
    </li>
  )
}

export default HabitItem
