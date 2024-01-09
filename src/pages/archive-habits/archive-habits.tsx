import MessageScreen from '../../components/message-screen';
import './archive-habits.scss';
import {useAppSelector} from '../../hooks/stateHooks';
import {AppRouteList} from '../../router/enums';
import {Box, Typography} from '@mui/material';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import classNames from 'classnames';
// import {useEffect} from 'react';
// import {fetchArchiveHabitList} from '../../actions/api-actions';

const ArchiveHabitsList = () => {
  const archiveHabitsList = useAppSelector(state => state.archiveHabitsList);
  const currentTheme = useAppSelector(state => state.currentTheme);
  const contentClass = classNames('archive-habits__item', {
    'archive-habits__item_dark': currentTheme === 'dark',
  });
  // const dispatch = useAppDispatch();
  // TODO: получать список при обновлении страницы
  // useEffect(() => {
  //   if (!archiveHabitsList.length) {
  //     dispatch(fetchArchiveHabitList());
  //   }
  // }, []);
  return (
    <div className="archive-habits">
      {archiveHabitsList.length ? (
        <div>
          {archiveHabitsList.map(item => (
            <Box component="div" className={contentClass} key={item.id}>
              <Typography component="span" color="text.primary">
                {item.name}
              </Typography>
              <CheckCircleSharpIcon color="primary" />
            </Box>
          ))}
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
