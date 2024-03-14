import type { Habit, ColorItem } from 'types'
import { IconButton, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppSelector, useAppDispatch } from 'hooks/stateHooks'
import { colorDifficultySelector } from 'selectors/selectors'
import { useEffect, useState } from 'react'
import { addChangeableHabit, setShowCongratulation } from 'actions/actions'
import { useNavigate } from 'react-router-dom'
import lists from 'lists.json'
import { cloneDeep } from 'lodash'
import {
  addArchiveHabit,
  deleteHabit,
  fetchArchiveHabitList,
  updateHabit,
} from 'actions/api-actions'
import './habit-item.scss'

interface PropsType {
  item: Habit
}

const HabitItem = ({ item }: PropsType) => {
  const habit = cloneDeep(item)
  const [list, setList] = useState<ColorItem[]>([])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const color = useAppSelector(colorDifficultySelector)
  useEffect(() => {
    setList(habit.checkedDays)
  }, [])

  const getDifficultyValue = () => {
    const colors: ColorItem[] | [] = lists.difficultyList.map(item => Object.assign({}, item))
    const newList = cloneDeep(list)
    newList.forEach(item => {
      const colorItem = colors.find(el => el.color === item.color)
      if (colorItem) {
        colorItem.value += 1
      }
    })
    setList(newList)
    return colors
  }

  const getColorValueArray = (array: ColorItem[]) => {
    const checkedColorAmount = array.reduce((acc, curr) => acc + curr.value, 0)
    return array.map(item => {
      Object.assign({}, item)
      if (item.value && item.value !== 0) {
        item.value = Math.round((item.value / checkedColorAmount) * 100)
      }
      return item.value
    })
  }

  const getProgressValue = () => {
    const checkedDays = list.filter(item => item.color !== '')
    if (checkedDays.length > 0) {
      const progressValue = Math.round((checkedDays.length / habit.period) * 100)
      const progressData = {
        value: progressValue,
        colorsValue: getColorValueArray(getDifficultyValue()),
        completedDays: checkedDays.length,
      }
      habit.value = progressData.value
      habit.colorsValue = progressData.colorsValue
      habit.completedDays = progressData.completedDays
      habit.checkedDays = list
      if (habit.completedDays === habit.period) {
        dispatch(addArchiveHabit(habit))
        deleteHabitAction(habit.id)
        dispatch(setShowCongratulation(true))
        dispatch(fetchArchiveHabitList())
      } else {
        dispatch(updateHabit(habit))
      }
    }
  }
  const setData = (item: ColorItem) => {
    const data = [...list]
    const el = data.find(el => el.id === item.id)
    if (el?.color || el?.color === '') {
      if (el.color === color) {
        el.color = ''
      } else {
        el.color = color
      }
    }
    setList(data)
    getDifficultyValue()
    getProgressValue()
  }

  const changeHabit = (habit: Habit) => {
    dispatch(addChangeableHabit(habit))
    navigate('/create-habit')
  }
  const deleteHabitAction = (habitId: number | string) => {
    dispatch(deleteHabit(habitId))
  }

  const daysList = list.map(day => {
    return (
      <span
        className="days-list__item"
        onClick={() => {
          setData(day)
        }}
        style={{
          backgroundColor: day.color ? day.color : 'transparent',
          border: day.color ? '1px solid transparent' : '1px solid #89ccc5',
        }}
        key={day.id}></span>
    )
  })

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
      <div className="days-list">{daysList}</div>
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
