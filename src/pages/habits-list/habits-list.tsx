import HabitItem from '../../components/habit-item';
import {useAppSelector} from '../../hooks/stateHooks';
import DifficultyList from '../../components/difficulty-list';
import MessageScreen from '../../components/message-screen';
import './habits-list.scss'

const HabitsList = () => {
  const habitList = useAppSelector(state => state.challengeHabitsList)
  const list = habitList?.length
    ? habitList.map(item => {
        return <HabitItem item={item} key={item.id}/>
      })
    : []
  return (
    <div className="habits-page">
      {
        list.length
          ? <>
            <DifficultyList/>
            <ul className="habits-list">
              {list}
            </ul>
          </>
          : <MessageScreen/>
      }
    </div>
  )
};

export default HabitsList;