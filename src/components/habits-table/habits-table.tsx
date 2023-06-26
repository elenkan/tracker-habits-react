import {useEffect, useRef, useState} from 'react';
import {IconButton} from '@mui/material';
import moment from 'moment'
import classNames from 'classnames';
import {useAppDispatch} from '../../hooks/stateHooks';
import {addChangeableHabit, changeCalendarHabitList} from '../../actions/actions';
import {useNavigate} from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import {Habit, DateItem} from '../../types';
import './habits-table.scss'

type PropsType = {
  list: Habit[]
}

const HabitsTable = ({list}: PropsType) => {
  const [habitsList, setHabitsList] = useState<Habit[]>([])
  const [renderIndex, setRenderIndex] = useState<number>(0)
  const [weekDates, setWeekDates] = useState<DateItem[]>([])
  const globalDates = useRef<(DateItem[])[]>([]);
  const indexWeek = useRef<number>(0)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const goBack = () => {
    if (indexWeek.current !== 0) {
      indexWeek.current -= 1
      setRenderIndex(indexWeek.current)
      setWeekDates(globalDates.current[indexWeek.current])
    }
  }

  const goForward = () => {
    if (indexWeek.current >= globalDates.current.length - 1) {
      let newDatesArray: DateItem[] = [];
      for (let i = 1; i <= 7; i++) {
        newDatesArray.push({
          isSelected: false,
          value: (moment(weekDates[weekDates.length - 1].value).add(i, 'days')).toString(),
          label: moment(weekDates[weekDates.length - 1].value).add(i, 'days').format('DD.MM')
        })
      }
      globalDates.current = [...globalDates.current , [...newDatesArray]]
      const copiedHabitsList = [...habitsList].map(item => {
        const dates = JSON.stringify(weekDates)
        item.dates.push(JSON.parse(dates))
        return item
      })
      setHabitsList(copiedHabitsList)
      indexWeek.current = indexWeek.current + 1
      setRenderIndex(indexWeek.current)
      setWeekDates(newDatesArray)
    } else {
      indexWeek.current += 1
      setRenderIndex(indexWeek.current)
      setWeekDates(globalDates.current[indexWeek.current])
    }
  }

  const onClick = (habitIndex: number, index: number) => {
    const clonedItem: DateItem = {...habitsList[habitIndex].dates[indexWeek.current][index]};
    clonedItem.isSelected = !clonedItem.isSelected;

    const copiedHabitsList = [...habitsList]
    copiedHabitsList[habitIndex].dates[indexWeek.current][index] = clonedItem
    setHabitsList(copiedHabitsList)
  }

  const changeHabit = (habit: Habit) => {
    dispatch(addChangeableHabit(habit));
    navigate('/create-habit');
  };
  const deleteHabit = (habitId: number | null) => {
    const filterList = habitsList.filter(item => item.id !== habitId);
    dispatch(changeCalendarHabitList(filterList))
  }

  const getDatesArray = () => {
    moment.locale('ru')
    const array = new Array(7).fill('');
    const startDate = moment(new Date()).startOf('week')
    const dates = array.map((item, index) => {
      return {
        isSelected: false,
        label: moment(startDate).add(index, 'days').format('DD.MM'),
        value: (moment(startDate).add(index, 'days')).toString()
      }
    })
    return dates
  }
  globalDates.current = ([getDatesArray()])
  useEffect(()=>{
    const listOfHabits = [...list].map(item => {
      const newItem = Object.assign({}, item)
      const arr = JSON.stringify(globalDates.current)
      newItem.dates= JSON.parse(arr)
      return newItem
    })
    setWeekDates(globalDates.current[indexWeek.current])
    setHabitsList(listOfHabits)
  }, [])


  return (
    <table className="habits-table">
      <thead>
      <tr className="habits-table__header-row">
        <th>Привычка</th>
        {
          weekDates.map((item, index) => (
            <>
              <th key={index}>
                { index === 0 && <span className="arrow arrow__left" onClick={goBack}/>}
                {item.label}
                { index === 6 && <span className="arrow arrow__right" onClick={goForward}/>}
              </th>
            </>
          ))
        }

      </tr>
      </thead>
      <tbody>
      {habitsList.map((habit, habitIndex) => (
        <tr className="habits-table__row" key={habit.id}>
          <td>
            <div>
              <span>{habit.name}</span>
              <span>{habit.description}</span>
            </div>
            <div className="habit-item__button-group">
              <IconButton onClick={() => changeHabit(habit)}>
                <CreateIcon/>
              </IconButton>
              <IconButton onClick={() => deleteHabit(habit.id)}>
                <DeleteIcon/>
              </IconButton>
            </div>
          </td>
          {
            habit.dates[renderIndex].map((item, index) => (
              <td key={item.label}>
                <label>
                  <input
                    name={item.value}
                    type="checkbox"
                    onClick={() => onClick(habitIndex,index)}
                  />
                  <span className={
                    classNames({
                      'days-list__item': true,
                      'days-list__item_selected': item.isSelected
                    })}>
                  </span>
                </label>
              </td>
            ))
          }
        </tr>
      ))}
      </tbody>
    </table>)
};

export default HabitsTable;

