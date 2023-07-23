import {useAppSelector} from '../../hooks/stateHooks';
import GoalBar from '../../components/goal-bar';
import MoodStatistics from '../../components/mood-statistics';
import './progress-list.scss';

const ProgressList = () => {
  const progressData = useAppSelector(state => state.progressData);

  const progressListItem = progressData.map(item => {
    return (
      <div className="progress-list__item" key={item.id}>
        <h2 className="progress-list__title">{item.name}</h2>
        <div className="progress-list__content">
          <GoalBar progressValue={item}/>
          <MoodStatistics colorsValue={item.colorsValue}/>
        </div>
      </div>)
  })
  return (
    <div className="progress-list">
      {progressListItem}
    </div>
  )
};

export default ProgressList;