import {Habit, ColorItem} from '../../types';
import {IconButton, Typography} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppSelector, useAppDispatch} from '../../hooks/stateHooks';
import {useState} from 'react';
import {addChangeableHabit, changeHabitList} from '../../actions/actions';
import {useNavigate} from 'react-router-dom';
import './habit-item.scss';
import lists from '../../lists.json'
import {cloneDeep} from 'lodash';

type PropsType = {
  item: Habit
}

const HabitItem = ({item}: PropsType) => {
  const habit = item;
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  let color = useAppSelector(state => state.colorMood);
  let habitList = useAppSelector(state => state.challengeHabitsList);

  const daysList = () => {
    const list = new Array(habit.period).fill({color: ''});
    const daysArray = list.map(item => Object.assign({}, item));
    daysArray.forEach(item => {
      item.id = Math.random() * list.length;
    });
    return daysArray;
  };

  const resultList = daysList();
  const [list, setList] = useState(resultList);

  const getMoodValue = () => {
    const colors: ColorItem[] | [] = lists.moodList.map(item => Object.assign({}, item));
    const newList = list.slice();
    newList.forEach(item => {
      if (item.color !== '') {
        // @ts-ignore добавить функцию
        colors.find(el => el.color === item.color).value += 1;
      }
    })
    setList(newList);
    return colors;
  };
  // TODO: добавить сортировку по цвету
  const getColorValueArray = (array: ColorItem[]) => {
    const checkedColorAmount = array.reduce((acc, curr) => acc + curr.value, 0);
    return array.map(item => {
      Object.assign({}, item);
      if (item.value !== 0) {
        item.value = Math.round(item.value / checkedColorAmount * 100);
      }
      return item.value;
    });
  };


  const getProgressValue = () => {
    const checkedDays = list.filter(item => item.color !== '');
    if (checkedDays.length > 0) {
      const progressValue = Math.round(checkedDays.length / habit.period * 100);
      const progressData = {
        value: progressValue,
        colorsValue: getColorValueArray(getMoodValue()),
        completedDays: checkedDays.length,
      };
        let data = cloneDeep(habitList)
        let el = data.find(item => item.id === habit.id)
        if (el) {
          el.value = progressData.value;
          el.colorsValue = progressData.colorsValue;
          el.completedDays = progressData.completedDays;
        }
      console.log(el)
        dispatch(changeHabitList(data))
    }
  }
  const setData = (item: ColorItem) => {
    const newArr = list.slice();
    const el = newArr.find(el => el.id === item.id);
    el.color = el.color === '' ? color : '';
    setList(newArr);
    getProgressValue();
    getMoodValue();
  };

  const changeHabit = (habit: Habit) => {
    dispatch(addChangeableHabit(habit));
    navigate('/create-habit');
  };
  const deleteHabit = (habitId: number | null) => {
    const filterList = habitList.filter(item => item.id !== habitId);
    dispatch(changeHabitList(filterList))
  }

  let dayListItem = list.map(day => {
    return (
      <span className="days-list__item"
            onClick={() => setData(day)}
            style={{
              'backgroundColor': day.color ? day.color : 'transparent',
              'border': day.color ? '1px solid transparent' : '1px solid #89ccc5'
            }}
            key={day.id}>
        </span>
    );
  });

  return (
    <li className="habit-item">
      <div className="habit-item__data">
        <Typography
          component="span"
          color="text.primary"
          sx={{
            marginBottom: '10px'
          }}>
          {habit.name}
        </Typography>
        <Typography
          component="span"
          color="text.primary"
          sx={{
            fontSize: '14px',
            lineHeight: '14px'
          }}>
          {habit.description}
        </Typography>
      </div>

      <div className="days-list">
        {dayListItem}
      </div>
      <div className="habit-item__button-group">
        <IconButton onClick={() => changeHabit(habit)}>
          <CreateIcon/>
        </IconButton>
        <IconButton onClick={() => deleteHabit(habit.id)}>
          <DeleteIcon/>
        </IconButton>
      </div>
    </li>
  )
};

export default HabitItem;