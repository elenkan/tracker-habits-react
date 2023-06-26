import HabitItem from '../../components/habit-item';
import {useAppSelector} from '../../hooks/stateHooks';
import MoodList from '../../components/mood-list';
import HabitsTable from '../../components/habits-table';
import './habits-list.scss'

const HabitsList = () => {
  const habitsList = useAppSelector(state => state.challengeHabitsList)
  const calendarHabitsList = useAppSelector(state => state.calendarHabitsList)
  const modeType = useAppSelector(state => state.mode);

  const list = habitsList.map(item => {
    return <HabitItem item={item} key={item.id}/>
  })
  return (
    <div className="habits-page">
      {
        modeType === 'challenge'
          ?
          <>
            <MoodList/>
            <ul className="habits-list">
              {list}
            </ul>
          </>
          : <HabitsTable list={calendarHabitsList}/>
      }
    </div>
  )
};

export default HabitsList;