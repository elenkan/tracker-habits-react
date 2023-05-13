import HabitItem from '../../components/habit-item';
import {useAppSelector} from '../../hooks/stateHooks';
import MoodList from '../../components/mood-list';

const HabitsList = () => {
    const habitList = useAppSelector(state => state.challengeHabitsList)
    const list = habitList.map(item => {
        return <HabitItem item={item} key={item.id}/>
    })
    return (
        <div>
            {list}
            <MoodList/>
        </div>
    )
};

export default HabitsList;