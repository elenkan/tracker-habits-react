import MessageScreen from '../../components/message-screen';
import './archive-habits.scss';
import {useAppSelector} from '../../hooks/stateHooks';
import {AppRouteList} from '../../router/enums';

const ArchiveHabitsList = () => {
  const archiveHabitsList = useAppSelector(state => state.archiveHabitsList);
  return (
    <div className="archive-habits">
      {archiveHabitsList.length ? (
        <div>
          {archiveHabitsList.map(item => {
            return <span key={item.id}>{item.name}</span>;
          })}
        </div>
      ) : (
        <MessageScreen
          title="Кажется список завершенных привычек пуст..."
          buttonTitle="Зачекать привычку"
          buttonLink={AppRouteList.HabitsPage}
        />
      )}
    </div>
  );
};

export default ArchiveHabitsList;
