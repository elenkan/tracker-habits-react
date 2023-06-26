import HabitItem from '../../components/habit-item';
import {useAppSelector} from '../../hooks/stateHooks';
import MoodList from '../../components/mood-list';
import './habits-list.scss'

const HabitsList = () => {
  const habitList = useAppSelector(state => state.challengeHabitsList)
  const list = habitList.map(item => {
    return <HabitItem item={item} key={item.id}/>
  })
  return (
    <div className="habits-page">
      <MoodList/>
      <ul className="habits-list">
        {list}
      </ul>
    </div>
  )
};

export default HabitsList;