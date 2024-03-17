import type { Habit, ColorItem } from 'types'
import { useAppDispatch, useAppSelector } from 'app/redux/hooks/stateHooks'
import { colorDifficultySelector } from 'app/redux/selectors/selectors'
import { useState } from 'react'
import lists from 'shared/model/lists.json'
import { cloneDeep } from 'lodash'
import { getColorValueArray } from './lib/getColorValueArray'
import { getUpdatedColorsList } from './lib/getUpdatedColorsList'
import { changeColor } from './lib/changeColor'
import {
  addArchiveHabit,
  deleteHabit,
  fetchArchiveHabitList,
  updateHabit,
} from 'app/redux/actions/api-actions'
import { setShowCongratulation } from 'app/redux/actions/actions'
import './habit-days-list.scss'

interface PropsType {
  data: Habit
}

const HabitDaysList = ({ data }: PropsType) => {
  const habit = cloneDeep(data)
  const color = useAppSelector(colorDifficultySelector)
  const dispatch = useAppDispatch()

  const [list, setList] = useState<ColorItem[]>(habit.checkedDays)

  const deleteHabitAction = (habitId: number | string) => {
    dispatch(deleteHabit(habitId))
  }
  const setProgressData = () => {
    const checkedDays = list.filter(item => item.color !== '')
    if (checkedDays.length > 0) {
      habit.completionPercent = Math.round((checkedDays.length / habit.period) * 100)
      habit.colorsValue = getColorValueArray(getUpdatedColorsList(lists.difficultyList, list))
      habit.completedDays = checkedDays.length
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

  const setData = (item: ColorItem): void => {
    const data = [...list]
    changeColor(item, data, color)
    setList(data)
    setProgressData()
  }

  return (
    <div className="days-list">
      {list.map(day => {
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
            key={day.id}
          />
        )
      })}
    </div>
  )
}

export default HabitDaysList
