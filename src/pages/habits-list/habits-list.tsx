import HabitItem from '../../components/habit-item';
import {useAppSelector} from '../../hooks/stateHooks';
import DifficultyList from '../../components/difficulty-list';
import MessageScreen from '../../components/message-screen';
import './habits-list.scss'
import {useEffect} from 'react';
import Notification from '../../utils/notification/notification';

const HabitsList = () => {
  const habitList = useAppSelector(state => state.challengeHabitsList)
  const list = habitList?.length
    ? habitList.map(item => {
        return <HabitItem item={item} key={item.id}/>
      })
    : []

  useEffect(() => {
    Notification.infoErrorNotification('Выберите опцию на панели Как справился (-ась), чтобы отметить цветом кружок')
  }, [])
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